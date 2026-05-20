import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/ops/compras")({
  head: () => ({ meta: [{ title: "Compras · CHV" }] }),
  component: () => <Outlet />,
});
