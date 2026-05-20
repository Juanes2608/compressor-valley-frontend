import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeftCircle, ArrowRight, Check, Search, ScanLine, Trash2 } from "lucide-react";
import { NUEVA_OC } from "@/lib/compras-data";
import { formatCOP } from "@/lib/format";

export const Route = createFileRoute("/ops/compras/nueva")({
  head: () => ({ meta: [{ title: "Nueva compra · CHV" }] }),
  component: ComprasNueva,
});

function ComprasNueva() {
  const subtotal = NUEVA_OC.catalogo.reduce((s, p) => s + p.cant * p.costo, 0);
  const totalItems = NUEVA_OC.catalogo.reduce((s, p) => s + p.cant, 0);
  const iva = Math.round(subtotal * 0.19);
  const total = subtotal + iva;

  return (
    <div className="flex h-full flex-col gap-4 px-7 pb-14 pt-5">
      <Link to="/ops/compras" className="back-btn inline-flex items-center gap-1.5">
        <ArrowLeftCircle className="size-3.5" /> Volver a Compras
      </Link>

      {/* Page header */}
      <div className="flex items-end justify-between gap-6 border-b border-[--n-100] pb-3.5">
        <div>
          <h1 className="m-0 text-[22px] font-semibold tracking-[-0.01em] text-[--n-950]">
            Nueva compra · <span className="font-mono text-[20px]">{NUEVA_OC.num}</span>
          </h1>
          <div className="mt-1 text-[13px] text-[--n-500]">
            Proveedor · <b className="font-medium text-[--n-700]">{NUEVA_OC.proveedor}</b> · Sede destino <b className="font-medium text-[--n-700]">{NUEVA_OC.destino}</b>
          </div>
        </div>
      </div>

      {/* Stepper */}
      <div className="stepper">
        <div className="step done"><div className="step-dot"><Check className="size-3" strokeWidth={3} /></div><div className="step-lbl">Proveedor</div></div>
        <div className="step-line done" />
        <div className="step active"><div className="step-dot">2</div><div className="step-lbl">Productos</div></div>
        <div className="step-line" />
        <div className="step todo"><div className="step-dot">3</div><div className="step-lbl">Confirmación</div></div>
      </div>

      {/* Wizard grid */}
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[1fr_340px]">
        {/* Card · productos */}
        <div className="iblock flex flex-col gap-3.5 p-5">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-[--n-300]">Datos del proveedor (paso 1 confirmado)</span>
          <div className="grid grid-cols-2 gap-3 gap-x-3.5">
            <Field label="Proveedor"><input className="finput sans locked" value={NUEVA_OC.proveedor} readOnly /></Field>
            <Field label="NIT"><input className="finput locked" value={NUEVA_OC.nit} readOnly /></Field>
            <Field label="Condiciones de pago"><input className="finput sans locked" value={NUEVA_OC.pago} readOnly /></Field>
            <Field label="Fecha entrega estimada"><input className="finput" defaultValue={NUEVA_OC.entrega} /></Field>
          </div>

          <div className="my-1 h-px bg-[--n-100]" />

          <div>
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-[--n-300]">Productos a ordenar</span>
            <h2 className="m-0 mt-0.5 text-[17px] font-medium text-[--n-950]">Catálogo del proveedor</h2>
          </div>

          {/* Search */}
          <div className="flex items-stretch">
            <div className="flex h-11 flex-1 items-center gap-2.5 rounded-l-[10px] border border-r-0 border-[--n-150] bg-[--n-0] px-3.5">
              <Search className="size-4 text-[--n-400]" />
              <input placeholder="Buscar SKU, producto o ref. proveedor..." className="flex-1 border-none bg-transparent text-[14px] text-[--n-700] outline-none" />
            </div>
            <button className="inline-flex h-11 items-center gap-1.5 rounded-r-[10px] bg-[--p-600] px-4 text-[13px] font-medium text-white">
              <ScanLine className="size-3.5" /> Escanear QR
            </button>
          </div>

          {/* Catálogo */}
          <div className="overflow-hidden rounded-[10px] border border-[--n-150]">
            <table className="prod-tbl">
              <thead>
                <tr>
                  <th style={{ width: 110 }}>SKU</th>
                  <th>Producto</th>
                  <th className="r" style={{ width: 110 }}>Cant pedida</th>
                  <th className="r" style={{ width: 130 }}>Costo unit</th>
                  <th className="r" style={{ width: 114 }}>Subtotal</th>
                  <th style={{ width: 42 }} />
                </tr>
              </thead>
              <tbody>
                {NUEVA_OC.catalogo.map((p) => (
                  <tr key={p.sku}>
                    <td><span className="font-mono text-[11.5px] font-medium text-[--n-700]">{p.sku}</span></td>
                    <td>
                      <div className="text-[12.5px] font-medium leading-tight text-[--n-950]">{p.nombre}</div>
                      <div className="font-mono text-[11px] text-[--n-500]">Ref. prov · {p.ref}</div>
                    </td>
                    <td className="text-right">
                      <div className="inline-flex h-[30px] items-center overflow-hidden rounded-md border border-[--n-150] bg-[--n-0]">
                        <button className="h-full w-6 bg-[--n-25] text-[14px] text-[--n-700]">−</button>
                        <input defaultValue={p.cant} className="w-10 border-none bg-transparent text-center font-mono text-[13px] font-medium outline-none" />
                        <button className="h-full w-6 bg-[--n-25] text-[14px] text-[--n-700]">+</button>
                      </div>
                    </td>
                    <td className="text-right">
                      <input
                        defaultValue={formatCOP(p.costo)}
                        className="h-[30px] w-[110px] rounded-md border border-[--n-150] bg-[--n-0] px-2 text-right font-mono text-[12.5px] font-medium text-[--n-950] outline-none"
                      />
                    </td>
                    <td className="text-right"><span className="font-mono text-[13px] font-medium text-[--n-950]">{formatCOP(p.cant * p.costo)}</span></td>
                    <td><button className="inline-flex size-7 items-center justify-center rounded-md text-[--n-400] hover:bg-[--n-50]"><Trash2 className="size-3.5" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cart */}
        <aside className="cart">
          <span className="cart-eyebrow">Resumen de la compra</span>
          <div className="text-[12px] text-[--n-500]">{totalItems} items · {NUEVA_OC.catalogo.length} productos</div>
          <div className="cart-line"><span>Subtotal</span><span className="v">{formatCOP(subtotal)}</span></div>
          <div className="cart-line"><span>IVA 19%</span><span className="v">{formatCOP(iva)}</span></div>
          <div className="cart-line tot"><span>Total estimado</span><span className="v">{formatCOP(total)}</span></div>
          <button className="btn-pri mt-1.5 inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-lg border border-transparent text-[13px] font-medium">
            Continuar a confirmación <ArrowRight className="size-3.5" />
          </button>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flbl">{label}</label>
      {children}
    </div>
  );
}
