const { test, expect } = require('@playwright/test');

test('agregar dos productos, eliminar uno y dejar el contador en 1', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  await expect(page).toHaveURL(/inventory\.html/);

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

  await page.locator('.shopping_cart_link').click();
  await expect(page.locator('.cart_item')).toHaveCount(2);

  await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();

  await expect(page.locator('.cart_item')).toHaveCount(1);
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});
