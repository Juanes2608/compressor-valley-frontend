import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/shell/module-placeholder";

export const Route = createFileRoute("/ops/devoluciones")({
  head: () => ({ meta: [{ title: "Devoluciones · CHV" }] }),
  component: () => <ModulePlaceholder name="Devoluciones" referenceFile="Devoluciones · Módulo completo (single file).html" />,
});
