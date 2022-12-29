import React, {useEffect} from 'react';
import {View} from 'react-native';
import NaverMap from './NaverMap';
import {LocationPermission} from '../../common/Permission';

const Map = () => {
  return (
    <View style={{flex: 1}}>
      <NaverMap />
    </View>
  );
};

export default Map;
