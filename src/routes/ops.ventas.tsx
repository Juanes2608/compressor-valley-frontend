import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/shell/module-placeholder";

export const Route = createFileRoute("/ops/ventas")({
  head: () => ({ meta: [{ title: "Ventas · CHV" }] }),
  component: () => <ModulePlaceholder name="Ventas" referenceFile="Ventas · Módulo completo (single file).html" />,
});
