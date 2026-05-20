import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeftCircle, AlertTriangle, Check, ScanLine, Save, TriangleAlert } from "lucide-react";
import { OC_1842_RECEPCION, type RecEstado } from "@/lib/compras-data";

export const Route = createFileRoute("/ops/compras/$id/recepcion")({
  head: ({ params }) => ({ meta: [{ title: `Recepción ${params.id} · CHV` }] }),
  component: ComprasRecepcion,
});

const PILL: Record<RecEstado, { cls: string; label: string }> = {
  completo:  { cls: "s-pill s-apr",  label: "Completo" },
  parcial:   { cls: "s-pill s-ven",  label: "Parcial" },
  faltante:  { cls: "s-pill s-rec",  label: "Faltante" },
  excedente: { cls: "s-pill s-ven",  label: "Excedente" },
  pendiente: { cls: "s-pill s-borr", label: "Pendiente" },
};

function ComprasRecepcion() {
  const { id } = Route.useParams();
  const rec = OC_1842_RECEPCION;
  const totals = rec.lineas.reduce(
    (acc, l) => {
      acc[l.estado]++;
      return acc;
    },
    { completo: 0, parcial: 0, faltante: 0, excedente: 0, pendiente: 0 } as Record<RecEstado, number>,
  );
  const recibidos = rec.lineas.filter((l) => l.recibido > 0).length;
  const totalLineas = rec.lineas.length;
  const pct = Math.round((recibidos / totalLineas) * 100);

  return (
    <div className="flex h-full flex-col gap-4 px-7 pb-14 pt-5">
      <Link to="/ops/compras/$id" params={{ id }} className="back-btn inline-flex items-center gap-1.5">
        <ArrowLeftCircle className="size-3.5" /> Volver a {id}
      </Link>

      {/* Header */}
      <div className="flex items-end justify-between gap-6 border-b border-[--n-100] pb-4">
        <div>
          <div className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[--n-300]">Recepción de compra</div>
          <div className="mb-2 font-mono text-[28px] font-medium leading-none tracking-[-0.01em] text-[--n-950]">{rec.num}</div>
          <div className="text-[13px] text-[--n-500]">
            <b className="font-medium text-[--n-700]">{rec.proveedor}</b> · Llegada esperada {rec.llegada} · Bodega {rec.bodega}
          </div>
        </div>
        <div className="flex min-w-[240px] flex-col items-end gap-1.5">
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[--n-500]">Recibido</span>
          <div className="font-mono text-[22px] font-medium text-[--n-950]"><b className="text-[--succ-700]">{recibidos}</b> / {totalLineas} items</div>
          <div className="h-1.5 w-[240px] overflow-hidden rounded-full bg-[--n-100]">
            <div className="h-full rounded-full bg-gradient-to-r from-[--succ-500] to-[--succ-600]" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      {/* Disc banner */}
      <div className="flex items-center gap-3 rounded-[10px] border border-[--warn-border] bg-[--warn-50] px-4 py-3 text-[--warn-700]">
        <AlertTriangle className="size-[18px] shrink-0 text-[--warn-600]" />
        <div className="flex-1 text-[13px]">
          Hay <b className="font-semibold">3 ítems con discrepancia</b> (1 faltante, 1 excedente, 1 parcial). Revísalos antes de confirmar la recepción completa.
        </div>
        <button className="rounded-md border border-[--warn-border] bg-transparent px-3 py-1.5 text-[12.5px] font-medium text-[--warn-700]">
          Ver solo discrepancias
        </button>
      </div>

      {/* Recepción table */}
      <div className="overflow-visible rounded-[10px] border border-[--n-150] bg-[--n-0]">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {[
                ["", "42px", "left"],
                ["SKU", "104px", "left"],
                ["Producto", undefined, "left"],
                ["Ord.", "80px", "center"],
                ["Recibido", "150px", "center"],
                ["Estado", "148px", "center"],
                ["Notas", "240px", "left"],
                ["", "84px", "left"],
              ].map(([lbl, w, al], i) => (
                <th
                  key={i}
                  style={{ width: w as string }}
                  className={`whitespace-nowrap border-b border-[--n-150] bg-[--n-25] px-3 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-[--n-400] text-${al as string}`}
                >
                  {lbl}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rec.lineas.map((l) => {
              const rowBg =
                l.estado === "completo"  ? "bg-[--succ-50]/40" :
                l.estado === "parcial"   ? "bg-[--warn-50]/40" :
                l.estado === "faltante"  ? "bg-[--dang-50]/40" :
                l.estado === "excedente" ? "bg-[--warn-50]/40" : "";
              const qtyTone =
                l.estado === "completo"  ? "border-[--succ-border] bg-[--succ-50] text-[--succ-700]" :
                l.estado === "parcial"   ? "border-[--warn-border] bg-[--warn-50] text-[--warn-700]" :
                l.estado === "faltante"  ? "border-[--dang-border] bg-[--dang-50] text-[--dang-700]" :
                l.estado === "excedente" ? "border-[--warn-border] bg-[--warn-50] text-[--warn-700]" :
                "border-[--n-150] bg-[--n-0] text-[--n-700]";
              const checked = l.recibido > 0;
              const checkClass = checked
                ? l.estado === "parcial" || l.estado === "excedente"
                  ? "bg-[--warn-500] border-[--warn-500] text-white"
                  : "bg-[--succ-600] border-[--succ-600] text-white"
                : "bg-[--n-0] border-[--n-300] text-transparent";
              const pill = PILL[l.estado];
              return (
                <tr key={l.sku} className={`border-b border-[--n-75] last:border-b-0 ${rowBg}`}>
                  <td className="px-3 py-2.5">
                    <span className={`inline-flex h-[18px] w-[18px] items-center justify-center rounded border-[1.5px] ${checkClass}`}>
                      <Check className="size-[11px]" strokeWidth={3} />
                    </span>
                  </td>
                  <td className="px-3 py-2.5"><span className="font-mono text-[11.5px] font-medium text-[--n-700]">{l.sku}</span></td>
                  <td className="px-3 py-2.5">
                    <div className="text-[12.5px] font-medium leading-tight text-[--n-950]">{l.nombre}</div>
                    <div className="font-mono text-[11px] text-[--n-500]">{l.refProv}</div>
                  </td>
                  <td className="px-3 py-2.5 text-center font-mono text-[14px] font-medium text-[--n-700]">×{l.ordenado}</td>
                  <td className="px-3 py-2.5 text-center">
                    <div className={`inline-flex h-9 items-center overflow-hidden rounded-md border ${qtyTone}`}>
                      <button className="h-full w-7 bg-[--n-25] text-[15px] text-[--n-700]">−</button>
                      <input
                        defaultValue={l.recibido}
                        className="w-12 border-none bg-transparent text-center font-mono text-[14px] font-semibold outline-none"
                      />
                      <button className="h-full w-7 bg-[--n-25] text-[15px] text-[--n-700]">+</button>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-center"><span className={pill.cls}><span className="dot" />{pill.label}</span></td>
                  <td className="px-3 py-2.5">
                    <input
                      defaultValue={l.notas ?? ""}
                      placeholder="Notas..."
                      className="h-8 w-full rounded-md border border-[--n-150] bg-[--n-0] px-2.5 text-[12px] text-[--n-700] outline-none"
                    />
                  </td>
                  <td className="px-3 py-2.5">
                    <button className="inline-flex h-7 items-center gap-1 rounded-md border border-[--p-200] bg-[--p-50] px-2.5 text-[11.5px] font-medium text-[--p-700]">
                      <ScanLine className="size-3" /> QR
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Sticky-ish footer */}
        <div className="sticky bottom-0 flex items-center gap-3.5 rounded-b-[10px] border-t border-[--n-150] bg-[--n-0] px-4 py-3.5">
          <div className="flex flex-1 flex-wrap items-center gap-3.5 font-mono text-[12px] text-[--n-500]">
            <Counter tone="succ" label="Completos"  v={totals.completo} />
            <Counter tone="warn" label="Parciales"  v={totals.parcial} />
            <Counter tone="dang" label="Faltantes"  v={totals.faltante} />
            <Counter tone="warn" label="Excedentes" v={totals.excedente} />
            <Counter tone="neut" label="Pendientes" v={totals.pendiente} />
          </div>
          <button className="btn-out inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-[13px] font-medium">
            <Save className="size-3.5" /> Guardar progreso
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-[--warn-border] bg-[--n-0] px-3.5 py-2 text-[13px] font-medium text-[--warn-700]">
            <TriangleAlert className="size-3.5" /> Reportar discrepancia
          </button>
          <button className="btn-pri inline-flex items-center gap-1.5 rounded-lg border border-transparent px-3.5 py-2 text-[13px] font-medium">
            <Check className="size-3.5" strokeWidth={2.5} /> Confirmar recepción
          </button>
        </div>
      </div>
    </div>
  );
}

function Counter({ tone, label, v }: { tone: "succ" | "warn" | "dang" | "neut"; label: string; v: number }) {
  const dot = { succ: "bg-[--succ-500]", warn: "bg-[--warn-500]", dang: "bg-[--dang-500]", neut: "bg-[--n-400]" }[tone];
  const val = { succ: "text-[--succ-700]", warn: "text-[--warn-700]", dang: "text-[--dang-700]", neut: "text-[--n-700]" }[tone];
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`size-1.5 rounded-full ${dot}`} />
      {label} · <span className={`font-semibold ${val}`}>{v}</span>
    </span>
  );
}
