import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/shell/module-placeholder";

export const Route = createFileRoute("/admin/reorden")({
  head: () => ({ meta: [{ title: "Reorden · CHV" }] }),
  component: () => <ModulePlaceholder name="Reorden" referenceFile="(pendiente · Fase 10)" />,
});
