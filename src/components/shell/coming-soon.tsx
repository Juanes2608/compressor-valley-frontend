import { X, Sparkles } from "lucide-react";

export function ComingSoonDialog({
  open, onClose, title, description,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl border border-[--n-200] bg-white p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[--info-50] text-[--info-700]">
            <Sparkles className="h-4 w-4" />
          </span>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-[15px] font-semibold text-[--n-900]">{title}</h3>
              <button
                onClick={onClose}
                className="grid h-7 w-7 place-items-center rounded-md text-[--n-500] hover:bg-[--n-100] hover:text-[--n-900]"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="mt-1 text-[13px] leading-relaxed text-[--n-600]">
              {description ?? "Este flujo estará disponible en la próxima iteración (v1.1)."}
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={onClose}
                className="inline-flex h-9 items-center rounded-md bg-[--p-cta] px-3.5 text-[13px] font-medium text-white hover:bg-[--p-700]"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
