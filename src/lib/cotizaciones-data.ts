/**
 * Datos canónicos de Cotizaciones (lista de 8 filas, tabs y conteos).
 * Fuente: "Cotizaciones Lista · 6 vistas (single file).html" (frame 1).
 * Ciclo industrial XYZ: Cot-1042 -> OT-2845.
 */

export type CotEstado = "borr" | "env" | "apr" | "rec" | "ven" | "conv";

export interface CotRow {
  num: string;
  fecha: string;
  cliente: string;
  telefono: string;
  productos: string;
  valor: number;
  validez: { label: string; tone: "norm" | "warn" | "dang"; icon?: "alert" | "clock" };
  estado: CotEstado;
  ot?: string | null;
}

export const COT_ESTADOS: { id: CotEstado; label: string }[] = [
  { id: "borr", label: "Borrador" },
  { id: "env",  label: "Enviada" },
  { id: "apr",  label: "Aprobada" },
  { id: "rec",  label: "Rechazada" },
  { id: "ven",  label: "Vencida" },
  { id: "conv", label: "Convertida" },
];

export const COT_COUNTS: Record<CotEstado | "all", number> = {
  all: 33, borr: 2, env: 3, apr: 8, rec: 1, ven: 4, conv: 15,
};

export const COTIZACIONES_ROWS: CotRow[] = [
  {
    num: "Cot-1042", fecha: "19 abr 26",
    cliente: "Industrial XYZ S.A.S.", telefono: "+57 318 442 ··",
    productos: "Reparación compresor GA-22 + 3 más",
    valor: 1840000,
    validez: { label: "12 días", tone: "norm" },
    estado: "apr", ot: "OT-2845",
  },
  {
    num: "Cot-1041", fecha: "18 abr 26",
    cliente: "Petrocali S.A.S.", telefono: "+57 315 778 ··",
    productos: "10 mangueras de descarga 1/2\"",
    valor: 620500,
    validez: { label: "11 días", tone: "norm" },
    estado: "env", ot: null,
  },
  {
    num: "Cot-1040", fecha: "18 abr 26",
    cliente: "Manufacturera del Pacífico", telefono: "+57 312 045 ··",
    productos: "Compresor Sullair LS-110 nuevo",
    valor: 24500000,
    validez: { label: "11 días", tone: "norm" },
    estado: "borr", ot: null,
  },
  {
    num: "Cot-1039", fecha: "17 abr 26",
    cliente: "Industrias Andinas", telefono: "+57 320 119 ··",
    productos: "Servicio mantenimiento + filtros",
    valor: 890000,
    validez: { label: "Hace 2 días", tone: "dang", icon: "alert" },
    estado: "ven", ot: null,
  },
  {
    num: "Cot-1038", fecha: "16 abr 26",
    cliente: "Compañía Lácteos Cali", telefono: "+57 314 502 ··",
    productos: "Repuestos Atlas Copco GA-22",
    valor: 445300,
    validez: { label: "9 días", tone: "norm" },
    estado: "conv", ot: "OT-2841",
  },
  {
    num: "Cot-1037", fecha: "15 abr 26",
    cliente: "Constructora del Valle", telefono: "+57 311 894 ··",
    productos: "5 herramientas neumáticas + acc.",
    valor: 1215000,
    validez: { label: "5 días", tone: "warn", icon: "clock" },
    estado: "apr", ot: null,
  },
  {
    num: "Cot-1036", fecha: "14 abr 26",
    cliente: "Embotelladora Norte", telefono: "+57 316 226 ··",
    productos: "Lote completo lubricantes 50L",
    valor: 782000,
    validez: { label: "Hace 4 días", tone: "dang", icon: "alert" },
    estado: "rec", ot: null,
  },
  {
    num: "Cot-1035", fecha: "12 abr 26",
    cliente: "Refinadora Pacífico", telefono: "+57 313 718 ··",
    productos: "Reparación urgente válvula seg.",
    valor: 356000,
    validez: { label: "Hace 6 días", tone: "dang", icon: "alert" },
    estado: "conv", ot: null,
  },
];

export const COT_PAGINATION = { shown: 8, total: 33, page: 1, totalPages: 5 };
