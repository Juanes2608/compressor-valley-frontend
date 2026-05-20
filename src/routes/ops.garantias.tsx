import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/ops/garantias")({
  head: () => ({ meta: [{ title: "Garantías · CHV" }] }),
  component: () => <Outlet />,
});
