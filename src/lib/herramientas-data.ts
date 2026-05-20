/**
 * Datos canónicos · Módulo Herramientas · CHV v1.0
 * Replica 1:1 referencia 7.2 Herramientas.html
 */

export type HrmStatus = "disponible" | "prestada" | "mantenimiento" | "danada";
export type LoanTone = "ok" | "warn" | "danger";

export interface HrmTool {
  id: string;          // HRM-XXXX-X
  nombre: string;
  marca: string;
  modelo: string;
  serie?: string;
  anio?: number;
  costo?: number;
  sede: string;
  ubicacion: string;
  ultCalibracion?: string;
  status: HrmStatus;
  notas?: string;
}

export interface HrmLoan {
  toolId: string;
  userInitials: string;
  userName: string;
  userRole: string;
  userAvatar: string; // av-DP, av-AM, av-SL, av-CR, av-ML, av-CR2
  fechaPrestamo: string;
  fechaEsperada: string;
  fechaEsperadaTexto: string;
  diasUso: number;
  diasUsoTexto: string;
  tone: LoanTone;
  estadoLabel: string;
  pulse?: boolean;
  notas?: string;
  vencidaHace?: number;
}

export interface HrmHistRow {
  userInitials: string;
  userName: string;
  userAvatar: string;
  periodo: string;
  tone: "ok" | "warn" | "danger";
  estadoLabel: string;
  pulse?: boolean;
  sub?: string;
}

export const HRM_HEADER = {
  total: 12,
  prestadas: 2,
  atrasadas: 1,
  mantenimiento: 1,
};

export const HRM_TOOLS: HrmTool[] = [
  { id: "HRM-2410-S", nombre: "Llave torque digital", marca: "Stanley", modelo: "STN-2410", serie: "ST24-00847", anio: 2024, costo: 1450000, sede: "WH-01", ubicacion: "Estante A-03", ultCalibracion: "12 mar 2026", status: "prestada" },
  { id: "HRM-3320-F", nombre: "Multímetro Fluke", marca: "Fluke", modelo: "F-87V", sede: "WH-01", ubicacion: "Estante A-15", status: "prestada" },
  { id: "HRM-1180-B", nombre: "Manómetro digital", marca: "Bosch", modelo: "BCH-MG-100", sede: "WH-01", ubicacion: "Estante A-08", status: "prestada" },
  { id: "HRM-2235-I", nombre: "Pistola neumática", marca: "Ingersoll Rand", modelo: "IR-2235", sede: "WH-01", ubicacion: "Estante B-04", status: "disponible" },
  { id: "HRM-0500-G", nombre: "Generador de ozono", marca: "Generic", modelo: "GZ-500", sede: "WH-01", ubicacion: "Servicio técnico", status: "mantenimiento" },
  { id: "HRM-3601-M", nombre: "Sopladora industrial", marca: "Makita", modelo: "MK-BL360", sede: "WH-02", ubicacion: "Estante C-22", status: "disponible" },
  { id: "HRM-5001-M", nombre: "Calibrador digital", marca: "Mitutoyo", modelo: "MTY-500", sede: "WH-01", ubicacion: "Estante A-11", status: "disponible" },
  { id: "HRM-2002-L", nombre: "Soldadora MIG", marca: "Lincoln", modelo: "LC-MIG-200", sede: "WH-01", ubicacion: "Estante B-09", status: "disponible" },
  { id: "HRM-0501-A", nombre: "Compresor portátil", marca: "Atlas Copco", modelo: "AC-PRT-50", sede: "WH-04", ubicacion: "Estante D-01", status: "disponible" },
  { id: "HRM-2767-M", nombre: "Llave de impacto", marca: "Milwaukee", modelo: "MW-2767", sede: "WH-01", ubicacion: "Servicio técnico", status: "danada" },
  { id: "HRM-PRO-S", nombre: "Linterna industrial", marca: "Streamlight", modelo: "SL-PRO", sede: "WH-01", ubicacion: "Estante A-22", status: "disponible" },
  { id: "HRM-0718-F", nombre: "Tester de presión", marca: "Fluke", modelo: "F-718", sede: "WH-02", ubicacion: "Estante C-15", status: "disponible" },
];

export const HRM_LOANS: HrmLoan[] = [
  {
    toolId: "HRM-2410-S",
    userInitials: "DP", userName: "Diego Páez", userRole: "Técnico", userAvatar: "av-DP",
    fechaPrestamo: "5 abr 2026 · 09:30",
    fechaEsperada: "8 abr 2026",
    fechaEsperadaTexto: "8 abr 2026",
    diasUso: 11, diasUsoTexto: "11 días",
    tone: "danger",
    estadoLabel: "Atrasado",
    pulse: true,
    vencidaHace: 3,
    notas: "Calibración compresores cliente Industrial XYZ. Requerida para diagnóstico inicial de GAR-V-0042.",
  },
  {
    toolId: "HRM-3320-F",
    userInitials: "AM", userName: "Andrés Mejía", userRole: "Vendedor", userAvatar: "av-AM",
    fechaPrestamo: "Hace 2 días",
    fechaEsperada: "Mañana",
    fechaEsperadaTexto: "Mañana",
    diasUso: 2, diasUsoTexto: "2 días",
    tone: "warn",
    estadoLabel: "Próximo a vencer",
  },
  {
    toolId: "HRM-1180-B",
    userInitials: "SL", userName: "Sandra López", userRole: "Bodeguero", userAvatar: "av-SL",
    fechaPrestamo: "Hoy 09:00",
    fechaEsperada: "18 may 2026",
    fechaEsperadaTexto: "18 may 2026",
    diasUso: 0, diasUsoTexto: "0 días",
    tone: "ok",
    estadoLabel: "Activo",
  },
];

export const HRM_HIST: Record<string, HrmHistRow[]> = {
  "HRM-2410-S": [
    { userInitials: "DP", userName: "Diego Páez", userAvatar: "av-DP", periodo: "5 abr · en curso", tone: "warn", pulse: true, estadoLabel: "Pendiente devolución" },
    { userInitials: "AM", userName: "Andrés Mejía", userAvatar: "av-AM", periodo: "25 mar · 28 mar · 3 días", tone: "ok", estadoLabel: "Buen estado" },
    { userInitials: "SL", userName: "Sandra López", userAvatar: "av-SL", periodo: "18 mar · 22 mar · 4 días", tone: "ok", estadoLabel: "Buen estado" },
    { userInitials: "DP", userName: "Diego Páez", userAvatar: "av-DP", periodo: "10 mar · 14 mar · 4 días", tone: "warn", estadoLabel: "Daño leve", sub: "Cable raspado por uso" },
    { userInitials: "CR", userName: "Carlos Ríos", userAvatar: "av-CR", periodo: "1 mar · 3 mar · 2 días", tone: "ok", estadoLabel: "Buen estado" },
  ],
};

export const HRM_TOOL_STATS: Record<string, { total: number; promedio: string; usuarioTop: string; usuarioTopCount: number; dominante: string; dominantePct: string; reparaciones: number; reparacionFecha: string }> = {
  "HRM-2410-S": { total: 23, promedio: "3.5 días", usuarioTop: "Diego Páez", usuarioTopCount: 8, dominante: "Buen estado", dominantePct: "87%", reparaciones: 1, reparacionFecha: "jul 2025" },
};

export function statusToPill(s: HrmStatus): { cls: string; label: string } {
  switch (s) {
    case "disponible":    return { cls: "pill-success", label: "Disponible" };
    case "prestada":      return { cls: "pill-warn", label: "Prestada" };
    case "mantenimiento": return { cls: "pill-neutral", label: "Mantenimiento" };
    case "danada":        return { cls: "pill-danger", label: "Dañada" };
  }
}

export function getTool(id: string): HrmTool | undefined {
  return HRM_TOOLS.find((t) => t.id === id);
}

export function getLoan(toolId: string): HrmLoan | undefined {
  return HRM_LOANS.find((l) => l.toolId === toolId);
}
