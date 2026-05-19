import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/shell/module-placeholder";

export const Route = createFileRoute("/admin/usuarios")({
  head: () => ({ meta: [{ title: "Usuarios · CHV" }] }),
  component: () => <ModulePlaceholder name="Usuarios" referenceFile="9 Configuracion y Usuarios.html" />,
});
