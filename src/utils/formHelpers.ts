export const setDefaultValues = <T>(values: T): { [key in keyof T]: string } =>
  Object.entries(values).reduce(
    (res, [key, value]) => ({ ...res, [key]: value || '' }),
    {} as { [key in keyof T]: string }
  );
