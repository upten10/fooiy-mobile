import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import RootNavigator from './src/navigation/RootNavigator';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const linking = {
    prefixes: ['kakaoadeeb3a64a0ef610048dbcbe1010c07f://'],
    config: {
      screens: {
        Test: 'kakaolink',
      },
    },
  };

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer linking={linking}>
          <RootNavigator />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
