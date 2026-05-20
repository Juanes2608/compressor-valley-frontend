import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ClipboardCheck, Calendar, AlertTriangle, Target, Download, Play,
  CheckCircle2, User, MapPin, Filter,
} from "lucide-react";

export const Route = createFileRoute("/admin/conteo-ciclico")({
  head: () => ({ meta: [{ title: "Conteo cíclico · CHV" }] }),
  component: ConteoCiclicoPage,
});

type Frecuencia = "Semanal" | "Mensual" | "Trimestral";
type Estado = "Programada" | "En curso" | "Completada" | "Atrasada";

type Tarea = {
  id: string;
  sede: "WH-01 CALI" | "WH-02 PEREIRA" | "WH-03 BUGA" | "WH-04 TULUÁ";
  categoria: "Compresores" | "Repuestos" | "Herramientas" | "Lubricantes" | "Accesorios";
  clase: "A" | "B" | "C";
  frecuencia: Frecuencia;
  skus: number;
  asignado: string;
  fecha: string;
  estado: Estado;
  divergencias?: number;
};

const TAREAS: Tarea[] = [
  { id: "CNT-0184", sede: "WH-01 CALI", categoria: "Compresores", clase: "A", frecuencia: "Semanal", skus: 28, asignado: "L. Ramírez", fecha: "20 abr 2026", estado: "En curso" },
  { id: "CNT-0183", sede: "WH-01 CALI", categoria: "Repuestos", clase: "A", frecuencia: "Semanal", skus: 142, asignado: "M. Cardona", fecha: "20 abr 2026", estado: "Programada" },
  { id: "CNT-0182", sede: "WH-02 PEREIRA", categoria: "Compresores", clase: "A", frecuencia: "Semanal", skus: 18, asignado: "J. Ospina", fecha: "19 abr 2026", estado: "Completada", divergencias: 2 },
  { id: "CNT-0181", sede: "WH-02 PEREIRA", categoria: "Repuestos", clase: "B", frecuencia: "Mensual", skus: 86, asignado: "S. Galvis", fecha: "18 abr 2026", estado: "Atrasada" },
  { id: "CNT-0180", sede: "WH-03 BUGA", categoria: "Lubricantes", clase: "B", frecuencia: "Mensual", skus: 42, asignado: "D. Mejía", fecha: "17 abr 2026", estado: "Completada", divergencias: 0 },
  { id: "CNT-0179", sede: "WH-01 CALI", categoria: "Herramientas", clase: "C", frecuencia: "Trimestral", skus: 64, asignado: "Sin asignar", fecha: "16 abr 2026", estado: "Programada" },
  { id: "CNT-0178", sede: "WH-04 TULUÁ", categoria: "Accesorios", clase: "C", frecuencia: "Trimestral", skus: 38, asignado: "R. Quintero", fecha: "15 abr 2026", estado: "Completada", divergencias: 4 },
];

type Divergencia = {
  sku: string;
  nombre: string;
  sede: string;
  sistema: number;
  fisico: number;
  costoUnit: number;
  tarea: string;
};

const DIVERGENCIAS: Divergencia[] = [
  { sku: "SKU-4521-A", nombre: "Filtro aire GA-22", sede: "WH-04 TULUÁ", sistema: 18, fisico: 14, costoUnit: 184000, tarea: "CNT-0178" },
  { sku: "RPT-0840-K", nombre: "Kit empaques Kaeser SX-7", sede: "WH-04 TULUÁ", sistema: 6, fisico: 8, costoUnit: 312000, tarea: "CNT-0178" },
  { sku: "CMP-1840-A", nombre: "Compresor Atlas Copco GA-30", sede: "WH-02 PEREIRA", sistema: 2, fisico: 1, costoUnit: 24500000, tarea: "CNT-0182" },
  { sku: "ACE-0150-M", nombre: "Aceite Mobil Rarus 427 · 20L", sede: "WH-04 TULUÁ", sistema: 12, fisico: 11, costoUnit: 425000, tarea: "CNT-0178" },
];

const TABS: { id: string; label: string; count?: number }[] = [
  { id: "todas", label: "Todas", count: 7 },
  { id: "hoy", label: "Hoy", count: 2 },
  { id: "atrasadas", label: "Atrasadas", count: 1 },
  { id: "completadas", label: "Completadas", count: 3 },
];

function ConteoCiclicoPage() {
  const [tab, setTab] = useState("todas");

  const tareas = TAREAS.filter((t) => {
    if (tab === "hoy") return t.fecha === "20 abr 2026";
    if (tab === "atrasadas") return t.estado === "Atrasada";
    if (tab === "completadas") return t.estado === "Completada";
    return true;
  });

  const totalDivergencias = DIVERGENCIAS.length;
  const valorDivergencias = DIVERGENCIAS.reduce(
    (a, d) => a + Math.abs(d.sistema - d.fisico) * d.costoUnit,
    0,
  );

  return (
    <div className="flex flex-col gap-6 px-7 pb-8 pt-6">
      {/* Page head */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="m-0 mb-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-[--n-300]">
            Admin · Auditoría de inventario
          </p>
          <h1 className="m-0 flex items-center gap-2.5 text-[24px] font-semibold leading-tight tracking-[-0.018em] text-[--n-950]">
            Conteo cíclico
            <span className="rounded-[3px] border border-[--info-border] bg-[--info-50] px-1.5 py-px font-mono text-[11px] font-semibold text-[--info-700]">
              7 tareas activas
            </span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[--n-200] bg-white px-3 text-[12.5px] font-medium text-[--n-700]">
            <Download className="h-3.5 w-3.5" strokeWidth={1.5} />
            Exportar
          </button>
          <button className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[--p-cta] px-3 text-[12.5px] font-semibold text-white hover:opacity-90">
            <Calendar className="h-3.5 w-3.5" strokeWidth={1.75} />
            Programar conteo
          </button>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-y-4 border-b border-[--n-150] pb-4 md:grid-cols-4 md:gap-y-0">
        <Kpi label="Tareas hoy" value="2" sub="1 en curso · 1 programada" icon={<ClipboardCheck className="h-3.5 w-3.5" />} />
        <Kpi label="SKUs contados (mes)" value="418" sub="86% del programa Apr" icon={<CheckCircle2 className="h-3.5 w-3.5" />} />
        <Kpi label="Divergencias abiertas" value="6" sub="4 menores · 2 críticas" icon={<AlertTriangle className="h-3.5 w-3.5" />} tone="warn" />
        <Kpi last label="Precisión inventario" value="98,4 %" sub="Meta ≥ 98% · últimos 90d" icon={<Target className="h-3.5 w-3.5" />} tone="success" />
      </div>

      {/* Tabs */}
      <div className="-mb-2 flex flex-wrap items-center gap-1 border-b border-[--n-150]">
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`relative inline-flex h-9 items-center gap-1.5 px-3 text-[13px] font-medium ${
                active ? "text-[--n-950]" : "text-[--n-500] hover:text-[--n-700]"
              }`}
            >
              {t.label}
              {typeof t.count === "number" && (
                <span className="grid h-[18px] min-w-[18px] place-items-center rounded-full bg-[--n-100] px-1.5 font-mono text-[10.5px] text-[--n-700]">
                  {t.count}
                </span>
              )}
              {active && <span className="absolute inset-x-0 -bottom-px h-[2px] bg-[--p-cta]" />}
            </button>
          );
        })}
        <div className="ml-auto flex items-center gap-2">
          <button className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[--n-200] bg-white px-3 text-[12px] font-medium text-[--n-700]">
            <Filter className="h-3.5 w-3.5" strokeWidth={1.5} />
            Filtros
          </button>
        </div>
      </div>

      {/* Tareas table */}
      <section className="overflow-hidden rounded-[10px] border border-[--n-150] bg-white">
        <div className="grid grid-cols-[110px_1fr_140px_120px_110px_1fr_140px_110px] items-center gap-3 border-b border-[--n-100] bg-[--n-50] px-4 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.06em] text-[--n-500]">
          <span>Tarea</span>
          <span>Sede / Categoría</span>
          <span>Clase ABC</span>
          <span>Frecuencia</span>
          <span className="text-right">SKUs</span>
          <span>Asignado</span>
          <span>Fecha</span>
          <span>Estado</span>
        </div>
        {tareas.map((t) => (
          <div
            key={t.id}
            className="grid grid-cols-[110px_1fr_140px_120px_110px_1fr_140px_110px] items-center gap-3 border-b border-[--n-100] px-4 py-3 text-[12.5px] last:border-0 hover:bg-[--n-25]"
          >
            <span className="font-mono text-[12px] font-semibold text-[--n-950]">{t.id}</span>
            <div className="flex min-w-0 flex-col gap-0.5">
              <div className="flex items-center gap-1.5 text-[12.5px] text-[--n-900]">
                <MapPin className="h-3 w-3 text-[--n-400]" strokeWidth={1.75} />
                <span className="font-medium">{t.sede}</span>
              </div>
              <span className="text-[11.5px] text-[--n-500]">{t.categoria}</span>
            </div>
            <ClasePill clase={t.clase} />
            <span className="text-[12px] text-[--n-700]">{t.frecuencia}</span>
            <span className="text-right font-mono text-[12px] text-[--n-900]">{t.skus}</span>
            <div className="flex items-center gap-1.5 text-[12px] text-[--n-700]">
              <User className="h-3 w-3 text-[--n-400]" strokeWidth={1.75} />
              <span className={t.asignado === "Sin asignar" ? "italic text-[--n-400]" : ""}>{t.asignado}</span>
            </div>
            <span className="font-mono text-[11.5px] text-[--n-700]">{t.fecha}</span>
            <EstadoPill estado={t.estado} />
          </div>
        ))}
        {tareas.length === 0 && (
          <div className="px-4 py-10 text-center text-[12.5px] text-[--n-500]">
            No hay tareas en este filtro.
          </div>
        )}
      </section>

      {/* Divergencias */}
      <section className="overflow-hidden rounded-[10px] border border-[--n-150] bg-white">
        <header className="flex items-center justify-between border-b border-[--n-100] bg-[--n-50] px-[18px] py-3">
          <div className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-[--warn-50] text-[--warn-700]">
              <AlertTriangle className="h-3.5 w-3.5" strokeWidth={1.75} />
            </span>
            <div className="flex flex-col gap-0.5">
              <span className="text-[13px] font-semibold text-[--n-950]">Divergencias por ajustar</span>
              <span className="font-mono text-[10.5px] tracking-[0.04em] text-[--n-500]">
                {totalDivergencias} SKUs · valor estimado{" "}
                <span className="text-[--n-700]">${fmt(valorDivergencias)}</span>
              </span>
            </div>
          </div>
          <button className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[--p-cta] px-3 text-[12.5px] font-semibold text-white hover:opacity-90">
            <Play className="h-3.5 w-3.5" strokeWidth={1.75} />
            Generar ajustes ({totalDivergencias})
          </button>
        </header>

        <div className="grid grid-cols-[140px_1fr_140px_90px_90px_110px_140px] items-center gap-3 border-b border-[--n-100] bg-white px-4 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.06em] text-[--n-500]">
          <span>SKU</span>
          <span>Producto</span>
          <span>Sede</span>
          <span className="text-right">Sistema</span>
          <span className="text-right">Físico</span>
          <span className="text-right">Δ</span>
          <span className="text-right">Valor</span>
        </div>
        {DIVERGENCIAS.map((d) => {
          const delta = d.fisico - d.sistema;
          const valor = Math.abs(delta) * d.costoUnit;
          return (
            <div
              key={d.sku}
              className="grid grid-cols-[140px_1fr_140px_90px_90px_110px_140px] items-center gap-3 border-b border-[--n-100] px-4 py-2.5 text-[12px] last:border-0 hover:bg-[--n-25]"
            >
              <span className="font-mono text-[12px] font-semibold text-[--n-950]">{d.sku}</span>
              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="truncate text-[12.5px] text-[--n-900]">{d.nombre}</span>
                <span className="font-mono text-[10.5px] text-[--n-500]">tarea {d.tarea}</span>
              </div>
              <span className="text-[11.5px] text-[--n-700]">{d.sede}</span>
              <span className="text-right font-mono text-[12px] text-[--n-700]">{d.sistema}</span>
              <span className="text-right font-mono text-[12px] text-[--n-900]">{d.fisico}</span>
              <span
                className={`text-right font-mono text-[12px] font-semibold ${
                  delta < 0 ? "text-[--dang-700]" : "text-[--succ-700]"
                }`}
              >
                {delta > 0 ? "+" : ""}
                {delta}
              </span>
              <span className="text-right font-mono text-[12px] text-[--n-950]">
                <span className="text-[--n-400]">$</span>
                {fmt(valor)}
              </span>
            </div>
          );
        })}
      </section>
    </div>
  );
}

/* ─── Subcomponents ─── */

function Kpi({
  label, value, sub, icon, tone, last,
}: {
  label: string;
  value: string;
  sub: React.ReactNode;
  icon?: React.ReactNode;
  tone?: "success" | "warn";
  last?: boolean;
}) {
  const valueColor =
    tone === "success" ? "text-[--succ-700]" : tone === "warn" ? "text-[--warn-700]" : "text-[--n-950]";
  return (
    <div
      className={`flex flex-col gap-1.5 pl-7 pr-7 first:pl-0 ${
        last ? "" : "md:border-r md:border-dashed md:border-[--n-150]"
      }`}
    >
      <div className="flex items-center gap-1.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-[--n-500]">
        {icon && <span className="text-[--n-400]">{icon}</span>}
        {label}
      </div>
      <div className={`font-mono text-[22px] font-semibold leading-tight tracking-[-0.02em] ${valueColor}`}>
        {value}
      </div>
      <div className="text-[11.5px] text-[--n-500]">{sub}</div>
    </div>
  );
}

function ClasePill({ clase }: { clase: "A" | "B" | "C" }) {
  const map = {
    A: "border-[--dang-border] bg-[--dang-50] text-[--dang-700]",
    B: "border-[--warn-border] bg-[--warn-50] text-[--warn-700]",
    C: "border-[--n-200] bg-[--n-50] text-[--n-700]",
  } as const;
  return (
    <span className={`inline-flex h-[22px] w-fit items-center gap-1 rounded-[4px] border px-1.5 font-mono text-[10.5px] font-semibold ${map[clase]}`}>
      Clase {clase}
    </span>
  );
}

function EstadoPill({ estado }: { estado: Estado }) {
  const map: Record<Estado, string> = {
    Programada: "pill-neutral",
    "En curso": "pill-info",
    Completada: "pill-success",
    Atrasada: "pill-danger",
  };
  return (
    <span className={`pill ${map[estado]}`}>
      <span className="dot" />
      {estado}
    </span>
  );
}

function fmt(n: number) {
  return n.toLocaleString("en-US");
}
