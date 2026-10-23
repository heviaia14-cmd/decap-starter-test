# HeviaWerk — Plantilla de edición independiente (Next.js + Decap CMS)

Qué es esto: una base reutilizable para que un cliente edite sus propias fotos
y textos sin tocar código y sin que tú pagues una suscripción mensual tipo
Sanity. El contenido vive en este mismo repositorio (`content/home.json`,
`content/fotos.json`) y cada cambio que el cliente guarda desde `/admin` es un
commit de git — no hay base de datos aparte.

**Aviso honesto antes de usar esto con un cliente real:** armé la estructura
de archivos y la configuración siguiendo la documentación oficial de Decap
CMS, pero no desplegué ni probé el flujo de login de punta a punta —el paso
de autenticación (más abajo) depende de piezas de terceros que cambian con el
tiempo. Pruébalo primero en un repo de prueba tuyo, de principio a fin, antes
de dárselo a un cliente.

## 0. Costo real

Software y hosting: $0 (Vercel free tier + GitHub free). El único costo es tu
tiempo la primera vez que lo armes; de ahí en adelante, cada proyecto nuevo
reutiliza este mismo esqueleto y agregas al cliente como colaborador —sin
nueva suscripción por cliente.

## 1. Subir esto a un repo de GitHub

Crea un repo nuevo (privado o público, da igual) y sube todos estos archivos
tal cual están.

## 2. Desplegar el sitio en Vercel

Import del repo en Vercel, como cualquier proyecto Next.js. Esto despliega el
sitio público Y el panel `/admin` (porque `/admin` es solo HTML estático
dentro de `public/`). Todavía no vas a poder loguearte en `/admin` —falta el
paso 3.

## 3. Habilitar el login (la parte que requiere más cuidado)

Decap con backend `github` no puede hablar directo con GitHub desde el
navegador sin exponer una clave secreta, así que necesita un pequeño servidor
intermediario (proxy OAuth) que guarde esa clave. Dos caminos, de más simple
a más flexible:

**Opción A — Netlify solo para el login (la ruta más probada).**
Netlify ofrece "Git Gateway" integrado de forma nativa, sin montar nada: creas
un sitio Netlify apuntando al mismo repo (no hace falta que sirva el sitio
público, Vercel sigue haciendo eso), activas Identity + Git Gateway en su
panel, y apuntas `base_url` en `config.yml` a ese sitio de Netlify. Es la
forma documentada oficialmente por Decap y la que menos piezas sueltas tiene.

**Opción B — Proxy OAuth propio en Vercel, sin depender de Netlify.**
Hay proyectos de la comunidad ya armados para esto (ej. los repos
`decap-cms-oauth` de `yardstick-codebase` y de `daresaydigital` en GitHub —
no los probé yo mismo, revísalos antes de usarlos). Se despliegan como un
proyecto Vercel aparte, chico, solo para el login; el sitio del cliente sigue
siendo el proyecto principal.

Para cualquiera de las dos: en GitHub vas a **Settings → Developer settings →
OAuth Apps → New OAuth App**, defines el nombre, la URL del sitio, y la
"Authorization callback URL" (la que pida la opción que elijas —Netlify o el
proxy). GitHub te da un `Client ID` y un `Client Secret`: esos van como
variables de entorno en el proyecto que maneja el login (Netlify o el proxy),
nunca en el sitio público.

## 4. Completar `config.yml`

En `public/admin/config.yml`, reemplaza:
- `repo: usuario/nombre-del-repo` → el repo real del proyecto.
- `base_url` → la URL real de Netlify o de tu proxy OAuth (paso 3).

## 5. Dar acceso al cliente

Agrégalo como colaborador del repo de GitHub con permiso **Write** (no
Admin) — así puede loguearse en `/admin` y guardar cambios, pero no puede
tocar configuración del repo ni borrarlo. Esto es la diferencia clave con
Sanity Free: aquí el cliente sí tiene un rol de "solo editar", porque el
permiso lo define GitHub, no un plan de pago.

**Una diferencia a avisarle al cliente de entrada:** necesita tener (o crear)
una cuenta gratuita de GitHub para loguearse —no es un login directo con su
correo como en Sanity. Para alguien como Ángel esto puede ser un paso extra
de fricción la primera vez; vale la pena mencionarlo al ofrecer este esquema,
no dejar que lo descubra solo.

## 6. Qué contenido es editable

- **Textos de inicio** (`content/home.json`): título, subtítulo, cuerpo.
- **Fotos** (`content/fotos.json`): lista de fotos con imagen, título y
  descripción —el cliente puede agregar o quitar fotos, no solo editar las
  que ya existen.

Para un proyecto real, amplía `config.yml` con las colecciones y campos que
ese sitio necesite —esto es el punto de partida, no el modelo final.
