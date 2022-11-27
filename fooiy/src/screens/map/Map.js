import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import NaverMap from './NaverMap';
import {LocationPermission} from '../../common/Permission';

const Map = () => {
  useEffect(() => {
    LocationPermission();
  }, []);
  return (
    <View style={{flex: 1}}>
      <NaverMap />
    </View>
  );
};

export default Map;
