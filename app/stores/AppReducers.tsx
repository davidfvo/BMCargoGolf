import { combineReducers } from '@reduxjs/toolkit';
import { ExampleReducer } from './example/Reducers';
import { Types as SigninTypes } from './signin/Actions';
import { SigninReducer } from './signin/Reducers';
import { SignupReducer } from "./signup/Reducers";

const appReducer = combineReducers({
  //auth && miscellanic
  signin: SigninReducer,
  signup: SignupReducer,
  example: ExampleReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === SigninTypes.LOGOUT_DESTROY_DATA) {
    state = undefined
  }
  return (appReducer(state, action))
}

export type RootState = ReturnType<typeof appReducer>
export default rootReducer;