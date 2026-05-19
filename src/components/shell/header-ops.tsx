import { Link } from "@tanstack/react-router";
import { Search, Bell, Shield } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { CURRENT_USER, SEDES } from "@/lib/constants";

export function HeaderOps() {
  const sede = SEDES.find((s) => s.id === CURRENT_USER.sede_id) ?? SEDES[0];
  const sedeDotClass: Record<string, string> = {
    succ: "bg-[--succ-500]",
    info: "bg-[--info-500]",
    warn: "bg-[--warn-500]",
    progress: "bg-[--prog-500]",
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-[--n-100] bg-[--n-0] px-4 dark:border-white/[0.06]">
      {/* Buscador global */}
      <button
        type="button"
        className="focus-ring flex h-9 min-w-[280px] flex-1 max-w-[480px] items-center gap-2 rounded-md border border-[--n-150] bg-[--n-25] px-3 text-left text-[13px] text-[--n-500] hover:border-[--n-200] dark:border-white/[0.08] dark:bg-white/[0.02] dark:hover:border-white/[0.16]"
        onClick={() => {
          // Cmd+K palette se implementa después. Por ahora el botón sólo abre el handler vacío.
        }}
      >
        <Search className="h-4 w-4" strokeWidth={1.75} />
        <span className="flex-1">Buscar productos, clientes, documentos...</span>
        <kbd className="hidden font-mono text-[10.5px] text-[--n-500] sm:inline-flex items-center gap-0.5 rounded border border-[--n-200] bg-[--n-0] px-1.5 py-0.5 dark:border-white/[0.12] dark:bg-white/[0.04]">
          ⌘K
        </kbd>
      </button>

      <div className="flex-1" />

      {/* Sede activa */}
      <div className="hidden md:inline-flex h-8 items-center gap-2 rounded-md border border-[--n-150] bg-[--n-25] px-2.5 text-[12px] dark:border-white/[0.08] dark:bg-white/[0.02]">
        <span className={`h-1.5 w-1.5 rounded-full ${sedeDotClass[sede.semantico]}`} />
        <span className="font-mono text-[--n-700] dark:text-[--n-700]">{sede.id}</span>
        <span className="text-[--n-700] dark:text-[--n-700]">{sede.nombre}</span>
      </div>

      {/* Botón Panel Admin solo si rol = Admin */}
      {CURRENT_USER.rol === "Admin" && (
        <Link
          to="/admin/dashboard"
          className="focus-ring inline-flex h-8 items-center gap-1.5 rounded-md border border-[--p-200] bg-[--p-50] px-2.5 text-[12px] font-medium text-[--p-700] hover:bg-[--p-100] dark:border-[--p-500]/30 dark:bg-[--p-500]/10 dark:text-[#C2CCFF] dark:hover:bg-[--p-500]/20"
        >
          <Shield className="h-3.5 w-3.5" strokeWidth={2} />
          Panel Admin
        </Link>
      )}

      <button className="focus-ring relative grid h-9 w-9 place-items-center rounded-md text-[--n-700] hover:bg-[--n-75] dark:hover:bg-white/[0.06]">
        <Bell className="h-4 w-4" strokeWidth={1.75} />
        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[--dang-500]" />
      </button>

      <ThemeToggle />

      <div className="ml-1 flex h-8 items-center gap-2 pl-2">
        <div className="grid h-8 w-8 place-items-center rounded-full bg-[--p-600] font-mono text-[11px] font-semibold text-white">
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
