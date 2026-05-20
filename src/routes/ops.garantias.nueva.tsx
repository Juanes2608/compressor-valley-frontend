import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeftCircle, ArrowRight, Check, Paperclip, ShieldCheck, X } from "lucide-react";

export const Route = createFileRoute("/ops/garantias/nueva")({
  head: () => ({ meta: [{ title: "Nueva reclamación · Garantías · CHV" }] }),
  component: NuevaGarantia,
});

const STEPS = [
  { num: 1, label: "Venta origen" },
  { num: 2, label: "Producto y motivo" },
  { num: 3, label: "Tipo de resolución" },
  { num: 4, label: "Confirmar" },
];

function NuevaGarantia() {
  const [tipo, setTipo] = useState<"venta" | "compra">("venta");

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border bg-card px-7 py-5">
        <Link to="/ops/garantias" className="mb-2 inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground">
          <ArrowLeftCircle className="size-3.5" /> Volver a Garantías
        </Link>
        <h1 className="text-[22px] font-semibold tracking-[-0.01em] text-foreground">
          Nueva reclamación · Garantía de {tipo === "venta" ? "venta" : "compra"}
        </h1>
        <p className="mt-1 text-[13px] text-muted-foreground">
          {tipo === "venta"
            ? "Cliente reclama un producto vendido por CHV. Cubre defectos de fábrica dentro del período de garantía F13."
            : "CHV reclama defecto a proveedor original. Aplica políticas pactadas con el proveedor."}
        </p>

        <div className="mt-4 inline-flex rounded-md border border-border bg-muted/40 p-1">
          {(["venta", "compra"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTipo(t)}
              className={[
                "rounded px-4 py-1.5 text-[12.5px] font-medium transition-colors",
                tipo === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              Garantía de {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-background px-7 py-6">
        {/* Stepper */}
        <div className="mb-6 flex items-center gap-2 rounded-[10px] border border-border bg-card px-5 py-4">
          {STEPS.map((s, i) => {
            const done = s.num < 2;
            const active = s.num === 2;
            return (
              <div key={s.num} className="flex flex-1 items-center gap-2">
                <div className={[
                  "flex size-7 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold",
                  done ? "bg-[--succ-500] text-white" :
                  active ? "bg-[--p-600] text-white" :
                  "border border-border bg-card text-muted-foreground",
                ].join(" ")}>
                  {done ? <Check className="size-3.5" strokeWidth={3} /> : s.num}
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Paso {s.num}</span>
                  <span className={[
                    "text-[12.5px] font-medium",
                    active ? "text-foreground" : done ? "text-foreground/85" : "text-muted-foreground",
                  ].join(" ")}>{s.label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={["mx-2 h-px flex-1", done ? "bg-[--succ-400]" : "bg-border"].join(" ")} />
                )}
              </div>
            );
          })}
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
          {/* Form card */}
          <div className="rounded-[10px] border border-border bg-card p-6">
            <p className="font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">Paso 2 de 4</p>
            <h2 className="mt-1 text-[18px] font-semibold text-foreground">Producto y motivo de la reclamación</h2>

            {/* Completed step */}
            <div className="mt-4 flex items-center gap-3 rounded-md border border-[--succ-200] bg-[--succ-50] px-4 py-3 dark:border-[rgba(18,183,106,.35)] dark:bg-[rgba(18,183,106,.1)]">
              <Check className="size-4 text-[--succ-700] dark:text-[#6CE9A6]" strokeWidth={3} />
              <div className="flex min-w-0 flex-col">
                <span className="font-mono text-[10.5px] uppercase tracking-wider text-[--succ-700] dark:text-[#6CE9A6]">
                  Venta seleccionada
                </span>
                <span className="text-[13px] text-foreground/85">
                  <b className="font-mono">V-2843</b>
                  <span className="mx-1.5 text-border">·</span>Industrial XYZ S.A.S.
                  <span className="mx-1.5 text-border">·</span><span className="font-mono">14 abr 2026</span>
                  <span className="mx-1.5 text-border">·</span><span className="font-mono">$ 1.450.000</span>
                </span>
              </div>
              <button className="ml-auto text-[12px] font-medium text-[--succ-700] hover:underline dark:text-[#6CE9A6]">Editar</button>
            </div>

            {/* Form grid */}
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <FormL>Producto en garantía</FormL>
                <div className="flex items-center justify-between rounded-md border border-border bg-background px-3 py-2.5">
                  <div className="flex flex-col leading-tight">
                    <span className="font-mono text-[11.5px] text-muted-foreground">CMP-2210-A · 3 und vendidas</span>
                    <span className="text-[13px] font-medium text-foreground">Filtro de aire Atlas Copco GA-22</span>
                  </div>
                  <span className="text-muted-foreground">▾</span>
                </div>
                <p className="mt-1.5 text-[11.5px] text-muted-foreground">
                  Mostrando 3 productos de V-2843. Filtro de aire seleccionado por defecto (es el más reportado de la venta).
                </p>
              </div>

              <div>
                <FormL>Serie (si aplica)</FormL>
                <Input value="Serie 8472" mono />
              </div>
              <div>
                <FormL>Cantidad reclamada</FormL>
                <div className="inline-flex h-10 items-stretch overflow-hidden rounded-md border border-border bg-background">
                  <button className="px-3 text-[14px] text-muted-foreground hover:bg-muted">−</button>
                  <input readOnly value="1" className="w-12 border-x border-border bg-transparent text-center font-mono text-[13px] text-foreground" />
                  <button className="px-3 text-[14px] text-muted-foreground hover:bg-muted">+</button>
                </div>
              </div>

              <div>
                <FormL>Fecha de detección del defecto</FormL>
                <Input value="14 may 2026" mono />
              </div>
              <div>
                <FormL>Origen del reporte</FormL>
                <div className="flex items-center justify-between rounded-md border border-border bg-background px-3 py-2.5 text-[13px] text-foreground">
                  WhatsApp <span className="text-muted-foreground">▾</span>
                </div>
              </div>

              <div className="col-span-2">
                <FormL>Motivo de la reclamación</FormL>
                <div className="min-h-[100px] rounded-md border border-border bg-background p-3 text-[13px] leading-relaxed text-foreground/85">
                  Filtro instalado hace 30 días presenta pérdida de presión constante. He revisado las conexiones y están bien apretadas, el problema parece ser del filtro mismo. Necesito reparación o reemplazo urgente porque el compresor opera 12 horas al día.
                </div>
              </div>

              <div className="col-span-2">
                <FormL>Evidencia adjunta</FormL>
                <div className="rounded-md border border-dashed border-border bg-muted/30 px-4 py-5 text-center text-[12.5px] text-muted-foreground">
                  Arrastra fotos del defecto aquí, o <b className="text-foreground">haz clic para subir</b>. Formatos: JPG, PNG, PDF · máx 10 MB por archivo.
                </div>
                {["WhatsApp Image 2026-05-16 at 09.15.jpg", "WhatsApp Image 2026-05-16 at 09.16.jpg", "WhatsApp Image 2026-05-16 at 09.17.jpg"].map((nm, i) => (
                  <div key={nm} className="mt-1.5 flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-[12.5px]">
                    <Paperclip className="size-3.5 text-muted-foreground" />
                    <span className="flex-1 truncate text-foreground/85">{nm}</span>
                    <span className="font-mono text-[11px] text-muted-foreground">{["842 KB", "1.2 MB", "980 KB"][i]}</span>
                    <button className="text-muted-foreground hover:text-foreground"><X className="size-3.5" /></button>
                  </div>
                ))}
              </div>

              <div className="col-span-2 rounded-md border border-[--p-200] bg-[--p-50]/60 p-4 dark:border-[rgba(75,91,245,.4)] dark:bg-[rgba(45,60,229,.1)]">
                <div className="mb-2 font-mono text-[10.5px] uppercase tracking-wider text-[--p-700] dark:text-[#C2CCFF]">
                  Política aplicable para este producto
                </div>
                <ul className="flex flex-col gap-1.5 text-[12px] leading-relaxed text-foreground/85">
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-[--p-600] dark:text-[#C2CCFF]" />
                    <span>Garantía F13 estándar · 90 días desde venta · Vence <b className="font-mono">30 jun 2026</b> (46 días restantes).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-[--p-600] dark:text-[#C2CCFF]" />
                    <span>Cubre defectos de fábrica reproducibles y fallas prematuras.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
              <button className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground hover:text-foreground">
                <ArrowLeftCircle className="size-3.5" /> Paso anterior
              </button>
              <button className="btn-pri inline-flex items-center gap-1.5">
                Continuar al paso 3 <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>

          {/* Sticky cart */}
          <aside className="self-start">
            <div className="sticky top-4 rounded-[10px] border border-border bg-card p-5">
              <div className="mb-3 font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">
                Resumen de la reclamación
              </div>
              <CartRow l="Venta origen" v="V-2843" mono />
              <CartRow l="Cliente" v="Industrial XYZ" />
              <CartRow l="Producto" v="Filtro aire GA-22" />
              <CartRow l="SKU" v="CMP-2210-A" mono />
              <CartRow l="Cantidad" v="1 und" mono />
              <CartRow l="Serie" v="8472" mono />
              <CartRow l="Fecha defecto" v="14 may 2026" mono />
              <CartRow l="Vence garantía" v="30 jun 2026" mono tone="ok" />
              <CartRow l="Días restantes" v="46 días" mono tone="ok" />
              <button className="btn-pri mt-4 inline-flex w-full items-center justify-center gap-1.5">
                Continuar al paso 3 <ArrowRight className="size-3.5" />
              </button>
              <button className="mt-1.5 inline-flex w-full items-center justify-center rounded-md py-2 text-[12.5px] font-medium text-muted-foreground hover:bg-muted">
                Guardar borrador
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function FormL({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1 block font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">{children}</label>
  );
}

function Input({ value, mono }: { value: string; mono?: boolean }) {
  return (
    <div className={[
      "flex h-10 items-center rounded-md border border-border bg-background px-3 text-[13px] text-foreground",
      mono ? "font-mono" : "",
    ].join(" ")}>{value}</div>
  );
}

function CartRow({ l, v, mono, tone }: { l: string; v: string; mono?: boolean; tone?: "ok" }) {
  return (
    <div className="flex items-baseline justify-between border-b border-border/60 py-2 text-[12.5px] last:border-b-0">
      <span className="text-muted-foreground">{l}</span>
      <span className={[
        mono ? "font-mono tabular-nums" : "",
        tone === "ok" ? "text-[--succ-700] dark:text-[#6CE9A6]" : "text-foreground/90",
      ].join(" ")}>{v}</span>
    </div>
  );
}
