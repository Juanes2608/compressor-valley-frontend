import { Link } from "@tanstack/react-router";
import { Search, Bell, Shield } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { CURRENT_USER, SEDES } from "@/lib/constants";

export function HeaderOps() {
  const sede = SEDES.find((s) => s.id === CURRENT_USER.sede_id) ?? SEDES[0];
  const sedeDotClass: Record<string, string> = {
    succ: "bg-[--succ-500]",
    info: "bg-[#7CC4FD]",
    warn: "bg-[--warn-500]",
    progress: "bg-[--prog-500]",
  };

  return (
    <header className="chv-topbar sticky top-0 z-30 flex h-14 items-center gap-3 px-4">
      {/* Buscador global */}
      <button
        type="button"
        className="focus-ring flex h-9 min-w-[280px] flex-1 max-w-[480px] items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 text-left text-[13px] text-white/70 hover:bg-white/15 hover:border-white/25"
      >
        <Search className="h-4 w-4" strokeWidth={1.75} />
        <span className="flex-1">Buscar productos, clientes, documentos...</span>
        <kbd className="hidden font-mono text-[10.5px] text-white/70 sm:inline-flex items-center gap-0.5 rounded border border-white/20 bg-white/10 px-1.5 py-0.5">
          ⌘K
        </kbd>
      </button>

      <div className="flex-1" />

      {/* Sede activa */}
      <div className="hidden md:inline-flex h-8 items-center gap-2 rounded-md border border-white/15 bg-white/10 px-2.5 text-[12px]">
        <span className={`h-1.5 w-1.5 rounded-full ${sedeDotClass[sede.semantico]}`} />
        <span className="font-mono text-white">{sede.id}</span>
        <span className="text-white/85">{sede.nombre}</span>
      </div>

      {/* Botón Panel Admin solo si rol = Admin */}
      {CURRENT_USER.rol === "Admin" && (
        <Link
          to="/admin/dashboard"
          className="focus-ring inline-flex h-8 items-center gap-1.5 rounded-md border border-white/20 bg-white/10 px-2.5 text-[12px] font-medium text-white hover:bg-white/20"
        >
          <Shield className="h-3.5 w-3.5" strokeWidth={2} />
          Panel Admin
        </Link>
      )}

      <button className="focus-ring relative grid h-9 w-9 place-items-center rounded-md text-white/85 hover:bg-white/10">
        <Bell className="h-4 w-4" strokeWidth={1.75} />
        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[--dang-500]" />
      </button>

      <ThemeToggle />

      <div className="ml-1 flex h-8 items-center gap-2 pl-2">
        <div className="grid h-8 w-8 place-items-center rounded-full bg-white/15 ring-1 ring-white/25 font-mono text-[11px] font-semibold text-white">
          {CURRENT_USER.iniciales}
        </div>
        <div className="hidden text-left leading-tight sm:block">
          <div className="text-[12px] font-medium text-white">{CURRENT_USER.nombre}</div>
          <div className="text-[10.5px] text-white/70">{CURRENT_USER.rol}</div>
        </div>
      </div>
    </header>
  );
}
