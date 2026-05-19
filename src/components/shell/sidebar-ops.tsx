import { Link, useRouterState } from "@tanstack/react-router";
import { SECCIONES_OPS } from "@/lib/constants";
import { formatNumber } from "@/lib/format";

function Counter({ value }: { value: number }) {
  return (
    <span className="ml-auto font-mono text-[11px] tabular-nums text-white/45 group-data-[active=true]:text-white/70">
      {formatNumber(value)}
    </span>
  );
}

export function SidebarOps() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  return (
    <aside className="chv-sidebar hidden lg:flex w-[240px] shrink-0 flex-col">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2 border-b border-white/[0.04] px-4">
        <div className="grid h-7 w-7 place-items-center rounded-md bg-[--p-600] font-mono text-[11px] font-semibold tracking-wider text-white">
          CHV
        </div>
        <div className="leading-tight">
          <div className="text-[13px] font-semibold text-white/90">Compresores</div>
          <div className="text-[10.5px] uppercase tracking-[0.1em] text-white/40">del Valle</div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {SECCIONES_OPS.map((seccion) => (
          <div key={seccion.id} className="mb-4">
            <div className="px-3 pb-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-white/35">
              {seccion.label}
            </div>
            <ul className="space-y-0.5">
              {seccion.modulos.map((m) => {
                const active = pathname === m.href || pathname.startsWith(m.href + "/");
                const Icon = m.icon;
                return (
                  <li key={m.id}>
                    <Link
                      to={m.href}
                      data-active={active}
                      className="group flex h-9 items-center gap-2.5 rounded-md px-3 text-[13px] text-white/70 transition-colors hover:bg-white/[0.04] hover:text-white data-[active=true]:bg-[--p-600]/15 data-[active=true]:text-white data-[active=true]:shadow-[inset_2px_0_0_var(--p-500)]"
                    >
                      <Icon className="h-[15px] w-[15px] shrink-0" strokeWidth={1.75} />
                      <span className="truncate">{m.label}</span>
                      {m.counter !== undefined && <Counter value={m.counter} />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/[0.04] px-4 py-3 text-[10.5px] text-white/35">
        Sistema v1.0 · mayo 2026
      </div>
    </aside>
  );
}
