import React from 'react';
import {StyleSheet, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';

import Register from './Register';
import RegisterCamera from './camera/RegisterCamera';
import ImageCrop from './camera/ImageCrop';
import Gallery from './gallery/Gallery';
import TypingContent from './typing_content/TypingContent';

const Stack = createStackNavigator();
const RegisterStackNavigation = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}} edges="top">
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Register"
          component={Register}
          listeners={({navigation, route}) => {
            const state = navigation.getState();
            if (state.index === 0) {
              navigation.getParent().setOptions({
                tabBarStyle: {...styles.tab_bar, ...styles.shadow},
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

const styles = StyleSheet.create({
  tab_bar: {
    position: 'absolute',
    height: 90,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 0,
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 0.15, // 낮을수록 진해짐
        },
        shadowOpacity: 0.3, // 높을수록 진해짐
        shadowRadius: 5,
      },
      android: {
        elevation: 6,
      },
    }),
  },
});
