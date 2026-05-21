import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  CreditCard, ClipboardList, Sliders, Check, Info, Pencil, Trash2,
  Plus, GripVertical, AlertTriangle, ChevronDown,
} from "lucide-react";

export const Route = createFileRoute("/admin/configuracion")({
  head: () => ({ meta: [{ title: "Configuración · CHV" }] }),
  component: ConfiguracionPage,
});

type Tab = "cuentas" | "checklist" | "parametros";

/* ─── DATA ───────────────────────────────────────────── */

type Cuenta = {
  banco: string; tipo: string; numero: string;
  conIva: boolean; activa: boolean; defaultPdf: boolean;
};
const CUENTAS: Cuenta[] = [
  { banco: "Bancolombia",       tipo: "Cta. Ahorros",   numero: "123-4567890-1", conIva: true,  activa: true, defaultPdf: true  },
  { banco: "Davivienda",        tipo: "Cta. Corriente", numero: "098-7654321",   conIva: true,  activa: true, defaultPdf: true  },
  { banco: "BBVA",              tipo: "Cta. Corriente", numero: "567-8901234",   conIva: false, activa: true, defaultPdf: false },
  { banco: "Nequi / Daviplata", tipo: "Cuenta digital", numero: "318-442-XX-XX", conIva: false, activa: true, defaultPdf: false },
];

type Cat = "est" | "mec" | "ele" | "doc" | "acc";
const CAT_META: Record<Cat, { label: string; hex: string }> = {
  est: { label: "Estructura",              hex: "#6941C6" },
  mec: { label: "Componentes mecánicos",   hex: "#2D3CE5" },
  ele: { label: "Componentes eléctricos",  hex: "#DC6803" },
  doc: { label: "Documentación",           hex: "#039855" },
  acc: { label: "Accesorios",              hex: "#D24E8E" },
};

const CHECKLIST: { name: string; cat: Cat }[] = [
  { name: "Compresor",                cat: "est" },
  { name: "Cabezote",                 cat: "mec" },
  { name: "Motor",                    cat: "mec" },
  { name: "Manómetro",                cat: "mec" },
  { name: "Filtro de aire",           cat: "mec" },
  { name: "Filtro de aceite",         cat: "mec" },
  { name: "Válvula de seguridad",     cat: "mec" },
  { name: "Mangueras de descarga",    cat: "acc" },
  { name: "Mangueras de aspiración",  cat: "acc" },
  { name: "Cables de alimentación",   cat: "ele" },
  { name: "Ruedas",                   cat: "est" },
  { name: "Patas / soportes",         cat: "est" },
  { name: "Empaques",                 cat: "mec" },
  { name: "Llaves de servicio",       cat: "acc" },
  { name: "Manuales",                 cat: "doc" },
  { name: "Acoples",                  cat: "acc" },
  { name: "Reguladores de presión",   cat: "mec" },
  { name: "Lubricante incluido",      cat: "acc" },
  { name: "Tablero eléctrico",        cat: "ele" },
  { name: "Sensores",                 cat: "ele" },
  { name: "Bobinas",                  cat: "ele" },
  { name: "Correas",                  cat: "mec" },
  { name: "Carcasa",                  cat: "est" },
  { name: "Documentos del fabricante", cat: "doc" },
];

/* ─── UI helpers ─────────────────────────────────────── */

function Toggle({ on, size = "md", locked }: { on: boolean; size?: "sm" | "md"; locked?: boolean }) {
  const h = size === "sm" ? "h-3.5 w-6" : "h-4 w-7";
  const dot = size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3";
  const left = size === "sm" ? "left-3" : "left-3.5";
  return (
    <span className={`relative inline-flex ${h} items-center rounded-full transition-colors ${on ? "bg-[--succ-700]" : "bg-[--n-200]"} ${locked ? "opacity-70" : ""}`}>
      <span className={`absolute ${dot} rounded-full bg-white shadow-sm transition-all ${on ? left : "left-0.5"}`} />
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

/* ─── Page ───────────────────────────────────────────── */

function ConfiguracionPage() {
  const [tab, setTab] = useState<Tab>("cuentas");
  const dirty = tab !== "cuentas"; // tabs 2/3 muestran "cambios sin guardar"

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-6">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-[--n-500]">Panel admin · Configuración</div>
          <h1 className="mt-1 text-[22px] font-semibold text-[--n-900]">Configuración del sistema</h1>
          <p className="mt-1 text-[13px] text-[--n-600]">
            {tab === "cuentas"   && "Parámetros operativos que afectan el comportamiento de la app"}
            {tab === "checklist" && "Checklist oficial de recepción de equipos en OT"}
            {tab === "parametros"&& "Defaults globales que se propagan a documentos nuevos"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {dirty && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[--warn-700]/25 bg-[--warn-50] px-2.5 py-1 text-[11.5px] font-medium text-[--warn-700]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[--warn-700]" />
              Cambios sin guardar
            </span>
          )}
          <button className={`inline-flex h-9 items-center gap-1.5 rounded-md bg-[--p-cta] px-3 text-[13px] font-medium text-white hover:bg-[--p-700] ${dirty ? "" : "opacity-60"}`} disabled={!dirty}>
            <Check className="h-3.5 w-3.5" /> Guardar cambios
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-5 flex gap-1 border-b border-[--n-200]">
        {([
          { id: "cuentas"   as Tab, icon: CreditCard,    label: "Cuentas bancarias", count: "4" },
          { id: "checklist" as Tab, icon: ClipboardList, label: "Checklist OT",      count: "24 ítems" },
          { id: "parametros" as Tab, icon: Sliders,      label: "Parámetros del sistema" },
        ]).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            data-active={tab === t.id}
            className="flex items-center gap-2 border-b-2 border-transparent px-3 py-2.5 text-[13px] text-[--n-600] hover:text-[--n-900] data-[active=true]:border-[--p-cta] data-[active=true]:text-[--n-900] data-[active=true]:font-medium"
          >
            <t.icon className="h-4 w-4" />
            {t.label}
            {t.count && <span className="rounded-full bg-[--n-100] px-1.5 py-0.5 font-mono text-[10.5px] text-[--n-600]">{t.count}</span>}
          </button>
        ))}
      </div>

      {/* TAB 1 · Cuentas bancarias */}
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
                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium ${c.conIva ? "border-[--succ-700]/20 bg-[--succ-50] text-[--succ-700]" : "border-[--n-200] bg-[--n-50] text-[--n-700]"}`}>
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

      {/* TAB 2 · Checklist OT */}
      {tab === "checklist" && (
        <div>
          <div className="mb-4 flex items-start gap-3 rounded-lg border border-[--warn-700]/20 bg-[--warn-50] p-4">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[--warn-700]" />
            <div>
              <div className="text-[13px] font-medium text-[--warn-700]">Los cambios no afectan OTs ya creadas</div>
              <div className="mt-0.5 text-[12px] text-[--n-700]">
                Modificar el checklist <b>NO afecta OTs ya creadas</b>. Los cambios aplican solo a OTs nuevas a partir del momento de guardado.
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-[--n-200] bg-white">
            {/* Legenda */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 border-b border-[--n-150] bg-[--n-25] px-4 py-2.5 text-[11.5px] text-[--n-700]">
              {(Object.keys(CAT_META) as Cat[]).map((k) => (
                <span key={k} className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ background: CAT_META[k].hex }} />
                  {CAT_META[k].label}
                </span>
              ))}
            </div>
            {/* Header grid */}
            <div className="grid grid-cols-[24px_36px_1fr_220px_70px_40px] gap-3 border-b border-[--n-150] bg-[--n-50] px-4 py-2.5 font-mono text-[10.5px] uppercase tracking-wide text-[--n-500]">
              <span></span><span>#</span><span>Ítem del checklist</span><span>Categoría</span><span>Activo</span><span></span>
            </div>
            {/* Filas */}
            <ul>
              {CHECKLIST.map((it, i) => {
                const meta = CAT_META[it.cat];
                return (
                  <li
                    key={i}
                    className="grid grid-cols-[24px_36px_1fr_220px_70px_40px] items-center gap-3 border-b border-[--n-100] px-4 py-2 last:border-0 hover:bg-[--n-25]"
                  >
                    <span className="grid h-6 w-6 place-items-center text-[--n-400] cursor-grab hover:text-[--n-700]">
                      <GripVertical className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-mono text-[11px] text-[--n-500]">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[13px] font-medium text-[--n-900]">{it.name}</span>
                    <button
                      className="inline-flex w-fit items-center gap-1.5 rounded-md border px-2 py-1 text-[11.5px] font-medium hover:bg-[--n-50]"
                      style={{
                        color: meta.hex,
                        borderColor: `${meta.hex}33`,
                        background: `${meta.hex}0d`,
                      }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: meta.hex }} />
                      <span className="truncate">{meta.label}</span>
                      <ChevronDown className="ml-auto h-3 w-3 opacity-70" />
                    </button>
                    <Toggle on size="sm" />
                    <button className="grid h-7 w-7 place-items-center rounded-md text-[--dang-700] hover:bg-[--dang-50]">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center justify-between gap-4 border-t border-[--n-200] px-4 py-2.5">
              <span className="flex items-start gap-1.5 text-[12px] text-[--info-700]">
                <Info className="mt-0.5 h-3 w-3 shrink-0" />
                Los ítems están agrupados por categoría para facilitar la inspección física en orden lógico.
              </span>
              <button className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md border border-[--p-700]/30 bg-white px-3 text-[12px] font-medium text-[--p-700] hover:bg-[--p-cta]/5">
                <Plus className="h-3.5 w-3.5" /> Agregar ítem al checklist
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3 · Parámetros */}
      {tab === "parametros" && (
        <div>
          <div className="mb-4 flex items-start gap-3 rounded-lg border border-[--warn-700]/20 bg-[--warn-50] p-4">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[--warn-700]" />
            <div>
              <div className="text-[13px] font-medium text-[--warn-700]">Propagación en tiempo real</div>
              <div className="mt-0.5 text-[12px] text-[--n-700]">
                Los cambios en estos parámetros se aplican en <b>tiempo real</b> a todos los tabs abiertos. Cotizaciones, OTs
                y otros documentos creados después del cambio usarán los nuevos valores. Documentos existentes mantienen
                sus valores originales.
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-[--n-200] bg-white p-5">
            <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
              <Param label="IVA aplicable a cotizaciones y ventas" value="19" sfx="%" sub="Aplicable a cotizaciones nuevas. Editable por cotización en el wizard." />
              <Param label="Validez de cotización"                  value="15" sfx="días hábiles" sub="Días desde emisión hasta vencimiento de la cotización. Editable por cotización en el wizard." />
              <Param label="Alerta de OT sin recoger"               value="30" sfx="días" subNode={<>Tras este período, la OT aparece como <b>"Pendiente de recogida"</b> con dot pulsante warn.</>} />
              <Param label="Garantía default en ventas"             value="90" sfxNode={<>días <span className="text-[--n-300]">· 3 meses</span></>} sub="Configurable por producto en ficha de Garantías. Aplicable a ventas nuevas." />
              <Param label="Cadencia de conteo cíclico"             value="15" sfx="días" sub="Frecuencia de conteo cíclico programado en Conteo cíclico." />

              {/* Días hábiles */}
              <div>
                <div className="text-[12.5px] font-medium text-[--n-800]">Días hábiles por defecto</div>
                <div className="mt-2 flex items-center gap-1.5">
                  {(["L","M","M","J","V","S","D"] as const).map((d, i) => {
                    const on = i < 5;
                    return (
                      <span
                        key={i}
                        className={`grid h-8 w-8 place-items-center rounded-md border text-[12px] font-medium ${
                          on ? "border-[--p-cta]/40 bg-[--p-cta]/10 text-[--p-700]" : "border-[--n-200] bg-white text-[--n-400]"
                        }`}
                      >
                        {d}
                      </span>
                    );
                  })}
                </div>
                <p className="mt-2 text-[11.5px] leading-relaxed text-[--n-500]">
                  Usado para calcular vencimientos de cotizaciones y plazos de entrega.
                </p>
              </div>
            </div>
          </div>

          {/* Savebar */}
          <div className="mt-4 flex items-center justify-end gap-2 rounded-lg border border-[--n-200] bg-white px-4 py-2.5">
            <button className="inline-flex h-8 items-center rounded-md border border-[--n-200] bg-white px-3 text-[12.5px] text-[--n-700] hover:bg-[--n-50]">
              Descartar
            </button>
            <button className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[--p-cta] px-3 text-[12.5px] font-medium text-white hover:bg-[--p-700]">
              <Check className="h-3.5 w-3.5" /> Guardar cambios
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Param({
  label, value, sfx, sfxNode, sub, subNode,
}: {
  label: string;
  value: string;
  sfx?: string;
  sfxNode?: React.ReactNode;
  sub?: string;
  subNode?: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-[12.5px] font-medium text-[--n-800]">{label}</div>
      <div className="mt-2 flex h-10 items-center overflow-hidden rounded-md border border-[--n-200] bg-white focus-within:border-[--p-cta]">
        <input
          defaultValue={value}
          className="h-full w-20 border-r border-[--n-150] bg-transparent px-3 font-mono text-[14px] font-medium text-[--n-900] tabular-nums focus:outline-none"
        />
        <span className="px-3 text-[12.5px] text-[--n-600]">{sfxNode ?? sfx}</span>
      </div>
      <p className="mt-2 text-[11.5px] leading-relaxed text-[--n-500]">{subNode ?? sub}</p>
    </div>
  );
}
