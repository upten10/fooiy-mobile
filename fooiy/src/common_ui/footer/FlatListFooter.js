import React from 'react';
import {View} from 'react-native';
import {globalVariable} from '../../common/globalVariable';

const FlatListFooter = props => {
  const {h} = props;
  if (props === undefined) {
    return (
      <View
        style={{
          height: globalVariable.tabBarHeight,
        }}></View>
    );
  } else {
    return (
      <View
        style={{
          height: h,
        }}></View>
    );
  }
};

export default FlatListFooter;
