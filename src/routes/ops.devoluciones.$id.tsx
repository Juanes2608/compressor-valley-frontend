import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeftCircle, Check, X, Printer, Camera, Plus, Clock, User, MessageSquare, Box, Info } from "lucide-react";
import { DEV_C_0421, DEV_ROWS } from "@/lib/devoluciones-data";
import { formatCOP } from "@/lib/format";

export const Route = createFileRoute("/ops/devoluciones/$id")({
  head: ({ params }) => ({ meta: [{ title: `${params.id} · Devolución · CHV` }] }),
  component: DevDetalle,
});

function DevDetalle() {
  const params = Route.useParams();
  const row = DEV_ROWS.find((r) => r.num === params.id);
  const d = DEV_C_0421; // detalle canónico para DEV-C-0421; fallback de visualización para otros IDs

  const num = row?.num ?? d.num;
  const cliente = row?.cliente ?? d.cliente.razon;
  const producto = row?.producto ?? d.producto.nombre;
  const valor = row?.valor ?? d.valor;
  const origen = row?.origen ?? d.cliente.ventaOrigen;

  return (
    <div className="flex h-full flex-col">
      {/* breadcrumb */}
      <div className="border-b border-border bg-card px-7 pt-5">
        <Link
          to="/ops/devoluciones"
          className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeftCircle className="size-3.5" /> Volver a Devoluciones
        </Link>
      </div>

      {/* header */}
      <div className="flex flex-wrap items-start gap-6 border-b border-border bg-card px-7 pb-5 pt-3">
        <div className="min-w-0 flex-1">
          <div className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted-foreground">
            Devolución de cliente
          </div>
          <h1 className="mt-1 font-mono text-[24px] font-semibold tracking-tight text-foreground">{num}</h1>
          <p className="mt-1.5 text-[13px] text-muted-foreground">
            <b className="font-medium text-foreground">{cliente}</b> · {producto} · Vinculada a{" "}
            <Link
              to={origen.kind === "ot" ? "/ops/ordenes-trabajo/$id" : "/ops/ventas/$id"}
              params={{ id: origen.num }}
              className={`link-pill ${origen.kind} align-middle`}
            >
              {origen.num}
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="s-pill s-ven text-[12.5px]">
            <span className="dot animate-pulse" />
            {row ? row.estadoLabel : d.estado}
          </span>
          <div className="text-right">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-muted-foreground">Valor</div>
            <div className="font-mono text-[20px] font-semibold tabular-nums text-foreground">
              {valor === null ? "—" : formatCOP(valor)}
            </div>
          </div>
        </div>
      </div>

      {/* action bar */}
      <div className="flex flex-wrap items-center gap-2.5 border-b border-border bg-card px-7 py-3">
        <button className="inline-flex h-9 items-center gap-1.5 rounded-md bg-[--succ-600] px-3.5 text-[13px] font-medium text-white hover:bg-[--succ-700]">
          <Check className="size-3.5" /> Aprobar devolución
        </button>
        <button className="inline-flex h-9 items-center gap-1.5 rounded-md border border-[--dang-200] bg-card px-3.5 text-[13px] font-medium text-[--dang-600] hover:bg-[--dang-50] dark:border-[rgba(240,68,56,.35)] dark:text-[#FDA29B] dark:hover:bg-[rgba(240,68,56,.08)]">
          <X className="size-3.5" /> Rechazar devolución
        </button>
        <button className="btn-out inline-flex h-9 items-center gap-1.5 px-3.5 text-[13px]">
          <Printer className="size-3.5" /> Imprimir comprobante
        </button>
      </div>

      {/* layout */}
      <div className="flex-1 overflow-auto px-7 py-5">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
          {/* col left */}
          <div className="flex flex-col gap-4">
            {/* Producto */}
            <div className="iblock">
              <SectionHeader icon={<Box className="size-3.5" />} title="Producto devuelto" />
              <div className="mt-3 flex items-center gap-4 rounded-md border border-border bg-muted/30 p-3">
                <span className="font-mono text-[12px] font-medium text-foreground">{d.producto.sku}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-[13.5px] font-medium text-foreground">{d.producto.nombre}</div>
                  <div className="text-[12px] text-muted-foreground">{d.producto.sub}</div>
                </div>
                <span className="font-mono text-[13.5px] font-medium tabular-nums text-foreground">
                  {formatCOP(d.producto.valor)}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="grid size-16 place-items-center rounded-md border border-border bg-muted/40 text-muted-foreground"
                  >
                    <Camera className="size-5" strokeWidth={1.5} />
                  </div>
                ))}
                <button className="grid size-16 place-items-center rounded-md border border-dashed border-border text-muted-foreground hover:border-foreground hover:text-foreground">
                  <Plus className="size-5" strokeWidth={1.5} />
                </button>
              </div>
              <p className="mt-2 text-[11.5px] text-muted-foreground">
                Fotos del producto al momento de recepción. Validar estado antes de aprobar devolución.
              </p>
            </div>

            {/* Cliente */}
            <div className="iblock">
              <SectionHeader icon={<User className="size-3.5" />} title="Cliente y venta origen" />
              <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
                <Field className="col-span-2" label="Razón social" value={d.cliente.razon} bold />
                <Field label="NIT" value={d.cliente.nit} mono />
                <Field label="Tel" value={d.cliente.telefono} mono />
                <Field label="Contacto" value={d.cliente.contacto} />
                <Field
                  label="Venta origen"
                  value={
                    <Link
                      to="/ops/ventas/$id"
                      params={{ id: d.cliente.ventaOrigen.num }}
                      className="link-pill v"
                    >
                      {d.cliente.ventaOrigen.num}
                    </Link>
                  }
                />
                <Field label="Fecha venta" value={d.cliente.fechaVenta} mono />
                <Field label="Vendedor" value={d.cliente.vendedor} />
                <Field label="Monto venta" value={formatCOP(d.cliente.montoVenta)} mono />
              </div>
              <div className="mt-3 flex items-center gap-2 rounded-md border border-[--info-100] bg-[--info-50] px-3 py-2 text-[12px] text-[--info-700] dark:border-[rgba(46,144,250,.25)] dark:bg-[rgba(46,144,250,.1)] dark:text-[#7CC4FD]">
                <Clock className="size-3.5 shrink-0" />
                <span>
                  Dentro de política · <b className="font-mono font-medium">{d.politica.dias} días</b> después de compra
                  (límite {d.politica.limite} días)
                </span>
              </div>
            </div>

            {/* Motivo */}
            <div className="iblock">
              <SectionHeader icon={<MessageSquare className="size-3.5" />} title="Motivo de devolución" />
              <p className="mt-3 rounded-md border border-border bg-muted/30 px-3 py-3 text-[13px] italic leading-[1.55] text-foreground/85">
                "{d.motivo}"
              </p>
            </div>
          </div>

          {/* col right */}
          <div className="flex flex-col gap-4">
            {/* Validación física */}
            <div className="iblock">
              <SectionHeader icon={<Check className="size-3.5" />} title="Validación física" />
              <div className="mt-3 grid grid-cols-1 gap-2">
                {d.checklist.map((c) => (
                  <div
                    key={c.lbl}
                    className={[
                      "flex items-center gap-2.5 rounded-md border px-3 py-2",
                      c.warn
                        ? "border-[--warn-200] bg-[--warn-50] dark:bg-[rgba(247,144,9,.1)] dark:border-[rgba(247,144,9,.35)]"
                        : "border-border bg-muted/30",
                    ].join(" ")}
                  >
                    <span className={[
                      "grid size-5 place-items-center rounded-full text-white",
                      c.warn ? "bg-[--warn-600]" : c.ok ? "bg-[--succ-600]" : "bg-muted-foreground",
                    ].join(" ")}>
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    <span className="flex-1 text-[12.5px] font-medium text-foreground">{c.lbl}</span>
                    <span className={[
                      "font-mono text-[11px]",
                      c.warn ? "text-[--warn-700] dark:text-[#FDB022]" : "text-muted-foreground",
                    ].join(" ")}>
                      {c.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Resolución */}
            <div className="iblock">
              <SectionHeader icon={<Info className="size-3.5" />} title="Resolución propuesta" />
              <div className="mt-3 rounded-md border-2 border-[--p-600] bg-[--p-50] p-3 dark:bg-[rgba(45,60,229,.12)]">
                <div className="text-[13.5px] font-semibold text-[--p-700] dark:text-[#C2CCFF]">
                  {d.resolucion.label}
                </div>
                <div className="mt-1 text-[12px] text-foreground/80">
                  Stock disponible: <b className="font-mono">{d.resolucion.stock}</b> unidades en {d.resolucion.sede}.
                  Reposición inmediata al cliente.
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2 rounded-md border border-[--succ-200] bg-[--succ-50] px-3 py-2 text-[12px] text-[--succ-700] dark:bg-[rgba(18,183,106,.1)] dark:border-[rgba(18,183,106,.35)] dark:text-[#6CE9A6]">
                <Check className="size-3.5 shrink-0" />
                <span>
                  Stock confirmado · <b className="font-mono font-medium">{d.resolucion.stock} u</b> en bodega {d.resolucion.sede}
                </span>
              </div>
            </div>

            {/* Timeline */}
            <div className="iblock">
              <SectionHeader icon={<Clock className="size-3.5" />} title="Historial" />
              <ol className="mt-3 flex flex-col gap-3">
                {d.timeline.map((t, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      className={[
                        "mt-1 size-2.5 shrink-0 rounded-full ring-2 ring-card",
                        t.dot === "info" ? "bg-[--info-500]" :
                        t.dot === "warn" ? "bg-[--warn-500]" :
                        t.dot === "succ" ? "bg-[--succ-500]" :
                        "bg-muted-foreground",
                      ].join(" ")}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-[12.5px] font-medium text-foreground">{t.act}</div>
                      <div className="font-mono text-[10.5px] text-muted-foreground">{t.meta}</div>
                    </div>
                    <div className="font-mono text-[10.5px] text-muted-foreground">{t.time}</div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-border pb-2.5">
      <span className="grid size-6 place-items-center rounded-md bg-muted text-muted-foreground">{icon}</span>
      <span className="text-[13px] font-semibold text-foreground">{title}</span>
    </div>
  );
}

function Field({
  label, value, mono, bold, className,
}: {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
  bold?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{label}</div>
      <div className={[
        "mt-0.5 text-[13px] text-foreground",
        bold ? "font-semibold" : "",
        mono ? "font-mono" : "",
      ].join(" ")}>
        {value}
      </div>
    </div>
  );
}
