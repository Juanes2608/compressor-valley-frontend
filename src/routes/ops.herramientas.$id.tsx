import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeftCircle, Check, AlertOctagon, Wrench, Printer, Hammer,
  UserCheck, Activity, BarChart3, Settings, MessageCircle, Plus,
} from "lucide-react";
import {
  getTool, getLoan, statusToPill, HRM_HIST, HRM_TOOL_STATS,
} from "@/lib/herramientas-data";
import { formatCOP } from "@/lib/format";

export const Route = createFileRoute("/ops/herramientas/$id")({
  head: ({ params }) => ({ meta: [{ title: `${params.id} · Herramientas · CHV` }] }),
  component: HerramientaDetalle,
  notFoundComponent: () => (
    <div className="p-8 text-sm text-muted-foreground">Herramienta no encontrada.</div>
  ),
});

function HerramientaDetalle() {
  const { id } = Route.useParams();
  const tool = getTool(id);
  if (!tool) {
    return <div className="p-8 text-sm text-muted-foreground">Herramienta {id} no encontrada. <Link to="/ops/herramientas" className="underline">Volver</Link></div>;
  }
  const loan = getLoan(id);
  const pill = statusToPill(tool.status);
  const hist = HRM_HIST[id] ?? [];
  const stats = HRM_TOOL_STATS[id];

  const isLoaned = tool.status === "prestada";
  const isMaint = tool.status === "mantenimiento";
  const isOverdue = loan?.tone === "danger";

  return (
    <div className="h-full overflow-auto">
      <div className="mx-auto max-w-[1200px] px-7 py-6">
        <Link to="/ops/herramientas" className="mb-3 inline-flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeftCircle className="size-3.5" /> Volver a Herramientas
        </Link>

        {/* Header */}
        <div className="mb-5 flex flex-wrap items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="hrm-tool-ico xl"><Wrench className="size-9" /></div>
            <div>
              <div className="font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-muted-foreground/70">Herramienta</div>
              <h1 className="m-0 mb-1.5 text-[26px] font-medium tracking-[-0.01em] text-foreground">{tool.nombre}</h1>
              <p className="m-0 text-[14px] text-muted-foreground">
                {tool.marca} · <span className="font-mono font-medium text-foreground/80">{tool.modelo}</span> ·{" "}
                <span className="font-mono font-medium text-foreground/80">{tool.id}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className={`pill ${pill.cls}`} style={{ height: 28, padding: "0 12px", fontSize: 12.5 }}>
              <span className="dot" /> {pill.label}
            </span>
            {isOverdue && (
              <span className="text-[12px] font-medium text-[--dang-700] dark:text-[#FDA29B]">
                Atrasada · {loan?.vencidaHace} días vencida
              </span>
            )}
          </div>
        </div>

        {/* Action row */}
        <div className="mb-5 flex flex-wrap gap-2">
          {isLoaned && (
            <button className="btn-pri inline-flex items-center gap-1.5">
              <Check className="size-3.5" /> Marcar devuelta
            </button>
          )}
          <button className="btn-out inline-flex items-center gap-1.5 text-[--warn-700] border-[--warn-border]">
            <AlertOctagon className="size-3.5" /> Reportar daño
          </button>
          <button className="btn-out inline-flex items-center gap-1.5">
            <Wrench className="size-3.5" /> Enviar a mantenimiento
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] font-medium text-muted-foreground hover:bg-muted">
            <Printer className="size-3.5" /> Imprimir QR
          </button>
        </div>

        {/* Grid 2 cols */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
          {/* LEFT */}
          <div className="space-y-4">
            {/* Datos */}
            <Card title="Datos de la herramienta" Icon={Hammer} badge="Herramientas">
              <div className="grid grid-cols-2 gap-x-6 gap-y-3.5">
                <Field l="Marca" v={tool.marca} />
                <Field l="Modelo" v={tool.modelo} mono />
                {tool.serie && <Field l="Número de serie" v={tool.serie} mono />}
                {tool.anio && <Field l="Año adquisición" v={String(tool.anio)} mono />}
                {tool.costo && <Field l="Costo · solo Admin" v={formatCOP(tool.costo)} mono />}
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.05em] text-muted-foreground">Sede asignada</span>
                  <span className="pill pill-success" style={{ width: "fit-content", height: 20, padding: "0 8px", fontSize: 11 }}>
                    <span className="dot" /> {tool.sede} · Cali
                  </span>
                </div>
                <Field l="Ubicación física" v={tool.ubicacion} />
                {tool.ultCalibracion && <Field l="Última calibración" v={tool.ultCalibracion} mono />}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <div className="hrm-photo">IMG</div>
                <div className="hrm-photo">IMG</div>
                <div className="hrm-photo">IMG</div>
                <div className="hrm-photo add"><Plus className="size-5" /></div>
              </div>
            </Card>

            {/* Préstamo actual */}
            {loan && (
              <div className="hrm-card-warn rounded-xl p-5">
                <div className="mb-3.5 flex items-center gap-2">
                  <UserCheck className="size-4 text-[--warn-700]" />
                  <span className="text-[14px] font-semibold text-[--warn-700]">Préstamo actual</span>
                  {isOverdue && (
                    <span className="pill pill-danger pulse-dot ml-auto" style={{ height: 20, padding: "0 8px", fontSize: 11 }}>
                      <span className="dot" /> Atrasado · {loan.vencidaHace} días
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3.5 rounded-md border border-[--warn-border] bg-card p-3.5">
                  <div className={`hrm-av lg hrm-${loan.userAvatar}`}>{loan.userInitials}</div>
                  <div className="flex-1">
                    <div className="text-[14px] font-semibold text-foreground">{loan.userName}</div>
                    <div className="mt-0.5 text-[12px] text-muted-foreground">{loan.userRole} · Taller {tool.sede}</div>
                  </div>
                  <button className="btn-out inline-flex items-center gap-1.5 px-2.5 py-1 text-[12px] text-[--warn-700] border-[--warn-border]">
                    <MessageCircle className="size-3" /> Recordatorio WhatsApp
                  </button>
                </div>
                <div className="mt-3.5 grid grid-cols-3 gap-3.5">
                  <div className="hrm-loan-stat"><span className="l">Fecha préstamo</span><span className="v" style={{ fontSize: 13 }}>{loan.fechaPrestamo}</span></div>
                  <div className={`hrm-loan-stat ${isOverdue ? "dang" : ""}`}><span className="l">Devolución esperada</span><span className="v" style={{ fontSize: 13 }}>{loan.fechaEsperadaTexto}</span></div>
                  <div className={`hrm-loan-stat ${isOverdue ? "dang" : ""}`}><span className="l">Días en uso</span><span className="v">{loan.diasUsoTexto}</span></div>
                </div>
                {loan.notas && (
                  <div className="mt-3.5 rounded-md bg-muted/30 px-3 py-2.5 text-[12.5px] italic text-foreground/80">
                    <b className="not-italic mb-1 block font-mono text-[10.5px] font-normal uppercase tracking-[0.05em] text-muted-foreground">Notas del préstamo</b>
                    {loan.notas}
                  </div>
                )}
              </div>
            )}

            {isMaint && (
              <div className="hrm-card-maint rounded-xl p-5">
                <div className="text-[14px] font-semibold text-foreground">En mantenimiento técnico</div>
                <div className="mt-1 text-[12.5px] text-muted-foreground">Herramienta retirada del catálogo activo · sin préstamos disponibles hasta finalizar reparación.</div>
              </div>
            )}

            {/* Historial */}
            {hist.length > 0 && (
              <Card title="Historial de uso" Icon={Activity} extraRight="23 préstamos · últimos 12 meses">
                <div className="flex flex-col">
                  {hist.map((h, i) => {
                    const pillCls = h.tone === "warn" ? "pill-warn" : h.tone === "danger" ? "pill-danger" : "pill-success";
                    return (
                      <div key={i} className="flex items-center gap-3 border-b border-border/60 py-2.5 last:border-0">
                        <div className={`hrm-av md hrm-${h.userAvatar}`}>{h.userInitials}</div>
                        <div className="flex-1">
                          <div className="text-[13px] font-medium text-foreground">{h.userName}</div>
                          <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">{h.periodo}</div>
                          {h.sub && <div className="mt-0.5 text-[11px] italic text-muted-foreground">{h.sub}</div>}
                        </div>
                        <span className={`pill ${pillCls} ${h.pulse ? "pulse-dot" : ""}`} style={{ height: 20, padding: "0 8px", fontSize: 11 }}>
                          <span className="dot" /> {h.estadoLabel}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <a className="mt-3 inline-block text-[12px] font-medium text-[--p-700]">Ver historial completo · 23 préstamos</a>
              </Card>
            )}
          </div>

          {/* RIGHT */}
          <div className="space-y-4">
            {/* QR */}
            <div className="rounded-xl border border-border bg-card p-5 text-center">
              <div className="mb-3.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">QR de identificación</div>
              <div className="hrm-qr-canvas">
                <QrGlyph />
              </div>
              <div className="mb-3.5 font-mono text-[14px] font-semibold tracking-[0.04em] text-foreground">{tool.id}</div>
              <button className="btn-out inline-flex w-full items-center justify-center gap-1.5 py-2">
                <Printer className="size-3.5" /> Imprimir etiqueta
              </button>
            </div>

            {/* Stats */}
            {stats && (
              <Card title="Estadísticas de uso" Icon={BarChart3}>
                <div className="grid grid-cols-2 gap-3.5">
                  <Stat l="Total préstamos" v={String(stats.total)} mono />
                  <Stat l="Duración promedio" v={stats.promedio} mono />
                  <div className="col-span-2 flex flex-col gap-0.5">
                    <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.05em] text-muted-foreground">Usuario más frecuente</span>
                    <span className="text-[13px] font-medium text-foreground">{stats.usuarioTop} · <span className="font-mono">{stats.usuarioTopCount} préstamos</span></span>
                  </div>
                  <div className="col-span-2 flex flex-col gap-0.5">
                    <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.05em] text-muted-foreground">Estado dominante</span>
                    <span className="text-[13px] font-medium text-[--succ-700]">{stats.dominante} · <span className="font-mono">{stats.dominantePct}</span></span>
                  </div>
                  <Stat l="Reparaciones" v={`${stats.reparaciones} · ${stats.reparacionFecha}`} />
                  {tool.ultCalibracion && <Stat l="Última calibración" v={tool.ultCalibracion} mono />}
                </div>
              </Card>
            )}

            {/* Configuración */}
            <Card title="Configuración" Icon={Settings}>
              <Toggle label="Requiere autorización Admin para préstamo" sub="Útil para herramientas de alto valor o calibración crítica." />
              <Toggle label="Notificar vencimiento al usuario" sub="Mensaje automático por WhatsApp el día anterior." on />
              <Toggle label="Notificar al supervisor si atrasa más de 2 días" sub="Escalamiento automático al Admin del taller." on />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── helpers ─── */
function Card({
  title, Icon, badge, extraRight, children,
}: { title: string; Icon: typeof Hammer; badge?: string; extraRight?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-3.5 flex items-center gap-2">
        <Icon className="size-4 text-muted-foreground" />
        <span className="text-[14px] font-semibold text-foreground">{title}</span>
        {badge && (
          <span className="ml-auto pill cat-hrm" style={{ height: 22, padding: "0 9px", fontSize: 11 }}>
            <span className="sw" /> {badge}
          </span>
        )}
        {extraRight && <span className="ml-auto font-mono text-[11px] text-muted-foreground">{extraRight}</span>}
      </div>
      {children}
    </div>
  );
}
function Field({ l, v, mono }: { l: string; v: string; mono?: boolean }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.05em] text-muted-foreground">{l}</span>
      <span className={`text-[13px] font-medium text-foreground ${mono ? "font-mono" : ""}`}>{v}</span>
    </div>
  );
}
function Stat({ l, v, mono }: { l: string; v: string; mono?: boolean }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.05em] text-muted-foreground">{l}</span>
      <span className={`text-[13px] font-medium text-foreground ${mono ? "font-mono" : ""}`}>{v}</span>
    </div>
  );
}
function Toggle({ label, sub, on }: { label: string; sub: string; on?: boolean }) {
  return (
    <div className="flex items-start gap-3 border-b border-border/60 py-2.5 last:border-0">
      <div className="flex-1">
        <div className="text-[13px] font-medium text-foreground">{label}</div>
        <div className="mt-0.5 text-[11.5px] leading-[1.45] text-muted-foreground">{sub}</div>
      </div>
      <div className={`hrm-toggle ${on ? "on" : ""}`} />
    </div>
  );
}

function QrGlyph() {
  return (
    <svg viewBox="0 0 21 21" className="size-full" shapeRendering="crispEdges">
      <rect width="21" height="21" fill="#fff" />
      <g fill="#000">
        <rect x="0" y="0" width="7" height="1" /><rect x="0" y="6" width="7" height="1" /><rect x="0" y="0" width="1" height="7" /><rect x="6" y="0" width="1" height="7" /><rect x="2" y="2" width="3" height="3" />
        <rect x="14" y="0" width="7" height="1" /><rect x="14" y="6" width="7" height="1" /><rect x="14" y="0" width="1" height="7" /><rect x="20" y="0" width="1" height="7" /><rect x="16" y="2" width="3" height="3" />
        <rect x="0" y="14" width="7" height="1" /><rect x="0" y="20" width="7" height="1" /><rect x="0" y="14" width="1" height="7" /><rect x="6" y="14" width="1" height="7" /><rect x="2" y="16" width="3" height="3" />
        <rect x="8" y="6" width="1" height="1" /><rect x="10" y="6" width="1" height="1" /><rect x="12" y="6" width="1" height="1" />
        <rect x="6" y="8" width="1" height="1" /><rect x="6" y="10" width="1" height="1" /><rect x="6" y="12" width="1" height="1" />
        <rect x="8" y="0" width="1" height="1" /><rect x="10" y="0" width="2" height="1" /><rect x="13" y="0" width="1" height="1" />
        <rect x="9" y="2" width="1" height="1" /><rect x="11" y="2" width="1" height="1" /><rect x="13" y="2" width="1" height="1" />
        <rect x="8" y="3" width="1" height="1" /><rect x="10" y="3" width="1" height="1" /><rect x="12" y="3" width="1" height="1" />
        <rect x="9" y="4" width="1" height="1" /><rect x="11" y="4" width="1" height="1" />
        <rect x="8" y="5" width="1" height="1" /><rect x="10" y="5" width="1" height="1" /><rect x="12" y="5" width="2" height="1" />
        <rect x="0" y="8" width="1" height="1" /><rect x="2" y="8" width="2" height="1" /><rect x="8" y="8" width="1" height="1" /><rect x="10" y="8" width="2" height="1" /><rect x="14" y="8" width="1" height="1" /><rect x="16" y="8" width="1" height="1" /><rect x="18" y="8" width="1" height="1" /><rect x="20" y="8" width="1" height="1" />
        <rect x="1" y="9" width="1" height="1" /><rect x="4" y="9" width="1" height="1" /><rect x="9" y="9" width="1" height="1" /><rect x="11" y="9" width="2" height="1" /><rect x="15" y="9" width="2" height="1" /><rect x="18" y="9" width="1" height="1" />
        <rect x="0" y="10" width="1" height="1" /><rect x="3" y="10" width="1" height="1" /><rect x="5" y="10" width="1" height="1" /><rect x="8" y="10" width="2" height="1" /><rect x="12" y="10" width="1" height="1" /><rect x="14" y="10" width="1" height="1" /><rect x="17" y="10" width="1" height="1" /><rect x="20" y="10" width="1" height="1" />
        <rect x="2" y="11" width="1" height="1" /><rect x="4" y="11" width="1" height="1" /><rect x="9" y="11" width="1" height="1" /><rect x="13" y="11" width="2" height="1" /><rect x="16" y="11" width="1" height="1" /><rect x="19" y="11" width="1" height="1" />
        <rect x="0" y="12" width="1" height="1" /><rect x="3" y="12" width="2" height="1" /><rect x="8" y="12" width="1" height="1" /><rect x="11" y="12" width="1" height="1" /><rect x="14" y="12" width="1" height="1" /><rect x="17" y="12" width="2" height="1" /><rect x="20" y="12" width="1" height="1" />
        <rect x="8" y="14" width="1" height="1" /><rect x="10" y="14" width="2" height="1" /><rect x="14" y="14" width="1" height="1" /><rect x="16" y="14" width="1" height="1" /><rect x="18" y="14" width="1" height="1" /><rect x="20" y="14" width="1" height="1" />
        <rect x="9" y="15" width="1" height="1" /><rect x="11" y="15" width="1" height="1" /><rect x="13" y="15" width="2" height="1" /><rect x="17" y="15" width="1" height="1" /><rect x="19" y="15" width="1" height="1" />
        <rect x="8" y="16" width="2" height="1" /><rect x="12" y="16" width="1" height="1" /><rect x="15" y="16" width="1" height="1" /><rect x="17" y="16" width="1" height="1" /><rect x="20" y="16" width="1" height="1" />
        <rect x="9" y="17" width="2" height="1" /><rect x="13" y="17" width="1" height="1" /><rect x="16" y="17" width="2" height="1" /><rect x="19" y="17" width="1" height="1" />
        <rect x="8" y="18" width="1" height="1" /><rect x="11" y="18" width="2" height="1" /><rect x="14" y="18" width="2" height="1" /><rect x="18" y="18" width="1" height="1" /><rect x="20" y="18" width="1" height="1" />
        <rect x="9" y="19" width="1" height="1" /><rect x="11" y="19" width="1" height="1" /><rect x="13" y="19" width="1" height="1" /><rect x="15" y="19" width="2" height="1" /><rect x="18" y="19" width="1" height="1" />
        <rect x="8" y="20" width="1" height="1" /><rect x="10" y="20" width="2" height="1" /><rect x="14" y="20" width="1" height="1" /><rect x="16" y="20" width="1" height="1" /><rect x="19" y="20" width="2" height="1" />
      </g>
    </svg>
  );
}
