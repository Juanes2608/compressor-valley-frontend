import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeftCircle, Wrench, Search, ScanLine, Check, ChevronDown, Package } from "lucide-react";

export const Route = createFileRoute("/ops/herramientas/nueva")({
  head: () => ({ meta: [{ title: "Registrar préstamo · Herramientas · CHV" }] }),
  component: NuevoPrestamo,
});

function NuevoPrestamo() {
  const navigate = useNavigate();
  return (
    <div className="h-full overflow-auto bg-muted/30">
      <div className="mx-auto max-w-[640px] px-6 py-8">
        <Link to="/ops/herramientas" className="mb-3 inline-flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeftCircle className="size-3.5" /> Volver a Herramientas
        </Link>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          {/* Header */}
          <div className="mb-1.5 flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-[--p-50] text-[--p-700]">
              <Package className="size-5" />
            </div>
            <h2 className="m-0 flex-1 text-[16px] font-semibold leading-[1.3] text-foreground">
              Registrar préstamo de herramienta
            </h2>
          </div>
          <p className="mb-5 text-[13px] leading-[1.5] text-muted-foreground">
            Selecciona la herramienta disponible y el usuario que la recibe en préstamo.
          </p>

          {/* 1 · Buscar herramienta */}
          <Section step="1" label="Buscar herramienta">
            <div className="flex gap-2">
              <div className="flex flex-1 items-center gap-2 rounded-md border border-border bg-card px-3 py-2">
                <Search className="size-3.5 text-muted-foreground" />
                <input
                  defaultValue="manómetro"
                  className="flex-1 bg-transparent text-[13px] text-foreground outline-none"
                />
              </div>
              <button className="btn-pri inline-flex items-center gap-1.5">
                <ScanLine className="size-3.5" /> Escanear QR
              </button>
            </div>
            <p className="mt-2 text-[11.5px] text-muted-foreground">
              1 resultado para <b className="font-medium text-foreground/80">manómetro</b>
            </p>
            <div className="mt-2 flex items-center gap-3 rounded-md border-2 border-[--p-600] bg-[--p-50] p-2.5 dark:bg-[rgba(45,60,229,.14)]">
              <div className="hrm-tool-ico"><Wrench className="size-4" /></div>
              <div className="flex-1">
                <div className="text-[13px] font-medium text-foreground">Manómetro digital Bosch</div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">
                  <span className="font-mono font-medium text-foreground/80">HRM-1180-B</span> · BCH-MG-100 · WH-01 Estante A-08
                </div>
              </div>
              <span className="pill pill-success" style={{ height: 20, padding: "0 8px", fontSize: 11 }}>
                <span className="dot" /> Disponible
              </span>
            </div>
          </Section>

          {/* 2 · Usuario */}
          <Section step="2" label="Asignar usuario">
            <div className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <div className="hrm-av sm hrm-av-SL">SL</div>
                <div>
                  <div className="text-[13px] font-medium text-foreground">Sandra López</div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground">Bodeguero · WH-01</div>
                </div>
              </div>
              <ChevronDown className="size-3.5 text-muted-foreground" />
            </div>
            <p className="mt-1.5 text-[11px] text-muted-foreground">
              6 usuarios activos disponibles · cualquier rol puede recibir préstamo
            </p>
          </Section>

          {/* 3 · Fechas */}
          <Section step="3" label="Fechas">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="mb-1 block font-mono text-[11px] font-medium uppercase tracking-[0.05em] text-muted-foreground">Fecha de préstamo</span>
                <div className="rounded-md border border-border bg-card px-3 py-2 font-mono text-[13px] font-medium text-foreground">Hoy · 17 may 2026 · 09:15</div>
              </div>
              <div>
                <span className="mb-1 block font-mono text-[11px] font-medium uppercase tracking-[0.05em] text-muted-foreground">Devolución esperada</span>
                <div className="rounded-md border border-border bg-card px-3 py-2 font-mono text-[13px] font-medium text-foreground">18 may 2026</div>
              </div>
            </div>
            <p className="mt-1.5 text-[11px] text-muted-foreground">
              Duración default 1 día · ajusta según el uso planeado
            </p>
          </Section>

          {/* 4 · Notas */}
          <Section step="4" label="Notas · opcional">
            <div className="min-h-[60px] rounded-md border border-border bg-card px-3 py-2.5 text-[13px] italic text-muted-foreground">
              Propósito del préstamo, equipo o cliente asociado...
            </div>
          </Section>

          {/* Footer */}
          <div className="mt-5 flex justify-end gap-2 border-t border-border pt-4">
            <button onClick={() => navigate({ to: "/ops/herramientas" })} className="btn-out">Cancelar</button>
            <button onClick={() => navigate({ to: "/ops/herramientas" })} className="btn-pri inline-flex items-center gap-1.5">
              <Check className="size-3.5" /> Registrar préstamo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ step, label, children }: { step: string; label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <span className="mb-2 block font-mono text-[10.5px] font-semibold uppercase tracking-[0.05em] text-muted-foreground">
        {step} · {label}
      </span>
      {children}
    </div>
  );
}
