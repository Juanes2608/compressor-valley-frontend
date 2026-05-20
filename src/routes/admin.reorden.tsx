import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Package, Building2, ArrowRight, Download, ShoppingCart, Check,
} from "lucide-react";

export const Route = createFileRoute("/admin/reorden")({
  head: () => ({ meta: [{ title: "Reorden · CHV" }] }),
  component: ReordenPage,
});

type ReordenItem = {
  sku: string;
  name: string;
  sede: "WH-01 CALI" | "WH-02 PEREIRA";
  stock: number;
  minimo: number;
  sugerido: number;
  costoUnit: number;
  consumo90d: number;
  severity: "danger" | "warn";
};

type Proveedor = {
  id: string;
  nombre: string;
  nit: string;
  ultimaCompra: string;
  leadTime: string;
  items: ReordenItem[];
};

const PROVEEDORES: Proveedor[] = [
  {
    id: "PRV-014",
    nombre: "SULLAIR S.A.",
    nit: "900.124.785-3",
    ultimaCompra: "12 abr 2026",
    leadTime: "7 días",
    items: [
      { sku: "CMP-1410-S", name: "Compresor Sullair LS-110", sede: "WH-02 PEREIRA", stock: 0, minimo: 2, sugerido: 4, costoUnit: 18420000, consumo90d: 6, severity: "danger" },
      { sku: "RPT-0830-K", name: "Kit reparación Kaeser SX-7", sede: "WH-01 CALI", stock: 2, minimo: 8, sugerido: 16, costoUnit: 845000, consumo90d: 18, severity: "warn" },
      { sku: "SKU-4220-V", name: 'Válvula Ingersoll 3/4"', sede: "WH-02 PEREIRA", stock: 3, minimo: 12, sugerido: 24, costoUnit: 142000, consumo90d: 32, severity: "warn" },
    ],
  },
  {
    id: "PRV-027",
    nombre: "Atlas Copco Colombia",
    nit: "830.041.220-8",
    ultimaCompra: "3 abr 2026",
    leadTime: "10 días",
    items: [
      { sku: "FLT-2210-A", name: "Filtro aceite Atlas Copco GA-22", sede: "WH-01 CALI", stock: 4, minimo: 10, sugerido: 20, costoUnit: 218000, consumo90d: 24, severity: "warn" },
      { sku: "FLT-2215-A", name: "Filtro aire Atlas Copco GA-22", sede: "WH-01 CALI", stock: 5, minimo: 10, sugerido: 18, costoUnit: 184000, consumo90d: 22, severity: "warn" },
    ],
  },
  {
    id: "PRV-008",
    nombre: "Distribuidora Mobil",
    nit: "860.512.044-1",
    ultimaCompra: "28 mar 2026",
    leadTime: "3 días",
    items: [
      { sku: "ACE-0150-M", name: "Aceite Mobil Rarus 427 · 20L", sede: "WH-02 PEREIRA", stock: 6, minimo: 12, sugerido: 12, costoUnit: 425000, consumo90d: 14, severity: "warn" },
    ],
  },
];

function ReordenPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggle(sku: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(sku) ? next.delete(sku) : next.add(sku);
      return next;
    });
  }

  function toggleProveedor(p: Proveedor) {
    const skus = p.items.map((i) => i.sku);
    const allOn = skus.every((s) => selected.has(s));
    setSelected((prev) => {
      const next = new Set(prev);
      if (allOn) skus.forEach((s) => next.delete(s));
      else skus.forEach((s) => next.add(s));
      return next;
    });
  }

  const totalSel = selected.size;
  const valorSel = PROVEEDORES.flatMap((p) => p.items)
    .filter((i) => selected.has(i.sku))
    .reduce((acc, i) => acc + i.sugerido * i.costoUnit, 0);

  const totalSugerido = PROVEEDORES.flatMap((p) => p.items)
    .reduce((acc, i) => acc + i.sugerido * i.costoUnit, 0);

  return (
    <div className="flex flex-col gap-6 px-7 pb-8 pt-6">
      {/* Page head */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="m-0 mb-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-[--n-300]">
            Admin · Sugerencias de reposición
          </p>
          <h1 className="m-0 flex items-center gap-2.5 text-[24px] font-semibold leading-tight tracking-[-0.018em] text-[--n-950]">
            Reorden
            <span className="rounded-[3px] border border-[#FEDF89] bg-[--warn-50] px-1.5 py-px font-mono text-[11px] font-semibold text-[--warn-700]">
              6 SKUs · 3 proveedores
            </span>
          </h1>
        </div>
        <button className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[--n-200] bg-white px-3 text-[12.5px] font-medium text-[--n-700]">
          <Download className="h-3.5 w-3.5" strokeWidth={1.5} />
          Exportar sugerencias
        </button>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-y-4 border-b border-[--n-150] pb-4 md:grid-cols-4 md:gap-y-0">
        <Kpi label="SKUs en reorden" value="6" sub="2 urgentes · 4 advertencia" />
        <Kpi label="Proveedores" value="3" sub="Último proveedor sugerido" />
        <Kpi
          label="Valor total estimado"
          value={fmt(totalSugerido)}
          withCur
          sub="Costo · sin IVA · consumo 90d"
        />
        <Kpi last label="Lead time promedio" value="6,7 d" sub="Min 3d · máx 10d" />
      </div>

      {/* Selection bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[10px] border border-[--n-150] bg-[--n-50] px-4 py-2.5">
        <div className="flex items-center gap-3 text-[12px]">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.06em] text-[--n-500]">
            Selección
          </span>
          <span className="font-mono text-[12px] font-semibold text-[--n-950]">
            {totalSel} SKUs
          </span>
          <span className="text-[--n-300]">·</span>
          <span className="font-mono text-[12px] text-[--n-700]">
            <span className="text-[--n-400]">$</span>
            {fmt(valorSel).replace(/^\$/, "")}
          </span>
        </div>
        <button
          disabled={totalSel === 0}
          className={`inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-[12.5px] font-semibold ${
            totalSel === 0
              ? "border border-[--n-200] bg-white text-[--n-400]"
              : "bg-[--p-600] text-white hover:bg-[--p-700]"
          }`}
        >
          <ShoppingCart className="h-3.5 w-3.5" strokeWidth={1.75} />
          Generar OC{totalSel > 0 && ` (${totalSel})`}
        </button>
      </div>

      {/* Grouped lists per proveedor */}
      <div className="flex flex-col gap-4">
        {PROVEEDORES.map((p) => {
          const skus = p.items.map((i) => i.sku);
          const allOn = skus.every((s) => selected.has(s));
          const some = skus.some((s) => selected.has(s));
          const valor = p.items.reduce((a, i) => a + i.sugerido * i.costoUnit, 0);

          return (
            <section
              key={p.id}
              className="overflow-hidden rounded-[10px] border border-[--n-150] bg-white"
            >
              <header className="flex items-center justify-between border-b border-[--n-100] bg-[--n-50] px-[18px] py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <button
                    onClick={() => toggleProveedor(p)}
                    className={`grid h-4 w-4 place-items-center rounded-[3px] border ${
                      allOn
                        ? "border-[--p-600] bg-[--p-600] text-white"
                        : some
                        ? "border-[--p-600] bg-[--p-50] text-[--p-600]"
                        : "border-[--n-300] bg-white"
                    }`}
                  >
                    {(allOn || some) && <Check className="h-3 w-3" strokeWidth={2.5} />}
                  </button>
                  <span className="grid h-7 w-7 place-items-center rounded-md bg-[--info-bg] text-[--info-d]">
                    <Building2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </span>
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-semibold text-[--n-950]">{p.nombre}</span>
                      <span className="rounded-[3px] border border-[--n-150] bg-white px-1.5 py-px font-mono text-[10.5px] font-medium text-[--n-700]">
                        {p.id}
                      </span>
                    </div>
                    <div className="font-mono text-[10.5px] tracking-[0.04em] text-[--n-500]">
                      NIT {p.nit} · última compra {p.ultimaCompra} · lead time {p.leadTime}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-right">
                  <div>
                    <div className="font-mono text-[10.5px] uppercase tracking-[0.06em] text-[--n-500]">
                      Subtotal
                    </div>
                    <div className="font-mono text-[13px] font-semibold text-[--n-950]">
                      <span className="text-[--n-400]">$</span>
                      {fmt(valor).replace(/^\$/, "")}
                    </div>
                  </div>
                  <Link
                    to="/ops/compras/nueva"
                    className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[--n-200] bg-white px-3 text-[12px] font-medium text-[--p-600] hover:bg-[--p-50]"
                  >
                    Crear OC
                    <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
                  </Link>
                </div>
              </header>

              {/* Table head */}
              <div className="grid grid-cols-[28px_120px_minmax(0,1fr)_120px_90px_90px_120px] items-center gap-3 border-b border-[--n-100] bg-white px-[18px] py-2 font-mono text-[10.5px] uppercase tracking-[0.06em] text-[--n-500]">
                <span />
                <span>SKU</span>
                <span>Producto · sede</span>
                <span>Stock / mín.</span>
                <span className="text-right">Consumo 90d</span>
                <span className="text-right">Sugerido</span>
                <span className="text-right">Costo total</span>
              </div>

              {p.items.map((it) => {
                const on = selected.has(it.sku);
                const tone =
                  it.severity === "danger"
                    ? "border-[#FECDCA] bg-[--dang-50] text-[--dang-700]"
                    : "border-[#FEDF89] bg-[--warn-50] text-[--warn-700]";
                const stockColor =
                  it.severity === "danger" ? "text-[--dang-700]" : "text-[--warn-700]";
                return (
                  <div
                    key={it.sku}
                    className="grid grid-cols-[28px_120px_minmax(0,1fr)_120px_90px_90px_120px] items-center gap-3 border-b border-[--n-100] px-[18px] py-2.5 text-[12.5px] last:border-b-0"
                  >
                    <button
                      onClick={() => toggle(it.sku)}
                      className={`grid h-4 w-4 place-items-center rounded-[3px] border ${
                        on
                          ? "border-[--p-600] bg-[--p-600] text-white"
                          : "border-[--n-300] bg-white"
                      }`}
                    >
                      {on && <Check className="h-3 w-3" strokeWidth={2.5} />}
                    </button>
                    <span
                      className={`rounded-[3px] border px-1.5 py-0.5 text-center font-mono text-[11px] font-medium leading-[1.4] ${tone}`}
                    >
                      {it.sku}
                    </span>
                    <div className="flex min-w-0 items-center gap-2">
                      <Package className="h-3.5 w-3.5 shrink-0 text-[--n-400]" strokeWidth={1.5} />
                      <div className="flex min-w-0 flex-col gap-0.5">
                        <span className="truncate font-medium text-[--n-950]">{it.name}</span>
                        <span className="font-mono text-[10.5px] tracking-[0.04em] text-[--n-500]">
                          {it.sede}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-[12px]">
                      <span className={`font-semibold ${stockColor}`}>{it.stock}</span>
                      <span className="text-[--n-400]"> / {it.minimo}</span>
                    </span>
                    <span className="text-right font-mono text-[12px] text-[--n-700]">
                      {it.consumo90d}
                    </span>
                    <span className="text-right font-mono text-[12px] font-semibold text-[--n-950]">
                      {it.sugerido}
                    </span>
                    <span className="text-right font-mono text-[12px] text-[--n-950]">
                      <span className="text-[--n-400]">$</span>
                      {fmt(it.sugerido * it.costoUnit).replace(/^\$/, "")}
                    </span>
                  </div>
                );
              })}
            </section>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Subcomponents ─── */

function Kpi({
  label, value, sub, withCur, last,
}: {
  label: string;
  value: string;
  sub: React.ReactNode;
  withCur?: boolean;
  last?: boolean;
}) {
  const display = withCur ? value.replace(/^\$/, "") : value;
  return (
    <div
      className={`flex flex-col gap-1.5 pl-7 pr-7 first:pl-0 ${
        last ? "" : "md:border-r md:border-dashed md:border-[--n-150]"
      }`}
    >
      <div className="font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-[--n-500]">
        {label}
      </div>
      <div className="font-mono text-[22px] font-semibold leading-tight tracking-[-0.02em] text-[--n-950]">
        {withCur && <span className="mr-0.5 text-[14px] font-medium text-[--n-400]">$</span>}
        {display}
      </div>
      <div className="text-[11.5px] text-[--n-500]">{sub}</div>
    </div>
  );
}

function fmt(n: number) {
  return "$" + n.toLocaleString("en-US");
}
