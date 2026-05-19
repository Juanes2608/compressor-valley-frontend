import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CURRENT_USER } from "@/lib/constants";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Iniciar sesión · CHV" }] }),
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState(CURRENT_USER.email);
  const [password, setPassword] = useState("");

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Panel izquierdo: brand */}
      <div className="hidden lg:flex flex-col justify-between bg-[--n-975] p-10 text-white">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-md bg-[--p-600] font-mono text-[13px] font-semibold tracking-wider text-white">
            CHV
          </div>
          <div className="leading-tight">
            <div className="text-[15px] font-semibold">Compresores del Valle</div>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-white/40">
              Sistema operativo · v1.0
            </div>
          </div>
        </div>

        <div>
          <div className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.1em] text-white/40">
            Cali · Tuluá · 4 sedes
          </div>
          <h1 className="font-sans text-[34px] font-semibold leading-tight text-white">
            Bodega, taller y ventas en un solo sistema.
          </h1>
          <p className="mt-3 max-w-md text-[14px] leading-relaxed text-white/60">
            Operación diaria de compresores industriales, repuestos y servicio técnico.
          </p>
        </div>

        <div className="font-mono text-[10.5px] text-white/30">
          Mayo 2026 · Compresores del Valle S.A.S.
        </div>
      </div>

      {/* Panel derecho: form */}
      <div className="flex items-center justify-center bg-[--n-25] p-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-md bg-[--p-600] font-mono text-[11px] font-semibold tracking-wider text-white">
                CHV
              </div>
              <div className="font-semibold text-[--n-900]">Compresores del Valle</div>
            </div>
          </div>

          <h2 className="text-[22px] font-semibold text-[--n-900]">Iniciar sesión</h2>
          <p className="mt-1 text-[13px] text-[--n-500]">Acceso para personal autorizado.</p>

          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              // Auth real se conecta después con Lovable Cloud.
              window.location.href = "/ops/inventario";
            }}
          >
            <div>
              <label className="mb-1.5 block font-mono text-[10.5px] uppercase tracking-[0.1em] text-[--n-500]">
                Correo
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus-ring h-10 w-full rounded-md border border-[--n-200] bg-[--n-0] px-3 text-[13.5px] text-[--n-900] outline-none placeholder:text-[--n-300] dark:border-white/[0.1] dark:bg-white/[0.02]"
                placeholder="correo@cv.co"
              />
            </div>
            <div>
              <label className="mb-1.5 block font-mono text-[10.5px] uppercase tracking-[0.1em] text-[--n-500]">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus-ring h-10 w-full rounded-md border border-[--n-200] bg-[--n-0] px-3 text-[13.5px] text-[--n-900] outline-none placeholder:text-[--n-300] dark:border-white/[0.1] dark:bg-white/[0.02]"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="focus-ring h-10 w-full rounded-md bg-[--p-cta] text-[13.5px] font-medium text-white hover:opacity-95"
            >
              Entrar
            </button>
          </form>

          <div className="mt-6 rounded-md border border-[--n-150] bg-[--n-0] p-3 text-[12px] text-[--n-500] dark:border-white/[0.08] dark:bg-white/[0.02]">
            <div className="mb-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-[--n-500]">
              Modo demo
            </div>
            Sesión simulada como{" "}
            <span className="font-medium text-[--n-900]">
              {CURRENT_USER.nombre} ({CURRENT_USER.rol})
            </span>
            . Auth real se conecta en una fase posterior.
          </div>

          <div className="mt-6 text-center text-[11.5px] text-[--n-500]">
            <Link to="/ops/inventario" className="hover:text-[--p-700]">
              Continuar sin iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
