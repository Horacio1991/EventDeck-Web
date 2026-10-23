# Hito 12 — Apoyá EventDeck + Visual Pack de cortesía

## Base y alcance

Copia independiente del archivo efectivamente adjunto `EventDeck-Web-Hito9(2).zip` (el pedido lo nombraba `(1)`). El original no fue sobrescrito. Arquitectura estática modular de Node conservada, sin dependencias nuevas. No se desplegó ni se realizaron pagos.

## Composición y ubicación

Nueva sección semántica `#apoyar`, después de FAQ, al final del contenido principal. Mantiene la paleta oscura/turquesa y tipografía existente. El mensaje inicial enfatiza que EventDeck es gratuito; luego presenta cuatro previews reales junto al agradecimiento y los datos del pack. Una aclaración visible confirma que no se necesita colaborar para usar ninguna función de EventDeck.

En desktop, galería de dos por dos a la izquierda e información a la derecha. Por debajo de 960 px las columnas principales se apilan; por debajo de 600 px los previews forman una columna. No se agregaron enlaces a la navegación ni se modificó el cierre de descarga gratuita.

El CTA `APOYAR EVENTDECK` es un botón nativo deshabilitado, acompañado por “Las colaboraciones estarán disponibles próximamente.” Esta decisión comunica honestamente que todavía no hay un flujo disponible. No hay enlaces ficticios ni checkout simulado. La descarga gratuita conserva su jerarquía y comportamiento.

Se expresa el tamaño como aproximadamente **1,55 GiB**, de acuerdo con el tamaño del archivo real indicado en el pedido.

## Archivos nuevos

- `src/support.mjs`: sección y marcado semántico.
- `src/support-states.mjs`: plantillas inertes para futura integración.
- `src/support.css`: estilos exclusivamente bajo clases `support-*`.
- `src/support.js`: mejora progresiva de reproducción, sin lógica de pagos.
- `scripts/check-support.mjs`: verificaciones de contenido, seguridad, enlaces y medios.
- `public/assets/support/preview-1.mp4` a `preview-4.mp4` y sus posters `.webp`.
- Copias generadas correspondientes en `dist/`, incluyendo `support.css` y `support.js`.
- Este documento.

## Archivos modificados

- `scripts/build.mjs`: importa y agrega la sección, enlaza y copia sus estilos y script.
- `scripts/check.mjs`: conserva los checks previos y ejecuta los nuevos.
- `scripts/dev.mjs`: MIME de MP4 y soporte opcional de argumentos `--host` / `--port` para la vista previa local; conserva los valores predeterminados.
- `README.md`: referencia a este documento.
- `dist/index.html`: resultado del build con la nueva sección y sus dos recursos.

Los módulos, estilos, scripts, imágenes, configuración de versión y dependencias anteriores permanecen idénticos byte a byte respecto del ZIP base. No hay modificaciones a backend, Mercado Pago, HMAC, R2, secretos ni variables de entorno.

## Previews

Derivados de los cuatro videos adjuntos, sin alterar los originales. Fragmentos de 6 segundos (desde el segundo 8), 768 × 432, 24 fps, MP4/H.264 yuv420p con faststart, sin pista de audio ni metadata de origen. Posters WebP. Los originales pesados no se duplican dentro del proyecto web.

| Preview | Fuente | MP4 (bytes) | Poster (bytes) |
|---|---|---:|---:|
| Geometría de luz | Texturas [306] | 687752 | 19878 |
| Luces de escenario | Textures [197] | 416386 | 9770 |
| Tramas en movimiento | Textures [206] | 867314 | 35632 |
| Destellos dorados | 4K Orange Star Spread | 541919 | 22272 |

Total de video: 2.513.371 bytes; posters: 87.552 bytes. `preload="none"`, controles nativos, `muted`, `playsinline`, sin autoplay ni loop. Con JavaScript, iniciar un preview pausa los demás y ocultar la pestaña pausa la reproducción. Nunca se reanuda automáticamente. Los cuatro archivos se decodificaron sin errores; el check comprueba integridad de las cajas MP4 y faststart. Un derivado truncado detectado durante QA fue regenerado antes de la entrega.

## Accesibilidad y movimiento

Jerarquía de encabezados, lista de datos, descripciones de cada preview, controles nativos y foco turquesa visible. Texto secundario mobile de 14–15 px como mínimo en esta sección. Sin animaciones de entrada ni reproducción automática, también con `prefers-reduced-motion: reduce`. Un cambio de preferencia a movimiento reducido pausa los previews. La reproducción manual sigue disponible.

Sin JavaScript, texto, posters y controles nativos siguen disponibles. El botón permanece deshabilitado. No se oculta contenido importante mediante scripts.

## Estados preparados, sin autorización simulada

Estado normal visible y ocho plantillas HTML inertes: verificación, confirmado, descarga autorizada, descarga iniciada, enlace vencido, pago pendiente, error temporal y beneficio no disponible. Las plantillas no se renderizan ni se activan en producción. Sus acciones están deshabilitadas y no contienen URLs de descarga.

La integración futura deberá obtener el estado exclusivamente del backend. Mostrar una plantilla nunca otorga un entitlement. El frontend actual no tiene controladores para interpretar redirects, parámetros, almacenamiento local ni respuestas de pago, ni hace solicitudes al backend.

La futura descarga deberá mantener el diseño aprobado: pago verificado → entitlement → token temporal → endpoint autorizado → 302 → URL R2 prefirmada. No se implementó ni modificó ninguna parte de ese mecanismo. Ningún cliente podrá seleccionar bucket, objeto, beneficio, nombre o TTL.

## Verificaciones

- `npm run build`: aprobado. Npm informa un warning del entorno sobre `http-proxy`; no es un error del proyecto ni afecta el resultado.
- `npm run check`: aprobado, incluyendo checks anteriores y nuevos.
- Sintaxis Node de los módulos y scripts: aprobada. El proyecto no posee scripts separados de lint o typecheck.
- Navegador: desktop y mobile; mediciones en documentos embebidos de 320, 360, 375, 390, 412, 430, 768, 1024 y 1440 px. En todos, `scrollWidth` fue igual al ancho útil (`clientWidth`); sin overflow horizontal. El navegador reserva 15 px para scrollbar.
- Teclado: controles nativos accesibles y foco visible. CTA correctamente deshabilitado.
- Cuatro previews reproducibles, sin error de medios y silenciados; además, ffprobe confirma ausencia de streams de audio.
- Sin JavaScript: comprobado mediante documento sandbox sin permiso de scripts; contenido y controles presentes, ninguna descarga del pack habilitada.
- URLs con `status=approved`, `collection_status=approved` y `payment_id`: no activan estado autorizado ni enlace de descarga.
- Movimiento reducido: reglas y comportamiento revisados en código; no fue posible emular la preferencia del sistema mediante la API del navegador disponible. La sección no introduce movimiento automático en ningún modo.
- Los tres enlaces de descarga oficial existentes conservan exactamente `https://github.com/Horacio1991/EventDeck/releases/download/v0.7.2/EventDeck-Setup-0.7.2.exe`. No se volvió a descargar el instalador durante esta prueba; se comprobó la preservación del HTML y las URLs.
- Comparación con el ZIP base: Hitos 1–9 preservados; archivos anteriores de `src/` y `public/` intactos. El HTML anterior se conserva al retirar únicamente la nueva sección y sus referencias CSS/JS.
- No se agregaron dependencias, secretos, tokens, credenciales, endpoints, bypasses ni acceso al pack completo. Los únicos videos públicos son los fragmentos promocionales.
- Las páginas temporales utilizadas para QA no forman parte de la entrega.

## Pendiente deliberadamente

Conexión real del botón de apoyo, verificación de la colaboración, estados dinámicos, resolución autorizada de descarga y renovación de enlaces. Requieren una integración posterior con el backend; este hito no intenta resolver ni rodear el ticket `WCS-55735`.

## Uso local

Con Node >=20: `npm run build`, `npm run check`, `npm run dev`. Abrir la dirección que imprime el servidor. `dist/` contiene el sitio estático generado. No abrir directamente el HTML con `file://`, porque utiliza rutas de recursos desde la raíz.
