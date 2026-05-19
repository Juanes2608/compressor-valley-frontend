# PLANTILLA · Prompt por módulo en Claude Code

> Usá esta plantilla cada vez que le pidas a Claude Code construir un módulo nuevo, después de que la foundation (chrome + placeholders) ya esté lista.

---

## Estructura del prompt

```
Vamos a construir el módulo **[NOMBRE DEL MÓDULO]** dentro de la shell **[/ops o /admin]**.

## Referencia visual canónica

Leé el archivo `references/[NOMBRE EXACTO DEL HTML].html` antes de empezar. Es la fuente de verdad visual de este módulo. Tiene [N] vistas en un solo archivo (desktop light, tablet, mobile, dark, estados especiales). Replicá fielmente lo que veas ahí.

Si hay varias pantallas en el módulo (lista + detalle + wizard), también leé:
- `references/[OTRO ARCHIVO].html`
- `references/[OTRO ARCHIVO].html`

## Lo que tenés que construir

- **Ruta principal**: `app/(ops)/[modulo]/page.tsx` (o `app/(admin)/[modulo]/page.tsx`).
- **Rutas adicionales si aplican**: `app/(ops)/[modulo]/nueva/page.tsx`, `app/(ops)/[modulo]/[id]/page.tsx`.
- **Componentes del módulo**: en `components/modules/[modulo]/` (lista, detalle, wizard, modales, etc.).
- **Datos**: usá los mocks de `lib/mock-data.ts` que vienen de `docs/seed.json`. No inventes datos nuevos, respetá el ciclo comercial canónico (Cot-1042 → V-2847 → Rec-1284 → OT-2845 con Industrial XYZ).

## Spec funcional del módulo

[Pegá acá la sección correspondiente del módulo desde `docs/SPEC_FUNCIONAL_CHV.md`]

## Datos a usar (mocks coherentes)

- [N] filas de ejemplo basadas en el seed.
- Si el módulo se conecta con otros (ej. Cotizaciones se vincula a OT-2845), las pills clickeables deben llevar a esas rutas.
- Cliente protagonista para mostrar coherencia: **Industrial XYZ S.A.S.** con sus datos canónicos.

## Validación que voy a hacer

Cuando termines, voy a verificar:

1. La sidebar canónica está respetada (no inventaste módulos).
2. Los datos coinciden con el seed canónico (Industrial XYZ con NIT correcto, los 4 productos del ciclo, etc.).
3. El módulo activo en la sidebar es **[NOMBRE]**.
4. Light/dark mode funcional sin flash al primer paint.
5. Mobile responsive (cards apiladas, no tablas con scroll horizontal forzado).
6. Pills clickeables `Cot-XXXX`, `V-XXXX`, `OT-XXXX`, `Rec-XXXX`, `OC-XXXX` navegan a sus rutas (aunque el destino sea placeholder por ahora).
7. Los estados (Aprobada, En proceso, Vencida, etc.) usan las pills semánticas correctas con sus colores canónicos.
8. Las acciones destructivas (anular, eliminar) abren `DestructiveDialog` con motivo obligatorio.
9. La tipografía: IBM Plex Sans para texto, IBM Plex Mono para IDs, montos, fechas cortas.
10. Sin patrones de IA en los textos, sin em dashes, sin flechas decorativas en CTAs.

Cuando termines, devolveme:
- Un resumen de qué archivos creaste/modificaste.
- Si encontraste alguna ambigüedad o caso no cubierto en la referencia, preguntá antes de improvisar.
- Un tree de los archivos del módulo.

Si Claude Code rompe coherencia con archivos previos, le recordás los archivos canónicos en `docs/REGLAS_UI_CHV.md` y `docs/seed.json`. La consistencia se mantiene mejor por replicación directa que por reinterpretación.
```

---

## Ejemplo concreto · Módulo Inventario

```
Vamos a construir el módulo **Inventario** dentro de la shell **/ops**.

## Referencia visual canónica

Leé el archivo `references/Inventario v2 · 7 vistas (single file).html` antes de empezar. Es la fuente de verdad visual. Tiene 7 vistas (desktop light, tablet light, mobile light, desktop dark + 3 estados especiales).

## Lo que tenés que construir

- **Ruta principal**: `app/(ops)/inventario/page.tsx`.
- **Componentes del módulo** en `components/modules/inventario/`:
  - `InventarioTable.tsx` (tabla densa con stock por sede).
  - `StockBadge.tsx` (pill de semáforo por sede).
  - `ProductoDetailPanel.tsx` (panel lateral con detalle del producto seleccionado).
  - `InventarioFilters.tsx` (filtros: categoría, sede, estado de stock).
- **Datos**: mocks de `lib/mock-data.ts`, mínimo 12 productos coherentes con `seed.json` (incluyendo los 4 productos canónicos del ciclo comercial).

## Spec funcional

[ ... pegar sección Inventario de SPEC_FUNCIONAL_CHV.md ... ]

## Datos a usar

- 12+ productos mock, incluidos CMP-2210-A, CMP-2308-B, CMP-1985-C, LBS-0421-X del ciclo canónico.
- 4 sedes con stock por cada producto.
- Aplicar regla de semáforo:
  - Verde succ si stock > stock_minimo + 5
  - Ámbar warn si stock <= stock_minimo + 5
  - Rojo dang si stock <= stock_minimo o agotado
  - Gris neutral si sede no tiene el SKU

## Validación

Voy a verificar los 10 puntos de la plantilla + estos específicos del módulo:

- SKU como primera columna en mono peso 500.
- Stock por sede como 4 pills con tooltips al hover.
- Click en fila abre ProductoDetailPanel.
- Búsqueda con debounce 300 ms.
- Botón QR scanner en header.
- Filtros aplicados se ven como pills activos.

Cuando termines, devolveme el resumen + tree.
```

---

## Consejos operativos al usar la plantilla

### Cuándo pegar TODO el spec del módulo

Si el módulo es grande (Cotizaciones, OT, Inventario), pegá la sección completa del spec en el prompt. Claude Code necesita el contexto operativo, no solo el visual.

### Cuándo NO pegar todo

Si el módulo es chico (Configuración, Usuarios), un resumen de 5-6 líneas y el link al archivo HTML canónico es suficiente.

### Cuando Claude Code improvise

Mensajes cortos de corrección, citando archivo y línea cuando aplique:

> "El componente `InventarioTable` está usando `bg-gray-50`. Cambialo por `bg-n-50` (token canónico). Consultá `docs/design-system/tokens.css` para los nombres exactos."

> "Inventaste un módulo 'Sedes' en la sidebar. La lista canónica de 12 módulos está en `docs/REGLAS_UI_CHV.md` sección 1.3. Eliminá esa entrada."

### Cuando dudes vos sobre un detalle

Antes de pedirle a Claude Code, leé el HTML canónico correspondiente y buscá el patrón. Si el HTML lo resuelve de cierta forma, esa es la verdad. Si no está claro, preguntale a tu Claude de consulta (el que está fuera del repo) cómo resolver.

---

## Atajos de copiar y pegar

Para que Claude Code recuerde el contexto rápido en cada mensaje, podés agregar estas líneas al inicio:

```
Recordatorio rápido:
- Sistema de diseño en docs/design-system/ (tokens.css + tailwind.config.ts).
- Spec funcional en docs/SPEC_FUNCIONAL_CHV.md.
- Reglas de UI en docs/REGLAS_UI_CHV.md.
- Datos canónicos en docs/seed.json (ciclo Cot-1042 → V-2847 → Rec-1284 → OT-2845).
- Referencias visuales canónicas en references/*.html.
- Sidebar /ops: 5 secciones, 12 módulos exactos. /admin: 3 secciones, 10 módulos exactos.
- Tipografía: IBM Plex Sans + Mono. Cero emojis. Cero em dashes. Cero flechas decorativas.
```

Esto es opcional, pero útil cuando notes que Claude Code se está desviando.
