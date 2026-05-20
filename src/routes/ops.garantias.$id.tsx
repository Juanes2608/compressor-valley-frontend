import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeftCircle, Check, X, MessageSquare, Printer, Package, User, ShieldCheck,
  Activity, FileText, Paperclip, CheckSquare, ClipboardList, Wrench,
} from "lucide-react";
import { getGarantiaById, GAR_V_0042 } from "@/lib/garantias-data";
import { formatCOP } from "@/lib/format";

export const Route = createFileRoute("/ops/garantias/$id")({
  head: ({ params }) => ({ meta: [{ title: `${params.id} · Garantías · CHV` }] }),
  component: GarantiaDetalle,
});

function GarantiaDetalle() {
  const { id } = Route.useParams();
  const data = getGarantiaById(id);

  if (!data) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 p-10 text-center">
        <h1 className="text-lg font-semibold text-foreground">Garantía no encontrada</h1>
        <Link to="/ops/garantias" className="btn-out inline-flex items-center gap-1.5">
          <ArrowLeftCircle className="size-3.5" /> Volver a Garantías
        </Link>
      </div>
    );
  }

  // Si es solo row, mostrar resumen mínimo
  if (!("proceso" in data)) {
    return (
      <div className="flex h-full flex-col">
        <div className="border-b border-border bg-card px-7 py-5">
          <Link to="/ops/garantias" className="mb-2 inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground">
            <ArrowLeftCircle className="size-3.5" /> Volver a Garantías
          </Link>
          <h1 className="font-mono text-[20px] font-semibold text-foreground">{data.num}</h1>
          <p className="mt-1 text-[13px] text-muted-foreground">
            {data.tab === "ventas" ? data.cliente : data.proveedor} · {data.producto}
          </p>
        </div>
        <div className="flex-1 overflow-auto p-7">
          <div className="rounded-[10px] border border-border bg-card p-6 text-sm text-muted-foreground">
            Detalle expandido en preparación. Estado actual:{" "}
            <span className="font-medium text-foreground">{data.estadoLabel}</span>.
          </div>
        </div>
      </div>
    );
  }

  const g = data as typeof GAR_V_0042;

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card px-7 py-5">
        <Link to="/ops/garantias" className="mb-2 inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground">
          <ArrowLeftCircle className="size-3.5" /> Volver a Garantías
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="mb-0.5 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">Garantía de venta</p>
            <h1 className="font-mono text-[24px] font-semibold tracking-tight text-foreground">{g.num}</h1>
            <p className="mt-1 flex flex-wrap items-center gap-2 text-[13px] text-muted-foreground">
              {g.cliente.razon}
              <span className="text-border">·</span>
              {g.producto.nombre}
              <span className="s-pill s-borr"><span className="dot" /> {g.estado}</span>
            </p>
          </div>
          <div className="rounded-[10px] border border-[--succ-200] bg-[--succ-50] px-4 py-3 text-right dark:border-[rgba(18,183,106,.35)] dark:bg-[rgba(18,183,106,.1)]">
            <div className="text-[11px] uppercase tracking-wider text-[--succ-700] dark:text-[#6CE9A6]">Vence {g.vencimiento}</div>
            <div className="font-mono text-[26px] font-semibold leading-none text-[--succ-700] dark:text-[#6CE9A6]">
              {g.diasRestantes}
              <span className="ml-1.5 font-sans text-[11px] font-normal opacity-80">días restantes</span>
            </div>
          </div>
        </div>

        {/* Action bar */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="btn-pri inline-flex items-center gap-1.5">
            <Check className="size-3.5" /> Aprobar reclamación
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-md border border-[--dang-200] bg-card px-3 py-1.5 text-[13px] font-medium text-[--dang-700] hover:bg-[--dang-50] dark:border-[rgba(240,68,56,.35)] dark:text-[#FDA29B] dark:hover:bg-[rgba(240,68,56,.1)]">
            <X className="size-3.5" /> Rechazar reclamación
          </button>
          <button className="btn-out inline-flex items-center gap-1.5">
            <MessageSquare className="size-3.5" /> Solicitar más información
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] font-medium text-muted-foreground hover:bg-muted">
            <Printer className="size-3.5" /> Imprimir comprobante
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-background px-7 py-6">
        {/* State machine */}
        <div className="mb-6 rounded-[10px] border border-border bg-card p-4">
          <div className="mb-3 flex items-center justify-between font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">
            <span>Proceso de la reclamación</span>
            <span>Inicio · hoy 10:15</span>
          </div>
          <div className="flex items-start gap-0">
            {g.proceso.map((step, i) => (
              <div key={i} className="flex flex-1 flex-col items-center text-center">
                <div className="flex w-full items-center">
                  <div className={["h-px flex-1", i === 0 ? "bg-transparent" : step.state === "pending" ? "bg-border" : "bg-[--p-400]"].join(" ")} />
                  <div className={[
                    "flex size-8 items-center justify-center rounded-full text-[12px] font-medium",
                    step.state === "done" ? "bg-[--succ-500] text-white" :
                    step.state === "active" ? "bg-[--warn-500] text-white ring-4 ring-[--warn-100] dark:ring-[rgba(247,144,9,.2)]" :
                    "border border-border bg-card text-muted-foreground",
                  ].join(" ")}>
                    {step.state === "done" ? <Check className="size-3.5" strokeWidth={3} /> : i + 1}
                  </div>
                  <div className={["h-px flex-1", i === g.proceso.length - 1 ? "bg-transparent" : step.state === "done" ? "bg-[--p-400]" : "bg-border"].join(" ")} />
                </div>
                <div className={[
                  "mt-2 text-[12px] font-medium",
                  step.state === "active" ? "text-[--warn-700] dark:text-[#FDB022]" : "text-foreground/85",
                ].join(" ")}>{step.label}</div>
                <div className="font-mono text-[10.5px] text-muted-foreground">{step.meta}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
          <div className="flex flex-col gap-5">
            {/* Producto */}
            <Card icon={<Package className="size-4" />} title="Producto en garantía">
              <FieldGrid fields={[
                ["SKU", <span className="font-mono">{g.producto.sku}</span>],
                ["Producto", g.producto.nombre],
                ["Marca · Modelo", <>{g.producto.marca} <span className="font-mono text-muted-foreground">· {g.producto.modelo}</span></>],
                ["Número de serie", <span className="font-mono">{g.producto.serie}</span>],
                ["Fecha de instalación", <span className="font-mono">{g.producto.fechaInstalacion}</span>],
                ["Categoría", <span className="inline-flex items-center gap-1.5 rounded-md bg-[--cat-cmp-bg] px-2 py-0.5 text-[11.5px] font-medium text-[--cat-cmp-text]"><span className="size-2 rounded-sm bg-[--cat-cmp]" />{g.producto.categoria}</span>],
              ]} />
              <div className="mt-3 grid grid-cols-5 gap-2">
                {["01", "02", "03", "04"].map((n) => (
                  <div key={n} className="flex aspect-square items-end justify-start rounded-md border border-border bg-muted/30 p-1.5 font-mono text-[10px] text-muted-foreground">{n}</div>
                ))}
                <div className="flex aspect-square items-center justify-center rounded-md border border-dashed border-border bg-muted/10 text-muted-foreground">+</div>
              </div>
              <p className="mt-2 text-[11.5px] text-muted-foreground">Fotos enviadas por el cliente vía WhatsApp · hoy 09:15</p>
            </Card>

            {/* Cliente y venta origen */}
            <Card icon={<User className="size-4" />} title="Cliente y venta origen">
              <FieldGrid fields={[
                ["Razón social", g.cliente.razon],
                ["NIT", <span className="font-mono">{g.cliente.nit}</span>],
                ["Contacto", g.cliente.contacto],
                ["Cargo", g.cliente.cargo],
                ["Teléfono", <span className="font-mono">{g.cliente.telefono}</span>],
                ["Email", <span className="font-mono text-[11.5px]">{g.cliente.email}</span>],
              ]} />
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-border pt-3 text-[12.5px]">
                <Link to="/ops/ventas/$id" params={{ id: g.venta.num }} className="link-pill v">{g.venta.num}</Link>
                <span className="text-muted-foreground">Vendido</span>
                <span className="font-mono text-foreground/85">{g.venta.fecha} · hace {g.venta.haceDias} días</span>
                <span className="text-muted-foreground">Vendedor</span>
                <span className="text-foreground/85">{g.venta.vendedor}</span>
                <span className="text-muted-foreground">Monto</span>
                <span className="font-mono text-foreground/85">{formatCOP(g.venta.monto)}</span>
              </div>
              <div className="mt-3 flex items-center gap-2 rounded-md border border-[--succ-200] bg-[--succ-50] px-3 py-2 text-[12.5px] text-[--succ-700] dark:border-[rgba(18,183,106,.35)] dark:bg-[rgba(18,183,106,.1)] dark:text-[#6CE9A6]">
                <ShieldCheck className="size-4" />
                <span>Dentro de garantía · faltan <b>{g.diasRestantes} días</b> para vencer ({g.vencimiento})</span>
              </div>
            </Card>

            {/* Reclamación */}
            <Card icon={<MessageSquare className="size-4" />} title="Reclamación">
              <blockquote className="border-l-2 border-[--p-300] bg-muted/40 px-4 py-3 text-[13px] italic leading-relaxed text-foreground/85">
                {g.reclamacion}
              </blockquote>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {["def 01", "def 02", "def 03"].map((n) => (
                  <div key={n} className="flex aspect-square items-end justify-start rounded-md border border-border bg-muted/30 p-1.5 font-mono text-[10px] text-muted-foreground">{n}</div>
                ))}
              </div>
              <p className="mt-2 text-[11.5px] text-muted-foreground">{g.reclamacionMeta}</p>
            </Card>

            {/* Resolución propuesta */}
            <div className="rounded-[10px] border-2 border-[--warn-200] bg-[--warn-50]/40 p-5 dark:border-[rgba(247,144,9,.4)] dark:bg-[rgba(247,144,9,.06)]">
              <div className="mb-4 flex items-center gap-2">
                <CheckSquare className="size-4 text-[--warn-700] dark:text-[#FDB022]" />
                <span className="text-[13px] font-semibold text-foreground">Resolución propuesta</span>
                <span className="s-pill s-pen ml-auto" style={{ background: "var(--warn-50)", color: "var(--warn-700)", borderColor: "var(--warn-200)" }}>
                  <span className="dot animate-pulse" style={{ background: "var(--warn-500)" }} />
                  Decisión pendiente
                </span>
              </div>
              <div className="flex flex-col gap-2.5">
                {g.resoluciones.map((r) => (
                  <label
                    key={r.id}
                    className={[
                      "flex cursor-pointer items-start gap-3 rounded-md border p-3 transition-colors",
                      r.selected
                        ? "border-[--p-400] bg-[--p-50]/60 dark:border-[rgba(75,91,245,.5)] dark:bg-[rgba(45,60,229,.12)]"
                        : "border-border bg-card hover:bg-muted/30",
                    ].join(" ")}
                  >
                    <span className={[
                      "mt-1 grid size-4 shrink-0 place-items-center rounded-full border-2",
                      r.selected ? "border-[--p-600]" : "border-border",
                    ].join(" ")}>
                      {r.selected && <span className="size-2 rounded-full bg-[--p-600]" />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-medium text-foreground">{r.title}</div>
                      <div className="mt-0.5 text-[12px] leading-relaxed text-muted-foreground">{r.sub}</div>
                      {r.meta && <div className="mt-1 font-mono text-[11px] text-[--p-700] dark:text-[#C2CCFF]">{r.meta}</div>}
                    </div>
                  </label>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-md border border-[--p-200] bg-[--p-50]/60 px-3 py-2.5 text-[12px] dark:border-[rgba(75,91,245,.4)] dark:bg-[rgba(45,60,229,.12)]">
                <span className="text-foreground/85">
                  Diagnóstico inicial estimado: <b>24 horas</b>. Técnico sugerido: <b>Diego P.</b> (especialista en filtros Atlas Copco).
                </span>
                <button className="inline-flex items-center gap-1.5 rounded-md border border-[--p-300] bg-card px-2.5 py-1 text-[12px] font-medium text-[--p-700] hover:bg-[--p-50] dark:border-[rgba(75,91,245,.5)] dark:bg-transparent dark:text-[#C2CCFF]">
                  <Wrench className="size-3.5" /> Generar OT interna
                </button>
              </div>
            </div>

            {/* Validación técnica */}
            <Card
              icon={<ClipboardList className="size-4" />}
              title="Validación técnica del defecto"
              right={<span className="s-pill s-pen" style={{ background: "var(--warn-50)", color: "var(--warn-700)", borderColor: "var(--warn-200)" }}><span className="dot" style={{ background: "var(--warn-500)" }} />Pendiente</span>}
            >
              <p className="mb-3 text-[12.5px] leading-relaxed text-muted-foreground">
                Antes de aprobar la garantía, valida técnicamente que el defecto reportado corresponde a defecto cubierto por garantía y no a uso fuera de especificación.
              </p>
              <div className="flex flex-col gap-1.5">
                {g.criterios.map((c, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-md border border-border bg-card px-3 py-2 text-[12.5px]">
                    <span className={[
                      "grid size-5 shrink-0 place-items-center rounded-full",
                      c.ok === true ? "bg-[--succ-100] text-[--succ-700] dark:bg-[rgba(18,183,106,.2)] dark:text-[#6CE9A6]" :
                      c.ok === null ? "bg-[--warn-100] text-[--warn-700] dark:bg-[rgba(247,144,9,.2)] dark:text-[#FDB022]" :
                      "bg-[--dang-100] text-[--dang-700]",
                    ].join(" ")}>
                      {c.ok === true ? <Check className="size-3" strokeWidth={3} /> : c.ok === null ? <ClipboardList className="size-3" /> : <X className="size-3" strokeWidth={3} />}
                    </span>
                    <span className="flex-1 text-foreground/85">{c.text}</span>
                    <span className={[
                      "font-mono text-[10.5px] uppercase tracking-wider",
                      c.ok === true ? "text-[--succ-700] dark:text-[#6CE9A6]" :
                      c.ok === null ? "text-[--warn-700] dark:text-[#FDB022]" :
                      "text-[--dang-700]",
                    ].join(" ")}>{c.tag}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[11.5px] text-muted-foreground">
                4 de 5 criterios validados · 1 pendiente (requiere diagnóstico físico)
              </p>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-5">
            <Card icon={<Activity className="size-4" />} title="Historial">
              <div className="relative flex flex-col gap-3 border-l border-border pl-4">
                {g.historial.map((h, i) => (
                  <div key={i} className="relative">
                    <span className={[
                      "absolute -left-[19px] top-1.5 size-2.5 rounded-full ring-4 ring-card",
                      h.warn ? "bg-[--warn-500]" : "bg-[--p-500]",
                    ].join(" ")} />
                    <div className={["text-[12.5px] font-medium", h.warn ? "text-[--warn-700] dark:text-[#FDB022]" : "text-foreground/85"].join(" ")}>
                      {h.title}
                    </div>
                    <div className={["font-mono text-[10.5px]", h.warn ? "text-[--warn-700] dark:text-[#FDB022]" : "text-muted-foreground"].join(" ")}>
                      {h.meta}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="rounded-[10px] border border-[--p-200] bg-[--p-50]/60 p-4 dark:border-[rgba(75,91,245,.4)] dark:bg-[rgba(45,60,229,.1)]">
              <div className="mb-2 font-mono text-[10.5px] uppercase tracking-wider text-[--p-700] dark:text-[#C2CCFF]">
                Política aplicable F13
              </div>
              <ul className="flex flex-col gap-1.5">
                {g.politica.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-[12px] leading-relaxed text-foreground/85">
                    <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-[--p-600] dark:text-[#C2CCFF]" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <a className="mt-3 inline-block text-[11.5px] font-medium text-[--p-700] underline-offset-2 hover:underline dark:text-[#C2CCFF]">
                Ver políticas completas en F13 · Configuración
              </a>
            </div>

            <Card icon={<FileText className="size-4" />} title="Documentos vinculados">
              <div className="flex flex-col gap-1.5">
                {g.documentos.map((d) => (
                  <div key={d.nm} className="flex items-center gap-2 rounded-md border border-border bg-card px-2.5 py-1.5 text-[12.5px]">
                    <Paperclip className="size-3.5 text-muted-foreground" />
                    <span className="flex-1 truncate text-foreground/85">{d.nm}</span>
                    <span className="font-mono text-[11px] text-muted-foreground">{d.sz}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ icon, title, right, children }: { icon: React.ReactNode; title: string; right?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-[10px] border border-border bg-card p-5">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-muted-foreground">{icon}</span>
        <span className="text-[13px] font-semibold text-foreground">{title}</span>
        {right && <span className="ml-auto">{right}</span>}
      </div>
      {children}
    </div>
  );
}

function FieldGrid({ fields }: { fields: [string, React.ReactNode][] }) {
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-2.5">
      {fields.map(([label, value], i) => (
        <div key={i} className="flex flex-col gap-0.5">
          <span className="font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">{label}</span>
          <span className="text-[13px] text-foreground/85">{value}</span>
        </div>
      ))}
    </div>
  );
}
