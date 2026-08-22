const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testMatch: '**/*.spec.js',
  timeout: 30_000,
  use: {
    headless: true,
    trace: 'retain-on-failure',
  },
});
