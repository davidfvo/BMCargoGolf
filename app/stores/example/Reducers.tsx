import { createReducer } from '@reduxjs/toolkit';
import { Types } from './Actions';
import INITIAL_STATE, { ExampleInitialState } from './InitialState';

const getLoading = (state: any, payload: ExampleInitialState) => ({
  ...state,
  getLoading: true,
  getError: INITIAL_STATE.getError,
});

const getSuccess = (state: any, payload: ExampleInitialState) => ({
  ...state,
  getData: payload.getData,
  getLoading: false,
  getError: INITIAL_STATE.getError,
});

const getFailure = (state: any, payload: ExampleInitialState) => ({
  ...state,
  getData: INITIAL_STATE.getData,
  getLoading: false,
  getError: payload.getError,
});

export const ExampleReducer = createReducer(INITIAL_STATE, {
  [Types.EXAMPLE_LOADING]: getLoading,
  [Types.EXAMPLE_SUCCESS]: getSuccess,
  [Types.EXAMPLE_FAILURE]: getFailure,
});
