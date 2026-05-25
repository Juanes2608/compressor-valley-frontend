/**
 * Traspasos · datos canónicos 1:1 con
 * "Traspasos · Módulo completo (single file).html"
 */

export type TraspasoEstado = "pendiente" | "enviado" | "transito" | "recibido";
export type Bodega = "WH-01" | "WH-02" | "WH-03" | "WH-04";
export type SedeChipKind = "wh01" | "wh02" | "wh03" | "wh04";
export type Badge = "garantia" | "abandonada";

export interface Resp {
  iniciales: string;
  nombre: string;
  avClass: "av-cr" | "av-am" | "av-dp" | "av-sl";
}

export const SEDES_TR: Record<
  Bodega,
  { label: string; corto: string; chip: SedeChipKind; dotVar: string }
> = {
  "WH-01": { label: "WH-01 Cali",   corto: "Cali",   chip: "wh01", dotVar: "var(--succ-500)" },
  "WH-02": { label: "WH-02 Norte",  corto: "Norte",  chip: "wh02", dotVar: "var(--info-500)" },
  "WH-03": { label: "WH-03 Sur",    corto: "Sur",    chip: "wh03", dotVar: "var(--warn-500)" },
  "WH-04": { label: "WH-04 Tuluá",  corto: "Tuluá",  chip: "wh04", dotVar: "var(--prog-500)" },
};

export const RESPS: Record<string, Resp> = {
  CR: { iniciales: "CR", nombre: "Carlos R.", avClass: "av-cr" },
  AM: { iniciales: "AM", nombre: "Andrés M.", avClass: "av-am" },
  DP: { iniciales: "DP", nombre: "Diego P.",  avClass: "av-dp" },
  SL: { iniciales: "SL", nombre: "Sara L.",   avClass: "av-sl" },
};

export interface TraspasoRow {
  id: string;
  fecha: string;
  fechaCorta: string;
  origen: Bodega;
  destino: Bodega;
  productos: number;
  unidades: number;
  productosLead: string;
  motivo: string;
  estado: TraspasoEstado;
  resp: string;
  tiempo: string;
  tiempoTono?: "warn" | "dang";
  badge?: Badge;
}

export const TRASPASOS_ROWS: TraspasoRow[] = [
  { id: "TR-1142", fecha: "Hoy 09:15", fechaCorta: "Hace 15 min", origen: "WH-01", destino: "WH-02",
    productos: 5, unidades: 12, productosLead: "Filtros aire GA-22 + 4 más",
    motivo: "Reposición filtros aire", estado: "pendiente", resp: "CR", tiempo: "15 min" },
  { id: "TR-1141", fecha: "Hoy 08:00", fechaCorta: "Hoy 09:30", origen: "WH-01", destino: "WH-04",
    productos: 8, unidades: 24, productosLead: "Compresor Sullair + 7 más",
    motivo: "Stock crítico bodega Tuluá", estado: "enviado", resp: "AM", tiempo: "Hoy 09:30" },
  { id: "TR-1140", fecha: "Ayer 15:20", fechaCorta: "Ayer 16:40", origen: "WH-02", destino: "WH-03",
    productos: 3, unidades: 6, productosLead: "Filtros + 2 más",
    motivo: "Devolución interna garantía F12", estado: "transito", resp: "DP",
    tiempo: "1 día", tiempoTono: "warn", badge: "garantia" },
  { id: "TR-1139", fecha: "Ayer 10:00", fechaCorta: "Ayer", origen: "WH-01", destino: "WH-03",
    productos: 4, unidades: 9, productosLead: "Aceite ISO + 3 más",
    motivo: "Reposición lubricantes", estado: "recibido", resp: "AM", tiempo: "—" },
  { id: "TR-1138", fecha: "17 abr", fechaCorta: "17 abr", origen: "WH-04", destino: "WH-01",
    productos: 2, unidades: 5, productosLead: "Mangueras + 1 más",
    motivo: "Mercancía abandonada F12 · cliente no reclamó", estado: "recibido", resp: "DP",
    tiempo: "—", badge: "abandonada" },
  { id: "TR-1137", fecha: "15 abr", fechaCorta: "15 abr", origen: "WH-02", destino: "WH-01",
    productos: 12, unidades: 35, productosLead: "Repuestos varios + 11 más",
    motivo: "Consolidación inventario mensual", estado: "recibido", resp: "CR", tiempo: "—" },
];

export const TRASPASOS_HEADER = {
  activos: 3,
  mes: 12,
  productosMovidos: 45,
};

export const ESTADO_PILL: Record<
  TraspasoEstado,
  { label: string; pillCls: string; dotVar: string }
> = {
  pendiente: { label: "Pendiente",  pillCls: "neut", dotVar: "var(--n-400)" },
  enviado:   { label: "Enviado",    pillCls: "info", dotVar: "var(--info-500)" },
  transito:  { label: "En tránsito", pillCls: "warn", dotVar: "var(--warn-500)" },
  recibido:  { label: "Recibido",   pillCls: "succ", dotVar: "var(--succ-500)" },
};

/* Detalle canónico TR-1140 */
export interface TraspasoLinea {
  sku: string;
  nombre: string;
  qty: number;
  precio: number;
}

export const TR_1140_DETALLE = {
  id: "TR-1140",
  origen: "WH-02" as Bodega,
  destino: "WH-03" as Bodega,
  estado: "transito" as TraspasoEstado,
  badge: "garantia" as Badge,
  fechaCreacion: "Ayer 15:20",
  fechaEnvio: "Ayer 16:40",
  respOrigen: "AM",
  respDestino: "DP",
  motivo: "Devolución interna por garantía F12 · 3 filtros con defecto de fabricación detectados en inspección de calidad. Se trasladan a WH-03 Sur para inventario de garantías pendientes.",
  motivoTag: "Garantía F12",
  lineas: [
    { sku: "CMP-2210-A", nombre: "Filtro de aire GA-22", qty: 2, precio: 245000 },
    { sku: "CMP-2308-B", nombre: "Aceite ISO VG-46 5L",  qty: 2, precio: 180000 },
    { sku: "CMP-1985-C", nombre: 'Manguera descarga 1/2"', qty: 2, precio: 92000 },
  ] as TraspasoLinea[],
  timeline: [
    { dot: "neut" as const, act: "Traspaso creado",        meta: "WH-02 Norte · stock reservado", t: "Ayer 15:20" },
    { dot: "info" as const, act: "Enviado",                meta: "Andrés M. · 3 ítems empacados", t: "Ayer 16:40" },
    { dot: "warn" as const, act: "En tránsito hacia WH-03", meta: "Esperando confirmación de recepción", t: "Hoy 09:00" },
  ],
  recepcion: [
    { sku: "CMP-2210-A", nombre: "Filtro de aire GA-22", esperado: 2, recibido: 2, done: true },
    { sku: "CMP-2308-B", nombre: "Aceite ISO VG-46 5L",  esperado: 2, recibido: 0, done: false },
    { sku: "CMP-1985-C", nombre: 'Manguera descarga 1/2"', esperado: 2, recibido: 0, done: false },
  ],
};
