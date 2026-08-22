const { test, expect } = require('@playwright/test');

test('completar una compra y mostrar el mensaje de confirmación', async ({ page }) => {
  // 1. Abrir SauceDemo e iniciar sesión.
  await page.goto('https://www.saucedemo.com/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  await expect(page).toHaveURL(/inventory\.html/);

  // 2. Agregar al menos un producto al carrito.
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // 3. Entrar al carrito y comenzar el checkout.
  await page.locator('.shopping_cart_link').click();
  await expect(page.locator('.cart_item')).toHaveCount(1);
  await page.locator('#checkout').click();

  // 4. Completar los datos de envío.
  await page.locator('#first-name').fill('Ana');
  await page.locator('#last-name').fill('Apaza');
  await page.locator('#postal-code').fill('0000');
  await page.locator('#continue').click();

  await expect(page).toHaveURL(/checkout-step-two\.html/);

  // 5. Finalizar y verificar el mensaje solicitado.
  await page.locator('#finish').click();
  await expect(page.locator('.complete-header')).toHaveText(
    'Thank you for your order!'
  );
});
