import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackHeader} from '../../../common_ui/headers/StackHeader';

export default props => {
  console.log(props.route.params);
  return (
    <SafeAreaView>
      <StackHeader title={'파티 설정'} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
