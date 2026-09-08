const { test, expect } = require('@playwright/test');

const URL = 'https://www.saucedemo.com/';
const PASSWORD = 'secret_sauce';

async function pausaVisual(page) {
  if (!process.env.CI) await page.waitForTimeout(1000);
}

test.describe('Ejercicio 6 - Flujo funcional completo', () => {
  test('login, dos productos, carrito y checkout exitoso', async ({ page }) => {
    // 1. Iniciar sesión con credenciales válidas.
    await page.goto(URL);
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill(PASSWORD);
    await pausaVisual(page);
    await page.locator('#login-button').click();

    // Validar que se muestra el listado de productos.
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('.title')).toHaveText('Products');
    await expect(page.locator('.inventory_item')).toHaveCount(6);
    await pausaVisual(page);

    // 2. Agregar dos productos y validar el contador del carrito.
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    await pausaVisual(page);

    // 3. Abrir el carrito y completar el checkout.
    await page.locator('.shopping_cart_link').click();
    await expect(page.locator('.cart_item')).toHaveCount(2);
    await page.locator('#checkout').click();

    await page.locator('#first-name').fill('Vicente');
    await page.locator('#last-name').fill('Apaza');
    await page.locator('#postal-code').fill('0000');
    await pausaVisual(page);

    await page.locator('#continue').click();
    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await page.locator('#finish').click();

    // Validar el mensaje de confirmación de compra.
    await expect(page.locator('.complete-header')).toHaveText(
      'Thank you for your order!'
    );
    await pausaVisual(page);
  });

  test('rechaza el inicio de sesión del usuario bloqueado', async ({ page }) => {
    // 4. Caso negativo con locked_out_user.
    await page.goto(URL);
    await page.locator('#user-name').fill('locked_out_user');
    await page.locator('#password').fill(PASSWORD);
    await pausaVisual(page);
    await page.locator('#login-button').click();

    const mensajeError = page.locator('[data-test="error"]');
    await expect(mensajeError).toBeVisible();
    await expect(mensajeError).toContainText(
      'Sorry, this user has been locked out.'
    );
    await pausaVisual(page);
  });
});
