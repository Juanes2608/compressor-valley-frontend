import { FileCode2, ArrowUpRight } from "lucide-react";

export interface ModulePlaceholderProps {
  name: string;
  referenceFile?: string;
  description?: string;
}

export function ModulePlaceholder({ name, referenceFile, description }: ModulePlaceholderProps) {
  const isPending = !referenceFile || referenceFile.startsWith("(");
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="rounded-[--r-card] border border-[--n-150] bg-[--n-0] p-8 shadow-[--shadow-card] dark:border-white/[0.06] dark:bg-white/[0.02]">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[--n-150] bg-[--n-25] px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-[--n-500] dark:border-white/[0.08] dark:bg-white/[0.02]">
          <span className="h-1.5 w-1.5 rounded-full bg-[--n-300]" />
          Módulo en construcción
        </div>
        <h1 className="font-sans text-[24px] font-semibold leading-tight text-[--n-900]">{name}</h1>
        <p className="mt-2 text-[13.5px] leading-relaxed text-[--n-500]">
          {description ??
            "Este módulo se construye en su fase correspondiente del orden de implementación. La foundation (shells, sidebars, theming, mocks) ya está lista."}
        </p>

        {referenceFile && (
          <div className="mt-6 rounded-[--r-md] border border-[--n-150] bg-[--n-25] p-3 dark:border-white/[0.08] dark:bg-white/[0.02]">
            <div className="mb-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-[--n-500]">
              Referencia visual canónica
            </div>
            <div className="flex items-start gap-2 text-[13px] text-[--n-800]">
              <FileCode2 className="mt-0.5 h-4 w-4 shrink-0 text-[--p-600]" strokeWidth={1.75} />
              <code className="font-mono text-[12.5px]">
                references/{referenceFile}
              </code>
            </div>
            {isPending && (
              <p className="mt-2 text-[11.5px] text-[--warn-700] dark:text-[#FEC84B]">
                Pendiente de producir en el workflow de diseño antes de construir el módulo.
              </p>
            )}
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-2 text-[11.5px] text-[--n-500]">
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
          Próximo paso: implementar siguiendo el orden de docs/prompts/ORDEN_DE_IMPLEMENTACION.md
        </div>
      </div>
    </div>
  );
}
