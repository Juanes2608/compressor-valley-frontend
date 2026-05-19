import { Link } from "@tanstack/react-router";
import { ArrowLeftCircle, Bell } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { CURRENT_USER } from "@/lib/constants";

export function HeaderAdmin() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-[--n-100] bg-[--n-0] px-4 dark:border-white/[0.06]">
      <Link
        to="/ops/inventario"
        className="focus-ring inline-flex h-8 items-center gap-1.5 rounded-md border border-[--n-150] bg-[--n-25] px-2.5 text-[12px] font-medium text-[--n-700] hover:bg-[--n-75] dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-[--n-700] dark:hover:bg-white/[0.06]"
      >
        <ArrowLeftCircle className="h-3.5 w-3.5" strokeWidth={2} />
        Volver a Operaciones
      </Link>

      <div className="ml-3 hidden md:flex items-center gap-2">
        <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-[--info-500]" />
        <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-[--n-500]">
          Modo administrador
        </span>
      </div>

      <div className="flex-1" />

      <button className="focus-ring relative grid h-9 w-9 place-items-center rounded-md text-[--n-700] hover:bg-[--n-75] dark:hover:bg-white/[0.06]">
        <Bell className="h-4 w-4" strokeWidth={1.75} />
      </button>

      <ThemeToggle />

      <div className="ml-1 flex h-8 items-center gap-2 pl-2">
        <div className="grid h-8 w-8 place-items-center rounded-full bg-[--info-500] font-mono text-[11px] font-semibold text-white">
          {CURRENT_USER.iniciales}
        </div>
        <div className="hidden text-left leading-tight sm:block">
          <div className="text-[12px] font-medium text-[--n-900]">{CURRENT_USER.nombre}</div>
          <div className="text-[10.5px] text-[--n-500]">{CURRENT_USER.rol}</div>
        </div>
      </div>
    </header>
  );
}
