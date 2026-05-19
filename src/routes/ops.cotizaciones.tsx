import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/shell/module-placeholder";

export const Route = createFileRoute("/ops/cotizaciones")({
  head: () => ({ meta: [{ title: "Cotizaciones · CHV" }] }),
  component: () => <ModulePlaceholder name="Cotizaciones" referenceFile="Cotizaciones Lista · 6 vistas (single file).html" />,
});
