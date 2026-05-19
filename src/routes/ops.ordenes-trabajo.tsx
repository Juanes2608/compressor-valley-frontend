import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/shell/module-placeholder";

export const Route = createFileRoute("/ops/ordenes-trabajo")({
  head: () => ({ meta: [{ title: "Órdenes de Trabajo · CHV" }] }),
  component: () => <ModulePlaceholder name="Órdenes de Trabajo" referenceFile="Ordenes de Trabajo · 7 vistas (single file).html" />,
});
