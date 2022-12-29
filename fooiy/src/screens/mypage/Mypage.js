import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import MypageFeed from './MypageFeed';
import {globalVariable} from '../../common/globalVariable';
import {SafeAreaView} from 'react-native-safe-area-context';

function Mypage() {
  return (
    <SafeAreaView
      style={styles.rootContainer}
      edges={Platform.OS === 'ios' ? 'top' : null}>
      <MypageFeed />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    width: globalVariable.width,
    height: globalVariable.height * 0.5,
  },
});

export default Mypage;
