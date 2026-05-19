# Plan de acción · Migrar CHV de Claude Code a Lovable

## Qué tengo

**Kit de docs (ZIP 1):**
- `MASTER_PROMPT.md`, `ESTADO_PROYECTO.md`, `README.md`
- `design-system/tokens.css` + `tailwind.config.ts` (sistema CHV v1.0: royal `#2D3CE5`, 5 pills semánticas, 5 categorías, 4 sedes, IBM Plex Sans/Mono)
- `specs/SPEC_FUNCIONAL_CHV.md`, `REGLAS_UI_CHV.md`, `seed.json` (ciclo Cot-1042 → V-2847 → Rec-1284 → OT-2845)
- `prompts/PLANTILLA_PROMPT_MODULO.md`, `ORDEN_DE_IMPLEMENTACION.md`

**18 HTML canónicos (ZIP 2):** Foundation Shell, Inventario v2, Cockpit v2, OT Lista + Detalle, Cotizaciones (Lista + Wizard + Detalle), Ventas, Recibos F14, Compras, Traspasos, Devoluciones, Garantías F13, Herramientas, Configuración + Usuarios, Sistema CHV v1.0, Picking. Todos disponibles, ya los tengo extraídos y puedo leerlos durante la construcción.

## Adaptación de stack obligatoria

El kit asume Next.js 14 + App Router + Tailwind v3. Lovable corre **TanStack Start v1 + React 19 + Tailwind v4 + Vite**. La traducción es directa pero hay que hacerla:

| Kit (Next.js) | Lovable (TanStack Start) |
|---|---|
| `app/(ops)/inventario/page.tsx` | `src/routes/ops.inventario.tsx` |
| `app/(ops)/layout.tsx` con `children` | `src/routes/ops.tsx` con `<Outlet />` |
| `app/layout.tsx` | `src/routes/__root.tsx` |
| `next/font/google` | `<link>` Google Fonts en `__root` head |
| `next-themes` | manejo manual de clase `dark` con persistencia en `localStorage` |
| `tailwind.config.ts` v3 (`hex` en `:root`) | `src/styles.css` con `@theme inline` v4, manteniendo hex tal cual |
| Server actions / route handlers | `createServerFn` o `src/routes/api/*` (solo cuando se integre backend) |

Mantengo idénticos: tokens visuales, tipografía, ciclo comercial, spec funcional, reglas de tono, lista canónica de módulos.

## Repo en GitHub

No puedo crearlo yo. Lo hacés vos desde la UI:

**Desktop:** botón `+` (abajo izquierda del chat) → **GitHub** → **Connect project** → autorizar la Lovable GitHub App → **Create Repository**.
**Mobile:** botón `+` (abajo izquierda en modo Chat) → **GitHub**.

A partir de ahí el sync es bidireccional automático. Recomiendo conectarlo **antes** de que empiece a generar archivos para que todo quede versionado desde el commit inicial.

## Plan de ejecución

### Paso 0 · Vos
Conectar el repo de GitHub.

### Paso 1 · Foundation (un solo turno largo)
- Portar `tokens.css` a `src/styles.css` con `@theme inline` (Tailwind v4) preservando todos los hex.
- IBM Plex Sans + Mono vía Google Fonts en `__root.tsx`.
- `src/lib/constants.ts`: `MODULOS_OPS`, `MODULOS_ADMIN`, `SEDES`, `CATEGORIAS`, `ROLES`.
- `src/lib/mock-data.ts`: import tipado del `seed.json`.
- `src/lib/utils.ts`: helpers `formatCOP`, `formatFechaCorta`, `formatFechaHora`, `formatIdMono`.
- Layout `src/routes/ops.tsx`: sidebar oscura canónica (5 secciones, 12 módulos, iconos lucide, contadores), header (buscador Cmd+K, chip sede WH-01, theme toggle, avatar, botón "Panel Admin" si rol = Admin), bottom nav mobile.
- Layout `src/routes/admin.tsx`: sidebar con filete royal derecho + header "PANEL ADMINISTRATIVO" con dot info pulsante, 10 módulos en 3 secciones, active state info-500, botón "Volver a Operaciones".
- Light/dark toggle con persistencia, sin flash en primer paint.
- 22 rutas placeholder con `<ModulePlaceholder name referenceFile />`.
- Redirect `/` → `/ops/inventario`.
- Login básico `/login` (visual del kit, sin auth real todavía).

Referencia visual primaria: `Foundation Shell · 8 vistas.html`.

### Paso 2 · Validación de la foundation
Comparás contra Foundation Shell. Si algo no cuadra, corrijo antes de avanzar.

### Paso 3 · Módulos uno por uno
Siguiendo `ORDEN_DE_IMPLEMENTACION.md`. Cada módulo: leo su HTML canónico, identifico patrones (estructura, estados, mobile), implemento en React con los primitivos shadcn ya disponibles, valido contra el HTML. Empezamos por **Inventario** (`Inventario v2 · 7 vistas.html`).

### Paso 4 · Backend (opcional, post-módulos)
Lovable Cloud para auth + Postgres + storage cuando los módulos visuales estén estables. Migrar mocks a queries reales.

## Reglas que aplico en todo momento

- Cero emojis en UI, iconos solo lucide-react.
- IDs (Cot-1042, V-2847, OT-2845, SKUs) siempre en mono.
- Montos COP: `$ 1.840.000` (mono, punto miles, sin centavos).
- Fechas: `19 abr 2026` y `19 abr 2026 · 14:23`.
- Sin em dashes (`—`), sin flechas en texto, sin lenguaje de IA ni superlativos.
- Lista canónica de 22 módulos cerrada — no inventar entradas.
- Coherencia obligatoria del ciclo Industrial XYZ en todos los módulos que la muestren.
- Cero JS poblador: todo el contenido visible va hardcoded en JSX (los mocks se importan al render, no se generan en `useEffect`).
- Contenedores principales sin `overflow: hidden`; tablas con `overflow-x: auto`; mobile transforma tablas a cards.

## Qué necesito de vos ahora

1. Confirmar que vamos con Lovable + TanStack Start (estás de acuerdo con la adaptación).
2. Conectar el repo de GitHub (instrucciones arriba).

Cuando esos dos pasos estén listos, arranco con la Foundation en un turno.
