import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/shell/module-placeholder";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard · CHV" }] }),
  component: () => <ModulePlaceholder name="Dashboard" referenceFile="Cockpit v2 · 7 vistas (single file).html" />,
});
