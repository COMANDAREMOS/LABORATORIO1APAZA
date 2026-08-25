const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test('Ejercicio 5 - el workflow ejecuta Playwright y Jest', async ({ page }) => {
  const rutaWorkflow = path.join(
    __dirname,
    '..',
    '.github',
    'workflows',
    'regresion.yml'
  );

  const workflow = fs.readFileSync(rutaWorkflow, 'utf8');

  expect(workflow).toContain('npm ci');
  expect(workflow).toContain('npx playwright install --with-deps');
  expect(workflow).toContain('npx playwright test');
  expect(workflow).toContain('npx jest');

  const pagina = `
    <!doctype html>
    <html lang="es">
      <head>
        <meta charset="utf-8">
        <title>Ejercicio 5 - Regresión</title>
        <style>
          body { margin: 0; padding: 48px; font-family: Arial, sans-serif; background: #f3eef8; color: #281c35; }
          main { max-width: 720px; margin: auto; padding: 34px; background: white; border-radius: 16px; box-shadow: 0 18px 45px #321b4825; }
          h1 { margin-top: 0; }
          .paso { display: flex; align-items: center; gap: 12px; margin: 10px 0; padding: 14px; border-radius: 9px; background: #f5f0fa; }
          .paso b { display: grid; place-items: center; width: 26px; height: 26px; border-radius: 50%; background: #765295; color: white; }
          code { color: #5c377b; font-weight: bold; }
          .correcto { margin-top: 24px; padding: 18px; border-radius: 10px; background: #d9f66f; color: #174b36; font-weight: bold; }
          a { display: inline-block; margin-top: 18px; color: #5c377b; font-weight: bold; }
        </style>
      </head>
      <body>
        <main>
          <h1>Ejercicio 5 - Prueba de regresión</h1>
          <p>Un solo <code>push</code> ejecuta toda la suite automáticamente.</p>
          <div class="paso"><b>✓</b><code>npm ci</code></div>
          <div class="paso"><b>✓</b><code>npx playwright install --with-deps</code></div>
          <div class="paso"><b>✓</b><code>npx playwright test</code></div>
          <div class="paso"><b>✓</b><code>npx jest</code></div>
          <div class="correcto">✓ WORKFLOW COMPLETO - PRUEBA APROBADA</div>
          <a href="https://github.com/COMANDAREMOS/LABORATORIO1APAZA/actions" target="_blank">Ver GitHub Actions</a>
        </main>
      </body>
    </html>`;

  await page.goto(`data:text/html;charset=utf-8,${encodeURIComponent(pagina)}`);
  await expect(page.getByText('WORKFLOW COMPLETO')).toBeVisible();

  if (!process.env.CI) await page.waitForTimeout(5000);
});
