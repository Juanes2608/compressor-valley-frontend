# SPEC FUNCIONAL · Compresores del Valle S.A.S.

> Spec funcional consolidada de los 22 módulos del proyecto CHV. Para cada módulo se documenta **QUÉ hace**, no cómo se ve. La parte visual está en los archivos HTML canónicos en `references/`.

---

## Arquitectura general

Dos shells separadas con navegación independiente:

- **Shell `/ops` (Operaciones)** — accesible para todos los roles según permisos. 12 módulos.
- **Shell `/admin` (Panel administrativo)** — solo rol Admin. 10 módulos.

**Mecanismo de alternancia:** botón "Panel Admin" en header de `/ops` (si rol=Admin) navega a `/admin`. Botón "Volver a Operaciones" en `/admin` retorna.

**Roles del sistema:**

| Rol | Acceso |
|---|---|
| Admin | Todos los módulos /ops + todos los módulos /admin |
| Vendedor | Inventario, Ventas, Cotizaciones, Recibos, Devoluciones, Garantías (ventas), Herramientas |
| Bodeguero | Inventario, Compras, Traspasos, Devoluciones, Garantías (compras), Herramientas |
| Técnico | Inventario, Órdenes de Trabajo, Ensambles, Herramientas |

---

## Shell `/ops` — 12 módulos operativos

### 1. Inventario (todos los roles)

**Referencia visual:** `references/Inventario v2 · 7 vistas (single file).html`

- Lista de productos con stock por sede (las 4 sedes en pills de semáforo).
- Búsqueda por referencia/nombre/código (debounce 300 ms).
- Filtros: categoría (cat-cmp/rpt/hrm/lbr/acc), estado de stock (OK/bajo/agotado), sede.
- QR scanner flotante para localizar producto por código.
- Click en producto abre ProductoDetalle.
- Vendedor solo ve su sede; Bodeguero ve todas; Admin ve todas con costos.

### 2. Productos (ProductoDetalle)

**Referencia visual:** parte del archivo de Inventario v2 (panel lateral de detalle).

- Datos: referencia, nombre, código interno, código proveedor (F12), categoría, proveedores asociados, último proveedor al que se compró, costo promedio (solo Admin), precio venta.
- Stock por sede en tabla con 4 tarjetas (las 4 sedes) con código de semáforo.
- Histórico de movimientos (compras, ventas, traspasos, ajustes) como timeline.
- Botón "Generar QR" para imprimir etiqueta.
- Bloque "Solo Admin" con stock mínimo, máximo, punto de reorden, clasificación ABC, última fecha de conteo cíclico.

### 3. Ventas (Vendedor, Admin)

**Referencia visual:** `references/Ventas · Módulo completo (single file).html`

- Historial de ventas con filtros por método de pago, fecha, cliente.
- Botón crear nueva abre VentaNueva (wizard 3 pasos: Cliente y productos / Pago / Confirmar).
- Carrito visible siempre con cálculo en vivo de subtotal, IVA, total.
- Búsqueda de productos con QR scanner integrado.
- VentaDetalle: ítems, totales, IVA, recibo asociado (vinculación a Recibo), opción anular.
- Vinculación a Cotización origen si la venta proviene de una.
- Vinculación a OT si aplica.
- Ciclo cerrado documentado: Cotización → Venta → Recibo → OT.

### 4. Cotizaciones (Vendedor, Admin)

**Referencias visuales:**
- Lista: `references/Cotizaciones Lista · 6 vistas (single file).html`
- Wizard nueva: `references/Cotización Nueva · Wizard 7 vistas (single file).html`
- Detalle: `references/Cotización Detalle Cot-1042 · 6 vistas (single file).html`

- Historial con filtro por estado: Borrador, Enviada, Aprobada, Rechazada, Vencida, Convertida.
- Búsqueda con Cmd+K shortcut.
- Crear nueva: wizard 4 pasos:
  1. Cliente (texto libre, NO hay módulo de clientes según decisión del cliente).
  2. Productos (búsqueda con QR, validación inline de stock, costos editables).
  3. Ajustes F11:
     - IVA editable por cotización (default 19%).
     - Validez editable (default 15 días hábiles).
     - Condiciones de pago texto libre.
     - Tiempo de entrega texto libre.
     - Multi-selección de cuentas bancarias para PDF (cada banco con flag con-IVA / sin-IVA).
     - "Cotizado por" auto-rellenado con el usuario activo.
     - Texto fijo de condiciones de entrega siempre presente (no editable).
  4. Revisar y generar.
- Edición post-creación: NO se edita, se re-emite con nueva fecha/versión (v1, v2, v3...).
- Salida: PDF tamaño carta no editable + impresión directa.
- Si está vinculada a una OT: badge clickeable que lleva al detalle de la OT.
- Compartir por WhatsApp con link copiable.
- Detalle muestra historial de versiones si fue re-emitida.

### 5. Compras (Bodeguero, Admin)

**Referencia visual:** `references/Compras · Módulo completo (single file).html`

- Historial con estados: Borrador, Enviada al proveedor, En tránsito, Recibida parcial, Recibida completa, Devolución por garantía (F12).
- Crear nueva: wizard 3 pasos (Proveedor / Productos / Confirmación).
- Si el proveedor no existe, modal para crear nuevo proveedor con razón social, NIT, contacto, condiciones de pago default.
- **Recepción (pantalla crítica)**: el bodeguero verifica físicamente lo recibido contra lo ordenado.
  - Cada ítem con cantidad ordenada, cantidad recibida (stepper editable), estado de recepción (Pendiente / Completo / Parcial / Faltante / Excedente), notas opcionales, botón "Escanear QR para confirmar".
  - Si recibido > ordenado: opciones inline "Aceptar excedente" o "Reportar error" sin asumir mala fe.
  - Footer sticky con contadores + botón "Confirmar recepción completa".
  - Banner de discrepancia si hay ítems con diferencias.
- Productos entran al inventario al confirmar recepción.
- Detalle: timeline detallado de eventos (orden creada, enviada, en tránsito, recibida, ítems agregados al inventario).

### 6. Traspasos (Bodeguero, Admin)

**Referencia visual:** `references/Traspasos · Módulo completo (single file).html`

- Workflow Board genuino con 4 columnas: Pendiente → Enviado → En tránsito → Recibido.
- Vista alterna: Lista (toggle Tablero/Lista).
- Crear nuevo: wizard 3 pasos (Origen → Destino → Items y motivo).
  - Origen y destino son chips de sedes con su color identificador.
  - Validación de stock disponible en origen.
  - Si stock insuficiente: sugerir otras sedes.
- Casos especiales F12:
  - **Mercancía abandonada** en almacén destino (cliente no la reclama). Badge "Abandonada" en warn. Flujo de marcado con fecha límite editable.
  - **Devolución interna por garantía** entre sedes. Badge "Garantía F12" en progress púrpura. Mercancía NO entra al stock vendible del destino, sino al stock de garantías pendientes.
- Detalle del traspaso con **Picking embebido** en destino: el bodeguero recibe mercancía y verifica items físicamente, marca recibidos, registra discrepancias.
- Picking en destino reutiliza el patrón del Task Mode original (ver `references/Picking · 6 vistas (single file).html`).

### 7. Devoluciones (Bodeguero, Vendedor, Admin)

**Referencia visual:** `references/Devoluciones · Módulo completo (single file).html`

- Historial con tabs duales:
  - **Devoluciones de Cliente** (reingresan stock al inventario tras validación física).
  - **Devoluciones a Proveedor** (restan stock del inventario, vinculadas a compra origen).
- Tab Cliente:
  - Filtros: Pendiente validación, Aprobadas, Rechazadas, Procesadas.
  - Filtros por tipo de resolución: Nota crédito, Cambio de pieza, Reembolso.
  - Vinculación a Venta origen (V-XXXX) o a OT (OT-XXXX).
  - Validación física al recibir: empaque original, sin uso visible, daños coinciden con reportado, SKU verificable, componentes completos.
  - Fotos del producto al recepcionar + fotos del daño enviadas por el cliente.
- Tab Proveedor:
  - Filtros: Pendiente envío, Enviadas al proveedor, Aceptadas, Rechazadas.
  - Filtros por motivo: Defecto fábrica, Error de pedido, Producto vencido, Garantía (F13).
  - Vinculación a Compra origen (OC-XXXX).
- Caso especial: validación de lote vencido con tinte dang-50 + badge específico.

### 8. Órdenes de Trabajo (Técnico, Admin)

**Referencias visuales:**
- Lista: `references/Ordenes de Trabajo · 7 vistas (single file).html`
- Detalle: `references/OT Detalle · 6 vistas (single file).html`

- Historial con tabs de filtro: Todas, Abiertas, En proceso, Esperando repuesto, Completadas, Pend. recogida, Entregadas.
- Toggle Tablero/Lista (default Lista, Tablero como vista alterna).
- Crear nueva: wizard 3 pasos:
  1. Cliente (texto libre) + equipo (descripción + serie + marca/modelo).
  2. Diagnóstico inicial + costo mano obra estimado + opción "Asociar cotización existente al crear" (checkbox que recicla cliente, teléfono, observaciones, ítems sugeridos sin tocar inventario).
  3. Asignación: técnico, fecha estimada de entrega, prioridad.
- **OrdenDetalle (pantalla crítica)**: 3 paneles centrales operativos:
  - **a) Autorización del cliente** (state machine controller):
    - 3 botones segmented: Pendiente / Autorizado / No autorizado.
    - Pendiente → no se puede iniciar trabajo.
    - Autorizado → requiere ≥1 abono registrado para pasar a En proceso. Fecha de autorización + "Autorizado por" + checkbox de evidencia adjunta.
    - No autorizado → cobrar valor por revisión, OT pasa directo a Completada sin trabajo.
  - **b) Abonos / Anticipos**:
    - Lista de abonos con fecha, monto, método de pago (Efectivo / Transferencia / Tarjeta), referencia opcional, notas.
    - Solo Admin puede eliminar abonos.
    - Modal para registrar abono nuevo.
    - Si abono excede saldo: ConfirmDialog antes de guardar.
    - Pill grande "Abonado / Saldo pendiente" con barra de progreso.
  - **c) Checklist de recepción** (24 ítems oficiales, soporte legal):
    - Lista configurable en F9 con 24 ítems (ver seed.json).
    - Cada ítem checkbox marcable.
    - Contador "X de 24 marcados".
    - Campo "Observaciones del checklist" opcional.
- Sección Cotizaciones asociadas con botones "Generar nueva" y "Asociar existente". Si ya hay 1+, modal pregunta antes de crear otra.
- Cambio de estado con state machine validado en BD.
- Estado "Pendiente de recogida" para OTs > 30 días sin reclamar (badge warn con dot pulsante).
- Equipo del cliente NUNCA entra al inventario.
- Timeline cronológico de eventos.

### 9. Ensambles (Bodeguero, Técnico, Admin) — POST V1.0

**Referencia visual:** PENDIENTE DE PRODUCIR.

- Historial de compresores ensamblados.
- Crear: BOM (Bill of Materials) en tree con disponibilidad por nodo.
- Al completar: resta del inventario los componentes y crea producto ensamblado nuevo.
- **Aplazado a Fase 18 según spec original. Mostrar placeholder en v1.0.**

### 10. Garantías (Vendedor, Bodeguero, Admin) — F13

**Referencia visual:** `references/7.1 Garantias F13.html`

- Tab Compras: garantías que CHV reclama a sus proveedores cuando recibe producto defectuoso. Resoluciones: nota crédito o reposición física.
- Tab Ventas: garantías que los clientes reclaman a CHV.
  - 3 meses default desde fecha de venta.
  - Resoluciones: Reparación, Cambio de pieza, Reembolso.
  - Fecha vencimiento auto-calculada a partir de fecha de venta + parámetro días_garantia_default (configurable en F9).
- Estados del flujo (state machine): Reportada → En análisis → Aprobada/Rechazada → En proceso (si Aprobada) → Resuelta. Si vence sin resolverse, pasa a "Vencida" automáticamente.
- Vinculadas a Venta origen (V-XXXX) o a Compra origen (OC-XXXX). Pills clickeables bidireccionales.
- "Días restantes" con color semántico: succ si >30 días, warn si entre 8-30 días, dang si <8 días o vencida.
- Validación técnica del defecto antes de aprobar: 5 criterios (período de garantía, defecto reproducible, uso dentro de especificación, sin manipulación, defecto cubierto por F13).

### 11. Recibos (Vendedor, Admin) — F14

**Referencia visual:** `references/Recibos · Módulo F14 (single file).html`

- Historial con filtros por tipo (Por cotización / Manual / Vinculado a OT).
- Crear desde cotización aprobada: pre-llena cliente, monto, concepto.
- Crear manual: form desde cero.
- Vinculación opcional a OT: consolida abonos previos registrados en la OT.
- Si OT vinculada tiene abonos previos: banner explicativo de consolidación + saldo después del recibo.
- PDF descargable + impresión directa.
- **Consecutivo automático asignado por BD** (Rec-1284, Rec-1285...) sin saltos, no editable, mostrado con icono lock.
- Validación de inconsistencia de consecutivo: si BD reporta salto, banner warn con link a Auditoría.
- Distinción operativa importante: **abonos viven en la OT, recibos son documento de pago consolidado**.

### 12. Herramientas (todos los roles)

**Referencia visual:** `references/7.2 Herramientas.html`

- Sistema de préstamos internos (Pairing persona/objeto).
- Cada herramienta tiene QR para escaneo.
- 3 tabs internos: Préstamos activos / Catálogo completo / Historial.
- Préstamo: usuario, herramienta, fecha esperada de devolución.
- Devolución requiere evaluación del estado (Buen estado / Daño leve / Daño grave).
- Alerta de atrasos (herramientas no devueltas en fecha).
- Historial por usuario y por herramienta.
- 4 estados de cada herramienta: Disponible / Prestada / Mantenimiento / Dañada.
- 12 herramientas en el catálogo (ver seed.json).
- QR de identificación con fondo siempre blanco (incluso en dark mode) para garantizar escaneabilidad.

---

## Shell `/admin` — 10 módulos administrativos

### 1. Dashboard / Cockpit

**Referencia visual:** `references/Cockpit v2 · 7 vistas (single file).html`

- KPIs F15: ingresos del día/mes/año (productos vs servicios), egresos, ventas vs día anterior, cantidad de OTs activas, productos en alerta, actividad reciente.
- Selector de periodo: Hoy / Semana / Mes / Año.
- Sparklines en cada KPI con color semántico del propio KPI.
- Gráficos: tendencia 30 días con toggle Productos/Servicios/Total, top sedes, top productos.
- Bloque "Atención requerida" como teaser hacia Alertas.
- Grilla 2×2 con bloques estratégicos:
  - Productos en alerta → link "Ver módulo Reorden".
  - OTs en proceso → link "Ver Órdenes de Trabajo".
  - Cotizaciones próximas a vencer → link "Ver Cotizaciones".
  - Actividad reciente → link "Ver Auditoría".

### 2. Alertas

**Referencia visual:** PENDIENTE (parte de Fase 10).

- Módulo propio con tabs por tipo:
  - Stock bajo / agotado.
  - Herramientas vencidas.
  - Órdenes esperando repuesto.
  - OT > 30 días sin recoger.
  - Sobre-stock (F12).
  - Mayor/menor rotación (F12).
- Cada fila: información mínima + botón abrir (lleva al módulo correspondiente).

### 3. Conteo cíclico

**Referencia visual:** PENDIENTE (Fase 11).

- Selector de productos a contar (filtros por categoría, sede, última fecha).
- Cadencia configurable (default 15 días, según F12).
- **Task Mode similar a Picking**: bodeguero captura stock físico item por item.
- Calcula diferencia con stock teórico, propone ajuste de inventario.
- Reporte de discrepancias mensual/trimestral.

### 4. Análisis ABC

**Referencia visual:** PENDIENTE (parte de Fase 10).

- Clasificación de productos según ventas últimos 90 días.
- Tabs A (alto valor) / B (medio) / C (bajo).
- Botón "Recalcular ABC" con timeout 30 s.
- Tabla densa con SKU, producto, ventas en periodo, clasificación, sugerencia.

### 5. Reorden

**Referencia visual:** PENDIENTE (parte de Fase 10).

- Sugerencias de reposición según consumo histórico y stock_minimo.
- Vista agrupada por proveedor recomendado (último proveedor al que se compró).
- Permite generar orden de compra desde aquí (lleva al wizard de Compras con productos pre-cargados).

### 6. Auditoría

**Referencia visual:** PENDIENTE (parte de Fase 10).

- Log de movimientos completo (Ledger/Timeline).
- Filtros por: tipo de movimiento, sede, usuario, rango de fechas, búsqueda libre.
- Cada evento con timestamp en mono, usuario (avatar + nombre), tipo (badge), descripción, link al documento origen.

### 7. Usuarios

**Referencia visual:** `references/9 Configuracion y Usuarios.html` (segunda parte del archivo).

- Lista de los 6 usuarios.
- CRUD: editar nombre, rol, sede asignada, activo/inactivo.
- **Anti-lockout**: un Admin no puede desactivarse a sí mismo ni cambiar su rol.
- Botón nuevo usuario (futuro, no crítico para v1.0).

### 8. Top 10

**Referencia visual:** PENDIENTE (parte de Fase 10).

- Top productos vendidos por periodo (7d / 30d / 90d / 1 año).
- Ranking con número, SKU, nombre, cantidad vendida, ingresos totales.

### 9. Configuración (F9)

**Referencia visual:** `references/9 Configuracion y Usuarios.html` (primera parte del archivo).

Módulo multi-tab con 3 tabs:

- **Tab Cuentas Bancarias**: CRUD de cuentas (banco, tipo, número, con-IVA / sin-IVA). Estas son las que aparecen seleccionables en el wizard de Cotizaciones.
- **Tab Checklist OT**: editable de los 24 componentes oficiales del checklist de recepción en OT.
- **Tab Parámetros del sistema**:
  - IVA default (19%).
  - Validez default de cotización (15 días).
  - Días para alerta de OT sin recoger (30).
  - Días de garantía default (90 = 3 meses).
  - Días de conteo cíclico (15).

### 10. Cierres (F15)

**Referencia visual:** PENDIENTE (parte de Fase 10).

- Cierre diario / mensual: consolida ventas + servicios.
- Reporte exportable (PDF y CSV).
- Marca registros como "cerrados" (inmutables, no editables después).

---

## Interacciones transversales

- **QR scanner global**: cualquier módulo lo puede invocar (cámara web/móvil). Modal centrado con preview de cámara + opción de SKU manual.
- **ConfirmDialog** modal para acciones destructivas o riesgosas (anular venta, cancelar OT, eliminar abono).
- **Banners de feedback** (error / éxito / info / warning) consistentes en todas las páginas usando las pills semánticas + iconos.
- **Búsquedas con debounce 300 ms**.
- **Mobile**: cards apiladas full-width, BottomNav de 4-5 items configurable por rol.
- **Desktop ≥1024px**: tabla densa, sidebar colapsable.
- **PWA instalable** + offline básico (lectura de inventario y OTs).
- **Realtime**: cambios de parámetros en Configuración se propagan a todos los tabs abiertos (Supabase realtime).
- **Cmd+K command palette**: buscador global con acciones recientes, navegación y acciones rápidas. Disponible en ambas shells.

---

## Flujos destacados de usuario (operativos)

1. **Vendedor cotiza por celular**: recibe llamada, abre wizard de cotización en mobile, busca productos por QR o nombre, ajusta cantidades, completa F11, genera PDF, comparte por WhatsApp.

2. **Cliente acepta cotización**: vendedor convierte cotización a venta o la asocia a OT existente.

3. **Equipo entra a taller**: técnico abre OT, marca checklist físico de 24 ítems, hace diagnóstico, genera cotización vinculada a la OT, envía al cliente.

4. **Cliente autoriza OT**: técnico registra anticipo (abono), pasa estado a En proceso, consume repuestos del inventario, completa OT, genera recibo final.

5. **Cliente NO autoriza**: técnico cierra OT con valor por revisión.

6. **Admin revisa OTs no recogidas**: cada 30 días, módulo Alertas notifica OTs sin reclamar. Admin decide contactar al cliente o marcar mercancía como abandonada (F12).

7. **Bodeguero conteo cíclico**: cada 15 días, ejecuta conteo de productos seleccionados, captura stock físico vs teórico, sistema genera ajuste de inventario.

8. **Admin morning routine**: abre Dashboard, revisa KPIs F15, atiende Alertas, decide acciones del día.

9. **Recepción de compra**: bodeguero recibe mercancía del proveedor, verifica item por item contra orden de compra, marca recibidos/parciales/faltantes/excedentes, confirma recepción, productos entran al inventario.

10. **Devolución a proveedor por garantía F12**: bodeguero detecta defecto fábrica en producto recibido, inicia flujo de devolución por garantía, sistema marca producto como pendiente de retorno, genera documento para proveedor.

---

## Datos canónicos del ciclo comercial (referencia bidireccional)

Las pantallas ya diseñadas mantienen un ciclo comercial coherente como prueba de integridad operativa. Esos datos están consolidados en `seed.json`. El ciclo canónico:

```
Cot-1042 (Industrial XYZ · $1.840.000 · Aprobada)
   ↓ se aprueba y convierte
V-2847 (misma cliente, mismos productos · método Transferencia)
   ↓ se genera recibo
Rec-1284 (consecutivo BD · vinculado a V-2847 + OT-2845)
   ↓ vinculación operativa
OT-2845 (Compresor Atlas Copco GA-22 · Serie KS-2024-00847 · En proceso · saldo $1.340.000)
   ← abono previo de $500.000 registrado en la OT
```

Esta cadena de datos está en `seed.json` para que los mocks la respeten. Cuando un módulo nuevo muestre cualquier documento de esta cadena, los datos deben coincidir exactamente.
