import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/shell/module-placeholder";

export const Route = createFileRoute("/admin/conteo-ciclico")({
  head: () => ({ meta: [{ title: "Conteo cíclico · CHV" }] }),
  component: () => <ModulePlaceholder name="Conteo cíclico" referenceFile="(pendiente · Fase 11)" />,
});
