import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/ops/ventas")({
  head: () => ({ meta: [{ title: "Ventas · CHV" }] }),
  component: () => <Outlet />,
});
