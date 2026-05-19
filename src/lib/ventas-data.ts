/**
 * Datos canónicos de Ventas.
 * Fuente: "Ventas · Módulo completo (single file).html"
 * Ciclo industrial XYZ: Cot-1042 → V-2847 → Rec-1284 → OT-2845
 */

export type PagoMetodo = "efectivo" | "transferencia" | "tarjeta" | "mixto";
export type VentaEstado = "comp" | "devp" | "anul";

export interface VendorMini {
  ini: string;
  nombre: string;
  variant: "ml" | "am" | "cr";
}

export interface VentaRow {
  num: string;
  fecha: string;
  cliente: string;
  telefono: string;
  productos: string;
  vendedor: VendorMini;
  metodo: PagoMetodo;
  metodoLabel: string;
  total: number;
  tachado?: boolean;
  recibo: string;
  estado: VentaEstado;
  estadoLabel: string;
  estadoNota?: string;
  cycle?: boolean;
}

export const VENDORS: Record<VendorMini["variant"], VendorMini> = {
  ml: { ini: "ML", nombre: "María L.",  variant: "ml" },
  am: { ini: "AM", nombre: "Andrés M.", variant: "am" },
  cr: { ini: "CR", nombre: "Carlos R.", variant: "cr" },
};

export const VENTAS_TABS: { id: PagoMetodo | "all"; label: string }[] = [
  { id: "all",           label: "Todas" },
  { id: "efectivo",      label: "Efectivo" },
  { id: "transferencia", label: "Transferencia" },
  { id: "tarjeta",       label: "Tarjeta" },
  { id: "mixto",         label: "Mixto" },
];

export const VENTAS_HEADER = {
  mesCount: 47,
  facturado: "$ 86.4M",
  hoy: 12,
};

export const VENTAS_ROWS: VentaRow[] = [
  {
    num: "V-2847", fecha: "Hoy 14:23",
    cliente: "Industrial XYZ S.A.S.", telefono: "+57 318 442 5512",
    productos: "Filtro GA-22 + Aceite + Manguera + 1 más",
    vendedor: VENDORS.ml,
    metodo: "transferencia", metodoLabel: "Transferencia",
    total: 1840000, recibo: "Rec-1284",
    estado: "comp", estadoLabel: "Completada", cycle: true,
  },
  {
    num: "V-2846", fecha: "Hoy 11:15",
    cliente: "Constructora del Valle", telefono: "+57 312 778 2210",
    productos: "Bandas + 2 más",
    vendedor: VENDORS.am,
    metodo: "efectivo", metodoLabel: "Efectivo",
    total: 450300, recibo: "Rec-1283",
    estado: "comp", estadoLabel: "Completada",
  },
  {
    num: "V-2845", fecha: "Ayer 16:40",
    cliente: "Refinadora Pacífico", telefono: "+57 313 718 0044",
    productos: 'Válvula de seguridad 3/4"',
    vendedor: VENDORS.ml,
    metodo: "mixto", metodoLabel: "Mixto",
    total: 356000, recibo: "Rec-1282",
    estado: "comp", estadoLabel: "Completada",
  },
  {
    num: "V-2844", fecha: "Ayer 14:20",
    cliente: "Petrocali S.A.S.", telefono: "+57 315 778 8801",
    productos: "10 mangueras + 5 más",
    vendedor: VENDORS.cr,
    metodo: "transferencia", metodoLabel: "Transferencia",
    total: 620500, recibo: "Rec-1281",
    estado: "comp", estadoLabel: "Completada",
  },
  {
    num: "V-2843", fecha: "17 abr 26",
    cliente: "Embotelladora Norte", telefono: "+57 316 226 5510",
    productos: "Lubricantes 50L · Lote completo",
    vendedor: VENDORS.am,
    metodo: "tarjeta", metodoLabel: "Tarjeta",
    total: 782000, recibo: "Rec-1280",
    estado: "devp", estadoLabel: "Devuelta parcial", estadoNota: "1 ítem devuelto",
  },
  {
    num: "V-2842", fecha: "16 abr 26",
    cliente: "Compañía Lácteos Cali", telefono: "+57 314 502 ··",
    productos: "Repuestos Atlas Copco GA-22",
    vendedor: VENDORS.ml,
    metodo: "transferencia", metodoLabel: "Transferencia",
    total: 445300, recibo: "Rec-1279",
    estado: "comp", estadoLabel: "Completada",
  },
  {
    num: "V-2841", fecha: "15 abr 26",
    cliente: "Tecnologías del Sur", telefono: "+57 311 446 0078",
    productos: "Compresor portátil + acc.",
    vendedor: VENDORS.cr,
    metodo: "tarjeta", metodoLabel: "Tarjeta",
    total: 3450000, tachado: true, recibo: "Rec-1278",
    estado: "anul", estadoLabel: "Anulada", estadoNota: "Cliente desistió",
  },
  {
    num: "V-2840", fecha: "14 abr 26",
    cliente: "Manufacturas Andes", telefono: "+57 318 558 1100",
    productos: "5 herramientas neumáticas",
    vendedor: VENDORS.am,
    metodo: "efectivo", metodoLabel: "Efectivo",
    total: 1215000, recibo: "Rec-1277",
    estado: "comp", estadoLabel: "Completada",
  },
];

/* ────────────── DETALLE V-2847 ────────────── */

export interface VentaItem {
  sku: string;
  meta: string;
  nombre: string;
  qty: number;
  unit: number;
  subtotal: number;
}

export const V_2847 = {
  num: "V-2847",
  cliente: {
    razon: "Industrial XYZ S.A.S.",
    nit: "800.123.456-7",
    tel: "+57 318 442 5512",
    contacto: "Sandra Pérez",
    cargo: "Jefe Mantenimiento",
  },
  fechaTxt: "14 may 2026 · 14:23",
  vendedor: VENDORS.ml,
  estadoLabel: "Completada",
  productos: [
    { sku: "CMP-2210-A", meta: "Atlas Copco", nombre: "Filtro de aire GA-22",      qty: 3, unit: 245000, subtotal: 735000  },
    { sku: "CMP-2308-B", meta: "Shell",       nombre: "Aceite ISO VG-46 5L",        qty: 2, unit: 142000, subtotal: 284000  },
    { sku: "CMP-1985-C", meta: "Trenzada",    nombre: 'Manguera descarga 1/2" 3m',  qty: 1, unit:  89500, subtotal:  89500  },
    { sku: "LBS-0421-X", meta: "Labor 4h",    nombre: "Mantenimiento mayor",        qty: 1, unit: 437718, subtotal: 437718  },
  ] satisfies VentaItem[],
  subtotal: 1546218,
  iva: 293781,
  total: 1840000,
  pago: {
    label: "Transferencia · Bancolombia",
    fecha: "14 may · 14:23",
    ref: "9384712",
    cuenta: "Bancolombia 123-4567890-1",
  },
  vinculos: {
    origen:  { kind: "Origen",          num: "Cot-1042", estado: "Aprobada"   },
    ot:      { kind: "OT asociada",     num: "OT-2845",  estado: "En proceso" },
    recibo:  { kind: "Recibo emitido",  num: "Rec-1284", estado: "Activo"     },
  },
  historial: [
    { tone: "info" as const, act: "Venta iniciada desde Cot-1042",                       meta: "María L.",                                time: "14 may 13:58" },
    { tone: "info" as const, act: "Productos validados con stock disponible",            meta: "4 items · WH-01",                         time: "14 may 14:18" },
    { tone: "succ" as const, act: "Pago confirmado · Transferencia",                     meta: "Ref. 9384712 · Bancolombia",              time: "14 may 14:22" },
    { tone: "succ" as const, act: "Venta V-2847 completada y recibo Rec-1284 emitido",   meta: "Stock descontado · OT-2845 actualizada", time: "14 may 14:23" },
  ],
};

export function getVentaDetail(id: string) {
  const row = VENTAS_ROWS.find((venta) => venta.num === id);
  if (!row || row.num === V_2847.num) return V_2847;

  const subtotal = Math.round(row.total / 1.19);
  const iva = row.total - subtotal;
  const fallbackSku = `CMP-${row.num.replace("V-", "")}-A`;

  return {
    ...V_2847,
    num: row.num,
    cliente: {
      razon: row.cliente,
      nit: "900.456.789-2",
      tel: row.telefono,
      contacto: "Contacto compras",
      cargo: "Coordinación de mantenimiento",
    },
    fechaTxt: row.fecha,
    vendedor: row.vendedor,
    estadoLabel: row.estadoLabel,
    productos: [
      {
        sku: fallbackSku,
        meta: row.metodoLabel,
        nombre: row.productos,
        qty: 1,
        unit: subtotal,
        subtotal,
      },
    ] satisfies VentaItem[],
    subtotal,
    iva,
    total: row.total,
    pago: {
      label: row.metodoLabel,
      fecha: row.fecha,
      ref: row.recibo.replace("Rec-", "REF-"),
      cuenta: row.metodo === "efectivo" ? "Caja WH-01" : "Bancolombia 123-4567890-1",
    },
    vinculos: {
      origen: { kind: "Origen", num: "Directa", estado: "Venta mostrador" },
      ot: { kind: "OT asociada", num: "—", estado: "No aplica" },
      recibo: { kind: "Recibo emitido", num: row.recibo, estado: row.estado === "anul" ? "Anulado" : "Activo" },
    },
    historial: [
      { tone: "info" as const, act: `Venta ${row.num} registrada`, meta: row.vendedor.nombre, time: row.fecha },
      { tone: row.estado === "anul" ? "info" as const : "succ" as const, act: row.estadoLabel, meta: row.estadoNota ?? `${row.metodoLabel} · ${row.recibo}`, time: row.fecha },
    ],
  };
}
