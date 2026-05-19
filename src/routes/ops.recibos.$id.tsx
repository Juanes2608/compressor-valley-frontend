import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeftCircle, User, FileText, Wallet, Link2, Activity, XCircle, Download, Share2, Printer,
  Info,
} from "lucide-react";
import { getReciboDetail } from "@/lib/recibos-data";
import { formatCOP } from "@/lib/format";

export const Route = createFileRoute("/ops/recibos/$id")({
  head: ({ params }) => ({ meta: [{ title: `${params.id} · Recibo · CHV` }] }),
  component: DetalleRecibo,
});

function DetalleRecibo() {
  const { id } = Route.useParams();
  const d = getReciboDetail(id);
  const isCycle = d.num === "Rec-1284";

  return (
    <div className="px-6 pb-16 pt-5 lg:px-8">
      <Link to="/ops/recibos" className="back-btn">
        <ArrowLeftCircle className="size-3.5" /> Volver a Recibos
      </Link>

      {isCycle && (
        <div className="banner-info mt-4">
          <Info className="mt-0.5 size-3.5 shrink-0" />
          <div className="body">
            Este recibo fue generado desde <b>{d.vinculos.cot.num}</b>. Datos del cliente y concepto pre-cargados de la cotización.{" "}
            <Link to="/ops/cotizaciones/$id" params={{ id: d.vinculos.cot.num }} className="font-medium underline underline-offset-2">
              Ver {d.vinculos.cot.num}
            </Link>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mt-4 flex flex-col items-start gap-4 border-b border-border pb-4 md:flex-row md:items-start md:gap-6">
        <div className="min-w-0 flex-1">
          <div className="ph-eyebrow">Recibo de pago · Consecutivo auto BD</div>
          <div className="ph-num">{d.num}</div>
          <div className="ph-client">{d.cliente.razon}</div>
          <div className="ph-sub">
            Emitido el <b className="font-mono font-medium text-foreground">{d.fechaTxt}</b> · Por {d.vendedor.nombre}
          </div>
        </div>
        <div className="flex flex-col items-start gap-3 md:items-end">
          <span className={`ph-state ${d.estadoLabel === "Activo" ? "succ" : ""}`}>
            <span className="dot" />{d.estadoLabel}
          </span>
          <div className="flex flex-col md:items-end">
            <span className="ph-total-lbl">Total</span>
            <span className="ph-total">{formatCOP(d.total)}</span>
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="action-bar mt-4">
        <button className="btn-out inline-flex items-center gap-1.5 text-[--dang-700]">
          <XCircle className="size-3.5" /> Anular recibo
        </button>
        <button className="btn-out inline-flex items-center gap-1.5">
          <Download className="size-3.5" /> Descargar PDF
        </button>
        <button className="btn-out inline-flex items-center gap-1.5">
          <Share2 className="size-3.5" /> Compartir WhatsApp
        </button>
        <button className="btn-out inline-flex items-center gap-1.5">
          <Printer className="size-3.5" /> Reimprimir
        </button>
      </div>

      {/* Layout */}
      <div className="mt-4 grid items-start gap-3 lg:grid-cols-[1fr_380px]">
        <div className="flex flex-col gap-3">
          {/* Cliente */}
          <div className="iblock">
            <div className="ib-head">
              <div className="ib-ico"><User className="size-3.5" /></div>
              <div className="ib-title">Cliente</div>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              <Kv label="Razón social" value={d.cliente.razon} full />
              <Kv label="NIT"      value={d.cliente.nit} mono />
              <Kv label="Tel"      value={d.cliente.tel} mono />
              <Kv label="Contacto" value={d.cliente.contacto} />
              <Kv label="Cargo"    value={d.cliente.cargo} muted />
            </div>
          </div>

          {/* Concepto y monto */}
          <div className="iblock">
            <div className="ib-head">
              <div className="ib-ico"><FileText className="size-3.5" /></div>
              <div className="ib-title">Concepto y monto</div>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">Concepto</div>
                <div className="text-[13px] leading-[1.5] text-foreground">{d.concepto}</div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">Total</div>
                  <div className="font-mono text-[18px] font-medium text-foreground">{formatCOP(d.total)}</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">Tipo</div>
                  <div className="mt-1">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C8DFFC] bg-[--info-50] px-2.5 py-0.5 text-[11px] font-medium text-[--info-700] dark:border-[rgba(46,144,250,.35)] dark:bg-[rgba(46,144,250,.16)] dark:text-[#7CC4FD]">
                      <span className="size-1.5 rounded-full bg-current opacity-70" />
                      {d.tipoLabel}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pago */}
          <div className="iblock">
            <div className="ib-head">
              <div className="ib-ico succ"><Wallet className="size-3.5" /></div>
              <div className="ib-title">Pago</div>
              <div className="ib-aux">{d.pago.metodoLabel}</div>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              <Kv label="Método" value={d.pago.metodoLabel} />
              <Kv label="Referencia" value={d.pago.ref} mono />
              <div className="col-span-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">Cuenta destino</div>
                <div className="font-mono text-[12.5px] text-foreground/80">{d.pago.cuenta}</div>
              </div>
            </div>
          </div>

          {/* Vinculaciones */}
          {isCycle && (
            <div className="iblock info-tint">
              <div className="ib-head">
                <div className="ib-ico info"><Link2 className="size-3.5" /></div>
                <div className="ib-title">Vinculaciones del ciclo comercial</div>
              </div>
              <div className="vinc-link-grid">
                <Link to="/ops/cotizaciones/$id" params={{ id: d.vinculos.cot.num }} className="vinc-link hover:bg-muted/40">
                  <span className="vlk">Cotización origen</span>
                  <span className="vpill">{d.vinculos.cot.num}</span>
                  <span className="vst">{d.vinculos.cot.estado}</span>
                </Link>
                <Link to="/ops/ventas/$id" params={{ id: d.vinculos.venta.num }} className="vinc-link hover:bg-muted/40">
                  <span className="vlk">Venta</span>
                  <span className="vpill">{d.vinculos.venta.num}</span>
                  <span className="vst">{d.vinculos.venta.estado}</span>
                </Link>
                <div className="vinc-link">
                  <span className="vlk">OT vinculada</span>
                  <span className="vpill">{d.vinculos.ot.num}</span>
                  <span className="vst">{d.vinculos.ot.estado}</span>
                </div>
              </div>
              <div className="mt-3 text-[11.5px] leading-[1.5] text-[--info-700] dark:text-[#84CAFF]">
                El abono de <b className="font-mono">{formatCOP(d.consolidacion.abonoPrevio)}</b> previamente registrado en{" "}
                <b className="font-mono">{d.vinculos.ot.num}</b> queda consolidado dentro de este recibo. Saldo después del recibo:{" "}
                <b className="font-mono">$ 0</b>.
              </div>
            </div>
          )}

          {/* Historial */}
          <div className="iblock">
            <div className="ib-head">
              <div className="ib-ico"><Activity className="size-3.5" /></div>
              <div className="ib-title">Historial</div>
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

        {/* Preview PDF */}
        <aside className="pdf-wrap sticky top-4">
          <header className="pdf-head">
            <div>
              <div className="pdf-eyebrow">Preview del PDF</div>
              <div className="pdf-title">{d.num} · Recibo de pago</div>
            </div>
          </header>
          <div className="pdf-stage">
            <div className="pdf-paper">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <div className="pdf-logo-sq">CHV</div>
                  <div className="pdf-logo-tag">Compresores del Valle</div>
                </div>
                <div className="text-right">
                  <div className="pdf-co-name">COMPRESORES DEL VALLE S.A.S.</div>
                  <div className="pdf-co-line">NIT 900.456.789-2</div>
                  <div className="pdf-co-line sans">Cra 5 #12-45, Cali</div>
                  <div className="pdf-co-line">Tel +57 (2) 444 5566</div>
                </div>
              </div>

              <div className="my-3 border-y border-dashed border-[#DADCE3] py-3 text-center">
                <div className="pdf-title-main">RECIBO DE PAGO</div>
                <div className="pdf-title-num">{d.num}</div>
                <span className="mt-2 inline-block rounded-full border border-[#9FDDB5] bg-[#E8F7EE] px-2 py-0.5 font-mono text-[8px] font-bold tracking-wider text-[#176B38]">
                  PAGO RECIBIDO
                </span>
              </div>

              <div className="mb-3 grid grid-cols-[1.2fr_1fr] gap-4 border-b border-[#DADCE3] pb-3">
                <div>
                  <div className="pdf-eyebrow-print">Cliente</div>
                  <div className="pdf-cli-name">{d.cliente.razon}</div>
                  <div className="pdf-cli-line">NIT {d.cliente.nit}</div>
                  {isCycle && <div className="pdf-cli-line sans">{d.cliente.dir}</div>}
                </div>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                  <div>
                    <div className="pdf-eyebrow-print">Fecha</div>
                    <div className="pdf-meta-val">{d.fechaCorta}</div>
                  </div>
                  {isCycle && (
                    <>
                      <div>
                        <div className="pdf-eyebrow-print">Cotización</div>
                        <div className="pdf-meta-val">COT-1042</div>
                      </div>
                      <div>
                        <div className="pdf-eyebrow-print">Venta</div>
                        <div className="pdf-meta-val">V-2847</div>
                      </div>
                      <div>
                        <div className="pdf-eyebrow-print">OT vinculada</div>
                        <div className="pdf-meta-val">OT-2845</div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <table className="pdf-table">
                <thead>
                  <tr>
                    <th>Concepto</th>
                    <th className="r" style={{ width: 90 }}>Monto</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {isCycle ? "Pago Cot-1042 · 4 productos" : d.concepto}
                      {isCycle && (
                        <div className="mono" style={{ color: "#7E8290", fontSize: 8 }}>
                          Filtro GA-22, Aceite ISO, Manguera 1/2", Mantenimiento
                        </div>
                      )}
                    </td>
                    <td className="r sub">{formatCOP(d.total)}</td>
                  </tr>
                </tbody>
              </table>

              {isCycle && (
                <div className="flex justify-end">
                  <table className="pdf-totals-tbl">
                    <tbody>
                      <tr><td>Abono previo OT-2845</td><td>{formatCOP(d.consolidacion.abonoPrevio)}</td></tr>
                      <tr><td>Pago este recibo</td><td>{formatCOP(d.consolidacion.pagoEsteRecibo)}</td></tr>
                      <tr className="tot"><td>TOTAL CONSOLIDADO</td><td>{formatCOP(d.consolidacion.total)}</td></tr>
                    </tbody>
                  </table>
                </div>
              )}

              <div className="mt-3 flex items-center justify-between rounded bg-[#F5F6F8] px-2.5 py-2 text-[9px]">
                <span className="font-mono font-bold uppercase tracking-wider text-[#383C4A]" style={{ fontSize: 7.5 }}>Método de pago</span>
                <span className="font-mono font-medium text-[#0E1018]">
                  {d.pago.metodoLabel} · Ref. {d.pago.ref}
                </span>
              </div>

              <div className="pdf-footer-page mt-6">Página 1 de 1 · CHV · {d.num}</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Kv({ label, value, full, mono, muted }: { label: string; value: string; full?: boolean; mono?: boolean; muted?: boolean }) {
  return (
    <div className={full ? "col-span-2" : ""}>
      <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">{label}</div>
      <div className={[
        mono ? "font-mono text-[13px]" : "text-[13.5px]",
        muted ? "text-muted-foreground" : "text-foreground",
        "font-medium",
      ].join(" ")}>
        {value}
      </div>
    </div>
  );
}
