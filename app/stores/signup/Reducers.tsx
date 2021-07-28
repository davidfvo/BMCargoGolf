import { createReducer } from '@reduxjs/toolkit';
import { Types } from './Actions';
import INITIAL_STATE, { SignupInitialState } from './InitialState';

export const postLoading = (state: any, payload: SignupInitialState) => ({
  ...state,
  postLoading: true,
  postError: INITIAL_STATE.postError,
});

export const postSuccess = (state: any, payload: SignupInitialState) => ({
  ...state,
  postData: payload.postData,
  postLoading: false,
  postError: INITIAL_STATE.postError,
});

export const postFailure = (state: any, payload: SignupInitialState) => ({
  ...state,
  postData: INITIAL_STATE.postData,
  postLoading: false,
  postError: payload.postError,
});

export const SignupReducer = createReducer(INITIAL_STATE, {
  [Types.REGISTER_LOADING]: postLoading,
  [Types.REGISTER_SUCCESS]: postSuccess,
  [Types.REGISTER_FAILURE]: postFailure,
});
