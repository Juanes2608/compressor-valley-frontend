import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Plus } from "lucide-react";
import {
  COMPRAS_ROWS, COMPRAS_TABS, COMPRAS_HEADER,
  type CompraEstado, type CompraRow,
} from "@/lib/compras-data";
import { formatCOP } from "@/lib/format";

export const Route = createFileRoute("/ops/compras/")({
  head: () => ({ meta: [{ title: "Compras · CHV" }] }),
  component: ComprasLista,
});

const ESTADO_PILL: Record<CompraEstado, { cls: string; label: string }> = {
  borrador:     { cls: "s-pill s-borr", label: "Borrador" },
  transito:     { cls: "s-pill s-env",  label: "En tránsito" },
  completa:     { cls: "s-pill s-apr",  label: "Recibida completa" },
  parcial:      { cls: "s-pill s-ven",  label: "Recibida parcial" },
  dev_garantia: { cls: "s-pill s-conv", label: "Dev. garantía" },
};

function ComprasLista() {
  const [tab, setTab] = useState<CompraEstado | "all">("all");
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return COMPRAS_ROWS.filter((r) => {
      if (tab !== "all" && r.estado !== tab) return false;
      if (!needle) return true;
      return (
        r.num.toLowerCase().includes(needle) ||
        r.proveedor.nombre.toLowerCase().includes(needle) ||
        r.productos.toLowerCase().includes(needle)
      );
    });
  }, [q, tab]);

  return (
    <div className="flex h-full flex-col">
      {/* Page header */}
      <div className="flex items-start gap-6 border-b border-[--n-100] bg-[--n-0] px-7 pb-4 pt-6">
        <div className="min-w-0 flex-1">
          <h1 className="m-0 text-[22px] font-semibold tracking-[-0.01em] text-[--n-950]">Compras</h1>
          <p className="mt-1.5 text-[13px] leading-[1.5] text-[--n-500]">
            <b className="font-mono font-medium text-[--n-700]">{COMPRAS_HEADER.mes}</b> este mes ·{" "}
            <b className="font-mono font-medium text-[--n-700]">{formatCOP(COMPRAS_HEADER.comprado)}</b> comprado ·{" "}
            <b className="font-mono font-medium text-[--n-700]">{COMPRAS_HEADER.enTransito}</b> en tránsito
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <div className="flex items-center gap-0.5 rounded-lg bg-[--n-100] p-[3px]">
            {COMPRAS_TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                data-active={tab === t.id}
                className="rounded-md px-3 py-1.5 text-[12.5px] font-medium text-[--n-500] data-[active=true]:bg-[--n-0] data-[active=true]:text-[--n-950] data-[active=true]:shadow-[0_1px_2px_rgba(14,16,24,.06)]"
              >
                {t.label}
              </button>
            ))}
          </div>
          <Link to="/ops/compras/nueva" className="btn-pri inline-flex items-center gap-1.5 rounded-lg border border-transparent px-3.5 py-2 text-[13px] font-medium">
            <Plus className="size-3.5" /> Nueva compra
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-7 pb-14 pt-4">
        {/* Search */}
        <div className="flex h-10 items-center gap-2.5 rounded-lg border border-[--n-150] bg-[--n-0] px-3">
          <Search className="size-4 text-[--n-400]" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por número, proveedor o producto..."
            className="flex-1 border-none bg-transparent text-[13.5px] text-[--n-700] outline-none"
          />
          <span className="rounded border border-[--n-100] bg-[--n-50] px-1.5 py-px font-mono text-[10.5px] text-[--n-500]">⌘K</span>
        </div>

        {/* Table card */}
        <div className="overflow-hidden rounded-[10px] border border-[--n-150] bg-[--n-0]">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <Th w="88px">#</Th>
                <Th w="84px">Fecha orden</Th>
                <Th w="220px">Proveedor</Th>
                <Th>Productos</Th>
                <Th w="110px" right>Total</Th>
                <Th w="124px">Entrega est.</Th>
                <Th w="152px">Estado</Th>
                <Th w="140px">Recibido</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => <CompraTr key={r.num} r={r} />)}
              {rows.length === 0 && (
                <tr><td colSpan={8} className="px-3 py-10 text-center text-[12.5px] text-[--n-500]">Sin compras que coincidan con el filtro.</td></tr>
              )}
            </tbody>
          </table>
          <div className="flex items-center justify-between border-t border-[--n-100] bg-[--n-25] px-4 py-3 text-[12px] text-[--n-500]">
            <span>Mostrando <b className="font-mono text-[--n-950]">{rows.length}</b> de <b className="font-mono text-[--n-950]">{COMPRAS_ROWS.length}</b> compras del mes</span>
            <span className="font-mono">Página 1 de 3</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Th({ children, w, right }: { children: React.ReactNode; w?: string; right?: boolean }) {
  return (
    <th
      style={{ width: w }}
      className={`border-b border-[--n-150] bg-[--n-25] px-3 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-[--n-400] ${right ? "text-right" : "text-left"}`}
    >
      {children}
    </th>
  );
}

function CompraTr({ r }: { r: CompraRow }) {
  const pill = ESTADO_PILL[r.estado];
  const navigate = useNavigate();
  return (
    <tr
      onClick={() => navigate({ to: "/ops/compras/$id", params: { id: r.num } })}
      className="cursor-pointer border-b border-[--n-75] last:border-b-0 transition-colors hover:bg-[--p-cta]/5"
    >
      <td className="px-3 py-2.5">
        <Link
          to="/ops/compras/$id"
          params={{ id: r.num }}
          onClick={(e) => e.stopPropagation()}
          className="font-mono text-[12.5px] font-medium text-[--n-950] hover:underline"
        >
          {r.num}
        </Link>
      </td>
      <td className="px-3 py-2.5 font-mono text-[11.5px] text-[--n-500]">{r.fecha}</td>
      <td className="px-3 py-2.5">
        <div className="text-[13px] font-medium leading-tight text-[--n-950]">{r.proveedor.nombre}</div>
        <div className="font-mono text-[11.5px] text-[--n-500]">{r.proveedor.nit}</div>
      </td>
      <td className="max-w-[240px] truncate px-3 py-2.5 text-[12.5px] text-[--n-700]">{r.productos}</td>
      <td className="px-3 py-2.5 text-right font-mono text-[13.5px] font-medium text-[--n-950]">{formatCOP(r.total)}</td>
      <td className={`px-3 py-2.5 font-mono text-[11.5px] ${r.entregaTone === "warn" ? "text-[--warn-700]" : "text-[--n-700]"}`}>{r.entregaEst}</td>
      <td className="px-3 py-2.5"><span className={pill.cls}><span className="dot" />{pill.label}</span></td>
      <td className="px-3 py-2.5">
        {r.estado === "transito" || r.estado === "borrador" ? (
          <span className="font-mono text-[11.5px] text-[--n-400]">{r.estado === "borrador" ? "—" : "Esperando"}</span>
        ) : (
          <RecBar r={r} />
        )}
      </td>
    </tr>
  );
}

function RecBar({ r }: { r: CompraRow }) {
  if (!r.recibido) return null;
  const pct = (r.recibido.actual / r.recibido.total) * 100;
  const tone = r.estado === "parcial" ? "bg-[--warn-500]" : r.estado === "dev_garantia" ? "bg-[--info-500]" : "bg-[--succ-500]";
  return (
    <div className="font-mono text-[11.5px] text-[--n-700]">
      <div className="mb-1">{r.recibido.actual}/{r.recibido.total} items</div>
      <div className="h-1 rounded-full bg-[--n-100] overflow-hidden"><div className={`h-full rounded-full ${tone}`} style={{ width: `${pct}%` }} /></div>
    </div>
  );
}
