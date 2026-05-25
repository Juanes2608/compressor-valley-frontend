import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/ops/traspasos")({
  head: () => ({ meta: [{ title: "Traspasos · CHV" }] }),
  component: () => <Outlet />,
});
