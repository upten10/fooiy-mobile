import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';
import {categoryToKorean} from './categoryList';
import {useNavigation} from '@react-navigation/native';
import {LocationPermission} from '../../common/Permission';

const FindShopButton = props => {
  const {categoryList, tabIndex, bottomHeight} = props;
  const navigation = useNavigation();
  const onClickFindShop = async () => {
    (await LocationPermission()) &&
      navigation.navigate('MenuClinicFindShop', {
        categoryList: categoryList,
        tabIndex: tabIndex,
      });
  };
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onClickFindShop()}>
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
    lineHeight: Platform.select({ios: 0, android: null}),
  },
});
