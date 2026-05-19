import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { ThemeProvider } from "@/lib/theme";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[--n-25] px-4">
      <div className="max-w-md text-center">
        <div className="font-mono text-[64px] font-semibold text-[--p-600]">404</div>
        <h2 className="mt-2 text-xl font-semibold text-[--n-900]">Ruta no encontrada</h2>
        <p className="mt-2 text-[13px] text-[--n-500]">
          La página que buscas no existe o fue movida.
        </p>
        <div className="mt-6">
          <Link
            to="/ops/inventario"
            className="inline-flex h-9 items-center justify-center rounded-md bg-[--p-cta] px-4 text-[13px] font-medium text-white hover:opacity-90"
          >
            Ir a Inventario
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[--n-25] px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-[--n-900]">No fue posible cargar la página</h1>
        <p className="mt-2 text-[13px] text-[--n-500]">{error.message || "Error desconocido."}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex h-9 items-center rounded-md bg-[--p-cta] px-4 text-[13px] font-medium text-white hover:opacity-90"
          >
            Reintentar
          </button>
          <a
            href="/ops/inventario"
            className="inline-flex h-9 items-center rounded-md border border-[--n-200] bg-[--n-0] px-4 text-[13px] font-medium text-[--n-900] hover:bg-[--n-75]"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CHV · Compresores del Valle" },
      { name: "description", content: "Sistema operativo de Compresores del Valle S.A.S." },
      { name: "theme-color", content: "#0B1320" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

// Script inline: aplica clase dark antes del paint para evitar flash.
const NO_FLASH_SCRIPT = `
(function(){try{
  var t=localStorage.getItem('chv-theme')||'system';
  var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);
  if(d)document.documentElement.classList.add('dark');
}catch(e){}})();`;

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_SCRIPT }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
