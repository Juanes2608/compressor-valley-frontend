import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SidebarOps } from "@/components/shell/sidebar-ops";
import { HeaderOps } from "@/components/shell/header-ops";
import { BottomNav } from "@/components/shell/bottom-nav";

export const Route = createFileRoute("/ops")({
  component: OpsLayout,
});

function OpsLayout() {
  return (
    <div className="flex min-h-screen w-full bg-[--n-25] text-[--n-900]">
      <SidebarOps />
      <div className="flex min-w-0 flex-1 flex-col">
        <HeaderOps />
        <main className="flex-1 pb-16 lg:pb-0">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
