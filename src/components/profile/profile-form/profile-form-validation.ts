import {
  isPasswordEqual,
  isValidEmail,
  isValidLogin,
  isValidPassword,
  validationMessages,
} from 'utils/validation';

export const validation = (
  values: Record<string, string>
): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!values.login) {
    errors.login = validationMessages.isRequire;
  } else if (!isValidLogin(values.login)) {
    errors.login = validationMessages.invalidFormat;
  }
  if (!values.email) {
    errors.email = validationMessages.isRequire;
  } else if (!isValidEmail(values.email)) {
    errors.email = validationMessages.invalidFormat;
  }

  if (values.newPassword && !values.newPassword2) {
    errors.newPassword2 = validationMessages.isRequire;
  }
  if (!values.newPassword && values.newPassword2) {
    errors.newPassword = validationMessages.isRequire;
  }
  if (
    values.newPassword &&
    values.newPassword2 &&
    !isPasswordEqual(values.newPassword, values.newPassword2)
  ) {
    errors.newPassword2 = validationMessages.noEqualPasswords;
  }
  if (values.newPassword && !isValidPassword(values.newPassword)) {
    errors.newPassword = validationMessages.passwordLength;
  }
  if (values.newPassword && values.newPassword2 && !values.oldPassword) {
    errors.oldPassword = validationMessages.isRequire;
  }

  return errors;
};
