import { call, put, select, takeLatest } from 'redux-saga/effects';
import { GoogleResponse } from '../services/BaseApiConstants';
import { navigateAndReset } from '../services/NavigationService';
import ResponseCode from '../services/ResponseCode';
import SigninService from '../services/SigninService';
import deviceStorage from '../stores/DeviceStorage';
import SigninActions, { Types as SigninTypes } from '../stores/signin/Actions';

function* login(request: any) {
  yield put(SigninActions.loginLoading());
  if (!request.payload || !request.payload.email || !request.payload.password) {
    yield put(
      SigninActions.loginFailure({
        code: ResponseCode.BAD_REQUEST.code,
        message: 'El usuario y la contraseña son requeridos. Favor intentar de nuevo.',
      }),
    );
    return;
  }

  const googleResponse: GoogleResponse<any> = yield call(SigninService.emailFirebaseLogin, request.payload.email, request.payload.password)

  if (googleResponse.fail) {
    yield put(
      SigninActions.loginFailure({
        code: ResponseCode.BAD_REQUEST.code,
        message: 'Usuario o contraseña incorrectos',
      })
    );
    return;
  }

  if (googleResponse && googleResponse.data && googleResponse.data.user &&
    googleResponse.data.user._user && googleResponse.data.user._user.emailVerified == false) {
    yield call(SigninService.sendEmailVerification);
    yield call(SigninService.firebaseLogout);
    yield put(
      SigninActions.loginFailure({
        code: 15,
        message: 'Se le ha reenviado la verificacion de cuenta a su correo',
      })
    );
    return;
  }

  // const userData = yield call(SigninService.getUserData, { email: request.payload.email })

  // if (!userData.data || userData.problem) {
  //   yield put(SigninActions.loginFailure(ResponseCode.SERVER_ERROR));
  //   return;
  // }

  // if (userData.data.verificado == '0') {
  //   const userVerifyRequest = {
  //     id: userData.data.id,
  //     verificado: '1',
  //   }
  //   yield call(SigninService.verifyUserToken, userVerifyRequest)
  // }
  const result = {
    googleData: googleResponse.data,
    // serverData: { ...userData.data, firebase_token: tokenResponse.data },
    isLogged: true,
  }

  // Save the user in the storage
  yield put(SigninActions.loginSuccess(result));
  navigateAndReset('Dashboard');
}

function* refreshUserData() {
  const { user } = yield select((state) => state.signin)
  // const userData = yield call(SigninService.getUserData, { email: user?.serverData?.email })

  // if (!userData.data || userData.problem) {
  //   return;
  // }

  // yield put(SigninActions.refreshUserDataSuccess(userData.data))
}

function* getPasswordReset(request: any) {
  yield put(SigninActions.passwordResetLoading())

  // const response = yield call(SigninService.resetPassword, request.payload)

  // if (response.fail) {
  //   yield put(SigninActions.passwordResetFailure(ResponseCode.SERVER_ERROR))
  //   return
  // }

  yield put(SigninActions.passwordResetSuccess(true))
}

function* logout() {
  yield call(deviceStorage.clear);
  yield call(SigninService.firebaseLogout)
  yield put(SigninActions.logoutDestroyData())
}

export default [
  takeLatest(SigninTypes.LOGIN, login),
  takeLatest(SigninTypes.REFRESH_USER_DATA, refreshUserData),
  takeLatest(SigninTypes.GET_PASSWORD_RESET, getPasswordReset),
  takeLatest(SigninTypes.LOGOUT, logout),
]