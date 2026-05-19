# REGLAS DE UI · Compresores del Valle S.A.S.

> Reglas operativas no negociables para mantener coherencia en toda la aplicación. Estas reglas se aprendieron a lo largo del workflow de diseño y aplican a cualquier nueva pantalla, componente o ajuste que construya Claude Code.

---

## 1. Requisitos universales (aplican a todo)

### 1.1 Tipografía canónica

- **IBM Plex Sans** para todo texto de UI (labels, body, headings, sub-titles).
- **IBM Plex Mono** para: SKUs, números de documento (Cot-XXXX, V-XXXX, OT-XXXX, GAR-X-XXXX, HRM-XXXX), montos monetarios, fechas en formato corto, códigos, IDs de cualquier tipo.
- **Nunca** usar Geist, Inter, Roboto u otras fuentes alternativas. Si encuentras código que las usa, reemplazá.

### 1.2 Tokens canónicos por nombre exacto

- Usar las CSS variables del sistema (`--p-600`, `--n-950`, `--space-3`, etc.) o las clases Tailwind correspondientes (`bg-p-600`, `text-n-950`, `p-space-3`).
- **NUNCA** inventar valores crudos como `padding: 13px` o `color: #2A3CE5`. Si necesitás un valor que no existe en el sistema, primero consultá si hay un token cercano. Si no, propónlo antes de improvisar.

### 1.3 Sidebar canónica idéntica

La sidebar del shell `/ops` tiene **exactamente** 5 secciones con 12 módulos en este orden:

1. **Catálogo y stock** (Inventario, Productos)
2. **Operación comercial** (Ventas, Cotizaciones, Recibos, Devoluciones)
3. **Bodega y movimiento** (Compras, Traspasos, Garantías)
4. **Taller** (Órdenes de Trabajo, Ensambles)
5. **Soporte** (Herramientas)

**PROHIBIDO** inventar módulos. Lista negra documentada de errores recurrentes que se cometieron en iteraciones previas:

- ❌ "Sedes y bodegas" — no es módulo, es atributo de productos.
- ❌ "Conteos" en `/ops` — Conteo cíclico es módulo de `/admin`, no de operaciones.
- ❌ "Ayuda" — no es módulo de la app.
- ❌ "Ensambles BOM" — el nombre canónico es solo "Ensambles".
- ❌ "Picking" como módulo independiente — Picking es sub-flujo dentro de Traspasos y dentro de Conteo cíclico.
- ❌ "Traslados" — el nombre canónico es "Traspasos".
- ❌ "Préstamo herramientas" — el nombre canónico es "Herramientas".

La sidebar del shell `/admin` tiene 10 módulos en 3 secciones (Visión general, Análisis y reportes, Operación administrativa). Tratamiento visual distintivo: misma `bg n-975` que /ops + filete royal 1 px en borde derecho + header "PANEL ADMINISTRATIVO" con dot pulsante info + active state usa `info-500` en lugar de `p-500`.

### 1.4 Contadores en sidebar

Los contadores en la sidebar son canónicos y se mantienen entre pantallas:

- Inventario: `2.847` (no `1.284`, no inventar otros números)
- Cotizaciones: `5`
- Traspasos: `3`
- Órdenes de Trabajo: `14`
- Herramientas: `2`

Si algún módulo no tiene contador en la canónica, no inventarlo.

### 1.5 Iconografía

- **Lucide React** como única librería de iconos.
- **Nunca** emojis en la UI. El logo CHV, las marcas de estado, las acciones, todo con lucide.
- Iconos estándar por módulo:
  - Inventario: `package`
  - Productos: `tag`
  - Ventas: `shopping-cart`
  - Cotizaciones: `file-text`
  - Recibos: `receipt`
  - Devoluciones: `undo`
  - Compras: `shopping-bag`
  - Traspasos: `truck`
  - Garantías: `shield`
  - Órdenes de Trabajo: `wrench`
  - Ensambles: `puzzle`
  - Herramientas: `hammer`
  - Dashboard: `layout-dashboard`
  - Alertas: `bell`
  - Análisis ABC: `pie-chart`
  - Top 10: `trending-up`
  - Reorden: `refresh-cw`
  - Auditoría: `scroll-text`
  - Cierres: `check-circle`
  - Conteo cíclico: `clipboard-list`
  - Configuración: `settings`
  - Usuarios: `users`

---

## 2. Reglas de tono y escritura

### 2.1 Voz de la aplicación

- **Humana y profesional**, no robótica.
- Frases cortas, directas, en español neutro. El target son operarios y administradores colombianos, no consumidores generales.
- Tono respetuoso del tiempo del usuario: explicá solo lo que necesita saber, no decorés con palabras innecesarias.

### 2.2 Lista de NO hacer al escribir textos

- ❌ **NO usar em dashes** (—). Usar dos guiones (`--`) o dos puntos (`:`) o punto seguido.
- ❌ **NO usar flechas en texto** (→ ← ↑ ↓). Reemplazar con palabras como "después", "siguiente", "abre".
- ❌ **NO usar patrones de IA**: frases como "Permíteme ayudarte con eso", "Como asistente, te sugiero...", "Excelente pregunta", "Ten en cuenta que es importante recordar...".
- ❌ **NO sobreusar superlativos**: "increíble", "asombroso", "maravilloso". Esto es software empresarial, no marketing.
- ❌ **NO disfrazar acciones destructivas con eufemismos**: si una acción borra datos, decir "Eliminar" o "Anular", no "Limpiar" o "Resetear".

### 2.3 Patrones de texto que SÍ usamos

- Para alertas: "Stock crítico en WH-01" (corto, contextual).
- Para tooltips: una línea, máximo dos.
- Para mensajes de empty state: "No hay [cosa] en este filtro" + sub "Cambia el filtro o crea una nueva [cosa]" + botones de acción.
- Para mensajes de éxito: "Cotización Cot-1043 creada" (sustantivo + acción + ID, en mono).
- Para confirmaciones destructivas: "Esta acción no se puede deshacer" + explicar consecuencia concreta + campo de motivo obligatorio.

### 2.4 Formato de números, fechas y referencias

- **Montos COP**: con separador de miles con punto, sin centavos: `$ 1.840.000`. Siempre en `font-mono`.
- **Fechas cortas**: `19 abr 2026` (sin coma, mes abreviado en minúscula).
- **Fechas con hora**: `19 abr 2026 · 14:23` (separador medio punto).
- **Hoy / ayer**: usar palabras: `Hoy 14:23`, `Ayer 09:30`.
- **IDs de documento**: siempre en `font-mono`, formato `Cot-1042`, `V-2847`, `Rec-1284`, `OT-2845`, `OC-1842`, `TR-1140`, `DEV-C-0421`, `DEV-P-0118`, `GAR-V-0042`, `GAR-C-0018`, `HRM-2410-S`.

---

## 3. Reglas de UI específicas

### 3.1 CTAs (Call To Action)

- **Sin flechas decorativas dentro de CTAs**. Solo se permite el icono `arrow-left-circle` cuando es navegación direccional explícita (botón "Volver"), o `arrow-right` cuando es avance de paso en wizard ("Continuar al paso 3").
- Botón primario: fondo `--p-600` royal, texto blanco, altura 36 px (40 px en mobile touch).
- Botón secondary: outline `--n-150`, texto `--n-700`.
- Botón ghost: sin border, texto `--n-700`, hover bg `--n-50`.
- Botón danger: ghost con texto `--dang-700`, hover bg `--dang-50`. Reservado solo para acciones destructivas.
- En dark, el botón primario usa `--p-500` (no `--p-600`).

### 3.2 Tablas densas

- Densidad comfortable por default: altura de fila 48 px en desktop, 56 px si la fila tiene mucha info jerárquica.
- Header de tabla con bg `--n-50`, texto en mono 10-11 px, caps, letterspacing `.08em`, color `--n-500`.
- Border-bottom entre filas: 1 px `--n-100`.
- Hover de fila: bg `--n-50`.
- Fila seleccionada: bg `--p-50` + shadow inset 2 px `--p-600` en el borde izquierdo.
- Click en fila abre el detalle (panel lateral o página completa según el módulo).

### 3.3 Pills semánticas

- 5 colores semánticos: success, warn, danger, info, progress, neutral.
- Cada pill tiene un dot de 6 px del color sólido.
- Altura 24 px, padding 0 10 px, radio 999 (rounded-full).
- En dark, las pills usan variantes con alpha sobre el fondo oscuro (clases automáticas en tokens.css).

### 3.4 Categorías de producto

- 5 categorías con su color identificador: cat-cmp (Indigo Steel), cat-rpt (teal), cat-hrm (púrpura), cat-lbr (ámbar dorado), cat-acc (rosa).
- Pills de categoría con altura 28 px (un poco más grande que pills semánticas porque son labels permanentes).
- Color sólido pequeño (10×10 px) a la izquierda como swatch, texto en color del paso 700 oscuro.

### 3.5 SKUs como ancla tipográfica

- Los SKUs deben ser lo PRIMERO que se lee de cada fila en listas de productos. En mono peso 500, color `--n-700`.
- En pantalla de inventario sin fotos, el SKU es la identificación principal junto con la categoría.

### 3.6 Stock por sede como pills de semáforo

- 4 pills minúsculos (uno por sede), gap space-1.
- Color de cada pill según semáforo del stock en esa sede:
  - Verde succ-50/700: stock saludable.
  - Ámbar warn-50/700: stock bajo (≤ stock_minimo + 5).
  - Rojo dang-50/700: agotado (0 o ≤ stock_minimo).
  - Gris n-100/n-500: sede no tiene el SKU (mostrar "—").
- Tooltip al hover muestra nombre completo de la sede.

### 3.7 Mobile patterns

- BottomNav de 5 entradas en `/ops` para roles operativos (Vendedor, Bodeguero, Técnico). El FAB central es la acción primaria del rol (Vender para Vendedor, Recibir para Bodeguero, Iniciar OT para Técnico).
- En `/admin` mobile, sin BottomNav. Drawer lateral con menú hamburguesa porque el uso primario es desktop.
- Tablas en mobile se convierten en cards apiladas full-width, NO se truncan columnas.
- Acordeones colapsables para pantallas con mucha información (OT detalle, Cotización detalle).
- FABs primarios circulares 56 px en bottom right cuando la acción "crear nuevo" es la más común.

### 3.8 Dark mode

- Activado por la clase `.dark` en `<html>` (next-themes).
- Estrategia de inversión de tokens neutros: `--n-0` en dark = `#0F1626` oscuro, `--n-950` en dark = `#F2F4FB` claro. Esto permite reutilizar reglas CSS sin duplicar.
- Pills con alpha sobre fondo oscuro.
- Focus rings en `--p-200` (más claro que el `--p-300` de light).
- El CTA royal pasa de `--p-600` a `--p-500` (más claro para destacar sobre fondo oscuro).
- QR codes **siempre fondo blanco hardcoded `#fff`** (no `var(--n-0)` que cambia en dark). La escaneabilidad es crítica.

---

## 4. HTML / Implementación

### 4.1 Cero JavaScript poblador de contenido visible

- Todos los items, filas, cards que el usuario debe ver al cargar la página están **hardcoded** en el JSX/TSX, no generados por scripts en runtime que llenen contenedores vacíos.
- Excepción legítima: contenido genuinamente dinámico (resultados de búsqueda, datos de API, queries de Supabase). Pero el contenido inicial de cada pantalla debe estar en el markup desde el primer render.
- Este error sucedió 2 veces en el workflow de diseño (OT detalle con checklist via script). Aplicar el aprendizaje: si alguien debe ver 24 ítems de checklist al abrir la página, los 24 ítems están escritos en el componente, no se generan con un `map` sobre un array vacío que se llena después.

### 4.2 Responsive sin cortar contenido

- Las pantallas deben funcionar en 1280 px desktop, 900 px tablet, 390 px mobile.
- **NO usar `overflow: hidden`** en contenedores principales si pueden tener contenido que excede el ancho. Usar `overflow-x: auto` para permitir scroll horizontal cuando el contenido lo requiera.
- Las columnas de tabla en desktop pueden ser amplias. En tablet se reducen padding-X. En mobile la tabla se transforma en cards.

### 4.3 Cmd+K como buscador global

- Disponible en ambas shells.
- Modal centrado 600 px desktop, full-screen mobile.
- 3 grupos por defecto:
  - Acciones recientes (3 items)
  - Navegación (5 items, lleva a módulos)
  - Acciones rápidas (3 items, ej. "Crear cotización", "Generar QR", "Iniciar conteo")

### 4.4 QR scanner global

- Cualquier módulo lo puede invocar.
- Modal centrado con preview de cámara (rectángulo n-950 con marco punteado en p-500 animado).
- Label "Apunta al QR del producto".
- Botón "Cancelar" + opción "Ingresar SKU manualmente".

### 4.5 Modales destructivos

- Ancho 480-520 px.
- Icono grande (x-circle 32 px en dang, o alert-triangle warn) arriba.
- Título sans 16 px peso 500.
- Mensaje explicativo con consecuencia concreta de la acción.
- Campo obligatorio "Motivo" como textarea con sugerencias rápidas (chips clickeables).
- Botones al pie: "No [acción]" (secondary) + "[Acción]" (danger).

### 4.6 Toast notifications

- Posición: top-right en desktop, bottom-center mobile.
- 4 tipos: success, warn, danger, info (sin progress).
- Auto-dismiss en 5 segundos.
- Acción opcional inline ("Deshacer", "Ver detalle").

---

## 5. Coherencia operativa entre módulos

### 5.1 Vinculaciones bidireccionales

Cuando un documento se conecta con otro, el link es bidireccional y clickeable. Ejemplos:

- En Cotización: pill clickeable `OT-2845` si está vinculada a una OT.
- En OT detalle: sección "Cotizaciones asociadas" con pill clickeable a la cotización.
- En Venta: bloque "Vinculaciones" con pills a Cotización origen, Recibo emitido, OT relacionada.
- En Recibo: muestra Cotización origen + Venta + OT (si aplica).

Click en el pill navega al detalle del documento vinculado. Esta coherencia se mantiene en todos los módulos que tengan relaciones.

### 5.2 Ciclo comercial canónico

La cadena Cot-1042 → V-2847 → Rec-1284 → OT-2845 con cliente Industrial XYZ S.A.S. debe respetarse en cualquier mock o seed. Esta cadena es la prueba de integridad operativa del sistema. Está definida en detalle en `seed.json` y `SPEC_FUNCIONAL_CHV.md`.

### 5.3 Datos coherentes entre módulos

Si Cot-1042 tiene 4 productos por un total de $1.840.000, esos mismos 4 productos aparecen en V-2847 y en el Rec-1284. Si Industrial XYZ tiene NIT `800.123.456-7`, ese NIT está en todos los documentos donde aparece el cliente. Si Diego P. es el técnico asignado a OT-2845, no cambia a otro nombre en otra pantalla.

---

## 6. Lista de "no implementar todavía"

Algunas características de la spec están explícitamente aplazadas:

- **Ensambles**: módulo completo aplazado a post-v1.0. Mostrar placeholder.
- **Picking como módulo independiente**: no existe. El picking es flujo dentro de Traspasos (recepción en destino) y dentro de Conteo cíclico.
- **Cliente como entidad**: NO hay módulo de clientes. Los datos del cliente se capturan como texto libre en cada Cotización, Venta y OT. Esto fue decisión explícita del cliente.

---

## 7. Cuando algo no esté en estas reglas

Si encontrás un caso que estas reglas no cubren explícitamente, seguí este orden de decisión:

1. **Consultar el HTML canónico** del workflow Claude Design en `references/` para esa pantalla, si existe.
2. **Buscar un patrón similar** ya resuelto en otra pantalla canónica.
3. **Aplicar el principio operativo**: lo que es más útil para el operario que trabaja bajo presión gana sobre lo que es más bonito decorativo.
4. **Si hay duda razonable**, preguntá antes de improvisar. El proyecto ya tiene 18 pantallas archivadas. La consistencia es más valiosa que la creatividad ad-hoc.
