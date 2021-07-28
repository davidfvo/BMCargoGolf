import { ApiErrorResponse as ApiSauceErrorResponse, ApiOkResponse } from 'apisauce';

export interface ErrorResponse {
  code: string;
  message: string;
}

//Base api Types
type ApiErrorResponse = Omit<ApiSauceErrorResponse<ErrorResponse>, 'problem'> & {
  problem: ErrorResponse,
}

export type ApiResponse<T> = ApiErrorResponse | ApiOkResponse<T>

//Firebase Types
interface GoogleErrorResponse<U> {
  code: string,
  success: boolean,
  fail: boolean,
  data?: U,
  error: ErrorResponse,
}

interface GoogleOkResponse<T> {
  code: string,
  success: boolean,
  fail: boolean,
  data?: T,
  error: null,
}

export type GoogleResponse<T, U = T> = GoogleErrorResponse<U> | GoogleOkResponse<T>