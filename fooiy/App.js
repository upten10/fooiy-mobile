import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import RootNavigator from './src/navigation/RootNavigator';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {useFlipper} from '@react-navigation/devtools';

const App = () => {
  const linking = {
    prefixes: ['kakaoadeeb3a64a0ef610048dbcbe1010c07f://'],
    config: {
      screens: {
        Test: 'kakaolink',
      },
    },
  };
  const navigationRef = useNavigationContainerRef();
  useFlipper(navigationRef);

  return (
    <React.StrictMode>
      <SafeAreaProvider>
        <Provider store={store}>
          <NavigationContainer linking={linking} ref={navigationRef}>
            <RootNavigator />
            <StatusBar barStyle={'dark-content'} />
          </NavigationContainer>
        </Provider>
      </SafeAreaProvider>
    </React.StrictMode>
  );
};

export default App;
