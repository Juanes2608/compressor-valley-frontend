import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Plus, Pencil, MoreHorizontal, Shield, Search, Lock,
} from "lucide-react";

export const Route = createFileRoute("/admin/usuarios")({
  head: () => ({ meta: [{ title: "Usuarios · CHV" }] }),
  component: UsuariosPage,
});

type Rol = "Admin" | "Vendedor" | "Bodeguero" | "Técnico";
type Sede = "WH-01 Cali" | "WH-02 Norte" | "WH-04 Tuluá";

type Usuario = {
  id: string;
  iniciales: string;
  nombre: string;
  email: string;
  rol: Rol;
  sede: Sede;
  activo: boolean;
  ultimaConexion: string;
  permisos: string;
  bloqueado?: boolean; // anti-lockout
};

const USUARIOS: Usuario[] = [
  { id: "USR-001", iniciales: "CR", nombre: "Carlos Ríos",     email: "carlos@cv.co",    rol: "Admin",     sede: "WH-01 Cali",  activo: true, ultimaConexion: "Hoy 09:15",  permisos: "Acceso completo /ops + /admin", bloqueado: true },
  { id: "USR-002", iniciales: "ML", nombre: "María Lozano",    email: "maria@cv.co",     rol: "Vendedor",  sede: "WH-01 Cali",  activo: true, ultimaConexion: "Hoy 11:42",  permisos: "Inventario · Ventas · Cotizaciones · Recibos · Devoluciones · Garantías · Herramientas" },
  { id: "USR-003", iniciales: "AM", nombre: "Andrés Mejía",    email: "andres@cv.co",    rol: "Vendedor",  sede: "WH-02 Norte", activo: true, ultimaConexion: "Hoy 10:30",  permisos: "Inventario · Ventas · Cotizaciones · Recibos · Devoluciones · Garantías · Herramientas" },
  { id: "USR-004", iniciales: "DP", nombre: "Diego Páez",      email: "diego@cv.co",     rol: "Técnico",   sede: "WH-01 Cali",  activo: true, ultimaConexion: "Hoy 13:00",  permisos: "Inventario · OT · Ensambles · Herramientas" },
  { id: "USR-005", iniciales: "SL", nombre: "Sandra López",    email: "sandra@cv.co",    rol: "Bodeguero", sede: "WH-01 Cali",  activo: true, ultimaConexion: "Hoy 08:50",  permisos: "Inventario · Compras · Traspasos · Devoluciones · Garantías · Herramientas" },
  { id: "USR-006", iniciales: "CR", nombre: "Carlos Restrepo", email: "crestrepo@cv.co", rol: "Bodeguero", sede: "WH-04 Tuluá", activo: true, ultimaConexion: "Ayer 16:40", permisos: "Inventario · Compras · Traspasos · Devoluciones · Garantías · Herramientas" },
];

const ROL_STYLE: Record<Rol, { avatar: string; pill: string }> = {
  "Admin":     { avatar: "bg-[--prog-50] text-[--prog-700]", pill: "bg-[--prog-50] text-[--prog-700] border-[--prog-700]/20" },
  "Vendedor":  { avatar: "bg-[--info-50] text-[--info-700]", pill: "bg-[--info-50] text-[--info-700] border-[--info-700]/20" },
  "Bodeguero": { avatar: "bg-[--warn-50] text-[--warn-700]", pill: "bg-[--warn-50] text-[--warn-700] border-[--warn-700]/20" },
  "Técnico":   { avatar: "bg-[--succ-50] text-[--succ-700]", pill: "bg-[--succ-50] text-[--succ-700] border-[--succ-700]/20" },
};

const SEDE_DOT: Record<Sede, string> = {
  "WH-01 Cali":  "bg-[--p-cta]",
  "WH-02 Norte": "bg-[--info-700]",
  "WH-04 Tuluá": "bg-[--warn-700]",
};

function Toggle({ on, locked }: { on: boolean; locked?: boolean }) {
  return (
    <span
      title={locked ? "Eres el único Admin activo, no puedes desactivar tu cuenta" : undefined}
      className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors ${on ? "bg-[--succ-700]" : "bg-[--n-200]"} ${locked ? "opacity-60" : ""}`}
    >
      <span className={`absolute h-3 w-3 rounded-full bg-white shadow-sm transition-all ${on ? "left-3.5" : "left-0.5"}`} />
      {locked && (
        <Lock className="absolute -right-3.5 top-1/2 h-3 w-3 -translate-y-1/2 text-[--n-500]" />
      )}
    </span>
  );
}

function UsuariosPage() {
  const [q, setQ] = useState("");
  const filtrados = USUARIOS.filter((u) =>
    !q || `${u.nombre} ${u.email} ${u.rol}`.toLowerCase().includes(q.toLowerCase())
  );

  const counts = {
    total: USUARIOS.length,
    activos: USUARIOS.filter((u) => u.activo).length,
    admin: USUARIOS.filter((u) => u.rol === "Admin").length,
    vendedor: USUARIOS.filter((u) => u.rol === "Vendedor").length,
    bodeguero: USUARIOS.filter((u) => u.rol === "Bodeguero").length,
    tecnico: USUARIOS.filter((u) => u.rol === "Técnico").length,
  };

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-6">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-[--n-500]">Panel admin · Usuarios</div>
          <h1 className="mt-1 text-[22px] font-semibold text-[--n-900]">Usuarios</h1>
          <p className="mt-1 text-[13px] text-[--n-600]">
            <span className="font-mono tabular-nums text-[--n-900]">{counts.total}</span> usuarios ·{" "}
            <span className="font-mono tabular-nums text-[--n-900]">{counts.activos}</span> activos ·{" "}
            <span className="font-mono tabular-nums text-[--n-900]">{counts.admin}</span> Admin ·{" "}
            <span className="font-mono tabular-nums text-[--n-900]">{counts.vendedor}</span> Vendedores ·{" "}
            <span className="font-mono tabular-nums text-[--n-900]">{counts.bodeguero}</span> Bodegueros ·{" "}
            <span className="font-mono tabular-nums text-[--n-900]">{counts.tecnico}</span> Técnico
          </p>
        </div>
        <button
          title="Disponible en v1.1"
          className="inline-flex h-9 items-center gap-1.5 rounded-md bg-[--p-cta] px-3 text-[13px] font-medium text-white opacity-85 hover:bg-[--p-700]"
        >
          <Plus className="h-3.5 w-3.5" /> Nuevo usuario
        </button>
      </div>

      {/* Banner anti-lockout */}
      <div className="mb-4 flex items-start gap-3 rounded-lg border border-[--info-700]/20 bg-[--info-50] p-4">
        <Shield className="mt-0.5 h-4 w-4 shrink-0 text-[--info-700]" />
        <div>
          <div className="text-[13px] font-medium text-[--info-700]">Protección anti-lockout sobre el único Admin</div>
          <div className="mt-0.5 text-[12px] text-[--n-700]">
            Como única cuenta Admin activa, <b>Carlos Ríos</b> no puede desactivar su propia cuenta ni cambiar su rol.
            Para reasignar permisos Admin, primero crea otro Admin y luego edita los roles.
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="mb-3 flex items-center gap-2">
        <div className="relative flex-1 max-w-[320px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[--n-400]" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar usuarios…"
            className="h-9 w-full rounded-md border border-[--n-200] bg-white pl-9 pr-3 text-[13px] text-[--n-900] placeholder:text-[--n-400] focus:border-[--p-cta] focus:outline-none"
          />
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-hidden rounded-lg border border-[--n-200] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[--n-200] text-left text-[11px] uppercase tracking-wide text-[--n-500]">
                <th className="w-12 px-3 py-2.5"></th>
                <th className="px-3 py-2.5 font-medium">Nombre</th>
                <th className="px-3 py-2.5 font-medium">Rol</th>
                <th className="px-3 py-2.5 font-medium">Sede default</th>
                <th className="px-3 py-2.5 font-medium">Estado</th>
                <th className="px-3 py-2.5 font-medium">Última conexión</th>
                <th className="px-3 py-2.5 font-medium">Permisos resumen</th>
                <th className="w-24 px-3 py-2.5 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((u) => (
                <tr key={u.id} className="border-b border-[--n-100] last:border-0 hover:bg-[--n-25]">
                  <td className="px-3 py-3">
                    <span className={`grid h-8 w-8 place-items-center rounded-full text-[11px] font-semibold ${ROL_STYLE[u.rol].avatar}`}>
                      {u.iniciales}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="font-medium text-[--n-900]">{u.nombre}</div>
                    <div className="mt-0.5 font-mono text-[11px] text-[--n-500]">{u.email}</div>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium ${ROL_STYLE[u.rol].pill}`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                      {u.rol}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-[--n-50] px-2 py-0.5 text-[11.5px] text-[--n-700]">
                      <span className={`h-1.5 w-1.5 rounded-full ${SEDE_DOT[u.sede]}`} />
                      {u.sede}
                    </span>
                  </td>
                  <td className="px-3 py-3"><Toggle on={u.activo} locked={u.bloqueado} /></td>
                  <td className="px-3 py-3 font-mono text-[11px] text-[--n-700]">{u.ultimaConexion}</td>
                  <td className="px-3 py-3 text-[12px] leading-snug text-[--n-700]">{u.permisos}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      <button className="grid h-7 w-7 place-items-center rounded-md text-[--n-600] hover:bg-[--n-100] hover:text-[--n-900]">
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button className="grid h-7 w-7 place-items-center rounded-md text-[--n-600] hover:bg-[--n-100] hover:text-[--n-900]">
                        <MoreHorizontal className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-[--n-200] px-4 py-2.5">
          <span className="font-mono text-[11.5px] text-[--n-500]">
            6 de 6 · WH-01 <b className="text-[--n-800]">4</b> · WH-02 <b className="text-[--n-800]">1</b> · WH-04 <b className="text-[--n-800]">1</b>
          </span>
          <span className="text-[11.5px] text-[--n-500]">
            Última actividad: <span className="font-mono text-[--n-800]">hace 4 min</span>
          </span>
        </div>
      </div>
    </div>
  );
}
