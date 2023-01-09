import React from 'react';
import {
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import MainNavigator from './MainNavigator';

const Test = () => {
  const navigation = useNavigation();
  const route = useRoute();
  console.log(route.params);
  return (
    <SafeAreaView>
      <Text>TESTSE</Text>
      <TouchableOpacity onPress={() => navigation.navigate(MainNavigator)}>
        <Text>TESTSE</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Test;
