# EventDeck Web — actualización oficial a v0.8.0

## Base y arquitectura

Base exacta: `EventDeck-Web-Hito13A (2)(1).zip`. El ZIP tenía dos carpetas contenedoras anidadas; esta entrega utiliza una sola carpeta raíz `EventDeck-Web-v0.8.0`, sin cambiar la estructura interna del proyecto.

Sitio estático generado con Node >=20: componentes HTML en `src/*.mjs`, estilos CSS y módulos JavaScript nativos. `scripts/build.mjs` genera `dist/` y conserva rutas relativas para GitHub Pages. Sin frameworks, nuevas dependencias ni cambios de arquitectura. `package.json` mantiene su versión técnica 1.0.0; no representa la versión pública de EventDeck.

## Cambios y ubicación de MÚSICA

La configuración central pasa a v0.8.0 y actualiza navbar, Hero, cierre de descarga y enlace a la release. La respuesta de FAQ sobre .NET utiliza ahora la versión central, evitando otro número fijo que pueda quedar obsoleto.

Se agregó un bloque editorial compacto dentro de “De música a video. Sin romper el momento.”, antes de la comparación Sin/Con EventDeck. Reutiliza colores, tipografía y líneas existentes. Explica biblioteca local y colecciones para Recepción, Inicio, Entrega de premios, Recreo y Cierre; PREPARADA/SONANDO; controles de reproducción, posición y volumen; LOOP/AUTO; crossfade y F8. No agrega una gran sección, imágenes, reproductores ni animaciones.

El bloque usa tres columnas en desktop y una columna por debajo de 960 px. MÚSICA se distingue explícitamente de OPERACIÓN y del audio de los videos enviados a PROGRAM.

El mapa de teclado mantiene los controles anteriores y distingue:

- OPERACIÓN: ↑/↓ y ENTER para TAKE del recurso preparado.
- MÚSICA: ENTER para lanzar la canción preparada; ←/→ para anterior/siguiente.
- F8: Fade Out de música desde ambos espacios.

La explicación y el nombre accesible de la demo F8 + ENTER también indican el contexto OPERACIÓN. La animación, sus tiempos y la comparación de siete pasos permanecen intactos.

## Descarga oficial

Los tres CTA apuntan a:

https://github.com/Horacio1991/EventDeck/releases/download/v0.8.0/EventDeck-Setup-0.8.0.exe

El enlace secundario de release apunta a:

https://github.com/Horacio1991/EventDeck/releases/tag/v0.8.0

Se consultó la API pública de GitHub y se descargó el asset real para verificarlo, sin ejecutarlo. Tamaño: 58.020.716 bytes. SHA-256 calculado y coincidente con el aportado por el usuario y el digest de GitHub:

`6DD60BA900E5A30DC20C40E215544190F04E60D5017669B0912F2EA8C5CA727C`

El instalador no se incluye ni se aloja dentro del proyecto web.

## Archivos modificados

| Archivo | Cambio |
|---|---|
| `src/config.mjs` | Versión y URL oficial v0.8.0 |
| `src/faq.mjs` | Referencia de versión desde configuración central |
| `src/live-transition.mjs` | Bloque MÚSICA y contexto de F8 + ENTER |
| `src/live-transition.css` | Estilos scoped del bloque nuevo, sin alterar reglas anteriores |
| `src/keyboard-control.mjs` | Atajos diferenciados por espacio |
| `src/keyboard-control.css` | Etiquetas de contexto del mapa de teclado |
| `scripts/check-support.mjs` | Solo expectativa de URL del instalador actual |
| `test/support-api.test.mjs` | Solo expectativa de nombre del instalador actual |
| `README.md` | Referencia a esta actualización; historial conservado |
| `dist/index.html` | HTML regenerado |
| `dist/live-transition.css` | CSS regenerado |
| `dist/keyboard-control.css` | CSS regenerado |

Archivo nuevo: este informe. Ningún JavaScript de producción fue modificado. Los cambios de tests no eliminan verificaciones ni modifican los contratos de Support API.

## Referencias a v0.7.2

- `src/config.mjs`: versión actual y URL del instalador actualizadas.
- `src/faq.mjs`: referencia fija reemplazada por configuración central.
- `scripts/check-support.mjs` y `test/support-api.test.mjs`: expectativas actualizadas a v0.8.0.
- `dist/index.html`: todas las referencias públicas regeneradas, sin apariciones residuales de 0.7.2.
- `README.md`: se conservan los párrafos de validación histórica de Hitos 7, 8 y 9, que describen sus entregas originales.
- `HITO-12-APOYO-VISUAL-PACK.md` y `HITO-13A-INTEGRACION-SUPPORT-API.md`: se conservan sus URLs de v0.7.2 como registro histórico, sin alterar esos informes.

Metadata: title y description ya describen correctamente el producto y no incluyen una versión antigua; se conservan. La base no contiene Open Graph ni JSON-LD/SoftwareApplication que requieran actualización. No se introdujo una fase SEO.

## Preservación de apoyo / Mercado Pago

Comparación byte a byte contra el ZIP base: `src/support*`, `dist/support*` y todos los assets de `public/` permanecen idénticos. Se conserva el CTA APOYAR EVENTDECK deshabilitado, los estados, las requests, los endpoints, los mensajes y el manejo de errores. No se modificaron backend, checkout, callbacks, HMAC, secretos, R2 ni Visual Pack.

La disponibilidad real de la API y su investigación pendiente no se corrigieron ni se intentaron rodear. La página puede seguir mostrando su aviso existente si la API no está disponible; eso no afecta la descarga gratuita. No se realizó ningún pago.

## Validación realizada

- `npm run build`: aprobado.
- `npm run check`: aprobado.
- `npm test`: 27/27 aprobados, sin eliminar pruebas existentes.
- `node --check`: aprobado para módulos JS/MJS y scripts.
- IDs únicos, referencias ARIA y anchors internos resueltos.
- Tres CTA v0.8.0; descarga real y SHA-256 verificados.
- Responsive en navegador: 320, 360, 375, 390, 412, 430, 768, 1024 px mediante documentos embebidos de prueba y desktop con ancho útil 1348 px. `scrollWidth` = `clientWidth` en todos. Los iframes reservan 15 px para scrollbar; por ejemplo, 320 px arroja 305 px útiles. Sin overflow-x como parche.
- Inspección visual del bloque MÚSICA y atajos a 320 px y desktop; el mapa de teclado a 320 px tiene 265 px útiles sin desborde interno.
- Menú mobile abierto con teclado y cerrado correctamente al navegar a Funciones.
- Skip-link: visible al enfocar, outline sólido y foco trasladado a main al presionar ENTER.
- Sin JavaScript: contenido de MÚSICA y tres enlaces de descarga presentes; apoyo deshabilitado.
- `prefers-reduced-motion`: reglas y scripts anteriores conservados; la adición es estática y no añade animaciones. No se emuló la preferencia del sistema durante esta validación.
- No se observaron errores JavaScript atribuibles a los cambios. La consola del entorno registró mensajes propios de la extensión del navegador, ajenos al sitio.
- Npm muestra un warning del entorno por `http-proxy`; no impide build, checks ni tests.
- Sin dependencias nuevas, sin instalador duplicado y sin páginas temporales de QA en la entrega.

## Capturas y validación física recomendada

No se inventó ni modificó ninguna captura. La comunicación nueva funciona con texto y los patrones visuales existentes. Opcional para una revisión futura: captura real del espacio MÚSICA con colecciones visibles, una pista PREPARADA y otra SONANDO, y controles de volumen/crossfade, sin datos personales ni contenido institucional sensible. No hay placeholders pendientes.

La validación de esta entrega corresponde a la web, no sustituye pruebas de la aplicación WPF en Windows. Para revisar el texto contra uso real, confirmar ENTER según espacio activo, ←/→ en MÚSICA y F8 desde ambos espacios; y revisar la composición en tu teléfono habitual. El instalador descargado fue verificado, no ejecutado.

No se realizó commit, push, tag, release ni deploy. Proyecto listo para revisión local con `npm run dev`; `dist/` contiene la salida estática.
