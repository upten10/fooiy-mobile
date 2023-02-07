import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';
import {categoryToKorean} from './categoryList';

const FindShopButton = props => {
  const {categoryList, tabIndex, bottomHeight} = props;
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => console.warn(123)}>
      <View style={[styles.container, {bottom: bottomHeight}]}>
        <Text style={styles.find_shop_text}>
          '{categoryToKorean[categoryList[tabIndex]]}' 주변 맛집 찾기
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FindShopButton;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    marginHorizontal: 16,
    height: 56,
    backgroundColor: fooiyColor.P500,
    justifyContent: 'center',
    width: globalVariable.width - 32,
    alignItems: 'center',
    borderRadius: 8,
  },
  find_shop_text: {
    textAlign: 'center',
    ...fooiyFont.Button,
    color: fooiyColor.W,
    lineHeight: Platform.select({ios: 0, android: 16}),
  },
});
