# Plan de acción · Frontend CHV en Lovable

## Qué leí del ZIP

El `claude-code-kit` que subiste es un kit completo de migración pensado **explícitamente para Claude Code**, no para Lovable. Incluye:

- `MASTER_PROMPT.md` — prompt fundacional (Next.js 14 + App Router + Tailwind v3 + shadcn/ui).
- `ESTADO_PROYECTO.md` — 18 pantallas canónicas archivadas, 22 módulos totales (12 `/ops` + 10 `/admin`), 16 con referencia visual lista.
- `design-system/tokens.css` + `tailwind.config.ts` — sistema CHV v1.0 (royal `#2D3CE5`, 5 pills semánticas, 5 categorías, 4 sedes, IBM Plex).
- `specs/SPEC_FUNCIONAL_CHV.md`, `REGLAS_UI_CHV.md`, `seed.json` — ciclo comercial canónico Cot-1042 → V-2847 → Rec-1284 → OT-2845.
- `prompts/` — plantilla por módulo + orden de implementación.

El propio README dice que **descartaron Lovable previamente** porque el stack es distinto (TanStack Router + Tailwind v4 + Lovable Cloud). Si vamos a trabajar en Lovable de todas formas, hay que adaptar el kit, no aplicarlo literal.

## Dos cosas importantes antes de arrancar

1. **No puedo crear el repo de GitHub por vos.** La conexión a GitHub se hace desde la UI de Lovable: botón `+` (abajo a la izquierda en el chat) → GitHub → Connect project → autorizar Lovable GitHub App → Create Repository. A partir de ese momento, todo cambio que yo haga se sincroniza automáticamente al repo (sync bidireccional). Yo te aviso cuando estemos en el momento adecuado para conectarlo.
2. **Faltan los 18 HTML canónicos de referencia.** El kit los referencia pero el ZIP solo trae los docs. Sin esos HTML no hay forma de hacer pixel-match de los módulos. Necesito que los subas (un ZIP aparte está bien) antes de empezar con módulos individuales.

## Decisión de stack — pedirte input

El kit pide Next.js 14 + Tailwind v3. Lovable corre TanStack Start v1 + React 19 + Tailwind v4 + Vite. Tres caminos:

- **A · Construir en Lovable adaptando el kit** (recomendado si querés usar Lovable). Traduzco rutas Next App Router → file-based routing de TanStack (`src/routes/ops.inventario.tsx`, etc.), `tokens.css` y la config Tailwind a la sintaxis `@theme inline` de v4, y mantengo idénticos: tokens, tipografía, spec, seed, ciclo comercial, reglas de UI/tono.
- **B · Construir literal en Claude Code afuera de Lovable.** Es lo que el kit recomienda. Lovable no aporta valor acá.
- **C · Híbrido.** Lovable para iterar visual rápido, exportar a GitHub, terminar en Claude Code. Más fricción.

Asumo **A** salvo que digas lo contrario.

## Plan de ejecución (asumiendo A)

1. **Conectar GitHub** desde la UI (vos, ahora).
2. **Foundation** en Lovable:
   - Portar `tokens.css` a `src/styles.css` (formato `@theme inline` + `oklch` o `hex` según corresponda).
   - Fuentes IBM Plex Sans + Mono.
   - Constantes `MODULOS_OPS`, `MODULOS_ADMIN`, `SEDES`, `CATEGORIAS`, `ROLES` en `src/lib/constants.ts`.
   - `seed.json` tipado en `src/lib/mock-data.ts`.
   - Shell `/ops`: sidebar oscura canónica (5 secciones, 12 módulos exactos con iconos y contadores), header con buscador Cmd+K, chip de sede, theme toggle, avatar.
   - Shell `/admin`: sidebar con filete royal a la derecha, header "PANEL ADMINISTRATIVO" con dot info pulsante, 3 secciones / 10 módulos, active state info-500.
   - Light/dark con persistencia.
   - 22 rutas placeholder usando `<ModulePlaceholder name referenceFile />`.
   - Redirect `/` → `/ops/inventario`.
3. **Validación de la foundation** contra `Foundation Shell · 8 vistas.html` (necesito que lo subas).
4. **Módulos uno por uno** siguiendo `ORDEN_DE_IMPLEMENTACION.md`, cada uno con su HTML canónico como referencia. Empezamos por Inventario.
5. **Backend opcional** con Lovable Cloud cuando estén los módulos principales.

## Detalle técnico (sección para referencia)

- `app/(ops)/layout.tsx` (Next) → `src/routes/ops.tsx` (layout con `<Outlet />`) + `src/routes/ops.inventario.tsx`, etc. Mismo para `admin`.
- `tokens.css` v3 (`hsl` o `hex` en `:root`) → mantengo los hex tal cual y los expongo vía `@theme inline` mapeando `--color-*: var(--*)` para que las utilities Tailwind (`bg-p-600`, `text-cat-cmp`) funcionen en v4.
- shadcn/ui ya está en el template — uso esos primitivos directamente.
- `lucide-react` ya disponible.
- Cero emojis, IDs en mono, montos COP con punto miles, fechas `19 abr 2026`, sin em dashes, sin flechas en texto — todo según `REGLAS_UI_CHV.md`.
- `next-themes` → equivalente en Vite/React (manejo manual de clase `dark` con persistencia en localStorage).
- `next/font/google` → `<link>` en `__root.tsx` head a Google Fonts IBM Plex.

## Qué necesito de vos para arrancar

1. Confirmación del camino (A, B o C).
2. Conectar GitHub desde la UI cuando te lo indique.
3. Subir el ZIP con los **18 HTML canónicos** de `references/` (sin ellos, los módulos no se pueden replicar fiel).

Si confirmás A y subís las referencias, estoy listo para empezar por la foundation.
