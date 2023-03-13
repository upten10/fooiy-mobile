import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {
  Ic_arrow_bottom_regular_G800,
  Ic_search_G600,
} from '../../../assets/svg';
import {fooiyColor, fooiyFont, globalStyles} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';
import CategorySwitch from './CategorySwitch';

const MapHeader = props => {
  const insets = useSelector(state => state.insets.insets);
  const navigation = useNavigation();
  const {isCafe, setIsCafe, setShopMarkers, shopCount, sheetRef, depth} = props;

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
          borderRadius: 8,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
          marginBottom: 24,
          // paddingVertical: 18,
          ...globalStyles.shadow,
        }}>
        <Text
          style={{
            ...fooiyFont.Subtitle3,
            color: fooiyColor.G600,
          }}>
          방문할 지역을 검색해볼까요?
        </Text>
        <Ic_search_G600 />
      </TouchableOpacity>
      {/* 버튼 로우 */}
      <View
        style={{
          width: '100%',
          height: 20,
          paddingHorizontal: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {/* 맛집 카페 버튼 */}
        <CategorySwitch
          isCafe={isCafe}
          setIsCafe={setIsCafe}
          setShopMarkers={setShopMarkers}
        />
        {/* 필터 */}
        {depth < 2 ? null : (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              sheetRef.current.expand();
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: fooiyColor.W,
              borderRadius: 24,
              paddingHorizontal: 16,
              paddingVertical: 10,
              ...globalStyles.shadow,
            }}>
            <Text
              style={{
                ...fooiyFont.Subtitle3,
                color: fooiyColor.G800,
                marginRight: 4,
              }}>
              주변 {isCafe ? '카페' : '맛집'} {shopCount}개
            </Text>
            <Ic_arrow_bottom_regular_G800 />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default MapHeader;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 0 : 8,
    zIndex: 1,
    width: '100%',
    alignItems: 'center',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
});
