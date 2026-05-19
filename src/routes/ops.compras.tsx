import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/shell/module-placeholder";

export const Route = createFileRoute("/ops/compras")({
  head: () => ({ meta: [{ title: "Compras · CHV" }] }),
  component: () => <ModulePlaceholder name="Compras" referenceFile="Compras · Módulo completo (single file).html" />,
});
