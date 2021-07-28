import { all, takeLatest } from 'redux-saga/effects';
import { StartupTypes } from '../stores/startup/Actions';
import ExampleSaga from './ExampleSaga';
import SigninSaga from './SigninSaga';
import SignupSaga from './SignupSaga';
import startup from './StartupSaga';

export default function* root() {
  yield all([
    takeLatest(StartupTypes.STARTUP, startup),
    ...ExampleSaga,

    //Auth
    ...SigninSaga,
    ...SignupSaga,
  ]);
}
