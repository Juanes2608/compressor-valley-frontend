import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/shell/module-placeholder";

export const Route = createFileRoute("/ops/garantias")({
  head: () => ({ meta: [{ title: "Garantías · CHV" }] }),
  component: () => <ModulePlaceholder name="Garantías" referenceFile="7.1 Garantias F13.html" />,
});
