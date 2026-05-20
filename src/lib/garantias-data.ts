/**
 * Datos canónicos de Garantías F13 · v1.0
 * Tab ventas (GAR-V-XXXX) + Tab compras (GAR-C-XXXX).
 * Replica 1:1 las filas del HTML de referencia 7.1.
 */

export type GarTab = "ventas" | "compras";

export type GarEstadoV = "activa" | "proceso" | "resuelta" | "aprobada" | "rechazada";
export type GarEstadoC = "enviada" | "aceptada" | "rechazada" | "activa";
export type GarEstado = GarEstadoV | GarEstadoC;

export type GarResolV = "reparacion" | "cambio" | "reembolso";
export type GarResolC = "reposicion" | "nota";
export type GarResol = GarResolV | GarResolC;

export type DiasTone = "ok" | "warn" | "danger";

export interface GarRowV {
  num: string;
  tab: "ventas";
  fecha: string;
  cliente: string;
  telefono: string;
  producto: string;
  productoSub: string;
  ventaOrigen: string;
  vencimiento: string;
  dias: number;
  diasTone: DiasTone;
  resolucion: GarResolV;
  resolucionLabel: string;
  estado: GarEstadoV;
  estadoLabel: string;
  estadoNota?: string;
  pulse?: boolean;
  warnRow?: boolean;
}

export interface GarRowC {
  num: string;
  tab: "compras";
  fecha: string;
  proveedor: string;
  nit: string;
  producto: string;
  productoSub: string;
  ocOrigen: string;
  motivo: string;
  resolucion: GarResolC;
  resolucionLabel: string;
  valor: number;
  estado: GarEstadoC;
  estadoLabel: string;
  estadoNota?: string;
  altoValor?: boolean;
  pulse?: boolean;
}

export type GarRow = GarRowV | GarRowC;

export const GAR_HEADER = {
  ventasActivas: 23,
  comprasActivas: 12,
  pendientes: 1,
  valorEnGarantia: 1450500,
};

export const GAR_TABS: { id: GarTab; label: string; sub: string; count: number }[] = [
  { id: "ventas",  label: "Garantías de ventas",   sub: "Cliente reclama producto vendido", count: 3 },
  { id: "compras", label: "Garantías de compras",  sub: "Reclamo a proveedor por defecto",  count: 2 },
];

export const GAR_FILTROS_V = ["Todas", "Activas", "En proceso", "Aprobadas", "Resueltas", "Rechazadas"];
export const GAR_FILTROS_C = ["Todas", "Activas", "Enviadas", "Aceptadas", "Rechazadas"];

export const GAR_ROWS: GarRow[] = [
  // ─── VENTAS ───
  {
    num: "GAR-V-0042", tab: "ventas", fecha: "Hoy 10:15",
    cliente: "Industrial XYZ S.A.S.", telefono: "+57 318 442 5512",
    producto: "Filtro de aire GA-22", productoSub: "CMP-2210-A · Atlas Copco · Serie 8472",
    ventaOrigen: "V-2843",
    vencimiento: "30 jun 2026", dias: 46, diasTone: "ok",
    resolucion: "reparacion", resolucionLabel: "Reparación",
    estado: "activa", estadoLabel: "Activa",
  },
  {
    num: "GAR-V-0041", tab: "ventas", fecha: "Ayer",
    cliente: "Compañía Lácteos Cali", telefono: "+57 314 502 ··",
    producto: "Compresor portátil", productoSub: "CMP-9100-P · Atlas Copco · Serie 8389",
    ventaOrigen: "V-2841",
    vencimiento: "18 jun 2026", dias: 34, diasTone: "warn",
    resolucion: "cambio", resolucionLabel: "Cambio de pieza",
    estado: "proceso", estadoLabel: "En proceso", pulse: true,
  },
  {
    num: "GAR-V-0040", tab: "ventas", fecha: "15 abr",
    cliente: "Petrocali S.A.S.", telefono: "+57 315 778 8801",
    producto: "Manguera descarga 1m", productoSub: "CMP-1985-C",
    ventaOrigen: "V-2840",
    vencimiento: "14 jul 2026", dias: 60, diasTone: "ok",
    resolucion: "cambio", resolucionLabel: "Cambio de pieza",
    estado: "resuelta", estadoLabel: "Resuelta",
  },
  {
    num: "GAR-V-0039", tab: "ventas", fecha: "12 abr",
    cliente: "Constructora del Valle", telefono: "+57 312 778 2210",
    producto: "Banda V SPB 2240", productoSub: "BAN-2240-V",
    ventaOrigen: "V-2842",
    vencimiento: "28 may 2026", dias: 13, diasTone: "warn",
    resolucion: "reparacion", resolucionLabel: "Reparación",
    estado: "proceso", estadoLabel: "En proceso", pulse: true, warnRow: true,
  },
  {
    num: "GAR-V-0038", tab: "ventas", fecha: "10 abr",
    cliente: "Refinadora Pacífico", telefono: "+57 313 718 0044",
    producto: 'Válvula seguridad 1/2"', productoSub: "VHS-3300",
    ventaOrigen: "V-2841",
    vencimiento: "9 jul 2026", dias: 55, diasTone: "ok",
    resolucion: "reembolso", resolucionLabel: "Reembolso",
    estado: "aprobada", estadoLabel: "Aprobada",
  },
  {
    num: "GAR-V-0037", tab: "ventas", fecha: "8 abr",
    cliente: "Embotelladora Norte", telefono: "+57 316 226 5510",
    producto: "Aceite ISO VG-46 5L", productoSub: "CMP-2308-B · Shell",
    ventaOrigen: "V-2839",
    vencimiento: "7 jul 2026", dias: 53, diasTone: "ok",
    resolucion: "cambio", resolucionLabel: "Cambio de pieza",
    estado: "resuelta", estadoLabel: "Resuelta",
  },
  {
    num: "GAR-V-0036", tab: "ventas", fecha: "5 abr",
    cliente: "Tecnologías del Sur", telefono: "+57 311 446 0078",
    producto: "Compresor portátil", productoSub: "CMP-9100-P · Atlas Copco · Serie 8201",
    ventaOrigen: "V-2837",
    vencimiento: "4 jul 2026", dias: 50, diasTone: "ok",
    resolucion: "reembolso", resolucionLabel: "Reembolso",
    estado: "rechazada", estadoLabel: "Rechazada", estadoNota: "Uso fuera de especificación",
  },
  {
    num: "GAR-V-0035", tab: "ventas", fecha: "1 abr",
    cliente: "Manufacturas Andes", telefono: "+57 318 558 1100",
    producto: "Llave torque", productoSub: "HRM-0801-T",
    ventaOrigen: "V-2836",
    vencimiento: "30 jun 2026", dias: 46, diasTone: "ok",
    resolucion: "reparacion", resolucionLabel: "Reparación",
    estado: "resuelta", estadoLabel: "Resuelta",
  },
  // ─── COMPRAS ───
  {
    num: "GAR-C-0018", tab: "compras", fecha: "19 abr",
    proveedor: "Atlas Copco Colombia", nit: "900.123.456-7",
    producto: "Filtro aire GA-22 · 5 und", productoSub: "CMP-2210-A",
    ocOrigen: "OC-1842", motivo: "Defecto fábrica",
    resolucion: "reposicion", resolucionLabel: "Reposición física",
    valor: 1225000,
    estado: "enviada", estadoLabel: "Enviada al proveedor", pulse: true,
  },
  {
    num: "GAR-C-0017", tab: "compras", fecha: "16 abr",
    proveedor: "Industrias Hidráulicas", nit: "800.442.018-9",
    producto: 'Válvula seguridad 1/2"', productoSub: "VHS-3300",
    ocOrigen: "OC-1839", motivo: "Vicio oculto",
    resolucion: "reposicion", resolucionLabel: "Reposición física",
    valor: 640000,
    estado: "aceptada", estadoLabel: "Aceptada", estadoNota: "Reposición programada",
  },
  {
    num: "GAR-C-0016", tab: "compras", fecha: "14 abr",
    proveedor: "Sullair Colombia", nit: "901.220.554-1",
    producto: "Compresor LS-110", productoSub: "CMP-1100-L · Serie 7889",
    ocOrigen: "OC-1838", motivo: "Falla prematura",
    resolucion: "nota", resolucionLabel: "Nota crédito",
    valor: 24500000,
    estado: "activa", estadoLabel: "Activa", altoValor: true,
  },
  {
    num: "GAR-C-0015", tab: "compras", fecha: "10 abr",
    proveedor: "Bandas Industriales SA", nit: "901.448.012-3",
    producto: "Banda transmisión · 3 und", productoSub: "BAN-3010-X",
    ocOrigen: "OC-1833", motivo: "Defecto fábrica",
    resolucion: "nota", resolucionLabel: "Nota crédito",
    valor: 185000,
    estado: "aceptada", estadoLabel: "Aceptada",
  },
  {
    num: "GAR-C-0014", tab: "compras", fecha: "5 abr",
    proveedor: "Shell Lubricantes S.A.", nit: "860.555.221-3",
    producto: "Aceite ISO · 8 litros", productoSub: "CMP-2308-B",
    ocOrigen: "OC-1832", motivo: "Vicio oculto",
    resolucion: "reposicion", resolucionLabel: "Reposición física",
    valor: 228000,
    estado: "rechazada", estadoLabel: "Rechazada", estadoNota: "Sin evidencia de defecto",
  },
];

// ─── Detalle canónico GAR-V-0042 ───
export const GAR_V_0042 = {
  num: "GAR-V-0042",
  tab: "ventas" as const,
  cliente: {
    razon: "Industrial XYZ S.A.S.",
    nit: "800.123.456-7",
    contacto: "Sandra Pérez",
    cargo: "Jefe de mantenimiento",
    telefono: "+57 318 442 5512",
    email: "compras@industrialxyz.co",
  },
  producto: {
    sku: "CMP-2210-A",
    nombre: "Filtro de aire Atlas Copco GA-22",
    marca: "Atlas Copco",
    modelo: "1613-7409-00",
    serie: "Serie 8472",
    fechaInstalacion: "15 abr 2026",
    categoria: "Compresores",
  },
  venta: {
    num: "V-2843",
    fecha: "14 abr 2026",
    haceDias: 32,
    vendedor: "Carlos R.",
    monto: 245000,
  },
  vencimiento: "30 jun 2026",
  diasRestantes: 46,
  estado: "Activa",
  reclamacion:
    '"Filtro instalado hace 30 días presenta pérdida de presión constante. He revisado las conexiones y están bien apretadas, el problema parece ser del filtro mismo. Necesito reparación o reemplazo urgente porque el compresor opera 12 horas al día."',
  reclamacionMeta: "Reportado vía WhatsApp · hoy 09:15 · Sandra Pérez (Jefe de mantenimiento)",
  proceso: [
    { label: "Reportada", meta: "Hoy 10:15", state: "done" as const },
    { label: "En análisis", meta: "Hoy 11:30", state: "done" as const },
    { label: "Aprobada · Rechazada", meta: "Decisión pendiente", state: "active" as const },
    { label: "En proceso", meta: "—", state: "pending" as const },
    { label: "Resuelta", meta: "—", state: "pending" as const },
  ],
  resoluciones: [
    {
      id: "reparacion",
      title: "Reparación del producto",
      sub: "El producto se diagnostica y repara en taller. Tiempo estimado: 3 a 5 días hábiles. Sin costo para el cliente. Genera OT interna asociada a esta garantía.",
      selected: true,
    },
    {
      id: "cambio",
      title: "Cambio de pieza por un producto nuevo",
      sub: "Entrega de unidad nueva del mismo modelo desde stock. Verificar disponibilidad en sedes.",
      meta: "Stock disponible: WH-01 · 4 und, WH-02 · 2 und",
    },
    {
      id: "reembolso",
      title: "Reembolso al método de pago original",
      sub: "Devuelve el monto al medio de pago original. Solo Admin puede aprobar reembolsos sobre garantías.",
      meta: "Monto a reembolsar: $ 245.000 · Método original: Transferencia Bancolombia",
    },
  ],
  criterios: [
    { ok: true, text: "Producto dentro de período de garantía (mayor 30 días, menor 90 días)", tag: "Sí" },
    { ok: null, text: "Defecto reproducible en taller", tag: "Pendiente diagnóstico" },
    { ok: true, text: "Uso del producto dentro de especificación de fábrica", tag: "Sí" },
    { ok: true, text: "Sin evidencia de manipulación o sabotaje", tag: "Sí" },
    { ok: true, text: "Defecto cubierto por garantía F13", tag: "Sí" },
  ],
  historial: [
    { title: "Reclamación reportada vía WhatsApp", meta: "Hoy 09:15 · Sandra Pérez" },
    { title: "Producto recibido en taller para análisis", meta: "Hoy 10:15 · Diego P." },
    { title: "Datos del cliente verificados contra V-2843", meta: "Hoy 11:00 · Carlos R." },
    { title: "Estado actual: en análisis · decisión pendiente", meta: "Ahora", warn: true },
  ],
  politica: [
    "Garantía: 90 días desde fecha de venta.",
    "Cubre: defectos de fábrica reproducibles, fallas prematuras.",
    "No cubre: uso fuera de especificación, daño por instalación, modificaciones.",
    "Resolución máxima: reembolso del valor pagado.",
    "Si el defecto requiere análisis del proveedor original, se inicia GAR-C en paralelo.",
  ],
  documentos: [
    { nm: "Factura V-2843.pdf", sz: "142 KB" },
    { nm: "Reporte WhatsApp.pdf", sz: "238 KB" },
    { nm: "Hoja técnica CMP-2210-A.pdf", sz: "512 KB" },
  ],
};

export function getGarantiaById(id: string) {
  if (id === "GAR-V-0042") return GAR_V_0042;
  const row = GAR_ROWS.find((r) => r.num === id);
  return row ?? null;
}
