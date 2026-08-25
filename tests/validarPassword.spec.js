const { test, expect } = require('@playwright/test');
const validarPassword = require('../validarPassword');

async function mostrarResultado(page, caso, password, resultado) {
  const passwordVisible = password === '' ? '(texto vacío)' : password;
  const pagina = `
    <!doctype html>
    <html lang="es">
      <head>
        <meta charset="utf-8">
        <title>Ejercicio 3 - Validar contraseña</title>
        <style>
          body { margin: 0; padding: 48px; font-family: Arial, sans-serif; background: #fff7dc; color: #342d18; }
          main { max-width: 680px; margin: auto; padding: 34px; background: white; border-radius: 16px; box-shadow: 0 18px 45px #6b571d24; }
          h1 { margin-top: 0; }
          .reglas { display: flex; gap: 10px; flex-wrap: wrap; margin: 20px 0; }
          .reglas span { padding: 10px 14px; border-radius: 30px; background: #f5e8b5; font-weight: bold; }
          .dato { margin: 12px 0; padding: 15px; border-radius: 9px; background: #faf5e5; }
          .correcto { margin-top: 22px; padding: 18px; border-radius: 10px; background: #d9f66f; color: #174b36; font-weight: bold; }
        </style>
      </head>
      <body>
        <main>
          <h1>Ejercicio 3 - Validar contraseña</h1>
          <div class="reglas"><span>8+ caracteres</span><span>1 mayúscula</span><span>1 número</span></div>
          <div class="dato"><b>Caso:</b> ${caso}</div>
          <div class="dato"><b>Contraseña probada:</b> ${passwordVisible}</div>
          <div class="dato"><b>Resultado de validarPassword:</b> ${resultado}</div>
          <div class="correcto">✓ PRUEBA APROBADA</div>
        </main>
      </body>
    </html>`;

  await page.goto(`data:text/html;charset=utf-8,${encodeURIComponent(pagina)}`);
  await expect(page.getByText('PRUEBA APROBADA')).toBeVisible();
  if (!process.env.CI) await page.waitForTimeout(3000);
}

test.describe('Ejercicio 3 - Validar contraseña', () => {
  test('acepta una contraseña válida', async ({ page }) => {
    const resultado = validarPassword('Clave123');
    expect(resultado).toBe(true);
    await mostrarResultado(page, 'Contraseña válida', 'Clave123', resultado);
  });

  test('rechaza una contraseña muy corta', async ({ page }) => {
    const resultado = validarPassword('Cla1');
    expect(resultado).toBe(false);
    await mostrarResultado(page, 'Muy corta', 'Cla1', resultado);
  });

  test('rechaza una contraseña sin mayúscula', async ({ page }) => {
    const resultado = validarPassword('clave123');
    expect(resultado).toBe(false);
    await mostrarResultado(page, 'Sin mayúscula', 'clave123', resultado);
  });

  test('rechaza una contraseña sin número', async ({ page }) => {
    const resultado = validarPassword('ClaveSegura');
    expect(resultado).toBe(false);
    await mostrarResultado(page, 'Sin número', 'ClaveSegura', resultado);
  });

  test('rechaza un texto vacío', async ({ page }) => {
    const resultado = validarPassword('');
    expect(resultado).toBe(false);
    await mostrarResultado(page, 'Texto vacío', '', resultado);
  });
});
