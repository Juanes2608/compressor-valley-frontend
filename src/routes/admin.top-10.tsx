import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/shell/module-placeholder";

export const Route = createFileRoute("/admin/top-10")({
  head: () => ({ meta: [{ title: "Top 10 · CHV" }] }),
  component: () => <ModulePlaceholder name="Top 10" referenceFile="(pendiente · Fase 10)" />,
});
