/**
 * Mock data canónico CHV importado desde docs/specs/seed.json.
 * Tipado lo mínimo necesario para que el resto de la app pueda consumirlo.
 */
import seedRaw from "@/data/seed.json";

export interface Sede {
  id: string;
  nombre: string;
  completo: string;
  ciudad: string;
  principal?: boolean;
  color: string;
  sede_color: string;
}

export interface Usuario {
  id: string;
  nombre: string;
  iniciales: string;
  rol: string;
  email: string;
  sede_default: string;
  activo: boolean;
  ultima_conexion: string;
}

export interface Producto {
  sku: string;
  nombre: string;
  marca: string;
  modelo?: string;
  categoria: string;
  precio_venta: number;
  costo_promedio?: number;
  stock_por_sede: Record<string, number> | null;
  stock_minimo?: number;
  abc?: string;
  es_servicio?: boolean;
}

export interface Cliente {
  razon_social: string;
  nit: string;
  contacto?: string;
  telefono?: string;
  email?: string;
  veces_comprado: number;
}

export interface CicloComercial {
  cotizacion: Record<string, unknown> & { id: string; total: number; estado: string; cliente_razon_social: string };
  venta:      Record<string, unknown> & { id: string; total: number; estado: string };
  recibo:     Record<string, unknown> & { id: string; monto_total: number; estado: string };
  orden_trabajo: Record<string, unknown> & { id: string; estado_actual: string; saldo_pendiente: number };
}

export interface Seed {
  sedes: Sede[];
  usuarios: Usuario[];
  categorias: Array<{ id: string; nombre: string; color: string; descripcion: string }>;
  productos_canonicos: Producto[];
  clientes_recurrentes: Cliente[];
  proveedores: Array<{ nit: string; razon_social: string; contacto?: string; condiciones_pago: string }>;
  ciclo_comercial_canonico: CicloComercial;
  estados_ot: Array<{ id: string; nombre: string; color_semantico: string }>;
  estados_cotizacion: Array<{ id: string; nombre: string; color: string }>;
  herramientas_taller: Array<Record<string, unknown> & { id: string; nombre: string; estado: string }>;
  checklist_oficial_24_items: Array<{ orden: number; item: string; categoria: string }>;
}

export const seed = seedRaw as unknown as Seed;
export const cicloCanonico = seed.ciclo_comercial_canonico;
