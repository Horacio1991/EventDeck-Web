# EventDeck Web · Hito 1

Base estática modular, sin dependencias externas. Requiere Node.js 20 o superior.

## Ejecutar

```sh
npm run dev
```

Abrir http://localhost:3000. Tras editar archivos fuente, detener con Ctrl+C y ejecutar nuevamente.

```sh
npm run build
npm run check
```

`dist/` es el sitio listo para cualquier hosting estático. No requiere instalar paquetes.

## Estructura

- `src/config.mjs`: versión, plataforma, URL de descarga y navegación.
- `src/components.mjs`: componentes Navbar y Hero, renderizados en build.
- `src/styles.css`: tokens visuales, componentes, responsive y movimiento reducido.
- `src/main.js`: menú accesible, estado de navbar y avisos para enlaces pendientes.
- `public/assets/`: icono, favicon y captura real PNG/WebP lossless.
- `scripts/`: compilación, servidor local y verificaciones básicas.
- `.openai/hosting.json`: configuración del despliegue.

## Alcance

Navbar sticky, Hero, cinco pilares simples. Texto aprobado, un H1, metadatos iniciales y diseño responsive (960px y 600px). El sistema usa system-ui (Segoe UI en Windows) local para evitar descargas de fuentes. Turquesa #01d8e5 obtenido del icono oficial. Breakpoints documentados en CSS, ya que las custom properties no se evalúan en media queries nativas.

No hay backend, analytics, formularios, páginas secundarias ni secciones futuras. Los enlaces pendientes anuncian su estado con una región accesible; configurar `downloadUrl` habilita las descargas reales. No contabilizan descargas.

## Assets

- `EventDeck-Icon-64.png`: logo oficial, copiado sin modificar.
- `EventDeck(1).ico`: favicon oficial.
- `Imagen de ChatGPT 20 oct 2026, 09_45_17.png`: captura real de Spring Concert; contenido intacto, copia PNG y WebP lossless.
- `EventDeck_ Tu evento bajo control.png`: referencia visual; no se incluye como imagen del sitio.

La captura mantiene su relación de aspecto y no se recorta. En pantallas pequeñas se ajusta al ancho; el texto de la propia aplicación se reduce inevitablemente.

## Verificación

Build y comprobaciones estáticas disponibles. Sin TypeScript ni dependencias, typecheck/lint no aplican. No se ha ejecutado Lighthouse ni validación visual en navegador en este entorno. Revisar escritorio, notebook, tablet y móvil antes de aprobar el hito.

## Evolución

Se pueden agregar componentes estáticos manteniendo el HTML inicial completo para SEO. Funciones dinámicas futuras pueden añadirse mediante módulos JavaScript y endpoints separados; no se introduce un framework de hidratación hasta necesitarlo.

## Pulido visual del Hito 1

Skip link recortado visualmente salvo al recibir foco; destino main enfocable sin agregarlo al orden de tabulación. Columna de producto ampliada a 60% del espacio neto, margen sobre pilares reducido de 88 a 56px (120 a 64px en pantallas grandes). Pilares con descripciones breves, cinco columnas desktop, tres tablet y dos móvil. Caption más legible; segunda frase oculta en móvil. Tipografía del sistema sin peticiones externas. Se conserva la captura, textos principales, configuración, interacciones y movimiento reducido.

Build, checks existentes y sintaxis JS verificados. Revisión estática de anchos y wrapping; no se pudo medir overflow ni probar foco/renderizado en navegador porque el entorno no dispone del controlador de navegador requerido.

## Corrección responsive: overflow móvil

Cambio limitado a CSS: la navbar móvil heredaba `gap:30px` del breakpoint de 1199px. Se establece `gap:12px` hasta 599px, `min-width:0` en la marca y `flex-shrink:0` en icono y botón de menú. La columna del Hero hasta 959px usa `minmax(0,1fr)` en lugar de `1fr`, evitando un mínimo intrínseco de pista. No se usa overflow-x:hidden ni escala global.

Revisión estática de viewports 320/360/375/390/412/430px: contenedores de 280/320/335/350/372/390px respectivamente; imagen al 100% dentro de figure con min-width:0, perspectiva desactivada, metadata ajustable, pilares con pistas minmax(0,1fr). Tablet conserva su navbar; desktop no cambia. Build y checks correctos. Sin controlador de navegador disponible, no se ha podido confirmar scrollWidth ni el ancho real del texto renderizado. Validación visual final pendiente.

## Hito 2 · Problema → Solución → Preview / Program

La base coincide byte a byte con el ZIP aprobado del Hito 1 ResponsiveFix en componentes, estilos, JavaScript, configuración y package.json. El build inserta tres secciones dentro del main existente, después de los pilares, sin modificar el módulo del Hero.

- `src/narrative.mjs`: tres secciones renderizadas durante el build. Ventanas genéricas decorativas para el problema; flujo fuentes → EventDeck → público; explicación Preview/Program con captura real.
- `src/narrative.css`: estilos de las nuevas composiciones utilizando los tokens existentes. Sin librerías, scripts de interacción nuevos ni animaciones.
- `scripts/build.mjs`: integra HTML y hoja de estilos del Hito 2.
- `public/assets/eventdeck-dual-monitor.png` y `.webp`: captura adjunta completa, sin recortes ni retoques. WebP lossless comprobado píxel a píxel contra el PNG, con loading=lazy, dimensiones y alt descriptivo.
- `dist/`: salida de build actualizada.

Responsive: ventanas distribuidas en una grilla contenida, flujo vertical hasta 959px, fuentes en dos columnas en móvil, Preview/Program vertical hasta 599px y captura al ancho disponible. Pistas minmax(0,1fr), elementos reducibles y ausencia de offsets fuera del contenedor. Se conserva el fix de navbar del Hito 1. No se añade overflow-x:hidden ni escala global. Los diagramas funcionan sin movimiento y sin JavaScript; las representaciones genéricas y conectores decorativos se excluyen del lector de pantalla, mientras las explicaciones permanecen en HTML.

Validación: build y check existentes correctos; sintaxis JS comprobada; un H1, tres nuevos H2, cuatro sections, IDs únicos, referencias ARIA y assets válidos. Base aprobada comparada con el ZIP adjunto. Revisión estática para 320, 360, 375, 390, 412, 430px, tablet y desktop. El entorno no dispone del controlador de navegador requerido: no se ha medido scrollWidth ni realizado una prueba visual renderizada/Lighthouse. No hay lint ni typecheck configurados. Sin dependencias nuevas ni warnings en la ejecución directa con Node.

Ejecutar: `npm run dev`, abrir http://localhost:3000. No requiere npm install. Build: `npm run build`; comprobaciones: `npm run check`. Sin Hito 3.

## Reemplazo promocional de la imagen del Hito 2

La imagen definitiva de la última sección es `eventdeck-control-station.png` (original conservado) y `eventdeck-control-station.webp` (lossless), 1942 × 809 px. Sustituye los antiguos eventdeck-dual-monitor, eliminados de public y dist. Se actualizaron únicamente rutas, alt y dimensiones en el picture, más la salida del build. CSS y textos visibles sin cambios. La carga diferida, ancho al 100%, max-width:100% y altura automática se conservan; imagen completa sin crop. Build/check/sintaxis correctos, igualdad de píxeles del WebP verificada. No se dispone de navegador para medir scrollWidth; revisión responsive estática.

## Hito 3 · De música a video

Una sola sección nueva al final de main. `src/live-transition.mjs` genera el texto, lista de acciones manuales, teclas HTML kbd y secuencia de música/fade/video. `src/live-transition.css` usa los tokens existentes y animaciones CSS acotadas a 4,4 segundos. `src/live-transition.js` usa IntersectionObserver nativo para iniciar una única vez cuando el 50% de la demo es visible; no captura teclas, no reproduce multimedia y no incorpora dependencias.

Sin JavaScript o sin IntersectionObserver se mantiene una explicación estática completa. Con prefers-reduced-motion:reduce no se inicia la animación. Cambiar esa preferencia durante la ejecución restaura el estado estático. Las barras y estados visuales son aria-hidden: la lista textual permanente explica la transición. F8 y Enter permanecen visibles.

Desktop: pasos manuales horizontales y operación asistida con teclas junto a niveles. Tablet: cuatro columnas para pasos manuales. Móvil: lista manual vertical, teclas contenidas, niveles ajustables y tres etapas verticales. Anchos revisados estáticamente: 320/360/375/390/412/430, tablet y desktop. No se añade overflow-x:hidden. No se dispone de controlador de navegador para verificar renderizado, scrollWidth ni animación visual.

Cambios: tres módulos nuevos, integración mínima en scripts/build.mjs, dist generado y README. Fuentes/assets anteriores y package.json comparados byte a byte con el ZIP aprobado, sin diferencias. Build, checks, sintaxis y semántica correctos (un H1, cuatro H2, cinco sections). Prueba aislada de JS: umbral de entrada, ejecución única, reduced-motion inicial/dinámico y ausencia de IntersectionObserver. Sin warnings ejecutando con Node directamente. Sin lint/typecheck configurados. No se implementa Hito 4.

## Hito 3.1 · Pulido visual

Únicamente src/live-transition.css y su copia de build: secuencia desktop limitada a 980px, gap 12px, línea de 2px, números de 11px y pasos de 13px (14px en móvil). Barras de 16px en lugar de 10px; labels y resultados de 12px, estado de 13px, etapas de 14px y explicaciones de 12px. Fade out destacado con el turquesa existente. Columnas de labels de al menos 64px y reserva de estado móvil de 64px para permitir wrapping. Introducción móvil permanece en 15px; cierre y teclas no cambian.

Timings, keyframes, activación única, reduced-motion, JavaScript y HTML sin cambios. Sin JavaScript se conserva exactamente la misma información estática, ahora con mejor legibilidad. Verificados build, checks y sintaxis sin errores/warnings; comparación confirma que Hitos 1/2, textos, assets y dependencias no cambiaron. Revisión estática de pistas reducibles y anchos 320–430px, tablet y desktop. Sin controlador de navegador disponible, no se ha podido medir scrollWidth ni confirmar renderizado visual. Sin overflow-x:hidden. No se implementa Hito 4.

## Hito 4 · Preparación antes del evento

Nueva sección estática después del Hito 3: título y texto aprobados; lista Prepará → Organizá → Guardá bajo «Hoy»; divisor temporal y «Día del evento»; Abrí tu evento → Todo listo; imagen promocional definitiva completa; explicación de pestañas y tres microejemplos; cierre aprobado. La representación de abrir el evento es ilustrativa, no un botón inoperante.

Archivos nuevos: src/preparation.mjs, src/preparation.css y public/assets/eventdeck-preparation.png/.webp. Integración mínima en scripts/build.mjs, salida dist y documentación. Imagen de 1672 × 941 px sin alteración, recorte ni reconstrucción. Original PNG conservado; WebP lossless comparado píxel a píxel, lazy loading y dimensiones explícitas. Caption externo enumera las pestañas para mantener la explicación legible en móvil sin recrear la interfaz.

Desktop: introducción en dos columnas, proceso horizontal y captura amplia. Tablet: introducción y explicación en una columna. Móvil: proceso vertical, salto temporal, apertura, captura completa y explicación en ese orden. Pistas minmax(0,1fr), wrapping y ancho/altura proporcional. Sin JS nuevo, animaciones ni dependencias: información completa con JavaScript desactivado y reduced-motion.

Verificado: build/checks/sintaxis, un H1 y cinco H2, seis sections, IDs y referencias válidos, imagen WebP sin pérdida. Todos los archivos previos de src/public y package.json comparados con ZIP aprobado sin cambios. Revisión estática 320–430px, tablet y desktop. La vista previa supervisada no quedó disponible (conexión rechazada, status stopped); no se pudo medir scrollWidth ni comprobar el renderizado en navegador. No se aplicó overflow-x:hidden. Sin Hito 5, donaciones ni Visual Pack.


## Hito 5 · Encontrar entre cientos de recursos

Sección encapsulada en src/resources.mjs y src/resources.css, integrada después del Hito 4 mediante scripts/build.mjs. Dato real 401, lista Organizá/Buscá/Filtrá y ejemplo conceptual estático con el nombre visible 189. Sin JavaScript ni animaciones nuevos; contenido completo con JS desactivado y reduced-motion.

Original conservado en eventdeck-resources-original.png (1727 × 911). Recorte de recursos (60,590,1670,870), 1610 × 280, en PNG y WebP lossless. Sin reconstrucción ni alteración interna. Imagen proporcional con lazy loading y dimensiones explícitas.

Desktop en dos columnas; tablet en una, mecanismos horizontales; móvil con mecanismos verticales y búsqueda a ancho completo. Revisión estática 320/360/375/390/412/430px, tablet y desktop. Sin overflow-x:hidden. La vista previa supervisada no estuvo disponible; no se midió scrollWidth en navegador.

Build, checks, sintaxis, semántica y referencias verificadas. Archivos anteriores src/public y package.json iguales al ZIP aprobado de Hito 4. Sin dependencias nuevas ni lint/typecheck configurados. No se implementa Hito 6.

## Hito 6 · Menos mouse. Más control.

Sección nueva después del Hito 5, encapsulada en src/keyboard-control.mjs y src/keyboard-control.css. Mapa semántico dl/kbd con navegación y ejecución, y conjunto F6–F9. Comparaciones estáticas F6 audio y F7 loop usando cuatro capturas reales. Los textos aclaran que F6/F7 modifican estados y no ejecutan el recurso. Sin repetir la demo musical del Hito 3.

Cuatro originales conservados como public/assets/keyboard-*-original.png. Cuatro recortes de 260 × 78 px, coordenadas (0,0,260,78), con contexto de reproducción y audio. Versiones PNG y WebP lossless, iguales píxel a píxel a los recortes originales. Los cuatro WebP suman 16.590 bytes. Lazy loading, dimensiones explícitas, alt y captions descriptivos. No se reconstruye la interfaz.

Desktop: introducción/mapa en dos columnas, demostraciones lado a lado. Tablet: una columna para ambos bloques. Mobile: navegación seguida de F6–F9 en dos columnas; estados antes/después verticales. Revisión estática a 320/360/390/430/768/1024/1440 px: grids minmax(0,1fr), figuras con min-width:0, imágenes proporcionales. Sin overflow-x:hidden. La vista previa supervisada no está disponible con el servidor de desarrollo actual; no se realizó medición de scrollWidth ni prueba visual en navegador.

Build/checks/sintaxis correctos, un H1 y siete H2, IDs únicos y referencias ARIA válidas. Los 25 archivos anteriores de src/public/package.json permanecen idénticos al ZIP aprobado del Hito 5. Sin dependencias, JavaScript o animaciones nuevas; contenido estático completo sin JS y con reduced-motion. Cambios de integración limitados a scripts/build.mjs y salida generada. No hay lint/typecheck configurados. No se implementa Hito 7 ni otras funcionalidades futuras.

## Hito 7 · EventDeck en contexto

Sección posterior al Hito 6, encapsulada en src/event-context.mjs y src/event-context.css. Panorámica principal y dos escenas secundarias derivadas del collage promocional adjunto. Labels Escenario/Cabina/En vivo externos a las imágenes, aclaración promocional explícita, conclusión operador/público y cierre aprobado. Sin afirmaciones de eventos documentales, clientes o casos de éxito.

Original 1536 × 1024 conservado en public/assets/eventdeck-context-original.png. Recortes sin reconstruir ni modificar interfaces: stage (0,0,1536,510), booth (0,515,766,1024), live (771,515,1536,1024), eliminando los separadores blancos. WebP calidad 88 y fallback JPEG calidad 90. Panorámica adicional WebP 960 × 319 con srcset/sizes. Lazy loading y dimensiones explícitas.

Desktop: encabezado en dos columnas, panorámica amplia y escenas secundarias en dos columnas. Mobile: encabezado y escenas en una columna, imágenes completas y labels externos. Sin dependencias, JavaScript ni animaciones nuevas; contenido siempre visible sin JS y con reduced-motion. Revisión estática de responsive 320–430px, tablet y desktop, con pistas minmax(0,1fr) e imágenes proporcionales; no overflow-x:hidden. No se pudo validar renderizado ni medir scrollWidth en navegador por la limitación de vista previa ya identificada.

Build/checks/sintaxis correctos, IDs y referencias ARIA válidos, un H1 y ocho H2. Archivos anteriores de src/public/package.json comparados byte a byte con Hito 6.1: sin diferencias. Los dos enlaces oficiales al instalador 0.7.2 permanecen intactos. Integración limitada a scripts/build.mjs, dist y documentación. Sin Hito 8.

## Hito 8 · Cierre y descarga

Nueva sección en src/download-closing.mjs/.css/.js, después del Hito 7. Síntesis tipográfica, metadata editorial mediante dl y CTA final. Versión y descarga reutilizan product de config.mjs; release derivada de esa misma versión. Nota discreta de SmartScreen y referencia secundaria a GitHub. Sin imágenes, dependencias ni funcionalidades adicionales.

Desktop: título centrado y metadata en cinco columnas. Tablet/mobile: metadata en dos columnas con instalación a ancho completo; CTA móvil a ancho útil, tipografía adaptable y textos de al menos 14px salvo labels técnicos de 12px. Sin overflow-x como parche. Responsive revisado estáticamente; la vista previa supervisada continúa no disponible, por lo que no se verificó renderizado ni scrollWidth en navegador.

CTA: reveal de 550ms y desplazamiento de 8px, una sola vez al entrar en viewport. Contenido visible por defecto, enlace HTML estándar; sin JS funciona todo. Reduced-motion inicial omite observador/animación y un cambio de preferencia cancela el efecto. Verificados esos caminos con ejecución aislada del módulo. Build, checks y sintaxis correctos. HTML anterior idéntico al remover únicamente la sección y sus imports; fuentes, assets, estilos y JS anteriores intactos. Los tres CTA apuntan al instalador oficial 0.7.2. Enlace HTTP verificado con respuesta 200 y Content-Disposition EventDeck-Setup-0.7.2.exe. Sin Hito 9.

## Hito 8 · NAVFIX

Causa: enlaces de navbar y CTA secundario del Hero marcados data-pending; main.js cancelaba su navegación con preventDefault y mostraba un aviso. Los destinos no existían. Ahora logo → #inicio, Cómo funciona/Ver cómo funciona → #como-funciona (problema), Funciones → #funciones (solución/capacidades), Descargar → #descargar (Hito 8). Soporte conserva su nombre y dirige a https://github.com/Horacio1991/EventDeck/issues, habilitado en el repositorio; no se agrega sección de soporte ni un destino ficticio.

Se agregan IDs únicos y tabindex=-1 a destinos. Navegación HTML nativa: hash, historial y funcionamiento desktop sin JS. En mobile, el handler existente se complementa con cierre delegado, aria-expanded=false y foco del destino con preventScroll; no preventDefault ni scroll manual. Modificadores/clics especiales se respetan. Escape conserva cierre y foco en botón. Sin scroll-spy.

Header: scroll-padding-top de 100px existente más scroll-margin-top de 16px desktop (header 96px y borde); tablet/mobile margen adicional 0, conservando 100px frente a headers de 80/72px. Smooth existente y reduced-motion:auto intactos. Sin cambios de dimensiones o layout; foco visible para destinos.

Validaciones: build/check/sintaxis; todos los anchors resuelven IDs únicos; no data-pending en HTML generado; tres enlaces .exe y release intactos. Prueba aislada JS verifica apertura/cierre, aria-expanded, foco, ausencia de preventDefault, reapertura y Escape. Vista previa no disponible: hash/Atrás, posición visual y overflow no verificados en navegador. Sin Hito 9.

## Hito 9 · Preguntas frecuentes

Agregados src/faq.mjs y src/faq.css. Integración mínima en scripts/build.mjs; salida dist/index.html y dist/faq.css. Ocho preguntas y respuestas del brief, sin modificar su información técnica. Encabezado a la izquierda y lista a la derecha en desktop; una columna desde 959px. Respuestas de 15px, preguntas de 16px mobile y área táctil mínima de 72px. Sin tarjetas grandes ni imágenes nuevas.

Acordeones HTML nativos details/summary cerrados por defecto. Tab enfoca cada summary; Enter/Espacio alternan su estado mediante el navegador. Indicadores +/− decorativos con aria-hidden, CSS según [open], foco visible explícito. Sin JavaScript ni animaciones nuevas: interacción nativa sin JS y estado final inmediato con reduced-motion. No se agrega FAQ a navbar ni FAQPage/JSON-LD.

Build/checks/sintaxis correctos. Ocho detalles y ocho summaries, respuestas comparadas con el brief, IDs únicos. Comparación exacta del HTML previo quitando únicamente FAQ y su stylesheet: sin cambios. NAVFIX, tres descargas oficiales 0.7.2, GitHub, assets y módulos anteriores intactos. Responsive revisado estáticamente para 320–430px, tablet y desktop, pistas reducibles sin overflow-x:hidden. La limitación de preview supervisada previamente identificada impide verificar mouse/teclado, renderizado y scrollWidth en navegador; las interacciones se apoyan en la semántica nativa. Sin dependencias ni Hito 10.

## Hito 12 — Apoyo voluntario

Ver `HITO-12-APOYO-VISUAL-PACK.md` para alcance, archivos, previews, verificaciones y estados futuros. La colaboración permanece deshabilitada; no existe conexión a Mercado Pago en este hito.

## Hito 13A — Support API

Ver `HITO-13A-INTEGRACION-SUPPORT-API.md`. Consulta pública de configuración con manejo de fallos y reintento; colaboración y descarga del pack permanecen bloqueadas. `npm test` ejecuta las nuevas pruebas sin llamar a servicios externos.

## Actualización oficial de la web a EventDeck v0.8.0

La versión pública actual de esta entrega es **v0.8.0**. Ver `ACTUALIZACION-WEB-v0.8.0.md` para archivos, MÚSICA, descarga verificada y resultados. Los apartados anteriores son registros históricos de sus hitos; sus menciones a versiones antiguas no describen la descarga actual.
