import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/shell/module-placeholder";

export const Route = createFileRoute("/ops/ensambles")({
  head: () => ({ meta: [{ title: "Ensambles · CHV" }] }),
  component: () => <ModulePlaceholder name="Ensambles" referenceFile="(aplazado a v1.1)" />,
});
