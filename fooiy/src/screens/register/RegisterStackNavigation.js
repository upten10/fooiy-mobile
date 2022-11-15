import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';

import Register from './Register';
import RegisterCamera from './camera/RegisterCamera';
import ImageCrop from './camera/ImageCrop';

const Stack = createStackNavigator();
const RegisterStackNavigation = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="RegisterCamera" component={RegisterCamera} />
        <Stack.Screen name="ImageCrop" component={ImageCrop} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default RegisterStackNavigation;
