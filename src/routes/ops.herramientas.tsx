import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/shell/module-placeholder";

export const Route = createFileRoute("/ops/herramientas")({
  head: () => ({ meta: [{ title: "Herramientas · CHV" }] }),
  component: () => <ModulePlaceholder name="Herramientas" referenceFile="7.2 Herramientas.html" />,
});
