import { call, put, takeLatest } from 'redux-saga/effects';
import { GoogleResponse } from '../services/BaseApiConstants';
import ResponseCode from '../services/ResponseCode';
import SignupService from '../services/SignupService';
import SignupActions, { Types as SignupTypes } from '../stores/signup/Actions';

function* postRegister(request: any) {
  yield put(SignupActions.registerLoading())

  const firebaseResponse: GoogleResponse<any> = yield call(SignupService.firebaseCreateUser, request.payload.firebaseRequest)

  if (firebaseResponse.fail && firebaseResponse?.error?.code != "auth/email-already-in-use") {
    yield put(SignupActions.registerFailure(ResponseCode.BAD_REQUEST))
    return
  }

  yield put(SignupActions.registerSuccess(firebaseResponse.data))
}

export default [
  takeLatest(SignupTypes.POST_REGISTER, postRegister),
]