const validarPassword = require('./validarPassword');

test('acepta una contraseña válida', () => {
  expect(validarPassword('Clave123')).toBe(true);
});

test('rechaza una contraseña de menos de 8 caracteres', () => {
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
