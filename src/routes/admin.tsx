import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { SidebarAdmin } from "@/components/shell/sidebar-admin";
import { HeaderAdmin } from "@/components/shell/header-admin";
import { CURRENT_USER } from "@/lib/constants";

export const Route = createFileRoute("/admin")({
  beforeLoad: () => {
    if (CURRENT_USER.rol !== "Admin") {
      throw redirect({ to: "/ops/inventario" });
    }
  },
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <div className="flex min-h-screen w-full bg-[--n-25] text-[--n-900]">
      <SidebarAdmin />
      <div className="flex min-w-0 flex-1 flex-col">
        <HeaderAdmin />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
