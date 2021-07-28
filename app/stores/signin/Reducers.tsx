import { createReducer } from '@reduxjs/toolkit';
import { Types } from './Actions';
import INITIAL_STATE, { SigninInitialState } from './InitialState';

const loginLoading = (state: any, payload: SigninInitialState) => ({
  ...state,
  isLoading: true,
  error: INITIAL_STATE.error,
});

const loginSuccess = (state: any, payload: SigninInitialState) => ({
  ...state,
  user: payload.user,
  isLoading: false,
  error: INITIAL_STATE.error,
});

const loginFailure = (state: any, payload: SigninInitialState) => ({
  ...state,
  user: INITIAL_STATE.user,
  isLoading: false,
  error: payload.error,
});

const userDataSuccess = (state: any, payload: SigninInitialState) => ({
  ...state,
  user: {
    ...state.user,
    serverData: payload.userData,
  },
});

const passwordLoading = (state: any, payload: SigninInitialState) => ({
  ...state,
  passwordLoading: true,
  passwordError: INITIAL_STATE.passwordError,
});

const passwordSuccess = (state: any, payload: SigninInitialState) => ({
  ...state,
  passwordData: payload.passwordData,
  passwordLoading: false,
  passwordError: INITIAL_STATE.passwordError,
});

const passwordFailure = (state: any, payload: SigninInitialState) => ({
  ...state,
  passwordData: INITIAL_STATE.passwordData,
  passwordLoading: false,
  passwordError: payload.passwordError,
});

export const SigninReducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_LOADING]: loginLoading,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.REFRESH_USER_DATA_SUCCESS]: userDataSuccess,

  [Types.PASSWORD_RESET_LOADING]: passwordLoading,
  [Types.PASSWORD_RESET_SUCCESS]: passwordSuccess,
  [Types.PASSWORD_RESET_FAILURE]: passwordFailure,
});
