import { createFileRoute, Link } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/shell/module-placeholder";
import { PlayCircle } from "lucide-react";

export const Route = createFileRoute("/ops/traspasos")({
  head: () => ({ meta: [{ title: "Traspasos · CHV" }] }),
  component: TraspasosPlaceholder,
});

function TraspasosPlaceholder() {
  return (
    <div className="space-y-6 p-6">
      <ModulePlaceholder
        name="Traspasos"
        referenceFile="Traspasos · Módulo completo (single file).html"
      />
      <div className="mx-auto max-w-3xl rounded-lg border border-[--n-150] bg-white p-5">
        <div className="mb-1 font-mono text-[11px] uppercase tracking-[0.1em] text-[--n-500]">
          Disponible · Task Mode
        </div>
        <h3 className="mb-3 text-[15px] font-semibold text-[--n-900]">
          Picking · Traspaso TR-0124
        </h3>
        <p className="mb-4 text-[13px] text-[--n-500]">
          12 ítems en cola. Modo dedicado sin chrome, optimizado para bodega.
        </p>
        <Link
          to="/picking/$id"
          params={{ id: "TR-0124" }}
          className="inline-flex items-center gap-2 rounded-md bg-[--succ-500] px-4 py-2.5 text-[13px] font-medium text-white hover:bg-[--succ-600]"
        >
          <PlayCircle className="h-4 w-4" strokeWidth={1.75} />
          Iniciar picking
        </Link>
      </div>
    </div>
  );
}
