import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  CreditCard, ClipboardList, Sliders, Check, Info, Pencil, Trash2,
  Plus, GripVertical,
} from "lucide-react";

export const Route = createFileRoute("/admin/configuracion")({
  head: () => ({ meta: [{ title: "Configuración · CHV" }] }),
  component: ConfiguracionPage,
});

type Tab = "cuentas" | "checklist" | "parametros";

type Cuenta = {
  banco: string;
  tipo: string;
  numero: string;
  conIva: boolean;
  activa: boolean;
  defaultPdf: boolean;
};

const CUENTAS: Cuenta[] = [
  { banco: "Bancolombia",      tipo: "Cta. Ahorros",   numero: "123-4567890-1",   conIva: true,  activa: true, defaultPdf: true  },
  { banco: "Davivienda",       tipo: "Cta. Corriente", numero: "098-7654321",     conIva: true,  activa: true, defaultPdf: true  },
  { banco: "BBVA",             tipo: "Cta. Corriente", numero: "567-8901234",     conIva: false, activa: true, defaultPdf: false },
  { banco: "Nequi / Daviplata", tipo: "Cuenta digital", numero: "318-442-XX-XX",   conIva: false, activa: true, defaultPdf: false },
];

const CHECKLIST_OT = [
  { seccion: "Recepción", items: ["Verificar serial del compresor", "Fotografiar estado externo", "Registrar accesorios entregados", "Confirmar síntoma reportado con cliente"] },
  { seccion: "Diagnóstico", items: ["Medir presión de trabajo", "Verificar nivel y estado del aceite", "Revisar filtros de aire y separador", "Inspeccionar correas y poleas", "Probar válvulas de seguridad"] },
  { seccion: "Reparación", items: ["Solicitar repuestos por cotización interna", "Documentar piezas reemplazadas", "Registrar horas técnicas reales", "Aplicar protocolo de torque"] },
  { seccion: "Pruebas finales", items: ["Test de presión 30 min", "Verificar temperatura de operación", "Medir consumo eléctrico", "Comprobar ausencia de fugas"] },
  { seccion: "Entrega", items: ["Limpieza externa del equipo", "Generar reporte técnico PDF", "Capturar firma del cliente", "Programar próximo mantenimiento"] },
];

const PARAMETROS = [
  { label: "Días de validez por defecto en cotizaciones", value: "15 días", tipo: "número" },
  { label: "IVA aplicado por defecto", value: "19%", tipo: "número" },
  { label: "Stock mínimo global (alerta)", value: "5 unidades", tipo: "número" },
  { label: "Días para considerar SKU sin movimiento", value: "90 días", tipo: "número" },
  { label: "Prefijo de cotizaciones", value: "Cot-", tipo: "texto" },
  { label: "Prefijo de ventas", value: "V-", tipo: "texto" },
  { label: "Prefijo de OT", value: "OT-", tipo: "texto" },
  { label: "Zona horaria", value: "America/Bogotá (UTC−5)", tipo: "texto" },
  { label: "Moneda", value: "COP · $", tipo: "texto" },
  { label: "Formato de fecha", value: "19 abr 2026", tipo: "texto" },
];

function Toggle({ on }: { on: boolean }) {
  return (
    <span className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors ${on ? "bg-[--succ-700]" : "bg-[--n-200]"}`}>
      <span className={`absolute h-3 w-3 rounded-full bg-white shadow-sm transition-all ${on ? "left-3.5" : "left-0.5"}`} />
    </span>
  );
}

function Checkbox({ on }: { on: boolean }) {
  return (
    <span className={`grid h-4 w-4 place-items-center rounded border ${on ? "border-[--succ-700] bg-[--succ-700]" : "border-[--n-300] bg-white"}`}>
      {on && <Check className="h-3 w-3 text-white" />}
    </span>
  );
}

function ConfiguracionPage() {
  const [tab, setTab] = useState<Tab>("cuentas");

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-6">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-[--n-500]">Panel admin · Configuración</div>
          <h1 className="mt-1 text-[22px] font-semibold text-[--n-900]">Configuración del sistema</h1>
          <p className="mt-1 text-[13px] text-[--n-600]">Parámetros operativos que afectan el comportamiento de la app</p>
        </div>
        <button className="inline-flex h-9 items-center gap-1.5 rounded-md bg-[--p-cta] px-3 text-[13px] font-medium text-white opacity-60 hover:bg-[--p-700]" disabled>
          <Check className="h-3.5 w-3.5" /> Guardar cambios
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-5 flex gap-1 border-b border-[--n-200]">
        {([
          { id: "cuentas" as Tab,    icon: CreditCard,    label: "Cuentas bancarias", count: "4" },
          { id: "checklist" as Tab,  icon: ClipboardList, label: "Checklist OT",       count: "24 ítems" },
          { id: "parametros" as Tab, icon: Sliders,       label: "Parámetros del sistema" },
        ]).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            data-active={tab === t.id}
            className="group flex items-center gap-2 border-b-2 border-transparent px-3 py-2.5 text-[13px] text-[--n-600] hover:text-[--n-900] data-[active=true]:border-[--p-cta] data-[active=true]:text-[--n-900] data-[active=true]:font-medium"
          >
            <t.icon className="h-4 w-4" />
            {t.label}
            {t.count && <span className="rounded-full bg-[--n-100] px-1.5 py-0.5 font-mono text-[10.5px] text-[--n-600]">{t.count}</span>}
          </button>
        ))}
      </div>

      {/* TAB 1: Cuentas bancarias */}
      {tab === "cuentas" && (
        <div>
          <div className="mb-4 flex items-start gap-3 rounded-lg border border-[--info-700]/20 bg-[--info-50] p-4">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[--info-700]" />
            <div>
              <div className="text-[13px] font-medium text-[--info-700]">Cuentas default en cotizaciones</div>
              <div className="mt-0.5 text-[12px] text-[--n-700]">
                Las cuentas que marques como <b>"Default para PDFs"</b> aparecerán pre-seleccionadas en cada nueva cotización.
                El vendedor puede deseleccionar o agregar otras según el caso.
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-[--n-200] bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-[--n-200] text-left text-[11px] uppercase tracking-wide text-[--n-500]">
                    <th className="px-4 py-2.5 font-medium">Banco</th>
                    <th className="px-4 py-2.5 font-medium">Número de cuenta</th>
                    <th className="px-4 py-2.5 font-medium">Aplicar IVA</th>
                    <th className="px-4 py-2.5 font-medium">Estado</th>
                    <th className="px-4 py-2.5 font-medium">Default para PDFs</th>
                    <th className="w-28 px-4 py-2.5 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {CUENTAS.map((c) => (
                    <tr key={c.numero} className="border-b border-[--n-100] last:border-0 hover:bg-[--n-25]">
                      <td className="px-4 py-3">
                        <div className="font-medium text-[--n-900]">{c.banco}</div>
                        <div className="mt-0.5 text-[11px] text-[--n-500]">{c.tipo}</div>
                      </td>
                      <td className="px-4 py-3 font-mono font-medium text-[--n-800]">{c.numero}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium ${c.conIva ? "bg-[--succ-50] text-[--succ-700] border-[--succ-700]/20" : "bg-[--n-50] text-[--n-700] border-[--n-200]"}`}>
                          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                          {c.conIva ? "Con IVA" : "Sin IVA"}
                        </span>
                      </td>
                      <td className="px-4 py-3"><Toggle on={c.activa} /></td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-2">
                          <Checkbox on={c.defaultPdf} />
                          <span className={`text-[12px] ${c.defaultPdf ? "font-medium text-[--succ-700]" : "text-[--n-500]"}`}>
                            {c.defaultPdf ? "Default" : "No default"}
                          </span>
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button className="grid h-7 w-7 place-items-center rounded-md text-[--n-600] hover:bg-[--n-100] hover:text-[--n-900]">
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button className="grid h-7 w-7 place-items-center rounded-md text-[--dang-700] hover:bg-[--dang-50]">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between border-t border-[--n-200] px-4 py-2.5">
              <span className="font-mono text-[11.5px] text-[--n-500]">
                4 cuentas · <b className="text-[--n-800]">2 default</b> · 2 con IVA · 2 sin IVA
              </span>
              <button className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[--p-700]/30 bg-white px-3 text-[12px] font-medium text-[--p-700] hover:bg-[--p-cta]/5">
                <Plus className="h-3.5 w-3.5" /> Agregar cuenta bancaria
              </button>
            </div>
          </div>

          <p className="mt-3 flex items-start gap-1.5 text-[12px] leading-relaxed text-[--n-500]">
            <Info className="mt-0.5 h-3 w-3 shrink-0 text-[--info-700]" />
            Las cuentas <b className="text-[--n-700]">con IVA</b> son cuentas empresariales registradas; las{" "}
            <b className="text-[--n-700]">sin IVA</b> son típicamente digitales personales (Nequi/Daviplata).
          </p>
        </div>
      )}

      {/* TAB 2: Checklist OT */}
      {tab === "checklist" && (
        <div>
          <div className="mb-4 flex items-start gap-3 rounded-lg border border-[--info-700]/20 bg-[--info-50] p-4">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[--info-700]" />
            <div>
              <div className="text-[13px] font-medium text-[--info-700]">Checklist obligatorio en cada Orden de Trabajo</div>
              <div className="mt-0.5 text-[12px] text-[--n-700]">
                Los ítems se muestran en el detalle de la OT y deben marcarse antes de cerrar la orden.
                Editá, reordená o desactivá ítems sin afectar OT históricas.
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {CHECKLIST_OT.map((s) => (
              <div key={s.seccion} className="overflow-hidden rounded-lg border border-[--n-200] bg-white">
                <div className="flex items-center justify-between border-b border-[--n-200] bg-[--n-25] px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] uppercase tracking-wide text-[--n-500]">Sección</span>
                    <span className="text-[13px] font-semibold text-[--n-900]">{s.seccion}</span>
                    <span className="rounded-full bg-[--n-100] px-1.5 py-0.5 font-mono text-[10.5px] text-[--n-600]">{s.items.length}</span>
                  </div>
                  <button className="text-[12px] text-[--p-700] hover:underline">+ Ítem</button>
                </div>
                <ul className="divide-y divide-[--n-100]">
                  {s.items.map((it, i) => (
                    <li key={i} className="flex items-center gap-3 px-4 py-2.5">
                      <GripVertical className="h-3.5 w-3.5 cursor-grab text-[--n-400]" />
                      <Checkbox on />
                      <span className="flex-1 text-[13px] text-[--n-800]">{it}</span>
                      <button className="grid h-7 w-7 place-items-center rounded-md text-[--n-500] hover:bg-[--n-100] hover:text-[--n-900]">
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button className="grid h-7 w-7 place-items-center rounded-md text-[--dang-700] hover:bg-[--dang-50]">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Parámetros */}
      {tab === "parametros" && (
        <div className="overflow-hidden rounded-lg border border-[--n-200] bg-white">
          <ul className="divide-y divide-[--n-100]">
            {PARAMETROS.map((p) => (
              <li key={p.label} className="flex items-center justify-between gap-4 px-4 py-3">
                <div>
                  <div className="text-[13px] text-[--n-900]">{p.label}</div>
                  <div className="mt-0.5 font-mono text-[10.5px] uppercase tracking-wide text-[--n-500]">{p.tipo}</div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    defaultValue={p.value}
                    className="h-8 w-64 rounded-md border border-[--n-200] bg-white px-2.5 font-mono text-[12.5px] text-[--n-900] focus:border-[--p-cta] focus:outline-none"
                  />
                  <button className="grid h-8 w-8 place-items-center rounded-md text-[--n-500] hover:bg-[--n-100] hover:text-[--n-900]">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t border-[--n-200] bg-[--n-25] px-4 py-3 text-[11.5px] text-[--n-500]">
            Los cambios en parámetros se aplican de inmediato y quedan registrados en Auditoría.
          </div>
        </div>
      )}
    </div>
  );
}
