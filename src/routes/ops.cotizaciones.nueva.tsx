import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/shell/module-placeholder";

export const Route = createFileRoute("/ops/cotizaciones/nueva")({
  head: () => ({ meta: [{ title: "Nueva cotización · CHV" }] }),
  component: () => (
    <ModulePlaceholder
      name="Cotización nueva · Wizard 7 pasos"
      referenceFile="Cotización Nueva · Wizard 7 vistas (single file).html"
    />
  ),
});
