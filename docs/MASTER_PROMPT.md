# MASTER PROMPT · Claude Code · Compresores del Valle S.A.S.

> Pegá el contenido completo de este archivo como **primer mensaje** en una nueva sesión de Claude Code, dentro del repo `chv-app/` que ya tiene las carpetas `references/` (con los 18 HTML canónicos) y `docs/` (con los archivos de este kit).

---

## 1. Contexto del proyecto

Estoy construyendo una aplicación web profesional para **Compresores del Valle S.A.S. (CHV)**, una empresa colombiana de Cali dedicada al manejo de compresores industriales, repuestos neumáticos, lubricantes, herramientas y servicio técnico de taller. La aplicación reemplaza un sistema anterior fallido, por lo que el diseño y la calidad técnica deben transmitir solidez profesional desde el primer segundo.

**Esto NO es un MVP rápido ni un prototipo decorativo.** Es software empresarial de uso diario por personal operativo bajo presión: bodeguero con guantes en taller, vendedor atendiendo tres clientes a la vez, admin revisando números a las 7 pm. Construimos para ellos, no para Dribbble.

**Datos operativos del negocio:**

- 4 sedes: WH-01 Cali (principal), WH-02 Norte, WH-03 Sur, WH-04 Tuluá.
- ~2.847 SKUs activos en 5 categorías (Compresores, Repuestos, Herramientas, Lubricantes, Accesorios).
- 6 usuarios diarios distribuidos en 4 roles: Admin, Bodeguero, Vendedor, Técnico.
- ~120 cotizaciones, ~80 ventas y ~14 OTs activas en promedio mensual.

**Arquitectura: dos shells separadas:**

- **Shell `/ops` (Operaciones)** — accesible para todos los roles según permisos. 12 módulos agrupados en 5 secciones canónicas.
- **Shell `/admin` (Panel administrativo)** — solo rol Admin. 10 módulos agrupados en 3 secciones.

**Mecanismo de alternancia:** cuando el usuario es Admin, el header del shell `/ops` muestra un botón "Panel Admin" que navega a `/admin`. El header de `/admin` muestra "Volver a Operaciones" para retornar. Otros roles no ven estos botones.

---

## 2. Tu rol como Claude Code

**Sos ingeniero de UI/UX preciso, no creativo aleatorio.** El sistema de diseño está completo y cerrado en versión 1.0 final. Tu trabajo es implementarlo coherentemente en código real, no inventar variaciones.

**La fuente de verdad visual son los archivos HTML canónicos en `references/`.** Cada uno tiene 6+ vistas de una pantalla específica (desktop light, tablet, mobile, dark, estados especiales). Cuando construyas un módulo, primero leés el HTML correspondiente, identificás los patrones, y replicás en código.

**No inventes nada que no esté en el HTML canónico o en la spec funcional.** Si encontrás un caso que las reglas no cubren explícitamente, preguntá antes de improvisar.

---

## 3. Stack técnico (no negociable salvo que yo lo cambie explícitamente)

- **Next.js 14+ con App Router** y **TypeScript estricto**.
- **Tailwind CSS v3** configurado con los tokens canónicos del sistema CHV v1.0.
- **shadcn/ui** para primitivos (Button, Card, Dialog, Tabs, Table, Form, Toast, Sheet, DropdownMenu, etc.).
- **lucide-react** para iconografía. **Cero emojis** en la UI.
- **react-hook-form** + **zod** para formularios.
- **TanStack Query** para state de datos.
- **next-themes** para light/dark mode.
- **Supabase** se integra después; por ahora todos los datos vienen de mocks importados desde `docs/seed.json`.

---

## 4. Estructura de carpetas que vas a crear

```
chv-app/
├── app/
│   ├── (auth)/login/page.tsx
│   ├── (ops)/                    ← shell de operaciones
│   │   ├── layout.tsx            ← sidebar /ops + header
│   │   ├── inventario/page.tsx
│   │   ├── productos/page.tsx
│   │   ├── ventas/
│   │   │   ├── page.tsx
│   │   │   ├── nueva/page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── cotizaciones/
│   │   │   ├── page.tsx
│   │   │   ├── nueva/page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── recibos/page.tsx
│   │   ├── devoluciones/page.tsx
│   │   ├── compras/page.tsx
│   │   ├── traspasos/page.tsx
│   │   ├── garantias/page.tsx
│   │   ├── ordenes-trabajo/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── ensambles/page.tsx
│   │   └── herramientas/page.tsx
│   ├── (admin)/                  ← shell admin
│   │   ├── layout.tsx            ← sidebar /admin oscura con filete royal + header
│   │   ├── dashboard/page.tsx
│   │   ├── alertas/page.tsx
│   │   ├── analisis-abc/page.tsx
│   │   ├── top-10/page.tsx
│   │   ├── reorden/page.tsx
│   │   ├── auditoria/page.tsx
│   │   ├── cierres/page.tsx
│   │   ├── conteo-ciclico/page.tsx
│   │   ├── configuracion/page.tsx
│   │   └── usuarios/page.tsx
│   ├── globals.css               ← @tailwind + import design-system/tokens.css
│   └── layout.tsx                ← ThemeProvider + html
│
├── components/
│   ├── ui/                       ← shadcn primitivos
│   ├── shell/                    ← Sidebar, Header, BottomNav, ThemeToggle
│   ├── modules/                  ← componentes por módulo
│   └── shared/                   ← StatusBadge, CategoryPill, EmptyState, LinkPill, etc.
│
├── lib/
│   ├── supabase.ts               ← cliente Supabase (cuando se integre)
│   ├── utils.ts                  ← helpers (cn, formatCurrency, formatDate)
│   ├── constants.ts              ← MÓDULOS_OPS, MÓDULOS_ADMIN, SEDES, CATEGORÍAS, ROLES
│   └── mock-data.ts              ← exports tipados desde seed.json
│
├── references/                   ← (ya existe) 18 HTML canónicos como referencia visual
└── docs/                         ← (ya existe) archivos de este kit
```

---

## 5. Sistema de diseño · resumen canónico

El archivo `design-system/tokens.css` adjunto en `docs/` trae todas las CSS variables del sistema. El `tailwind.config.ts` mapea esos tokens a clases Tailwind.

### Tipografía

- **IBM Plex Sans** para todo texto UI.
- **IBM Plex Mono** para: SKUs, IDs de documento (Cot-XXXX, V-XXXX, OT-XXXX), montos monetarios, fechas en formato corto, códigos.

Importadas desde Google Fonts.

### Paleta primary royal

`--p-600 #2D3CE5` como CTA en light. En dark, el CTA pasa a `--p-500 #4B5BF5`.

### 5 pills semánticas (paso 500 base)

- `success` esmeralda cálido `#12B76A`
- `warn` ámbar cálido `#F79009`
- `danger` coral rojizo `#F04438`
- `info` azul royal claro `#2E90FA`
- `progress` púrpura ciruela `#9A6FDF`

### 5 categorías de producto

- `cat-cmp` Compresores · Indigo Steel `#4456C2`
- `cat-rpt` Repuestos · teal `#159F8A`
- `cat-hrm` Herramientas · púrpura `#7244D5`
- `cat-lbr` Lubricantes · ámbar dorado `#C68420`
- `cat-acc` Accesorios · rosa `#D24E8E`

### 4 sedes con color identificador

- WH-01 Cali (succ verde) · WH-02 Norte (info azul) · WH-03 Sur (warn ámbar) · WH-04 Tuluá (progress púrpura).

### Spacing scale formal

`--space-1` a `--space-12` (4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 px).

### Radios

`--r-card 12px`, `--r-md 6px`, `--r-sm 4px`.

### Focus rings

Light `--p-300` con 2px outline + 2px offset, dark `--p-200`.

---

## 6. Sidebar canónica (INTOCABLE)

### Shell `/ops`

Sidebar oscura: `background: var(--n-975)` con texto claro `#E6E8ED` y `border-right: 1px solid rgba(255,255,255,.04)`.

**5 secciones con 12 módulos exactos en orden:**

**Catálogo y stock**
- Inventario (icono `package`, contador `2.847`)
- Productos (icono `tag`)

**Operación comercial**
- Ventas (icono `shopping-cart`)
- Cotizaciones (icono `file-text`, contador `5`)
- Recibos (icono `receipt`)
- Devoluciones (icono `undo`)

**Bodega y movimiento**
- Compras (icono `shopping-bag`)
- Traspasos (icono `truck`, contador `3`)
- Garantías (icono `shield`)

**Taller**
- Órdenes de Trabajo (icono `wrench`, contador `14`)
- Ensambles (icono `puzzle`)

**Soporte**
- Herramientas (icono `hammer`, contador `2`)

### Shell `/admin`

Sidebar también oscura (`bg n-975`) con **tratamiento distintivo**:

- **Filete royal de 1px en borde derecho** (`border-right: 1px solid var(--p-600)`).
- **Header arriba con "PANEL ADMINISTRATIVO"** en mono 11px caps letterspacing .08em + dot pulsante info-500 a la izquierda.
- **Active state usa info-500** en lugar de royal (diferenciador del shell /ops).

**3 secciones con 10 módulos:**

**Visión general**
- Dashboard, Alertas

**Análisis y reportes**
- Análisis ABC, Top 10, Reorden, Auditoría, Cierres

**Operación administrativa**
- Conteo cíclico, Configuración, Usuarios

### PROHIBIDO inventar módulos

Lista negra documentada de errores recurrentes:

- "Sedes y bodegas" — no es módulo, es atributo.
- "Conteos" en `/ops` — es admin, no operaciones.
- "Ayuda" — no es módulo de la app.
- "Ensambles BOM" — el nombre canónico es solo "Ensambles".
- "Picking" como módulo independiente — es sub-flujo de Traspasos.
- "Traslados" — el nombre canónico es "Traspasos".
- "Préstamo herramientas" — el nombre canónico es "Herramientas".

---

## 7. Reglas de tono y escritura (no negociables)

- **Voz humana y profesional, no robótica.** Frases cortas, directas.
- **NO em dashes** (—). Usar dos guiones (`--`), dos puntos (`:`) o punto seguido.
- **NO flechas en texto** (→ ← ↑ ↓). Usar palabras. Excepción: flecha entre sedes en Traspasos (semántica de movimiento físico) y arrow-left-circle / arrow-right en navegación de wizard.
- **NO patrones de IA**: nada de "Permíteme ayudarte", "Como asistente sugiero", "Excelente pregunta", "Ten en cuenta que es importante recordar".
- **NO superlativos de marketing**: nada de "increíble", "asombroso", "maravilloso".
- **NO eufemismos en acciones destructivas**: usar "Eliminar" o "Anular", no "Limpiar" ni "Resetear".
- **Montos COP**: separador de miles con punto, sin centavos, en mono: `$ 1.840.000`.
- **Fechas cortas**: `19 abr 2026` (mes minúscula, sin coma).
- **Fechas con hora**: `19 abr 2026 · 14:23` (separador medio punto).
- **Hoy/ayer en palabras**: `Hoy 14:23`, `Ayer 09:30`.
- **IDs siempre en mono**: Cot-1042, V-2847, Rec-1284, OT-2845, OC-1842, TR-1140, DEV-C-0421, GAR-V-0042, HRM-2410-S.

---

## 8. Reglas de implementación clave

### Cero JavaScript poblador de contenido visible

Todo ítem, fila, card que el usuario debe ver al cargar la página está **hardcoded en el JSX**, no generado por scripts que llenen contenedores vacíos en runtime. Excepción legítima: datos de API o queries que vienen del backend. Pero el shell, los módulos placeholder, las pantallas con mocks, todo va en el JSX directamente.

Este principio se aprendió a costa de 2 iteraciones rotas en el workflow de diseño. No lo repitas.

### Responsive sin cortar contenido

Los contenedores principales no usan `overflow: hidden`. Si una tabla excede el ancho disponible, se usa `overflow-x: auto` y el usuario puede scrollearla. En mobile, las tablas se transforman en cards apiladas, no se truncan columnas.

### Cmd+K como buscador global

Disponible en ambas shells. Modal centrado 600px desktop, full-screen mobile. 3 grupos por defecto: acciones recientes, navegación, acciones rápidas.

### QR scanner global

Cualquier módulo puede invocarlo. Hook `useQRScanner()` que devuelve `{ scan, isOpen }`. Modal con preview de cámara simulado (rectángulo n-950 con marco punteado p-500 animado).

### Modales destructivos

Componente `DestructiveDialog` con icono dang/warn, motivo obligatorio textarea, sugerencias rápidas como chips clickeables, botones "No [acción]" + "[Acción]" danger.

---

## 9. Coherencia del ciclo comercial canónico

Los datos que aparecen en `seed.json` bajo `ciclo_comercial_canonico` son la prueba de integridad operativa del sistema. La cadena:

```
Cot-1042 (Industrial XYZ · $1.840.000 · Aprobada)
   → V-2847 (misma cliente, mismos productos)
       → Rec-1284 (vinculado a V-2847 + OT-2845)
       → OT-2845 (Compresor Atlas Copco GA-22 · saldo $1.340.000)
```

Cuando construyas un módulo que muestre cualquiera de estos documentos, los datos deben coincidir exactamente con el seed. Misma cliente, mismo NIT, mismos productos, mismos montos. La coherencia bidireccional entre módulos es lo que demuestra que el sistema es operativo y no decorativo.

---

## 10. Tarea inmediata

Como primer paso, generá la base del proyecto:

1. **Inicializá el proyecto Next.js 14 con TypeScript estricto y Tailwind v3.**
2. **Instalá las dependencias**: shadcn/ui (con los componentes Button, Card, Dialog, Tabs, Sheet, DropdownMenu, Toast, Badge, Avatar, Tooltip, Skeleton, Select, Input, Textarea, Switch, Checkbox, RadioGroup), lucide-react, react-hook-form, zod, @tanstack/react-query, next-themes, class-variance-authority, clsx, tailwind-merge.
3. **Aplicá los tokens canónicos**:
   - Copia el contenido de `docs/design-system/tokens.css` a `app/globals.css` (o impórtalo).
   - Copia el contenido de `docs/design-system/tailwind.config.ts` a tu `tailwind.config.ts`.
   - Configurá las fuentes IBM Plex Sans + Mono vía `next/font/google`.
4. **Construí el shell `/ops`** en `app/(ops)/layout.tsx`:
   - Sidebar canónica con las 5 secciones y 12 módulos exactos (referencia visual: `references/Foundation Shell · 8 vistas (single file).html`).
   - Header con buscador global Cmd+K, indicador de sede activa (chip "WH-01 Cali" con dot succ), notificaciones, theme toggle, avatar de usuario.
   - Botón "Panel Admin" en header SOLO si `currentUser.rol === 'Admin'`.
   - Bottom nav móvil de 5 entradas para rol Vendedor (Inicio, Inventario, FAB "Vender", Servicio, Más).
5. **Construí el shell `/admin`** en `app/(admin)/layout.tsx`:
   - Sidebar oscura con filete royal a la derecha + header "PANEL ADMINISTRATIVO" con dot pulsante info.
   - 10 módulos en 3 secciones, active state en info-500.
   - Botón "Volver a Operaciones" en header.
6. **Light/dark mode funcional** con next-themes, persistencia automática vía localStorage, sin flash en primer paint.
7. **Páginas placeholder** para los 22 módulos con un componente `<ModulePlaceholder name="..." referenceFile="..." />` que muestre:
   - Título del módulo.
   - Sub-texto: "Este módulo se construye en su fase correspondiente. Ver referencia visual en `references/[archivo].html`."
   - Botón con `href` al archivo de referencia.
8. **Constantes globales en `lib/constants.ts`**:
   - `MÓDULOS_OPS` (array con id, label, icon, href, counter).
   - `MÓDULOS_ADMIN` (array similar).
   - `SEDES` (array con id, nombre, color).
   - `CATEGORÍAS` (array con id, nombre, color hex, classes Tailwind).
   - `ROLES` (array con id, label, color).
9. **`lib/mock-data.ts`** que exporta los datos del `docs/seed.json` con tipos TypeScript.
10. **Redirige `/`** a `/ops/inventario`.

**NO construyas todavía la lógica de ningún módulo individual.** Solo la base (chrome + placeholders). Eso vendrá en mensajes siguientes, módulo por módulo, usando el HTML canónico correspondiente como referencia.

Cuando termines, devolveme:

- Un resumen de qué hiciste.
- Capturas conceptuales o un `tree` de los archivos creados.
- Si algo del prompt no quedó claro, preguntá antes de improvisar.

Después de validar la base, voy a darte el siguiente mensaje pidiéndote el primer módulo individual (probablemente Inventario, siguiendo el orden de `docs/prompts/ORDEN_DE_IMPLEMENTACION.md`).
