import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  login: ['payload'],
  logout: null,
  loginLoading: null,
  loginSuccess: ['user'],
  loginFailure: ['error'],
  
  refreshUserData: ['payload'],
  refreshUserDataSuccess: ['userData'],
  
  getPasswordReset: ['payload'],
  passwordResetLoading: null,
  passwordResetSuccess: ['passwordData'],
  passwordResetFailure: ['passwordError'],
  
  logoutDestroyData: null,
});

export { Types };
export default Creators;
