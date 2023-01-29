import React, {useEffect} from 'react';
import {View} from 'react-native';
import NaverMap from './NaverMap';

const Map = props => {
  return (
    <View style={{flex: 1}}>
      <NaverMap center={props.route.params} />
    </View>
  );
};

export default Map;
