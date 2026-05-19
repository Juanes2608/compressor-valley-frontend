import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeftCircle, User, Package, Wallet, Link2, Activity,
  XCircle, Undo2, Printer, Share2, Shield,
} from "lucide-react";
import { V_2847 } from "@/lib/ventas-data";
import { formatCOP } from "@/lib/format";

export const Route = createFileRoute("/ops/ventas/$id")({
  head: () => ({ meta: [{ title: "V-2847 · Detalle · CHV" }] }),
  component: DetalleVenta,
});

function DetalleVenta() {
  const d = V_2847;
  return (
    <div className="px-6 pb-16 pt-5 lg:px-8">
      <Link to="/ops/ventas" className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-muted-foreground hover:text-foreground">
        <ArrowLeftCircle className="size-3.5" /> Volver a Ventas
      </Link>

      {/* Header */}
      <div className="mt-4 flex flex-col items-start gap-4 border-b border-border pb-4 md:flex-row md:items-start md:gap-6">
        <div className="min-w-0 flex-1">
          <div className="ph-eyebrow">Venta</div>
          <div className="ph-num">{d.num}</div>
          <div className="ph-client">{d.cliente.razon}</div>
          <div className="ph-sub">
            Completada el <b className="font-mono font-medium text-foreground">{d.fechaTxt}</b> · Vendida por {d.vendedor.nombre}
          </div>
        </div>
        <div className="flex flex-col items-start gap-3 md:items-end">
          <span className="ph-state succ"><span className="dot" />{d.estadoLabel}</span>
          <div className="flex flex-col md:items-end">
            <span className="ph-total-lbl">Total</span>
            <span className="ph-total">{formatCOP(d.total)}</span>
          </div>
        </div>
      </div>

      {/* Action bar */}
      <div className="action-bar mt-4">
        <button className="btn-out inline-flex items-center gap-1.5 text-[--dang-700]">
          <XCircle className="size-3.5" /> Anular venta
        </button>
        <button className="btn-out inline-flex items-center gap-1.5 text-[--warn-700]">
          <Undo2 className="size-3.5" /> Devolver parcialmente
        </button>
        <button className="btn-out inline-flex items-center gap-1.5">
          <Printer className="size-3.5" /> Imprimir recibo
        </button>
        <button className="btn-out inline-flex items-center gap-1.5">
          <Share2 className="size-3.5" /> Compartir recibo
        </button>
        <button className="btn-out inline-flex items-center gap-1.5">
          <Shield className="size-3.5" /> Generar garantía
        </button>
      </div>

      {/* Layout */}
      <div className="mt-4 grid items-start gap-3 lg:grid-cols-[1fr_380px]">
        <div className="flex flex-col gap-3">
          {/* Cliente */}
          <div className="iblock">
            <div className="ib-head">
              <div className="ib-ico"><User className="size-3.5" strokeWidth={2} /></div>
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

          {/* Productos vendidos */}
          <div className="iblock">
            <div className="ib-head">
              <div className="ib-ico"><Package className="size-3.5" strokeWidth={2} /></div>
              <div className="ib-title">Productos vendidos</div>
              <div className="ib-aux">{d.productos.length} items</div>
            </div>
            <table className="prod-tbl">
              <tbody>
                {d.productos.map((p) => (
                  <tr key={p.sku}>
                    <td style={{ width: 130 }}>
                      <span className="p-sku">{p.sku}</span>
                      <div className="p-meta">{p.meta}</div>
                    </td>
                    <td><div className="p-nm">{p.nombre}</div></td>
                    <td className="p-pr" style={{ width: 160 }}>
                      ×{p.qty} · {formatCOP(p.unit)}
                    </td>
                    <td className="p-sub" style={{ width: 130 }}>{formatCOP(p.subtotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="totals">
              <div className="ln"><span>Subtotal</span><span className="v">{formatCOP(d.subtotal)}</span></div>
              <div className="ln"><span>IVA 19%</span><span className="v">{formatCOP(d.iva)}</span></div>
              <div className="ln tot"><span>Total</span><span className="v">{formatCOP(d.total)}</span></div>
            </div>
          </div>

          {/* Pago */}
          <div className="iblock">
            <div className="ib-head">
              <div className="ib-ico succ"><Wallet className="size-3.5" strokeWidth={2} /></div>
              <div className="ib-title">Pago</div>
              <div className="ib-aux">Transferencia · 1 movimiento</div>
            </div>
            <div className="pay-row">
              <span className="pdate">{d.pago.fecha}</span>
              <span className="pay-pill transferencia"><span className="dot" />{d.pago.label}</span>
              <span className="pamt">{formatCOP(d.total)}</span>
            </div>
            <div className="mt-2 font-mono text-[11px] text-muted-foreground">
              Ref. transferencia: {d.pago.ref} · Cuenta destino: {d.pago.cuenta}
            </div>
          </div>

          {/* Vinculaciones */}
          <div className="iblock info-tint">
            <div className="ib-head">
              <div className="ib-ico info"><Link2 className="size-3.5" strokeWidth={2} /></div>
              <div className="ib-title">Vinculaciones del ciclo comercial</div>
            </div>
            <div className="vinc-link-grid">
              <VincLink kind={d.vinculos.origen.kind} num={d.vinculos.origen.num} estado={d.vinculos.origen.estado}
                       to="/ops/cotizaciones/$id" params={{ id: "Cot-1042" }} />
              <VincLink kind={d.vinculos.ot.kind} num={d.vinculos.ot.num} estado={d.vinculos.ot.estado} />
              <VincLink kind={d.vinculos.recibo.kind} num={d.vinculos.recibo.num} estado={d.vinculos.recibo.estado} />
            </div>
          </div>

          {/* Historial */}
          <div className="iblock">
            <div className="ib-head">
              <div className="ib-ico"><Activity className="size-3.5" strokeWidth={2} /></div>
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

        {/* Recibo preview (sticky) */}
        <aside className="pdf-wrap sticky top-4">
          <header className="pdf-head">
            <div>
              <div className="pdf-eyebrow">Preview del recibo</div>
              <div className="pdf-title">Rec-1284 · V-2847</div>
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
              <div className="my-3 flex items-end justify-between border-y border-dashed border-[#DADCE3] py-3">
                <div>
                  <div className="pdf-title-main">RECIBO</div>
                  <div className="pdf-title-num">{d.vinculos.recibo.num} · {d.num}</div>
                </div>
                <div className="text-right">
                  <div className="pdf-eyebrow-print">Fecha</div>
                  <div className="pdf-meta-val">14 may 2026</div>
                  <div className="pdf-meta-val sans" style={{ marginTop: 2 }}>14:23</div>
                </div>
              </div>
              <div className="mb-3 grid grid-cols-2 gap-4">
                <div>
                  <div className="pdf-eyebrow-print">Cliente</div>
                  <div className="pdf-cli-name">{d.cliente.razon}</div>
                  <div className="pdf-cli-line">NIT {d.cliente.nit}</div>
                  <div className="pdf-cli-line">{d.cliente.tel}</div>
                </div>
                <div>
                  <div className="pdf-eyebrow-print">Método</div>
                  <div className="pdf-meta-val sans">Transferencia · Bancolombia</div>
                  <div className="pdf-cli-line">Ref. {d.pago.ref}</div>
                </div>
              </div>
              <table className="pdf-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th className="c" style={{ width: 36 }}>Cant</th>
                    <th className="r" style={{ width: 70 }}>Unit</th>
                    <th className="r" style={{ width: 78 }}>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {d.productos.map((p) => (
                    <tr key={p.sku}>
                      <td>{p.nombre}<div className="mono" style={{ fontSize: 8, color: "#5C6070" }}>{p.sku}</div></td>
                      <td className="c">{p.qty}</td>
                      <td className="r">{formatCOP(p.unit)}</td>
                      <td className="r sub">{formatCOP(p.subtotal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end">
                <table className="pdf-totals-tbl">
                  <tbody>
                    <tr><td>Subtotal</td><td>{formatCOP(d.subtotal)}</td></tr>
                    <tr><td>IVA 19%</td><td>{formatCOP(d.iva)}</td></tr>
                    <tr className="tot"><td>Total</td><td>{formatCOP(d.total)}</td></tr>
                  </tbody>
                </table>
              </div>
              <div className="pdf-footer-page mt-6">Página 1 de 1 · CHV · {d.vinculos.recibo.num}</div>
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

function VincLink({
  kind, num, estado, to, params,
}: {
  kind: string; num: string; estado: string;
  to?: string; params?: Record<string, string>;
}) {
  const body = (
    <>
      <span className="vlk">{kind}</span>
      <span className="vpill">{num}</span>
      <span className="vst">{estado}</span>
    </>
  );
  if (to) {
    return (
      <Link to={to as never} params={params as never} className="vinc-link hover:bg-muted/40">
        {body}
      </Link>
    );
  }
  return <div className="vinc-link">{body}</div>;
}
