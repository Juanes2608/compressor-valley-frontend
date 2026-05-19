import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Plus, Download, Filter } from "lucide-react";
import {
  VENTAS_ROWS, VENTAS_TABS, VENTAS_HEADER,
  type PagoMetodo, type VentaRow,
} from "@/lib/ventas-data";
import { formatCOP } from "@/lib/format";

export const Route = createFileRoute("/ops/ventas/")({
  head: () => ({ meta: [{ title: "Ventas · CHV" }] }),
  component: VentasLista,
});

function VentasLista() {
  const [tab, setTab] = useState<PagoMetodo | "all">("all");
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return VENTAS_ROWS.filter((r) => {
      if (tab !== "all" && r.metodo !== tab) return false;
      if (!needle) return true;
      return (
        r.num.toLowerCase().includes(needle) ||
        r.cliente.toLowerCase().includes(needle) ||
        r.productos.toLowerCase().includes(needle)
      );
    });
  }, [q, tab]);

  return (
    <div className="flex h-full flex-col">
      {/* Page head */}
      <div className="flex items-start gap-6 border-b border-border bg-card px-7 pb-4 pt-6">
        <div className="min-w-0 flex-1">
          <h1 className="m-0 text-[22px] font-semibold tracking-[-0.01em] text-foreground">
            Ventas
          </h1>
          <p className="mt-1.5 text-[13px] leading-[1.5] text-muted-foreground">
            <b className="font-mono font-medium text-foreground">{VENTAS_HEADER.mesCount}</b> este mes ·{" "}
            <b className="font-mono font-medium text-foreground">{VENTAS_HEADER.facturado}</b> facturado ·{" "}
            <b className="font-mono font-medium text-foreground">{VENTAS_HEADER.hoy}</b> hoy
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2.5">
          <button className="btn-out inline-flex items-center gap-1.5">
            <Download className="size-3.5" /> Exportar
          </button>
          <Link to="/ops/ventas/nueva" className="btn-pri inline-flex items-center gap-1.5">
            <Plus className="size-3.5" /> Nueva venta
          </Link>
        </div>
      </div>

      {/* Tabs por método de pago */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-border bg-card px-7 py-3">
        {VENTAS_TABS.map((t) => (
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

      {/* Search row */}
      <div className="flex items-center gap-3 bg-card/40 px-7 py-3">
        <div className="flex h-10 max-w-[560px] flex-1 items-center gap-2.5 rounded-lg border border-border bg-background px-3.5">
          <Search className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar venta por número, cliente o producto…"
            className="min-w-0 flex-1 border-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
          />
          <span className="shrink-0 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
            ⌘K
          </span>
        </div>
        <button className="btn-out inline-flex h-10 items-center gap-1.5">
          <Filter className="size-3.5" /> Filtros
        </button>
        <span className="ml-auto font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          <b className="font-medium text-foreground">{rows.length}</b> de{" "}
          <b className="font-medium text-foreground">{VENTAS_HEADER.mesCount}</b>
        </span>
      </div>

      {/* Tabla */}
      <div className="flex-1 overflow-auto px-7 pb-7 pt-3">
        <div className="overflow-hidden rounded-[10px] border border-border bg-card">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <Th width={88}>#</Th>
                <Th width={96}>Fecha</Th>
                <Th>Cliente</Th>
                <Th width={220}>Productos</Th>
                <Th width={140}>Vendedor</Th>
                <Th width={130}>Método pago</Th>
                <Th width={120} align="right">Total</Th>
                <Th width={110}>Recibo</Th>
                <Th width={130}>Estado</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => <VRow key={r.num} row={r} />)}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-6 py-16 text-center text-sm text-muted-foreground">
                    Sin ventas para los filtros aplicados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex items-center justify-between border-t border-border bg-muted/30 px-5 py-3.5 text-xs text-muted-foreground">
            <span>Mostrando <b className="font-mono text-foreground">{rows.length}</b> de <b className="font-mono text-foreground">{VENTAS_HEADER.mesCount}</b> ventas del mes</span>
            <span className="font-mono">Página 1 de 6 · ⌘G para ir</span>
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

function VRow({ row }: { row: VentaRow }) {
  const navigate = useNavigate();
  return (
    <tr
      className={[
        "h-12 cursor-pointer border-b border-border/60 last:border-b-0 hover:bg-muted/40",
        row.cycle ? "row-cycle" : "",
      ].join(" ")}
      onClick={() => navigate({ to: "/ops/ventas/$id", params: { id: row.num } })}
    >
      <Td>
        <Link
          to="/ops/ventas/$id"
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
        <span className="block max-w-[200px] truncate text-[12.5px] text-foreground/85">{row.productos}</span>
      </Td>
      <Td>
        <span className="inline-flex items-center gap-2 text-[12.5px] text-foreground/85">
          <span className={`av-mini ${row.vendedor.variant}`}>{row.vendedor.ini}</span>
          {row.vendedor.nombre}
        </span>
      </Td>
      <Td>
        <span className={`pay-pill ${row.metodo}`}><span className="dot" />{row.metodoLabel}</span>
      </Td>
      <Td align="right">
        <span
          className={[
            "font-mono text-[13.5px] font-medium tabular-nums",
            row.tachado ? "text-muted-foreground line-through" : "text-foreground",
          ].join(" ")}
        >
          {formatCOP(row.total)}
        </span>
      </Td>
      <Td>
        <span className="rec-pill">{row.recibo}</span>
      </Td>
      <Td>
        <div className="flex flex-col gap-1">
          <span className={`s-pill s-${row.estado}`}><span className="dot" />{row.estadoLabel}</span>
          {row.estadoNota && (
            <span className={[
              "font-mono text-[10.5px]",
              row.estado === "anul" ? "text-[--dang-700]" : "text-[--warn-700]",
            ].join(" ")}>
              {row.estadoNota}
            </span>
          )}
        </div>
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
