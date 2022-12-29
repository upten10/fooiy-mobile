import React, {useEffect, useState} from 'react';

import RootNavigator from './src/navigation/RootNavigator';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from './src/redux/store';
import Login from './src/screens/Login/Login';
import {Provider} from 'react-redux';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const [isLogin, setisLogin] = useState(false);
  useEffect(() => {
    route();
  }, []);

  const route = async () => {
    const value = await AsyncStorage.getItem('token');
    if (value) {
      setisLogin(true);
    }
  };

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        {isLogin ? <RootNavigator /> : <Login />}
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
