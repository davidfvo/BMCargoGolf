import { ErrorObject } from '../StoreConstants';

export interface SigninInitialState {
  user: any,
  isLoading: boolean,
  error: ErrorObject,

  userData: any,

  passwordData: boolean,
  passwordLoading: boolean,
  passwordError: ErrorObject,
}

export default {
  user: {
    googleData: undefined,
    serverData: {},
    isLogged: false,
  },
  isLoading: false,
  error: null,

  userData: {},

  passwordData: false,
  passwordLoading: false,
  passwordError: null,
} as SigninInitialState;
