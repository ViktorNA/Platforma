/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {View} from 'react-native';

import {connectToPlatform, enableBt} from './src/utils/btUtils.js';
import DGV from './src/components/DrawGraphView/DrawGraphView.js';
import {Provider} from 'react-redux';
import store from './src/store/store';
import MainRouter from './src/routes/MainRouter';
import {addPointsMock} from './src/utils/mocks';
import * as encoding from 'text-encoding';

const App: () => React$Node = () => {
  const requestEnable = async () => {
    await enableBt();
  };

  useEffect(() => {
    // requestEnable();
    // addPointsMock();
  }, []);
  return (
    <Provider store={store}>
      <View>
        <MainRouter />
      </View>
    </Provider>
  );
};

export default App;
