export const setDefaultValues = <T>(values: T): { [key in keyof T]: string } =>
  Object.entries(values).reduce(
    (res, [key, value]) => ({ ...res, [key]: value || '' }),
    {} as { [key in keyof T]: string }
  );

export const isValuesChange = <T extends Record<string, unknown>>(
  formValues: Partial<T>,
  originalValues?: T
): boolean => {
  if (!originalValues) {
    return true;
  }
  let res = false;
  Object.entries(formValues).forEach(([key, value]) => {
    if (originalValues[key] !== value) {
      res = true;
    }
  });
  return res;
};
