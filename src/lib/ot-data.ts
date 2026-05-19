/**
 * Datos canónicos de Órdenes de Trabajo (F12).
 * Fuente: "Ordenes de Trabajo · 7 vistas (single file).html" + "OT Detalle · 6 vistas (single file).html"
 * Ciclo industrial XYZ: Cot-1042 → V-2847 → Rec-1284 → OT-2845
 */

export type OTEstado = "abierta" | "proceso" | "esperando" | "completada" | "recogida" | "entregada";
export type OTAutorizacion = "pendiente" | "autorizado" | "no_autorizado";

export interface Tecnico {
  ini: string;
  nombre: string;
  variant: "t1" | "t2" | "t3" | "t4" | "t5";
}

export const TECNICOS: Record<Tecnico["variant"], Tecnico> = {
  t1: { ini: "DP", nombre: "Diego P.",   variant: "t1" },
  t2: { ini: "SL", nombre: "Sandra L.",  variant: "t2" },
  t3: { ini: "RM", nombre: "Ricardo M.", variant: "t3" },
  t4: { ini: "MV", nombre: "María V.",   variant: "t4" },
  t5: { ini: "AC", nombre: "Andrés C.",  variant: "t5" },
};

export interface OTRow {
  num: string;
  cliente: string;
  telefono: string;
  equipo: string;
  tipoEquipo: string;
  serie: string;
  tecnico: Tecnico;
  autorizacion: OTAutorizacion;
  estado: OTEstado;
  estadoLabel: string;
  dias: string;
  diasTone?: "warn" | "dang";
  saldo: number;
  vencida?: boolean;
  warnTint?: boolean;
  entregada?: boolean;
  cycle?: boolean;
}

export const OT_HEADER = { abiertas: 14, tecnicos: 6, vencidas: 2 };

export const OT_TABS: { id: OTEstado | "all"; label: string; count: number }[] = [
  { id: "all",        label: "Todas",          count: 14 },
  { id: "abierta",    label: "Abiertas",       count: 3 },
  { id: "proceso",    label: "En proceso",     count: 5 },
  { id: "esperando",  label: "Esperando rep.", count: 2 },
  { id: "completada", label: "Completadas",    count: 2 },
  { id: "recogida",   label: "Pend. recogida", count: 2 },
  { id: "entregada",  label: "Entregadas",     count: 28 },
];

export const OT_ROWS: OTRow[] = [
  {
    num: "OT-2845", cliente: "Industrial XYZ S.A.S.", telefono: "+57 318 442 5512",
    equipo: "Atlas Copco GA-22", tipoEquipo: "Compresor tornillo", serie: "KS-2024-00847",
    tecnico: TECNICOS.t1, autorizacion: "autorizado", estado: "proceso", estadoLabel: "En proceso",
    dias: "1 día", saldo: 1340000, cycle: true,
  },
  {
    num: "OT-2812", cliente: "Lácteos del Valle", telefono: "+57 318 410 2245",
    equipo: "Sullair LS-16", tipoEquipo: "Compresor tornillo", serie: "SN-SL1607-12",
    tecnico: TECNICOS.t2, autorizacion: "autorizado", estado: "recogida", estadoLabel: "Pend. recogida",
    dias: "34 días", diasTone: "warn", saldo: 0, warnTint: true,
  },
  {
    num: "OT-2798", cliente: "Panificadora Andina", telefono: "+57 311 990 4476",
    equipo: "Ingersoll Rand R-30", tipoEquipo: "Compresor pistón", serie: "SN-IR3014-56",
    tecnico: TECNICOS.t3, autorizacion: "autorizado", estado: "recogida", estadoLabel: "Pend. recogida",
    dias: "31 días", diasTone: "warn", saldo: 0, warnTint: true,
  },
  {
    num: "OT-2839", cliente: "Plásticos del Sur", telefono: "+57 315 778 2210",
    equipo: "Kaeser SK-26", tipoEquipo: "Compresor tornillo", serie: "SN-KS2603-44",
    tecnico: TECNICOS.t4, autorizacion: "no_autorizado", estado: "completada", estadoLabel: "Completada",
    dias: "2 días", saldo: 185000,
  },
  {
    num: "OT-2853", cliente: "Cementos Boyacá", telefono: "+57 320 224 6612",
    equipo: "Atlas Copco ZT-15", tipoEquipo: "Compresor tornillo", serie: "SN-AC1518-78",
    tecnico: TECNICOS.t1, autorizacion: "autorizado", estado: "proceso", estadoLabel: "En proceso",
    dias: "2 días", saldo: 870000,
  },
  {
    num: "OT-2851", cliente: "Textiles Pereira", telefono: "+57 313 661 4408",
    equipo: "ChicagoP CP-7510", tipoEquipo: "Compresor pistón", serie: "SN-CP7510-22",
    tecnico: TECNICOS.t3, autorizacion: "autorizado", estado: "proceso", estadoLabel: "En proceso",
    dias: "3 días", saldo: 524000,
  },
  {
    num: "OT-2849", cliente: "Maderas del Pacífico", telefono: "+57 314 887 1192",
    equipo: "Sullair LS-25", tipoEquipo: "Compresor tornillo", serie: "SN-SL2511-09",
    tecnico: TECNICOS.t2, autorizacion: "autorizado", estado: "esperando", estadoLabel: "Esperando rep.",
    dias: "5 días", diasTone: "warn", saldo: 1412000,
  },
  {
    num: "OT-2843", cliente: "Avícola del Eje", telefono: "+57 312 445 0034",
    equipo: "Kaeser SX-8", tipoEquipo: "Compresor tornillo", serie: "SN-KS0844-31",
    tecnico: TECNICOS.t4, autorizacion: "autorizado", estado: "esperando", estadoLabel: "Esperando rep.",
    dias: "6 días", diasTone: "warn", saldo: 735000,
  },
  {
    num: "OT-2858", cliente: "Frigorífico Centro", telefono: "+57 318 226 7783",
    equipo: "Atlas Copco GA-30", tipoEquipo: "Compresor tornillo", serie: "SN-AC3019-65",
    tecnico: TECNICOS.t1, autorizacion: "pendiente", estado: "abierta", estadoLabel: "Abierta",
    dias: "1 día", saldo: 0,
  },
  {
    num: "OT-2820", cliente: "Embotelladora del Pacífico", telefono: "+57 315 332 8870",
    equipo: "Ingersoll Rand SS-5", tipoEquipo: "Compresor pistón", serie: "SN-IR0578-23",
    tecnico: TECNICOS.t3, autorizacion: "autorizado", estado: "entregada", estadoLabel: "Entregada",
    dias: "—", saldo: 0, entregada: true,
  },
  {
    num: "OT-2856", cliente: "Curtiembres del Cauca", telefono: "+57 313 220 7745",
    equipo: "Sullair LS-10", tipoEquipo: "Compresor tornillo", serie: "SN-SL1010-19",
    tecnico: TECNICOS.t4, autorizacion: "pendiente", estado: "abierta", estadoLabel: "Abierta",
    dias: "1 día", saldo: 0,
  },
  {
    num: "OT-2855", cliente: "Bebidas del Norte", telefono: "+57 318 117 5530",
    equipo: "Kaeser SK-20", tipoEquipo: "Compresor tornillo", serie: "SN-KS2007-22",
    tecnico: TECNICOS.t3, autorizacion: "pendiente", estado: "abierta", estadoLabel: "Abierta",
    dias: "2 días", saldo: 0,
  },
  {
    num: "OT-2848", cliente: "Plantas del Sur", telefono: "+57 312 660 1240",
    equipo: "Atlas Copco GA-11", tipoEquipo: "Compresor tornillo", serie: "SN-AC1118-33",
    tecnico: TECNICOS.t4, autorizacion: "autorizado", estado: "proceso", estadoLabel: "En proceso",
    dias: "3 días", saldo: 612000,
  },
  {
    num: "OT-2846", cliente: "Vidriera Andina", telefono: "+57 314 008 5512",
    equipo: "Sullair LS-20", tipoEquipo: "Compresor tornillo", serie: "SN-SL2003-90",
    tecnico: TECNICOS.t2, autorizacion: "autorizado", estado: "proceso", estadoLabel: "En proceso",
    dias: "4 días", saldo: 482000,
  },
  {
    num: "OT-2844", cliente: "Industrias del Pacífico", telefono: "+57 313 559 4480",
    equipo: "Ingersoll Rand R-22", tipoEquipo: "Compresor pistón", serie: "SN-IR2218-71",
    tecnico: TECNICOS.t3, autorizacion: "autorizado", estado: "proceso", estadoLabel: "En proceso",
    dias: "4 días", saldo: 357000,
  },
  {
    num: "OT-2837", cliente: "Llantas y Servicios", telefono: "+57 318 200 1184",
    equipo: "Atlas Copco GX-7", tipoEquipo: "Compresor tornillo", serie: "SN-AC0712-25",
    tecnico: TECNICOS.t3, autorizacion: "autorizado", estado: "completada", estadoLabel: "Completada",
    dias: "3 días", saldo: 0,
  },
];

/* ────────────── KANBAN columns ────────────── */

export const KANBAN_COLUMNS: {
  id: OTEstado;
  label: string;
  dotColor: string;
  pulse?: boolean;
}[] = [
  { id: "abierta",    label: "Abierta",         dotColor: "var(--n-500)" },
  { id: "proceso",    label: "En proceso",      dotColor: "var(--info-500)" },
  { id: "esperando",  label: "Esperando rep.",  dotColor: "var(--warn-500)" },
  { id: "completada", label: "Completada",      dotColor: "var(--succ-500)" },
  { id: "recogida",   label: "Pend. recogida",  dotColor: "var(--warn-500)", pulse: true },
  { id: "entregada",  label: "Entregada",       dotColor: "var(--n-500)" },
];

/* ────────────── DETALLE OT-2845 ────────────── */

export const OT_2845 = {
  num: "OT-2845",
  estadoLabel: "En proceso",
  saldo: 1340000,
  cliente: {
    razon: "Industrial XYZ S.A.S.",
    nit: "800.123.456-7",
    tel: "+57 318 442 5512",
    contacto: "Sandra Pérez",
    cargo: "Jefe Mantenimiento",
    email: "sandra@industrialxyz.co",
    dir: "Calle 13 #62-50, Yumbo",
  },
  equipo: {
    nombre: "Compresor · Atlas Copco GA-22",
    modelo: "8112-3203-12",
    serie: "KS-2024-00847",
    año: "2019",
  },
  autorizacion: {
    estado: "autorizado" as OTAutorizacion,
    fecha: "20 abr 2026 · 09:15",
    por: "Sandra Pérez · vía WhatsApp",
    evidencia: "evidencia.jpg",
    nota: "Se requiere al menos un abono registrado para pasar a En proceso.",
  },
  abonos: [
    { fecha: "20 abr 09:45", monto: 500000, metodo: "Transferencia", ref: "8472", nota: "Pago anticipo autorización" },
  ],
  abonado: 500000,
  saldoTras: 1340000,
  checklist: {
    marcados: 12,
    total: 24,
    items: [
      { lbl: "Compresor", on: true },
      { lbl: "Cabezote", on: true },
      { lbl: "Motor", on: true },
      { lbl: "Manómetro", on: true },
      { lbl: "Filtro de aire", on: true },
      { lbl: "Filtro de aceite", on: true },
      { lbl: "Válvula de seguridad", on: true },
      { lbl: "Mangueras de descarga", on: true },
      { lbl: "Mangueras de aspiración", on: true },
      { lbl: "Cables de alimentación", on: true },
      { lbl: "Ruedas", on: true },
      { lbl: "Patas/soportes", on: true },
      { lbl: "Empaques", on: false },
      { lbl: "Llaves de servicio", on: false },
      { lbl: "Manuales", on: false },
      { lbl: "Acoples", on: false },
      { lbl: "Reguladores de presión", on: false },
      { lbl: "Lubricante incluido", on: false },
      { lbl: "Tablero eléctrico", on: false },
      { lbl: "Sensores", on: false },
      { lbl: "Bobinas", on: false },
      { lbl: "Correas", on: false },
      { lbl: "Carcasa", on: false },
      { lbl: "Documentos del fabricante", on: false },
    ],
    obs: "Llaves de servicio entregadas son genéricas, no las originales del fabricante. Lubricante recibido por debajo del nivel mínimo (vacío parcial).",
  },
  cotizacion: { num: "Cot-1042", fecha: "19 abr 2026", total: 1840000, estado: "Aprobada" },
  venta: { num: "V-2847", estado: "Completada" },
  recibo: { num: "Rec-1284", estado: "Activo" },
  asignacion: {
    tecnico: TECNICOS.t1,
    recepcion: "19 abr 2026",
    entregaEst: "26 abr 2026",
    enTaller: "1 día",
  },
  costos: {
    manoObra: 800000,
    repuestos: 740000,
    subtotal: 1540000,
    iva: 292600,
    total: 1832600,
    saldo: 1340000,
  },
  historial: [
    { tone: "info" as const, time: "hoy · 20 abr 10:00", act: "Estado cambiado a En proceso", meta: "Diego P." },
    { tone: "succ" as const, time: "hoy · 20 abr 09:45", act: "Abono registrado · $500.000", meta: "Sandra L. · Transferencia Ref. 8472" },
    { tone: "succ" as const, time: "hoy · 20 abr 09:15", act: "Cliente autorizó vía WhatsApp", meta: "Sandra L. · Evidencia adjunta" },
    { tone: "info" as const, time: "ayer · 19 abr 14:20", act: "Cotización Cot-1042 generada", meta: "Diego P. · $1.840.000" },
    { tone: "info" as const, time: "ayer · 19 abr 11:00", act: "Diagnóstico iniciado", meta: "Fuga de aceite por sello de eje principal" },
    { tone: "info" as const, time: "ayer · 19 abr 10:30", act: "Equipo recibido en taller", meta: "Checklist marcado: 12 de 24 ítems" },
    { tone: "neut" as const, time: "ayer · 19 abr 09:00", act: "OT abierta", meta: "Industrial XYZ S.A.S." },
  ],
};

export type OTDetail = typeof OT_2845;

export function getOTDetail(id: string): OTDetail {
  if (id === OT_2845.num) return OT_2845;
  const row = OT_ROWS.find((r) => r.num === id);
  if (!row) return OT_2845;
  return {
    ...OT_2845,
    num: row.num,
    estadoLabel: row.estadoLabel,
    saldo: row.saldo,
    cliente: { ...OT_2845.cliente, razon: row.cliente, tel: row.telefono },
    equipo: { ...OT_2845.equipo, nombre: row.equipo, serie: row.serie },
    autorizacion: {
      ...OT_2845.autorizacion,
      estado: row.autorizacion,
    },
    asignacion: { ...OT_2845.asignacion, tecnico: row.tecnico },
    costos: { ...OT_2845.costos, saldo: row.saldo },
  };
}
