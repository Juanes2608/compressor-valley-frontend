import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/ops/herramientas")({
  head: () => ({ meta: [{ title: "Herramientas · CHV" }] }),
  component: () => <Outlet />,
});
