import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import RegisterCamera from './camera/RegisterCamera';

const Register = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <RegisterCamera />
    </SafeAreaView>
  );
};

export default Register;
