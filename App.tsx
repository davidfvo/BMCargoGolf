import React from 'react';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Loading from './app/components/screen-loading/ScreenLoading';
import RootScreen from './app/containers/root/RootScreen';
import rootSaga from './app/sagas';
import configureStore from './app/stores';

enableScreens(true);

const { runSaga, store, persistor } = configureStore();
runSaga(rootSaga);

export default () => (
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <RootScreen />
    </PersistGate>
  </Provider>
);