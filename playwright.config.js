const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testMatch: '**/*.spec.js',
  // El login pertenece al laboratorio anterior. Se conserva como referencia,
  // pero la interfaz muestra únicamente los ejercicios 1 al 5 de esta guía.
  testIgnore: '**/login.spec.js',
  timeout: 30_000,
  use: {
    headless: true,
    trace: 'retain-on-failure',
  },
});
