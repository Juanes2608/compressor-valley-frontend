import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeftCircle, ShieldCheck, Wallet, ClipboardCheck, FileText, Activity,
  Pencil, Printer, XCircle, Plus, Info, Check, Phone, Mail, Hash,
} from "lucide-react";
import { getOTDetail } from "@/lib/ot-data";
import { formatCOP } from "@/lib/format";

export const Route = createFileRoute("/ops/ordenes-trabajo/$id")({
  head: ({ params }) => ({ meta: [{ title: `${params.id} · OT · CHV` }] }),
  component: DetalleOT,
});

function DetalleOT() {
  const { id } = Route.useParams();
  const d = getOTDetail(id);
  const isCycle = d.num === "OT-2845";

  return (
    <div className="px-6 pb-16 pt-5 lg:px-8">
      <Link to="/ops/ordenes-trabajo" className="back-btn">
        <ArrowLeftCircle className="size-3.5" /> Volver a Órdenes de Trabajo
      </Link>

      {isCycle && (
        <div className="banner-info mt-4">
          <Info className="mt-0.5 size-3.5 shrink-0" />
          <div className="body">
            Esta OT cierra el ciclo industrial XYZ: <Link to="/ops/cotizaciones/$id" params={{ id: "Cot-1042" }} className="font-medium underline underline-offset-2">Cot-1042</Link> →{" "}
            <Link to="/ops/ventas/$id" params={{ id: "V-2847" }} className="font-medium underline underline-offset-2">V-2847</Link> →{" "}
            <Link to="/ops/recibos/$id" params={{ id: "Rec-1284" }} className="font-medium underline underline-offset-2">Rec-1284</Link> →{" "}
            <b>{d.num}</b>.
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mt-4 flex flex-col items-start gap-4 border-b border-border pb-4 md:flex-row md:items-start md:gap-6">
        <div className="min-w-0 flex-1">
          <div className="ph-eyebrow">Orden de trabajo</div>
          <div className="ph-num">{d.num}</div>
          <div className="ph-client">{d.cliente.razon}</div>
          <div className="ph-sub">
            {d.equipo.nombre} · Serie <span className="font-mono font-medium text-foreground">{d.equipo.serie}</span>
          </div>
        </div>
        <div className="flex flex-col items-start gap-3 md:items-end">
          <span className={`s-pill s-${d.estadoLabel === "En proceso" ? "proceso" :
            d.estadoLabel === "Abierta" ? "abierta" :
            d.estadoLabel === "Esperando rep." ? "esperando" :
            d.estadoLabel === "Completada" ? "completada" :
            d.estadoLabel === "Pend. recogida" ? "recogida" : "entregada"
          }`}>
            <span className="dot" />{d.estadoLabel}
          </span>
          <div className="saldo-box md:items-end">
            <span className="lbl">Saldo</span>
            <span className="val">{d.saldo === 0 ? "$0" : formatCOP(d.saldo)}</span>
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="action-bar mt-4">
        <button className="btn-out inline-flex items-center gap-1.5">
          <Pencil className="size-3.5" /> Editar OT
        </button>
        <button className="btn-out inline-flex items-center gap-1.5">
          <Printer className="size-3.5" /> Imprimir OT
        </button>
        <button className="btn-out inline-flex items-center gap-1.5 text-[--dang-700]">
          <XCircle className="size-3.5" /> Cancelar OT
        </button>
      </div>

      {/* Grid */}
      <div className="mt-4 grid items-start gap-3 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-3">
          {/* Autorización */}
          <div className="iblock">
            <div className="ib-head">
              <div className="ib-ico succ"><ShieldCheck className="size-3.5" /></div>
              <div className="ib-title">Autorización del cliente</div>
              <span className={`auth-pill ${
                d.autorizacion.estado === "autorizado" ? "aut-ok" :
                d.autorizacion.estado === "no_autorizado" ? "aut-no" : "aut-pen"
              }`}>
                <span className="dot" />
                {d.autorizacion.estado === "autorizado" ? "Autorizado" :
                 d.autorizacion.estado === "no_autorizado" ? "No autorizado" : "Pendiente"}
              </span>
            </div>

            <div className="banner-info mb-3 !bg-[--info-50]/60 !border-[--info-100]">
              <Info className="mt-0.5 size-3.5 shrink-0" />
              <div className="body">
                <b className="font-medium">Autorizado.</b> {d.autorizacion.nota}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <Kv label="Fecha de autorización" value={d.autorizacion.fecha} mono />
              <Kv label="Autorizado por" value={d.autorizacion.por} />
              <Kv label="Evidencia" value={d.autorizacion.evidencia} mono />
            </div>
          </div>

          {/* Abonos */}
          <div className="iblock">
            <div className="ib-head">
              <div className="ib-ico"><Wallet className="size-3.5" /></div>
              <div className="ib-title">Abonos y anticipos</div>
              <div className="ib-aux">
                <span className="text-[--succ-700] dark:text-[#6CE9A6]">Abonado {formatCOP(d.abonado)}</span>
                <span className="mx-2 text-muted-foreground/50">·</span>
                <span>Saldo {formatCOP(d.saldoTras)}</span>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-border">
              <table className="w-full border-collapse text-[13px]">
                <thead>
                  <tr className="bg-muted/30">
                    <th className="px-3 py-2 text-left font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">Fecha</th>
                    <th className="px-3 py-2 text-left font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">Monto</th>
                    <th className="px-3 py-2 text-left font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">Método</th>
                    <th className="px-3 py-2 text-left font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">Ref.</th>
                    <th className="px-3 py-2 text-left font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">Nota</th>
                  </tr>
                </thead>
                <tbody>
                  {d.abonos.map((a, i) => (
                    <tr key={i} className="border-t border-border">
                      <td className="px-3 py-2.5 font-mono text-[11.5px] text-muted-foreground">{a.fecha}</td>
                      <td className="px-3 py-2.5 font-mono text-[13px] font-medium text-foreground">{formatCOP(a.monto)}</td>
                      <td className="px-3 py-2.5">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C8DFFC] bg-[--info-50] px-2 py-0.5 text-[11px] text-[--info-700] dark:border-[rgba(46,144,250,.35)] dark:bg-[rgba(46,144,250,.16)] dark:text-[#7CC4FD]">
                          <span className="size-1.5 rounded-full bg-current opacity-70" />{a.metodo}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 font-mono text-[11.5px] text-muted-foreground">Ref. {a.ref}</td>
                      <td className="px-3 py-2.5 text-[12.5px] text-foreground/80">{a.nota}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border bg-muted/20 py-2.5 text-[12.5px] font-medium text-muted-foreground hover:bg-muted/40 hover:text-foreground">
              <Plus className="size-3.5" /> Registrar abono
            </button>
          </div>

          {/* Checklist */}
          <div className="iblock">
            <div className="ib-head">
              <div className="ib-ico"><ClipboardCheck className="size-3.5" /></div>
              <div className="ib-title">Checklist de recepción</div>
              <div className="ib-aux">
                <span className="font-mono">{d.checklist.marcados} de {d.checklist.total} marcados</span>
              </div>
            </div>

            <div className="ck-grid">
              {d.checklist.items.map((it, i) => (
                <div key={i} className={`ck-item ${it.on ? "on" : ""}`}>
                  <span className={`ck-cb ${it.on ? "on" : ""}`}>
                    {it.on && <Check className="size-2.5" strokeWidth={3} />}
                  </span>
                  {it.lbl}
                </div>
              ))}
            </div>

            <div className="mt-4">
              <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">Observaciones del checklist</div>
              <div className="rounded-lg border border-border bg-muted/20 p-3 text-[13px] leading-[1.55] text-foreground/85">
                {d.checklist.obs}
              </div>
            </div>
          </div>

          {/* Cotización asociada */}
          <div className="iblock">
            <div className="ib-head">
              <div className="ib-ico"><FileText className="size-3.5" /></div>
              <div className="ib-title">Cotización asociada</div>
              <div className="ib-aux">1 cotización</div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/20 px-4 py-3">
              <Link to="/ops/cotizaciones/$id" params={{ id: d.cotizacion.num }} className="link-pill cot">
                {d.cotizacion.num}
              </Link>
              <span className="font-mono text-[11.5px] text-muted-foreground">{d.cotizacion.fecha}</span>
              <span className="ml-auto font-mono text-[13px] font-medium text-foreground">{formatCOP(d.cotizacion.total)}</span>
              <span className="s-pill s-apr">
                <span className="dot" />{d.cotizacion.estado}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button className="btn-out inline-flex items-center gap-1.5">
                <Plus className="size-3.5" /> Generar nueva cotización
              </button>
              <button className="btn-out inline-flex items-center gap-1.5">
                <FileText className="size-3.5" /> Asociar cotización existente
              </button>
            </div>
          </div>

          {/* Historial */}
          <div className="iblock">
            <div className="ib-head">
              <div className="ib-ico"><Activity className="size-3.5" /></div>
              <div className="ib-title">Historial de eventos</div>
            </div>
            <div className="timeline">
              {d.historial.map((h, i) => (
                <div className="tl-row" key={i}>
                  <span className={`tl-dot ${h.tone}`} />
                  <div>
                    <div className="tl-act">{h.act}</div>
                    <div className="tl-meta">{h.meta}</div>
                  </div>
                  <span className="tl-time">{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Side column */}
        <aside className="iblock sticky top-4 self-start !p-5">
          <div className="side-block">
            <div className="eyebrow">Cliente</div>
            <div className="name">{d.cliente.razon}</div>
            <div className="row mono"><Phone className="size-3" /> {d.cliente.tel}</div>
            <div className="row">Contacto: <span className="val">{d.cliente.contacto}</span></div>
            <div className="row mono"><Mail className="size-3" /> {d.cliente.email}</div>
          </div>

          <div className="side-block">
            <div className="eyebrow">Equipo</div>
            <div className="name">{d.equipo.nombre}</div>
            <div className="row mono">Modelo: <span className="val">{d.equipo.modelo}</span></div>
            <div className="row mono"><Hash className="size-3" /> <span className="val">{d.equipo.serie}</span></div>
            <div className="row mono">Año: <span className="val">{d.equipo.año}</span></div>
          </div>

          <div className="side-block">
            <div className="eyebrow">Asignación</div>
            <div className="row" style={{ gap: 8 }}>
              <span className={`av-tec ${d.asignacion.tecnico.variant}`}>{d.asignacion.tecnico.ini}</span>
              <span className="val text-[13px]">{d.asignacion.tecnico.nombre}</span>
            </div>
            <div className="row mono">Recepción: <span className="val">{d.asignacion.recepcion}</span></div>
            <div className="row mono">Entrega est.: <span className="val">{d.asignacion.entregaEst}</span></div>
            <div className="row mono">En taller: <span className="val">{d.asignacion.enTaller}</span></div>
          </div>

          {isCycle && (
            <div className="side-block">
              <div className="eyebrow">
                <span className="inline-block size-1.5 rounded-full bg-[--p-500]" />
                Costos · Solo Admin
              </div>
              <div className="cost-row"><span>Mano de obra estim.</span><span className="v">{formatCOP(d.costos.manoObra)}</span></div>
              <div className="cost-row"><span>Repuestos consumidos</span><span className="v">{formatCOP(d.costos.repuestos)}</span></div>
              <div className="cost-row tot"><span>Subtotal</span><span className="v">{formatCOP(d.costos.subtotal)}</span></div>
              <div className="cost-row"><span>IVA 19%</span><span className="v">{formatCOP(d.costos.iva)}</span></div>
              <div className="cost-row tot"><span>Total</span><span className="v">{formatCOP(d.costos.total)}</span></div>
              <div className="cost-row saldo"><span>Saldo</span><span className="v">{formatCOP(d.costos.saldo)}</span></div>
            </div>
          )}

          {isCycle && (
            <div className="side-block">
              <div className="eyebrow">Vinculaciones</div>
              <div className="mt-1 flex flex-wrap gap-1.5">
                <Link to="/ops/cotizaciones/$id" params={{ id: d.cotizacion.num }} className="link-pill cot">{d.cotizacion.num}</Link>
                <Link to="/ops/ventas/$id" params={{ id: d.venta.num }} className="link-pill v">{d.venta.num}</Link>
                <Link to="/ops/recibos/$id" params={{ id: d.recibo.num }} className="link-pill ot">{d.recibo.num}</Link>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function Kv({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">{label}</div>
      <div className={[
        mono ? "font-mono text-[12.5px]" : "text-[13px]",
        "font-medium text-foreground",
      ].join(" ")}>
        {value}
      </div>
    </div>
  );
}
