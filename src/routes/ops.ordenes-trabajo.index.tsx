import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Plus, List, LayoutGrid } from "lucide-react";
import {
  OT_ROWS, OT_TABS, OT_HEADER, KANBAN_COLUMNS,
  type OTRow, type OTEstado, type OTAutorizacion,
} from "@/lib/ot-data";
import { formatCOP } from "@/lib/format";

export const Route = createFileRoute("/ops/ordenes-trabajo/")({
  head: () => ({ meta: [{ title: "Órdenes de Trabajo · CHV" }] }),
  component: OTLista,
});

type View = "lista" | "tablero";

function OTLista() {
  const [tab, setTab] = useState<OTEstado | "all">("all");
  const [view, setView] = useState<View>("lista");
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return OT_ROWS.filter((r) => {
      if (tab !== "all" && r.estado !== tab) return false;
      if (!needle) return true;
      return (
        r.num.toLowerCase().includes(needle) ||
        r.cliente.toLowerCase().includes(needle) ||
        r.equipo.toLowerCase().includes(needle) ||
        r.serie.toLowerCase().includes(needle)
      );
    });
  }, [q, tab]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-start gap-4 border-b border-border bg-card px-7 pb-4 pt-6">
        <div className="min-w-0 flex-1">
          <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">Operaciones · Taller</p>
          <h1 className="m-0 text-[22px] font-semibold tracking-[-0.01em] text-foreground">Órdenes de Trabajo</h1>
          <p className="mt-1.5 text-[13px] leading-[1.5] text-muted-foreground">
            <b className="font-medium text-foreground">{OT_HEADER.abiertas} abiertas</b> · {OT_HEADER.tecnicos} técnicos disponibles ·{" "}
            <span className="font-medium text-[--dang-700] dark:text-[#FDA29B]">{OT_HEADER.vencidas} vencidas</span>
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2.5">
          <div className="viewtog">
            <button className={view === "lista" ? "on" : ""} onClick={() => setView("lista")}>
              <List className="size-3" /> Lista
            </button>
            <button className={view === "tablero" ? "on" : ""} onClick={() => setView("tablero")}>
              <LayoutGrid className="size-3" /> Tablero
            </button>
          </div>
          <button className="btn-pri inline-flex items-center gap-1.5">
            <Plus className="size-3.5" /> Nueva OT
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 border-b border-border bg-card px-7 py-3">
        {OT_TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={[
              "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12.5px] font-medium transition-colors",
              tab === t.id
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
            ].join(" ")}
          >
            {t.label}{" "}
            <span className="font-mono text-[10.5px] text-muted-foreground/80">{t.count}</span>
          </button>
        ))}
      </div>

      {view === "lista" && (
        <div className="flex items-center gap-3 bg-card/40 px-7 py-3">
          <div className="flex h-10 max-w-[560px] flex-1 items-center gap-2.5 rounded-lg border border-border bg-background px-3.5">
            <Search className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar OT, cliente, equipo o serie…"
              className="min-w-0 flex-1 border-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
            />
            <span className="shrink-0 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
              ⌘K
            </span>
          </div>
          <span className="ml-auto font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            Ordenado por · <b className="font-medium text-foreground">Días en estado ↓</b>
          </span>
        </div>
      )}

      <div className="flex-1 overflow-auto px-7 pb-7 pt-3">
        {view === "lista" ? <ListView rows={rows} /> : <KanbanView />}
      </div>
    </div>
  );
}

function ListView({ rows }: { rows: OTRow[] }) {
  return (
    <div className="overflow-hidden rounded-[10px] border border-border bg-card">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <Th width={90}>#</Th>
            <Th width={210}>Cliente</Th>
            <Th>Equipo</Th>
            <Th width={150}>Técnico</Th>
            <Th width={140}>Autorización</Th>
            <Th width={180}>Estado</Th>
            <Th width={90} align="right">Días</Th>
            <Th width={130} align="right">Saldo</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => <OTTableRow key={r.num} row={r} />)}
          {rows.length === 0 && (
            <tr>
              <td colSpan={8} className="px-6 py-16 text-center text-sm text-muted-foreground">
                Sin órdenes para los filtros aplicados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex items-center justify-between border-t border-border bg-muted/30 px-5 py-3.5 text-xs text-muted-foreground">
        <span>Mostrando <b className="font-mono text-foreground">{rows.length}</b> de <b className="font-mono text-foreground">{OT_HEADER.abiertas}</b> OT abiertas</span>
        <span className="font-mono">Mostrar 25</span>
      </div>
    </div>
  );
}

function KanbanView() {
  return (
    <div className="kanban">
      {KANBAN_COLUMNS.map((col) => {
        const items = OT_ROWS.filter((r) => r.estado === col.id);
        return (
          <div key={col.id} className="kcol">
            <div className="kcol-h">
              <div className="ttl">
                <span className={`kdot ${col.pulse ? "pulse" : ""}`} style={{ background: col.dotColor }} />
                {col.label}
              </div>
              <span className="kct">{items.length}</span>
            </div>
            {items.map((r) => (
              <Link
                key={r.num}
                to="/ops/ordenes-trabajo/$id"
                params={{ id: r.num }}
                className={[
                  "kcard",
                  r.vencida ? "dang" : r.warnTint ? "warn" : "",
                  r.entregada ? "done" : "",
                ].join(" ")}
              >
                <div className="ktop">
                  <span className="knum">{r.num}</span>
                  {r.dias.endsWith("días") && r.diasTone === "warn" && col.id === "esperando" && (
                    <span className="font-mono text-[10.5px] font-medium text-[--warn-700] dark:text-[#FDB022]">{r.dias.replace(" días", "d")}</span>
                  )}
                </div>
                <div className="kcli">{r.cliente}</div>
                <div className="keqp">{r.equipo}</div>
                <div className="kft">
                  <span className={`av-tec ${r.tecnico.variant}`}>{r.tecnico.ini}</span>
                  <span className="nm">{r.tecnico.nombre}</span>
                  <span className={[
                    "dy",
                    r.diasTone === "warn" ? "text-[--warn-700] dark:!text-[#FDB022]" : "",
                    r.diasTone === "dang" ? "text-[--dang-700] dark:!text-[#FDA29B] font-semibold" : "",
                  ].join(" ")}>
                    {r.dias.replace(" días", "d").replace(" día", "d")}
                  </span>
                </div>
              </Link>
            ))}
            {items.length === 0 && (
              <div className="rounded-md border border-dashed border-border bg-background/40 p-4 text-center text-[11px] text-muted-foreground">
                Sin OT
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Th({ children, width, align = "left" }: { children?: React.ReactNode; width?: number; align?: "left" | "right" }) {
  return (
    <th
      style={{ width }}
      className={[
        "whitespace-nowrap border-b border-border bg-muted/30 px-3 py-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.1em] text-muted-foreground",
        align === "right" ? "text-right" : "text-left",
      ].join(" ")}
    >
      {children}
    </th>
  );
}

const AUTH_CLS: Record<OTAutorizacion, string> = {
  pendiente: "aut-pen",
  autorizado: "aut-ok",
  no_autorizado: "aut-no",
};
const AUTH_LBL: Record<OTAutorizacion, string> = {
  pendiente: "Pendiente",
  autorizado: "Autorizado",
  no_autorizado: "No autorizado",
};

function OTTableRow({ row }: { row: OTRow }) {
  const navigate = useNavigate();
  return (
    <tr
      className={[
        "h-14 cursor-pointer border-b border-border/60 last:border-b-0 hover:bg-muted/40",
        row.warnTint ? "ot-row-warn" : "",
        row.entregada ? "ot-row-done" : "",
        row.cycle ? "row-cycle" : "",
      ].join(" ")}
      onClick={() => navigate({ to: "/ops/ordenes-trabajo/$id", params: { id: row.num } })}
    >
      <Td>
        <Link
          to="/ops/ordenes-trabajo/$id"
          params={{ id: row.num }}
          onClick={(e) => e.stopPropagation()}
          className="v-num font-mono text-[12.5px] font-medium text-foreground hover:underline"
        >
          {row.num}
        </Link>
      </Td>
      <Td>
        <div className="flex min-w-0 flex-col leading-tight">
          <span className="max-w-[200px] truncate text-[13px] font-medium text-foreground">{row.cliente}</span>
          <span className="font-mono text-[11px] text-muted-foreground">{row.telefono}</span>
        </div>
      </Td>
      <Td>
        <div className="flex min-w-0 flex-col leading-tight">
          <span className="text-[13px] font-medium text-foreground">{row.equipo}</span>
          <span className="text-[11.5px] text-muted-foreground">
            {row.tipoEquipo} · <span className="font-mono">{row.serie}</span>
          </span>
        </div>
      </Td>
      <Td>
        <span className="inline-flex items-center gap-2 text-[12.5px] text-foreground/85">
          <span className={`av-tec ${row.tecnico.variant}`}>{row.tecnico.ini}</span>
          {row.tecnico.nombre}
        </span>
      </Td>
      <Td>
        <span className={`auth-pill ${AUTH_CLS[row.autorizacion]}`}>
          <span className="dot" />{AUTH_LBL[row.autorizacion]}
        </span>
      </Td>
      <Td>
        <div className="flex flex-wrap items-center gap-1">
          {row.vencida && <span className="bdg-vencida">VENCIDA</span>}
          <span className={`s-pill s-${row.estado}`}>
            <span className="dot" />{row.estadoLabel}
          </span>
        </div>
      </Td>
      <Td align="right">
        <span className={[
          "font-mono text-[12.5px]",
          row.diasTone === "warn" ? "days-warn" : "",
          row.diasTone === "dang" ? "days-dang" : "",
          !row.diasTone ? "text-muted-foreground" : "",
        ].join(" ")}>
          {row.dias}
        </span>
      </Td>
      <Td align="right">
        <span className="font-mono text-[13.5px] font-medium tabular-nums text-foreground">
          {row.saldo === 0 ? "$0" : formatCOP(row.saldo)}
        </span>
      </Td>
    </tr>
  );
}

function Td({ children, align = "left" }: { children?: React.ReactNode; align?: "left" | "right" }) {
  return (
    <td className={[
      "whitespace-nowrap px-3 align-middle text-[13px] text-foreground/85",
      align === "right" ? "text-right" : "text-left",
    ].join(" ")}>
      {children}
    </td>
  );
}
