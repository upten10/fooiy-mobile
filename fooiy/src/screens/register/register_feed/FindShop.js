import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NaverMapView from 'react-native-nmap';
import {globalVariable} from '../../../common/globalVariable';
import {StackHeader} from '../../../common_ui/headers/StackHeader';
import {fooiyColor, fooiyFont} from '../../../common/globalStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';

const FindShop = props => {
  console.log(props.route.params.photo_list);
  const photo_list = props.route.params.photo_list;

  return (
    <View>
      <Text>FindShop</Text>
    </View>
  );
};

export default FindShop;

const styles = StyleSheet.create({});
