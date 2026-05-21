import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search, ScanLine, Download, Plus, ChevronDown, X, Printer, RotateCw,
  Pencil, Box,
} from "lucide-react";
import { formatCOP, formatNumber } from "@/lib/format";
import {
  INVENTARIO_ROWS, FILTRO_SEDES, FILTRO_ESTADO, FILTRO_CAT,
  SKU_SELECCIONADO, PROVEEDORES_DETALLE, MOVIMIENTOS_DETALLE, STOCK_DETALLE,
  KPI_TOTAL,
  type InventarioRow, type StockEstado,
} from "@/lib/inventario-data";
import { ComingSoonDialog } from "@/components/shell/coming-soon";

export const Route = createFileRoute("/ops/inventario")({
  head: () => ({ meta: [{ title: "Inventario · CHV" }] }),
  component: InventarioPage,
});

function InventarioPage() {
  const [selectedSku, setSelectedSku] = useState<string | null>(SKU_SELECCIONADO);
  const [vista, setVista] = useState<"tabla" | "tarjetas">("tabla");
  const [orden, setOrden] = useState<"SKU" | "Nombre" | "Stock">("SKU");
  const [query, setQuery] = useState("");
  const [nuevoOpen, setNuevoOpen] = useState(false);

  const selected: InventarioRow | undefined = useMemo(
    () => INVENTARIO_ROWS.find((r) => r.sku === selectedSku),
    [selectedSku]
  );

  const rows = useMemo(() => {
    if (!query.trim()) return INVENTARIO_ROWS;
    const q = query.toLowerCase();
    return INVENTARIO_ROWS.filter(
      (r) => r.sku.toLowerCase().includes(q) || r.nombre.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-[18px] px-7 py-6">
      {/* Encabezado */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-[--n-300]">
            Operaciones · Catálogo y stock · {formatNumber(KPI_TOTAL)} SKUs activos
          </p>
          <h1 className="text-[24px] font-semibold tracking-[-0.018em] text-[--n-950] dark:text-white">
            Inventario
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Segmented
            value={vista}
            onChange={(v) => setVista(v as "tabla" | "tarjetas")}
            options={[
              { id: "tabla", label: "Tabla" },
              { id: "tarjetas", label: "Tarjetas" },
            ]}
          />
          <button className="btn btn-out">
            <Download className="h-3.5 w-3.5" strokeWidth={1.7} />
            Exportar
          </button>
          <button className="btn btn-pri">
            <Plus className="h-3.5 w-3.5" strokeWidth={2} />
            Nuevo producto
          </button>
        </div>
      </div>

      {/* Search row */}
      <div className="flex items-center gap-2.5">
        <div className="flex h-11 flex-1 items-center gap-2.5 rounded-lg border border-[--n-200] bg-[--n-0] px-3.5 dark:border-white/[0.08] dark:bg-white/[0.02]">
          <Search className="h-4 w-4 shrink-0 text-[--n-500]" strokeWidth={1.5} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar SKU, nombre, código de proveedor..."
            className="flex-1 border-none bg-transparent text-[14px] text-[--n-950] outline-none placeholder:text-[--n-500] dark:text-white"
          />
          <kbd className="rounded border border-[--n-200] bg-[--n-0] px-1.5 py-0.5 font-mono text-[10.5px] font-medium text-[--n-500] dark:border-white/[0.12] dark:bg-white/[0.04]">
            ⌘K
          </kbd>
        </div>
        <button className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-lg bg-[--p-600] px-4 font-sans text-[13px] font-semibold text-white hover:bg-[--p-700]">
          <ScanLine className="h-4 w-4" strokeWidth={1.7} />
          Escanear QR
        </button>
      </div>

      {/* Body grid */}
      <div
        className={
          selected
            ? "grid min-w-0 gap-4 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[220px_minmax(0,1fr)_480px]"
            : "grid min-w-0 gap-4 lg:grid-cols-[220px_minmax(0,1fr)]"
        }
      >
        {/* Filtros */}
        <FiltrosPanel />

        {/* Tabla */}
        <div className="min-w-0 overflow-hidden rounded-[10px] border border-[--n-150] bg-[--n-0] dark:border-white/[0.08] dark:bg-white/[0.02]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[--n-100] px-4 py-3 text-[12.5px] text-[--n-500] dark:border-white/[0.06]">
            <div className="flex items-center gap-3.5">
              <span>
                <strong className="font-mono font-semibold text-[--n-950] dark:text-white">
                  {formatNumber(rows.length === INVENTARIO_ROWS.length ? KPI_TOTAL : rows.length)}
                </strong>{" "}
                SKUs
              </span>
              <span>·</span>
              <span>Filtro: Todas las sedes</span>
              {selected && (
                <span className="rounded-[3px] border border-[--p-200] bg-[--p-50] px-2 py-[1px] font-mono text-[11px] text-[--p-700] dark:border-[--p-500]/35 dark:bg-[--p-500]/15 dark:text-[#C2CCFF]">
                  {selected.sku} seleccionado
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-[--n-500]">Ordenar:</span>
              <Segmented
                value={orden}
                onChange={(v) => setOrden(v as "SKU" | "Nombre" | "Stock")}
                options={[
                  { id: "SKU", label: "SKU" },
                  { id: "Nombre", label: "Nombre" },
                  { id: "Stock", label: "Stock" },
                ]}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[12.5px]">
              <thead>
                <tr>
                  <Th width={32} />
                  <Th width={130}>SKU</Th>
                  <Th>Producto</Th>
                  <Th width={120}>Categoría</Th>
                  <Th width={240}>Stock por sede</Th>
                  <Th width={110} right>Precio</Th>
                  <Th width={36} />
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <InventarioFila
                    key={r.sku}
                    row={r}
                    selected={r.sku === selectedSku}
                    onClick={() => setSelectedSku(r.sku === selectedSku ? null : r.sku)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Panel de detalle */}
        {selected && (
          <DetailPanel
            row={selected}
            onClose={() => setSelectedSku(null)}
          />
        )}
      </div>
    </div>
  );
}

/* ───────────────────── Subcomponentes ───────────────────── */

function Segmented<T extends string>({
  value, onChange, options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { id: T; label: string }[];
}) {
  return (
    <div className="inline-flex gap-[1px] rounded-md border border-[--n-150] bg-[--n-50] p-[2px] dark:border-white/[0.08] dark:bg-white/[0.02]">
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          className={
            "cursor-pointer rounded-[5px] border-none px-3 py-1.5 font-sans text-[12px] " +
            (value === o.id
              ? "bg-[--n-0] font-semibold text-[--n-950] shadow-[0_1px_2px_rgba(16,24,40,0.06)] dark:bg-white/[0.06] dark:text-white"
              : "bg-transparent font-medium text-[--n-500]")
          }
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Th({
  children, width, right,
}: { children?: React.ReactNode; width?: number; right?: boolean }) {
  return (
    <th
      style={{ width }}
      className={
        "border-b border-[--n-100] bg-[--n-50] px-2.5 py-2.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.06em] text-[--n-500] dark:border-white/[0.06] dark:bg-white/[0.03] " +
        (right ? "text-right" : "text-left")
      }
    >
      {children}
    </th>
  );
}

function FiltrosPanel() {
  return (
    <aside className="flex flex-col gap-4 self-start rounded-[10px] border border-[--n-150] bg-[--n-0] p-3.5 text-[12.5px] dark:border-white/[0.08] dark:bg-white/[0.02]">
      <FilterBlock title="Sede" clearable>
        {FILTRO_SEDES.map((s) => (
          <FilterRow key={s.id} on={s.on} count={s.count}>
            <Check on={s.on} />
            {s.label}
          </FilterRow>
        ))}
      </FilterBlock>
      <FilterBlock title="Estado de stock">
        {FILTRO_ESTADO.map((s) => (
          <FilterRow key={s.id} count={s.count}>
            <span className={`dot-stk ${s.dot}`} />
            {s.label}
          </FilterRow>
        ))}
      </FilterBlock>
      <FilterBlock title="Categoría">
        {FILTRO_CAT.map((c) => (
          <FilterRow key={c.id} count={c.count}>
            <span className={`dot-cat ${c.id}`} />
            {c.label}
          </FilterRow>
        ))}
      </FilterBlock>
    </aside>
  );
}

function FilterBlock({
  title, children, clearable,
}: { title?: string; children: React.ReactNode; clearable?: boolean }) {
  return (
    <div>
      {title && (
        <div className="mb-2 flex items-center justify-between font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-[--n-500]">
          <span>{title}</span>
          {clearable && (
            <button className="cursor-pointer text-[10px] font-medium normal-case tracking-normal text-[--p-600] hover:underline">
              limpiar
            </button>
          )}
        </div>
      )}
      <div className="flex flex-col gap-px">{children}</div>
    </div>
  );
}

function FilterRow({
  on, count, children,
}: { on?: boolean; count?: number; children: React.ReactNode }) {
  return (
    <button
      className={
        "relative flex items-center justify-between gap-1.5 rounded-[5px] px-2 py-1.5 text-left text-[12.5px] leading-tight " +
        (on
          ? "bg-[--p-50] font-medium text-[--p-700] before:absolute before:left-[-8px] before:top-1 before:bottom-1 before:w-[2.5px] before:rounded-[1px] before:bg-[--p-500] dark:bg-[--p-500]/15 dark:text-white"
          : "text-[--n-700] hover:bg-[--n-50] dark:text-[--n-700] dark:hover:bg-white/[0.04]")
      }
    >
      <span className="flex min-w-0 items-center gap-2">{children}</span>
      {count !== undefined && (
        <span className="font-mono text-[11px] text-[--n-300]">{formatNumber(count)}</span>
      )}
    </button>
  );
}

function Check({ on }: { on?: boolean }) {
  return (
    <span
      className={
        "inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[3px] border-[1.5px] " +
        (on
          ? "border-[--p-600] bg-[--p-600] text-white"
          : "border-[--n-300] bg-[--n-0] dark:border-white/[0.18] dark:bg-white/[0.04]")
      }
    >
      {on && <span className="text-[9px] font-bold leading-none">✓</span>}
    </span>
  );
}

function InventarioFila({
  row, selected, onClick,
}: { row: InventarioRow; selected: boolean; onClick: () => void }) {
  const stkEntries: Array<[keyof typeof row.stock, string]> = [
    ["CALI", "CALI"], ["PER", "PER"], ["BUG", "BUG"], ["TUL", "TUL"],
  ];
  return (
    <tr
      onClick={onClick}
      className={
        "cursor-pointer transition-colors " +
        (selected
          ? "bg-[--p-50] hover:bg-[--p-50] dark:bg-[--p-500]/15"
          : "hover:bg-[--n-50] dark:hover:bg-white/[0.03]")
      }
    >
      <td className="border-b border-[--n-100] px-2.5 py-2.5 dark:border-white/[0.06]">
        <RowCheck on={selected} />
      </td>
      <td className="border-b border-[--n-100] px-2.5 py-2.5 dark:border-white/[0.06]">
        <span className="whitespace-nowrap font-mono text-[12.5px] font-medium tracking-[-0.005em] text-[--n-950] dark:text-white">
          {row.sku}
        </span>
      </td>
      <td className="border-b border-[--n-100] px-2.5 py-2.5 dark:border-white/[0.06]">
        <div
          className={
            "font-medium leading-tight text-[--n-950] dark:text-white " +
            (row.agotado ? "opacity-60" : "")
          }
        >
          {row.nombre}
          <span className="mt-px block font-mono text-[11px] font-normal tracking-[0.04em] text-[--n-500]">
            {row.sub}
          </span>
        </div>
      </td>
      <td className="border-b border-[--n-100] px-2.5 py-2.5 dark:border-white/[0.06]">
        <span className={`bdg ${row.categoria}`}>{row.categoriaLabel}</span>
      </td>
      <td className="border-b border-[--n-100] px-2.5 py-2.5 dark:border-white/[0.06]">
        <div className="flex items-center gap-1.5">
          {stkEntries.map(([key, label]) => {
            const qty = row.stock[key];
            const estado: StockEstado = row.estado[key];
            return (
              <span key={label} className={`stk-pill ${estado}`}>
                <span className="lb">{label}</span>
                {qty === null ? "—" : qty}
              </span>
            );
          })}
        </div>
      </td>
      <td
        className={
          "border-b border-[--n-100] px-2.5 py-2.5 text-right font-mono font-medium dark:border-white/[0.06] " +
          (row.agotado ? "text-[--n-300]" : "text-[--n-950] dark:text-white")
        }
      >
        <span className="mr-px text-[11px] font-normal text-[--n-300]">$</span>
        {formatNumber(row.precio)}
      </td>
      <td className="border-b border-[--n-100] px-2.5 py-2.5 dark:border-white/[0.06]">
        <button className="inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-[5px] border border-[--n-200] bg-[--n-0] text-[--n-500] hover:bg-[--n-50] dark:border-white/[0.12] dark:bg-white/[0.04] dark:text-[--n-500]">
          <ChevronDown className="h-3 w-3" strokeWidth={1.7} />
        </button>
      </td>
    </tr>
  );
}

function RowCheck({ on }: { on: boolean }) {
  return (
    <span
      className={
        "relative inline-block h-3.5 w-3.5 cursor-pointer rounded-[3px] border-[1.5px] " +
        (on
          ? "border-[--p-600] bg-[--p-600]"
          : "border-[--n-300] bg-[--n-0] dark:border-white/[0.18] dark:bg-white/[0.04]")
      }
    >
      {on && (
        <span className="absolute left-[2px] top-[-1px] text-[9px] font-bold leading-none text-white">
          ✓
        </span>
      )}
    </span>
  );
}

/* ───────────────────── Panel de detalle ───────────────────── */

function DetailPanel({ row, onClose }: { row: InventarioRow; onClose: () => void }) {
  return (
    <aside className="sticky top-16 flex max-h-[920px] flex-col self-start overflow-hidden rounded-[10px] border border-[--n-150] bg-[--n-0] dark:border-white/[0.08] dark:bg-white/[0.02]">
      {/* Head */}
      <div className="flex items-start gap-3 border-b border-[--n-100] px-4 py-4 dark:border-white/[0.06]">
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-[7px] bg-[--p-50] text-[--p-600] dark:bg-[--p-500]/15 dark:text-[#C2CCFF]">
          <Box className="h-4.5 w-4.5" strokeWidth={1.5} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[15px] font-semibold leading-tight text-[--n-950] dark:text-white">
            {row.nombre}
          </div>
          <div className="mt-0.5 font-mono text-[10.5px] uppercase tracking-[0.06em] text-[--n-500]">
            {row.sku} · Atlas Copco
          </div>
        </div>
        <button
          onClick={onClose}
          className="grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded-md border border-[--n-200] bg-[--n-0] text-[--n-500] hover:bg-[--n-50] dark:border-white/[0.12] dark:bg-white/[0.04]"
        >
          <X className="h-3 w-3" strokeWidth={1.8} />
        </button>
      </div>

      {/* Body scrollable */}
      <div className="flex-1 overflow-y-auto">
        {/* 1. Identificación */}
        <Block title="Identificación">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
            <Field label="Referencia interna" value={row.sku} mono />
            <Field label="Código interno" value="F-AT-GA22-001" mono small />
            <Field label="Código del proveedor" value="1613-7409-00" mono small />
            <Field label="Sub-categoría" value="Filtros de aire industrial" sans />
            <div className="col-span-2">
              <div className="mb-1 text-[10.5px] text-[--n-500]">Clasificación</div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`bdg ${row.categoria} lg`}>{row.categoriaLabel}</span>
                <span className="bdg succ">Nuevo</span>
              </div>
            </div>
          </div>
        </Block>

        {/* 2. Comercial */}
        <Block title="Comercial">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
            <Field label="Costo promedio" value="$ 142.500" small />
            <Field label="Último costo de compra" value="$ 145.000" small extra="· 12 abr 2026" />
            <Field label="Precio de venta sugerido" value={formatCOP(row.precio)} mono />
            <div>
              <div className="mb-0.5 text-[10.5px] text-[--n-500]">Margen actual</div>
              <div className="text-[13px] font-medium text-[--succ-700]">▲ 41,8 %</div>
            </div>
          </div>
        </Block>

        {/* 3. Proveedores */}
        <Block title="Proveedores">
          <div className="flex flex-col overflow-hidden rounded-[7px] border border-[--n-150] dark:border-white/[0.08]">
            {PROVEEDORES_DETALLE.map((p, i) => (
              <div
                key={p.nombre}
                className={
                  "flex items-center justify-between gap-2 px-3 py-2.5 " +
                  (i < PROVEEDORES_DETALLE.length - 1
                    ? "border-b border-[--n-100] dark:border-white/[0.06] "
                    : "") +
                  (p.destacado
                    ? "bg-[--info-50] dark:bg-[--info-500]/10"
                    : "bg-[--n-0] dark:bg-white/[0.02]")
                }
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-[12.5px] font-medium leading-tight text-[--n-950] dark:text-white">
                    {p.nombre}
                    {p.destacado && (
                      <span className="bdg info" style={{ fontSize: "9.5px", padding: "1px 5px", letterSpacing: ".06em" }}>
                        ÚLTIMO
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 font-mono text-[10.5px] tracking-[0.04em] text-[--n-500]">
                    Última compra · {p.ultimaCompra}
                  </div>
                </div>
                <div className="text-right font-mono text-[11px] text-[--n-700] dark:text-[--n-700]">
                  <span className="block text-[12px] font-medium text-[--n-950] dark:text-white">
                    {p.ocCount} OC
                  </span>
                  históricas
                </div>
              </div>
            ))}
            <button className="cursor-pointer border-t border-[--n-100] bg-[--n-50] py-2 text-center text-[12px] font-medium text-[--p-600] dark:border-white/[0.06] dark:bg-white/[0.03] dark:text-[#C2CCFF]">
              Ver todos (5) →
            </button>
          </div>
        </Block>

        {/* 4. Stock por sede */}
        <Block title="Stock por sede">
          <div className="grid grid-cols-2 gap-2">
            {STOCK_DETALLE.map((s) => (
              <div
                key={s.sede}
                className={
                  "rounded-[7px] border border-[--n-150] border-t-[3px] bg-[--n-0] px-3 py-2.5 dark:border-white/[0.08] dark:bg-white/[0.02] " +
                  (s.estado === "s" ? "border-t-[--succ-500] " : "") +
                  (s.estado === "w" ? "border-t-[--warn-500] " : "") +
                  (s.estado === "d" ? "border-t-[--dang-500] " : "") +
                  (s.estado === "n" ? "border-t-[--n-300] " : "")
                }
              >
                <div className="font-mono text-[10.5px] font-medium uppercase tracking-[0.06em] text-[--n-500]">
                  {s.sede}
                </div>
                <div className="mt-0.5 font-mono text-[22px] font-semibold leading-none tracking-[-0.02em] text-[--n-950] dark:text-white">
                  {s.qty}
                </div>
                <div className="mt-0.5 text-[10.5px] text-[--n-500]">mín. {s.min}</div>
              </div>
            ))}
          </div>
        </Block>

        {/* 5. QR */}
        <Block title="QR del producto">
          <div className="flex flex-col items-center gap-2.5">
            <QRStatic />
            <div className="grid w-full grid-cols-2 gap-2">
              <button className="inline-flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-[7px] border border-[--n-200] bg-[--n-0] text-[12.5px] font-medium text-[--n-700] hover:bg-[--n-50] dark:border-white/[0.12] dark:bg-white/[0.04] dark:text-[--n-700]">
                <Printer className="h-3.5 w-3.5" strokeWidth={1.5} />
                Imprimir etiqueta
              </button>
              <button className="inline-flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-[7px] border border-[--n-200] bg-[--n-0] text-[12.5px] font-medium text-[--n-700] hover:bg-[--n-50] dark:border-white/[0.12] dark:bg-white/[0.04] dark:text-[--n-700]">
                <RotateCw className="h-3.5 w-3.5" strokeWidth={1.5} />
                Generar QR nuevo
              </button>
            </div>
            <div className="text-center text-[11px] leading-snug text-[--n-500]">
              Reemite el QR si la etiqueta física se dañó.
            </div>
          </div>
        </Block>

        {/* 6. Últimos movimientos */}
        <Block title="Últimos movimientos">
          <div className="relative flex flex-col pl-2 before:absolute before:left-[11px] before:top-1.5 before:bottom-1.5 before:w-px before:bg-[--n-150] dark:before:bg-white/[0.08]">
            {MOVIMIENTOS_DETALLE.map((m, i) => (
              <div key={i} className="relative z-[1] grid grid-cols-[18px_1fr_auto] items-center gap-2.5 py-1.5">
                <span
                  className={
                    "h-2 w-2 justify-self-center rounded-full border-2 border-[--n-0] dark:border-[--n-25] " +
                    (m.dot === "s" ? "bg-[--succ-500]" : "") +
                    (m.dot === "i" ? "bg-[--info-500]" : "") +
                    (m.dot === "p" ? "bg-[--p-500]" : "") +
                    (m.dot === "w" ? "bg-[--warn-500]" : "") +
                    (m.dot === "d" ? "bg-[--dang-500]" : "")
                  }
                />
                <div className="text-[12px] leading-snug text-[--n-700] dark:text-[--n-700]">
                  <b className="font-medium text-[--n-950] dark:text-white">{m.titulo}</b> · {m.detalle}
                  <span className="mt-px block font-mono text-[10px] tracking-[0.04em] text-[--n-500]">{m.meta}</span>
                </div>
                <span className="self-center font-mono text-[10.5px] text-[--n-500]">{m.tiempo}</span>
              </div>
            ))}
          </div>
          <div className="mt-2">
            <button className="w-full cursor-pointer rounded-md border border-dashed border-[--n-200] bg-transparent py-2 text-center text-[11.5px] font-medium text-[--n-700] hover:bg-[--n-50] dark:border-white/[0.12] dark:text-[--n-700] dark:hover:bg-white/[0.04]">
              Ver historial completo →
            </button>
          </div>
        </Block>

        {/* 7. Solo Admin */}
        <div className="relative border-b border-[--n-100] bg-gradient-to-b from-[--p-500]/[0.04] to-transparent px-4 py-4 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-[--p-500]/40 last-of-type:border-b-0 dark:border-white/[0.06] dark:from-[--p-500]/10">
          <div className="mb-2.5 flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-[--p-600] dark:text-[#C2CCFF]">
            <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-[--p-500]" />
            Solo Admin
          </div>
          <div className="mb-2.5 grid grid-cols-2 gap-2.5">
            <AdminInput label="Stock mínimo" value="24" />
            <AdminInput label="Stock máximo" value="120" />
            <AdminInput label="Punto de reorden" value="48" />
            <div className="flex flex-col gap-1">
              <div className="text-[10.5px] text-[--n-500]">Análisis ABC</div>
              <div className="flex h-8 items-center">
                <span className="abc A">A</span>
                <span className="ml-2 text-[11.5px] text-[--n-500]">Alto valor · alta rotación</span>
              </div>
            </div>
          </div>
          <AdminRow l="Última fecha de conteo cíclico" r="28 mar 2026" />
          <AdminRow l="Frecuencia de conteo" r="Trimestral" last />
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 flex gap-2 border-t border-[--n-150] bg-[--n-0] px-4 py-3 dark:border-white/[0.08] dark:bg-white/[0.02]">
        <button className="btn btn-out flex-1 justify-center">
          <Plus className="h-3.5 w-3.5" strokeWidth={1.7} />
          Ajustar stock
        </button>
        <button className="btn btn-pri flex-1 justify-center">
          <Pencil className="h-3.5 w-3.5" strokeWidth={1.7} />
          Editar producto
        </button>
      </div>
    </aside>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-[--n-100] px-4 py-4 last-of-type:border-b-0 dark:border-white/[0.06]">
      <div className="mb-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-[--n-300]">
        {title}
      </div>
      {children}
    </div>
  );
}

function Field({
  label, value, mono, small, sans, extra,
}: { label: string; value: string; mono?: boolean; small?: boolean; sans?: boolean; extra?: string }) {
  return (
    <div className="flex min-w-0 flex-col gap-0.5">
      <div className="text-[10.5px] text-[--n-500]">{label}</div>
      <div
        className={
          (mono ? "font-mono " : "") +
          (sans ? "font-sans " : "") +
          "font-medium tracking-[-0.005em] " +
          (small
            ? "text-[14px] text-[--n-700] dark:text-[--n-700]"
            : "text-[14px] text-[--n-950] dark:text-white") +
          (sans ? " text-[12px] text-[--n-500] font-normal" : "")
        }
      >
        {value}
        {extra && (
          <span className="ml-1 font-mono text-[10.5px] tracking-[0.04em] text-[--n-300]">
            {extra}
          </span>
        )}
      </div>
    </div>
  );
}

function AdminInput({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-[10.5px] text-[--n-500]">{label}</div>
      <input
        defaultValue={value}
        className="h-8 rounded-md border border-[--n-200] bg-[--n-0] px-2.5 font-mono text-[13px] font-medium text-[--n-950] outline-none focus:border-[--p-500] focus:shadow-[0_0_0_3px_rgba(75,91,245,0.12)] dark:border-white/[0.12] dark:bg-white/[0.04] dark:text-white"
      />
    </div>
  );
}

function AdminRow({ l, r, last }: { l: string; r: string; last?: boolean }) {
  return (
    <div
      className={
        "flex items-center justify-between py-1.5 " +
        (!last ? "border-b border-dashed border-[--n-150] dark:border-white/[0.08]" : "")
      }
    >
      <span className="text-[12px] text-[--n-700] dark:text-[--n-700]">{l}</span>
      <span className="font-mono text-[12px] font-medium text-[--n-950] dark:text-white">{r}</span>
    </div>
  );
}

/* QR estático — patrón idéntico al canónico (no es un QR real, es una representación) */
function QRStatic() {
  return (
    <svg
      viewBox="0 0 100 100"
      shapeRendering="crispEdges"
      className="h-[200px] w-[200px] rounded-md border border-[--n-150] bg-white p-2.5 dark:border-white/[0.08]"
    >
      <rect width="100" height="100" fill="#fff" />
      <g fill="#101828">
        {/* Position markers */}
        <rect x="6" y="6" width="22" height="22" />
        <rect x="10" y="10" width="14" height="14" fill="#fff" />
        <rect x="14" y="14" width="6" height="6" />
        <rect x="72" y="6" width="22" height="22" />
        <rect x="76" y="10" width="14" height="14" fill="#fff" />
        <rect x="80" y="14" width="6" height="6" />
        <rect x="6" y="72" width="22" height="22" />
        <rect x="10" y="76" width="14" height="14" fill="#fff" />
        <rect x="14" y="80" width="6" height="6" />
        {/* Data pattern */}
        {[
          [32,6],[40,6],[48,6],[56,6],[64,6],
          [32,14],[44,14],[52,14],[64,14],
          [36,22],[44,22],[56,22],[64,22],
          [6,32],[14,32],[22,32],[32,32],[40,32],[52,32],[60,32],[68,32],[76,32],[88,32],
          [10,40],[20,40],[28,40],[40,40],[48,40],[56,40],[64,40],[76,40],[84,40],[92,40],
          [6,48],[16,48],[32,48],[44,48],[52,48],[60,48],[72,48],[80,48],[88,48],
          [14,56],[24,56],[36,56],[48,56],[56,56],[68,56],[76,56],[92,56],
          [6,64],[20,64],[32,64],[40,64],[52,64],[64,64],[80,64],[88,64],
          [36,72],[44,72],[56,72],[64,72],[76,72],[88,72],
          [32,80],[48,80],[60,80],[72,80],[84,80],[92,80],
          [36,88],[44,88],[56,88],[68,88],[80,88],
        ].map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="4" height="4" />
        ))}
      </g>
    </svg>
  );
}
