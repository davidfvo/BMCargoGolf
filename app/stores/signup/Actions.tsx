import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  postRegister: ['payload'],
  registerLoading: null,
  registerSuccess: ['postData'],
  registerFailure: ['postError'],
});

export { Types };
export default Creators;
