/**
 * Datos canónicos de Devoluciones (F12) · v1.0
 * Tab cliente (DEV-C-XXXX) + Tab proveedor (DEV-P-XXXX).
 * Replica 1:1 las filas del HTML de referencia.
 */

export type DevTab = "cliente" | "proveedor";
export type DevEstado = "pen_val" | "aprobada" | "procesada" | "rechazada" | "pen_envio" | "enviada" | "aceptada";
export type DevResol = "cambio" | "nota" | "reembolso" | "pendiente";

export interface DevOrigenLink {
  num: string;
  kind: "v" | "ot" | "oc";
}

export interface DevRow {
  num: string;
  tab: DevTab;
  fecha: string;
  cliente: string;
  telefono: string;
  producto: string;
  productoSub: string;
  origen: DevOrigenLink;
  motivo: string;
  resolucion?: DevResol;
  resolucionLabel?: string;
  valor: number | null;
  estado: DevEstado;
  estadoLabel: string;
  estadoNota?: string;
  loteVencido?: boolean;
  pulse?: boolean;
}

export const DEV_HEADER = {
  mesCliente: 24,
  mesProveedor: 12,
  totalDevuelto: 1450500,
  pendientes: 3,
};

export const DEV_TABS: { id: DevTab; label: string; count: number }[] = [
  { id: "cliente",   label: "Devoluciones de cliente",    count: 5 },
  { id: "proveedor", label: "Devoluciones a proveedor",   count: 3 },
];

export const DEV_FILTROS_C = ["Todas", "Pendiente validación", "Aprobadas", "Rechazadas", "Procesadas"];
export const DEV_FILTROS_P = ["Todas", "Pendiente envío", "Enviadas", "Aceptadas", "Rechazadas"];

export const DEV_ROWS: DevRow[] = [
  // ─── CLIENTE ───
  {
    num: "DEV-C-0421", tab: "cliente", fecha: "Hoy 11:20",
    cliente: "Industrial XYZ S.A.S.", telefono: "+57 318 442 5512",
    producto: "Filtro de aire GA-22", productoSub: "CMP-2210-A · Atlas",
    origen: { num: "V-2843", kind: "v" },
    motivo: "Producto llegó dañado",
    resolucion: "cambio", resolucionLabel: "Cambio de pieza",
    valor: 245000,
    estado: "pen_val", estadoLabel: "Pend. validación", pulse: true,
  },
  {
    num: "DEV-C-0420", tab: "cliente", fecha: "Ayer",
    cliente: "Constructora del Valle", telefono: "+57 312 778 2210",
    producto: "Banda V SPB 2240", productoSub: "BAN-2240-V · Genérica",
    origen: { num: "V-2842", kind: "v" },
    motivo: "Tamaño incorrecto",
    resolucion: "cambio", resolucionLabel: "Cambio de pieza",
    valor: 89500,
    estado: "aprobada", estadoLabel: "Aprobada",
  },
  {
    num: "DEV-C-0419", tab: "cliente", fecha: "17 abr",
    cliente: "Refinadora Pacífico", telefono: "+57 313 718 0044",
    producto: 'Válvula seguridad 1/2"', productoSub: "VHS-3300 · Ind. Hidr.",
    origen: { num: "V-2841", kind: "v" },
    motivo: "Cliente desistió compra",
    resolucion: "reembolso", resolucionLabel: "Reembolso",
    valor: 356000,
    estado: "procesada", estadoLabel: "Procesada",
  },
  {
    num: "DEV-C-0418", tab: "cliente", fecha: "16 abr",
    cliente: "Petrocali S.A.S.", telefono: "+57 315 778 8801",
    producto: "Manguera descarga 1m", productoSub: "CMP-1985-C · Genérica",
    origen: { num: "V-2840", kind: "v" },
    motivo: "Color distinto al solicitado",
    resolucion: "nota", resolucionLabel: "Nota crédito",
    valor: 89500,
    estado: "procesada", estadoLabel: "Procesada",
  },
  {
    num: "DEV-C-0417", tab: "cliente", fecha: "14 abr",
    cliente: "Embotelladora Norte", telefono: "+57 316 226 5510",
    producto: "Aceite ISO VG-46 5L", productoSub: "CMP-2308-B · Shell",
    origen: { num: "V-2839", kind: "v" },
    motivo: "Lote vencido al recibir",
    resolucion: "reembolso", resolucionLabel: "Reembolso",
    valor: 142000,
    estado: "aprobada", estadoLabel: "Aprobada",
    loteVencido: true,
  },
  {
    num: "DEV-C-0416", tab: "cliente", fecha: "12 abr",
    cliente: "Compañía Lácteos Cali", telefono: "+57 314 502 ··",
    producto: "Filtro de aceite", productoSub: "CMP-2308-B · Atlas",
    origen: { num: "OT-2841", kind: "ot" },
    motivo: "Garantía 3 meses · falla prematura",
    resolucion: "cambio", resolucionLabel: "Cambio de pieza",
    valor: 185000,
    estado: "procesada", estadoLabel: "Procesada",
  },
  {
    num: "DEV-C-0415", tab: "cliente", fecha: "10 abr",
    cliente: "Tecnologías del Sur", telefono: "+57 311 446 0078",
    producto: "Compresor portátil", productoSub: "CMP-9100-P · Atlas",
    origen: { num: "V-2837", kind: "v" },
    motivo: "Cliente cambió de opinión",
    resolucion: "pendiente", resolucionLabel: "Pendiente",
    valor: null,
    estado: "rechazada", estadoLabel: "Rechazada",
    estadoNota: "Fuera de política · 8 días",
  },
  {
    num: "DEV-C-0414", tab: "cliente", fecha: "8 abr",
    cliente: "Manufacturas Andes", telefono: "+57 318 558 1100",
    producto: "Llave torque", productoSub: "HRM-0801-T · Genérica",
    origen: { num: "V-2836", kind: "v" },
    motivo: "Producto defectuoso",
    resolucion: "cambio", resolucionLabel: "Cambio de pieza",
    valor: 145000,
    estado: "procesada", estadoLabel: "Procesada",
  },

  // ─── PROVEEDOR ───
  {
    num: "DEV-P-0118", tab: "proveedor", fecha: "19 abr",
    cliente: "Atlas Copco Colombia", telefono: "900.123.456-7",
    producto: "Filtro aire GA-22 · 5 unidades", productoSub: "CMP-2210-A",
    origen: { num: "OC-1842", kind: "oc" },
    motivo: "Defecto fábrica · sellado roto",
    valor: 1225000,
    estado: "pen_envio", estadoLabel: "Pendiente envío",
  },
  {
    num: "DEV-P-0117", tab: "proveedor", fecha: "16 abr",
    cliente: "Industrias Hidráulicas", telefono: "800.442.018-9",
    producto: 'Válvula seguridad 1/2"', productoSub: "VHS-3300",
    origen: { num: "OC-1839", kind: "oc" },
    motivo: "Garantía F13 · falla prematura",
    valor: 640000,
    estado: "enviada", estadoLabel: "Enviada al proveedor", pulse: true,
  },
  {
    num: "DEV-P-0116", tab: "proveedor", fecha: "14 abr",
    cliente: "Shell Lubricantes S.A.", telefono: "860.555.221-3",
    producto: "Aceite ISO · 10 litros", productoSub: "CMP-2308-B",
    origen: { num: "OC-1838", kind: "oc" },
    motivo: "Producto vencido al inventariar",
    valor: 284000,
    estado: "aceptada", estadoLabel: "Aceptada", estadoNota: "Reposición programada",
  },
  {
    num: "DEV-P-0115", tab: "proveedor", fecha: "12 abr",
    cliente: "Sullair Colombia", telefono: "901.220.554-1",
    producto: "Manguera neumática", productoSub: "CMP-2520-A",
    origen: { num: "OC-1837", kind: "oc" },
    motivo: "Error de pedido · referencia equivocada",
    valor: 89500,
    estado: "aceptada", estadoLabel: "Aceptada",
  },
  {
    num: "DEV-P-0114", tab: "proveedor", fecha: "10 abr",
    cliente: "Tornillos y Tuercas SAS", telefono: "901.005.339-4",
    producto: "Tornillería surtida", productoSub: "TRN-MIX-001",
    origen: { num: "OC-1836", kind: "oc" },
    motivo: "Especificación incorrecta",
    valor: 45000,
    estado: "rechazada", estadoLabel: "Rechazada", estadoNota: "Proveedor argumenta uso",
  },
  {
    num: "DEV-P-0113", tab: "proveedor", fecha: "8 abr",
    cliente: "Distribuidora del Sur", telefono: "901.778.110-2",
    producto: "Acoples rápidos", productoSub: "ACR-3800-A",
    origen: { num: "OC-1835", kind: "oc" },
    motivo: "Defecto fábrica",
    valor: 156000,
    estado: "aceptada", estadoLabel: "Aceptada",
  },
];

/* ─── Detalle canónico DEV-C-0421 ─── */
export const DEV_C_0421 = {
  num: "DEV-C-0421",
  estado: "Pendiente validación" as const,
  valor: 245000,
  cliente: {
    razon: "Industrial XYZ S.A.S.",
    nit: "800.123.456-7",
    telefono: "+57 318 442 5512",
    contacto: "Sandra Pérez",
    ventaOrigen: { num: "V-2843", kind: "v" as const },
    fechaVenta: "14 abr · hace 6 días",
    vendedor: "Carlos R.",
    montoVenta: 1450000,
  },
  producto: {
    sku: "CMP-2210-A",
    nombre: "Filtro de aire Atlas Copco GA-22",
    sub: "Atlas · 1613-7409-00 · cantidad ×1",
    valor: 245000,
  },
  motivo:
    'Producto llegó con caja dañada. Cliente reporta que el filtro tiene una abolladura visible en el cuerpo metálico. Solicita cambio por pieza nueva del mismo modelo.',
  politica: { dias: 6, limite: 30, dentro: true },
  checklist: [
    { ok: true,  lbl: "Empaque conservado",        val: "Caja dañada" },
    { ok: true,  lbl: "Producto sin uso",          val: "Sí" },
    { ok: false, lbl: "Etiquetas originales",      val: "Sí" },
    { ok: false, lbl: "Accesorios completos",      val: "Sí" },
    { ok: true,  lbl: "Dentro de política 30 días", val: "6 días", warn: true },
  ],
  resolucion: { tipo: "cambio" as const, label: "Cambio de pieza", stock: 12, sede: "Cali" },
  timeline: [
    { dot: "info", act: "Devolución creada",      meta: "Diego P. · Bodega Cali", time: "Hoy 11:20" },
    { dot: "warn", act: "En espera de validación", meta: "Asignado a Carlos R.",   time: "Hoy 11:22" },
    { dot: "neut" as const, act: "Pendiente: aprobación", meta: "Próximo paso", time: "—" },
  ],
};
