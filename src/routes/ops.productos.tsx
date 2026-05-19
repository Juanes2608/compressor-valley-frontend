import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/shell/module-placeholder";

export const Route = createFileRoute("/ops/productos")({
  head: () => ({ meta: [{ title: "Productos · CHV" }] }),
  component: () => <ModulePlaceholder name="Productos" referenceFile="Inventario v2 · 7 vistas (single file).html" />,
});
