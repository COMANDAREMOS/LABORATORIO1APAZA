# LABORATORIO1APAZA

Práctico de pruebas de software.

## Entregables

1. Prueba del carrito con Playwright.
2. Prueba de aceptación con Gherkin y Playwright.
3. Prueba unitaria de contraseñas con Jest.
4. Prueba de integración mediante una colección de Postman.
5. Suite de regresión con GitHub Actions.

## Ejecución

```bash
npm ci
npx playwright install
npx playwright test
npx jest
npx --yes newman run integracion.postman_collection.json
```
