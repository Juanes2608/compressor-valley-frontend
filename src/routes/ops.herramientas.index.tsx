import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Plus, Printer, Wrench, UserCheck, Hammer, Activity,
  Search, AlertTriangle, Check, MoreHorizontal, MessageCircle, ChevronRight, Settings,
} from "lucide-react";
import {
  HRM_HEADER, HRM_TOOLS, HRM_LOANS, getTool, statusToPill, type HrmStatus,
} from "@/lib/herramientas-data";

export const Route = createFileRoute("/ops/herramientas/")({
  head: () => ({ meta: [{ title: "Herramientas · CHV" }] }),
  component: HerramientasIndex,
});

type Tab = "activos" | "catalogo" | "historial";

const TABS: { id: Tab; label: string; count: string; danger?: boolean; late?: string; Icon: typeof Wrench }[] = [
  { id: "activos",   label: "Préstamos activos", count: "2", danger: true, late: "· 1 atrasada", Icon: UserCheck },
  { id: "catalogo",  label: "Catálogo completo", count: "12", Icon: Hammer },
  { id: "historial", label: "Historial",         count: "47 este mes", Icon: Activity },
];

function HerramientasIndex() {
  const [tab, setTab] = useState<Tab>("activos");
  const [q, setQ] = useState("");
  const [filterStatus, setFilterStatus] = useState<"todas" | HrmStatus>("todas");

  const filteredCatalog = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return HRM_TOOLS.filter((t) => {
      if (filterStatus !== "todas" && t.status !== filterStatus) return false;
      if (!needle) return true;
      return (
        t.nombre.toLowerCase().includes(needle) ||
        t.id.toLowerCase().includes(needle) ||
        t.marca.toLowerCase().includes(needle)
      );
    });
  }, [q, filterStatus]);

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex flex-wrap items-start gap-4 border-b border-border bg-card px-7 pb-4 pt-6">
        <div className="min-w-0 flex-1">
          <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
            Operaciones · Taller y soporte
          </p>
          <h1 className="m-0 text-[22px] font-semibold tracking-[-0.01em] text-foreground">Herramientas</h1>
          <p className="mt-1.5 text-[13px] leading-[1.5] text-muted-foreground">
            <b className="font-mono font-medium text-foreground">{HRM_HEADER.total}</b> herramientas ·{" "}
            <b className="font-mono font-medium text-foreground">{HRM_HEADER.prestadas}</b> prestadas ·{" "}
            <b className="font-mono font-medium text-[--dang-700] dark:text-[#FDA29B]">{HRM_HEADER.atrasadas}</b> atrasada ·{" "}
            <b className="font-mono font-medium text-foreground">{HRM_HEADER.mantenimiento}</b> en mantenimiento
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button className="btn-out inline-flex items-center gap-1.5">
            <Printer className="size-3.5" /> Imprimir etiquetas
          </button>
          <Link to="/ops/herramientas/nueva" className="btn-pri inline-flex items-center gap-1.5">
            <Plus className="size-3.5" /> Registrar préstamo
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border bg-card px-7">
        <div className="flex items-end">
          {TABS.map((t) => {
            const active = tab === t.id;
            const Icon = t.Icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={[
                  "relative -mb-px flex h-12 items-center gap-2 border-b-2 px-4 text-[13px] font-medium transition-colors",
                  active
                    ? "border-[--p-600] bg-[--p-50] font-semibold text-[--p-700] dark:bg-[rgba(45,60,229,.16)] dark:text-[#C2CCFF]"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                <Icon className="size-4" />
                {t.label}
                <span className={[
                  "ml-1 inline-flex h-[18px] min-w-[22px] items-center justify-center rounded-full px-1.5 font-mono text-[11px] font-medium",
                  t.danger
                    ? "bg-[--dang-50] text-[--dang-700] dark:bg-[rgba(240,68,56,0.14)] dark:text-[#FDA29B]"
                    : active
                      ? "bg-[--p-100] text-[--p-700]"
                      : "bg-muted text-muted-foreground",
                ].join(" ")}>{t.count}</span>
                {t.late && t.id === "activos" && (
                  <span className="ml-1 font-mono text-[11px] font-medium text-[--dang-700] dark:text-[#FDA29B]">{t.late}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-auto px-7 py-6">
        {tab === "activos" && <TabActivos />}
        {tab === "catalogo" && (
          <TabCatalogo
            q={q} setQ={setQ}
            filter={filterStatus} setFilter={setFilterStatus}
            tools={filteredCatalog}
          />
        )}
        {tab === "historial" && <TabHistorial />}
      </div>
    </div>
  );
}

/* ─── TAB · Préstamos activos ─── */
function TabActivos() {
  return (
    <>
      {/* Banner atraso */}
      <div className="mb-4 flex items-start gap-3 rounded-xl border border-[--warn-border] bg-[--warn-50] p-4 dark:bg-[rgba(247,144,9,0.10)]">
        <AlertTriangle className="mt-0.5 size-5 shrink-0 text-[--warn-700] dark:text-[#FDB022]" />
        <div className="flex-1 text-[12.5px] leading-[1.5]">
          <div className="mb-0.5 text-[13px] font-semibold text-[--warn-700] dark:text-[#FDB022]">1 herramienta atrasada</div>
          <div className="text-[#7A2E08] dark:text-[#FDB022]/85">
            <b className="font-medium">Llave torque digital</b> prestada a <b className="font-medium">Diego P.</b> desde hace{" "}
            <span className="font-mono font-medium">5 días</span> (devolución esperada{" "}
            <span className="font-mono font-medium">hace 3 días</span>).
          </div>
          <div className="mt-2.5 flex gap-2">
            <Link to="/ops/herramientas/$id" params={{ id: "HRM-2410-S" }}
              className="btn-out inline-flex items-center gap-1.5 px-2.5 py-1 text-[12px] text-[--warn-700] border-[--warn-border]">
              <ChevronRight className="size-3" /> Ver préstamo
            </Link>
            <button className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[12px] font-medium text-[--warn-700] hover:bg-[--warn-50]">
              <MessageCircle className="size-3" /> Enviar recordatorio
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="bg-muted/40">
              {["Herramienta", "Código", "Prestada a", "Fecha préstamo", "Devolución esperada", "Días en uso", "Estado", ""].map((h, i) => (
                <th key={i} className={[
                  "border-b border-border px-3.5 py-2.5 text-left font-mono text-[10.5px] font-medium uppercase tracking-[0.06em] text-muted-foreground whitespace-nowrap",
                  i === 7 ? "text-right" : "",
                ].join(" ")}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HRM_LOANS.map((loan) => {
              const tool = getTool(loan.toolId)!;
              const isDang = loan.tone === "danger";
              const toneText = loan.tone === "danger" ? "text-[--dang-700]" : loan.tone === "warn" ? "text-[--warn-700]" : "text-[--succ-700]";
              const pillCls = loan.tone === "danger" ? "pill-danger" : loan.tone === "warn" ? "pill-warn" : "pill-neutral";
              return (
                <tr key={loan.toolId} className={[
                  "border-b border-border/60 hover:bg-muted/30",
                  isDang ? "hrm-row-dang" : "",
                ].join(" ")} style={{ height: 64 }}>
                  <td className="px-3.5">
                    <div className="flex items-center gap-3">
                      <div className="hrm-tool-ico"><Wrench className="size-5" /></div>
                      <div>
                        <Link to="/ops/herramientas/$id" params={{ id: tool.id }} className="block text-[13px] font-medium leading-tight text-foreground hover:underline">{tool.nombre}</Link>
                        <div className="mt-0.5 text-[11px] text-muted-foreground">{tool.marca} · {tool.modelo}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3.5 font-mono text-[12.5px] font-medium text-foreground/90">{loan.toolId}</td>
                  <td className="px-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className={`hrm-av hrm-${loan.userAvatar}`}>{loan.userInitials}</div>
                      <div>
                        <div className="text-[13px] font-medium leading-tight text-foreground">{loan.userName}</div>
                        <div className="mt-0.5 text-[11px] text-muted-foreground">{loan.userRole}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3.5 font-mono text-[11.5px] text-muted-foreground">{loan.fechaPrestamo}</td>
                  <td className={`px-3.5 font-mono text-[11.5px] font-semibold ${toneText}`}>{loan.fechaEsperadaTexto}</td>
                  <td className={`px-3.5 font-mono text-[12.5px] font-semibold ${toneText}`}>{loan.diasUsoTexto}</td>
                  <td className="px-3.5">
                    <span className={`pill ${pillCls} ${loan.pulse ? "pulse-dot" : ""}`}>
                      <span className="dot" /> {loan.estadoLabel}
                    </span>
                  </td>
                  <td className="px-3.5">
                    <div className="flex items-center justify-end gap-1.5">
                      <button className="inline-flex items-center gap-1 rounded-md border border-[--succ-border] bg-card px-2.5 py-1 text-[12px] font-medium text-[--succ-700] hover:bg-[--succ-50]">
                        <Check className="size-3" /> Marcar devuelta
                      </button>
                      <button className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted">
                        <MoreHorizontal className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-between border-t border-border bg-muted/20 px-4 py-2.5 font-mono text-[11.5px] text-muted-foreground">
          <span>Mostrando <b className="font-medium text-foreground">3</b> préstamos activos · <b className="font-medium text-foreground">1</b> atrasada · <b className="font-medium text-foreground">1</b> próxima a vencer · <b className="font-medium text-foreground">9</b> herramientas disponibles</span>
          <span>Última actualización · hoy 09:00</span>
        </div>
      </div>
    </>
  );
}

/* ─── TAB · Catálogo ─── */
const STATUS_FILTERS: { id: "todas" | HrmStatus; label: string; cls: string; count: number }[] = [
  { id: "todas",         label: "Todas",         cls: "pill-neutral", count: 12 },
  { id: "disponible",    label: "Disponibles",   cls: "pill-success", count: 8 },
  { id: "prestada",      label: "Prestadas",     cls: "pill-warn",    count: 2 },
  { id: "mantenimiento", label: "Mantenimiento", cls: "pill-neutral", count: 1 },
  { id: "danada",        label: "Dañadas",       cls: "pill-danger",  count: 1 },
];

function TabCatalogo({
  q, setQ, filter, setFilter, tools,
}: {
  q: string; setQ: (v: string) => void;
  filter: "todas" | HrmStatus; setFilter: (v: "todas" | HrmStatus) => void;
  tools: typeof HRM_TOOLS;
}) {
  return (
    <>
      <div className="mb-4 flex flex-wrap items-center gap-2.5">
        <div className="flex max-w-[340px] flex-1 items-center gap-2 rounded-md border border-border bg-card px-3 py-2">
          <Search className="size-3.5 text-muted-foreground" />
          <input
            value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nombre, código o marca..."
            className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={[
                "pill cursor-pointer", f.cls,
                filter === f.id ? "ring-2 ring-[--p-400] ring-offset-1 ring-offset-background" : "",
              ].join(" ")}
            >
              {f.id !== "todas" && <span className="dot" />}
              {f.label} <span className="ml-1 font-mono">{f.count}</span>
            </button>
          ))}
        </div>
        <div className="flex-1" />
        <button className="btn-out inline-flex items-center gap-1.5 px-2.5 py-1 text-[12px]">
          <Settings className="size-3" /> Filtros
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3.5 md:grid-cols-3 lg:grid-cols-4">
        {tools.map((t) => {
          const pill = statusToPill(t.status);
          return (
            <Link
              key={t.id} to="/ops/herramientas/$id" params={{ id: t.id }}
              className="hrm-cat-card"
            >
              <div className="hrm-tool-ico lg"><Wrench className="size-7" /></div>
              <div>
                <div className="text-[14px] font-medium leading-tight text-foreground">{t.nombre}</div>
                <div className="mt-0.5 text-[11.5px] text-muted-foreground">{t.marca} · {t.modelo}</div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11.5px] font-medium text-foreground/80">{t.id}</span>
                <span className={`pill ${pill.cls}`} style={{ height: 20, padding: "0 8px", fontSize: 11 }}>
                  <span className="dot" /> {pill.label}
                </span>
              </div>
              <div className="mt-1.5 flex items-center justify-between border-t border-border pt-2.5">
                <span className="text-[11px] text-muted-foreground">
                  <b className="font-mono font-medium text-foreground/80">{t.sede}</b> · {t.ubicacion}
                </span>
                <ChevronRight className="size-3.5 text-muted-foreground" />
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

/* ─── TAB · Historial (placeholder canónico) ─── */
function TabHistorial() {
  return (
    <div className="rounded-xl border border-dashed border-border bg-card/60 px-7 py-12 text-center text-[13px] text-muted-foreground">
      <Activity className="mx-auto mb-2 size-6 text-muted-foreground/70" />
      <div className="text-[14px] font-medium text-foreground">Historial completo de préstamos</div>
      <div className="mt-1">47 préstamos este mes · vista detallada por herramienta dentro del detalle.</div>
    </div>
  );
}
