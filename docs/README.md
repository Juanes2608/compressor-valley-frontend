# Kit de migración a Claude Code · Compresores del Valle S.A.S.

Este kit contiene todo lo necesario para construir la aplicación CHV en Claude Code (entorno local de desarrollo asistido por IA) usando los 18 archivos HTML canónicos de diseño como referencia visual exacta de cada pantalla.

---

## Contexto rápido

Llevas 18 pantallas canónicas producidas en un workflow paralelo de diseño (Claude Design). Cada HTML single-file tiene 6+ vistas por pantalla (desktop light, tablet, mobile, dark, estados especiales). Son tu **fuente de verdad visual**. NO son la app, son referencias para construirla.

La app real la vas a construir en **Claude Code**: un entorno donde Claude opera sobre tu repositorio local, edita archivos, ejecuta comandos, instala dependencias y construye módulo por módulo. Tu rol es validar cada output contra su referencia canónica.

---

## Archivos del kit

```
claude-code-kit/
├── README.md                          ← este archivo, guía de uso
├── MASTER_PROMPT.md                   ← primer prompt para arrancar Claude Code
├── ESTADO_PROYECTO.md                 ← snapshot del estado actual y pendientes
│
├── design-system/
│   ├── tokens.css                     ← CSS variables canónicas con light/dark
│   └── tailwind.config.ts             ← config Tailwind con los mismos tokens
│
├── specs/
│   ├── SPEC_FUNCIONAL_CHV.md          ← qué hace cada uno de los 22 módulos
│   ├── REGLAS_UI_CHV.md               ← tono, no-hacer, requisitos universales
│   └── seed.json                      ← datos canónicos del ciclo comercial
│
└── prompts/
    ├── PLANTILLA_PROMPT_MODULO.md     ← cómo darle a Claude Code un módulo
    └── ORDEN_DE_IMPLEMENTACION.md     ← orden recomendado de construcción
```

---

## Cómo se usa el kit (flujo paso a paso)

### Paso 1 · Preparar el repo

Crea un repositorio nuevo local (o GitHub) llamado `chv-app` o similar. Adentro, crea una carpeta `references/` y copia ahí los 18 archivos HTML canónicos del ZIP de Claude Design. Cuando Claude Code necesite ver cómo se ve una pantalla, va a leer ese HTML directamente.

Estructura recomendada del repo al inicio:

```
chv-app/
├── references/                        ← los 18 HTML canónicos van aquí
│   ├── Sistema CHV · v1.0 final.html
│   ├── Foundation Shell · 8 vistas.html
│   ├── Inventario v2 · 7 vistas.html
│   ├── ... (todos los demás)
│
├── docs/                              ← copia los archivos del kit aquí
│   ├── SPEC_FUNCIONAL_CHV.md
│   ├── REGLAS_UI_CHV.md
│   ├── seed.json
│   └── ESTADO_PROYECTO.md
│
└── (Claude Code irá creando aquí: app/, components/, lib/, etc.)
```

### Paso 2 · Abrir Claude Code en el repo

Una vez tengas el repo con `references/` y `docs/`, abres Claude Code en esa carpeta (`cd chv-app && claude`).

### Paso 3 · Primer mensaje a Claude Code

Como primer mensaje, le pegas el contenido completo de `MASTER_PROMPT.md`. Eso le da el contexto fundacional, le explica la arquitectura, las reglas y le pide construir la base del proyecto (Next.js + Tailwind + shadcn/ui + las dos shells de navegación + placeholders para los 22 módulos).

Claude Code va a leer los archivos del kit que copiaste en `docs/`, leer el HTML de Foundation Shell para entender la navegación canónica, y generar la base del proyecto.

### Paso 4 · Validar la foundation

Antes de construir módulos individuales, valida que la base esté sólida:

- Las dos shells (`/ops` y `/admin`) tienen las sidebars canónicas correctas.
- Light y dark mode funcionan con persistencia.
- Mobile responsive con bottom nav.
- Los 22 placeholders existen en sus rutas correctas.

Si algo no encaja, le pides a Claude Code corregir antes de avanzar.

### Paso 5 · Construir módulos uno por uno

Para cada módulo, usas la plantilla de `PLANTILLA_PROMPT_MODULO.md`. El flujo por módulo es:

1. Le dices qué módulo construir (por ej. "Inventario").
2. Le indicas qué archivo HTML usar como referencia visual exacta (en este caso `references/Inventario v2 · 7 vistas.html`).
3. Claude Code lee el HTML, ve las 6 vistas, replica el resultado en React/TypeScript real.
4. Validas visualmente el output contra el HTML canónico.
5. Si todo coincide, avanzas al siguiente módulo.

El **orden recomendado de construcción** está en `ORDEN_DE_IMPLEMENTACION.md`. No es arbitrario, respeta dependencias entre módulos.

### Paso 6 · Backend (Supabase)

Una vez los módulos principales estén implementados con datos mock del `seed.json`, integras Supabase. El esquema de tablas se deriva naturalmente de la spec funcional + los datos del seed.

Este paso es opcional para una v1.0 demo, pero crítico para producción. Claude Code puede ayudarte a generar las migraciones SQL, configurar RLS (Row Level Security) y reemplazar los mocks por queries reales.

---

## Reglas de oro al trabajar con Claude Code

### 1. El HTML canónico es la verdad visual

Cuando Claude Code construya un módulo, su referencia primaria es el HTML correspondiente en `references/`. Si el output difiere del HTML, el output está mal, no el HTML. Si quieres cambiar el diseño, primero cambias el HTML canónico y después le pides a Claude Code que re-genere.

### 2. Un módulo a la vez

No le pidas a Claude Code que construya 5 módulos en una sola conversación. Uno por uno, valida, avanza. Contexto pequeño = calidad alta.

### 3. Recordatorios explícitos cuando se desvíe

Si Claude Code inventa un módulo en la sidebar, recordále la lista canónica con un mensaje corto:

> "Las 12 entradas de /ops son: Inventario, Productos, Ventas, Cotizaciones, Recibos, Devoluciones, Compras, Traspasos, Garantías, Órdenes de Trabajo, Ensambles, Herramientas. Las 5 secciones son: Catálogo y stock, Operación comercial, Bodega y movimiento, Taller, Soporte. Eliminá cualquier otra entrada."

Si usa tokens equivocados, recordále consultar `design-system/tokens.css`. La consistencia se mantiene mejor por referencia explícita que por re-derivación.

### 4. Coherencia del ciclo comercial

Los datos canónicos del ciclo Cot-1042 → V-2847 → Rec-1284 → OT-2845 con Industrial XYZ están en `seed.json` bajo `ciclo_comercial_canonico`. Cuando Claude Code genere mocks para los módulos, esos datos deben aparecer coherentemente. Si un módulo muestra Industrial XYZ con NIT distinto al canónico, hay error.

### 5. Cuándo parar y replantear

Si Claude Code no logra resolver algo después de 2-3 intentos, no insistas. Páráte 5 minutos, releé el HTML canónico, identifica qué patrón específico está faltando, y replanteá el prompt con esa precisión. Mejor un prompt bien armado que 10 iteraciones de "intentalo de nuevo".

---

## Stack técnico recomendado

El `MASTER_PROMPT.md` le pide a Claude Code construir con este stack:

- **Next.js 14+** con App Router y TypeScript
- **Tailwind CSS v3** + **shadcn/ui** para primitivos
- **lucide-react** para iconografía
- **react-hook-form** + **zod** para formularios
- **TanStack Query** para state de datos
- **next-themes** para light/dark
- **Supabase** como backend (cuando se integre)

Si quieres usar otro stack (Remix, Vite + React, Astro), ajusta el Master Prompt antes de pegarlo. Pero conserva: Tailwind + tokens canónicos, shadcn/ui o equivalente, lucide-react, IBM Plex como tipografía.

---

## Estado actual del proyecto

Resumen rápido (el detalle completo está en `ESTADO_PROYECTO.md`):

**18 pantallas canónicas archivadas (productivo):**

- Fase 0: Sistema CHV v1.0 + Picking
- Fase 1: Foundation Shell
- Fase 2: Inventario v2 + Cockpit v2
- Fase 3: OT lista + OT detalle
- Fase 4: Cotizaciones (lista + wizard + detalle)
- Fase 5: Ventas + Recibos F14
- Fase 6: Compras + Traspasos + Devoluciones
- Fase 7: Garantías F13 + Herramientas
- Fase 9: Configuración + Usuarios (combinados en un archivo)

**4 entregas de Claude Design pendientes (referencias visuales por producir):**

- Fase 10 agrupada en 2 archivos: monitoreo (Auditoría + Alertas + Cierres) y análisis comercial (Análisis ABC + Top 10 + Reorden).
- Fase 11: Conteo cíclico (Task Mode similar a Picking).
- Fase 12: Patrones globales (loading, empty, error, restricted, toast, modal destructivo, Cmd+K, QR scanner).

**Fase 8 Ensambles aplazada a post-v1.0.**

**Después de Fase 12 cerrada:** Fase 13 es auditoría propia final sin producir archivo nuevo, solo revisión.

---

## Diferencia con un intento anterior de migrar a Lovable

En una sesión previa exploramos migrar a Lovable. Esa ruta se descartó porque:

- Lovable usa un stack distinto (TanStack Router + Tailwind v4 + Lovable Cloud) que obliga a traducir los prompts del workflow original.
- El control sobre el output es menor que en Claude Code (donde Claude opera directamente sobre tu repo).
- La validación pixel-perfect contra las referencias HTML es más fácil cuando Claude Code lee el HTML mismo como contexto.

**Este kit es exclusivamente para Claude Code.** No mezcles con instrucciones de Lovable.

---

## Próximo paso operativo

1. Crea el repo `chv-app/`.
2. Copia el ZIP de Claude Design a `chv-app/references/` (descomprimido, los HTML sueltos).
3. Copia los archivos de este kit a `chv-app/docs/`.
4. Abre Claude Code en `chv-app/`.
5. Pega como primer mensaje el contenido completo de `MASTER_PROMPT.md`.
6. Validá el output de la foundation antes de empezar con módulos individuales.
7. Construí módulos uno por uno siguiendo el orden de `ORDEN_DE_IMPLEMENTACION.md`.

Cuando tengas dudas durante el camino, vuelve a este README. Si encuentras patrones nuevos o reglas que conviene agregar al kit, actualizá los archivos correspondientes. El kit está vivo.

Buena suerte con la migración. El trabajo de diseño es sólido, este kit te garantiza que esa solidez se mantenga al pasar a código real.
