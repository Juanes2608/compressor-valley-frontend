import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Download, Plus, LayoutGrid, Table as TableIcon, QrCode } from "lucide-react";
import {
  INVENTARIO_ROWS,
  FILTRO_CAT,
  type CategoriaId,
  type InventarioRow,
} from "@/lib/inventario-data";
import { formatCOP } from "@/lib/format";

export const Route = createFileRoute("/ops/productos")({
  head: () => ({ meta: [{ title: "Productos · CHV" }] }),
  component: ProductosPage,
});

function stockTotal(r: InventarioRow): number {
  return (["CALI", "PER", "BUG", "TUL"] as const).reduce(
    (acc, k) => acc + (r.stock[k] ?? 0),
    0,
  );
}

function ProductosPage() {
  const [view, setView] = useState<"tabla" | "tarjetas">("tabla");
  const [q, setQ] = useState("");
  const [cats, setCats] = useState<Set<CategoriaId>>(new Set());

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return INVENTARIO_ROWS.filter((r) => {
      if (cats.size > 0 && !cats.has(r.categoria)) return false;
      if (!needle) return true;
      return (
        r.sku.toLowerCase().includes(needle) ||
        r.nombre.toLowerCase().includes(needle) ||
        r.sub.toLowerCase().includes(needle)
      );
    });
  }, [q, cats]);

  const toggleCat = (id: CategoriaId) => {
    setCats((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header / toolbar */}
      <div className="flex items-center gap-3 border-b border-border bg-card px-6 py-3">
        <div className="relative flex-1 max-w-xl">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar SKU, nombre o referencia…"
            className="h-9 w-full rounded-md border border-border bg-background pl-9 pr-9 text-sm outline-none focus:border-foreground/40"
          />
          <button
            type="button"
            aria-label="Escanear QR"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <QrCode className="size-4" />
          </button>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="inline-flex overflow-hidden rounded-md border border-border bg-background text-sm">
            <button
              onClick={() => setView("tabla")}
              className={`flex items-center gap-1.5 px-3 py-1.5 ${view === "tabla" ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted"}`}
            >
              <TableIcon className="size-3.5" /> Tabla
            </button>
            <button
              onClick={() => setView("tarjetas")}
              className={`flex items-center gap-1.5 px-3 py-1.5 ${view === "tarjetas" ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted"}`}
            >
              <LayoutGrid className="size-3.5" /> Tarjetas
            </button>
          </div>
          <button className="btn-out inline-flex items-center gap-1.5">
            <Download className="size-3.5" /> Exportar
          </button>
          <button className="btn-pri inline-flex items-center gap-1.5">
            <Plus className="size-3.5" /> Nuevo producto
          </button>
        </div>
      </div>

      {/* Filtros de categoría como chips */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-card/50 px-6 py-2.5">
        <span className="text-xs uppercase tracking-wide text-muted-foreground">Categoría</span>
        {FILTRO_CAT.map((c) => {
          const active = cats.has(c.id);
          return (
            <button
              key={c.id}
              onClick={() => toggleCat(c.id)}
              className={`bdg cat-${c.id} ${active ? "ring-2 ring-foreground/40" : "opacity-80 hover:opacity-100"}`}
            >
              {c.label} <span className="ml-1 opacity-60">{c.count}</span>
            </button>
          );
        })}
        {cats.size > 0 && (
          <button
            onClick={() => setCats(new Set())}
            className="text-xs text-muted-foreground underline-offset-2 hover:underline"
          >
            Limpiar
          </button>
        )}
        <span className="ml-auto text-xs text-muted-foreground">
          {rows.length} de {INVENTARIO_ROWS.length} productos
        </span>
      </div>

      {/* Contenido */}
      <div className="flex-1 overflow-auto">
        {view === "tabla" ? (
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10 bg-card text-xs uppercase tracking-wide text-muted-foreground">
              <tr className="border-b border-border">
                <th className="px-6 py-2 text-left font-medium" style={{ width: 140 }}>SKU</th>
                <th className="px-3 py-2 text-left font-medium">Producto</th>
                <th className="px-3 py-2 text-left font-medium" style={{ width: 140 }}>Categoría</th>
                <th className="px-3 py-2 text-right font-medium" style={{ width: 100 }}>Stock</th>
                <th className="px-6 py-2 text-right font-medium" style={{ width: 140 }}>Precio</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.sku} className="border-b border-border hover:bg-muted/40">
                  <td className="px-6 py-2.5 font-mono text-xs">{r.sku}</td>
                  <td className="px-3 py-2.5">
                    <div className="font-medium">{r.nombre}</div>
                    <div className="text-xs text-muted-foreground">{r.sub}</div>
                  </td>
                  <td className="px-3 py-2.5">
                    <span className={`bdg cat-${r.categoria}`}>{r.categoriaLabel}</span>
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono tabular-nums">
                    {stockTotal(r).toLocaleString("es-CO")}
                  </td>
                  <td className="px-6 py-2.5 text-right font-mono tabular-nums">
                    {formatCOP(r.precio)}
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-sm text-muted-foreground">
                    Sin productos para los filtros aplicados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <div className="grid grid-cols-1 gap-3 p-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {rows.map((r) => (
              <div
                key={r.sku}
                className="rounded-lg border border-border bg-card p-4 transition hover:border-foreground/30"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-mono text-xs text-muted-foreground">{r.sku}</span>
                  <span className={`bdg cat-${r.categoria}`}>{r.categoriaLabel}</span>
                </div>
                <div className="mt-2 font-medium leading-tight">{r.nombre}</div>
                <div className="text-xs text-muted-foreground">{r.sub}</div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Stock</div>
                    <div className="font-mono tabular-nums">{stockTotal(r).toLocaleString("es-CO")}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Precio</div>
                    <div className="font-mono tabular-nums">{formatCOP(r.precio)}</div>
                  </div>
                </div>
              </div>
            ))}
            {rows.length === 0 && (
              <div className="col-span-full py-16 text-center text-sm text-muted-foreground">
                Sin productos para los filtros aplicados.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
