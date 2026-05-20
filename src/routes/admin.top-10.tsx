import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Trophy,
  TrendingUp,
  Users,
  Building2,
  Package,
  CalendarDays,
  ChevronRight,
  Medal,
  BarChart3,
} from "lucide-react";

const fmt = (n: number) =>
  "$ " + n.toLocaleString("es-CO", { maximumFractionDigits: 0 });

const fmtN = (n: number) => n.toLocaleString("es-CO");

/* ── Types ── */
type RankTab = "productos" | "clientes" | "proveedores" | "categorias";

interface RankItem {
  pos: number;
  name: string;
  meta?: string;
  ventas: number;
  unidades: number;
  var: number; // vs previous period
}

/* ── Tabs meta ── */
const TAB_META: Record<RankTab, { label: string; icon: React.ReactNode }> = {
  productos: { label: "Productos", icon: <Package size={14} /> },
  clientes: { label: "Clientes", icon: <Users size={14} /> },
  proveedores: { label: "Proveedores", icon: <Building2 size={14} /> },
  categorias: { label: "Categorías", icon: <BarChart3 size={14} /> },
};

/* ── Canonical data ── */
const DATA: Record<RankTab, RankItem[]> = {
  productos: [
    { pos: 1, name: "CMP-1410-S", meta: "Tornillo rotativo Sullair 1410", ventas: 1840000, unidades: 12, var: 8 },
    { pos: 2, name: "FIL-0700-X", meta: "Filtro separador de aceite", ventas: 1680000, unidades: 24, var: -3 },
    { pos: 3, name: "RPT-0830-K", meta: "Kit de pistones 830mm", ventas: 1245000, unidades: 8, var: 15 },
    { pos: 4, name: "ACE-0150-M", meta: "Aceite sintético 200L", ventas: 960000, unidades: 40, var: 5 },
    { pos: 5, name: "FDP-0950-Q", meta: "Filtro de aire 950 CFM", ventas: 840000, unidades: 18, var: -7 },
    { pos: 6, name: "CMP-1100-R", meta: "Tornillo 1100 rotativo", ventas: 720000, unidades: 6, var: 2 },
    { pos: 7, name: "BBA-0250-P", meta: "Bomba de presión 250 bar", ventas: 650000, unidades: 13, var: 10 },
    { pos: 8, name: "VLV-0100-T", meta: "Válvula de admisión 4\"", ventas: 480000, unidades: 20, var: -1 },
    { pos: 9, name: "SEN-0050-H", meta: "Sensor de temperatura", ventas: 360000, unidades: 30, var: 4 },
    { pos: 10, name: "MTT-0200-G", meta: "Mantenimiento preventivo 200h", ventas: 300000, unidades: 10, var: 12 },
  ],
  clientes: [
    { pos: 1, name: "Industria Metalúrgica del Valle S.A.S.", ventas: 5280000, unidades: 45, var: 12 },
    { pos: 2, name: "Constructora Palmas S.A.", ventas: 3920000, unidades: 32, var: 5 },
    { pos: 3, name: "Minas del Cauca Ltda.", ventas: 3450000, unidades: 28, var: -2 },
    { pos: 4, name: "Procesos Químicos Andinos", ventas: 2780000, unidades: 22, var: 8 },
    { pos: 5, name: "Ingeniería Naval del Pacífico", ventas: 2100000, unidades: 18, var: 15 },
    { pos: 6, name: "Grupo Lácteos del Sur", ventas: 1800000, unidades: 15, var: -5 },
    { pos: 7, name: "Plásticos del Eje", ventas: 1560000, unidades: 12, var: 3 },
    { pos: 8, name: "Textiles del Valle", ventas: 1240000, unidades: 10, var: 7 },
    { pos: 9, name: "Agroindustria La Selva", ventas: 980000, unidades: 8, var: 1 },
    { pos: 10, name: "Bebidas Andinas S.A.S.", ventas: 840000, unidades: 7, var: -4 },
  ],
  proveedores: [
    { pos: 1, name: "SULLAIR Colombia", ventas: 8950000, unidades: 120, var: 6 },
    { pos: 2, name: "Atlas Copco Andina", ventas: 6720000, unidades: 85, var: 10 },
    { pos: 3, name: "Mobil Industrial Lubricantes", ventas: 3450000, unidades: 200, var: -3 },
    { pos: 4, name: "Ingersoll Rand Sudamérica", ventas: 2800000, unidades: 45, var: 8 },
    { pos: 5, name: "Parker Hannifin Colombia", ventas: 2100000, unidades: 60, var: 4 },
    { pos: 6, name: "SKF Colombia", ventas: 1680000, unidades: 90, var: -1 },
    { pos: 7, name: "Donaldson Filtración", ventas: 1350000, unidades: 75, var: 5 },
    { pos: 8, name: "MANN+HUMMEL Andina", ventas: 960000, unidades: 55, var: 2 },
    { pos: 9, name: "Bosch Rexroth Colombia", ventas: 720000, unidades: 30, var: -6 },
    { pos: 10, name: "Siemens Industry Colombia", ventas: 540000, unidades: 18, var: 3 },
  ],
  categorias: [
    { pos: 1, name: "Compresores de Tornillo", ventas: 5280000, unidades: 32, var: 8 },
    { pos: 2, name: "Filtros y Separadores", ventas: 3920000, unidades: 120, var: 5 },
    { pos: 3, name: "Aceites y Lubricantes", ventas: 3450000, unidades: 280, var: -2 },
    { pos: 4, name: "Repuestos Neumáticos", ventas: 2780000, unidades: 65, var: 10 },
    { pos: 5, name: "Bombas de Vacío", ventas: 2100000, unidades: 42, var: -4 },
    { pos: 6, name: "Válvulas y Accesorios", ventas: 1680000, unidades: 95, var: 3 },
    { pos: 7, name: "Sensores y Monitoreo", ventas: 1350000, unidades: 78, var: 7 },
    { pos: 8, name: "Secadores de Aire", ventas: 960000, unidades: 24, var: -1 },
    { pos: 9, name: "Mantenimiento Programado", ventas: 720000, unidades: 28, var: 12 },
    { pos: 10, name: "Herramientas Neumáticas", ventas: 480000, unidades: 40, var: -5 },
  ],
};

/* ── Period selector component ── */
function Seg({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="flex bg-[var(--n-100)] rounded-lg p-1 gap-1">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={
            "px-3 py-1 text-sm rounded-md transition " +
            (value === o
              ? "bg-white text-[var(--n-950)] shadow-sm font-medium"
              : "text-[var(--n-600)] hover:text-[var(--n-900)]")
          }
        >
          {o}
        </button>
      ))}
    </div>
  );
}

/* ── KPI sub ── */
function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border border-[var(--n-200)] rounded-lg p-4">
      <p className="text-xs text-[var(--n-500)] uppercase tracking-wide">{label}</p>
      <p className="text-xl font-semibold text-[var(--n-900)] mt-1">{value}</p>
    </div>
  );
}

/* ── Rank row ── */
function RankRow({
  item,
  activeTab,
}: {
  item: RankItem;
  activeTab: RankTab;
}) {
  const medal =
    item.pos === 1 ? "🥇" : item.pos === 2 ? "🥈" : item.pos === 3 ? "🥉" : null;

  return (
    <div className="flex items-center gap-4 bg-white border border-[var(--n-200)] rounded-lg p-3 hover:border-[var(--p-400)] transition group">
      {/* Position */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--n-100)] text-[var(--n-700)] flex items-center justify-center text-sm font-bold">
        {item.pos}
      </div>

      {/* Medal for top 3 */}
      {medal && (
        <div className="flex-shrink-0 text-lg" aria-hidden>
          {medal}
        </div>
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-[var(--n-900)] truncate">
            {item.name}
          </p>
        </div>
        {item.meta && (
          <p className="text-xs text-[var(--n-500)] truncate mt-0.5">{item.meta}</p>
        )}
      </div>

      {/* Metrics */}
      <div className="hidden sm:flex items-center gap-6">
        <div className="text-right">
          <p className="text-xs text-[var(--n-500)]">Ventas</p>
          <p className="text-sm font-semibold text-[var(--n-900)]">{fmt(item.ventas)}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-[var(--n-500)]">Unidades</p>
          <p className="text-sm font-semibold text-[var(--n-900)]">{fmtN(item.unidades)}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-[var(--n-500)]">Var. vs ant.</p>
          <p
            className={`text-sm font-semibold ${
              item.var >= 0 ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {item.var >= 0 ? "+" : ""}
            {item.var}%
          </p>
        </div>
      </div>

      {/* Mobile metrics */}
      <div className="sm:hidden flex flex-col items-end gap-1">
        <span className="text-sm font-semibold text-[var(--n-900)]">{fmt(item.ventas)}</span>
        <span
          className={`text-xs font-medium ${item.var >= 0 ? "text-emerald-600" : "text-red-500"}`}
        >
          {item.var >= 0 ? "+" : ""}
          {item.var}%
        </span>
      </div>

      <ChevronRight size={16} className="text-[var(--n-300)] group-hover:text-[var(--p-500)]" />
    </div>
  );
}

/* ── Main page ── */
function Top10Page() {
  const [tab, setTab] = useState<RankTab>("productos");
  const [periodo, setPeriodo] = useState("Último mes");

  const items = DATA[tab];
  const totalVentas = items.reduce((s, i) => s + i.ventas, 0);
  const totalUnidades = items.reduce((s, i) => s + i.unidades, 0);
  const avgTicket = totalVentas / totalUnidades;

  return (
    <div className="min-h-screen bg-[var(--n-50)]">
      {/* Header */}
      <div className="bg-white border-b border-[var(--n-200)]">
        <div className="max-w-[1440px] mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link
              to="/admin"
              className="flex items-center justify-center w-8 h-8 rounded-lg border border-[var(--n-200)] text-[var(--n-600)] hover:text-[var(--n-900)] hover:border-[var(--n-300)] transition"
            >
              <ArrowLeft size={16} />
            </Link>
            <div className="flex items-center gap-2">
              <Trophy size={20} className="text-[var(--p-600)]" />
              <h1 className="text-xl font-bold text-[var(--n-950)]">Top 10</h1>
            </div>
          </div>
          <p className="text-sm text-[var(--n-500)] mt-1 ml-11">
            Rankings de ventas por categoría
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 py-6 space-y-6">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          {/* Tabs */}
          <div className="flex bg-[var(--n-100)] rounded-lg p-1 gap-1 overflow-x-auto">
            {(Object.keys(TAB_META) as RankTab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={
                  "flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md whitespace-nowrap transition " +
                  (tab === t
                    ? "bg-white text-[var(--n-950)] shadow-sm font-medium"
                    : "text-[var(--n-600)] hover:text-[var(--n-900)]")
                }
              >
                {TAB_META[t].icon}
                {TAB_META[t].label}
              </button>
            ))}
          </div>

          {/* Period */}
          <Seg
            value={periodo}
            onChange={setPeriodo}
            options={["Último mes", "Último trimestre", "Último año"]}
          />
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Kpi label="Total Ventas (Top 10)" value={fmt(totalVentas)} />
          <Kpi label="Unidades Vendidas" value={fmtN(totalUnidades)} />
          <Kpi label="Ticket Promedio" value={fmt(Math.round(avgTicket))} />
          <Kpi label="Categorías" value="10" />
        </div>

        {/* Rankings list */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-[var(--n-800)] flex items-center gap-2">
            <TrendingUp size={16} className="text-[var(--p-500)]" />
            Ranking — {TAB_META[tab].label}
          </h2>
          {items.map((item) => (
            <RankRow key={item.pos} item={item} activeTab={tab} />
          ))}
        </div>

        {/* Summary bar */}
        <div className="bg-white border border-[var(--n-200)] rounded-lg p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-[var(--n-600)]">
              <CalendarDays size={16} />
              <span>Periodo: {periodo.toLowerCase()} · Datos actualizados al 19 may 2026</span>
            </div>
            <button className="flex items-center gap-2 px-3 py-2 border border-[var(--n-200)] rounded-lg text-sm text-[var(--n-700)] hover:bg-[var(--n-50)] transition">
              <Medal size={16} />
              Ver reporte completo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/admin/top-10")({
  component: Top10Page,
});
