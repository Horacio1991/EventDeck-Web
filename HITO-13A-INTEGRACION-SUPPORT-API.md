# Hito 13A — Integración web ↔ Support API

## Entrega y arquitectura

Base exacta: `EventDeck-Web-Hito12(2).zip`. Copia independiente, sin despliegue. Se conserva el build estático Node, sin frameworks ni dependencias nuevas.

`support-api.js` centraliza `https://eventdeck-support-api.onrender.com` y ofrece únicamente `getConfig()`. Usa GET, CORS normal, sin cookies, sin caché, sin referrer y sin seguir redirects. Timeout de 12 segundos cubre también la lectura JSON; aborta la solicitud. Maneja HTTP no OK, Content-Type inesperado, JSON inválido, esquema inválido y errores de red. No muestra errores internos ni contenido arbitrario del servidor.

`support-service.js` separa consulta y presentación. Una consulta al cargar y reintento manual en caso de error/indisponibilidad, sin polling ni solicitudes concurrentes. Mensajes mediante `textContent`, región `role=status`/`aria-live=polite`, control de reintento accesible. `support-integration.js` monta esta función independientemente del módulo de previews, que permanece intacto.

## Endpoint utilizado y contrato

Único endpoint llamado: `GET /api/support/config`.

Contrato encontrado en el código previo local de Hito 11: `{ready: boolean, testMode: boolean, amount: number|null, currency: string}`. La moneda debe tener tres letras mayúsculas y el importe, cuando existe, ser positivo y finito. Campos adicionales son descartados: ni `approved`, ni `entitlement`, ni una URL incluida en config autoriza acceso.

La petición directa al despliegue agotó 25 segundos sin respuesta. En el navegador local también se observó el estado de error recuperable. Esto no demuestra que el servidor esté caído para otros usuarios. La respuesta del despliegue actual y CORS desde el origen definitivo de GitHub Pages quedan pendientes de verificación. No se modificó CORS, Render ni variables de entorno. No se usó un proxy ni `no-cors` para rodear esa limitación.

## Estados

| Estado | Implementación |
|---|---|
| Cargando | Real mientras se consulta config |
| Servicio disponible | Real cuando config válida devuelve ready=true; NO habilita colaboración |
| Servicio temporalmente no disponible | Real con ready=false |
| Error recuperable | Real ante error/timeout, con reintento manual |
| Iniciando colaboración | Plantilla inerte nueva; sin llamada checkout |
| Esperando confirmación / pendiente | Plantillas inertes existentes |
| Colaboración confirmada / Pack disponible | Plantillas inertes existentes |
| Enlace generado | Plantilla inerte nueva |
| Enlace vencido / solicitar nuevo enlace | Plantilla inerte existente con botón deshabilitado |
| Descarga iniciada / beneficio no disponible | Plantillas existentes preservadas |

No hay transiciones de pago por timers, controles de demostración, tokens ficticios ni estados autorizados activables desde el runtime. `APOYAR EVENTDECK` continúa nativamente deshabilitado incluso con configuración disponible o modo productivo. El aviso “Las colaboraciones estarán disponibles próximamente” permanece visible.

## Retorno y pendientes para Hito 13B

El runtime deliberadamente no interpreta URL, query, fragmentos ni almacenamiento del navegador. El controlador de disponibilidad está separado de las futuras plantillas de operación. Falta conectar un adaptador de retorno cuando se confirme cómo se entrega a la web el identificador opaco de operación y el contrato desplegado. Los parámetros de Mercado Pago jamás serán evidencia de pago.

En el código previo local de Hito 11 SÍ existen estas rutas (no se afirma que su contrato actual en Render haya sido comprobado):

- `POST /api/support/create-checkout` con JSON vacío.
- `GET /api/support/status/:publicToken`, con `?include=benefit` para incluir beneficio.
- `POST /api/support/download-token/:publicToken` con JSON vacío.
- `GET /api/downloads/:token` que resuelve y redirige con 302.
- Retorno actual servido por el backend: `/support/:outcome/:publicToken`.

No se inventaron rutas nuevas ni se invocaron estas rutas en este hito. Lo pendiente NO es afirmar que faltan endpoints: falta confirmar sus esquemas desplegados, errores, expiración, permiso para reemitir, entrega segura del token opaco al sitio estático y CORS del origen publicado. Un token de operación permite consultar al backend; por sí solo nunca acredita una colaboración. No se deben transferir importes, buckets, object keys, TTL ni nombres de archivos desde el cliente.

Para Hito 13B: confirmar esos contratos y el mecanismo de retorno, resolver la investigación HMAC WCS-55735, incorporar validadores de respuesta y transiciones basadas exclusivamente en backend, y habilitar el inicio solo con autorización expresa. La descarga deberá navegar al endpoint autorizado y seguir su 302 a R2, sin fetch/blob del ZIP en frontend ni proxy de bytes en Node.

## GitHub Pages y preservación

El ZIP recibido contenía rutas absolutas `/assets/...`, `/styles.css`, etc. Se corrigió exclusivamente su salida generada a `./...`, incluyendo posters y srcset, para soportar subcarpetas. Los módulos nuevos usan imports relativos `.js`. Los componentes anteriores no se reescribieron. No se cambiaron enlaces externos ni anchors, medios, estilos o scripts anteriores salvo las adiciones de apoyo enumeradas.

Los tres enlaces oficiales continúan apuntando exactamente a `https://github.com/Horacio1991/EventDeck/releases/download/v0.7.2/EventDeck-Setup-0.7.2.exe`. Se comprobó su preservación, sin volver a descargar el instalador.

## Archivos

Nuevos: `src/support-api.js`, `src/support-service.js`, `src/support-integration.js`, `test/support-api.test.mjs`, este documento y sus tres módulos generados en `dist/`.

Modificados: `src/support.mjs` (región de servicio/reintento), `src/support.css` (solo estilos scoped de esos controles), `src/support-states.mjs` (dos plantillas futuras), `scripts/build.mjs` (recursos y rutas portables), `scripts/check.mjs` (validación de rutas relativas), `scripts/check-support.mjs` (comparación adaptada a rutas relativas sin quitar checks), `package.json` (script test nativo), `README.md` (referencia), `dist/index.html` y `dist/support.css` generados.

Los ocho estados del Hito 12 y todos sus checks se mantienen. Los assets y `src/support.js` de reproducción son idénticos a la base. Ningún backend fue modificado.

## Validación

- Build y todos los checks anteriores: aprobados.
- 27 tests Node: aprobados. Config válida, esquema inválido, campos extra no autorizantes, HTTP 403/404/429/500/503, JSON inválido, HTML de proxy, red/CORS, timeout incluyendo cuerpo lento, retry exitoso, concurrencia, montaje UI y rutas portables.
- Los tests sustituyen fetch solo dentro de `test/`; el build público no contiene fixtures, mocks ni selectores de modo de prueba.
- Navegador desktop: ancho útil 1348 px = scrollWidth. Mobile mediante iframe de 320 px: ancho útil 305 px por scrollbar = scrollWidth. Sin overflow.
- URL con status=approved, collection_status=approved y payment_id: CTA bloqueado, cero enlaces de pack.
- Error real de consulta visible en navegador, reintento por teclado comprobado. Respuesta exitosa comprobada con tests controlados, no con la API desplegada.
- Videos conservados manuales, pausados y muted; sin modificación de medios ni lógica de reproducción.
- Sin JavaScript el marcado conserva el aviso estático y CTA bloqueado; la consulta no se ejecuta. Esta degradación se verificó por estructura, no con un segundo navegador sin JS.
- No se introdujo animación. Reglas prefers-reduced-motion conservadas; no se emuló la preferencia del sistema durante esta ronda.
- Sin secretos, credenciales, localStorage/sessionStorage, parseo de redirects ni endpoints de escritura en el runtime nuevo.
- No hay script separado de lint/typecheck; sintaxis comprobada por Node y carga de módulos. Npm emite un warning del entorno sobre http-proxy, sin afectar resultados.

## Operación local

Node >=20: `npm run build`, `npm run check`, `npm test`, `npm run dev`. Publicación estática desde `dist/`, que no incluye tests ni documentos de QA temporales. No abrir mediante file://.

No se desplegó, no se realizaron pagos, no se modificaron Mercado Pago, R2, HMAC, secretos ni infraestructura. No se habilitó APOYAR EVENTDECK.
