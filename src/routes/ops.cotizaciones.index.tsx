import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Download,
  Plus,
  Link as LinkIcon,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Clock,
} from "lucide-react";
import {
  COTIZACIONES_ROWS,
  COT_ESTADOS,
  COT_COUNTS,
  COT_PAGINATION,
  type CotEstado,
  type CotRow,
} from "@/lib/cotizaciones-data";
import { formatCOP } from "@/lib/format";

export const Route = createFileRoute("/ops/cotizaciones/")({
  head: () => ({ meta: [{ title: "Cotizaciones · CHV" }] }),
  component: CotizacionesListaPage,
});

function CotizacionesListaPage() {
  const [tab, setTab] = useState<CotEstado | "all">("all");
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return COTIZACIONES_ROWS.filter((r) => {
      if (tab !== "all" && r.estado !== tab) return false;
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
            Cotizaciones
          </h1>
          <p className="mt-1.5 text-[13px] leading-[1.5] text-muted-foreground">
            <b className="font-mono font-medium text-foreground">33</b> cotizaciones activas ·{" "}
            <b className="font-mono font-medium text-foreground">8</b> aprobadas ·{" "}
            <b className="font-mono font-medium text-foreground">$ 24.8M</b> en pipeline este mes
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2.5">
          <button className="btn-out inline-flex items-center gap-1.5">
            <Download className="size-3.5" /> Exportar
          </button>
          <Link to="/ops/cotizaciones/nueva" className="btn-pri inline-flex items-center gap-1.5">
            <Plus className="size-3.5" /> Nueva cotización
          </Link>
        </div>
      </div>

      {/* Tabs de estado */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-border bg-card px-7 py-3">
        <TabPill
          active={tab === "all"}
          label="Todas"
          count={COT_COUNTS.all}
          onClick={() => setTab("all")}
        />
        {COT_ESTADOS.map((e) => (
          <TabPill
            key={e.id}
            active={tab === e.id}
            label={e.label}
            count={COT_COUNTS[e.id]}
            onClick={() => setTab(e.id)}
          />
        ))}
      </div>

      {/* Search row */}
      <div className="flex items-center gap-3 bg-card/40 px-7 py-3">
        <div className="flex h-10 max-w-[560px] flex-1 items-center gap-2.5 rounded-lg border border-border bg-background px-3.5">
          <Search className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por #, cliente, producto…"
            className="min-w-0 flex-1 border-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
          />
          <span className="shrink-0 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
            /
          </span>
        </div>
        <button className="btn-out inline-flex h-10 items-center gap-1.5">
          <Filter className="size-3.5" /> Filtros
        </button>
        <span className="ml-auto font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          <b className="font-medium text-foreground">{rows.length}</b> de{" "}
          <b className="font-medium text-foreground">{COT_PAGINATION.total}</b>
        </span>
      </div>

      {/* Tabla */}
      <div className="flex-1 overflow-auto px-7 pb-7 pt-3">
        <div className="overflow-hidden rounded-[10px] border border-border bg-card">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <Th width={96}>#</Th>
                <Th width={90}>Fecha</Th>
                <Th>Cliente</Th>
                <Th width={220}>Productos</Th>
                <Th width={120} align="right">Valor</Th>
                <Th width={120}>Validez</Th>
                <Th width={120}>Estado</Th>
                <Th width={130}>Vinculación</Th>
                <Th width={36}></Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <CotRowItem key={r.num} row={r} />
              ))}
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    className="px-6 py-16 text-center text-sm text-muted-foreground"
                  >
                    Sin cotizaciones para los filtros aplicados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Footer paginación */}
          <div className="flex items-center justify-between border-t border-border bg-muted/30 px-5 py-3.5 text-xs text-muted-foreground">
            <span>
              <span className="font-mono">{rows.length}</span> de{" "}
              <span className="font-mono">{COT_PAGINATION.total}</span> · Página{" "}
              <span className="font-mono">{COT_PAGINATION.page}</span> de{" "}
              <span className="font-mono">{COT_PAGINATION.totalPages}</span>
            </span>
            <div className="flex items-center gap-1.5">
              <PagerBtn disabled><ChevronLeft className="size-3" /></PagerBtn>
              <PagerBtn current>1</PagerBtn>
              <PagerBtn>2</PagerBtn>
              <PagerBtn>3</PagerBtn>
              <PagerBtn>4</PagerBtn>
              <PagerBtn>5</PagerBtn>
              <PagerBtn><ChevronRight className="size-3" /></PagerBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────── subcomponentes ──────────────────────────── */

function TabPill({
  active, label, count, onClick,
}: { active: boolean; label: string; count: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] transition-colors",
        active
          ? "border-border bg-muted font-medium text-foreground"
          : "border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground",
      ].join(" ")}
    >
      {label}
      <span
        className={[
          "min-w-[22px] rounded-full px-1.5 py-0.5 text-center font-mono text-[11px]",
          active ? "bg-background text-foreground" : "bg-muted text-muted-foreground",
        ].join(" ")}
      >
        {count}
      </span>
    </button>
  );
}

function Th({
  children, width, align = "left",
}: { children?: React.ReactNode; width?: number; align?: "left" | "right" }) {
  return (
    <th
      style={{ width }}
      className={[
        "whitespace-nowrap border-b border-border bg-muted/30 px-3.5 py-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.1em] text-muted-foreground",
        align === "right" ? "text-right" : "text-left",
      ].join(" ")}
    >
      {children}
    </th>
  );
}

function CotRowItem({ row }: { row: CotRow }) {
  return (
    <tr className="h-12 cursor-pointer border-b border-border/60 last:border-b-0 hover:bg-muted/40">
      <Td>
        <Link
          to="/ops/cotizaciones/$id"
          params={{ id: row.num }}
          className="font-mono text-[13px] font-medium text-foreground hover:underline"
        >
          {row.num}
        </Link>
      </Td>
      <Td>
        <span className="font-mono text-[11.5px] text-muted-foreground">{row.fecha}</span>
      </Td>
      <Td>
        <div className="flex min-w-0 flex-col leading-tight">
          <span className="max-w-[200px] truncate text-[13px] font-medium text-foreground">
            {row.cliente}
          </span>
          <span className="font-mono text-[11px] text-muted-foreground">{row.telefono}</span>
        </div>
      </Td>
      <Td>
        <span className="block max-w-[200px] truncate text-[12.5px] text-foreground/85">
          {row.productos}
        </span>
      </Td>
      <Td align="right">
        <span className="font-mono text-[13.5px] font-medium tabular-nums text-foreground">
          {formatCOP(row.valor)}
        </span>
      </Td>
      <Td>
        <Validez tone={row.validez.tone} icon={row.validez.icon}>{row.validez.label}</Validez>
      </Td>
      <Td>
        <span className={`s-pill s-${row.estado}`}>
          <span className="dot" />
          {COT_ESTADOS.find((e) => e.id === row.estado)?.label ?? row.estado}
        </span>
      </Td>
      <Td>
        {row.ot ? (
          <a
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[11px] font-medium"
            style={{
              background: "var(--info-50)",
              color: "var(--info-700)",
              border: "1px solid #C8DFFC",
            }}
          >
            <LinkIcon className="size-3" /> {row.ot}
          </a>
        ) : (
          <span className="font-mono text-[11px] text-muted-foreground/50">—</span>
        )}
      </Td>
      <Td>
        <button
          className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Acciones de la fila"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVertical className="size-3.5" />
        </button>
      </Td>
    </tr>
  );
}

function Td({
  children, align = "left",
}: { children?: React.ReactNode; align?: "left" | "right" }) {
  return (
    <td
      className={[
        "whitespace-nowrap px-3.5 align-middle text-[13px] text-foreground/85",
        align === "right" ? "text-right" : "text-left",
      ].join(" ")}
    >
      {children}
    </td>
  );
}

function Validez({
  tone, icon, children,
}: { tone: "norm" | "warn" | "dang"; icon?: "alert" | "clock"; children: React.ReactNode }) {
  if (tone === "norm") {
    return <span className="font-mono text-[11.5px] text-muted-foreground">{children}</span>;
  }
  const Icon = icon === "alert" ? AlertCircle : Clock;
  const styles =
    tone === "dang"
      ? { background: "var(--dang-50)", color: "var(--dang-700)" }
      : { background: "var(--warn-50)", color: "var(--warn-700)" };
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 font-mono text-[11.5px]"
      style={styles}
    >
      <Icon className="size-3" /> {children}
    </span>
  );
}

function PagerBtn({
  children, current, disabled,
}: { children: React.ReactNode; current?: boolean; disabled?: boolean }) {
  return (
    <button
      disabled={disabled}
      className={[
        "flex h-7 min-w-7 items-center justify-center rounded-md border px-2 font-mono text-xs transition-colors",
        current ? "" : "border-border bg-background text-foreground hover:bg-muted",
        disabled ? "opacity-40" : "",
      ].join(" ")}
      style={
        current
          ? { background: "var(--p-600)", borderColor: "var(--p-600)", color: "#fff" }
          : {}
      }
    >
      {children}
    </button>
  );
}
