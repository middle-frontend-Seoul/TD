import { SerializedError } from '@reduxjs/toolkit';

export const formatError = (error: any): SerializedError => ({ // eslint-disable-line
  name: error.name,
  message: error.message,
});

export const formatHttpError = (error: HttpError): SerializedError => ({
  name: error.name,
  message: error.response?.data.reason,
});
