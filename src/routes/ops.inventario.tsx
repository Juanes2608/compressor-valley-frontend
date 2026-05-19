import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/shell/module-placeholder";

export const Route = createFileRoute("/ops/inventario")({
  head: () => ({ meta: [{ title: "Inventario · CHV" }] }),
  component: () => <ModulePlaceholder name="Inventario" referenceFile="Inventario v2 · 7 vistas (single file).html" />,
});
