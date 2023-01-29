import React from 'react';
import {Image} from 'react-native';
import {
  TabBarFeed,
  TabBarFeedFocus,
  TabBarMap,
  TabBarMapFocus,
  TabBarMypage,
  TabBarMypageFocus,
  TabBarSuggestion,
  TabBarSuggestionFocus,
} from '.';

const TabBarIcon = props => {
  const name = props.name;
  const isFocused = props.isFocused;
  switch (name) {
    case '지도':
      if (isFocused) {
        return <TabBarMapFocus />;
      } else {
        return <TabBarMap />;
      }
    case '피드':
      if (isFocused) {
        return <TabBarFeedFocus />;
      } else {
        return <TabBarFeed />;
      }
    case '등록':
      return (
        <Image
          source={require('../navigation/tab_bar_register.png')}
          style={{width: 50, height: 50}}
        />
      );
    case '파티':
      if (isFocused) {
        return <TabBarSuggestionFocus />;
      } else {
        return <TabBarSuggestion />;
      }
    case '내 정보':
      if (isFocused) {
        return <TabBarMypageFocus />;
      } else {
        return <TabBarMypage />;
      }
    default:
      return null;
  }
};

export default TabBarIcon;
