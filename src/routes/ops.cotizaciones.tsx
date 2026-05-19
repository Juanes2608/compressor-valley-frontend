import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/ops/cotizaciones")({
  head: () => ({ meta: [{ title: "Cotizaciones · CHV" }] }),
  component: () => <Outlet />,
});
