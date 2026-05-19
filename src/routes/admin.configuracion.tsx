import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/shell/module-placeholder";

export const Route = createFileRoute("/admin/configuracion")({
  head: () => ({ meta: [{ title: "Configuración · CHV" }] }),
  component: () => <ModulePlaceholder name="Configuración" referenceFile="9 Configuracion y Usuarios.html" />,
});
