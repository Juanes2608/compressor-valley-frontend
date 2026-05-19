/**
 * Datos canónicos de Recibos (F14).
 * Fuente: "Recibos · Módulo F14 (single file).html"
 * Ciclo industrial XYZ: Cot-1042 → V-2847 → Rec-1284 → OT-2845
 */

import { VENDORS, type VendorMini } from "@/lib/ventas-data";

export type RecTipo = "cot" | "manual" | "ot";
export type RecEstado = "act" | "anul";

export interface RecLink {
  kind: "cot" | "v" | "ot";
  num: string;
}

export interface RecibroRow {
  num: string;
  fecha: string;
  cliente: string;
  telefono: string;
  concepto: string;
  tipo: RecTipo;
  tipoLabel: string;
  origen: RecLink[];
  total: number;
  tachado?: boolean;
  vendedor: VendorMini;
  estado: RecEstado;
  estadoLabel: string;
  cycle?: boolean;
}

export const RECIBOS_HEADER = {
  mesCount: 284,
  cobrado: "$ 124.6M",
  hoy: 14,
};

export const RECIBOS_TABS: { id: RecTipo | "all"; label: string }[] = [
  { id: "all",    label: "Todos" },
  { id: "cot",    label: "Por cotización" },
  { id: "manual", label: "Manual" },
  { id: "ot",     label: "Vinculados a OT" },
];

export const RECIBOS_ROWS: RecibroRow[] = [
  {
    num: "Rec-1284", fecha: "Hoy 14:25",
    cliente: "Industrial XYZ S.A.S.", telefono: "+57 318 442 5512",
    concepto: "Pago V-2847 · 4 productos",
    tipo: "cot", tipoLabel: "Por cotización",
    origen: [{ kind: "cot", num: "Cot-1042" }, { kind: "v", num: "V-2847" }],
    total: 1840000, vendedor: VENDORS.ml,
    estado: "act", estadoLabel: "Activo", cycle: true,
  },
  {
    num: "Rec-1283", fecha: "Hoy 11:18",
    cliente: "Constructora del Valle", telefono: "+57 312 778 2210",
    concepto: "Pago V-2846 · Bandas industriales",
    tipo: "cot", tipoLabel: "Por cotización",
    origen: [{ kind: "v", num: "V-2846" }],
    total: 450300, vendedor: VENDORS.am,
    estado: "act", estadoLabel: "Activo",
  },
  {
    num: "Rec-1282", fecha: "Ayer 16:42",
    cliente: "Refinadora Pacífico", telefono: "+57 313 718 0044",
    concepto: "Pago V-2845 · Válvula de seguridad",
    tipo: "cot", tipoLabel: "Por cotización",
    origen: [{ kind: "v", num: "V-2845" }],
    total: 356000, vendedor: VENDORS.ml,
    estado: "act", estadoLabel: "Activo",
  },
  {
    num: "Rec-1281", fecha: "Ayer 14:22",
    cliente: "Petrocali S.A.S.", telefono: "+57 315 778 8801",
    concepto: "Abono parcial OT-2843 · mantenimiento mayor",
    tipo: "ot", tipoLabel: "Vinculado a OT",
    origen: [{ kind: "ot", num: "OT-2843" }],
    total: 620500, vendedor: VENDORS.cr,
    estado: "act", estadoLabel: "Activo",
  },
  {
    num: "Rec-1280", fecha: "17 abr",
    cliente: "Embotelladora Norte", telefono: "+57 316 226 5510",
    concepto: "Pago V-2843 · Lubricantes 50L",
    tipo: "cot", tipoLabel: "Por cotización",
    origen: [{ kind: "v", num: "V-2843" }],
    total: 782000, vendedor: VENDORS.am,
    estado: "act", estadoLabel: "Activo",
  },
  {
    num: "Rec-1279", fecha: "16 abr",
    cliente: "Compañía Lácteos Cali", telefono: "+57 314 502 ··",
    concepto: "Adelanto compra · sin venta asociada",
    tipo: "manual", tipoLabel: "Manual",
    origen: [],
    total: 445300, vendedor: VENDORS.ml,
    estado: "act", estadoLabel: "Activo",
  },
  {
    num: "Rec-1278", fecha: "15 abr",
    cliente: "Tecnologías del Sur", telefono: "+57 311 446 0078",
    concepto: "Pago V-2841 · Compresor portátil",
    tipo: "cot", tipoLabel: "Por cotización",
    origen: [{ kind: "v", num: "V-2841" }],
    total: 3450000, tachado: true, vendedor: VENDORS.cr,
    estado: "anul", estadoLabel: "Anulado",
  },
  {
    num: "Rec-1277", fecha: "14 abr",
    cliente: "Manufacturas Andes", telefono: "+57 318 558 1100",
    concepto: "Anticipo OT-2839 · plásticos del Sur",
    tipo: "ot", tipoLabel: "Vinculado a OT",
    origen: [{ kind: "ot", num: "OT-2839" }],
    total: 1215000, vendedor: VENDORS.am,
    estado: "act", estadoLabel: "Activo",
  },
];

/* ────────────── Cotizaciones aprobadas (form nueva) ────────────── */

export interface CotAprobada {
  num: string;
  cliente: string;
  fecha: string;
  total: number;
}

export const COTIZACIONES_APROBADAS: CotAprobada[] = [
  { num: "Cot-1042", cliente: "Industrial XYZ S.A.S.",   fecha: "Aprobada · 19 abr 2026", total: 1840000 },
  { num: "Cot-1038", cliente: "Compañía Lácteos Cali",   fecha: "Aprobada · 16 abr 2026", total: 445300  },
  { num: "Cot-1035", cliente: "Refinadora Pacífico",     fecha: "Aprobada · 12 abr 2026", total: 356000  },
];

/* ────────────── DETALLE Rec-1284 ────────────── */

export const REC_1284 = {
  num: "Rec-1284",
  cliente: {
    razon: "Industrial XYZ S.A.S.",
    nit: "800.123.456-7",
    tel: "+57 318 442 5512",
    contacto: "Sandra Pérez",
    cargo: "Jefe Mantenimiento",
    dir: "Calle 13 #62-50, Yumbo",
  },
  fechaTxt: "15 may 2026 · 14:25",
  fechaCorta: "15 MAY 2026",
  vendedor: VENDORS.ml,
  estadoLabel: "Activo",
  tipo: "cot" as RecTipo,
  tipoLabel: "Por cotización",
  concepto:
    'Pago Cot-1042 · 4 productos (Filtro de aire GA-22, Aceite ISO VG-46, Manguera descarga 1/2", Mantenimiento mayor)',
  total: 1840000,
  pago: {
    metodoLabel: "Transferencia",
    ref: "9384712",
    cuenta: "Bancolombia · Cta. Ahorros 123-4567890-1",
  },
  vinculos: {
    cot:    { num: "Cot-1042", estado: "Aprobada · 19 abr" },
    venta:  { num: "V-2847",   estado: "Completada" },
    ot:     { num: "OT-2845",  estado: "En proceso · saldo $0" },
  },
  consolidacion: {
    abonoPrevio: 500000,
    pagoEsteRecibo: 1340000,
    total: 1840000,
  },
  historial: [
    { tone: "info" as const, act: "Recibo generado desde Cot-1042",       meta: "María L. · datos pre-cargados",               time: "15 may 14:23" },
    { tone: "succ" as const, act: "Consecutivo Rec-1284 asignado por BD", meta: "Auto · sin saltos",                            time: "15 may 14:24" },
    { tone: "succ" as const, act: "Abonos previos consolidados",          meta: "OT-2845 · $500.000 → $0 saldo",                time: "15 may 14:25" },
    { tone: "succ" as const, act: "Recibo activo · PDF generado",         meta: "Enviado a compras@industrialxyz.co",          time: "15 may 14:25" },
  ],
};

export function getReciboDetail(id: string) {
  const row = RECIBOS_ROWS.find((r) => r.num === id);
  if (!row || row.num === REC_1284.num) return REC_1284;
  return {
    ...REC_1284,
    num: row.num,
    cliente: { ...REC_1284.cliente, razon: row.cliente, tel: row.telefono },
    fechaTxt: row.fecha,
    vendedor: row.vendedor,
    estadoLabel: row.estadoLabel,
    tipo: row.tipo,
    tipoLabel: row.tipoLabel,
    concepto: row.concepto,
    total: row.total,
    vinculos: {
      cot:   row.origen.find((o) => o.kind === "cot") ? { num: row.origen.find((o) => o.kind === "cot")!.num, estado: "Aprobada" } : { num: "—", estado: "Sin cotización" },
      venta: row.origen.find((o) => o.kind === "v")   ? { num: row.origen.find((o) => o.kind === "v")!.num,   estado: "Completada" } : { num: "—", estado: "Sin venta" },
      ot:    row.origen.find((o) => o.kind === "ot")  ? { num: row.origen.find((o) => o.kind === "ot")!.num,  estado: "En proceso" } : { num: "—", estado: "Sin OT" },
    },
    consolidacion: {
      abonoPrevio: 0,
      pagoEsteRecibo: row.total,
      total: row.total,
    },
    historial: [
      { tone: "info" as const, act: `Recibo ${row.num} emitido`, meta: row.vendedor.nombre, time: row.fecha },
      { tone: row.estado === "anul" ? "info" as const : "succ" as const,
        act: row.estado === "anul" ? "Recibo anulado" : "Recibo activo",
        meta: row.concepto, time: row.fecha },
    ],
  };
}
