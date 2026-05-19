import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/shell/module-placeholder";

export const Route = createFileRoute("/ops/traspasos")({
  head: () => ({ meta: [{ title: "Traspasos · CHV" }] }),
  component: () => <ModulePlaceholder name="Traspasos" referenceFile="Traspasos · Módulo completo (single file).html" />,
});
