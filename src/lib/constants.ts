/**
 * Constantes canónicas CHV.
 * NO modificar sin actualizar la spec. La lista de módulos es CERRADA.
 */
import {
  Package, Tag, ShoppingCart, FileText, Receipt, Undo2,
  ShoppingBag, Truck, Shield, Wrench, Puzzle, Hammer,
  LayoutDashboard, Bell, BarChart3, TrendingUp, RefreshCw,
  ClipboardCheck, FileBarChart, ClipboardList, Settings, Users,
  type LucideIcon,
} from "lucide-react";

export type Rol = "Admin" | "Bodeguero" | "Vendedor" | "Técnico";

export interface ModuloDef {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  counter?: number;
  reference: string;
}

export interface SeccionDef {
  id: string;
  label: string;
  modulos: ModuloDef[];
}

/* ─── SHELL /ops · 5 secciones · 12 módulos ─── */
export const SECCIONES_OPS: SeccionDef[] = [
  {
    id: "catalogo",
    label: "Catálogo y stock",
    modulos: [
      { id: "inventario", label: "Inventario", href: "/ops/inventario", icon: Package, counter: 2847, reference: "Inventario v2 · 7 vistas (single file).html" },
      { id: "productos",  label: "Productos",  href: "/ops/productos",  icon: Tag, reference: "Inventario v2 · 7 vistas (single file).html" },
    ],
  },
  {
    id: "comercial",
    label: "Operación comercial",
    modulos: [
      { id: "ventas",        label: "Ventas",        href: "/ops/ventas",        icon: ShoppingCart, reference: "Ventas · Módulo completo (single file).html" },
      { id: "cotizaciones",  label: "Cotizaciones",  href: "/ops/cotizaciones",  icon: FileText, counter: 5, reference: "Cotizaciones Lista · 6 vistas (single file).html" },
      { id: "recibos",       label: "Recibos",       href: "/ops/recibos",       icon: Receipt, reference: "Recibos · Módulo F14 (single file).html" },
      { id: "devoluciones",  label: "Devoluciones",  href: "/ops/devoluciones",  icon: Undo2, reference: "Devoluciones · Módulo completo (single file).html" },
    ],
  },
  {
    id: "bodega",
    label: "Bodega y movimiento",
    modulos: [
      { id: "compras",   label: "Compras",   href: "/ops/compras",   icon: ShoppingBag, reference: "Compras · Módulo completo (single file).html" },
      { id: "traspasos", label: "Traspasos", href: "/ops/traspasos", icon: Truck, counter: 3, reference: "Traspasos · Módulo completo (single file).html" },
      { id: "garantias", label: "Garantías", href: "/ops/garantias", icon: Shield, reference: "7.1 Garantias F13.html" },
    ],
  },
  {
    id: "taller",
    label: "Taller",
    modulos: [
      { id: "ordenes-trabajo", label: "Órdenes de Trabajo", href: "/ops/ordenes-trabajo", icon: Wrench, counter: 14, reference: "Ordenes de Trabajo · 7 vistas (single file).html" },
      { id: "ensambles",       label: "Ensambles",          href: "/ops/ensambles",       icon: Puzzle, reference: "(aplazado a v1.1)" },
    ],
  },
  {
    id: "soporte",
    label: "Soporte",
    modulos: [
      { id: "herramientas", label: "Herramientas", href: "/ops/herramientas", icon: Hammer, counter: 2, reference: "7.2 Herramientas.html" },
    ],
  },
];

/* ─── SHELL /admin · 3 secciones · 10 módulos ─── */
export const SECCIONES_ADMIN: SeccionDef[] = [
  {
    id: "vision",
    label: "Visión general",
    modulos: [
      { id: "dashboard", label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard, reference: "Cockpit v2 · 7 vistas (single file).html" },
      { id: "alertas",   label: "Alertas",   href: "/admin/alertas",   icon: Bell, reference: "(pendiente · Fase 10)" },
    ],
  },
  {
    id: "analisis",
    label: "Análisis y reportes",
    modulos: [
      { id: "analisis-abc", label: "Análisis ABC", href: "/admin/analisis-abc", icon: BarChart3, reference: "(pendiente · Fase 10)" },
      { id: "top-10",       label: "Top 10",       href: "/admin/top-10",       icon: TrendingUp, reference: "(pendiente · Fase 10)" },
      { id: "reorden",      label: "Reorden",      href: "/admin/reorden",      icon: RefreshCw, reference: "(pendiente · Fase 10)" },
      { id: "auditoria",    label: "Auditoría",    href: "/admin/auditoria",    icon: ClipboardCheck, reference: "(pendiente · Fase 10)" },
      { id: "cierres",      label: "Cierres",      href: "/admin/cierres",      icon: FileBarChart, reference: "(pendiente · Fase 10)" },
    ],
  },
  {
    id: "operacion-admin",
    label: "Operación administrativa",
    modulos: [
      { id: "conteo-ciclico", label: "Conteo cíclico", href: "/admin/conteo-ciclico", icon: ClipboardList, reference: "(pendiente · Fase 11)" },
      { id: "configuracion",  label: "Configuración",  href: "/admin/configuracion",  icon: Settings, reference: "9 Configuracion y Usuarios.html" },
      { id: "usuarios",       label: "Usuarios",       href: "/admin/usuarios",       icon: Users, reference: "9 Configuracion y Usuarios.html" },
    ],
  },
];

export const MODULOS_OPS = SECCIONES_OPS.flatMap((s) => s.modulos);
export const MODULOS_ADMIN = SECCIONES_ADMIN.flatMap((s) => s.modulos);

/* ─── SEDES ─── */
export const SEDES = [
  { id: "WH-01", nombre: "Cali",  ciudad: "Cali",  principal: true,  semantico: "succ" as const },
  { id: "WH-02", nombre: "Norte", ciudad: "Cali",  principal: false, semantico: "info" as const },
  { id: "WH-03", nombre: "Sur",   ciudad: "Cali",  principal: false, semantico: "warn" as const },
  { id: "WH-04", nombre: "Tuluá", ciudad: "Tuluá", principal: false, semantico: "progress" as const },
];

export const SEDE_DEFAULT = SEDES[0];

/* ─── CATEGORÍAS ─── */
export const CATEGORIAS = [
  { id: "cat-cmp", nombre: "Compresores",   hex: "#4456C2" },
  { id: "cat-rpt", nombre: "Repuestos",     hex: "#159F8A" },
  { id: "cat-hrm", nombre: "Herramientas",  hex: "#7244D5" },
  { id: "cat-lbr", nombre: "Lubricantes",   hex: "#C68420" },
  { id: "cat-acc", nombre: "Accesorios",    hex: "#D24E8E" },
] as const;

/* ─── ROLES ─── */
export const ROLES: { id: Rol; label: Rol }[] = [
  { id: "Admin",     label: "Admin" },
  { id: "Bodeguero", label: "Bodeguero" },
  { id: "Vendedor",  label: "Vendedor" },
  { id: "Técnico",   label: "Técnico" },
];

/* Usuario actual mock (mientras no hay auth real).
 * Carlos Ríos · Admin · WH-01 Cali.
 * Cambiar el id para probar otras vistas de rol. */
export const CURRENT_USER = {
  id: "u-001",
  nombre: "Carlos Ríos",
  iniciales: "CR",
  rol: "Admin" as Rol,
  email: "carlos@cv.co",
  sede_id: "WH-01",
};
