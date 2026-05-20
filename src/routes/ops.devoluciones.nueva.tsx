import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeftCircle, Search, QrCode, Info, Inbox } from "lucide-react";

export const Route = createFileRoute("/ops/devoluciones/nueva")({
  head: () => ({ meta: [{ title: "Nueva devolución · CHV" }] }),
  component: NuevaDevolucion,
});

const STEPS = [
  { n: 1, lbl: "Cliente y venta origen" },
  { n: 2, lbl: "Producto y motivo" },
  { n: 3, lbl: "Resolución" },
  { n: 4, lbl: "Confirmar" },
];

const RESULTS = [
  { pl: "V-2843",  kind: "v" as const,  cli: "Industrial XYZ S.A.S.", sub: "+57 318 442 ··", date: "14 abr 2026", amt: 1450000, vendor: "4 prod · Carlos R." },
  { pl: "V-2841",  kind: "v" as const,  cli: "Industrial XYZ S.A.S.", sub: "+57 318 442 ··", date: "10 abr 2026", amt: 890000,  vendor: "3 prod · María L." },
  { pl: "OT-2845", kind: "ot" as const, cli: "Industrial XYZ S.A.S.", sub: "En proceso",      date: "14 may",      amt: 1840000, vendor: "Vinc. Cot-1042" },
];

function NuevaDevolucion() {
  const [origen, setOrigen] = useState<"cliente" | "proveedor">("cliente");
  const [q, setQ] = useState("industrial");

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border bg-card px-7 pt-5">
        <Link
          to="/ops/devoluciones"
          className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeftCircle className="size-3.5" /> Volver a Devoluciones
        </Link>
      </div>

      <div className="flex items-end justify-between gap-4 border-b border-border bg-card px-7 pb-5 pt-3">
        <div>
          <h1 className="m-0 text-[22px] font-semibold tracking-[-0.01em] text-foreground">
            Nueva devolución · Desde {origen}
          </h1>
          <p className="mt-1 text-[13px] text-muted-foreground">
            {origen === "cliente"
              ? "Reingresa stock al inventario tras validar estado físico."
              : "Devuelve mercancía al proveedor por defecto, vencimiento o error de pedido."}
          </p>
        </div>
        <div className="flex h-9 overflow-hidden rounded-md border border-border bg-card text-[12px] font-medium">
          {(["cliente", "proveedor"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setOrigen(t)}
              className={[
                "px-4 capitalize transition-colors",
                origen === t ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto px-7 py-5">
        {/* stepper */}
        <div className="stepper mb-5">
          {STEPS.map((s, i) => (
            <div key={s.n} className="contents">
              <div className={`step ${s.n === 1 ? "active" : "todo"} flex flex-col items-center gap-1.5`}>
                <div className="step-dot">{s.n}</div>
                <div className="text-[11.5px] text-muted-foreground">{s.lbl}</div>
              </div>
              {i < STEPS.length - 1 && <div className="step-line" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_340px]">
          {/* main */}
          <div className="iblock">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted-foreground">
              Paso 1 de 4
            </div>
            <h2 className="mt-1 text-[18px] font-semibold tracking-[-0.005em] text-foreground">
              {origen === "cliente" ? "Buscar la venta origen" : "Buscar la orden de compra origen"}
            </h2>
            <p className="mt-1.5 text-[13px] leading-[1.55] text-muted-foreground">
              {origen === "cliente"
                ? "La devolución debe vincularse a una venta o OT previa. Busca por número, cliente, o escanea recibo."
                : "Vincula la devolución a una OC previa. Busca por número de OC, proveedor o producto."}
            </p>

            <div className="mt-4 flex">
              <div className="flex h-12 flex-1 items-center gap-2.5 rounded-l-lg border border-r-0 border-border bg-card px-3.5">
                <Search className="size-4 text-muted-foreground" strokeWidth={1.5} />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={origen === "cliente"
                    ? "V-XXXX, OT-XXXX, cliente, teléfono o producto…"
                    : "OC-XXXX, proveedor, NIT o producto…"}
                  className="min-w-0 flex-1 border-0 bg-transparent text-[14px] text-foreground outline-none placeholder:text-muted-foreground/60"
                />
              </div>
              <button className="inline-flex h-12 items-center gap-2 rounded-r-lg bg-[--p-600] px-4 text-[13px] font-medium text-white hover:bg-[--p-700]">
                <QrCode className="size-3.5" /> Escanear QR
              </button>
            </div>

            {origen === "cliente" && (
              <>
                <div className="mt-4 flex flex-col gap-1.5">
                  {RESULTS.map((r) => (
                    <button
                      key={r.pl}
                      className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-4 rounded-lg border border-border bg-card px-3.5 py-3 text-left transition-colors hover:border-[--p-200] hover:bg-[--p-50] dark:hover:bg-[rgba(45,60,229,.08)]"
                    >
                      <span className={`link-pill ${r.kind} font-mono text-[12.5px]`}>{r.pl}</span>
                      <div className="min-w-0">
                        <div className="text-[13px] font-medium text-foreground">{r.cli}</div>
                        <div className="font-mono text-[11px] text-muted-foreground">{r.sub}</div>
                      </div>
                      <div className="font-mono text-[11.5px] text-muted-foreground">{r.date}</div>
                      <div className="font-mono text-[13px] font-medium tabular-nums text-foreground">
                        $ {r.amt.toLocaleString("es-CO")}
                      </div>
                      <div className="text-[11.5px] text-muted-foreground">{r.vendor}</div>
                    </button>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-2 rounded-md bg-muted/40 px-3 py-2.5 text-[11.5px] text-muted-foreground">
                  <Info className="size-3.5 shrink-0" />
                  <span>
                    Si no encuentras la venta, puedes crear una devolución sin vinculación (no recomendado).
                  </span>
                  <button className="ml-auto text-foreground underline underline-offset-2 hover:text-[--p-600]">
                    Devolución sin venta origen
                  </button>
                </div>
              </>
            )}
          </div>

          {/* cart */}
          <aside className="cart">
            <div className="cart-eyebrow">Resumen de la devolución</div>
            <div className="flex flex-col items-center justify-center gap-3 px-3 py-10 text-center text-muted-foreground">
              <Inbox className="size-7" strokeWidth={1.5} />
              <div className="max-w-[220px] text-[12.5px] leading-[1.5]">
                Selecciona {origen === "cliente" ? "una venta" : "una OC"} para continuar
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
