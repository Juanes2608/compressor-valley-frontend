import { Link } from "@tanstack/react-router";
import { ArrowLeftCircle, Bell } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { CURRENT_USER } from "@/lib/constants";

export function HeaderAdmin() {
  return (
    <header className="chv-topbar chv-topbar-admin sticky top-0 z-30 flex h-14 items-center gap-3 px-4">
      <Link
        to="/ops/inventario"
        className="focus-ring inline-flex h-8 items-center gap-1.5 rounded-md border border-white/20 bg-white/10 px-2.5 text-[12px] font-medium text-white hover:bg-white/20"
      >
        <ArrowLeftCircle className="h-3.5 w-3.5" strokeWidth={2} />
        Volver a Operaciones
      </Link>

      <div className="ml-3 hidden md:flex items-center gap-2">
        <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-[#7CC4FD]" />
        <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-white/75">
          Modo administrador
        </span>
      </div>

      <div className="flex-1" />

      <button className="focus-ring relative grid h-9 w-9 place-items-center rounded-md text-white/85 hover:bg-white/10">
        <Bell className="h-4 w-4" strokeWidth={1.75} />
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
