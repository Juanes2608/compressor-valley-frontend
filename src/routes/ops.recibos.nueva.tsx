import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeftCircle, Check, Info, Lock, Search, Sparkles, Zap } from "lucide-react";
import { COTIZACIONES_APROBADAS } from "@/lib/recibos-data";
import { formatCOP } from "@/lib/format";

export const Route = createFileRoute("/ops/recibos/nueva")({
  head: () => ({ meta: [{ title: "Nuevo recibo · CHV" }] }),
  component: NuevoRecibo,
});

type Mode = "cot" | "manual";

function NuevoRecibo() {
  const [mode, setMode] = useState<Mode>("cot");

  return (
    <div className="px-6 pb-16 pt-5 lg:px-8">
      <Link to="/ops/recibos" className="back-btn">
        <ArrowLeftCircle className="size-3.5" /> Volver a Recibos
      </Link>

      <div className="mt-4 flex flex-col items-start gap-3 border-b border-border pb-4 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <div className="ph-eyebrow">Nuevo</div>
          <h1 className="m-0 text-[22px] font-semibold tracking-[-0.01em] text-foreground">
            {mode === "cot" ? "Recibo desde cotización" : "Recibo manual"}
          </h1>
          <p className="mt-1.5 text-[13px] text-muted-foreground">
            {mode === "cot"
              ? "Selecciona una cotización aprobada para pre-cargar cliente, monto y vinculaciones."
              : "Para anticipos, pagos sin venta asociada o ajustes contables."}
          </p>
        </div>
        <div className="subtabs">
          <button className={`stab ${mode === "cot" ? "active" : ""}`} onClick={() => setMode("cot")}>Desde cotización</button>
          <button className={`stab ${mode === "manual" ? "active" : ""}`} onClick={() => setMode("manual")}>Manual</button>
        </div>
      </div>

      <div className="mt-4 grid items-start gap-4 lg:grid-cols-[1fr_360px]">
        {mode === "cot" ? <FormDesdeCotizacion /> : <FormManual />}
        <Resumen mode={mode} />
      </div>
    </div>
  );
}

function FormDesdeCotizacion() {
  const [selected, setSelected] = useState("Cot-1042");

  return (
    <div className="flex flex-col gap-4">
      <div className="iblock">
        <div className="ib-head">
          <div className="ib-ico"><Search className="size-3.5" /></div>
          <div className="ib-title">Cotización aprobada</div>
        </div>
        <div className="mb-3 flex h-10 items-center gap-2.5 rounded-lg border border-border bg-background px-3.5">
          <Search className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
          <input
            defaultValue="Cot-1042"
            placeholder="Buscar por número o cliente…"
            className="min-w-0 flex-1 border-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
          />
        </div>
        <div className="flex flex-col gap-2">
          {COTIZACIONES_APROBADAS.map((c) => (
            <div
              key={c.num}
              onClick={() => setSelected(c.num)}
              className={`cot-result ${selected === c.num ? "sel" : ""}`}
            >
              <span className="cnum">{c.num}</span>
              <div className="min-w-0 flex-1">
                <div className="ccli">{c.cliente}</div>
                <div className="cmeta">{c.fecha}</div>
              </div>
              <div className="ctot">{formatCOP(c.total)}</div>
              {selected === c.num
                ? <span className="csel-tag"><Check className="size-3" strokeWidth={3} />Seleccionada</span>
                : <button className="rounded-md border border-[--p-200] bg-transparent px-2.5 py-1 font-mono text-[11px] font-medium text-[--p-700] hover:bg-[--p-50]">Seleccionar</button>}
            </div>
          ))}
        </div>
      </div>

      {selected === "Cot-1042" && (
        <div className="banner-info">
          <Info className="mt-0.5 size-3.5 shrink-0" />
          <div className="body">
            <b>OT-2845</b> tiene <b>1 abono previo</b> registrado por <b>$ 500.000</b>. Este recibo consolida los abonos previos.{" "}
            <strong className="text-[--info-700] dark:text-[#84CAFF]">Saldo después del recibo: $ 0.</strong>
          </div>
        </div>
      )}

      <div className="iblock">
        <div className="ib-head">
          <div className="ib-ico"><Sparkles className="size-3.5" /></div>
          <div className="ib-title">Datos pre-cargados de {selected}</div>
        </div>
        <div className="flex flex-col gap-3">
          <Field label="Cliente" badge="lock">
            <input className="finput sans locked" readOnly value="Industrial XYZ S.A.S." />
          </Field>
          <div className="field-row">
            <Field label="Monto" badge="lock">
              <div className="fprefix">
                <span className="pre">$</span>
                <input readOnly value="1.840.000" />
              </div>
            </Field>
            <Field label="Consecutivo" badge="auto">
              <input className="finput locked" readOnly value="Rec-1284" />
            </Field>
          </div>
          <Field label="Concepto" req>
            <textarea
              className="ftextarea"
              defaultValue='Pago Cot-1042 · 4 productos (Filtro GA-22, Aceite ISO, Manguera 1/2", Mantenimiento mayor)'
            />
          </Field>
          <div className="field-row">
            <Field label="Método de pago" req>
              <select className="fselect" defaultValue="Transferencia">
                <option>Transferencia</option>
                <option>Efectivo</option>
                <option>Tarjeta</option>
                <option>Mixto</option>
              </select>
            </Field>
            <Field label="Referencia">
              <input className="finput" placeholder="Voucher / Transf." defaultValue="9384712" />
            </Field>
          </div>
          <Field label="Vincular a OT" badge="sugg">
            <select className="fselect">
              <option>OT-2845 · Mantenimiento Atlas Copco GA-22</option>
              <option>Sin vincular</option>
            </select>
          </Field>
        </div>
      </div>
    </div>
  );
}

function FormManual() {
  return (
    <div className="flex flex-col gap-4">
      <div className="banner-info" style={{ background: "var(--n-50)", borderColor: "var(--n-150)", color: "var(--n-700)" }}>
        <Info className="mt-0.5 size-3.5 shrink-0 text-[var(--n-500)]" />
        <div className="body" style={{ color: "var(--n-700)" }}>
          Recibo manual: para anticipos, pagos sin venta asociada o ajustes contables. Si el pago corresponde a una cotización o venta existente, usa <b className="text-[--p-700]">Desde cotización</b> para reciclar datos.
        </div>
      </div>

      <div className="iblock">
        <div className="ib-head">
          <div className="ib-ico"><Sparkles className="size-3.5" /></div>
          <div className="ib-title">Datos del recibo</div>
        </div>
        <div className="flex flex-col gap-3">
          <Field label="Consecutivo" badge="auto">
            <input className="finput locked" readOnly value="Rec-1285" />
          </Field>
          <Field label="Cliente" req>
            <input className="finput sans" placeholder="Razón social o nombre…" />
          </Field>
          <div className="field-row">
            <Field label="Teléfono" req>
              <input className="finput" placeholder="+57 ___ ___ ____" />
            </Field>
            <Field label="NIT">
              <input className="finput" placeholder="900.123.456-7" />
            </Field>
          </div>
          <Field label="Concepto" req>
            <textarea className="ftextarea" placeholder="Describe el concepto del pago…" />
          </Field>
          <Field label="Monto" req>
            <div className="fprefix">
              <span className="pre">$</span>
              <input placeholder="0" />
            </div>
          </Field>
          <div className="field-row">
            <Field label="Método de pago" req>
              <select className="fselect" defaultValue="">
                <option value="" disabled>Selecciona…</option>
                <option>Efectivo</option>
                <option>Transferencia</option>
                <option>Tarjeta</option>
                <option>Mixto</option>
              </select>
            </Field>
            <Field label="Referencia">
              <input className="finput" placeholder="Voucher / Transf." />
            </Field>
          </div>
          <div className="divider-eb">Vinculaciones opcionales</div>
          <Field label="Vincular a OT">
            <select className="fselect">
              <option>Sin vincular</option>
              <option>OT-2845 · Industrial XYZ</option>
              <option>OT-2843 · Petrocali</option>
            </select>
          </Field>
          <Field label="Vincular a cotización">
            <select className="fselect">
              <option>Sin vincular</option>
              <option>Cot-1042 · Industrial XYZ</option>
            </select>
          </Field>
        </div>
      </div>
    </div>
  );
}

function Field({ label, req, badge, children }: { label: string; req?: boolean; badge?: "lock" | "auto" | "sugg"; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flbl">
        {label}
        {req && <span className="req">*</span>}
        {badge === "lock" && <span className="lock"><Lock className="size-2.5" />Bloqueado</span>}
        {badge === "auto" && <span className="auto"><Zap className="size-2.5" />Auto BD</span>}
        {badge === "sugg" && <span className="sugg"><Sparkles className="size-2.5" />Sugerida automáticamente</span>}
      </label>
      {children}
    </div>
  );
}

function Resumen({ mode }: { mode: Mode }) {
  return (
    <aside className="cart">
      <div className="cart-eyebrow">Resumen · Nuevo recibo</div>
      <div className="cart-line">
        <span>Tipo</span>
        <span className="v">{mode === "cot" ? "Por cotización" : "Manual"}</span>
      </div>
      <div className="cart-line">
        <span>Consecutivo</span>
        <span className="v">{mode === "cot" ? "Rec-1284" : "Rec-1285"}</span>
      </div>
      <div className="cart-line">
        <span>Cliente</span>
        <span className="v">{mode === "cot" ? "Industrial XYZ" : "—"}</span>
      </div>
      <div className="cart-line">
        <span>Vinculaciones</span>
        <span className="v">{mode === "cot" ? "Cot · OT" : "Opcional"}</span>
      </div>
      <div className="cart-line tot">
        <span>Total recibo</span>
        <span className="v">{mode === "cot" ? "$ 1.840.000" : "$ 0"}</span>
      </div>
      <div className="mt-2 flex flex-col gap-2">
        <button className="btn-pri inline-flex items-center justify-center gap-1.5">
          <Check className="size-3.5" /> Generar recibo
        </button>
        <Link to="/ops/recibos" className="btn-out inline-flex items-center justify-center gap-1.5">
          Cancelar
        </Link>
      </div>
    </aside>
  );
}
