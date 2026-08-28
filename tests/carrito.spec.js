const { test, expect } = require('@playwright/test');

test('Ejercicio 1 - agregar dos productos, eliminar uno y dejar el contador en 1', async ({ page }) => {
  // En la computadora hace pausas para poder observar la demostración.
  // En GitHub Actions no espera, para que la ejecución siga siendo rápida.
  const mostrarPaso = async () => {
    if (!process.env.CI) await page.waitForTimeout(1200);
  };

  await page.goto('https://www.saucedemo.com/');
  await mostrarPaso();
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await mostrarPaso();
  await page.locator('#login-button').click();

  await expect(page).toHaveURL(/inventory\.html/);

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  await mostrarPaso();

  await page.locator('.shopping_cart_link').click();
  await expect(page.locator('.cart_item')).toHaveCount(2);
  await mostrarPaso();

  await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();

  await expect(page.locator('.cart_item')).toHaveCount(1);
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  await mostrarPaso();
});
