import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/ops/recibos")({
  head: () => ({ meta: [{ title: "Recibos · CHV" }] }),
  component: () => <Outlet />,
});
