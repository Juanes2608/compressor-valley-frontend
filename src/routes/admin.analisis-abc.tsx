import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { RefreshCw, Download, Package, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/admin/analisis-abc")({
  head: () => ({ meta: [{ title: "Análisis ABC · CHV" }] }),
  component: AbcPage,
});

type Clase = "A" | "B" | "C";
type Periodo = "30d" | "90d" | "180d" | "1 año";

type Row = {
  sku: string;
  name: string;
  cat: string;
  ventas: number;
  unidades: number;
  pctAcum: number;
  clase: Clase;
  sugerencia: string;
};

const ROWS: Row[] = [
  { sku: "CMP-1410-S", name: "Compresor Sullair LS-110", cat: "cat-cmp", ventas: 184200000, unidades: 10, pctAcum: 18.4, clase: "A", sugerencia: "Mantener stock alto · revisar contrato proveedor" },
  { sku: "CMP-0980-A", name: "Compresor Atlas Copco GA-22", cat: "cat-cmp", ventas: 142800000, unidades: 8, pctAcum: 32.7, clase: "A", sugerencia: "Subir mínimo · rotación creciente (+240%)" },
  { sku: "CMP-1120-K", name: "Compresor Kaeser SX-7", cat: "cat-cmp", ventas: 96400000, unidades: 6, pctAcum: 42.3, clase: "A", sugerencia: "Stock saludable · mantener" },
  { sku: "RPT-0830-K", name: "Kit reparación Kaeser SX-7", cat: "cat-rpt", ventas: 78240000, unidades: 92, pctAcum: 50.1, clase: "A", sugerencia: "Crítico · revisar reorden urgente" },
  { sku: "ACE-0150-M", name: "Aceite Mobil Rarus 427 · 20L", cat: "cat-ins", ventas: 64080000, unidades: 152, pctAcum: 56.5, clase: "A", sugerencia: "Alta rotación · negociar volumen" },
  { sku: "SKU-4220-V", name: 'Válvula Ingersoll 3/4"', cat: "cat-rpt", ventas: 48720000, unidades: 343, pctAcum: 61.4, clase: "A", sugerencia: "Aumentar mínimo a 24" },
  { sku: "FLT-2210-A", name: "Filtro aceite Atlas Copco GA-22", cat: "cat-rpt", ventas: 42180000, unidades: 194, pctAcum: 65.6, clase: "B", sugerencia: "Rotación estable · mantener" },
  { sku: "FLT-2215-A", name: "Filtro aire Atlas Copco GA-22", cat: "cat-rpt", ventas: 36800000, unidades: 200, pctAcum: 69.3, clase: "B", sugerencia: "Rotación estable · mantener" },
  { sku: "RPT-1120-J", name: 'Juntas tóricas serie 90 · 1"', cat: "cat-rpt", ventas: 28400000, unidades: 412, pctAcum: 72.1, clase: "B", sugerencia: "Sobre-stock · pausar reposición" },
  { sku: "ACE-0220-C", name: "Aceite Castrol Aircol PD-46 · 5L", cat: "cat-ins", ventas: 24600000, unidades: 78, pctAcum: 74.6, clase: "B", sugerencia: "Sobre-stock · pausar reposición" },
  { sku: "RPT-0560-I", name: "Repuesto Ingersoll R-30", cat: "cat-rpt", ventas: 6800000, unidades: 18, pctAcum: 75.3, clase: "C", sugerencia: "Rotación cayendo (-78%) · liquidar" },
  { sku: "RPT-0712-K", name: "Kit Kaeser BSD-75", cat: "cat-rpt", ventas: 4200000, unidades: 8, pctAcum: 75.7, clase: "C", sugerencia: "Revisar pricing · caída sostenida" },
];

const TABS: { id: Clase | "all"; label: string; count: number; tone: string }[] = [
  { id: "all", label: "Todas", count: ROWS.length, tone: "neutral" },
  { id: "A", label: "Clase A", count: ROWS.filter((r) => r.clase === "A").length, tone: "succ" },
  { id: "B", label: "Clase B", count: ROWS.filter((r) => r.clase === "B").length, tone: "warn" },
  { id: "C", label: "Clase C", count: ROWS.filter((r) => r.clase === "C").length, tone: "dang" },
];

const PERIODOS: Periodo[] = ["30d", "90d", "180d", "1 año"];

function AbcPage() {
  const [tab, setTab] = useState<Clase | "all">("all");
  const [periodo, setPeriodo] = useState<Periodo>("90d");
  const [loading, setLoading] = useState(false);

  const rows = tab === "all" ? ROWS : ROWS.filter((r) => r.clase === tab);
  const totalVentas = ROWS.reduce((a, r) => a + r.ventas, 0);
  const ventasA = ROWS.filter((r) => r.clase === "A").reduce((a, r) => a + r.ventas, 0);

  function recalcular() {
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  }

  return (
    <div className="flex flex-col gap-6 px-7 pb-8 pt-6">
      {/* Page head */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="m-0 mb-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-[--n-300]">
            Admin · Clasificación de productos
          </p>
          <h1 className="m-0 text-[24px] font-semibold leading-tight tracking-[-0.018em] text-[--n-950]">
            Análisis ABC
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Seg options={PERIODOS} value={periodo} onChange={setPeriodo} />
          <button
            onClick={recalcular}
            disabled={loading}
            className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[--p-600] px-3 text-[12.5px] font-semibold text-white hover:bg-[--p-700] disabled:opacity-60"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`}
              strokeWidth={1.75}
            />
            {loading ? "Recalculando..." : "Recalcular ABC"}
          </button>
          <button className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[--n-200] bg-white px-3 text-[12.5px] font-medium text-[--n-700]">
            <Download className="h-3.5 w-3.5" strokeWidth={1.5} />
            Exportar
          </button>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-y-4 border-b border-[--n-150] pb-4 md:grid-cols-4 md:gap-y-0">
        <Kpi label={`Ingresos · últimos ${periodo}`} value={fmt(totalVentas)} withCur sub="Total clasificado" />
        <Kpi
          label="Clase A · top valor"
          value={`${Math.round((ventasA / totalVentas) * 100)}%`}
          sub={`${ROWS.filter((r) => r.clase === "A").length} SKUs · ${fmt(ventasA)} en ventas`}
        />
        <Kpi
          label="Clase B · medio"
          value={`${Math.round((ROWS.filter((r) => r.clase === "B").reduce((a, r) => a + r.ventas, 0) / totalVentas) * 100)}%`}
          sub={`${ROWS.filter((r) => r.clase === "B").length} SKUs`}
        />
        <Kpi
          last
          label="Clase C · cola larga"
          value={`${Math.round((ROWS.filter((r) => r.clase === "C").reduce((a, r) => a + r.ventas, 0) / totalVentas) * 100)}%`}
          sub={`${ROWS.filter((r) => r.clase === "C").length} SKUs · candidatos a liquidar`}
        />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-[--n-150]">
        {TABS.map((t) => {
          const on = t.id === tab;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 border-b-2 px-3 pb-2.5 pt-1 text-[12.5px] font-medium transition-colors ${
                on
                  ? "border-[--p-600] text-[--n-950]"
                  : "border-transparent text-[--n-500] hover:text-[--n-700]"
              }`}
            >
              {t.label}
              <span
                className={`rounded-[3px] border px-1.5 py-px font-mono text-[10.5px] font-semibold leading-[1.4] ${
                  on
                    ? "border-[--p-200] bg-[--p-50] text-[--p-700]"
                    : "border-[--n-150] bg-[--n-50] text-[--n-500]"
                }`}
              >
                {t.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Table */}
      <section className="overflow-hidden rounded-[10px] border border-[--n-150] bg-white">
        <div className="grid grid-cols-[60px_120px_minmax(0,1fr)_110px_90px_90px_minmax(220px,1fr)] items-center gap-3 border-b border-[--n-100] bg-[--n-50] px-[18px] py-2 font-mono text-[10.5px] uppercase tracking-[0.06em] text-[--n-500]">
          <span>#</span>
          <span>SKU</span>
          <span>Producto · cat.</span>
          <span className="text-right">Ventas</span>
          <span className="text-right">Unidades</span>
          <span className="text-right">% acum.</span>
          <span>Sugerencia</span>
        </div>

        {rows.map((r, i) => {
          const claseTone =
            r.clase === "A"
              ? "border-[#A6E9C9] bg-[--succ-50] text-[--succ-700]"
              : r.clase === "B"
              ? "border-[#FEDF89] bg-[--warn-50] text-[--warn-700]"
              : "border-[#FECDCA] bg-[--dang-50] text-[--dang-700]";
          return (
            <div
              key={r.sku}
              className="grid grid-cols-[60px_120px_minmax(0,1fr)_110px_90px_90px_minmax(220px,1fr)] items-center gap-3 border-b border-[--n-100] px-[18px] py-2.5 text-[12.5px] last:border-b-0"
            >
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-[--n-500]">
                <span className="w-4 text-right">{i + 1}</span>
                <span
                  className={`grid h-5 w-5 place-items-center rounded-[4px] border text-[10.5px] font-semibold ${claseTone}`}
                >
                  {r.clase}
                </span>
              </span>
              <span className="rounded-[3px] border border-[--n-150] bg-[--n-50] px-1.5 py-0.5 text-center font-mono text-[11px] font-medium text-[--n-700]">
                {r.sku}
              </span>
              <div className="flex min-w-0 items-center gap-2">
                <Package className="h-3.5 w-3.5 shrink-0 text-[--n-400]" strokeWidth={1.5} />
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="truncate font-medium text-[--n-950]">{r.name}</span>
                  <span className="font-mono text-[10.5px] tracking-[0.04em] text-[--n-500]">
                    {r.cat}
                  </span>
                </div>
              </div>
              <span className="text-right font-mono text-[12px] font-semibold text-[--n-950]">
                <span className="text-[--n-400]">$</span>
                {fmt(r.ventas).replace(/^\$/, "")}
              </span>
              <span className="text-right font-mono text-[12px] text-[--n-700]">{r.unidades}</span>
              <span className="text-right font-mono text-[12px] text-[--n-700]">
                {r.pctAcum.toFixed(1)}%
              </span>
              <span className="flex items-center gap-1.5 text-[11.5px] text-[--n-700]">
                <TrendingUp className="h-3 w-3 shrink-0 text-[--n-400]" strokeWidth={1.5} />
                {r.sugerencia}
              </span>
            </div>
          );
        })}

        <footer className="flex items-center justify-between border-t border-[--n-100] bg-[--n-50] px-[18px] py-3 font-mono text-[10.5px] tracking-[0.06em] text-[--n-500]">
          <span>{rows.length} SKUs · ordenados por ventas descendente</span>
          <span>Última recálculo · hace 2 días · timeout 30s</span>
        </footer>
      </section>
    </div>
  );
}

/* ─── Subcomponents ─── */

function Seg<T extends string>({
  options, value, onChange,
}: { options: readonly T[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="inline-flex gap-px rounded-[7px] border border-[--n-150] bg-[--n-50] p-0.5">
      {options.map((opt) => {
        const on = opt === value;
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`rounded-[5px] px-2.5 py-1 text-[12px] font-medium ${
              on
                ? "bg-white font-semibold text-[--n-950] shadow-[0_1px_2px_rgba(16,24,40,0.06)]"
                : "text-[--n-500]"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

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
