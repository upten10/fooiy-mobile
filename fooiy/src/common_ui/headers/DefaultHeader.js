import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Logo} from '../../../assets/icons/svg';

export const DefaultHeader = () => {
  return (
    <View style={styles.header_container}>
      <Logo />
    </View>
  );
};

const styles = StyleSheet.create({
  header_container: {
    height: 56,
    justifyContent: 'center',
    paddingLeft: 24,
  },
});
