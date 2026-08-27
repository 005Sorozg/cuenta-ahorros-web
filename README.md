# Sistema de Cuenta de Ahorros — Interfaz Gráfica (Web)

Interfaz gráfica en el navegador para el sistema de cuenta de ahorros: depositar,
retirar y consultar saldo, aplicando las reglas de negocio, con botones en vez de
comandos de texto.

## Regla de negocio

- El monto de depósito debe ser mayor que cero.
- El monto de retiro debe ser mayor que cero.
- No se permite retirar un valor superior al saldo disponible.
- El saldo nunca puede ser negativo.

## Requerimientos funcionales

- [x] Depositar dinero
- [x] Retirar dinero
- [x] Consultar el saldo (siempre visible en pantalla)
- [x] Validar saldo insuficiente al intentar retirar

## Estructura del proyecto

```
cuenta-ahorros-web/
├── index.html      # Estructura de la página (HTML)
├── style.css       # Apariencia visual (CSS)
├── app.js          # Lógica del programa (JavaScript)
└── README.md
```

No necesitas instalar nada (ni Node.js, ni npm) para usarlo: solo un navegador.
Los 3 archivos deben estar **en la misma carpeta**, porque `index.html` los
enlaza por nombre (`<link href="style.css">` y `<script src="app.js">`).

---

## Cómo abrirlo

Simplemente haz **doble clic** sobre `index.html`, o desde VS Code haz clic derecho
sobre el archivo y elige **"Open with Live Server"** (si tienes esa extensión) o
**"Reveal in File Explorer"** y ábrelo manualmente.

También puedes arrastrar el archivo directamente a una ventana de tu navegador
(Chrome, Edge, Firefox).

---

## Cómo está construido el proyecto, parte por parte

### Parte 1 — `index.html`: la estructura de la pantalla

Contiene dos "pantallas" que se muestran una a la vez:

- `<section id="setup">` — el formulario inicial para escribir el saldo con el
  que se abre la cuenta.
- `<section id="account">` — la pantalla principal, con el saldo grande arriba
  y los botones de **Depositar** / **Retirar**.

Debajo de las dos, hay una lista `<ul id="ledger-list">` que funciona como el
**historial de movimientos** (como la libreta de un banco).

En el `<head>` se enlaza `style.css`, y al final del `<body>` se enlaza `app.js`.

### Parte 2 — `style.css`: la apariencia

Todo el estilo visual. Usa variables de color (`--teal`, `--gold`, etc.)
definidas una sola vez en `:root`, para que sea fácil cambiar los colores de
todo el diseño desde un solo lugar.

### Parte 3 — `app.js`: la lógica (idéntica a la regla de negocio)

```javascript
let saldo = 0;

function depositar(monto) { ... }
function retirar(monto) { ... }
```

Estas son las mismas reglas de negocio de la diapositiva, ahora conectadas a
botones en vez de a un menú de texto:

- Cada botón (`btn-create`, `btn-deposit`, `btn-withdraw`) tiene un
  `addEventListener("click", ...)`, que es como decirle a JavaScript:
  "cuando hagan clic aquí, ejecuta esta función".
- Cuando el resultado de `depositar()` o `retirar()` es válido (`ok: true`),
  se actualiza el saldo en pantalla y se agrega una línea nueva al historial.
- Cuando no es válido (`ok: false`), se agrega igual una línea al historial,
  pero en rojo, mostrando el error (por ejemplo "Saldo insuficiente").

---

## Requisitos

- Un navegador web (Chrome, Edge, Firefox, etc.) — no necesitas instalar nada más.
- [Git](https://git-scm.com/).
- [Visual Studio Code](https://code.visualstudio.com/).
- Una cuenta de [GitHub](https://github.com/).

---

## Guía: subir este proyecto con Git, GitHub y VS Code

### 1. Abrir el proyecto en VS Code

```bash
cd cuenta-ahorros-web
code .
```

### 2. Inicializar el repositorio local con Git

Abre la terminal integrada de VS Code (`Ctrl + ñ` o `Terminal > New Terminal`) y ejecuta:

```bash
git init
git add .
git commit -m "feat: interfaz gráfica del sistema de cuenta de ahorros"
```

### 3. Crear el repositorio en GitHub

1. Entra a [github.com](https://github.com) e inicia sesión.
2. Haz clic en **New repository**.
3. Ponle un nombre, por ejemplo `cuenta-ahorros-web`.
4. **No** marques la opción de crear README (ya tienes uno local) para evitar conflictos.
5. Haz clic en **Create repository**.

### 4. Conectar el repositorio local con GitHub

GitHub te mostrará comandos similares a estos (reemplaza `tu-usuario`):

```bash
git remote add origin https://github.com/tu-usuario/cuenta-ahorros-web.git
git branch -M main
git push -u origin main
```

### 5. Ver el proyecto en línea (opcional, con GitHub Pages)

Como es solo HTML/CSS/JS, puedes publicarlo gratis con GitHub Pages:

1. En tu repositorio de GitHub, ve a **Settings > Pages**.
2. En "Branch", elige `main` y la carpeta `/ (root)`.
3. Guarda. En un par de minutos tu proyecto quedará disponible en una URL
   pública, sin necesidad de servidor.

### 6. Flujo de trabajo recomendado (para futuros cambios)

```bash
git checkout -b feature/nueva-funcionalidad   # crear una rama
# ... haces cambios ...
git add .
git commit -m "feat: descripción del cambio"
git push -u origin feature/nueva-funcionalidad
```

Luego abres un **Pull Request** en GitHub para revisar e integrar los cambios a `main`.
