import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  LayoutGrid, List as ListIcon, Plus, ArrowRight, Clock, Shield, MoreHorizontal,
} from "lucide-react";
import {
  TRASPASOS_ROWS, TRASPASOS_HEADER, SEDES_TR, RESPS, ESTADO_PILL,
  type TraspasoEstado, type TraspasoRow,
} from "@/lib/traspasos-data";
import { ComingSoonDialog } from "@/components/shell/coming-soon";

export const Route = createFileRoute("/ops/traspasos/")({
  head: () => ({ meta: [{ title: "Traspasos · CHV" }] }),
  component: TraspasosLista,
});

type Vista = "board" | "list";

const ORDEN: TraspasoEstado[] = ["pendiente", "enviado", "transito", "recibido"];

function TraspasosLista() {
  const [vista, setVista] = useState<Vista>("board");
  const [nuevoOpen, setNuevoOpen] = useState(false);
  const [sede, setSede] = useState("ALL");

  const rows = useMemo(() => {
    if (sede === "ALL") return TRASPASOS_ROWS;
    return TRASPASOS_ROWS.filter((r) => r.origen === sede || r.destino === sede);
  }, [sede]);

  const grupos = useMemo(() => {
    const g: Record<TraspasoEstado, TraspasoRow[]> = { pendiente: [], enviado: [], transito: [], recibido: [] };
    rows.forEach((r) => g[r.estado].push(r));
    return g;
  }, [rows]);

  return (
    <div className="flex h-full flex-col">
      {/* Page header */}
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[--n-100] bg-[--n-0] px-7 pb-4 pt-6">
        <div className="min-w-0 flex-1">
          <h1 className="m-0 text-[22px] font-semibold tracking-[-0.01em] text-[--n-950]">Traspasos</h1>
          <p className="mt-1.5 text-[13px] leading-[1.5] text-[--n-500]">
            <b className="font-mono font-medium text-[--n-700]">{TRASPASOS_HEADER.activos}</b> activos ·{" "}
            <b className="font-mono font-medium text-[--n-700]">{TRASPASOS_HEADER.mes}</b> este mes ·{" "}
            <b className="font-mono font-medium text-[--n-700]">{TRASPASOS_HEADER.productosMovidos}</b> productos movidos
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <div className="flex items-center gap-0.5 rounded-lg bg-[--n-100] p-[3px]">
            <button
              onClick={() => setVista("board")}
              data-active={vista === "board"}
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12.5px] font-medium text-[--n-500] data-[active=true]:bg-[--n-0] data-[active=true]:text-[--n-950] data-[active=true]:shadow-[0_1px_2px_rgba(14,16,24,.06)]"
            >
              <LayoutGrid className="h-3.5 w-3.5" strokeWidth={2} /> Tablero
            </button>
            <button
              onClick={() => setVista("list")}
              data-active={vista === "list"}
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12.5px] font-medium text-[--n-500] data-[active=true]:bg-[--n-0] data-[active=true]:text-[--n-950] data-[active=true]:shadow-[0_1px_2px_rgba(14,16,24,.06)]"
            >
              <ListIcon className="h-3.5 w-3.5" strokeWidth={2} /> Lista
            </button>
          </div>

          <select
            value={sede}
            onChange={(e) => setSede(e.target.value)}
            className="h-9 rounded-lg border border-[--n-150] bg-[--n-0] px-3 pr-8 text-[13px] text-[--n-700] outline-none"
          >
            <option value="ALL">Todas las sedes</option>
            <option value="WH-01">WH-01 Cali</option>
            <option value="WH-02">WH-02 Norte</option>
            <option value="WH-03">WH-03 Sur</option>
            <option value="WH-04">WH-04 Tuluá</option>
          </select>

          <button
            onClick={() => setNuevoOpen(true)}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[--p-cta] px-3.5 text-[13px] font-medium text-white hover:bg-[--p-700]"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2.5} /> Nuevo traspaso
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-7 pb-14 pt-5">
        {vista === "board" ? (
          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 xl:grid-cols-4">
            {ORDEN.map((estado) => (
              <BoardColumn key={estado} estado={estado} rows={grupos[estado]} />
            ))}
          </div>
        ) : (
          <ListaTabla rows={rows} />
        )}
      </div>

      <ComingSoonDialog
        open={nuevoOpen}
        onClose={() => setNuevoOpen(false)}
        title="Nuevo traspaso"
        description="El wizard de creación de traspasos (ruta, productos, motivo, confirmación) llega en v1.1."
      />
    </div>
  );
}

/* ---------- BOARD ---------- */

function BoardColumn({ estado, rows }: { estado: TraspasoEstado; rows: TraspasoRow[] }) {
  const conf = ESTADO_PILL[estado];
  const isTransit = estado === "transito";
  const isDone = estado === "recibido";

  return (
    <div
      className={`flex min-h-[640px] flex-col gap-2.5 rounded-xl border border-[--n-100] p-3 ${isDone ? "bg-[--n-25]" : "bg-[--n-50]"}`}
    >
      <div className="flex items-center justify-between gap-2 px-1.5 py-1">
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${isTransit ? "animate-pulse" : ""}`}
            style={{
              background: conf.dotVar,
              boxShadow: isTransit ? "0 0 0 4px rgba(247,144,9,.18)" : undefined,
            }}
          />
          <span className="text-[13px] font-semibold text-[--n-950]">{conf.label}</span>
        </div>
        <span
          className={`rounded-full border px-1.5 py-0.5 font-mono text-[11px] ${
            isTransit
              ? "border-[--warn-border] bg-[--warn-50] text-[--warn-700]"
              : "border-[--n-150] bg-[--n-0] text-[--n-500]"
          }`}
        >
          {rows.length}
        </span>
      </div>

      {rows.map((r) => (
        <BoardCard key={r.id} row={r} />
      ))}

      {isDone && rows.length > 0 && (
        <button className="rounded-lg border border-dashed border-[--n-200] bg-transparent px-2 py-2 text-center font-mono text-[11.5px] text-[--n-500] hover:bg-[--n-0]">
          Ver anteriores ↓
        </button>
      )}
    </div>
  );
}

function BoardCard({ row }: { row: TraspasoRow }) {
  const o = SEDES_TR[row.origen];
  const d = SEDES_TR[row.destino];
  const resp = RESPS[row.resp];
  return (
    <Link
      to="/ops/traspasos/$id"
      params={{ id: row.id }}
      className="flex cursor-pointer flex-col gap-2.5 rounded-[10px] border border-[--n-150] bg-[--n-0] p-3.5 shadow-[0_1px_2px_rgba(14,16,24,.04)] hover:border-[--n-300] hover:shadow-[0_4px_12px_rgba(14,16,24,.08)]"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 font-mono text-[13px] font-medium text-[--n-950]">
          <span className="h-[7px] w-[7px] rounded-full" style={{ background: ESTADO_PILL[row.estado].dotVar }} />
          {row.id}
          {row.badge === "garantia" && <BadgeGarantia />}
          {row.badge === "abandonada" && <BadgeAbandonada />}
        </span>
        <span className="grid h-6 w-6 place-items-center rounded-md text-[--n-400]">
          <MoreHorizontal className="h-3.5 w-3.5" />
        </span>
      </div>

      <div className="flex items-center gap-2 text-[12.5px] font-medium text-[--n-950]">
        <WhChip kind={o.chip} label={o.label} />
        <ArrowRight className="h-3.5 w-3.5 text-[--n-400]" strokeWidth={2} />
        <WhChip kind={d.chip} label={d.label} />
      </div>

      <div className="font-mono text-[11.5px] text-[--n-500]">
        {row.productos} productos · {row.unidades} unidades
      </div>

      <div className="text-[12px] italic leading-[1.45] text-[--n-700]">"{row.motivo}"</div>

      <div className="flex items-center justify-between gap-1.5 border-t border-dashed border-[--n-100] pt-2">
        <span className="flex items-center gap-1 font-mono text-[11px] text-[--n-500]">
          <Clock className="h-[11px] w-[11px] text-[--n-400]" strokeWidth={2} />
          {row.fechaCorta}
        </span>
        <Avatar resp={resp.avClass} iniciales={resp.iniciales} />
      </div>
    </Link>
  );
}

/* ---------- LIST ---------- */

function ListaTabla({ rows }: { rows: TraspasoRow[] }) {
  const navigate = useNavigate();
  return (
    <div className="overflow-hidden rounded-[10px] border border-[--n-150] bg-[--n-0]">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {["#", "Fecha", "Origen", "Destino", "Productos", "Motivo", "Estado", "Responsable", "Tiempo"].map((h) => (
              <th
                key={h}
                className="border-b border-[--n-150] bg-[--n-25] px-3 py-3 text-left font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-[--n-400]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const o = SEDES_TR[r.origen];
            const d = SEDES_TR[r.destino];
            const resp = RESPS[r.resp];
            const pillKind = ESTADO_PILL[r.estado].pillCls;
            const tiempoCls =
              r.tiempoTono === "warn"
                ? "text-[--warn-700]"
                : r.tiempoTono === "dang"
                ? "text-[--dang-700]"
                : "text-[--n-500]";
            return (
              <tr
                key={r.id}
                onClick={() => navigate({ to: "/ops/traspasos/$id", params: { id: r.id } })}
                className="cursor-pointer hover:bg-[--n-25]"
              >
                <td className="border-b border-[--n-75] px-3 py-3">
                  <Link
                    to="/ops/traspasos/$id"
                    params={{ id: r.id }}
                    onClick={(e) => e.stopPropagation()}
                    className="font-mono text-[12.5px] font-medium text-[--n-950] hover:underline"
                  >
                    {r.id}
                  </Link>
                </td>
                <td className="border-b border-[--n-75] px-3 py-3 font-mono text-[11.5px] text-[--n-500]">{r.fecha}</td>
                <td className="border-b border-[--n-75] px-3 py-3">
                  <WhChip kind={o.chip} label={o.label} />
                </td>
                <td className="border-b border-[--n-75] px-3 py-3">
                  <WhChip kind={d.chip} label={d.label} />
                </td>
                <td className="border-b border-[--n-75] px-3 py-3">
                  <div className="flex flex-col leading-[1.3]">
                    <span className="text-[13px] font-medium text-[--n-950]">
                      {r.productosLead}
                      {r.badge === "garantia" && (
                        <span className="ml-1 inline-block align-middle"><BadgeGarantia compact /></span>
                      )}
                      {r.badge === "abandonada" && (
                        <span className="ml-1 inline-block align-middle"><BadgeAbandonada /></span>
                      )}
                    </span>
                    <span className="mt-0.5 font-mono text-[11px] text-[--n-500]">
                      {r.productos} productos · {r.unidades} unidades
                    </span>
                  </div>
                </td>
                <td className="border-b border-[--n-75] px-3 py-3 text-[12px] italic text-[--n-700]">"{r.motivo}"</td>
                <td className="border-b border-[--n-75] px-3 py-3">
                  <Pill kind={pillKind} label={ESTADO_PILL[r.estado].label} />
                </td>
                <td className="border-b border-[--n-75] px-3 py-3">
                  <div className="flex items-center gap-2 text-[12.5px] text-[--n-700]">
                    <Avatar resp={resp.avClass} iniciales={resp.iniciales} />
                    {resp.nombre}
                  </div>
                </td>
                <td className={`border-b border-[--n-75] px-3 py-3 font-mono text-[11.5px] ${tiempoCls}`}>{r.tiempo}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- shared bits ---------- */

export function WhChip({ kind, label }: { kind: "wh01" | "wh02" | "wh03" | "wh04"; label: string }) {
  const dotBg: Record<string, string> = {
    wh01: "var(--succ-500)",
    wh02: "var(--info-500)",
    wh03: "var(--warn-500)",
    wh04: "var(--prog-500)",
  };
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-[--n-150] bg-[--n-50] px-2 py-[3px] font-mono text-[11.5px] text-[--n-700]">
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: dotBg[kind] }} />
      {label}
    </span>
  );
}

export function Avatar({ resp, iniciales }: { resp: string; iniciales: string }) {
  const grad: Record<string, string> = {
    "av-cr": "linear-gradient(135deg,#2DA75A,#176B38)",
    "av-am": "linear-gradient(135deg,#F79009,#B54708)",
    "av-dp": "linear-gradient(135deg,#3D4DE8,#1F2BC2)",
    "av-sl": "linear-gradient(135deg,#9A6FDF,#42307D)",
  };
  return (
    <span
      className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-full text-[10px] font-semibold text-white"
      style={{ background: grad[resp] }}
    >
      {iniciales}
    </span>
  );
}

export function Pill({ kind, label }: { kind: string; label: string }) {
  const map: Record<string, { bg: string; fg: string; bd: string; dot: string }> = {
    neut: { bg: "var(--n-50)",    fg: "var(--n-700)",    bd: "var(--n-150)",       dot: "var(--n-400)" },
    info: { bg: "var(--info-50)", fg: "var(--info-700)", bd: "var(--info-border)", dot: "var(--info-500)" },
    warn: { bg: "var(--warn-50)", fg: "var(--warn-700)", bd: "var(--warn-border)", dot: "var(--warn-500)" },
    succ: { bg: "var(--succ-50)", fg: "var(--succ-700)", bd: "var(--succ-border)", dot: "var(--succ-500)" },
    dang: { bg: "var(--dang-50)", fg: "var(--dang-700)", bd: "var(--dang-border)", dot: "var(--dang-500)" },
  };
  const c = map[kind] ?? map.neut;
  return (
    <span
      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-[3px] text-[11px] font-medium"
      style={{ background: c.bg, color: c.fg, borderColor: c.bd }}
    >
      <span className="h-[5px] w-[5px] rounded-full" style={{ background: c.dot }} />
      {label}
    </span>
  );
}

function BadgeGarantia({ compact = false }: { compact?: boolean }) {
  return (
    <span className="ml-1 inline-flex items-center gap-1 rounded-[5px] border border-[--prog-border] bg-[--prog-50] px-1.5 py-[1px] text-[10px] font-semibold uppercase tracking-[0.04em] text-[--prog-700]">
      <Shield className="h-2.5 w-2.5" strokeWidth={2} />
      {compact ? "Garantía F12" : "Garantía"}
    </span>
  );
}

function BadgeAbandonada() {
  return (
    <span className="ml-1 inline-flex items-center rounded-[5px] border border-[--warn-border] bg-[--warn-50] px-1.5 py-[1px] text-[10px] font-semibold uppercase tracking-[0.04em] text-[--warn-700]">
      Abandonada
    </span>
  );
}
