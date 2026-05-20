import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/ops/devoluciones")({
  head: () => ({ meta: [{ title: "Devoluciones · CHV" }] }),
  component: () => <Outlet />,
});
