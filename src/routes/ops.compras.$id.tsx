import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeftCircle, Printer, Download, Shield, Truck, Package, Clock, FileText, Activity, ScanLine } from "lucide-react";
import { OC_1837_DETALLE, COMPRAS_ROWS } from "@/lib/compras-data";
import { formatCOP } from "@/lib/format";

export const Route = createFileRoute("/ops/compras/$id")({
  head: ({ params }) => ({ meta: [{ title: `${params.id} · Compras · CHV` }] }),
  component: ComprasDetalle,
});

function ComprasDetalle() {
  const { id } = Route.useParams();
  const isCanonical = id === "OC-1837";
  const row = COMPRAS_ROWS.find((r) => r.num === id);
  const d = OC_1837_DETALLE;

  // For non-canonical IDs, allow drill into recepción if transito/parcial
  if (!isCanonical && row) {
    return <ComprasDetalleStub id={id} />;
  }

  return (
    <div className="flex h-full flex-col gap-4 px-7 pb-14 pt-5">
      <Link to="/ops/compras" className="back-btn inline-flex items-center gap-1.5">
        <ArrowLeftCircle className="size-3.5" /> Volver a Compras
      </Link>

      {/* Detail head */}
      <div className="flex items-start gap-5 border-b border-[--n-100] pb-4">
        <div className="flex-1">
          <div className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[--n-300]">Compra</div>
          <div className="mb-2 font-mono text-[28px] font-medium leading-none tracking-[-0.01em] text-[--n-950]">{d.num}</div>
          <div className="mb-1.5 text-[22px] font-medium tracking-[-0.01em] text-[--n-950]">{d.proveedor.nombre}</div>
          <div className="text-[13px] text-[--n-500]">
            Recibida completa el <b className="font-mono font-medium text-[--n-700]">{d.recibida}</b> · 18/18 items ingresados al inventario
          </div>
        </div>
        <div className="flex flex-col items-end gap-3">
          <span className="s-pill s-apr px-3.5 py-1.5 text-[13px]"><span className="dot" />Recibida completa</span>
          <div className="text-right">
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[--n-300]">Total</div>
            <div className="font-mono text-[22px] font-medium leading-tight text-[--n-950]">{formatCOP(d.total)}</div>
          </div>
        </div>
      </div>

      {/* Actions row */}
      <div className="flex flex-wrap gap-2 rounded-[10px] border border-[--n-150] bg-[--n-50] px-3.5 py-3">
        <button className="btn-out inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[13px] font-medium">
          <Printer className="size-3.5" /> Imprimir orden
        </button>
        <button className="btn-out inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[13px] font-medium">
          <Download className="size-3.5" /> Descargar comprobante
        </button>
        <button className="inline-flex items-center gap-1.5 rounded-lg border border-[--warn-border] bg-[--n-0] px-3 py-2 text-[13px] font-medium text-[--warn-700]">
          <Shield className="size-3.5" /> Iniciar devolución por garantía
        </button>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[540px_1fr]">
        {/* Left column */}
        <div className="flex flex-col gap-3">
          {/* Proveedor */}
          <div className="iblock">
            <div className="ib-head">
              <div className="flex size-[26px] items-center justify-center rounded-md bg-[--n-50] text-[--n-700]"><Truck className="size-3.5" /></div>
              <div className="ib-title">Proveedor</div>
            </div>
            <div className="grid grid-cols-2 gap-3 gap-x-3.5">
              <div className="col-span-2"><Lk>Razón social</Lk><Vl>{d.proveedor.nombre}</Vl></div>
              <div><Lk>NIT</Lk><Vl mono>{d.proveedor.nit}</Vl></div>
              <div><Lk>Tel</Lk><Vl mono>{d.proveedor.tel}</Vl></div>
              <div><Lk>Contacto</Lk><Vl>{d.proveedor.contacto}</Vl></div>
              <div><Lk>Pago</Lk><div className="text-[12px] text-[--n-500]">{d.proveedor.pago}</div></div>
            </div>
          </div>

          {/* Items */}
          <div className="iblock">
            <div className="ib-head">
              <div className="flex size-[26px] items-center justify-center rounded-md bg-[--n-50] text-[--n-700]"><Package className="size-3.5" /></div>
              <div className="ib-title">Items recibidos</div>
              <div className="ml-auto font-mono text-[11.5px] text-[--n-500]">{d.items.length} items · 100% recibidos</div>
            </div>
            <table className="prod-tbl">
              <tbody>
                {d.items.map((it) => (
                  <tr key={it.sku}>
                    <td>
                      <span className="font-mono text-[11.5px] font-medium text-[--n-700]">{it.sku}</span>
                      <div className="font-mono text-[11px] text-[--n-500]">{it.modelo}</div>
                    </td>
                    <td><div className="text-[12.5px] font-medium leading-tight text-[--n-950]">{it.nombre}</div></td>
                    <td className="text-right font-mono text-[14px] font-medium text-[--n-700]">×{it.cant}</td>
                    <td className="text-right font-mono text-[13px] font-medium text-[--n-950]">{formatCOP(it.sub)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-3 flex flex-col gap-1 border-t border-dashed border-[--n-150] pt-3">
              <Row label="Subtotal" v={formatCOP(d.subtotal)} />
              <Row label="IVA 19%" v={formatCOP(d.iva)} />
              <div className="mt-1 flex justify-between border-t border-[--n-150] pt-2 font-medium text-[--n-950]">
                <span>Total</span>
                <span className="font-mono text-[18px]">{formatCOP(d.total)}</span>
              </div>
            </div>
          </div>

          {/* Fechas clave */}
          <div className="iblock">
            <div className="ib-head">
              <div className="flex size-[26px] items-center justify-center rounded-md bg-[--n-50] text-[--n-700]"><Clock className="size-3.5" /></div>
              <div className="ib-title">Fechas clave</div>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              <Fact lk="Orden creada"     v={d.fechas.creada} />
              <Fact lk="Enviada a prov."  v={d.fechas.enviada} />
              <Fact lk="Recibida"         v={d.fechas.recibida} tone="succ" />
            </div>
          </div>

          {/* Notas */}
          <div className="iblock">
            <div className="ib-head">
              <div className="flex size-[26px] items-center justify-center rounded-md bg-[--n-50] text-[--n-700]"><FileText className="size-3.5" /></div>
              <div className="ib-title">Notas de recepción</div>
            </div>
            <div className="rounded-lg border border-[--n-100] bg-[--n-50] px-3.5 py-3 text-[12.5px] leading-[1.55] text-[--n-700]">
              {d.notas}
            </div>
          </div>
        </div>

        {/* Right column · Timeline */}
        <div className="iblock sticky top-4">
          <div className="ib-head">
            <div className="flex size-[26px] items-center justify-center rounded-md bg-[--n-50] text-[--n-700]"><Activity className="size-3.5" /></div>
            <div className="ib-title">Timeline detallado</div>
          </div>
          <div className="flex flex-col pl-1.5">
            {d.timeline.map((t, i) => (
              <div key={i} className="tl-row">
                <span className={`tl-dot ${t.tone === "succ" ? "succ" : t.tone === "prog" ? "prog" : "info"}`} />
                <div>
                  <div className="tl-act">{t.act}</div>
                  <div className="tl-meta">{t.meta}</div>
                </div>
                <span className="tl-time">{t.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Lk({ children }: { children: React.ReactNode }) {
  return <div className="mb-0.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-[--n-300]">{children}</div>;
}
function Vl({ children, mono }: { children: React.ReactNode; mono?: boolean }) {
  return <div className={`text-[13px] font-medium text-[--n-950] ${mono ? "font-mono" : ""}`}>{children}</div>;
}
function Row({ label, v }: { label: string; v: string }) {
  return (
    <div className="flex justify-between text-[12px] text-[--n-500]">
      <span>{label}</span>
      <span className="font-mono font-medium text-[--n-700]">{v}</span>
    </div>
  );
}
function Fact({ lk, v, tone }: { lk: string; v: string; tone?: "succ" }) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-[--n-100] bg-[--n-50] p-3">
      <span className="font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-[--n-500]">{lk}</span>
      <span className={`font-mono text-[13.5px] font-medium ${tone === "succ" ? "text-[--succ-700]" : "text-[--n-950]"}`}>{v}</span>
    </div>
  );
}

/* ============ Stub for non-canonical IDs ============ */
function ComprasDetalleStub({ id }: { id: string }) {
  const row = COMPRAS_ROWS.find((r) => r.num === id);
  if (!row) {
    return (
      <div className="p-7 text-[--n-500]">
        No se encontró la orden {id}. <Link to="/ops/compras" className="text-[--p-600] underline">Volver</Link>
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col gap-4 px-7 pb-14 pt-5">
      <Link to="/ops/compras" className="back-btn inline-flex items-center gap-1.5">
        <ArrowLeftCircle className="size-3.5" /> Volver a Compras
      </Link>
      <div className="flex items-start gap-5 border-b border-[--n-100] pb-4">
        <div className="flex-1">
          <div className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[--n-300]">Compra</div>
          <div className="mb-2 font-mono text-[28px] font-medium leading-none tracking-[-0.01em] text-[--n-950]">{row.num}</div>
          <div className="mb-1.5 text-[22px] font-medium tracking-[-0.01em] text-[--n-950]">{row.proveedor.nombre}</div>
          <div className="text-[13px] text-[--n-500]">
            {row.productos} · Entrega est. <b className="font-mono font-medium text-[--n-700]">{row.entregaEst}</b>
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[--n-300]">Total</div>
          <div className="font-mono text-[22px] font-medium text-[--n-950]">{formatCOP(row.total)}</div>
        </div>
      </div>
      {(row.estado === "transito" || row.estado === "parcial") && (
        <div className="iblock">
          <div className="ib-head">
            <div className="flex size-[26px] items-center justify-center rounded-md bg-[--info-50] text-[--info-600]"><ScanLine className="size-3.5" /></div>
            <div className="ib-title">Recepción pendiente</div>
          </div>
          <p className="mb-3 text-[13px] text-[--n-500]">Inicia la recepción para verificar los ítems contra la orden.</p>
          <Link to="/ops/compras/$id/recepcion" params={{ id: row.num }} className="btn-pri inline-flex items-center gap-1.5 rounded-lg border border-transparent px-3.5 py-2 text-[13px] font-medium">
            Iniciar recepción
          </Link>
        </div>
      )}
      <div className="rounded-[10px] border border-dashed border-[--n-200] bg-[--n-25] px-5 py-8 text-center text-[13px] text-[--n-500]">
        Detalle completo disponible para <span className="font-mono text-[--n-700]">OC-1837</span> (canónico).
      </div>
    </div>
  );
}
