import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/shell/module-placeholder";

export const Route = createFileRoute("/admin/analisis-abc")({
  head: () => ({ meta: [{ title: "Análisis ABC · CHV" }] }),
  component: () => <ModulePlaceholder name="Análisis ABC" referenceFile="(pendiente · Fase 10)" />,
});
