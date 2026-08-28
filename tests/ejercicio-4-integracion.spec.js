const { test, expect } = require('@playwright/test');

test.describe('Ejercicio 4 - Integración de posts y comentarios', () => {
  test('el post 1 existe y todos sus comentarios pertenecen al post 1', async ({ request, page }) => {
    // 1. Obtener la publicación con id 1.
    const respuestaPost = await request.get(
      'https://jsonplaceholder.typicode.com/posts/1'
    );

    expect(respuestaPost.ok()).toBe(true);
    const post = await respuestaPost.json();
    expect(post.id).toBe(1);

    // 2. Obtener los comentarios asociados a la publicación 1.
    const respuestaComentarios = await request.get(
      'https://jsonplaceholder.typicode.com/posts/1/comments'
    );

    expect(respuestaComentarios.ok()).toBe(true);
    const comentarios = await respuestaComentarios.json();
    expect(Array.isArray(comentarios)).toBe(true);
    expect(comentarios.length).toBeGreaterThan(0);

    // 3. Comprobar que todos los comentarios tengan postId igual a 1.
    const todosPertenecenAlPost1 = comentarios.every(
      (comentario) => comentario.postId === 1
    );

    expect(todosPertenecenAlPost1).toBe(true);

    // 4. Mostrar una evidencia visual dentro de Playwright UI.
    const paginaResultado = `
      <!doctype html>
      <html lang="es">
        <head>
          <meta charset="utf-8">
          <title>Ejercicio 4 - Integración</title>
          <style>
            body { margin: 0; padding: 48px; font-family: Arial, sans-serif; background: #f4f7f5; color: #17352b; }
            main { max-width: 720px; margin: auto; padding: 32px; background: white; border-radius: 16px; box-shadow: 0 18px 45px #17352b20; }
            h1 { margin-top: 0; }
            .dato { margin: 12px 0; padding: 14px; border-radius: 9px; background: #edf4f0; }
            .correcto { margin-top: 24px; padding: 18px; border-radius: 10px; background: #d9f66f; font-weight: bold; }
            code { color: #0e7556; }
          </style>
        </head>
        <body>
          <main>
            <h1>Ejercicio 4 - Prueba de integración</h1>
            <div class="dato"><b>GET /posts/1:</b> 200 OK - id ${post.id}</div>
            <div class="dato"><b>GET /posts/1/comments:</b> 200 OK - ${comentarios.length} comentarios</div>
            <div class="dato">Verificación: todos cumplen <code>postId === 1</code></div>
            <div class="correcto">✓ PRUEBA APROBADA</div>
          </main>
        </body>
      </html>
    `;

    await page.goto(
      `data:text/html;charset=utf-8,${encodeURIComponent(paginaResultado)}`
    );

    await expect(page.getByText('PRUEBA APROBADA')).toBeVisible();

    if (!process.env.CI) await page.waitForTimeout(5000);
  });
});
