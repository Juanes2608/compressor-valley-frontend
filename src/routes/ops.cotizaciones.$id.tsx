import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/shell/module-placeholder";

export const Route = createFileRoute("/ops/cotizaciones/$id")({
  head: () => ({ meta: [{ title: "Detalle cotización · CHV" }] }),
  component: DetalleCotizacion,
});

function DetalleCotizacion() {
  const { id } = Route.useParams();
  return (
    <ModulePlaceholder
      name={`Detalle cotización ${id}`}
      referenceFile="Cotización Detalle Cot-1042 · 6 vistas (single file).html"
    />
  );
}
