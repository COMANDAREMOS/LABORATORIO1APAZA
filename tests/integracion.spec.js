const { test, expect } = require('@playwright/test');

test.describe('Ejercicio 4 - Integración de posts y comentarios', () => {
  test('el post 1 existe y todos sus comentarios pertenecen al post 1', async ({ request }) => {
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
  });
});
