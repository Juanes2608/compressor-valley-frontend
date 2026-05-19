# ORDEN DE IMPLEMENTACIÓN · Compresores del Valle S.A.S.

> Orden recomendado para construir los módulos en Claude Code después de tener la foundation lista. No es arbitrario, respeta dependencias entre módulos y prioriza construir los flujos más críticos primero.

---

## Principio general

Construimos primero los módulos que son **referenciados** por otros (Inventario, Productos), después los **flujos comerciales principales** (Cotizaciones, Ventas, OT) que se conectan entre sí, después los **flujos de soporte** (Recibos, Devoluciones, Garantías), después los **flujos de bodega** (Compras, Traspasos, Herramientas), y al final el **panel admin** y los **patrones globales**.

---

## Fase A · Cimientos (módulos referenciados)

### Módulo 1 · Inventario

**Por qué primero:** todos los demás módulos referencian productos. Cotizaciones busca productos, Ventas los consume, Compras los recibe, OT los descuenta. Sin Inventario funcional, ningún otro módulo tiene contra qué probar.

- **Referencia visual:** `references/Inventario v2 · 7 vistas (single file).html`
- **Dependencias:** ninguna previa.
- **Lo que entrega:** lista con filtros, panel de detalle de producto, stock por sede.

### Módulo 2 · Productos (Detalle de producto)

**Por qué después de Inventario:** es el panel lateral / página de detalle que abre desde Inventario. Comparte componentes.

- **Referencia visual:** parte del archivo de Inventario v2 (panel lateral de detalle).
- **Dependencias:** Inventario.
- **Lo que entrega:** vista completa de un producto con histórico, stock por sede, datos de proveedor.

---

## Fase B · Ciclo comercial (orden de dependencia)

### Módulo 3 · Cotizaciones (lista + wizard + detalle)

**Por qué primero del ciclo:** las cotizaciones son el punto de entrada del flujo comercial. Las ventas se convierten desde cotizaciones, las OT se vinculan a cotizaciones.

- **Referencias visuales:**
  - `references/Cotizaciones Lista · 6 vistas (single file).html`
  - `references/Cotización Nueva · Wizard 7 vistas (single file).html`
  - `references/Cotización Detalle Cot-1042 · 6 vistas (single file).html`
- **Dependencias:** Inventario (buscar productos), seed.json (Cot-1042 canónica).
- **Lo que entrega:** módulo completo con 3 sub-pantallas + wizard 4 pasos + PDF preview.

### Módulo 4 · Órdenes de Trabajo (lista + detalle)

**Por qué acá:** las OT se vinculan a cotizaciones. Necesitan el módulo Cotizaciones funcional para que las pills clickeables naveguen.

- **Referencias visuales:**
  - `references/Ordenes de Trabajo · 7 vistas (single file).html`
  - `references/OT Detalle · 6 vistas (single file).html`
- **Dependencias:** Cotizaciones (vinculación), Inventario (productos del checklist).
- **Lo que entrega:** lista + detalle con 3 paneles operativos (Autorización, Abonos, Checklist 24 ítems).

### Módulo 5 · Ventas (lista + wizard + detalle)

**Por qué acá:** Ventas se convierten desde Cotizaciones aprobadas y se vinculan a OT. Necesita ambos módulos previos.

- **Referencia visual:** `references/Ventas · Módulo completo (single file).html`
- **Dependencias:** Cotizaciones, OT, Inventario.
- **Lo que entrega:** lista + wizard 3 pasos + detalle.

### Módulo 6 · Recibos F14 (lista + nuevo + detalle)

**Por qué acá:** los Recibos cierran el ciclo comercial. Se generan desde Ventas o Cotizaciones, se vinculan a OT.

- **Referencia visual:** `references/Recibos · Módulo F14 (single file).html`
- **Dependencias:** Cotizaciones, Ventas, OT.
- **Lo que entrega:** lista con filtros, wizard de creación desde cotización + manual, detalle con preview PDF.

---

## Fase C · Flujos de soporte post-venta

### Módulo 7 · Devoluciones (tabs duales)

**Referencia visual:** `references/Devoluciones · Módulo completo (single file).html`

**Dependencias:** Ventas (origen tab cliente), Compras (origen tab proveedor), Inventario.

### Módulo 8 · Garantías F13 (tabs duales)

**Referencia visual:** `references/7.1 Garantias F13.html`

**Dependencias:** Ventas (tab ventas), Compras (tab compras), Productos.

Similar estructuralmente a Devoluciones pero con state machine de garantías y cálculo de días restantes con color semántico.

---

## Fase D · Flujos de bodega

### Módulo 9 · Compras (lista + wizard + recepción + detalle)

**Por qué acá:** Compras agrega stock al inventario. La pantalla de Recepción es crítica.

- **Referencia visual:** `references/Compras · Módulo completo (single file).html`
- **Dependencias:** Inventario, Proveedores (parte del seed).
- **Lo que entrega:** lista + wizard 3 pasos + pantalla de recepción con 5 estados.

### Módulo 10 · Traspasos (Workflow Board + detalle con Picking)

**Referencia visual:** `references/Traspasos · Módulo completo (single file).html`

**Dependencias:** Inventario, Picking (referencia visual `references/Picking · 6 vistas (single file).html`).

### Módulo 11 · Herramientas (3 tabs + detalle + modal préstamo)

**Referencia visual:** `references/7.2 Herramientas.html`

**Dependencias:** Usuarios (los 6 canónicos para asignar préstamos).

---

## Fase E · Panel administrativo

### Módulo 12 · Dashboard / Cockpit

**Por qué primero del admin:** es la landing del shell /admin, da el contexto visual de todo el panel.

- **Referencia visual:** `references/Cockpit v2 · 7 vistas (single file).html`
- **Dependencias:** todos los módulos operativos (los KPIs leen de ellos), pero puede empezar con mocks.

### Módulo 13 · Configuración + Usuarios

**Referencia visual:** `references/9 Configuracion y Usuarios.html`

**Dependencias:** ninguna lógica, solo seed.json para usuarios y cuentas bancarias.

### Módulos 14-19 · Reportes admin (Fase 10)

Los 6 reportes admin pendientes de producir como referencia visual. Una vez producidos por Claude Design, se implementan en este orden:

- **Auditoría** (referencia: log de movimientos).
- **Alertas** (referencia: módulo propio con tabs por tipo).
- **Reorden** (referencia: sugerencias agrupadas por proveedor).
- **Análisis ABC** (referencia: clasificación productos).
- **Top 10** (referencia: ranking).
- **Cierres F15** (referencia: cierre diario/mensual).

Sin referencia visual disponible todavía. Cuando termines de construir los módulos previos, vuelve al workflow de Claude Design para producir las referencias antes de implementar.

### Módulo 20 · Conteo cíclico (Task Mode)

**Por qué casi al final:** Task Mode similar a Picking. Su construcción depende de tener Picking y los módulos de Bodega ya funcionales.

**Referencia visual:** PENDIENTE de producir (Fase 11).

---

## Fase F · Cierre del proyecto

### Módulo 21 · Patrones globales

Componentes reutilizables que se usan a lo largo de toda la app: loading, empty, error, restricted, toast, modal destructivo, Cmd+K, QR scanner.

Algunos de estos ya se habrán construido en módulos individuales. Esta fase consolida los patrones, les da una página de showcase para QA, y refactoriza los módulos para que todos usen los componentes consolidados.

**Referencia visual:** PENDIENTE de producir (Fase 12).

### Módulo 22 · Ensambles (opcional, post-v1.0)

Aplazado según decisión de spec. Mostrar placeholder por ahora.

---

## Auditoría final

Una vez todos los módulos estén implementados, hacer una pasada completa de auditoría:

1. **Sidebar canónica** idéntica en todas las pantallas (5 secciones /ops, 3 secciones /admin).
2. **Coherencia del ciclo comercial** Cot-1042 → V-2847 → Rec-1284 → OT-2845 con datos exactos en cada módulo donde aparezca.
3. **Vinculaciones bidireccionales** funcionales (click en Cot-1042 desde Ventas lleva a su detalle, y viceversa).
4. **Light/dark mode** funcional en los 22 módulos.
5. **Mobile responsive** sin pérdida de funcionalidad.
6. **Accesibilidad básica**: focus rings, aria-labels, navegación con teclado, Cmd+K, contraste suficiente.
7. **Roles y permisos** funcionando: Vendedor no ve Compras ni Admin, etc.
8. **Anti-lockout** del único Admin activo.

---

## Integración con Supabase (opcional, post-mockups)

Cuando los 22 módulos estén implementados con mocks del `seed.json`, integrá Supabase:

1. Esquema SQL: derivá tablas desde la spec funcional + estructura del seed.
2. Migraciones SQL: una por módulo.
3. RLS (Row Level Security): permisos por rol.
4. Reemplazá imports de `lib/mock-data.ts` por queries TanStack Query + Supabase.
5. Realtime: suscripción a cambios de configuración para propagar a todos los tabs abiertos.

Este paso lo hace Claude Code también, módulo por módulo, después de validar que el frontend con mocks está sólido.

---

## Resumen visual del orden

```
Foundation (base, ya hecha en MASTER_PROMPT)
   ↓
Fase A · Cimientos
   ├─ 1. Inventario
   └─ 2. Productos (detalle)
   ↓
Fase B · Ciclo comercial
   ├─ 3. Cotizaciones
   ├─ 4. Órdenes de Trabajo
   ├─ 5. Ventas
   └─ 6. Recibos F14
   ↓
Fase C · Soporte post-venta
   ├─ 7. Devoluciones
   └─ 8. Garantías F13
   ↓
Fase D · Bodega
   ├─ 9. Compras
   ├─ 10. Traspasos
   └─ 11. Herramientas
   ↓
Fase E · Admin
   ├─ 12. Dashboard
   ├─ 13. Configuración + Usuarios
   ├─ 14-19. Reportes admin (pendientes referencias)
   └─ 20. Conteo cíclico (pendiente referencia)
   ↓
Fase F · Cierre
   ├─ 21. Patrones globales (pendiente referencia)
   ├─ 22. Ensambles (post-v1.0)
   ├─ Auditoría final
   └─ Integración Supabase
```

Tiempo estimado por módulo: 1-3 sesiones de Claude Code según complejidad. Los módulos chicos (Productos, Herramientas) van en 1 sesión. Los grandes (Cotizaciones, OT, Compras) pueden necesitar 2-3 con validación intermedia.
