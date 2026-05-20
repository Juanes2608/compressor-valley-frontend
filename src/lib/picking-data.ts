export type PickCat = "cmp" | "rpt" | "hrm" | "lbr" | "acc";

export interface PickItem {
  sku: string;
  nombre: string;
  modelo: string;
  cat: PickCat;
  catLabel: string;
  qty: number;
  ubicacion: string;
  pasillo: string;
}

export interface PickingTraspaso {
  id: string;
  origen: string;
  destino: string;
  items: PickItem[];
}

export const PICKING_TR_0124: PickingTraspaso = {
  id: "TR-0124",
  origen: "Bodega Central",
  destino: "Sucursal Norte",
  items: [
    { sku: "SKU-1102", nombre: "Compresor Atlas Copco GA-22", modelo: "Atlas Copco · GA22+", cat: "cmp", catLabel: "Compresores", qty: 1, ubicacion: "A-01-N1", pasillo: "Pasillo A · Estante 1" },
    { sku: "SKU-1144", nombre: "Compresor Sullair LS-16", modelo: "Sullair · LS16-40", cat: "cmp", catLabel: "Compresores", qty: 1, ubicacion: "A-02-N1", pasillo: "Pasillo A · Estante 2" },
    { sku: "SKU-2210", nombre: "Aceite sintético Roto-Inject 20L", modelo: "Atlas Copco · 2901-0522-00", cat: "lbr", catLabel: "Lubricantes", qty: 4, ubicacion: "C-01-N3", pasillo: "Pasillo C · Estante 1" },
    { sku: "SKU-3308", nombre: "Manguera de alta presión 1/2\" x 10m", modelo: "Parker · 471TC-8", cat: "acc", catLabel: "Accesorios", qty: 2, ubicacion: "D-03-N2", pasillo: "Pasillo D · Estante 3" },
    { sku: "SKU-4401", nombre: "Filtro separador aire-aceite", modelo: "Atlas Copco · 1622-3651-00", cat: "rpt", catLabel: "Repuestos", qty: 2, ubicacion: "B-02-N1", pasillo: "Pasillo B · Estante 2" },
    { sku: "SKU-4488", nombre: "Kit de mantenimiento 2000h", modelo: "Atlas Copco · 2906-0964-00", cat: "rpt", catLabel: "Repuestos", qty: 1, ubicacion: "B-03-N2", pasillo: "Pasillo B · Estante 3" },
    { sku: "SKU-5012", nombre: "Llave de torque 1/2\" 20-100Nm", modelo: "Stanley · STMT73588", cat: "hrm", catLabel: "Herramientas", qty: 1, ubicacion: "E-01-N1", pasillo: "Pasillo E · Estante 1" },
    { sku: "SKU-4521-A", nombre: "Filtro de aire Atlas Copco GA-22", modelo: "Atlas Copco · 1613-7409-00", cat: "rpt", catLabel: "Repuestos", qty: 3, ubicacion: "B-04-N2", pasillo: "Pasillo B · Estante 4" },
    { sku: "SKU-4530", nombre: "Filtro de aceite spin-on", modelo: "Atlas Copco · 1613-6105-00", cat: "rpt", catLabel: "Repuestos", qty: 3, ubicacion: "B-04-N3", pasillo: "Pasillo B · Estante 4" },
    { sku: "SKU-2255", nombre: "Grasa multipropósito EP-2 cartucho", modelo: "Mobil · Mobilgrease XHP 222", cat: "lbr", catLabel: "Lubricantes", qty: 6, ubicacion: "C-02-N2", pasillo: "Pasillo C · Estante 2" },
    { sku: "SKU-3320", nombre: "Acople rápido neumático 3/8\"", modelo: "Parker · 30E", cat: "acc", catLabel: "Accesorios", qty: 8, ubicacion: "D-04-N1", pasillo: "Pasillo D · Estante 4" },
    { sku: "SKU-5044", nombre: "Multímetro digital industrial", modelo: "Fluke · 117", cat: "hrm", catLabel: "Herramientas", qty: 1, ubicacion: "E-02-N1", pasillo: "Pasillo E · Estante 2" },
  ],
};

export function getPickingTraspaso(id: string): PickingTraspaso {
  return { ...PICKING_TR_0124, id };
}
