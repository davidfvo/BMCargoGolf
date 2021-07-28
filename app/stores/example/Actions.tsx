import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  examplePayload: ['payload'],
  exampleLoading: null,
  exampleSuccess: ['getData'],
  exampleFailure: ['getError'],
});

export { Types };
export default Creators;
