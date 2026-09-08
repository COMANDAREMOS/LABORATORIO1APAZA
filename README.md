# GUÍA DE LABORATORIO II - LABORATORIO1APAZA

Práctico completo de automatización de pruebas con Playwright, Jest, Postman y GitHub Actions.

## Requisitos previos

- Node.js y npm.
- Postman, si se desea ejecutar visualmente el ejercicio 4.
- Visual Studio Code u otro editor.

Desde CMD, entrar al proyecto e instalar las dependencias:

```cmd
cd /d C:\Users\HP\Downloads\LABORATORIO1APAZA
npm install
```

## Ejercicio 1 - Carrito

Archivo: `tests/carrito.spec.js`

La prueba inicia sesión en SauceDemo, agrega dos productos, elimina uno desde el carrito y verifica que el contador quede en `1`.

```cmd
npx playwright test tests/carrito.spec.js
```

Resultado esperado: `1 passed`.

## Ejercicio 2 - Prueba de aceptación

Archivos:

- `checkout.feature`: criterio de aceptación escrito en Gherkin.
- `tests/checkout.spec.js`: automatización de la compra.

La automatización realiza: login, agregar producto, abrir carrito, checkout, completar nombre, apellido y código postal, finalizar y comprobar `Thank you for your order!`.

```cmd
npx playwright test tests/checkout.spec.js
```

Resultado esperado: `1 passed`.

## Ejercicio 3 - Prueba de unidad

Archivos:

- `validarPassword.js`: función solicitada.
- `validarPassword.test.js`: cinco casos de prueba con Jest.

```cmd
npx jest
```

Resultado esperado: `5 passed`.

## Ejercicio 4 - Prueba de integración en Postman

Archivo: `integracion.postman_collection.json`.

La colección realiza estas verificaciones:

1. `GET https://jsonplaceholder.typicode.com/posts/1`.
2. `GET https://jsonplaceholder.typicode.com/posts/1/comments`.
3. Comprueba con `.every()` que todos los comentarios tengan `postId === 1`.

Ejecución visual en Postman:

1. Abrir Postman.
2. Presionar **Import**.
3. Seleccionar `integracion.postman_collection.json`.
4. Abrir la colección **Ejercicio 4 - Prueba de integración**.
5. Presionar **Run collection** y después **Run Ejercicio 4 - Prueba de integración**.

También puede comprobarse desde CMD:

```cmd
npx newman run integracion.postman_collection.json
```

Resultado esperado: dos peticiones, cuatro verificaciones y cero errores.

## Ejercicio 5 - Regresión con GitHub Actions

Archivo: `.github/workflows/regresion.yml`.

Cada `git push` ejecuta automáticamente, en este orden:

1. `npm ci`.
2. `npx playwright install --with-deps`.
3. `npx playwright test`.
4. `npx jest`.

Para comprobarlo, abrir la pestaña **Actions**, seleccionar **Suite de regresión** y entrar en la ejecución más reciente. Los pasos de Playwright y Jest deben aparecer en verde.

## Ejercicio 6 - Flujo funcional completo

Archivo: `tests/ejercicio-6-flujo-funcional.spec.js`.

Incluye el login válido, listado de productos, dos productos en el carrito,
checkout completo y el caso negativo con `locked_out_user`.

```cmd
node_modules\.bin\playwright.cmd test ejercicio-6-flujo-funcional.spec.js --headed --workers=1
```

Resultado esperado: `2 passed`.

## Ejecutar toda la suite local

```cmd
npx playwright test
npx jest
npx newman run integracion.postman_collection.json
```
