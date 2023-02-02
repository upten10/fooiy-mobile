import React from 'react';
import {View} from 'react-native';

const Margin = props => {
  const {h, w} = props;
  return (
    <View style={{marginTop: h !== 0 ? h : 0, marginLeft: w !== 0 ? w : 0}} />
  );
};

export default Margin;
