const { test, expect } = require('@playwright/test');
const validarPassword = require('../validarPassword');

test.describe('Ejercicio 3 - Validar contraseña', () => {
  test('acepta una contraseña válida', () => {
    expect(validarPassword('Clave123')).toBe(true);
  });

  test('rechaza una contraseña muy corta', () => {
    expect(validarPassword('Cla1')).toBe(false);
  });

  test('rechaza una contraseña sin mayúscula', () => {
    expect(validarPassword('clave123')).toBe(false);
  });

  test('rechaza una contraseña sin número', () => {
    expect(validarPassword('ClaveSegura')).toBe(false);
  });

  test('rechaza un texto vacío', () => {
    expect(validarPassword('')).toBe(false);
  });
});
