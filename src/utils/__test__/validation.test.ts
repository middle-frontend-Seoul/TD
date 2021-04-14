import { isValidLogin, isValidEmail } from '../validation';

describe('utils validation', () => {
  test('isValidLogin', () => {
    expect(isValidLogin('MyLogin99')).toBe(true);
    expect(isValidLogin('MyLogin99!')).toBe(false);
  });

  test('isValidEmail', () => {
    expect(isValidEmail('test@email.com')).toBe(true);
    expect(isValidEmail('sub.test@email.com')).toBe(true);
    expect(isValidEmail('123456@email.com')).toBe(true);
    expect(isValidEmail('123456email.com')).toBe(false);
    expect(isValidEmail('123456@email.c')).toBe(false);
    expect(isValidEmail('123456@email')).toBe(false);
    expect(isValidEmail('@email.com')).toBe(false);
  });
});
