export const validationMessages = {
  isRequire: 'Required',
  invalidFormat: 'Invalid format',
  passwordLength: '5 characters minimum',
  noEqualPasswords: 'Passwords do not match',
};

export function isValidLogin(value: string): boolean {
  return Boolean(value) && /^[A-Za-z0-9]*$/.test(value);
}

export function isValidEmail(value: string): boolean {
  return (
    Boolean(value) && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  );
}

export function isValidPassword(value: string): boolean {
  return Boolean(value) && /^.{5,}$/.test(value);
}

export function isValidPhone(value: string): boolean {
  return Boolean(value) && /^[0-9]*$/.test(value);
}

export function isPasswordEqual(
  password: string,
  passwordRepeated: string
): boolean {
  return password === passwordRepeated;
}
