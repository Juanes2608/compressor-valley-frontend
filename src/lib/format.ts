/**
 * Helpers de formato CHV.
 * Reglas: COP punto miles sin centavos, fechas "19 abr 2026", IDs mono.
 */

const MESES_COL = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

export function formatCOP(monto: number): string {
  const entero = Math.round(monto);
  const str = entero.toLocaleString("es-CO", { useGrouping: true }).replace(/,/g, ".");
  return `$ ${str}`;
}

export function formatNumber(n: number): string {
  return n.toLocaleString("es-CO").replace(/,/g, ".");
}

export function formatFechaCorta(input: string | Date): string {
  const d = typeof input === "string" ? new Date(input) : input;
  const dia = d.getDate();
  const mes = MESES_COL[d.getMonth()];
  const anio = d.getFullYear();
  return `${dia} ${mes} ${anio}`;
}

export function formatFechaHora(input: string | Date): string {
  const d = typeof input === "string" ? new Date(input) : input;
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${formatFechaCorta(d)} · ${hh}:${mm}`;
}
