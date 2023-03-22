import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useSelector} from 'react-redux';
import FooiyTI from '../mypage/setting/FooiyTI';
import FooiytiTest from './FooiytiTest';
import FooiytiTestHome from './FooiytiTestHome';
import FooiytiTestResultLoading from './FooiytiTestResultLoading';
import InformationInput from './InformationInput';

const FooiytiStack = createStackNavigator();

const FooiytiTestStackNavigation = props => {
  const insets = useSelector(state => state.insets.insets);

  return (
    <FooiytiStack.Navigator
      initialRouteName="FooiytiTestHome"
      screenOptions={{headerShown: false}}>
      <FooiytiStack.Screen name="FooiytiTestHome" component={FooiytiTestHome} />
      <FooiytiStack.Screen
        name="InformationInput"
        component={InformationInput}
      />
      <FooiytiStack.Screen name="FooiytiTest" component={FooiytiTest} />
      <FooiytiStack.Screen
        name="FooiytiTestResultLoading"
        component={FooiytiTestResultLoading}
      />
      <FooiytiStack.Screen name="FooiytiTestResult" component={FooiyTI} />
    </FooiytiStack.Navigator>
  );
};

export default FooiytiTestStackNavigation;
