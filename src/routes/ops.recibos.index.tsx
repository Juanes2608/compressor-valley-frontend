import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Plus, Download } from "lucide-react";
import {
  RECIBOS_ROWS, RECIBOS_TABS, RECIBOS_HEADER,
  type RecTipo, type RecibroRow,
} from "@/lib/recibos-data";
import { formatCOP } from "@/lib/format";

export const Route = createFileRoute("/ops/recibos/")({
  head: () => ({ meta: [{ title: "Recibos · CHV" }] }),
  component: RecibosLista,
});

function RecibosLista() {
  const [tab, setTab] = useState<RecTipo | "all">("all");
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return RECIBOS_ROWS.filter((r) => {
      if (tab !== "all" && r.tipo !== tab) return false;
      if (!needle) return true;
      return (
        r.num.toLowerCase().includes(needle) ||
        r.cliente.toLowerCase().includes(needle) ||
        r.concepto.toLowerCase().includes(needle) ||
        r.origen.some((o) => o.num.toLowerCase().includes(needle))
      );
    });
  }, [q, tab]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start gap-6 border-b border-border bg-card px-7 pb-4 pt-6">
        <div className="min-w-0 flex-1">
          <h1 className="m-0 text-[22px] font-semibold tracking-[-0.01em] text-foreground">Recibos</h1>
          <p className="mt-1.5 text-[13px] leading-[1.5] text-muted-foreground">
            <b className="font-mono font-medium text-foreground">{RECIBOS_HEADER.mesCount}</b> este mes ·{" "}
            <b className="font-mono font-medium text-foreground">{RECIBOS_HEADER.cobrado}</b> cobrado ·{" "}
            <b className="font-mono font-medium text-foreground">{RECIBOS_HEADER.hoy}</b> emitidos hoy
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2.5">
          <button className="btn-out inline-flex items-center gap-1.5">
            <Download className="size-3.5" /> Exportar
          </button>
          <Link to="/ops/recibos/nueva" className="btn-pri inline-flex items-center gap-1.5">
            <Plus className="size-3.5" /> Nuevo recibo
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 border-b border-border bg-card px-7 py-3">
        {RECIBOS_TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={[
              "rounded-md px-3 py-1.5 text-[12.5px] font-medium transition-colors",
              tab === t.id
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
            ].join(" ")}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 bg-card/40 px-7 py-3">
        <div className="flex h-10 max-w-[560px] flex-1 items-center gap-2.5 rounded-lg border border-border bg-background px-3.5">
          <Search className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar recibo por número, cliente o cotización…"
            className="min-w-0 flex-1 border-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
          />
          <span className="shrink-0 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
            ⌘K
          </span>
        </div>
        <span className="ml-auto font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          Consecutivo activo · <b className="font-medium text-foreground">Rec-1284</b>
        </span>
      </div>

      <div className="flex-1 overflow-auto px-7 pb-7 pt-3">
        <div className="overflow-hidden rounded-[10px] border border-border bg-card">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <Th width={92}>#</Th>
                <Th width={104}>Fecha</Th>
                <Th width={210}>Cliente</Th>
                <Th>Concepto</Th>
                <Th width={140}>Tipo</Th>
                <Th width={170}>Origen</Th>
                <Th width={120} align="right">Total</Th>
                <Th width={130}>Emitido por</Th>
                <Th width={100}>Estado</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => <RRow key={r.num} row={r} />)}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-6 py-16 text-center text-sm text-muted-foreground">
                    Sin recibos para los filtros aplicados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex items-center justify-between border-t border-border bg-muted/30 px-5 py-3.5 text-xs text-muted-foreground">
            <span>Mostrando <b className="font-mono text-foreground">{rows.length}</b> de <b className="font-mono text-foreground">{RECIBOS_HEADER.mesCount}</b> recibos del mes</span>
            <span className="font-mono">Consecutivo activo · Rec-1284</span>
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

const TIPO_PILL: Record<RecTipo, "info" | "neut" | "prog"> = { cot: "info", manual: "neut", ot: "prog" };
const TIPO_CLS: Record<"info" | "neut" | "prog", string> = {
  info: "bg-[--info-50] text-[--info-700] border-[#C8DFFC] dark:bg-[rgba(46,144,250,.16)] dark:text-[#7CC4FD] dark:border-[rgba(46,144,250,.35)]",
  neut: "bg-muted text-foreground/80 border-border",
  prog: "bg-[--p-50] text-[--p-700] border-[--p-200] dark:bg-[rgba(45,60,229,.18)] dark:text-[#C2CCFF] dark:border-[rgba(45,60,229,.4)]",
};

function RRow({ row }: { row: RecibroRow }) {
  const navigate = useNavigate();
  const tone = TIPO_PILL[row.tipo];
  return (
    <tr
      className={[
        "h-12 cursor-pointer border-b border-border/60 last:border-b-0 hover:bg-muted/40",
        row.cycle ? "row-cycle" : "",
      ].join(" ")}
      onClick={() => navigate({ to: "/ops/recibos/$id", params: { id: row.num } })}
    >
      <Td>
        <Link
          to="/ops/recibos/$id"
          params={{ id: row.num }}
          onClick={(e) => e.stopPropagation()}
          className="v-num font-mono text-[12.5px] font-medium text-foreground hover:underline"
        >
          {row.num}
        </Link>
      </Td>
      <Td><span className="font-mono text-[11.5px] text-muted-foreground">{row.fecha}</span></Td>
      <Td>
        <div className="flex min-w-0 flex-col leading-tight">
          <span className="max-w-[200px] truncate text-[13px] font-medium text-foreground">{row.cliente}</span>
          <span className="font-mono text-[11px] text-muted-foreground">{row.telefono}</span>
        </div>
      </Td>
      <Td>
        <span className="block max-w-[280px] truncate text-[12.5px] text-foreground/85">{row.concepto}</span>
      </Td>
      <Td>
        <span className={[
          "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
          TIPO_CLS[tone],
        ].join(" ")}>
          <span className="size-1.5 rounded-full bg-current opacity-70" />
          {row.tipoLabel}
        </span>
      </Td>
      <Td>
        {row.origen.length === 0
          ? <span className="font-mono text-[12px] text-muted-foreground/60">—</span>
          : (
            <div className="flex flex-wrap gap-1">
              {row.origen.map((o) => (
                <Link
                  key={o.num}
                  to={o.kind === "v" ? "/ops/ventas/$id" : o.kind === "cot" ? "/ops/cotizaciones/$id" : "/ops/ordenes-trabajo"}
                  params={o.kind === "ot" ? undefined as never : { id: o.num }}
                  onClick={(e) => e.stopPropagation()}
                  className={`link-pill ${o.kind}`}
                >
                  {o.num}
                </Link>
              ))}
            </div>
          )}
      </Td>
      <Td align="right">
        <span className={[
          "font-mono text-[13.5px] font-medium tabular-nums",
          row.tachado ? "text-muted-foreground line-through" : "text-foreground",
        ].join(" ")}>
          {formatCOP(row.total)}
        </span>
      </Td>
      <Td>
        <span className="inline-flex items-center gap-2 text-[12.5px] text-foreground/85">
          <span className={`av-mini ${row.vendedor.variant}`}>{row.vendedor.ini}</span>
          {row.vendedor.nombre}
        </span>
      </Td>
      <Td>
        <span className={`s-pill ${row.estado === "anul" ? "s-rec" : "s-apr"}`}>
          <span className="dot" />{row.estadoLabel}
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
