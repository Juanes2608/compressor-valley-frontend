/**
 * Datos canónicos hardcodeados de Inventario v2 (10 filas, panel detalle SKU-4521-A).
 * Tomados 1:1 del HTML de referencia: "Inventario v2 · 7 vistas (single file).html".
 * Cero JS de populate. Mantener sincronizado con seed.json si el ciclo industrial cambia.
 */

export type CategoriaId = "cmp" | "rpt" | "hrm" | "lbr" | "acc";
export type StockEstado = "s" | "w" | "d" | "n";

export interface StockPorSede {
  CALI: number | null;
  PER: number | null;
  BUG: number | null;
  TUL: number | null;
}
export interface StockEstadoPorSede {
  CALI: StockEstado;
  PER: StockEstado;
  BUG: StockEstado;
  TUL: StockEstado;
}

export interface InventarioRow {
  sku: string;
  nombre: string;
  sub: string;
  categoria: CategoriaId;
  categoriaLabel: string;
  precio: number;
  agotado?: boolean;
  stock: StockPorSede;
  estado: StockEstadoPorSede;
}

export const KPI_TOTAL = 2847;

export const FILTRO_SEDES = [
  { id: "ALL",   label: "Todas las sedes",  count: 2847, on: true  },
  { id: "WH-01", label: "WH-01 Cali",        count: 1184, on: false },
  { id: "WH-02", label: "WH-02 Pereira",     count: 748,  on: false },
  { id: "WH-03", label: "WH-03 Buga",        count: 418,  on: false },
  { id: "WH-04", label: "WH-04 Tuluá",       count: 316,  on: false },
];

export const FILTRO_ESTADO = [
  { id: "s", label: "En stock",            count: 1840, dot: "s" as StockEstado },
  { id: "w", label: "Stock bajo",          count: 312,  dot: "w" as StockEstado },
  { id: "d", label: "Crítico / agotado",   count: 128,  dot: "d" as StockEstado },
  { id: "n", label: "Sin movimiento 90d",  count: 60,   dot: "n" as StockEstado },
];

export const FILTRO_CAT = [
  { id: "cmp" as CategoriaId, label: "Compresores",  count: 186  },
  { id: "rpt" as CategoriaId, label: "Repuestos",    count: 1108 },
  { id: "hrm" as CategoriaId, label: "Herramientas", count: 324  },
  { id: "lbr" as CategoriaId, label: "Lubricantes",  count: 218  },
  { id: "acc" as CategoriaId, label: "Accesorios",   count: 504  },
];

export const INVENTARIO_ROWS: InventarioRow[] = [
  {
    sku: "CMP-2210-K", nombre: "Compresor Kaeser SX-7 5HP", sub: "SX-7 · monofásico",
    categoria: "cmp", categoriaLabel: "Compresores", precio: 14850000,
    stock:  { CALI: 4,    PER: 2,    BUG: null, TUL: 1    },
    estado: { CALI: "s",  PER: "s",  BUG: "n",  TUL: "s"  },
  },
  {
    sku: "SKU-4521-A", nombre: "Filtro de aire GA-22", sub: "F-AT-GA22-001",
    categoria: "rpt", categoriaLabel: "Repuestos", precio: 245000,
    stock:  { CALI: 62,   PER: 34,   BUG: 18,   TUL: 22   },
    estado: { CALI: "s",  PER: "s",  BUG: "s",  TUL: "s"  },
  },
  {
    sku: "CMP-1840-A", nombre: "Compresor Atlas Copco GA-30", sub: "trifásico · 30HP",
    categoria: "cmp", categoriaLabel: "Compresores", precio: 32400000,
    stock:  { CALI: 2,    PER: 1,    BUG: null, TUL: null },
    estado: { CALI: "s",  PER: "s",  BUG: "n",  TUL: "n"  },
  },
  {
    sku: "CMP-1410-S", nombre: "Compresor Sullair LS-110", sub: "3 fases · 11kW",
    categoria: "cmp", categoriaLabel: "Compresores", precio: 18200000, agotado: true,
    stock:  { CALI: null, PER: 0,    BUG: null, TUL: null },
    estado: { CALI: "n",  PER: "d",  BUG: "n",  TUL: "n"  },
  },
  {
    sku: "SKU-4220-V", nombre: 'Válvula Ingersoll 3/4"', sub: "cierre rápido",
    categoria: "rpt", categoriaLabel: "Repuestos", precio: 92000,
    stock:  { CALI: 14,   PER: 3,    BUG: 9,    TUL: 6    },
    estado: { CALI: "s",  PER: "d",  BUG: "s",  TUL: "s"  },
  },
  {
    sku: "RPT-0830-K", nombre: "Kit reparación Kaeser SX-7", sub: "empaques + sellos",
    categoria: "rpt", categoriaLabel: "Repuestos", precio: 328000,
    stock:  { CALI: 2,    PER: 5,    BUG: 4,    TUL: 3    },
    estado: { CALI: "w",  PER: "s",  BUG: "s",  TUL: "s"  },
  },
  {
    sku: "HRM-7102-T", nombre: 'Llave torquímetro 3/4"', sub: "100-500 Nm",
    categoria: "hrm", categoriaLabel: "Herramientas", precio: 1240000,
    stock:  { CALI: 8,    PER: 4,    BUG: 3,    TUL: 2    },
    estado: { CALI: "s",  PER: "s",  BUG: "s",  TUL: "s"  },
  },
  {
    sku: "LBR-2210-AC", nombre: "Aceite Atlas Copco 5L", sub: "sintético compresor",
    categoria: "lbr", categoriaLabel: "Lubricantes", precio: 180000,
    stock:  { CALI: 42,   PER: 28,   BUG: 16,   TUL: 12   },
    estado: { CALI: "s",  PER: "s",  BUG: "s",  TUL: "s"  },
  },
  {
    sku: "ACC-3308-M", nombre: 'Manguera neumática 1/2"', sub: "10m · presión alta",
    categoria: "acc", categoriaLabel: "Accesorios", precio: 72000,
    stock:  { CALI: 24,   PER: 18,   BUG: 3,    TUL: 9    },
    estado: { CALI: "s",  PER: "s",  BUG: "w",  TUL: "s"  },
  },
  {
    sku: "CMP-2540-I", nombre: "Compresor Ingersoll Rand R55", sub: "tornillo · 75HP",
    categoria: "cmp", categoriaLabel: "Compresores", precio: 48600000,
    stock:  { CALI: 1,    PER: 1,    BUG: null, TUL: null },
    estado: { CALI: "s",  PER: "s",  BUG: "n",  TUL: "n"  },
  },
];

/* SKU seleccionado por defecto (panel detalle) */
export const SKU_SELECCIONADO = "SKU-4521-A";

export interface ProveedorRow {
  nombre: string;
  ultimaCompra: string;
  ocCount: number;
  destacado?: boolean;
}
export const PROVEEDORES_DETALLE: ProveedorRow[] = [
  { nombre: "Atlas Copco Colombia",    ultimaCompra: "12 abr 2026", ocCount: 14, destacado: true },
  { nombre: "Repuestos Industriales SAS", ultimaCompra: "28 feb 2026", ocCount: 8  },
  { nombre: "Compresores y Filtros Ltda", ultimaCompra: "14 ene 2026", ocCount: 3  },
];

export interface MovRow {
  dot: "s" | "i" | "p" | "w" | "d";
  titulo: string;
  detalle: string;
  meta: string;
  tiempo: string;
}
export const MOVIMIENTOS_DETALLE: MovRow[] = [
  { dot: "s", titulo: "Venta VT-0247",   detalle: "4 unidades · Industrias Norte", meta: "M. Restrepo · WH-01",         tiempo: "09:34" },
  { dot: "i", titulo: "Compra OC-0182",  detalle: "ingreso 80 u",                   meta: "Atlas Copco · WH-01",          tiempo: "12 abr" },
  { dot: "p", titulo: "Traspaso TR-0091", detalle: "12 u",                          meta: "WH-01 → WH-04",                tiempo: "8 abr"  },
  { dot: "w", titulo: "Ajuste de conteo", detalle: "−2 u",                          meta: "Conteo cíclico Q1 · WH-02",    tiempo: "28 mar" },
  { dot: "d", titulo: "Devolución DV-0034", detalle: "−3 u",                        meta: "Compresores SAS · falla embalaje", tiempo: "22 mar" },
  { dot: "s", titulo: "Venta VT-0238",    detalle: "6 u · Petrocali",               meta: "A. Pinto · WH-01",             tiempo: "18 mar" },
];

export const STOCK_DETALLE = [
  { sede: "WH-01 · Cali",    qty: 62, min: 24, estado: "s" as StockEstado },
  { sede: "WH-02 · Pereira", qty: 34, min: 18, estado: "s" as StockEstado },
  { sede: "WH-03 · Buga",    qty: 18, min: 12, estado: "s" as StockEstado },
  { sede: "WH-04 · Tuluá",   qty: 22, min: 8,  estado: "s" as StockEstado },
];
