import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/shell/module-placeholder";

export const Route = createFileRoute("/admin/alertas")({
  head: () => ({ meta: [{ title: "Alertas · CHV" }] }),
  component: () => <ModulePlaceholder name="Alertas" referenceFile="(pendiente · Fase 10)" />,
});
