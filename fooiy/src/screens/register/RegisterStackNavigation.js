import React from 'react';
import {StyleSheet, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import {globalStyles} from '../../common/globalStyles';

import Register from './Register';
import RegisterCamera from './camera/RegisterCamera';
import ImageCrop from './camera/ImageCrop';
import Gallery from './gallery/Gallery';
import TypingContent from './typing_content/TypingContent';

const Stack = createStackNavigator();
const RegisterStackNavigation = () => {
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: '#fff'}}
      edges={Platform.OS === 'ios' ? 'top' : null}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Register"
          component={Register}
          listeners={({navigation, route}) => {
            const state = navigation.getState();
            if (state.index === 0) {
              navigation.getParent().setOptions({
                tabBarStyle: {...globalStyles.tab_bar, ...globalStyles.shadow},
              });
            }
          }}
        />
        <Stack.Screen name="RegisterCamera" component={RegisterCamera} />
        <Stack.Screen name="ImageCrop" component={ImageCrop} />

        <Stack.Screen name="Gallery" component={Gallery} />

        <Stack.Screen name="TypingContent" component={TypingContent} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default RegisterStackNavigation;
