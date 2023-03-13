import React from 'react';
import {Image} from 'react-native';
import {
  Ic_feed_G300,
  Ic_feed_P500,
  Ic_location_G300,
  Ic_location_P500,
  Ic_mypage_G300,
  Ic_mypage_P500,
  Ic_party_G300,
  Ic_party_P500,
} from './svg';

const TabBarIcon = props => {
  const name = props.name;
  const isFocused = props.isFocused;
  switch (name) {
    case '지도':
      if (isFocused) {
        return <Ic_location_P500 />;
      } else {
        return <Ic_location_G300 />;
      }
    case '피드':
      if (isFocused) {
        return <Ic_feed_P500 />;
      } else {
        return <Ic_feed_G300 />;
      }
    case '등록':
      return (
        <Image
          source={require('./images/tab_bar_register.png')}
          style={{width: 50, height: 50}}
        />
      );
    case '파티':
      if (isFocused) {
        return <Ic_party_P500 />;
      } else {
        return <Ic_party_G300 />;
      }
    case '내 정보':
      if (isFocused) {
        return <Ic_mypage_P500 />;
      } else {
        return <Ic_mypage_G300 />;
      }
    default:
      return null;
  }
};

export default TabBarIcon;
