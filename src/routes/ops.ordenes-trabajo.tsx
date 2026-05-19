import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/ops/ordenes-trabajo")({
  head: () => ({ meta: [{ title: "Órdenes de Trabajo · CHV" }] }),
  component: () => <Outlet />,
});
