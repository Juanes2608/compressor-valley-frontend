import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { X, Check, RotateCcw } from "lucide-react";
import { getPickingTraspaso } from "@/lib/picking-data";

export const Route = createFileRoute("/picking/$id")({
  component: PickingTaskMode,
});

function PickingTaskMode() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const tr = getPickingTraspaso(id);
  const total = tr.items.length;
  // Canonical state: 7 already picked, currently on item index 7 (the 8th)
  const [index, setIndex] = useState(7);
  const done = index >= total;
  const pickedCount = Math.min(index, total);
  const item = done ? tr.items[total - 1] : tr.items[index];
  const pct = done ? 100 : (pickedCount / total) * 100;

  const goBack = () => navigate({ to: "/ops/traspasos" }).catch(() => {});

  return (
    <div className="pk min-h-screen">
      <header className="pk-header">
        <button className="pk-close" aria-label="Salir" onClick={goBack}>
          <X className="h-3.5 w-3.5" />
        </button>
        <span className="pk-ctx">Picking · Traspaso {tr.id}</span>
        <span className="pk-loc hidden sm:inline">{item.pasillo}</span>
      </header>

      <div className="pk-prog">
        <div className="pk-prog-bar">
          <div className="pk-prog-fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="pk-prog-count">
          {pickedCount} de {total}
        </span>
      </div>

      {done ? (
        <div className="pk-done">
          <div className="pk-done-check">
            <Check className="h-8 w-8" strokeWidth={2.5} />
          </div>
          <h2 className="pk-done-title">
            {total} de {total} completados
          </h2>
          <p className="pk-done-sub">
            Traspaso {tr.id} listo para verificación
          </p>
          <Link to="/ops/traspasos" className="pk-done-btn text-center leading-[64px]">
            Finalizar picking
          </Link>
        </div>
      ) : (
        <>
          <div className="pk-desktop-wrap">
            <div className="pk-desktop-center">
              <span className="pk-step">
                Producto {index + 1} de {total}
              </span>
              <span className="pk-sku">{item.sku}</span>
              <h1 className="pk-name">{item.nombre}</h1>
              <p className="pk-model">{item.modelo}</p>
              <span className={`cat cat-${item.cat}`}>
                <span className="sw" />
                {item.catLabel}
              </span>
              <div className="pk-qty">
                <span className="pk-qty-lbl">Cantidad a recoger</span>
                <span className="pk-qty-num">{item.qty}</span>
              </div>
              <p className="pk-loc-inline">
                Ubicación:<span className="code">{item.ubicacion}</span>
              </p>
            </div>
            <div className="pk-qr hidden lg:flex">
              <div className="pk-qr-img">
                <QrGlyph />
              </div>
              <span className="pk-qr-lbl">QR del producto</span>
            </div>
          </div>

          <div className="pk-actions mx-auto w-full max-w-[600px]">
            <button
              className="pk-btn pk-btn-skip"
              onClick={() => setIndex((i) => Math.min(i + 1, total))}
            >
              <RotateCcw className="h-[18px] w-[18px]" />
              Saltar
            </button>
            <button
              className="pk-btn pk-btn-pick"
              onClick={() => setIndex((i) => Math.min(i + 1, total))}
            >
              <Check className="h-[18px] w-[18px]" strokeWidth={2.5} />
              Recogido
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function QrGlyph() {
  return (
    <svg viewBox="0 0 21 21" shapeRendering="crispEdges" className="h-full w-full">
      <rect width="21" height="21" fill="#fff" />
      <g fill="#101828">
        <rect x="0" y="0" width="7" height="1" />
        <rect x="0" y="6" width="7" height="1" />
        <rect x="0" y="0" width="1" height="7" />
        <rect x="6" y="0" width="1" height="7" />
        <rect x="2" y="2" width="3" height="3" />
        <rect x="14" y="0" width="7" height="1" />
        <rect x="14" y="6" width="7" height="1" />
        <rect x="14" y="0" width="1" height="7" />
        <rect x="20" y="0" width="1" height="7" />
        <rect x="16" y="2" width="3" height="3" />
        <rect x="0" y="14" width="7" height="1" />
        <rect x="0" y="20" width="7" height="1" />
        <rect x="0" y="14" width="1" height="7" />
        <rect x="6" y="14" width="1" height="7" />
        <rect x="2" y="16" width="3" height="3" />
        <rect x="8" y="0" width="1" height="2" />
        <rect x="10" y="1" width="2" height="1" />
        <rect x="9" y="3" width="1" height="2" />
        <rect x="11" y="3" width="2" height="1" />
        <rect x="8" y="5" width="2" height="1" />
        <rect x="0" y="8" width="2" height="1" />
        <rect x="3" y="8" width="1" height="2" />
        <rect x="5" y="9" width="2" height="1" />
        <rect x="8" y="8" width="1" height="2" />
        <rect x="10" y="8" width="2" height="1" />
        <rect x="13" y="9" width="3" height="1" />
        <rect x="17" y="8" width="1" height="2" />
        <rect x="19" y="9" width="2" height="1" />
        <rect x="2" y="10" width="2" height="1" />
        <rect x="5" y="11" width="1" height="2" />
        <rect x="8" y="11" width="3" height="1" />
        <rect x="12" y="10" width="1" height="3" />
        <rect x="14" y="11" width="2" height="1" />
        <rect x="17" y="10" width="2" height="1" />
        <rect x="20" y="11" width="1" height="2" />
        <rect x="9" y="13" width="2" height="1" />
        <rect x="13" y="14" width="1" height="2" />
        <rect x="15" y="14" width="2" height="1" />
        <rect x="18" y="13" width="1" height="3" />
        <rect x="8" y="15" width="1" height="2" />
        <rect x="11" y="16" width="3" height="1" />
        <rect x="15" y="17" width="1" height="2" />
        <rect x="17" y="16" width="2" height="1" />
        <rect x="20" y="17" width="1" height="2" />
        <rect x="9" y="18" width="2" height="1" />
        <rect x="12" y="19" width="1" height="2" />
        <rect x="14" y="20" width="3" height="1" />
        <rect x="19" y="20" width="2" height="1" />
      </g>
    </svg>
  );
}
