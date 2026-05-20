import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Plus, ShieldCheck, ShieldAlert, Download, Check, X } from "lucide-react";
import {
  GAR_ROWS, GAR_TABS, GAR_HEADER, GAR_FILTROS_V, GAR_FILTROS_C,
  type GarTab, type GarRow, type GarRowV, type GarRowC,
} from "@/lib/garantias-data";
import { formatCOP } from "@/lib/format";

export const Route = createFileRoute("/ops/garantias/")({
  head: () => ({ meta: [{ title: "Garantías · CHV" }] }),
  component: GarantiasLista,
});

function GarantiasLista() {
  const [tab, setTab] = useState<GarTab>("ventas");
  const [filtro, setFiltro] = useState<string>("Todas");
  const [q, setQ] = useState("");

  const filtros = tab === "ventas" ? GAR_FILTROS_V : GAR_FILTROS_C;

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return GAR_ROWS.filter((r) => {
      if (r.tab !== tab) return false;
      if (filtro !== "Todas") {
        if (!r.estadoLabel.toLowerCase().includes(filtro.toLowerCase().split(" ")[0])) return false;
      }
      if (!needle) return true;
      const nameField = r.tab === "ventas" ? r.cliente : r.proveedor;
      return (
        r.num.toLowerCase().includes(needle) ||
        nameField.toLowerCase().includes(needle) ||
        r.producto.toLowerCase().includes(needle)
      );
    });
  }, [tab, filtro, q]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-start gap-4 border-b border-border bg-card px-7 pb-4 pt-6">
        <div className="min-w-0 flex-1">
          <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
            Operaciones · Post-venta
          </p>
          <h1 className="m-0 text-[22px] font-semibold tracking-[-0.01em] text-foreground">Garantías</h1>
          <p className="mt-1.5 text-[13px] leading-[1.5] text-muted-foreground">
            <b className="font-mono font-medium text-foreground">{GAR_HEADER.ventasActivas}</b> de ventas activas ·{" "}
            <b className="font-mono font-medium text-foreground">{GAR_HEADER.comprasActivas}</b> de compras activas ·{" "}
            <span className="font-medium text-[--warn-700] dark:text-[#FDB022]">
              {GAR_HEADER.pendientes} con decisión pendiente
            </span>{" "}
            · Valor en garantía <b className="font-mono font-medium text-foreground">{formatCOP(GAR_HEADER.valorEnGarantia)}</b>
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2.5">
          <button className="btn-out inline-flex items-center gap-1.5">
            <Download className="size-3.5" /> Exportar
          </button>
          <Link to="/ops/garantias/nueva" className="btn-pri inline-flex items-center gap-1.5">
            <Plus className="size-3.5" /> Nueva reclamación
          </Link>
        </div>
      </div>

      {/* Tabs duales */}
      <div className="border-b border-border bg-card px-7 pt-3">
        <div className="flex max-w-[560px] items-end border-b border-border">
          {GAR_TABS.map((t) => {
            const active = tab === t.id;
            const Icon = t.id === "ventas" ? ShieldCheck : ShieldAlert;
            return (
              <button
                key={t.id}
                onClick={() => { setTab(t.id); setFiltro("Todas"); }}
                className={[
                  "relative -mb-px flex h-12 flex-1 items-center justify-center gap-2 border-b-2 px-4 text-[13px] font-medium transition-colors",
                  active
                    ? "border-[--p-600] bg-[--p-50] font-semibold text-[--p-700] dark:bg-[rgba(45,60,229,.16)] dark:text-[#C2CCFF]"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                <Icon className="size-4 shrink-0" strokeWidth={2} />
                <span className="flex flex-col items-start gap-px leading-tight">
                  <span className="flex items-baseline gap-1.5">
                    {t.label}
                    <span className={[
                      "font-mono text-[11.5px]",
                      active ? "text-[--p-700] dark:text-[#C2CCFF]" : "text-muted-foreground",
                    ].join(" ")}>({t.count})</span>
                  </span>
                  <span className={[
                    "text-[10.5px] font-normal",
                    active ? "text-[--p-700]/80 dark:text-[#C2CCFF]/80" : "text-muted-foreground",
                  ].join(" ")}>{t.sub}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-filtros */}
      <div className="flex flex-wrap items-center gap-3 border-b border-border bg-card px-7 py-3">
        <div className="flex flex-wrap gap-1.5">
          {filtros.map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={[
                "rounded-md border px-3 py-1 text-[12px] font-medium transition-colors",
                filtro === f
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card text-foreground/80 hover:bg-muted",
              ].join(" ")}
            >
              {f}
            </button>
          ))}
        </div>
        {tab === "ventas" && (
          <label className="ml-auto inline-flex items-center gap-2 text-[12px] text-foreground/80">
            <input type="checkbox" defaultChecked className="size-3.5 accent-[--p-600]" />
            Vencen en los próximos 30 días
          </label>
        )}
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 bg-card/40 px-7 py-3">
        <div className="flex h-10 max-w-[560px] flex-1 items-center gap-2.5 rounded-lg border border-border bg-background px-3.5">
          <Search className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={tab === "ventas"
              ? "Buscar por número, cliente o producto…"
              : "Buscar por proveedor, OC o producto…"}
            className="min-w-0 flex-1 border-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto px-7 pb-7 pt-3">
        <div className="overflow-hidden rounded-[10px] border border-border bg-card">
          <table className="w-full border-collapse">
            <thead>
              {tab === "ventas" ? (
                <tr>
                  <Th width={110}>#</Th>
                  <Th width={110}>Fecha reporte</Th>
                  <Th>Cliente</Th>
                  <Th width={220}>Producto</Th>
                  <Th width={110}>Venta origen</Th>
                  <Th width={120}>Vencimiento</Th>
                  <Th width={90}>Días</Th>
                  <Th width={140}>Resolución</Th>
                  <Th width={170}>Estado</Th>
                </tr>
              ) : (
                <tr>
                  <Th width={110}>#</Th>
                  <Th width={100}>Fecha</Th>
                  <Th>Proveedor</Th>
                  <Th width={220}>Producto</Th>
                  <Th width={110}>OC origen</Th>
                  <Th width={130}>Motivo</Th>
                  <Th width={140}>Resolución</Th>
                  <Th width={140} align="right">Valor</Th>
                  <Th width={180}>Estado</Th>
                </tr>
              )}
            </thead>
            <tbody>
              {rows.map((r) =>
                r.tab === "ventas"
                  ? <GarRowVentas key={r.num} row={r} />
                  : <GarRowCompras key={r.num} row={r} />
              )}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-6 py-16 text-center text-sm text-muted-foreground">
                    Sin garantías para los filtros aplicados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex items-center justify-between border-t border-border bg-muted/30 px-5 py-3.5 text-xs text-muted-foreground">
            <span>
              Mostrando <b className="font-mono text-foreground">{rows.length}</b> de{" "}
              <b className="font-mono text-foreground">
                {tab === "ventas" ? GAR_HEADER.ventasActivas : GAR_HEADER.comprasActivas}
              </b>{" "}
              garantías de {tab === "ventas" ? "ventas" : "compras"}
            </span>
            <span>
              Valor en garantía <b className="font-mono text-foreground">{formatCOP(GAR_HEADER.valorEnGarantia)}</b>
            </span>
          </div>
        </div>
      </div>
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

function Td({ children, align = "left" }: { children?: React.ReactNode; align?: "left" | "right" }) {
  return (
    <td className={[
      "whitespace-top px-3 py-2.5 align-top text-[13px] text-foreground/85",
      align === "right" ? "text-right" : "text-left",
    ].join(" ")}>
      {children}
    </td>
  );
}

const RESOL_PILL: Record<string, string> = {
  reparacion: "bg-[--info-50] text-[--info-700] border-[#C8DFFC] dark:bg-[rgba(46,144,250,.16)] dark:text-[#7CC4FD] dark:border-[rgba(46,144,250,.35)]",
  cambio:     "bg-[--prog-50] text-[--prog-700] border-[--prog-border] dark:bg-[rgba(154,111,223,.18)] dark:text-[#D6BBFB] dark:border-[rgba(154,111,223,.4)]",
  reembolso:  "bg-[--warn-50] text-[--warn-700] border-[#FCE7B0] dark:bg-[rgba(247,144,9,.16)] dark:text-[#FDB022] dark:border-[rgba(247,144,9,.35)]",
  reposicion: "bg-[--prog-50] text-[--prog-700] border-[--prog-border] dark:bg-[rgba(154,111,223,.18)] dark:text-[#D6BBFB] dark:border-[rgba(154,111,223,.4)]",
  nota:       "bg-[--info-50] text-[--info-700] border-[#C8DFFC] dark:bg-[rgba(46,144,250,.16)] dark:text-[#7CC4FD] dark:border-[rgba(46,144,250,.35)]",
};

const ESTADO_PILL_V: Record<string, string> = {
  activa:    "s-pill s-borr",
  proceso:   "s-pill s-env",
  aprobada:  "s-pill s-apr",
  resuelta:  "s-pill s-apr",
  rechazada: "s-pill s-rec",
};

const ESTADO_PILL_C: Record<string, string> = {
  activa:    "s-pill s-borr",
  enviada:   "s-pill s-env",
  aceptada:  "s-pill s-apr",
  rechazada: "s-pill s-rec",
};

function diasClass(tone: "ok" | "warn" | "danger") {
  if (tone === "ok") return "text-[--succ-700] dark:text-[#6CE9A6]";
  if (tone === "warn") return "text-[--warn-700] dark:text-[#FDB022]";
  return "text-[--dang-700] dark:text-[#FDA29B]";
}

function GarRowVentas({ row }: { row: GarRowV }) {
  const navigate = useNavigate();
  return (
    <tr
      className={[
        "h-14 cursor-pointer border-b border-border/60 last:border-b-0 hover:bg-muted/40",
        row.warnRow ? "bg-[--warn-50]/40 dark:bg-[rgba(247,144,9,.06)]" : "",
      ].join(" ")}
      onClick={() => navigate({ to: "/ops/garantias/$id", params: { id: row.num } })}
    >
      <Td>
        <Link
          to="/ops/garantias/$id"
          params={{ id: row.num }}
          onClick={(e) => e.stopPropagation()}
          className="font-mono text-[12.5px] font-medium text-foreground hover:underline"
        >
          {row.num}
        </Link>
      </Td>
      <Td><span className="font-mono text-[11.5px] text-muted-foreground">{row.fecha}</span></Td>
      <Td>
        <div className="flex min-w-0 flex-col leading-tight">
          <span className="text-[13px] font-medium text-foreground">{row.cliente}</span>
          <span className="font-mono text-[11px] text-muted-foreground">{row.telefono}</span>
        </div>
      </Td>
      <Td>
        <div className="flex min-w-0 flex-col leading-tight">
          <span className="text-[13px] font-medium text-foreground">{row.producto}</span>
          <span className="font-mono text-[11px] text-muted-foreground">{row.productoSub}</span>
        </div>
      </Td>
      <Td>
        <Link
          to="/ops/ventas/$id"
          params={{ id: row.ventaOrigen }}
          onClick={(e) => e.stopPropagation()}
          className="link-pill v"
        >
          {row.ventaOrigen}
        </Link>
      </Td>
      <Td>
        <span className={`font-mono text-[12.5px] tabular-nums ${diasClass(row.diasTone)}`}>{row.vencimiento}</span>
      </Td>
      <Td>
        <span className={`font-mono text-[12.5px] tabular-nums ${diasClass(row.diasTone)}`}>{row.dias} días</span>
      </Td>
      <Td>
        <span className={[
          "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium whitespace-nowrap",
          RESOL_PILL[row.resolucion],
        ].join(" ")}>
          <span className="size-1.5 rounded-full bg-current opacity-70" />
          {row.resolucionLabel}
        </span>
      </Td>
      <Td>
        <div className="flex flex-col gap-0.5">
          <span className={ESTADO_PILL_V[row.estado]}>
            {row.estado === "resuelta" || row.estado === "aprobada"
              ? <Check className="size-2.5" strokeWidth={3} />
              : row.estado === "rechazada"
                ? <X className="size-2.5" strokeWidth={3} />
                : <span className={`dot ${row.pulse ? "animate-pulse" : ""}`} />}
            {row.estadoLabel}
          </span>
          {row.estadoNota && (
            <span className="font-mono text-[10.5px] text-muted-foreground">{row.estadoNota}</span>
          )}
        </div>
      </Td>
    </tr>
  );
}

function GarRowCompras({ row }: { row: GarRowC }) {
  const navigate = useNavigate();
  return (
    <tr
      className="h-14 cursor-pointer border-b border-border/60 last:border-b-0 hover:bg-muted/40"
      onClick={() => navigate({ to: "/ops/garantias/$id", params: { id: row.num } })}
    >
      <Td>
        <Link
          to="/ops/garantias/$id"
          params={{ id: row.num }}
          onClick={(e) => e.stopPropagation()}
          className="font-mono text-[12.5px] font-medium text-foreground hover:underline"
        >
          {row.num}
        </Link>
      </Td>
      <Td><span className="font-mono text-[11.5px] text-muted-foreground">{row.fecha}</span></Td>
      <Td>
        <div className="flex min-w-0 flex-col leading-tight">
          <span className="text-[13px] font-medium text-foreground">{row.proveedor}</span>
          <span className="font-mono text-[11px] text-muted-foreground">{row.nit}</span>
        </div>
      </Td>
      <Td>
        <div className="flex min-w-0 flex-col leading-tight">
          <span className="text-[13px] font-medium text-foreground">{row.producto}</span>
          <span className="font-mono text-[11px] text-muted-foreground">{row.productoSub}</span>
        </div>
      </Td>
      <Td>
        <span className="link-pill" onClick={(e) => e.stopPropagation()}>{row.ocOrigen}</span>
      </Td>
      <Td><span className="text-[12.5px] font-medium text-foreground/90">{row.motivo}</span></Td>
      <Td>
        <span className={[
          "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium whitespace-nowrap",
          RESOL_PILL[row.resolucion],
        ].join(" ")}>
          <span className="size-1.5 rounded-full bg-current opacity-70" />
          {row.resolucionLabel}
        </span>
      </Td>
      <Td align="right">
        <span className="font-mono text-[13.5px] font-medium tabular-nums text-foreground">{formatCOP(row.valor)}</span>
      </Td>
      <Td>
        <div className="flex flex-col gap-0.5">
          <span className={ESTADO_PILL_C[row.estado]}>
            {row.estado === "aceptada"
              ? <Check className="size-2.5" strokeWidth={3} />
              : row.estado === "rechazada"
                ? <X className="size-2.5" strokeWidth={3} />
                : <span className={`dot ${row.pulse ? "animate-pulse" : ""}`} />}
            {row.estadoLabel}
          </span>
          {row.estadoNota && (
            <span className={[
              "font-mono text-[10.5px]",
              row.estado === "rechazada" ? "text-[--dang-700] dark:text-[#FDA29B]" : "text-muted-foreground",
            ].join(" ")}>{row.estadoNota}</span>
          )}
          {row.altoValor && (
            <span className="mt-0.5 inline-flex w-fit items-center rounded border border-[--prog-border] bg-[--prog-50] px-1.5 py-0.5 font-mono text-[9.5px] font-medium uppercase tracking-wider text-[--prog-700] dark:bg-[rgba(154,111,223,.16)] dark:text-[#D6BBFB] dark:border-[rgba(154,111,223,.35)]">
              Alto valor
            </span>
          )}
        </div>
      </Td>
    </tr>
  );
}
