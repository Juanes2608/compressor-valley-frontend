import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Package, ShoppingCart, Wrench, Menu } from "lucide-react";

const ITEMS = [
  { label: "Inicio",    href: "/ops/inventario",       icon: Home },
  { label: "Inventario", href: "/ops/inventario",      icon: Package },
  { label: "Vender",    href: "/ops/ventas",           icon: ShoppingCart, fab: true },
  { label: "Servicio",  href: "/ops/ordenes-trabajo",  icon: Wrench },
  { label: "Más",       href: "/ops/herramientas",     icon: Menu },
];

export function BottomNav() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  return (
    <nav className="lg:hidden sticky bottom-0 z-30 grid grid-cols-5 border-t border-[--n-100] bg-[--n-0] dark:border-white/[0.06]">
      {ITEMS.map((it, i) => {
        const active = pathname === it.href;
        const Icon = it.icon;
        if (it.fab) {
          return (
            <Link
              key={i}
              to={it.href}
              className="relative flex items-center justify-center"
            >
              <span className="absolute -top-5 grid h-12 w-12 place-items-center rounded-full bg-[--p-600] text-white shadow-[--shadow-elevation]">
                <Icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="mt-7 text-[10px] font-medium text-[--n-500]">{it.label}</span>
            </Link>
          );
        }
        return (
          <Link
            key={i}
            to={it.href}
            className="flex flex-col items-center justify-center gap-0.5 py-2 text-[10px]"
            data-active={active}
          >
            <Icon
              className={`h-[18px] w-[18px] ${active ? "text-[--p-600]" : "text-[--n-500]"}`}
              strokeWidth={active ? 2 : 1.75}
            />
            <span className={active ? "font-medium text-[--p-700]" : "text-[--n-500]"}>{it.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
