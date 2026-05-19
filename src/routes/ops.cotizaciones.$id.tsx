import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeftCircle, User, Package, FileText, Link2, Activity, Wallet,
  Phone, Mail, RefreshCw, Receipt, Download, MessageCircle,
  MoreHorizontal, Minus, Plus, Maximize2,
} from "lucide-react";
import { COT_1042_DETALLE } from "@/lib/cotizaciones-data";
import { formatCOP } from "@/lib/format";

export const Route = createFileRoute("/ops/cotizaciones/$id")({
  head: () => ({ meta: [{ title: "Cot-1042 · Detalle · CHV" }] }),
  component: DetalleCotizacion,
});

function DetalleCotizacion() {
  const d = COT_1042_DETALLE;

  return (
    <div className="px-6 pb-16 pt-5 lg:px-8">
      {/* Back */}
      <Link
        to="/ops/cotizaciones"
        className="focus-ring inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[--n-500] hover:text-[--n-900]"
      >
        <ArrowLeftCircle className="h-3.5 w-3.5" strokeWidth={2} />
        Volver a Cotizaciones
      </Link>

      {/* Page header */}
      <div className="mt-4 flex flex-col items-start gap-4 border-b border-[--n-100] pb-4 dark:border-white/[0.08] md:flex-row md:items-start md:gap-6">
        <div className="min-w-0 flex-1">
          <div className="ph-eyebrow">Cotización</div>
          <div className="ph-num">{d.num}</div>
          <div className="ph-client">{d.cliente.razon}</div>
          <div className="ph-sub">
            Aprobada el {d.fechaAprobacion} · <span className="vence-pill">{d.venceTexto}</span>
          </div>
        </div>
        <div className="flex flex-col items-start gap-3 md:items-end">
          <span className="ph-state succ">
            <span className="dot" />
            {d.estadoLabel}
          </span>
          <div className="flex flex-col md:items-end">
            <span className="ph-total-lbl">Total</span>
            <span className="ph-total">{formatCOP(d.total)}</span>
          </div>
        </div>
      </div>

      {/* Action bar */}
      <div className="action-bar mt-4">
        <button className="btn btn-pri">
          <RefreshCw className="h-3.5 w-3.5" strokeWidth={2} />
          Re-emitir con nueva fecha
        </button>
        <button className="btn btn-out">
          <Link2 className="h-3.5 w-3.5" strokeWidth={2} />
          Asociar a otra OT
        </button>
        <button className="btn btn-out">
          <Receipt className="h-3.5 w-3.5" strokeWidth={2} />
          Generar recibo
        </button>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <button className="btn btn-out">
            <Download className="h-3.5 w-3.5" strokeWidth={2} />
            Descargar PDF
          </button>
          <button className="btn btn-out">
            <MessageCircle className="h-3.5 w-3.5" strokeWidth={2} />
            Compartir por WhatsApp
          </button>
          <button className="btn btn-out !w-9 !px-0 justify-center" aria-label="Más acciones">
            <MoreHorizontal className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Two-column layout: info + PDF preview */}
      <div className="mt-5 grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,540px)_minmax(0,1fr)]">
        {/* Col Izq · INFO */}
        <div className="flex min-w-0 flex-col gap-3.5">
          {/* Cliente */}
          <section className="iblock">
            <div className="ib-head">
              <div className="ib-ico"><User className="h-3.5 w-3.5" strokeWidth={2} /></div>
              <div className="ib-title">Cliente</div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <Field label="Razón social" full>
                <div className="text-[13px] font-medium text-[--n-900]">{d.cliente.razon}</div>
                <div className="mt-0.5 font-mono text-[11.5px] text-[--n-500]">NIT {d.cliente.nit}</div>
              </Field>
              <Field label="Teléfono">
                <div className="flex items-center gap-1.5 text-[13px] text-[--n-900]">
                  <Phone className="h-3 w-3 text-[--n-300]" strokeWidth={2} />
                  <span className="font-mono">{d.cliente.telefono}</span>
                </div>
              </Field>
              <Field label="Correo">
                <div className="flex items-center gap-1.5 text-[13px] text-[--n-900]">
                  <Mail className="h-3 w-3 text-[--n-300]" strokeWidth={2} />
                  <span className="font-mono">{d.cliente.correo}</span>
                </div>
              </Field>
              <Field label="Contacto">
                <div className="text-[13px] font-medium text-[--n-900]">{d.cliente.contacto}</div>
                <div className="mt-0.5 text-[11.5px] text-[--n-500]">{d.cliente.cargo}</div>
              </Field>
              <Field label="Dirección">
                <div className="text-[12.5px] text-[--n-700]">{d.cliente.direccion}</div>
              </Field>
            </div>
            <button className="ib-sublink">Ver otras cotizaciones de este cliente ({d.cliente.otrasCotizaciones})</button>
          </section>

          {/* Productos */}
          <section className="iblock">
            <div className="ib-head">
              <div className="ib-ico"><Package className="h-3.5 w-3.5" strokeWidth={2} /></div>
              <div className="ib-title">Productos</div>
              <div className="ib-aux">{d.productos.length} items</div>
            </div>
            <div className="overflow-x-auto">
              <table className="prod-tbl">
                <thead>
                  <tr>
                    <th style={{ width: 110 }}>SKU</th>
                    <th>Producto</th>
                    <th className="r" style={{ width: 50 }}>Cant</th>
                    <th className="r" style={{ width: 90 }}>Unit</th>
                    <th className="r" style={{ width: 110 }}>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {d.productos.map((p) => (
                    <tr key={p.sku}>
                      <td><span className="p-sku">{p.sku}</span></td>
                      <td>
                        <div className="p-nm">{p.nombre}</div>
                        <div className="p-meta">{p.meta}</div>
                      </td>
                      <td className="p-qty">×{p.cant}</td>
                      <td className="p-pr">{formatCOP(p.unit)}</td>
                      <td className="p-sub">{formatCOP(p.sub)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="totals">
              <div className="ln"><span>Subtotal</span><span className="v">{formatCOP(d.totales.subtotal)}</span></div>
              <div className="ln"><span>IVA 19%</span><span className="v">{formatCOP(d.totales.iva)}</span></div>
              <div className="ln tot"><span>Total</span><span className="v">{formatCOP(d.totales.total)}</span></div>
            </div>
          </section>

          {/* Términos */}
          <section className="iblock">
            <div className="ib-head">
              <div className="ib-ico"><FileText className="h-3.5 w-3.5" strokeWidth={2} /></div>
              <div className="ib-title">Términos comerciales</div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <Field label="Validez">
                <div className="text-[13px] text-[--n-700]">{d.terminos.validez}</div>
              </Field>
              <Field label="IVA aplicable">
                <div className="font-mono text-[13px] font-medium text-[--n-900]">{d.terminos.iva}</div>
              </Field>
              <Field label="Condiciones de pago" full>
                <div className="text-[13px] text-[--n-700]">{d.terminos.pago}</div>
              </Field>
              <Field label="Tiempo de entrega" full>
                <div className="text-[13px] text-[--n-700]">{d.terminos.entrega}</div>
              </Field>
            </div>

            <div className="mt-4 border-t border-dashed border-[--n-150] pt-3.5">
              <div className="mb-2.5 font-mono text-[10.5px] uppercase tracking-[0.08em] text-[--n-300]">
                Cuentas bancarias para pago
              </div>
              {d.bancos.map((b) => (
                <div key={b.numero} className="bank-card">
                  <div className="flex flex-col gap-0.5">
                    <span className="bank-name">{b.nombre}</span>
                    <span className="bank-meta">{b.numero}</span>
                  </div>
                  <span className="bank-iva">Con IVA</span>
                </div>
              ))}
            </div>
          </section>

          {/* Vinculaciones */}
          <section className="iblock info-tint">
            <div className="ib-head">
              <div className="ib-ico info"><Link2 className="h-3.5 w-3.5" strokeWidth={2} /></div>
              <div className="ib-title">Vinculaciones</div>
            </div>
            <Link to="/ops/ordenes-trabajo" className="vinc-card">
              <span className="vinc-pill">{d.vinculacion.ot}</span>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="vinc-cli">{d.vinculacion.cliente}</span>
                <span className="vinc-state">
                  <span className="dot" />
                  {d.vinculacion.estado}
                </span>
              </div>
              <div className="flex flex-shrink-0 flex-col items-end gap-0.5">
                <span className="vinc-saldo-lbl">Saldo pendiente</span>
                <span className="vinc-saldo-v">{formatCOP(d.vinculacion.saldoPendiente)}</span>
              </div>
            </Link>
            <p className="mt-3 text-[12px] leading-[1.5] text-[--n-500]">
              Esta cotización está convertida operacionalmente. Los abonos registrados aquí
              (<b className="font-mono font-medium text-[--n-700]">{formatCOP(d.vinculacion.abonado)}</b>)
              se aplican al saldo de la OT.
            </p>
          </section>

          {/* Abonos */}
          <section className="iblock">
            <div className="ib-head">
              <div className="ib-ico succ"><Wallet className="h-3.5 w-3.5" strokeWidth={2} /></div>
              <div className="ib-title">Abonos recibidos</div>
            </div>
            <div className="abono-bar">
              <div className="abono-bar-row">
                <span>Abonado {formatCOP(d.vinculacion.abonado)} / Total {formatCOP(d.total)}</span>
                <span>{d.abonoPct}%</span>
              </div>
              <div className="abono-bar-progress">
                <div className="abono-bar-fill" style={{ width: `${d.abonoPct}%` }} />
              </div>
            </div>
            {d.abonos.map((a, i) => (
              <div key={i} className="abono-row">
                <span className="abono-date">{a.fecha}</span>
                <span className="abono-amt">{formatCOP(a.monto)}</span>
                <span className="abono-method">{a.metodo}</span>
                <span className="abono-ref">{a.ref}</span>
              </div>
            ))}
            <button className="ib-sublink">Registrar abono en la {d.vinculacion.ot}</button>
          </section>

          {/* Historial */}
          <section className="iblock">
            <div className="ib-head">
              <div className="ib-ico"><Activity className="h-3.5 w-3.5" strokeWidth={2} /></div>
              <div className="ib-title">Historial</div>
            </div>
            <div className="timeline">
              {d.historial.map((h, i) => (
                <div key={i} className="tl-row">
                  <span className={`tl-dot ${h.tipo}`} />
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span className="tl-act">{h.accion}</span>
                    <span className="tl-meta">{h.actor}</span>
                  </div>
                  <span className="tl-time">{h.fecha}</span>
                </div>
              ))}
            </div>
            <button className="ib-sublink">Ver auditoría completa</button>
          </section>
        </div>

        {/* Col Der · PDF Preview */}
        <div className="xl:sticky xl:top-[72px]">
          <PdfPreview />
        </div>
      </div>
    </div>
  );
}

function Field({ label, full, children }: { label: string; full?: boolean; children: React.ReactNode }) {
  return (
    <div className={full ? "col-span-2" : ""}>
      <div className="mb-1 font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-[--n-300]">
        {label}
      </div>
      {children}
    </div>
  );
}

function PdfPreview() {
  const d = COT_1042_DETALLE;
  return (
    <div className="pdf-wrap">
      <header className="pdf-head">
        <div>
          <div className="pdf-eyebrow">Preview del PDF</div>
          <div className="pdf-title">{d.num} · {d.version}</div>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-1.5">
          <button className="pdf-zoom-btn" aria-label="Alejar"><Minus className="h-3 w-3" strokeWidth={2} /></button>
          <span className="pdf-zoom-val">100%</span>
          <button className="pdf-zoom-btn" aria-label="Acercar"><Plus className="h-3 w-3" strokeWidth={2} /></button>
          <span className="mx-1 h-[18px] w-px bg-[--n-150] dark:bg-white/10" />
          <button className="pdf-zoom-btn" aria-label="Pantalla completa"><Maximize2 className="h-3 w-3" strokeWidth={2} /></button>
          <button className="pdf-zoom-btn" aria-label="Descargar"><Download className="h-3 w-3" strokeWidth={2} /></button>
        </div>
      </header>
      <div className="pdf-stage">
        <div className="pdf-paper">
          {/* Head */}
          <div className="mb-3.5 grid grid-cols-2 gap-6 pb-3.5">
            <div className="flex flex-col gap-1">
              <div className="pdf-logo-sq">CHV</div>
              <div className="pdf-logo-tag">Compresores del Valle</div>
            </div>
            <div className="flex flex-col gap-px text-right leading-[1.45]">
              <div className="pdf-co-name">COMPRESORES DEL VALLE S.A.S.</div>
              <div className="pdf-co-line">NIT 900.456.789-2</div>
              <div className="pdf-co-line sans">Cra 5 #12-45, Cali · Valle del Cauca</div>
              <div className="pdf-co-line">Tel +57 (2) 444 5566 · ventas@cv.co</div>
            </div>
          </div>

          {/* Title */}
          <div className="mb-4 border-y border-[#E6E8ED] py-4 text-center">
            <div className="pdf-title-main">COTIZACIÓN</div>
            <div className="pdf-title-num">{d.num} · {d.version}</div>
          </div>

          {/* Cliente + meta */}
          <div className="mb-3.5 grid grid-cols-[1.2fr_1fr] gap-6 border-b border-[#E6E8ED] pb-4">
            <div>
              <div className="pdf-eyebrow-print">Cliente</div>
              <div className="pdf-cli-name">{d.cliente.razon}</div>
              <div className="pdf-cli-line">NIT {d.cliente.nit}</div>
              <div className="pdf-cli-line sans">{d.cliente.direccion} · Valle del Cauca</div>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-2">
              <div><div className="pdf-eyebrow-print">Fecha emisión</div><div className="pdf-meta-val">19 ABR 2026</div></div>
              <div><div className="pdf-eyebrow-print">Válida hasta</div><div className="pdf-meta-val">4 MAY 2026</div></div>
              <div><div className="pdf-eyebrow-print">Cotizado por</div><div className="pdf-meta-val sans">María L.</div></div>
              <div><div className="pdf-eyebrow-print">Validez</div><div className="pdf-meta-val">15 días háb.</div></div>
            </div>
          </div>

          {/* Tabla */}
          <table className="pdf-table">
            <thead>
              <tr>
                <th style={{ width: 90 }}>SKU</th>
                <th>Descripción</th>
                <th className="c" style={{ width: 50 }}>Cant</th>
                <th className="r" style={{ width: 80 }}>Precio Unit</th>
                <th className="r" style={{ width: 90 }}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {d.productos.map((p) => (
                <tr key={p.sku}>
                  <td className="mono">{p.sku}</td>
                  <td>{p.nombre}</td>
                  <td className="c">{p.cant}</td>
                  <td className="r">{formatCOP(p.unit)}</td>
                  <td className="r sub">{formatCOP(p.sub)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="mb-4 flex justify-end">
            <table className="pdf-totals-tbl">
              <tbody>
                <tr><td>Subtotal</td><td>{formatCOP(d.totales.subtotal)}</td></tr>
                <tr><td>IVA 19%</td><td>{formatCOP(d.totales.iva)}</td></tr>
                <tr className="tot"><td>TOTAL</td><td>{formatCOP(d.totales.total)}</td></tr>
              </tbody>
            </table>
          </div>

          {/* Sections */}
          <div className="mb-3.5">
            <div className="pdf-section-h">Términos comerciales</div>
            <div className="pdf-section-list">
              <div><b>Validez:</b> 15 días hábiles a partir de la fecha de emisión.</div>
              <div><b>Condiciones de pago:</b> 50% anticipo, saldo contra entrega.</div>
              <div><b>Tiempo de entrega:</b> 5 a 7 días hábiles después de aprobación del anticipo.</div>
              <div><b>IVA incluido:</b> Sí, 19%.</div>
            </div>
          </div>

          <div className="mb-3.5">
            <div className="pdf-section-h">Cuentas para pago</div>
            <div className="pdf-section-list">
              {d.bancos.map((b) => (
                <div key={b.numero}><b>{b.nombre.split(" ·")[0]}</b> · {b.nombre.split("·")[1]?.trim()} · {b.numero} · A nombre de COMPRESORES DEL VALLE S.A.S.</div>
              ))}
            </div>
          </div>

          <div className="mb-3.5">
            <div className="pdf-section-h">Condiciones de entrega</div>
            <div className="pdf-section-list" style={{ fontSize: 8.5 }}>
              El cliente se compromete a recibir la mercancía en las condiciones físicas en que se entrega.
              Cualquier reclamo sobre defectos visibles debe realizarse al momento de la entrega.
              Las garantías aplican según política de fábrica del producto.
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 flex flex-col gap-2 border-t border-[#E6E8ED] pt-3.5">
            <div className="pdf-footer-legal">
              Esta cotización es válida hasta la fecha indicada. Los precios incluyen embalaje estándar.
              Embalaje especial bajo cotización adicional. Las garantías aplican según política de fábrica del producto.
            </div>
            <div className="pdf-footer-page">Página 1 de 1 · {d.num} · generada 19 abr 2026 14:23</div>
          </div>
        </div>
      </div>
    </div>
  );
}
