import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export function isFetchBaseQueryError(
  obj: any
): obj is FetchBaseQueryError {
  return obj.status || obj.data;
}

export function handleQueryError(
  error: FetchBaseQueryError | SerializedError | undefined
): string {
  if (isFetchBaseQueryError(error)) {
    return String(error.data);
  }

  return error?.message ? String(error.message) : 'unknown error';
}
