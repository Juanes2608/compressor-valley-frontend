import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Triangle, Package, Wrench, ShoppingCart, ClipboardList,
  TrendingUp, TrendingDown, ArrowRight, Filter, Download,
} from "lucide-react";

export const Route = createFileRoute("/admin/alertas")({
  head: () => ({ meta: [{ title: "Alertas · CHV" }] }),
  component: AlertasPage,
});

type TabId =
  | "stock"
  | "herramientas"
  | "ot-repuesto"
  | "ot-no-recogida"
  | "sobre-stock"
  | "rotacion";

type Severity = "danger" | "warn" | "info";

type AlertItem = {
  id: string;
  idTone: "warn" | "info" | "neutral";
  severity: Severity;
  title: string;
  sub: string;
  meta: string;
  to: string;
  toLabel: string;
};

const TABS: { id: TabId; label: string; count: number; icon: React.ReactNode }[] = [
  { id: "stock", label: "Stock bajo / agotado", count: 12, icon: <Package className="h-3.5 w-3.5" strokeWidth={1.5} /> },
  { id: "herramientas", label: "Herramientas vencidas", count: 3, icon: <Wrench className="h-3.5 w-3.5" strokeWidth={1.5} /> },
  { id: "ot-repuesto", label: "OT esperando repuesto", count: 4, icon: <ClipboardList className="h-3.5 w-3.5" strokeWidth={1.5} /> },
  { id: "ot-no-recogida", label: "OT > 30 días sin recoger", count: 2, icon: <ClipboardList className="h-3.5 w-3.5" strokeWidth={1.5} /> },
  { id: "sobre-stock", label: "Sobre-stock", count: 5, icon: <ShoppingCart className="h-3.5 w-3.5" strokeWidth={1.5} /> },
  { id: "rotacion", label: "Rotación atípica", count: 3, icon: <TrendingUp className="h-3.5 w-3.5" strokeWidth={1.5} /> },
];

const DATA: Record<TabId, AlertItem[]> = {
  stock: [
    { id: "CMP-1410-S", idTone: "warn", severity: "danger", title: "Compresor Sullair LS-110 agotado", sub: "WH-02 PEREIRA · cat-cmp", meta: "Stock 0 · mínimo 2 · sin OC abierta", to: "/admin/reorden", toLabel: "Crear OC" },
    { id: "SKU-4220-V", idTone: "warn", severity: "warn", title: 'Válvula Ingersoll 3/4" bajo crítico', sub: "WH-02 PEREIRA · cat-rpt", meta: "Stock 3 · mínimo 12 · sugerido 24", to: "/admin/reorden", toLabel: "Crear OC" },
    { id: "RPT-0830-K", idTone: "warn", severity: "warn", title: "Kit reparación Kaeser SX-7", sub: "WH-01 CALI · cat-rpt", meta: "Stock 2 · mínimo 8 · sugerido 16", to: "/admin/reorden", toLabel: "Crear OC" },
    { id: "FLT-2210-A", idTone: "warn", severity: "warn", title: "Filtro aceite Atlas Copco GA-22", sub: "WH-01 CALI · cat-rpt", meta: "Stock 4 · mínimo 10 · sugerido 20", to: "/admin/reorden", toLabel: "Crear OC" },
    { id: "ACE-0150-M", idTone: "warn", severity: "warn", title: "Aceite Mobil Rarus 427 · 20L", sub: "WH-02 PEREIRA · cat-ins", meta: "Stock 6 · mínimo 12 · sugerido 12", to: "/admin/reorden", toLabel: "Crear OC" },
  ],
  herramientas: [
    { id: "T-042", idTone: "info", severity: "danger", title: "Llave torquímetro vencida", sub: "Préstamo a Carlos M. · WH-01", meta: "Vencía hace 3 días · OT-2845", to: "/ops/herramientas", toLabel: "Recordar" },
    { id: "T-018", idTone: "info", severity: "warn", title: "Multímetro Fluke 87V vencido", sub: "Préstamo a Andrés P. · WH-01", meta: "Vencía hace 1 día · OT-2851", to: "/ops/herramientas", toLabel: "Recordar" },
    { id: "T-073", idTone: "info", severity: "warn", title: "Manómetro digital vencido", sub: "Préstamo a María R. · WH-02", meta: "Vencía hoy · OT-2858", to: "/ops/herramientas", toLabel: "Recordar" },
  ],
  "ot-repuesto": [
    { id: "OT-2845", idTone: "info", severity: "warn", title: "Mantto. Kaeser SX-7 · Industrias Norte", sub: "Téc. Carlos M. · esperando RPT-0830-K", meta: "Detenida 5d · OC-0184 pendiente aprobación", to: "/ops/ordenes-trabajo", toLabel: "Abrir OT" },
    { id: "OT-2851", idTone: "info", severity: "warn", title: "Cambio cabezal Sullair LS-110", sub: "Téc. Andrés P. · esperando CMP-1410-S", meta: "Detenida 2d · sin OC abierta", to: "/ops/ordenes-trabajo", toLabel: "Abrir OT" },
    { id: "OT-2837", idTone: "info", severity: "info", title: "Servicio Atlas Copco GA-22", sub: "Téc. María R. · esperando FLT-2210-A", meta: "Detenida 4d · OC-0179 en tránsito", to: "/ops/ordenes-trabajo", toLabel: "Abrir OT" },
    { id: "OT-2829", idTone: "info", severity: "info", title: "Reparación Ingersoll Rand R-90", sub: "Téc. Carlos M. · esperando SKU-4220-V", meta: "Detenida 6d · OC-0181 pendiente", to: "/ops/ordenes-trabajo", toLabel: "Abrir OT" },
  ],
  "ot-no-recogida": [
    { id: "OT-2754", idTone: "info", severity: "warn", title: "Compresor reparado sin recoger", sub: "Cliente: Petrocali Logística", meta: "Finalizada hace 42 días · contacto: 312-555-7841", to: "/ops/ordenes-trabajo", toLabel: "Contactar" },
    { id: "OT-2741", idTone: "info", severity: "danger", title: "Cabezal reparado sin recoger", sub: "Cliente: Compresores SAS", meta: "Finalizada hace 58 días · 3 intentos de contacto", to: "/ops/ordenes-trabajo", toLabel: "Marcar abandono" },
  ],
  "sobre-stock": [
    { id: "RPT-1120-J", idTone: "warn", severity: "info", title: 'Juntas tóricas serie 90 · 1"', sub: "WH-01 CALI · cat-rpt", meta: "Stock 142 · máx. recomendado 60", to: "/ops/inventario", toLabel: "Revisar" },
    { id: "FLT-0440-S", idTone: "warn", severity: "info", title: "Filtro separador Sullair LS-160", sub: "WH-02 PEREIRA · cat-rpt", meta: "Stock 38 · máx. recomendado 18", to: "/ops/inventario", toLabel: "Revisar" },
    { id: "ACE-0220-C", idTone: "warn", severity: "info", title: "Aceite Castrol Aircol PD-46 · 5L", sub: "WH-01 CALI · cat-ins", meta: "Stock 64 · máx. recomendado 30", to: "/ops/inventario", toLabel: "Revisar" },
  ],
  rotacion: [
    { id: "CMP-0980-A", idTone: "warn", severity: "info", title: "Compresor Atlas Copco GA-22 ↑ 240%", sub: "Ventas 90d vs trimestre previo", meta: "Recomendado: revisar stock mínimo", to: "/admin/analisis-abc", toLabel: "Ver ABC" },
    { id: "RPT-0560-I", idTone: "warn", severity: "info", title: "Repuesto Ingersoll R-30 ↓ 78%", sub: "Sin ventas en últimos 60 días", meta: "Recomendado: liquidar o reubicar", to: "/admin/analisis-abc", toLabel: "Ver ABC" },
    { id: "RPT-0712-K", idTone: "warn", severity: "info", title: "Kit Kaeser BSD-75 ↓ 64%", sub: "Caída sostenida en últimos 90d", meta: "Recomendado: revisar pricing", to: "/admin/analisis-abc", toLabel: "Ver ABC" },
  ],
};

const SEDES = ["Todas", "WH-01 CALI", "WH-02 PEREIRA"] as const;
const PRIO = ["Todas", "Urgente", "Alta", "Media"] as const;

function AlertasPage() {
  const [tab, setTab] = useState<TabId>("stock");
  const [sede, setSede] = useState<(typeof SEDES)[number]>("Todas");
  const [prio, setPrio] = useState<(typeof PRIO)[number]>("Todas");

  const items = DATA[tab];
  const urgentes = items.filter((i) => i.severity === "danger").length;
  const total = Object.values(DATA).reduce((acc, arr) => acc + arr.length, 0);

  return (
    <div className="flex flex-col gap-6 px-7 pb-8 pt-6">
      {/* Page head */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="m-0 mb-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-[--n-300]">
            Admin · Centro de alertas
          </p>
          <h1 className="m-0 flex items-center gap-2.5 text-[24px] font-semibold leading-tight tracking-[-0.018em] text-[--n-950]">
            Alertas
            <span className="rounded-[3px] border border-[#FECDCA] bg-[--dang-50] px-1.5 py-px font-mono text-[11px] font-semibold text-[--dang-700]">
              {total} activas
            </span>
          </h1>
        </div>
        <button className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[--n-200] bg-white px-3 text-[12.5px] font-medium text-[--n-700]">
          <Download className="h-3.5 w-3.5" strokeWidth={1.5} />
          Exportar
        </button>
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
              <span className={on ? "text-[--p-600]" : "text-[--n-400]"}>{t.icon}</span>
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

      {/* Filters bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 -mt-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.06em] text-[--n-500]">
            <Filter className="h-3 w-3" strokeWidth={1.5} />
            Filtrar
          </span>
          <Seg options={SEDES} value={sede} onChange={setSede} />
          <Seg options={PRIO} value={prio} onChange={setPrio} />
        </div>
        <span className="font-mono text-[10.5px] tracking-[0.06em] text-[--n-500]">
          {items.length} resultados · {urgentes} urgentes
        </span>
      </div>

      {/* List */}
      <section className="overflow-hidden rounded-[10px] border border-[--n-150] bg-white">
        <header className="flex items-center justify-between border-b border-[--n-100] bg-[--n-50] px-[18px] py-2.5">
          <div className="flex items-center gap-2.5">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-[--dang-50] text-[--dang-700]">
              <Triangle className="h-3.5 w-3.5" fill="currentColor" strokeWidth={1.5} />
            </span>
            <span className="text-[13px] font-semibold text-[--n-950]">
              {TABS.find((t) => t.id === tab)?.label}
            </span>
          </div>
          <span className="font-mono text-[10.5px] tracking-[0.06em] text-[--n-500]">
            Ordenado por severidad · más reciente
          </span>
        </header>

        {items.map((it) => (
          <AlertRow key={it.id} item={it} />
        ))}

        <footer className="flex items-center justify-between border-t border-[--n-100] bg-[--n-50] px-[18px] py-3 text-[12px]">
          <span className="font-mono text-[10.5px] text-[--n-500]">
            Reglas configuradas en módulo Configuración
          </span>
          <Link
            to="/admin/configuracion"
            className="inline-flex items-center gap-1.5 font-medium text-[--p-600]"
          >
            Ajustar reglas <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
          </Link>
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

function AlertRow({ item }: { item: AlertItem }) {
  const dot =
    item.severity === "danger"
      ? "var(--dang-500)"
      : item.severity === "warn"
      ? "var(--warn-500)"
      : "var(--info)";
  const sevLabel =
    item.severity === "danger" ? "Urgente" : item.severity === "warn" ? "Alta" : "Media";
  const sevClasses =
    item.severity === "danger"
      ? "border-[#FECDCA] bg-[--dang-50] text-[--dang-700]"
      : item.severity === "warn"
      ? "border-[#FEDF89] bg-[--warn-50] text-[--warn-700]"
      : "border-[--info-bd] bg-[--info-bg] text-[--info-d]";
  const keyClasses =
    item.idTone === "warn"
      ? "border-[#FEDF89] bg-[--warn-50] text-[--warn-700]"
      : item.idTone === "info"
      ? "border-[--info-bd] bg-[--info-bg] text-[--info-d]"
      : "border-[--n-150] bg-[--n-50] text-[--n-700]";

  return (
    <div className="grid grid-cols-[auto_auto_1fr_auto_auto] items-center gap-3 border-b border-[--n-100] px-[18px] py-3 last:border-b-0">
      <span className="h-2 w-2 rounded-full" style={{ background: dot }} />
      <span
        className={`rounded-[3px] border px-1.5 py-0.5 font-mono text-[11px] font-medium leading-[1.4] ${keyClasses}`}
      >
        {item.id}
      </span>
      <div className="flex min-w-0 flex-col gap-0.5">
        <div className="text-[12.5px] font-medium leading-[1.3] text-[--n-950]">{item.title}</div>
        <div className="font-mono text-[10.5px] tracking-[0.04em] text-[--n-500]">
          {item.sub} · {item.meta}
        </div>
      </div>
      <span
        className={`rounded-[3px] border px-1.5 py-px font-mono text-[10.5px] font-semibold leading-[1.4] ${sevClasses}`}
      >
        {sevLabel}
      </span>
      <Link
        to={item.to as never}
        className="inline-flex items-center gap-1 rounded-[5px] border border-[--n-200] bg-white px-2.5 py-1 text-[11.5px] font-medium leading-tight text-[--p-600] hover:bg-[--p-50]"
      >
        {item.toLabel}
        <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
      </Link>
    </div>
  );
}

/* keep tree-shake happy for icons reserved for future variants */
void TrendingDown;
