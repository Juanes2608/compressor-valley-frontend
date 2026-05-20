import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Plus, ArrowLeftCircle, Download } from "lucide-react";
import {
  DEV_ROWS, DEV_TABS, DEV_HEADER, DEV_FILTROS_C, DEV_FILTROS_P,
  type DevTab, type DevRow,
} from "@/lib/devoluciones-data";
import { formatCOP } from "@/lib/format";

export const Route = createFileRoute("/ops/devoluciones/")({
  head: () => ({ meta: [{ title: "Devoluciones · CHV" }] }),
  component: DevolucionesLista,
});

function DevolucionesLista() {
  const [tab, setTab] = useState<DevTab>("cliente");
  const [filtro, setFiltro] = useState<string>("Todas");
  const [q, setQ] = useState("");

  const filtros = tab === "cliente" ? DEV_FILTROS_C : DEV_FILTROS_P;

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return DEV_ROWS.filter((r) => {
      if (r.tab !== tab) return false;
      if (filtro !== "Todas") {
        const label = r.estadoLabel.toLowerCase();
        if (!label.includes(filtro.toLowerCase().replace("pend. ", "pend").split(" ")[0])) return false;
      }
      if (!needle) return true;
      return (
        r.num.toLowerCase().includes(needle) ||
        r.cliente.toLowerCase().includes(needle) ||
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
          <h1 className="m-0 text-[22px] font-semibold tracking-[-0.01em] text-foreground">Devoluciones</h1>
          <p className="mt-1.5 text-[13px] leading-[1.5] text-muted-foreground">
            <b className="font-mono font-medium text-foreground">{DEV_HEADER.mesCliente}</b> de cliente ·{" "}
            <b className="font-mono font-medium text-foreground">{DEV_HEADER.mesProveedor}</b> a proveedor ·{" "}
            <span className="font-medium text-[--warn-700] dark:text-[#FDB022]">
              {DEV_HEADER.pendientes} pendientes de validación
            </span>{" "}
            · Total mes <b className="font-mono font-medium text-foreground">{formatCOP(DEV_HEADER.totalDevuelto)}</b>
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2.5">
          <button className="btn-out inline-flex items-center gap-1.5">
            <Download className="size-3.5" /> Exportar
          </button>
          <Link to="/ops/devoluciones/nueva" className="btn-pri inline-flex items-center gap-1.5">
            <Plus className="size-3.5" /> Nueva devolución
          </Link>
        </div>
      </div>

      {/* Tabs duales */}
      <div className="border-b border-border bg-card px-7 pt-3">
        <div className="flex max-w-[520px] items-end border-b border-border">
          {DEV_TABS.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => { setTab(t.id); setFiltro("Todas"); }}
                className={[
                  "relative -mb-px flex h-11 flex-1 items-center justify-center gap-2 border-b-2 px-4 text-[13px] font-medium transition-colors",
                  active
                    ? "border-[--p-600] bg-[--p-50] font-semibold text-[--p-700] dark:bg-[rgba(45,60,229,.16)] dark:text-[#C2CCFF]"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                <span style={{ transform: t.id === "proveedor" ? "scaleX(-1)" : undefined }}>
                  <ArrowLeftCircle className="size-4" strokeWidth={2} />
                </span>
                {t.label}
                <span
                  className={[
                    "min-w-6 rounded-full px-1.5 text-center font-mono text-[11px]",
                    active
                      ? "bg-[--p-100] text-[--p-700] dark:bg-[rgba(45,60,229,.3)] dark:text-[#C2CCFF]"
                      : "bg-muted text-muted-foreground",
                  ].join(" ")}
                >
                  {t.count}
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
        {tab === "cliente" && (
          <select className="fselect ml-auto h-9 max-w-[210px]" defaultValue="">
            <option value="">Resolución: Todas</option>
            <option>Nota crédito</option>
            <option>Cambio de pieza</option>
            <option>Reembolso</option>
          </select>
        )}
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 bg-card/40 px-7 py-3">
        <div className="flex h-10 max-w-[560px] flex-1 items-center gap-2.5 rounded-lg border border-border bg-background px-3.5">
          <Search className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={tab === "cliente"
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
              <tr>
                <Th width={110}>#</Th>
                <Th width={90}>Fecha</Th>
                <Th width={210}>{tab === "cliente" ? "Cliente" : "Proveedor"}</Th>
                <Th width={220}>Producto</Th>
                <Th width={110}>{tab === "cliente" ? "Venta origen" : "OC origen"}</Th>
                <Th>Motivo</Th>
                {tab === "cliente" && <Th width={140}>Resolución</Th>}
                <Th width={110} align="right">Valor</Th>
                <Th width={170}>Estado</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => <DevRowEl key={r.num} row={r} />)}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={tab === "cliente" ? 9 : 8} className="px-6 py-16 text-center text-sm text-muted-foreground">
                    Sin devoluciones para los filtros aplicados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex items-center justify-between border-t border-border bg-muted/30 px-5 py-3.5 text-xs text-muted-foreground">
            <span>
              Mostrando <b className="font-mono text-foreground">{rows.length}</b> de{" "}
              <b className="font-mono text-foreground">
                {tab === "cliente" ? DEV_HEADER.mesCliente : DEV_HEADER.mesProveedor}
              </b>{" "}
              devoluciones {tab === "cliente" ? "de cliente" : "a proveedor"} este mes
            </span>
            <span>
              Total devuelto <b className="font-mono text-foreground">{formatCOP(DEV_HEADER.totalDevuelto)}</b>
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

const PILL_BY_ESTADO: Record<string, string> = {
  pen_val: "s-pill s-ven",
  aprobada: "s-pill s-apr",
  procesada: "s-pill s-comp",
  rechazada: "s-pill s-rec",
  pen_envio: "s-pill s-abierta",
  enviada: "s-pill s-proceso",
  aceptada: "s-pill s-apr",
};

const RESOL_PILL: Record<string, string> = {
  cambio:    "bg-[--p-50] text-[--p-700] border-[--p-200] dark:bg-[rgba(45,60,229,.18)] dark:text-[#C2CCFF] dark:border-[rgba(45,60,229,.4)]",
  nota:      "bg-[--info-50] text-[--info-700] border-[#C8DFFC] dark:bg-[rgba(46,144,250,.16)] dark:text-[#7CC4FD] dark:border-[rgba(46,144,250,.35)]",
  reembolso: "bg-[--warn-50] text-[--warn-700] border-[#FCE7B0] dark:bg-[rgba(247,144,9,.16)] dark:text-[#FDB022] dark:border-[rgba(247,144,9,.35)]",
  pendiente: "bg-muted text-muted-foreground border-border",
};

function DevRowEl({ row }: { row: DevRow }) {
  const navigate = useNavigate();
  return (
    <tr
      className={[
        "h-14 cursor-pointer border-b border-border/60 last:border-b-0 hover:bg-muted/40",
        row.loteVencido ? "bg-[--dang-50]/40 dark:bg-[rgba(240,68,56,.06)]" : "",
      ].join(" ")}
      onClick={() => navigate({ to: "/ops/devoluciones/$id", params: { id: row.num } })}
    >
      <Td>
        <Link
          to="/ops/devoluciones/$id"
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
          <span className="flex items-center gap-1.5 max-w-[200px] truncate text-[13px] font-medium text-foreground">
            {row.cliente}
          </span>
          <span className="font-mono text-[11px] text-muted-foreground">{row.telefono}</span>
        </div>
      </Td>
      <Td>
        <div className="flex min-w-0 flex-col leading-tight">
          <span className="flex items-center gap-1.5 text-[13px] font-medium text-foreground">
            {row.producto}
            {row.loteVencido && (
              <span className="inline-flex items-center rounded border border-[--dang-200] bg-[--dang-50] px-1.5 py-0.5 font-mono text-[9.5px] font-medium uppercase tracking-wider text-[--dang-700] dark:bg-[rgba(240,68,56,.16)] dark:text-[#FDA29B] dark:border-[rgba(240,68,56,.35)]">
                Lote vencido
              </span>
            )}
          </span>
          <span className="font-mono text-[11px] text-muted-foreground">{row.productoSub}</span>
        </div>
      </Td>
      <Td>
        <Link
          to={
            row.origen.kind === "v" ? "/ops/ventas/$id" :
            row.origen.kind === "ot" ? "/ops/ordenes-trabajo/$id" :
            "/ops/compras"
          }
          params={
            row.origen.kind === "v" || row.origen.kind === "ot"
              ? { id: row.origen.num }
              : undefined as never
          }
          onClick={(e) => e.stopPropagation()}
          className={`link-pill ${row.origen.kind}`}
        >
          {row.origen.num}
        </Link>
      </Td>
      <Td>
        <span className="block max-w-[260px] truncate text-[12.5px] text-foreground/80">
          {row.motivo}
        </span>
      </Td>
      {row.tab === "cliente" && (
        <Td>
          {row.resolucion && (
            <span className={[
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium whitespace-nowrap",
              RESOL_PILL[row.resolucion],
            ].join(" ")}>
              <span className="size-1.5 rounded-full bg-current opacity-70" />
              {row.resolucionLabel}
            </span>
          )}
        </Td>
      )}
      <Td align="right">
        <span className="font-mono text-[13.5px] font-medium tabular-nums text-foreground">
          {row.valor === null ? "—" : formatCOP(row.valor)}
        </span>
      </Td>
      <Td>
        <div className="flex flex-col gap-0.5">
          <span className={PILL_BY_ESTADO[row.estado]}>
            <span className={`dot ${row.pulse ? "animate-pulse" : ""}`} />
            {row.estadoLabel}
          </span>
          {row.estadoNota && (
            <span className={[
              "font-mono text-[10.5px]",
              row.estado === "rechazada" ? "text-[--dang-700] dark:text-[#FDA29B]" :
              row.estado === "aceptada"  ? "text-[--succ-700] dark:text-[#6CE9A6]" :
              "text-muted-foreground",
            ].join(" ")}>
              {row.estadoNota}
            </span>
          )}
        </div>
      </Td>
    </tr>
  );
}
