import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/shell/module-placeholder";

export const Route = createFileRoute("/ops/recibos")({
  head: () => ({ meta: [{ title: "Recibos · CHV" }] }),
  component: () => <ModulePlaceholder name="Recibos" referenceFile="Recibos · Módulo F14 (single file).html" />,
});
