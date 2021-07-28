export interface SignupInitialState {
  postData: object;
  postLoading: boolean;
  postError: any;
}

export default {
  postData: {},
  postLoading: false,
  postError: null,
} as SignupInitialState;