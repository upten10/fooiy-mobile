import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {Ic_info_G400} from '../../../assets/svg';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import Margin from '../../common_ui/Margin';
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
            <Ic_info_G400 />
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
