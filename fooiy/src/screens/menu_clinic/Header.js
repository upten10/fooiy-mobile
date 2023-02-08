import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {Notice_24} from '../../../assets/icons/svg';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {StackHeader} from '../../common_ui/headers/StackHeader';
import Margin from '../../common_ui/Margin';
import {
  categoryList,
  categoryToEnglish,
  categoryToKorean,
} from './categoryList';
const Header = () => {
  return (
    <>
      <Margin h={8} />
      <View style={styles.header_container}>
        <Text style={styles.header_title}>카테고리에서</Text>
        <Text style={styles.header_title}>선택해볼까요?</Text>
        <Margin h={8} />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            Toast.show({
              type: 'notification',
              text1: '가장 맛있어 보이는 카테고리를 찾아보세요!',
              text2: '카테고리를 결정하고 맛집을 빠르게 찾을 수 있어요 :)',
            })
          }>
          <View style={styles.category_button_container}>
            <Notice_24 />
            <Margin w={8} />
            <Text style={styles.header_sub_title}>카테고리 활용법</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Margin h={24} />
    </>
  );
};

export default Header;
const styles = StyleSheet.create({
  header_container: {
    marginLeft: 16,
  },
  header_title: {
    ...fooiyFont.H3,
    color: fooiyColor.B,
  },
  category_button_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header_sub_title: {
    textAlign: 'center',
    ...fooiyFont.Subtitle2,
    color: fooiyColor.G400,
  },
});
