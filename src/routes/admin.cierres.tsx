import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/shell/module-placeholder";

export const Route = createFileRoute("/admin/cierres")({
  head: () => ({ meta: [{ title: "Cierres · CHV" }] }),
  component: () => <ModulePlaceholder name="Cierres" referenceFile="(pendiente · Fase 10)" />,
});
