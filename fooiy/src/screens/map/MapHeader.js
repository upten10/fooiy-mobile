import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {SearchDark} from '../../../assets/icons/svg';
import {fooiyColor, fooiyFont, globalStyles} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';
import CategorySwitch from './CategorySwitch';

const MapHeader = props => {
  const insets = useSelector(state => state.insets.insets);
  const navigation = useNavigation();
  const {isCafe, setIsCafe} = props;

  return (
    <View
      style={{
        ...styles.container,
        height: 136 + insets.top,
      }}>
      <View style={{width: '100%', height: insets.top}}></View>
      {/* 검색 */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Search')}
        style={{
          backgroundColor: fooiyColor.W,
          width: globalVariable.width - 32,
          height: 56,
          marginTop: 8,
          marginBottom: 16,
          borderRadius: 8,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
          // paddingVertical: 18,
        }}>
        <Text
          style={{
            ...fooiyFont.Subtitle3,
            color: fooiyColor.G600,
          }}>
          먹고싶은 음식을 검색해볼까요?
        </Text>
        <SearchDark />
      </TouchableOpacity>
      {/* 버튼 로우 */}
      <View
        style={{
          width: '100%',
          paddingHorizontal: 16,
        }}>
        {/* 맛집 카페 버튼 */}
        <CategorySwitch isCafe={isCafe} setIsCafe={setIsCafe} />
        {/* 필터 */}
        <Pressable>
          <Text>주변 카페 n개</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MapHeader;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    width: '100%',
    alignItems: 'center',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    ...globalStyles.shadow,
  },
});
