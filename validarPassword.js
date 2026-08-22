function validarPassword(password) {
  if (typeof password !== 'string') {
    return false;
  }

  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password)
  );
}

module.exports = validarPassword;
