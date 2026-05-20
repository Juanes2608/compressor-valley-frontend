import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Lock, CheckCircle2, Clock, AlertTriangle, FileText, Download,
  Calendar, DollarSign, Package, Receipt, ArrowRight, ShieldCheck,
} from "lucide-react";

export const Route = createFileRoute("/admin/cierres")({
  head: () => ({ meta: [{ title: "Cierres · CHV" }] }),
  component: CierresPage,
});

type EstadoCierre = "Abierto" | "En revisión" | "Cerrado" | "Bloqueado";

type Cierre = {
  id: string;
  periodo: string;
  tipo: "Diario" | "Mensual";
  sede: string;
  ventas: number;
  recibos: number;
  ajustes: number;
  estado: EstadoCierre;
  responsable: string;
  fecha: string;
};

const CIERRES: Cierre[] = [
  { id: "CIE-2026-04-19", periodo: "19 abr 2026", tipo: "Diario", sede: "Consolidado", ventas: 18420000, recibos: 14, ajustes: 2, estado: "En revisión", responsable: "C. Marín", fecha: "19 abr 2026 · 18:42" },
  { id: "CIE-2026-04-18", periodo: "18 abr 2026", tipo: "Diario", sede: "Consolidado", ventas: 22840000, recibos: 18, ajustes: 1, estado: "Cerrado", responsable: "C. Marín", fecha: "18 abr 2026 · 19:08" },
  { id: "CIE-2026-04-17", periodo: "17 abr 2026", tipo: "Diario", sede: "Consolidado", ventas: 14620000, recibos: 11, ajustes: 0, estado: "Cerrado", responsable: "C. Marín", fecha: "17 abr 2026 · 18:55" },
  { id: "CIE-2026-04-16", periodo: "16 abr 2026", tipo: "Diario", sede: "Consolidado", ventas: 19280000, recibos: 15, ajustes: 3, estado: "Cerrado", responsable: "C. Marín", fecha: "16 abr 2026 · 19:14" },
  { id: "CIE-2026-03", periodo: "Marzo 2026", tipo: "Mensual", sede: "Consolidado", ventas: 482840000, recibos: 318, ajustes: 24, estado: "Cerrado", responsable: "A. Vélez", fecha: "2 abr 2026 · 11:20" },
  { id: "CIE-2026-02", periodo: "Febrero 2026", tipo: "Mensual", sede: "Consolidado", ventas: 418620000, recibos: 284, ajustes: 18, estado: "Bloqueado", responsable: "A. Vélez", fecha: "3 mar 2026 · 14:08" },
];

type Item = { id: string; label: string; done: boolean; meta?: string };

const CHECKLIST_HOY: Item[] = [
  { id: "c1", label: "Ventas del día conciliadas", done: true, meta: "14 recibos · $ 18,420,000" },
  { id: "c2", label: "Recibos de caja cuadrados", done: true, meta: "Diferencia $ 0" },
  { id: "c3", label: "Ajustes de inventario aprobados", done: true, meta: "2 ajustes · −$ 184,000" },
  { id: "c4", label: "OT facturadas del día", done: false, meta: "1 pendiente · OT-2845" },
  { id: "c5", label: "Traspasos en tránsito revisados", done: false, meta: "3 traspasos abiertos" },
  { id: "c6", label: "Firma del responsable", done: false },
];

const fmtCOP = (n: number) => `$ ${n.toLocaleString("en-US")}`;

function PillEstado({ estado }: { estado: EstadoCierre }) {
  const map: Record<EstadoCierre, string> = {
    "Abierto":      "bg-[--info-50] text-[--info-700] border-[--info-700]/20",
    "En revisión":  "bg-[--warn-50] text-[--warn-700] border-[--warn-700]/20",
    "Cerrado":      "bg-[--succ-50] text-[--succ-700] border-[--succ-700]/20",
    "Bloqueado":    "bg-[--dang-50] text-[--dang-700] border-[--dang-700]/20",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${map[estado]}`}>
      {estado === "Cerrado" && <CheckCircle2 className="h-3 w-3" />}
      {estado === "En revisión" && <Clock className="h-3 w-3" />}
      {estado === "Bloqueado" && <Lock className="h-3 w-3" />}
      {estado === "Abierto" && <AlertTriangle className="h-3 w-3" />}
      {estado}
    </span>
  );
}

function CierresPage() {
  const [tab, setTab] = useState<"Todos" | "Diarios" | "Mensuales" | "Abiertos">("Todos");
  const filtrados = CIERRES.filter((c) => {
    if (tab === "Diarios") return c.tipo === "Diario";
    if (tab === "Mensuales") return c.tipo === "Mensual";
    if (tab === "Abiertos") return c.estado === "Abierto" || c.estado === "En revisión";
    return true;
  });

  const checklistDone = CHECKLIST_HOY.filter((i) => i.done).length;
  const progreso = Math.round((checklistDone / CHECKLIST_HOY.length) * 100);

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-6">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-[--n-500]">Admin · Cierres</div>
          <h1 className="mt-1 text-[22px] font-semibold text-[--n-900]">Cierres contables y operativos</h1>
          <p className="mt-1 text-[13px] text-[--n-600]">Conciliación diaria de ventas, recibos y ajustes. Cierre mensual auditable.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex h-9 items-center gap-1.5 rounded-md border border-[--n-200] bg-white px-3 text-[13px] text-[--n-700] hover:bg-[--n-50]">
            <Download className="h-3.5 w-3.5" /> Exportar
          </button>
          <button className="inline-flex h-9 items-center gap-1.5 rounded-md bg-[--p-cta] px-3 text-[13px] font-medium text-white hover:bg-[--p-700]">
            <Lock className="h-3.5 w-3.5" /> Cerrar día 19 abr
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { icon: Calendar, label: "Período actual", value: "19 abr 2026", sub: "Día abierto · 18:42" },
          { icon: DollarSign, label: "Ventas día", value: fmtCOP(18420000), sub: "14 recibos" },
          { icon: Package, label: "Ajustes pendientes", value: "2", sub: "−$ 184,000" },
          { icon: ShieldCheck, label: "Último cierre OK", value: "18 abr", sub: "C. Marín · 19:08" },
        ].map((k) => (
          <div key={k.label} className="rounded-lg border border-[--n-200] bg-white p-4">
            <div className="flex items-center gap-2 text-[--n-500]">
              <k.icon className="h-3.5 w-3.5" />
              <span className="text-[11px] uppercase tracking-wide">{k.label}</span>
            </div>
            <div className="mt-2 font-mono text-[20px] font-semibold tabular-nums text-[--n-900]">{k.value}</div>
            <div className="mt-0.5 text-[11px] text-[--n-500]">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Grid 2 col: checklist + tabla */}
      <div className="grid gap-4 lg:grid-cols-[380px_1fr]">
        {/* Checklist cierre hoy */}
        <div className="rounded-lg border border-[--n-200] bg-white">
          <div className="border-b border-[--n-200] p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-wide text-[--n-500]">Checklist cierre · 19 abr</div>
                <div className="mt-0.5 text-[15px] font-semibold text-[--n-900]">Progreso {progreso}%</div>
              </div>
              <div className="font-mono text-[13px] tabular-nums text-[--n-700]">{checklistDone}/{CHECKLIST_HOY.length}</div>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[--n-100]">
              <div className="h-full bg-[--p-cta]" style={{ width: `${progreso}%` }} />
            </div>
          </div>
          <ul className="divide-y divide-[--n-100]">
            {CHECKLIST_HOY.map((i) => (
              <li key={i.id} className="flex items-start gap-3 px-4 py-3">
                <div className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border ${i.done ? "border-[--succ-700] bg-[--succ-700]" : "border-[--n-300] bg-white"}`}>
                  {i.done && <CheckCircle2 className="h-3 w-3 text-white" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className={`text-[13px] ${i.done ? "text-[--n-500] line-through" : "text-[--n-900]"}`}>{i.label}</div>
                  {i.meta && <div className="mt-0.5 text-[11px] text-[--n-500]">{i.meta}</div>}
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t border-[--n-200] p-3">
            <button
              disabled={checklistDone < CHECKLIST_HOY.length}
              className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-md bg-[--p-cta] px-3 text-[13px] font-medium text-white hover:bg-[--p-700] disabled:cursor-not-allowed disabled:bg-[--n-200] disabled:text-[--n-500]"
            >
              <Lock className="h-3.5 w-3.5" /> Firmar y bloquear
            </button>
          </div>
        </div>

        {/* Tabla cierres */}
        <div className="rounded-lg border border-[--n-200] bg-white">
          <div className="flex items-center justify-between border-b border-[--n-200] px-4 py-3">
            <div className="flex gap-1">
              {(["Todos", "Diarios", "Mensuales", "Abiertos"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`rounded-md px-3 py-1.5 text-[12px] font-medium ${tab === t ? "bg-[--n-900] text-white" : "text-[--n-600] hover:bg-[--n-50]"}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="font-mono text-[11px] text-[--n-500]">{filtrados.length} cierres</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-[--n-200] text-left text-[11px] uppercase tracking-wide text-[--n-500]">
                  <th className="px-4 py-2.5 font-medium">ID</th>
                  <th className="px-4 py-2.5 font-medium">Período</th>
                  <th className="px-4 py-2.5 font-medium">Tipo</th>
                  <th className="px-4 py-2.5 font-medium text-right">Ventas</th>
                  <th className="px-4 py-2.5 font-medium text-right">Recibos</th>
                  <th className="px-4 py-2.5 font-medium text-right">Ajustes</th>
                  <th className="px-4 py-2.5 font-medium">Estado</th>
                  <th className="px-4 py-2.5 font-medium">Responsable</th>
                  <th className="px-4 py-2.5"></th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((c) => (
                  <tr key={c.id} className="border-b border-[--n-100] last:border-0 hover:bg-[--n-25]">
                    <td className="px-4 py-3 font-mono text-[12px] text-[--n-700]">{c.id}</td>
                    <td className="px-4 py-3 text-[--n-900]">{c.periodo}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 rounded-md bg-[--n-50] px-2 py-0.5 text-[11px] text-[--n-700]">
                        {c.tipo === "Diario" ? <Calendar className="h-3 w-3" /> : <FileText className="h-3 w-3" />}
                        {c.tipo}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono tabular-nums text-[--n-900]">{fmtCOP(c.ventas)}</td>
                    <td className="px-4 py-3 text-right font-mono tabular-nums text-[--n-700]">{c.recibos}</td>
                    <td className="px-4 py-3 text-right font-mono tabular-nums text-[--n-700]">{c.ajustes}</td>
                    <td className="px-4 py-3"><PillEstado estado={c.estado} /></td>
                    <td className="px-4 py-3 text-[--n-600]">{c.responsable}</td>
                    <td className="px-4 py-3 text-right">
                      <button className="inline-flex items-center gap-1 text-[12px] text-[--p-700] hover:underline">
                        Ver <ArrowRight className="h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer trazabilidad */}
      <div className="mt-6 flex items-center gap-2 rounded-lg border border-[--n-200] bg-[--n-25] px-4 py-3 text-[12px] text-[--n-600]">
        <Receipt className="h-3.5 w-3.5 text-[--n-500]" />
        Cada cierre queda firmado, sellado con fecha y bloqueado contra ediciones posteriores. Trazabilidad completa en Auditoría.
      </div>
    </div>
  );
}
