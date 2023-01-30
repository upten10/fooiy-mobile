import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {fooiyColor, globalStyles} from '../../common/globalStyles';

const MapHeader = () => {
  const insets = useSelector(state => state.insets.insets);
  return (
    <View
      style={{
        ...styles.container,
        height: 136 + insets.top,
      }}>
      {/* 검색 */}
      <View></View>
      {/* 버튼 로우 */}
      <View>
        {/* 맛집 카페 버튼 */}
        <View></View>
        {/* 필터 */}
        <View></View>
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
    backgroundColor: fooiyColor.W,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    ...globalStyles.shadow,
  },
});
