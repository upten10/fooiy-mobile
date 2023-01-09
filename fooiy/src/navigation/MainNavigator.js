import * as React from 'react';
import {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TabNavigator from './TabNavigator';
import Login from '../screens/Login/Login';

const MainNavigator = () => {
  const [isLogin, setisLogin] = useState(false);
  useEffect(() => {
    route();
  }, []);

  const route = async () => {
    const value = await AsyncStorage.getItem('auth');
    if (value) {
      setisLogin(true);
    }
  };

  return (
    <NavigationContainer independent={true}>
      {isLogin ? <Login /> : <Login />}
    </NavigationContainer>
  );
};

export default MainNavigator;
