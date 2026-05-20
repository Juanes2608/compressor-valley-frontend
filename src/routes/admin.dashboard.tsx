import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  AlertTriangle, Triangle, Wrench, Package, FileText, Clock,
  ArrowRight, Download,
} from "lucide-react";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard · CHV" }] }),
  component: CockpitPage,
});

type Period = "Hoy" | "Semana" | "Mes" | "Año";
type View = "Compacto" | "Detallado";

function CockpitPage() {
  const [period, setPeriod] = useState<Period>("Hoy");
  const [view, setView] = useState<View>("Compacto");

  return (
    <div className="flex flex-col gap-6 px-7 pb-8 pt-6">
      {/* Page head */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="m-0 mb-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-[--n-300]">
            Admin · Visión general
          </p>
          <h1 className="m-0 text-[24px] font-semibold leading-tight tracking-[-0.018em] text-[--n-950]">
            Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Seg
            options={["Compacto", "Detallado"] as const}
            value={view}
            onChange={setView}
          />
          <button className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[--n-200] bg-white px-3 text-[12.5px] font-medium text-[--n-700]">
            <Download className="h-3.5 w-3.5" strokeWidth={1.5} />
            Exportar
          </button>
        </div>
      </div>

      {/* KPI strip */}
      <div className="relative">
        <div className="absolute -top-8 right-0 flex items-center gap-2">
          <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.06em] text-[--n-500]">
            Periodo
          </span>
          <Seg
            options={["Hoy", "Semana", "Mes", "Año"] as const}
            value={period}
            onChange={setPeriod}
          />
        </div>
        <div className="grid grid-cols-2 gap-y-4 border-b border-[--n-150] pb-4 pt-1.5 md:grid-cols-4 md:gap-y-0">
          <Kpi
            label="Ingresos del día"
            value="$4.847.200"
            withCur
            sub={
              <>
                <Dot color="var(--p-600)" /> Productos $3.124k
                <Sep />
                <Dot color="var(--info-d)" /> Servicios $1.723k
              </>
            }
          />
          <Kpi
            label="Egresos del día"
            value="$1.236.500"
            withCur
            sub={
              <>
                <Dot color="var(--n-700)" /> Compras $1.058k
                <Sep />
                <Dot color="var(--warn-700)" /> Devoluciones $178k
              </>
            }
          />
          <Kpi
            label="Ventas vs día anterior"
            value="+12,4%"
            sub={
              <span className="inline-flex items-center gap-1 text-[11.5px] font-medium text-[--succ-700]">
                ▲ $534k vs ayer
              </span>
            }
          />
          <Kpi
            last
            label="OTs activas"
            value="14"
            sub={
              <>
                <Dot color="var(--info-d)" /> 5 abiertas
                <Sep />
                <Dot color="var(--p-600)" /> 7 en proceso
                <Sep />
                <Dot color="var(--n-500)" /> 2 esperando
              </>
            }
          />
        </div>
      </div>

      {/* Atención requerida */}
      <section className="overflow-hidden rounded-[10px] border border-[--n-150] bg-white">
        <header className="flex items-center justify-between border-b border-[--n-100] px-[18px] py-3">
          <div className="flex items-center gap-2.5">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-[--dang-50] text-[--dang-700]">
              <Triangle className="h-3.5 w-3.5" fill="currentColor" strokeWidth={1.5} />
            </span>
            <span className="text-[13.5px] font-semibold text-[--n-950]">Atención requerida</span>
            <span className="rounded-[3px] border border-[#FECDCA] bg-[--dang-50] px-1.5 py-px font-mono text-[11px] font-semibold text-[--dang-700]">
              3 urgentes
            </span>
          </div>
          <span className="font-mono text-[10.5px] tracking-[0.06em] text-[--n-500]">
            Top 3 de 8 alertas
          </span>
        </header>
        <AttRow
          color="danger"
          title="Compra OC-0184 requiere aprobación · $4.230.000"
          sub="SULLAIR S.A. · pendiente desde hace 2 días"
          action="Aprobar"
        />
        <AttRow
          color="danger"
          title="Préstamo de herramienta vencido · Llave torquímetro #T-042"
          sub="Técnico Carlos M. · vencía hace 3 días"
          action="Recordar"
        />
        <AttRow
          color="warn"
          title="SKU-4220-V Válvula Ingersoll bajo mínimo crítico · WH-02"
          sub="Stock 3 · mínimo 12 · reorden sugerido 24 unidades"
          action="Crear OC"
        />
        <footer className="flex items-center justify-between border-t border-[--n-100] bg-[--n-50] px-[18px] py-3 text-[12px]">
          <span className="font-mono text-[10.5px] text-[--n-500]">
            Las 5 restantes son de prioridad media
          </span>
          <Link
            to="/admin/alertas"
            className="inline-flex items-center gap-1.5 font-medium text-[--p-600]"
          >
            Ver todas las alertas (8) <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
          </Link>
        </footer>
      </section>

      {/* Strategic 2x2 */}
      <section className="grid grid-cols-1 gap-[18px] lg:grid-cols-2">
        <StrategicBlock
          icon={<Package className="h-3.5 w-3.5" strokeWidth={1.5} />}
          iconTone="warn"
          title="Productos en alerta"
          badge={{ label: "12", tone: "warn" }}
          footer={{ label: "Ver módulo Reorden", to: "/admin/reorden" }}
          items={[
            {
              key: "CMP-1410-S",
              keyTone: "warn",
              title: "Compresor Sullair LS-110",
              sub: "WH-02 PEREIRA · cat-cmp",
              right: <RightStock current="0" total="2 mín." status="agotado" tone="dang" />,
            },
            {
              key: "SKU-4220-V",
              keyTone: "warn",
              title: 'Válvula Ingersoll 3/4"',
              sub: "WH-02 PEREIRA · cat-rpt",
              right: <RightStock current="3" total="12 mín." status="crítico" tone="warn" />,
            },
            {
              key: "RPT-0830-K",
              keyTone: "warn",
              title: "Kit reparación Kaeser SX-7",
              sub: "WH-01 CALI · cat-rpt",
              right: <RightStock current="2" total="8 mín." status="crítico" tone="warn" />,
            },
          ]}
        />

        <StrategicBlock
          icon={<Wrench className="h-3.5 w-3.5" strokeWidth={1.5} />}
          iconTone="info"
          title="OTs en proceso"
          badge={{ label: "6", tone: "info" }}
          footer={{ label: "Ver Órdenes de Trabajo", to: "/ops/ot" }}
          items={[
            {
              key: "OT-2845",
              keyTone: "info",
              title: "Mantto. Kaeser SX-7 · Industrias Norte",
              sub: "Téc. Carlos M. · diagnóstico",
              right: <RightAge value="5d" status="vencida" tone="dang" />,
            },
            {
              key: "OT-2851",
              keyTone: "info",
              title: "Cambio cabezal · Compresores SAS",
              sub: "Téc. Andrés P. · reparación",
              right: <RightAge value="2d" status="en plazo" tone="warn" />,
            },
            {
              key: "OT-2858",
              keyTone: "info",
              title: "Diagnóstico Sullair LS-110 · Petrocali",
              sub: "Téc. María R. · ingreso",
              right: <RightAge value="8h" status="hoy" />,
            },
          ]}
        />

        <StrategicBlock
          icon={<FileText className="h-3.5 w-3.5" strokeWidth={1.5} />}
          iconTone="warn"
          title="Cotizaciones por vencer"
          badge={{ label: "5", tone: "warn" }}
          footer={{ label: "Ver Cotizaciones", to: "/ops/cotizaciones" }}
          items={[
            {
              key: "COT-1124",
              keyTone: "warn",
              title: "Industrias Norte S.A.",
              sub: "3 SKUs · vendedor M. Restrepo",
              right: <RightQuote total="$8.420k" days="2d" />,
            },
            {
              key: "COT-1127",
              keyTone: "warn",
              title: "Petrocali Logística",
              sub: "7 SKUs · vendedor A. Pinto",
              right: <RightQuote total="$15.080k" days="3d" />,
            },
            {
              key: "COT-1130",
              keyTone: "warn",
              title: "Compresores SAS",
              sub: "2 SKUs · vendedor C. Mejía",
              right: <RightQuote total="$3.250k" days="5d" />,
            },
          ]}
        />

        {/* Actividad reciente */}
        <div className="flex flex-col overflow-hidden rounded-[10px] border border-[--n-150] bg-white">
          <header className="flex items-center justify-between px-[18px] pb-2.5 pt-3.5">
            <div className="flex items-center gap-2.5">
              <span className="grid h-6 w-6 place-items-center rounded-md bg-[--n-100] text-[--n-700]">
                <Clock className="h-3.5 w-3.5" strokeWidth={1.5} />
              </span>
              <span className="text-[13px] font-semibold text-[--n-950]">Actividad reciente</span>
            </div>
          </header>
          <div className="flex flex-col px-[18px] pt-1">
            <TlRow
              dotColor="var(--succ-500)"
              title={<><b>Venta VT-0247</b> · $1.860.000 · Industrias Norte</>}
              sub="M. Restrepo · WH-01"
              time="09:34"
            />
            <TlRow
              dotColor="var(--info)"
              title={<><b>OT-2858 abierta</b> · Diagnóstico Sullair</>}
              sub="Recepción · WH-01"
              time="09:18"
            />
            <TlRow
              dotColor="var(--p-500)"
              title={<><b>Traspaso TR-0091</b> recibido · 4 SKUs</>}
              sub="WH-02 → WH-01"
              time="08:52"
            />
            <TlRow
              dotColor="var(--warn-500)"
              title={<><b>Compra OC-0184</b> ingresada · $4.230.000</>}
              sub="SULLAIR S.A. · espera aprobación"
              time="08:30"
              last
            />
          </div>
          <footer className="mt-auto border-t border-[--n-100] bg-[--n-50] px-[18px] py-3 text-[12px]">
            <Link
              to="/admin/auditoria"
              className="inline-flex items-center gap-1.5 font-medium text-[--p-600]"
            >
              Ver Auditoría <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
            </Link>
          </footer>
        </div>
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
      <div className="flex flex-wrap items-center gap-1.5 text-[11.5px] text-[--n-500]">
        {sub}
      </div>
    </div>
  );
}

function Dot({ color }: { color: string }) {
  return (
    <span
      className="inline-flex items-center gap-1"
      style={{ color }}
    >
      <span
        className="inline-block h-1 w-1 rounded-full"
        style={{ background: "currentColor" }}
      />
      <span style={{ color: "inherit" }} />
    </span>
  );
}

function Sep() {
  return <span className="text-[--n-300]">·</span>;
}

function AttRow({
  color, title, sub, action,
}: { color: "danger" | "warn" | "info"; title: string; sub: string; action: string }) {
  const bg =
    color === "danger" ? "var(--dang-500)" : color === "warn" ? "var(--warn-500)" : "var(--info)";
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-[--n-100] px-[18px] py-3 text-[12.5px] last:border-b-0">
      <span className="h-2 w-2 rounded-full" style={{ background: bg }} />
      <div className="flex min-w-0 flex-col gap-0.5">
        <div className="font-medium leading-[1.3] text-[--n-950]">{title}</div>
        <div className="font-mono text-[10.5px] tracking-[0.04em] text-[--n-500]">{sub}</div>
      </div>
      <button className="rounded-[5px] border border-[--n-200] bg-white px-2.5 py-1 text-[11.5px] font-medium leading-tight text-[--p-600] hover:bg-[--p-50]">
        {action}
      </button>
    </div>
  );
}

type SbItem = {
  key: string;
  keyTone: "warn" | "info" | "neutral";
  title: string;
  sub: string;
  right: React.ReactNode;
};

function StrategicBlock({
  icon, iconTone, title, badge, items, footer,
}: {
  icon: React.ReactNode;
  iconTone: "warn" | "info" | "neutral";
  title: string;
  badge: { label: string; tone: "warn" | "info" };
  items: SbItem[];
  footer: { label: string; to: string };
}) {
  const iconClasses =
    iconTone === "warn"
      ? "bg-[--warn-50] text-[--warn-700]"
      : iconTone === "info"
      ? "bg-[--info-bg] text-[--info-d]"
      : "bg-[--n-100] text-[--n-700]";
  const badgeClasses =
    badge.tone === "warn"
      ? "bg-[--warn-50] text-[--warn-700] border-[#FEDF89]"
      : "bg-[--info-bg] text-[--info-d] border-[--info-bd]";

  return (
    <div className="flex flex-col overflow-hidden rounded-[10px] border border-[--n-150] bg-white">
      <header className="flex items-center justify-between px-[18px] pb-2.5 pt-3.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className={`grid h-6 w-6 place-items-center rounded-md ${iconClasses}`}>
            {icon}
          </span>
          <span className="text-[13px] font-semibold text-[--n-950]">{title}</span>
        </div>
        <span
          className={`rounded-[3px] border px-1.5 py-px font-mono text-[10.5px] font-semibold leading-[1.4] ${badgeClasses}`}
        >
          {badge.label}
        </span>
      </header>

      <div className="flex flex-1 flex-col">
        {items.map((it) => {
          const keyClasses =
            it.keyTone === "warn"
              ? "bg-[--warn-50] text-[--warn-700] border-[#FEDF89]"
              : it.keyTone === "info"
              ? "bg-[--info-bg] text-[--info-d] border-[--info-bd]"
              : "bg-[--n-50] text-[--n-700] border-[--n-150]";
          return (
            <div
              key={it.key}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-t border-[--n-100] px-[18px] py-2.5"
            >
              <span
                className={`self-start mt-[1px] rounded-[3px] border px-1.5 py-0.5 font-mono text-[11px] font-medium leading-[1.4] ${keyClasses}`}
              >
                {it.key}
              </span>
              <div className="flex min-w-0 flex-col gap-0.5">
                <div className="truncate text-[12.5px] font-medium leading-[1.3] text-[--n-950]">
                  {it.title}
                </div>
                <div className="font-mono text-[10.5px] tracking-[0.04em] text-[--n-500]">
                  {it.sub}
                </div>
              </div>
              <div className="whitespace-nowrap text-right font-mono text-[11px] font-medium leading-[1.3] text-[--n-700]">
                {it.right}
              </div>
            </div>
          );
        })}
      </div>

      <footer className="mt-auto border-t border-[--n-100] bg-[--n-50] px-[18px] py-3 text-[12px]">
        <Link
          to={footer.to as never}
          className="inline-flex items-center gap-1.5 font-medium text-[--p-600]"
        >
          {footer.label} <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
        </Link>
      </footer>
    </div>
  );
}

function RightStock({
  current, total, status, tone,
}: { current: string; total: string; status: string; tone: "warn" | "dang" }) {
  const color = tone === "dang" ? "text-[--dang-700]" : "text-[--warn-700]";
  return (
    <>
      <span className={`font-semibold ${color}`}>{current}</span> / {total}
      <div className="text-[10px] font-normal text-[--n-500]">{status}</div>
    </>
  );
}

function RightAge({
  value, status, tone,
}: { value: string; status: string; tone?: "warn" | "dang" }) {
  const color =
    tone === "dang" ? "text-[--dang-700]" : tone === "warn" ? "text-[--warn-700]" : "text-[--n-700]";
  return (
    <>
      <span className={`font-semibold ${color}`}>{value}</span>
      <div className="text-[10px] font-normal text-[--n-500]">{status}</div>
    </>
  );
}

function RightQuote({ total, days }: { total: string; days: string }) {
  return (
    <>
      <span className="font-semibold">{total}</span>
      <div className="text-[10px] font-medium text-[--warn-700]">{days}</div>
    </>
  );
}

function TlRow({
  dotColor, title, sub, time, last,
}: {
  dotColor: string;
  title: React.ReactNode;
  sub: string;
  time: string;
  last?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-[18px_1fr_auto] items-start gap-2.5 py-2.5 ${
        last ? "" : "border-b border-[--n-100]"
      }`}
    >
      <span
        className="mt-1.5 h-2 w-2 rounded-full"
        style={{ background: dotColor }}
      />
      <div className="flex min-w-0 flex-col gap-0.5">
        <div className="text-[12.5px] leading-[1.3] text-[--n-950]">{title}</div>
        <div className="font-mono text-[10.5px] tracking-[0.04em] text-[--n-500]">{sub}</div>
      </div>
      <div className="font-mono text-[10.5px] text-[--n-500]">{time}</div>
    </div>
  );
}

/* Triangle icon fallback — using lucide AlertTriangle for safety */
void AlertTriangle;
