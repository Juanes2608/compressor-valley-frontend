import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/shell/module-placeholder";

export const Route = createFileRoute("/admin/auditoria")({
  head: () => ({ meta: [{ title: "Auditoría · CHV" }] }),
  component: () => <ModulePlaceholder name="Auditoría" referenceFile="(pendiente · Fase 10)" />,
});
