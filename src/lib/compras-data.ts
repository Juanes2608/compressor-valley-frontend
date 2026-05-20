export type CompraEstado = "borrador" | "transito" | "completa" | "parcial" | "dev_garantia";

export interface CompraRow {
  num: string;
  fecha: string;
  proveedor: { nombre: string; nit: string };
  productos: string;
  total: number;
  entregaEst: string;
  entregaTone?: "warn" | "dang" | "neut";
  estado: CompraEstado;
  recibido?: { actual: number; total: number };
}

export const COMPRAS_HEADER = {
  mes: 23,
  comprado: 42800000,
  enTransito: 3,
};

export const COMPRAS_TABS: { id: CompraEstado | "all"; label: string }[] = [
  { id: "all", label: "Todas" },
  { id: "borrador", label: "Borrador" },
  { id: "transito", label: "En tránsito" },
  { id: "completa", label: "Recibidas" },
  { id: "parcial", label: "Parciales" },
  { id: "dev_garantia", label: "Dev. garantía" },
];

export const COMPRAS_ROWS: CompraRow[] = [
  { num: "OC-1842", fecha: "19 abr 26", proveedor: { nombre: "Atlas Copco Colombia", nit: "900.123.456-7" }, productos: "Filtros + 3 más · 14 items", total: 4250000, entregaEst: "Hoy 10:30", entregaTone: "warn", estado: "transito" },
  { num: "OC-1841", fecha: "18 abr 26", proveedor: { nombre: "Shell Lubricantes S.A.", nit: "860.555.221-3" }, productos: "Aceite ISO VG-46 · 50L", total: 1420000, entregaEst: "Ayer", estado: "completa", recibido: { actual: 15, total: 15 } },
  { num: "OC-1840", fecha: "17 abr 26", proveedor: { nombre: "Distribuidora del Sur", nit: "901.778.110-2" }, productos: "Mangueras + acoples · 24 items", total: 890000, entregaEst: "20 abr", estado: "parcial", recibido: { actual: 22, total: 24 } },
  { num: "OC-1839", fecha: "16 abr 26", proveedor: { nombre: "Industrias Hidráulicas", nit: "800.442.018-9" }, productos: "Válvulas seguridad · 8 items", total: 640000, entregaEst: "18 abr", estado: "dev_garantia", recibido: { actual: 8, total: 8 } },
  { num: "OC-1838", fecha: "15 abr 26", proveedor: { nombre: "Sullair Colombia", nit: "901.220.554-1" }, productos: "Compresor LS-110", total: 24500000, entregaEst: "22 abr", estado: "transito" },
  { num: "OC-1837", fecha: "14 abr 26", proveedor: { nombre: "Ingersoll Rand Distribución", nit: "860.118.220-7" }, productos: "Repuestos varios · 18 items", total: 1840000, entregaEst: "16 abr", estado: "completa", recibido: { actual: 18, total: 18 } },
  { num: "OC-1836", fecha: "12 abr 26", proveedor: { nombre: "Tornillos y Tuercas SAS", nit: "901.005.339-4" }, productos: "Tornillería · 200 items", total: 215000, entregaEst: "14 abr", estado: "completa", recibido: { actual: 200, total: 200 } },
  { num: "OC-1835", fecha: "10 abr 26", proveedor: { nombre: "Lubricantes del Pacífico", nit: "800.770.991-2" }, productos: "Lubricante sintético · 30L", total: 760000, entregaEst: "13 abr", estado: "completa", recibido: { actual: 6, total: 6 } },
  { num: "OC-1834", fecha: "8 abr 26",  proveedor: { nombre: "Atlas Copco Colombia", nit: "900.123.456-7" }, productos: "Filtros aire GA-22 · 12 items", total: 2940000, entregaEst: "12 abr", estado: "borrador" },
  { num: "OC-1833", fecha: "5 abr 26",  proveedor: { nombre: "Bandas Industriales SA", nit: "860.448.012-3" }, productos: "Bandas en V varios tamaños · 25 items", total: 645000, entregaEst: "8 abr", estado: "completa", recibido: { actual: 25, total: 25 } },
];

/* ============ RECEPCIÓN · OC-1842 ============ */

export type RecEstado = "completo" | "parcial" | "faltante" | "excedente" | "pendiente";

export interface RecLine {
  sku: string;
  nombre: string;
  refProv: string;
  ordenado: number;
  recibido: number;
  estado: RecEstado;
  notas?: string;
}

export interface OCRecepcion {
  num: string;
  proveedor: string;
  llegada: string;
  bodega: string;
  lineas: RecLine[];
}

export const OC_1842_RECEPCION: OCRecepcion = {
  num: "OC-1842",
  proveedor: "Atlas Copco Colombia",
  llegada: "Hoy 10:30",
  bodega: "WH-01 Cali",
  lineas: [
    { sku: "CMP-2210-A", nombre: "Filtro de aire GA-22", refProv: "Atlas Copco · 1613-7409", ordenado: 3, recibido: 3, estado: "completo" },
    { sku: "CMP-2310-A", nombre: "Separador de aceite GA-30", refProv: "Atlas Copco · 2911-0011", ordenado: 2, recibido: 2, estado: "completo" },
    { sku: "CMP-2520-A", nombre: 'Manguera neumática trenzada 1/2"', refProv: "Atlas Copco · 0463-2200", ordenado: 5, recibido: 3, estado: "parcial", notas: "Faltan 2 unidades, proveedor envía mañana" },
    { sku: "CMP-2412-A", nombre: "Kit cabezal Atlas Copco GA-22", refProv: "Atlas Copco · 3000-3338", ordenado: 1, recibido: 0, estado: "faltante", notas: "Producto no incluido en envío" },
    { sku: "CMP-2310-B", nombre: "Empaque cabezal GA-30", refProv: "Atlas Copco · 1622-3699", ordenado: 2, recibido: 3, estado: "excedente", notas: "Proveedor envió 1 unidad extra como cortesía" },
    { sku: "RPT-7011-A", nombre: "Sello de eje GA-22", refProv: "Atlas Copco · 1622-0011", ordenado: 1, recibido: 1, estado: "completo" },
    { sku: "LUB-3320-S", nombre: "Aceite Roto-Xtend 5L", refProv: "Atlas Copco · 1630-0066", ordenado: 1, recibido: 0, estado: "pendiente" },
    { sku: 'ACC-0118-A', nombre: 'Conexión rápida 3/8"', refProv: "Atlas Copco · 0900-0125", ordenado: 1, recibido: 0, estado: "pendiente" },
  ],
};

/* ============ DETALLE · OC-1837 ============ */

export interface OCDetalle {
  num: string;
  proveedor: {
    nombre: string;
    nit: string;
    tel: string;
    contacto: string;
    pago: string;
  };
  recibida: string;
  total: number;
  subtotal: number;
  iva: number;
  items: { sku: string; modelo: string; nombre: string; cant: number; sub: number }[];
  fechas: { creada: string; enviada: string; recibida: string };
  notas: string;
  timeline: { tone: "info" | "succ" | "prog"; act: string; meta: string; time: string }[];
}

export const OC_1837_DETALLE: OCDetalle = {
  num: "OC-1837",
  proveedor: {
    nombre: "Ingersoll Rand Distribución",
    nit: "860.118.220-7",
    tel: "+57 (1) 432 1100",
    contacto: "Patricia Gómez",
    pago: "30 días desde factura",
  },
  recibida: "16 abr 2026 · 11:42",
  total: 1840000,
  subtotal: 1546218,
  iva: 293781,
  items: [
    { sku: "RPT-7012-IR", modelo: "SS-5", nombre: "Kit de filtros SS-5",       cant: 4, sub: 460000 },
    { sku: "RPT-7220-IR", modelo: "SS-5", nombre: "Aceite IR Performance 5L",  cant: 6, sub: 720000 },
    { sku: "RPT-7330-IR", modelo: "SS-5", nombre: "Banda en V SS-5 · A-72",    cant: 4, sub: 320000 },
    { sku: "RPT-7400-IR", modelo: "SS-5", nombre: "Empaque cabezote",          cant: 4, sub: 340000 },
  ],
  fechas: { creada: "14 ABR 2026", enviada: "14 ABR 14:30", recibida: "16 ABR 11:42" },
  notas: "Recepción sin novedades. Mercancía revisada y verificada contra orden por Jorge R. Empaque en buenas condiciones. Productos ingresados al inventario WH-01.",
  timeline: [
    { tone: "info", act: "Orden de compra creada (borrador)", meta: "Jorge R. · OC-1837", time: "14 abr 13:55" },
    { tone: "info", act: "Orden enviada al proveedor", meta: "Email a Patricia Gómez", time: "14 abr 14:30" },
    { tone: "prog", act: "Estado actualizado a En tránsito", meta: "Confirmación del proveedor · Guía YR-882741", time: "15 abr 09:20" },
    { tone: "succ", act: "Mercancía recibida en bodega", meta: "Jorge R. · WH-01 Cali · 18 items verificados", time: "16 abr 11:42" },
    { tone: "succ", act: "Ingreso a inventario", meta: "+4 RPT-7012-IR · +6 RPT-7220-IR · +4 RPT-7330-IR · +4 RPT-7400-IR", time: "16 abr 11:45" },
  ],
};

/* ============ NUEVA · wizard step 2 ============ */

export const NUEVA_OC = {
  num: "OC-1843 (borrador)",
  proveedor: "Atlas Copco Colombia",
  nit: "900.123.456-7",
  pago: "30 días desde factura",
  entrega: "22 may 2026",
  destino: "WH-01 Cali",
  catalogo: [
    { sku: "CMP-2210-A", nombre: "Filtro de aire GA-22",              ref: "1613-7409-00", cant: 6, costo: 142000 },
    { sku: "CMP-2310-A", nombre: "Separador de aceite GA-30",         ref: "2911-0011-44", cant: 4, costo: 218500 },
    { sku: "CMP-2412-A", nombre: "Kit cabezal Atlas Copco GA-22",     ref: "3000-3338-21", cant: 2, costo: 1262000 },
    { sku: "CMP-2520-A", nombre: 'Manguera neumática trenzada 1/2"', ref: "0463-2200-91", cant: 2, costo: 64000 },
  ],
};
