import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeftCircle, ArrowRight, Truck, Package, Shield, Activity, Check,
  AlertTriangle, PlayCircle, Printer,
} from "lucide-react";
import {
  TR_1140_DETALLE, TRASPASOS_ROWS, SEDES_TR, RESPS, ESTADO_PILL,
} from "@/lib/traspasos-data";
import { formatCOP } from "@/lib/format";
import { WhChip, Avatar, Pill } from "./ops.traspasos.index";
import { ComingSoonDialog } from "@/components/shell/coming-soon";

export const Route = createFileRoute("/ops/traspasos/$id")({
  head: ({ params }) => ({ meta: [{ title: `${params.id} · Traspasos · CHV` }] }),
  component: TraspasoDetalle,
});

function TraspasoDetalle() {
  const { id } = Route.useParams();
  const row = TRASPASOS_ROWS.find((r) => r.id === id);
  const isCanonical = id === "TR-1140";
  const d = TR_1140_DETALLE;
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [discrOpen, setDiscrOpen] = useState(false);

  const o = SEDES_TR[d.origen];
  const dst = SEDES_TR[d.destino];
  const respO = RESPS[d.respOrigen];
  const respD = RESPS[d.respDestino];
  const estado = isCanonical ? d.estado : row?.estado ?? "transito";
  const pillConf = ESTADO_PILL[estado];

  return (
    <div className="flex h-full flex-col gap-4 px-7 pb-14 pt-5">
      <Link
        to="/ops/traspasos"
        className="inline-flex w-fit items-center gap-1.5 text-[12.5px] font-medium text-[--n-500] hover:text-[--n-700]"
      >
        <ArrowLeftCircle className="h-3.5 w-3.5" /> Volver a Traspasos
      </Link>

      {/* Detail head */}
      <div className="flex items-start gap-5 border-b border-[--n-100] pb-4">
        <div className="flex-1">
          <div className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[--n-400]">
            Traspaso entre sedes
          </div>
          <div className="mb-2 font-mono text-[28px] font-medium leading-[1.05] tracking-[-0.01em] text-[--n-950]">
            {isCanonical ? d.id : id}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[14px] text-[--n-500]">
            <span>Creado <b className="font-mono font-medium text-[--n-700]">{isCanonical ? d.fechaCreacion : row?.fecha}</b></span>
            <span>·</span>
            <span>Enviado <b className="font-mono font-medium text-[--n-700]">{isCanonical ? d.fechaEnvio : row?.fechaCorta}</b></span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2.5">
          <Pill kind={pillConf.pillCls} label={pillConf.label} />
          <button className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[--n-150] bg-[--n-0] px-3 text-[13px] text-[--n-700] hover:bg-[--n-50]">
            <Printer className="h-3.5 w-3.5" strokeWidth={2} /> Imprimir guía
          </button>
        </div>
      </div>

      {!isCanonical ? (
        <div className="grid place-items-center rounded-xl border border-dashed border-[--n-200] bg-[--n-0] p-12 text-center">
          <div className="max-w-md">
            <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-lg bg-[--info-50] text-[--info-700]">
              <Truck className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <h3 className="text-[15px] font-semibold text-[--n-950]">Detalle disponible solo para TR-1140</h3>
            <p className="mt-1.5 text-[13px] text-[--n-500]">
              Este es un placeholder. La maqueta canónica fija TR-1140 (devolución por garantía F12) como detalle de referencia.
            </p>
            <Link
              to="/ops/traspasos/$id"
              params={{ id: "TR-1140" }}
              className="mt-4 inline-flex h-9 items-center gap-1.5 rounded-lg bg-[--p-cta] px-3.5 text-[13px] font-medium text-white hover:bg-[--p-700]"
            >
              Ver TR-1140 canónico
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[540px_1fr]">
          {/* Left column */}
          <div className="flex flex-col gap-4">
            {/* Ruta */}
            <Block
              icon={<Truck className="h-3.5 w-3.5" strokeWidth={2} />}
              title="Ruta del traspaso"
            >
              <div className="grid grid-cols-[1fr_60px_1fr] items-stretch gap-2.5">
                <RouteBox
                  kind="origen" wh={o.label} resp={respO} time={d.fechaCreacion}
                />
                <div className="relative flex items-center justify-center">
                  <div
                    className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2"
                    style={{
                      background:
                        "repeating-linear-gradient(90deg,var(--warn-border) 0 6px,transparent 6px 12px)",
                    }}
                  />
                  <div className="relative z-[1] grid h-8 w-8 place-items-center rounded-full border-2 border-[--warn-border] bg-[--warn-50] text-[--warn-700]">
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                  </div>
                </div>
                <RouteBox
                  kind="destino" wh={dst.label} resp={respD} time={d.fechaEnvio}
                />
              </div>
            </Block>

            {/* Motivo */}
            <Block icon={<Shield className="h-3.5 w-3.5" strokeWidth={2} />} title="Motivo del traspaso">
              <div className="mb-2.5 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-[5px] border border-[--prog-border] bg-[--prog-50] px-2 py-[2px] text-[11px] font-semibold uppercase tracking-[0.04em] text-[--prog-700]">
                  <Shield className="h-2.5 w-2.5" strokeWidth={2} />
                  {d.motivoTag}
                </span>
              </div>
              <div className="text-[13px] leading-[1.55] text-[--n-700]">{d.motivo}</div>
            </Block>

            {/* Productos */}
            <Block icon={<Package className="h-3.5 w-3.5" strokeWidth={2} />} title={`Productos (${d.lineas.length})`}>
              <div className="flex flex-col">
                {d.lineas.map((l, i) => (
                  <div
                    key={l.sku}
                    className={`grid grid-cols-[1fr_auto_auto] items-center gap-3.5 py-2.5 ${i < d.lineas.length - 1 ? "border-b border-[--n-100]" : ""}`}
                  >
                    <div className="flex flex-col leading-[1.3]">
                      <span className="text-[13px] font-medium text-[--n-950]">{l.nombre}</span>
                      <span className="font-mono text-[11px] text-[--n-500]">{l.sku}</span>
                    </div>
                    <span className="font-mono text-[13px] font-medium text-[--n-950]">×{l.qty}</span>
                    <span className="text-right font-mono text-[12.5px] text-[--n-700]">{formatCOP(l.precio * l.qty)}</span>
                  </div>
                ))}
              </div>
            </Block>

            {/* Timeline */}
            <Block icon={<Activity className="h-3.5 w-3.5" strokeWidth={2} />} title="Línea de tiempo">
              <div className="flex flex-col pl-1.5">
                {d.timeline.map((t, i) => {
                  const dotCls = { neut: "bg-[--n-300]", info: "bg-[--info-500]", warn: "bg-[--warn-500]" }[t.dot];
                  return (
                    <div key={i} className="relative grid grid-cols-[14px_1fr_auto] items-start gap-3 py-2">
                      {i < d.timeline.length - 1 && (
                        <span className="absolute left-[6px] top-[18px] -bottom-1 w-px bg-[--n-150]" />
                      )}
                      <span
                        className={`mt-[3px] h-[13px] w-[13px] rounded-full border-[2.5px] border-[--n-0] ${dotCls}`}
                        style={{ boxShadow: "0 0 0 1px var(--n-150)" }}
                      />
                      <div>
                        <div className="text-[13px] font-medium text-[--n-950]">{t.act}</div>
                        <div className="mt-0.5 font-mono text-[11px] text-[--n-500]">{t.meta}</div>
                      </div>
                      <div className="text-right font-mono text-[11px] text-[--n-500]">{t.t}</div>
                    </div>
                  );
                })}
              </div>
            </Block>
          </div>

          {/* Right column – Picking sticky */}
          <div className="lg:sticky lg:top-5 lg:self-start">
            <div className="flex flex-col overflow-hidden rounded-[14px] border-2 border-[--p-cta] bg-[--n-0] shadow-[0_4px_12px_rgba(45,60,229,.12)]">
              <header
                className="flex items-center gap-3 border-b border-[--n-100] px-5 py-4"
                style={{ background: "linear-gradient(180deg,var(--prog-50),transparent)" }}
              >
                <div className="grid h-9 w-9 place-items-center rounded-[9px] bg-[--p-cta] text-white">
                  <Check className="h-4 w-4" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <div className="text-[14px] font-semibold text-[--n-950]">Recepción en {dst.label}</div>
                  <div className="mt-0.5 text-[12px] text-[--n-500]">
                    Marca los productos físicamente recibidos para confirmar el traspaso.
                  </div>
                </div>
                <div className="rounded-lg border border-[--prog-border] bg-[--n-0] px-2.5 py-1 font-mono text-[13px] font-medium text-[--prog-700]">
                  {d.recepcion.filter((i) => i.done).length} / {d.recepcion.length}
                </div>
              </header>

              <div className="flex flex-col px-4 py-1">
                {d.recepcion.map((it, i) => (
                  <div
                    key={it.sku}
                    className={`grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 ${i < d.recepcion.length - 1 ? "border-b border-[--n-100]" : ""} ${it.done ? "-mx-4 px-5 py-3.5" : "px-1 py-3.5"}`}
                    style={
                      it.done
                        ? { background: "linear-gradient(90deg,var(--succ-50),transparent 70%)" }
                        : undefined
                    }
                  >
                    <div
                      className={`grid h-6 w-6 place-items-center rounded-md border-2 ${it.done ? "border-[--succ-500] bg-[--succ-500] text-white" : "border-[--n-200] bg-[--n-0]"}`}
                    >
                      {it.done && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                    </div>
                    <div className="flex min-w-0 flex-col gap-[2px]">
                      <span className="font-mono text-[11px] font-medium text-[--n-500]">{it.sku}</span>
                      <span className="text-[13.5px] font-medium text-[--n-950]">{it.nombre}</span>
                    </div>
                    <div className="flex flex-col items-end gap-[2px]">
                      <span className="font-mono text-[9.5px] font-medium uppercase tracking-[0.08em] text-[--n-400]">Esperado</span>
                      <span className="font-mono text-[14px] font-medium text-[--n-950]">×{it.esperado}</span>
                    </div>
                    <div className="flex flex-col items-end gap-[2px]">
                      <span className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.08em] text-[--prog-700]">Recibido</span>
                      <div className="inline-flex h-9 items-center overflow-hidden rounded-md border border-[--n-150] bg-[--n-0]">
                        <button className="h-full w-[26px] bg-[--n-25] text-[15px] text-[--n-700]">−</button>
                        <input
                          defaultValue={it.recibido}
                          className="w-[42px] border-none bg-transparent text-center font-mono text-[13.5px] font-medium text-[--n-950] outline-none"
                        />
                        <button className="h-full w-[26px] bg-[--n-25] text-[15px] text-[--n-700]">+</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <footer className="flex flex-col gap-2.5 border-t border-[--n-100] bg-[--n-25] px-5 py-3.5">
                <div className="flex items-center justify-between text-[12.5px] text-[--n-500]">
                  <span>
                    <b className="font-mono font-medium text-[--n-950]">
                      {d.recepcion.filter((i) => i.done).length} de {d.recepcion.length}
                    </b>{" "}
                    recibidos
                  </span>
                  <span>{d.recepcion.filter((i) => !i.done).length} pendientes</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => setConfirmOpen(true)}
                    className="inline-flex h-11 items-center justify-center gap-1.5 rounded-[10px] bg-[--p-cta] text-[13.5px] font-medium text-white hover:bg-[--p-700]"
                  >
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> Confirmar recepción completa
                  </button>
                  <button
                    onClick={() => setDiscrOpen(true)}
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-[10px] border border-[--warn-border] bg-transparent text-[12.5px] font-medium text-[--warn-700] hover:bg-[--warn-50]"
                  >
                    <AlertTriangle className="h-3.5 w-3.5" strokeWidth={2} /> Reportar discrepancia
                  </button>
                  <Link
                    to="/picking/$id"
                    params={{ id: d.id }}
                    className="mt-1 inline-flex h-9 items-center justify-center gap-1.5 rounded-[10px] border border-[--n-150] bg-[--n-0] text-[12.5px] font-medium text-[--n-700] hover:bg-[--n-50]"
                  >
                    <PlayCircle className="h-3.5 w-3.5" strokeWidth={2} /> Abrir Picking dedicado
                  </Link>
                </div>
              </footer>
            </div>
          </div>
        </div>
      )}

      <ComingSoonDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Confirmar recepción completa"
        description="El cierre transaccional del traspaso (stock destino + auditoría) se activa en v1.1."
      />
      <ComingSoonDialog
        open={discrOpen}
        onClose={() => setDiscrOpen(false)}
        title="Reportar discrepancia"
        description="El flujo de discrepancia (motivo, fotos, escalado a admin) llega en v1.1."
      />
    </div>
  );
}

function Block({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[10px] border border-[--n-150] bg-[--n-0] p-4">
      <div className="mb-3.5 flex items-center gap-2.5">
        <span className="grid h-[26px] w-[26px] place-items-center rounded-md bg-[--n-50] text-[--n-700]">{icon}</span>
        <span className="flex-1 text-[13.5px] font-medium text-[--n-950]">{title}</span>
      </div>
      {children}
    </div>
  );
}

function RouteBox({
  kind, wh, resp, time,
}: {
  kind: "origen" | "destino";
  wh: string;
  resp: { iniciales: string; nombre: string; avClass: "av-cr" | "av-am" | "av-dp" | "av-sl" };
  time: string;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-[10px] border border-[--n-150] bg-[--n-25] p-3.5">
      <div className="font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-[--n-400]">
        {kind === "origen" ? "Origen" : "Destino"}
      </div>
      <div className="inline-flex items-center gap-1.5 font-mono text-[13px] font-medium text-[--n-950]">
        <Truck className={`h-3.5 w-3.5 ${kind === "origen" ? "text-[--succ-600]" : "text-[--info-600]"}`} strokeWidth={2} />
        {wh}
      </div>
      <div className="flex items-center gap-1.5 text-[12px] text-[--n-700]">
        <Avatar resp={resp.avClass} iniciales={resp.iniciales} />
        {resp.nombre}
      </div>
      <div className="font-mono text-[11px] text-[--n-500]">{time}</div>
    </div>
  );
}
