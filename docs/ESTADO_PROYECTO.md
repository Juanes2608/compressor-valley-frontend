# ESTADO DEL PROYECTO · Compresores del Valle S.A.S.

> Snapshot del estado actual del workflow paralelo de Claude Design al momento de armar el kit de migración a Claude Code. Mayo 2026.

---

## Resumen ejecutivo

| Métrica | Valor |
|---|---|
| Pantallas canónicas archivadas | 18 archivos HTML productivos |
| Pantallas pendientes de producir | 4 entregas (5 archivos: Fase 10 agrupada en 2, Fase 11, Fase 12, Fase 13 auditoría sin archivo) |
| Pantallas aplazadas a post-v1.0 | 1 (Ensambles) |
| Módulos totales del proyecto | 22 (12 en /ops + 10 en /admin) |
| Cobertura visual actual | 16 de 22 módulos con referencia visual completa |
| Pendientes de referencia | 6 módulos admin + Conteo cíclico + patrones globales |

---

## 18 archivos canónicos productivos archivados

Estos son los archivos HTML que **debes copiar a `chv-app/references/`** en el repo nuevo. Renombrá los archivos para limpiar los caracteres especiales (`#U00b7` representa `·` (medio punto)). Sugerencia de nombres limpios:

| # | Archivo original (ZIP) | Nombre limpio sugerido | Fase | Módulo(s) |
|---|---|---|---|---|
| 1 | `Sistema CHV #U00b7 v1.0 final.html` | `Sistema CHV · v1.0 final.html` | 0 | Sistema de diseño (referencia visual de tokens) |
| 2 | `Picking #U00b7 6 vistas (single file).html` | `Picking · 6 vistas.html` | 0 | Task Mode (referencia para Conteo cíclico y Traspasos) |
| 3 | `Foundation Shell #U00b7 8 vistas (single file).html` | `Foundation Shell · 8 vistas.html` | 1 | Shell global (sidebars, header, dark mode) |
| 4 | `Inventario v2 #U00b7 7 vistas (single file).html` | `Inventario v2 · 7 vistas.html` | 2 | Inventario + Productos |
| 5 | `Cockpit v2 #U00b7 7 vistas (single file).html` | `Cockpit v2 · 7 vistas.html` | 2 | Dashboard /admin |
| 6 | `Ordenes de Trabajo #U00b7 7 vistas (single file).html` | `Órdenes de Trabajo · 7 vistas.html` | 3 | OT Lista |
| 7 | `OT Detalle #U00b7 6 vistas (single file).html` | `OT Detalle · 6 vistas.html` | 3 | OT Detalle |
| 8 | `Cotizaciones Lista #U00b7 6 vistas (single file).html` | `Cotizaciones Lista · 6 vistas.html` | 4 | Cotizaciones Lista |
| 9 | `Cotizaci#U00f3n Nueva #U00b7 Wizard 7 vistas (single file).html` | `Cotización Nueva · Wizard 7 vistas.html` | 4 | Cotización Nueva (wizard 4 pasos) |
| 10 | `Cotizaci#U00f3n Detalle Cot-1042 #U00b7 6 vistas (single file).html` | `Cotización Detalle Cot-1042 · 6 vistas.html` | 4 | Cotización Detalle |
| 11 | `Ventas #U00b7 M#U00f3dulo completo (single file).html` | `Ventas · Módulo completo.html` | 5 | Ventas (lista + wizard + detalle) |
| 12 | `Recibos #U00b7 M#U00f3dulo F14 (single file).html` | `Recibos F14 · Módulo completo.html` | 5 | Recibos F14 |
| 13 | `Compras #U00b7 M#U00f3dulo completo (single file).html` | `Compras · Módulo completo.html` | 6 | Compras (lista + wizard + recepción + detalle) |
| 14 | `Traspasos #U00b7 M#U00f3dulo completo (single file).html` | `Traspasos · Módulo completo.html` | 6 | Traspasos (Workflow Board + Picking embebido) |
| 15 | `Devoluciones #U00b7 M#U00f3dulo completo (single file).html` | `Devoluciones · Módulo completo.html` | 6 | Devoluciones (tabs duales cliente/proveedor) |
| 16 | `7.1 Garantias F13.html` | `Garantías F13 · Módulo completo.html` | 7 | Garantías F13 (tabs duales) |
| 17 | `7.2 Herramientas.html` | `Herramientas · Módulo completo.html` | 7 | Herramientas (3 tabs internos) |
| 18 | `9 Configuracion y Usuarios.html` | `Configuración + Usuarios · Módulo combinado.html` | 9 | Configuración multi-tab + Usuarios (CRUD) |

---

## Archivos auxiliares del ZIP (NO copiar como referencia)

Estos archivos están en el ZIP pero **no son referencias canónicas productivas**:

- **JSX heredados** (`Shell.jsx`, `Operations.jsx`, `Workshop.jsx`, `Dashboard.jsx`, `Inventory.jsx`, `Login.jsx`, `MobileModules.jsx`, `Tokens.jsx`): prototipo pre-Foundation con Geist font y módulos inventados. NO usar.
- **OS Kanban (3 versiones)**: iteraciones preliminares antes de adoptar Workflow Board en Traspasos. Sustituidas por `Traspasos · Módulo completo.html`.
- **Sistema de Color CHV v1/v2/v3**: iteraciones del sistema antes de cerrar la v1.0 final. Sustituidos por `Sistema CHV · v1.0 final.html`.
- **Calibración Headers, CHV Plataforma**: archivos exploratorios. NO son canónicos.
- **Inventario v1, Cockpit v1**: versiones antiguas reemplazadas por v2.
- **assets/**: `logo.png` y `login-bg.jpg` se pueden copiar a `chv-app/public/` para usar en login.
- **fonts/**: Geist (legacy), no usar. La app usa IBM Plex desde Google Fonts.
- **uploads/**: contiene `PROMPT_COMPRESORES.md` y `REPOSITORIO_RECURSOS_COMPRESORES.md`, documentos de contexto original. Pueden quedarse en `docs/legacy/` por referencia histórica pero no son necesarios para el kit.

---

## 4 entregas pendientes en el workflow Claude Design

Estas son las pantallas que aún hay que producir como referencia visual antes de poder implementarlas en Claude Code:

### Fase 10 · Reportes admin (2 archivos)

**Archivo A · Monitoreo:** Auditoría + Alertas + Cierres consolidados en un solo archivo single-file con secciones claramente separadas. 18 vistas estimadas (6 vistas por módulo).

**Archivo B · Análisis comercial:** Análisis ABC + Top 10 + Reorden consolidados similar. 18 vistas estimadas.

Justificación de agrupar: los 6 módulos comparten patrones (tablas densas, filtros temporales, exportables) y producir 6 archivos separados sería ineficiente. La agrupación se hace en archivos donde cada módulo conserva sus 6 vistas, no se sacrifica densidad.

### Fase 11 · Conteo cíclico

Task Mode similar al Picking (referencia ya producida). Bodeguero captura stock físico item por item, compara con teórico, genera ajuste. 6 vistas (desktop light, tablet, mobile, dark, estado vacío, estado con discrepancias).

### Fase 12 · Patrones globales

Componentes reutilizables como referencia visual: loading skeletons, empty states, error states, restricted access screens, toast notifications, modal destructivo canónico, Cmd+K command palette, QR scanner modal. 12+ vistas.

### Fase 13 · Auditoría propia final

Sin archivo nuevo. Es una pasada de revisión sobre los 22 archivos canónicos para detectar inconsistencias antes de cerrar v1.0 visual.

---

## Aplazado a post-v1.0

### Ensambles

Módulo aplazado según decisión de spec original. Mostrar placeholder con mensaje "Disponible en v1.1" mientras se diseña.

---

## Implicancias para Claude Code

Cuando arranques con Claude Code, **podrás construir 16 de 22 módulos con referencia visual completa**:

✅ Tienen referencia visual:
- Inventario · Productos
- Cotizaciones (lista + nueva + detalle) · Órdenes de Trabajo (lista + detalle)
- Ventas · Recibos F14
- Compras · Traspasos · Devoluciones
- Garantías F13 · Herramientas
- Dashboard · Configuración · Usuarios

⏳ Sin referencia visual todavía (esperar workflow de diseño):
- Auditoría · Alertas · Cierres
- Análisis ABC · Top 10 · Reorden
- Conteo cíclico
- Patrones globales (componentes transversales)

❌ Aplazado:
- Ensambles

**Estrategia recomendada:** construí los 16 módulos con referencia primero, después volvé al workflow Claude Design para producir las 4 entregas pendientes, después implementás los 6 módulos restantes.

---

## Carpeta `docs/` del repo Claude Code (resumen final)

Después de copiar este kit a `chv-app/docs/`, la estructura final debería ser:

```
chv-app/docs/
├── README.md                          (este kit)
├── MASTER_PROMPT.md                   (prompt fundacional para Claude Code)
├── ESTADO_PROYECTO.md                 (este archivo)
├── design-system/
│   ├── tokens.css
│   └── tailwind.config.ts
├── specs/
│   ├── SPEC_FUNCIONAL_CHV.md
│   ├── REGLAS_UI_CHV.md
│   └── seed.json
└── prompts/
    ├── PLANTILLA_PROMPT_MODULO.md
    └── ORDEN_DE_IMPLEMENTACION.md

chv-app/references/                    (18 HTML canónicos del ZIP)
├── Sistema CHV · v1.0 final.html
├── Foundation Shell · 8 vistas.html
├── ... (los 16 restantes)
```

A medida que el workflow Claude Design produzca las 4 entregas pendientes, las vas agregando a `references/` y construyendo los módulos correspondientes en Claude Code.
