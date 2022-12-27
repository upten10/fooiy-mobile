import React, {useEffect} from 'react';
import {Text} from 'react-native';

import RootNavigator from './src/navigation/RootNavigator';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import store from './src/redux/store';
import Login from './src/screens/Login/Login';
import {Provider} from 'react-redux';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  function Main() {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <RootNavigator />
        </Provider>
      </SafeAreaProvider>
    )
  }

  function Main2() {
    return (
      <SafeAreaProvider>
        <SafeAreaView>
        <Text>Login Page Test</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    )
  }

  if(false){
    return <Main />;
  } return <Login />;
};

export default App;
