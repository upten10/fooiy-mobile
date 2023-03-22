import React from 'react';
import {Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import {globalStyles} from '../../common/globalStyles';
import Register from './Register';
import {globalVariable} from '../../common/globalVariable';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();
const RegisterStackNavigation = () => {
  const insets = useSelector(state => state.insets.insets);
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
                tabBarStyle: {
                  height: globalVariable.tabBarHeight + insets.bottom,
                  ...globalStyles.tab_bar,
                  ...globalStyles.shadow,
                },
              });
            }
          }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default RegisterStackNavigation;
