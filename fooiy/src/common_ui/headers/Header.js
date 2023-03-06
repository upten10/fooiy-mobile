import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';

export const Header = props => {
  const {children} = props;
  return (
    <View
      style={{
        backgroundColor: 'red',
        width: globalVariable.width,
        height: 56,
        flexDirection: 'row',
      }}>
      {children}
    </View>
  );
};

export const GoBack = props => {
  const {onPress} = props;
  return (
    <Pressable
      style={{
        backgroundColor: 'yellow',
        width: 100,
        height: 56,
      }}>
      <Text>111</Text>
    </Pressable>
  );
};

export const GoNext = props => {
  const {children, onPress} = props;
  return (
    <Pressable>
      <Text>{children}</Text>
    </Pressable>
  );
};

export const Title = props => {
  const {children} = props;
  return (
    <View style={{backgroundColor: 'blue', width: 100, height: 56}}>
      <Text>{children}</Text>
    </View>
  );
};

export const SubTitle = () => {};

export const Logo = () => {};
export const Category = () => {};
export const Icon = props => {
  const {children} = props;
  return <Pressable></Pressable>;
};

export const Group = props => {
  const {children, direction} = props;
  return (
    <View style={{flexDirection: direction, alignItems: 'center'}}>
      {children}
    </View>
  );
};

Header.GoBack = GoBack;
Header.GoNext = GoNext;
Header.Title = Title;
Header.SubTitle = SubTitle;
Header.Logo = Logo;
Header.Category = Category;
Header.Icon = Icon;
Header.Group = Group;
