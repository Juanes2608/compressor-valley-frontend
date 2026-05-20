import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Shield, Search, Download, User, Filter, Eye, Edit3, Trash2,
  LogIn, LogOut, Lock, Unlock, AlertTriangle, CheckCircle2, Clock,
} from "lucide-react";

export const Route = createFileRoute("/admin/auditoria")({
  head: () => ({ meta: [{ title: "Auditoría · CHV" }] }),
  component: AuditoriaPage,
});

type Severidad = "Info" | "Aviso" | "Crítico";
type Accion = "Crear" | "Editar" | "Eliminar" | "Ver" | "Login" | "Logout" | "Bloquear" | "Aprobar";

type Log = {
  id: string;
  fecha: string;
  hora: string;
  usuario: string;
  rol: string;
  accion: Accion;
  modulo: string;
  entidad: string;
  detalle: string;
  ip: string;
  severidad: Severidad;
};

const LOGS: Log[] = [
  { id: "AUD-48291", fecha: "19 abr 2026", hora: "18:42:14", usuario: "C. Marín",     rol: "Admin",      accion: "Bloquear", modulo: "Cierres",      entidad: "CIE-2026-04-19", detalle: "Firmó y bloqueó cierre diario",            ip: "190.85.12.4",   severidad: "Info" },
  { id: "AUD-48290", fecha: "19 abr 2026", hora: "17:08:52", usuario: "M. Restrepo",  rol: "Operativo",  accion: "Editar",   modulo: "Ventas",       entidad: "V-2847",          detalle: "Cambió método de pago: Efectivo → Transferencia", ip: "190.85.12.18",  severidad: "Aviso" },
  { id: "AUD-48289", fecha: "19 abr 2026", hora: "16:44:01", usuario: "A. Pinto",     rol: "Operativo",  accion: "Crear",    modulo: "OT",           entidad: "OT-2845",         detalle: "Generó orden de trabajo desde V-2847",     ip: "190.85.12.21",  severidad: "Info" },
  { id: "AUD-48288", fecha: "19 abr 2026", hora: "15:22:33", usuario: "L. Ramírez",   rol: "Operativo",  accion: "Aprobar",  modulo: "Conteo",       entidad: "CNT-0182",        detalle: "Aprobó ajuste por divergencia: −2 u SKU-4220-V", ip: "190.85.12.7",   severidad: "Aviso" },
  { id: "AUD-48287", fecha: "19 abr 2026", hora: "14:58:09", usuario: "C. Marín",     rol: "Admin",      accion: "Eliminar", modulo: "Usuarios",     entidad: "USR-0042",        detalle: "Desactivó cuenta de J. Beltrán (ex-empleado)", ip: "190.85.12.4",   severidad: "Crítico" },
  { id: "AUD-48286", fecha: "19 abr 2026", hora: "13:14:27", usuario: "S. Galvis",    rol: "Operativo",  accion: "Crear",    modulo: "Cotizaciones", entidad: "Cot-1042",        detalle: "Creó cotización · Industrial XYZ · $ 18,420,000", ip: "190.85.12.34",  severidad: "Info" },
  { id: "AUD-48285", fecha: "19 abr 2026", hora: "11:42:18", usuario: "D. Mejía",     rol: "Operativo",  accion: "Editar",   modulo: "Inventario",   entidad: "SKU-4521-A",      detalle: "Ajuste manual de stock WH-03: 16 → 18",     ip: "190.85.12.52",  severidad: "Aviso" },
  { id: "AUD-48284", fecha: "19 abr 2026", hora: "09:03:44", usuario: "C. Marín",     rol: "Admin",      accion: "Login",    modulo: "Sistema",      entidad: "—",               detalle: "Inicio de sesión exitoso",                  ip: "190.85.12.4",   severidad: "Info" },
  { id: "AUD-48283", fecha: "19 abr 2026", hora: "08:14:02", usuario: "Sistema",      rol: "Sistema",    accion: "Bloquear", modulo: "Auth",         entidad: "USR-0028",        detalle: "Cuenta bloqueada tras 5 intentos fallidos", ip: "186.42.88.91",  severidad: "Crítico" },
  { id: "AUD-48282", fecha: "18 abr 2026", hora: "19:08:11", usuario: "C. Marín",     rol: "Admin",      accion: "Bloquear", modulo: "Cierres",      entidad: "CIE-2026-04-18", detalle: "Firmó y bloqueó cierre diario",            ip: "190.85.12.4",   severidad: "Info" },
  { id: "AUD-48281", fecha: "18 abr 2026", hora: "16:32:45", usuario: "R. Quintero",  rol: "Operativo",  accion: "Ver",      modulo: "Reportes",     entidad: "REP-ABC-Q1",      detalle: "Descargó reporte ABC trimestre 1",          ip: "190.85.12.71",  severidad: "Info" },
  { id: "AUD-48280", fecha: "18 abr 2026", hora: "14:19:22", usuario: "J. Ospina",    rol: "Operativo",  accion: "Editar",   modulo: "Productos",    entidad: "CMP-2210-K",      detalle: "Actualizó precio: $ 14,200,000 → $ 14,850,000", ip: "190.85.12.45",  severidad: "Aviso" },
];

function PillSeveridad({ s }: { s: Severidad }) {
  const map: Record<Severidad, string> = {
    "Info":    "bg-[--info-50] text-[--info-700] border-[--info-700]/20",
    "Aviso":   "bg-[--warn-50] text-[--warn-700] border-[--warn-700]/20",
    "Crítico": "bg-[--dang-50] text-[--dang-700] border-[--dang-700]/20",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${map[s]}`}>
      {s === "Crítico" && <AlertTriangle className="h-3 w-3" />}
      {s === "Aviso" && <Clock className="h-3 w-3" />}
      {s === "Info" && <CheckCircle2 className="h-3 w-3" />}
      {s}
    </span>
  );
}

function IconAccion({ a }: { a: Accion }) {
  const map: Record<Accion, typeof Eye> = {
    "Crear": CheckCircle2, "Editar": Edit3, "Eliminar": Trash2, "Ver": Eye,
    "Login": LogIn, "Logout": LogOut, "Bloquear": Lock, "Aprobar": Unlock,
  };
  const Icon = map[a];
  return <Icon className="h-3.5 w-3.5 text-[--n-500]" />;
}

function AuditoriaPage() {
  const [q, setQ] = useState("");
  const [filtroSev, setFiltroSev] = useState<Severidad | "Todas">("Todas");
  const [seleccionado, setSeleccionado] = useState<Log | null>(LOGS[0]);

  const filtrados = LOGS.filter((l) => {
    const matchQ = !q || `${l.usuario} ${l.entidad} ${l.detalle} ${l.id}`.toLowerCase().includes(q.toLowerCase());
    const matchS = filtroSev === "Todas" || l.severidad === filtroSev;
    return matchQ && matchS;
  });

  const counts = {
    total: LOGS.length,
    criticos: LOGS.filter((l) => l.severidad === "Crítico").length,
    avisos: LOGS.filter((l) => l.severidad === "Aviso").length,
    hoy: LOGS.filter((l) => l.fecha === "19 abr 2026").length,
  };

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-6">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-[--n-500]">Admin · Auditoría</div>
          <h1 className="mt-1 text-[22px] font-semibold text-[--n-900]">Registro de actividad</h1>
          <p className="mt-1 text-[13px] text-[--n-600]">Trazabilidad completa de acciones críticas. Inmutable y firmado.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex h-9 items-center gap-1.5 rounded-md border border-[--n-200] bg-white px-3 text-[13px] text-[--n-700] hover:bg-[--n-50]">
            <Download className="h-3.5 w-3.5" /> Exportar log
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { icon: Shield,         label: "Eventos totales",  value: counts.total.toString(), sub: "Últimos 7 días" },
          { icon: AlertTriangle,  label: "Críticos",          value: counts.criticos.toString(), sub: "Requieren revisión" },
          { icon: Clock,          label: "Avisos",            value: counts.avisos.toString(), sub: "Cambios sensibles" },
          { icon: CheckCircle2,   label: "Eventos hoy",       value: counts.hoy.toString(), sub: "19 abr 2026" },
        ].map((k) => (
          <div key={k.label} className="rounded-lg border border-[--n-200] bg-white p-4">
            <div className="flex items-center gap-2 text-[--n-500]">
              <k.icon className="h-3.5 w-3.5" />
              <span className="text-[11px] uppercase tracking-wide">{k.label}</span>
            </div>
            <div className="mt-2 font-mono text-[20px] font-semibold tabular-nums text-[--n-900]">{k.value}</div>
            <div className="mt-0.5 text-[11px] text-[--n-500]">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[--n-400]" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por usuario, entidad, ID o detalle…"
            className="h-9 w-full rounded-md border border-[--n-200] bg-white pl-9 pr-3 text-[13px] text-[--n-900] placeholder:text-[--n-400] focus:border-[--p-cta] focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-1 rounded-md border border-[--n-200] bg-white p-1">
          <Filter className="ml-1 h-3.5 w-3.5 text-[--n-500]" />
          {(["Todas", "Info", "Aviso", "Crítico"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFiltroSev(s)}
              className={`rounded px-2.5 py-1 text-[12px] ${filtroSev === s ? "bg-[--n-900] text-white" : "text-[--n-600] hover:bg-[--n-50]"}`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="font-mono text-[11px] text-[--n-500]">{filtrados.length} eventos</div>
      </div>

      {/* Grid: tabla + detalle */}
      <div className="grid gap-4 lg:grid-cols-[1fr_380px]">
        <div className="overflow-hidden rounded-lg border border-[--n-200] bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-[--n-200] text-left text-[11px] uppercase tracking-wide text-[--n-500]">
                  <th className="px-3 py-2.5 font-medium">Fecha · hora</th>
                  <th className="px-3 py-2.5 font-medium">Usuario</th>
                  <th className="px-3 py-2.5 font-medium">Acción</th>
                  <th className="px-3 py-2.5 font-medium">Módulo</th>
                  <th className="px-3 py-2.5 font-medium">Entidad</th>
                  <th className="px-3 py-2.5 font-medium">Severidad</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((l) => (
                  <tr
                    key={l.id}
                    onClick={() => setSeleccionado(l)}
                    data-active={seleccionado?.id === l.id}
                    className="cursor-pointer border-b border-[--n-100] last:border-0 hover:bg-[--n-25] data-[active=true]:bg-[--p-cta]/5"
                  >
                    <td className="px-3 py-3">
                      <div className="text-[--n-900]">{l.fecha}</div>
                      <div className="font-mono text-[11px] text-[--n-500]">{l.hora}</div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <div className="grid h-6 w-6 place-items-center rounded-full bg-[--n-100] text-[10px] font-medium text-[--n-700]">
                          {l.usuario.split(" ").map(p => p[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <div className="text-[--n-900]">{l.usuario}</div>
                          <div className="text-[11px] text-[--n-500]">{l.rol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span className="inline-flex items-center gap-1.5 text-[--n-700]">
                        <IconAccion a={l.accion} /> {l.accion}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-[--n-700]">{l.modulo}</td>
                    <td className="px-3 py-3 font-mono text-[12px] text-[--n-700]">{l.entidad}</td>
                    <td className="px-3 py-3"><PillSeveridad s={l.severidad} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detalle */}
        <div className="rounded-lg border border-[--n-200] bg-white">
          {seleccionado ? (
            <>
              <div className="border-b border-[--n-200] p-4">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-[12px] text-[--n-700]">{seleccionado.id}</div>
                  <PillSeveridad s={seleccionado.severidad} />
                </div>
                <div className="mt-2 text-[14px] font-medium text-[--n-900]">{seleccionado.accion} · {seleccionado.modulo}</div>
                <div className="mt-1 text-[12px] text-[--n-600]">{seleccionado.detalle}</div>
              </div>
              <dl className="divide-y divide-[--n-100]">
                {[
                  { label: "Fecha", value: `${seleccionado.fecha} · ${seleccionado.hora}` },
                  { label: "Usuario", value: `${seleccionado.usuario} (${seleccionado.rol})` },
                  { label: "Entidad", value: seleccionado.entidad, mono: true },
                  { label: "Módulo", value: seleccionado.modulo },
                  { label: "Dirección IP", value: seleccionado.ip, mono: true },
                  { label: "Hash firma", value: "0x8f3a…b29c", mono: true },
                ].map((r) => (
                  <div key={r.label} className="flex items-center justify-between px-4 py-2.5 text-[12px]">
                    <dt className="text-[--n-500]">{r.label}</dt>
                    <dd className={`text-[--n-900] ${r.mono ? "font-mono text-[11.5px]" : ""}`}>{r.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="border-t border-[--n-200] p-3">
                <button className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-md border border-[--n-200] bg-white px-3 text-[13px] text-[--n-700] hover:bg-[--n-50]">
                  <User className="h-3.5 w-3.5" /> Ver historial del usuario
                </button>
              </div>
            </>
          ) : (
            <div className="p-6 text-center text-[12px] text-[--n-500]">Seleccioná un evento</div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center gap-2 rounded-lg border border-[--n-200] bg-[--n-25] px-4 py-3 text-[12px] text-[--n-600]">
        <Shield className="h-3.5 w-3.5 text-[--n-500]" />
        Registro inmutable. Cada evento se firma con hash y queda asociado a IP, usuario y sesión. Retención mínima 5 años.
      </div>
    </div>
  );
}
