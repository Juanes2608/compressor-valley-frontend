import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeftCircle, Search, QrCode, Trash2, ChevronRight, Star, AlertTriangle, Minus, Plus } from "lucide-react";
import { V_2847 } from "@/lib/ventas-data";
import { formatCOP } from "@/lib/format";

export const Route = createFileRoute("/ops/ventas/nueva")({
  head: () => ({ meta: [{ title: "Nueva venta · CHV" }] }),
  component: NuevaVenta,
});

function NuevaVenta() {
  const items = V_2847.productos;
  const subtotal = V_2847.subtotal;
  const iva = V_2847.iva;
  const total = V_2847.total;

  return (
    <div className="px-7 pb-16 pt-5">
      <Link to="/ops/ventas" className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-muted-foreground hover:text-foreground">
        <ArrowLeftCircle className="size-3.5" /> Volver a Ventas
      </Link>

      <div className="mt-4 flex items-end justify-between gap-6 border-b border-border pb-4">
        <div>
          <h1 className="m-0 text-[22px] font-semibold tracking-[-0.01em] text-foreground">Nueva venta</h1>
          <p className="mt-1.5 text-[13px] text-muted-foreground">
            Vendedor · <b className="font-mono font-medium text-foreground">María L.</b> · Sede{" "}
            <b className="font-mono font-medium text-foreground">WH-01 Cali</b>
          </p>
        </div>
      </div>

      {/* Stepper */}
      <div className="stepper mt-5">
        <div className="step active"><div className="step-dot">1</div><div className="step-lbl">Cliente y productos</div></div>
        <div className="step-line" />
        <div className="step todo"><div className="step-dot">2</div><div className="step-lbl">Pago</div></div>
        <div className="step-line" />
        <div className="step todo"><div className="step-dot">3</div><div className="step-lbl">Confirmar</div></div>
      </div>

      {/* Banner cliente recurrente */}
      <div className="banner-info mt-4">
        <Star className="size-4 shrink-0" strokeWidth={2} />
        <div className="body">
          <b>Industrial XYZ S.A.S.</b> ha comprado <b>8</b> veces antes. Última compra hace 12 días por <b>$ 620.500</b>.
          <sub>Cliente recurrente · descuento de fidelidad aplicable</sub>
        </div>
        <button className="btn-out text-[12px]">Ver historial</button>
      </div>

      {/* Grid */}
      <div className="mt-4 grid items-start gap-5 lg:grid-cols-[1fr_340px]">
        {/* Left card */}
        <div className="iblock space-y-4">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">Datos del cliente</div>
            <h2 className="mt-1 text-[17px] font-medium text-foreground">Cliente y productos</h2>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Cliente *" full><input className="finput sans" defaultValue={V_2847.cliente.razon} /></Field>
            <Field label="Teléfono *"><input className="finput" defaultValue={V_2847.cliente.tel} /></Field>
            <Field label="NIT"><input className="finput" defaultValue={V_2847.cliente.nit} /></Field>
            <Field label="Notas" full>
              <textarea className="ftextarea" defaultValue="Entrega en almacén principal Yumbo. Coordinar con Sandra Pérez." />
            </Field>
          </div>

          <div className="h-px bg-border" />

          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">Productos a vender</div>

          {/* Search prod */}
          <div className="flex items-stretch">
            <div className="flex h-11 flex-1 items-center gap-2.5 rounded-l-[10px] border border-r-0 border-border bg-card px-3.5">
              <Search className="size-4 text-muted-foreground" />
              <input
                placeholder="Buscar SKU, producto o escanea QR…"
                className="min-w-0 flex-1 border-0 bg-transparent text-[14px] outline-none placeholder:text-muted-foreground/60"
              />
            </div>
            <button className="btn-pri inline-flex h-11 items-center gap-1.5 rounded-l-none rounded-r-[10px] px-4">
              <QrCode className="size-3.5" /> Escanear QR
            </button>
          </div>

          {/* Products table */}
          <div className="overflow-hidden rounded-[10px] border border-border">
            <table className="prod-tbl">
              <thead>
                <tr>
                  <th style={{ width: 110 }}>SKU</th>
                  <th>Producto</th>
                  <th className="r" style={{ width: 110 }}>Cant</th>
                  <th className="r" style={{ width: 110 }}>Unit</th>
                  <th className="r" style={{ width: 120 }}>Subtotal</th>
                  <th style={{ width: 42 }} />
                </tr>
              </thead>
              <tbody>
                {items.map((it, i) => {
                  const isLow = i === 2; // manguera con stock bajo (canonical)
                  return (
                    <tr key={it.sku}>
                      <td><span className="p-sku">{it.sku}</span></td>
                      <td>
                        <div className="p-nm">{it.nombre}</div>
                        <div className="p-meta">{it.meta}</div>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <QtyControl value={it.qty} danger={isLow} />
                        {isLow && (
                          <div className="mt-1 inline-flex items-center gap-1 font-mono text-[10.5px] text-[--warn-700]">
                            <AlertTriangle className="size-3" /> Solo 2 en WH-01 · 5 total
                          </div>
                        )}
                      </td>
                      <td className="p-pr">{formatCOP(it.unit)}</td>
                      <td className="p-sub" style={isLow ? { color: "var(--dang-700)" } : {}}>{formatCOP(it.subtotal)}</td>
                      <td>
                        <button className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground">
                          <Trash2 className="size-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right cart */}
        <aside className="cart">
          <span className="cart-eyebrow">Resumen</span>
          <div className="text-[12px] text-muted-foreground">{items.length} productos</div>
          <div className="cart-line"><span>Subtotal</span><span className="v">{formatCOP(subtotal)}</span></div>
          <div className="cart-line"><span>IVA 19%</span><span className="v">{formatCOP(iva)}</span></div>
          <div className="cart-line tot"><span>Total</span><span className="v">{formatCOP(total)}</span></div>
          <button className="btn-pri mt-1 inline-flex h-11 w-full items-center justify-center gap-2">
            Continuar al pago <ChevronRight className="size-3.5" />
          </button>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, full, children }: { label: string; full?: boolean; children: React.ReactNode }) {
  return (
    <div className={["flex flex-col gap-1.5", full ? "sm:col-span-2" : ""].join(" ")}>
      <label className="font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}

function QtyControl({ value, danger }: { value: number; danger?: boolean }) {
  return (
    <div
      className={[
        "inline-flex h-8 items-center overflow-hidden rounded-md border",
        danger
          ? "border-[--dang-border] bg-[--dang-50]"
          : "border-border bg-card",
      ].join(" ")}
    >
      <button className="grid h-full w-7 place-items-center text-foreground/70 hover:bg-muted">
        <Minus className="size-3" />
      </button>
      <input
        defaultValue={value}
        className={[
          "w-9 border-0 bg-transparent text-center font-mono text-[13px] font-medium outline-none",
          danger ? "text-[--dang-700]" : "text-foreground",
        ].join(" ")}
      />
      <button className="grid h-full w-7 place-items-center text-foreground/70 hover:bg-muted">
        <Plus className="size-3" />
      </button>
    </div>
  );
}
