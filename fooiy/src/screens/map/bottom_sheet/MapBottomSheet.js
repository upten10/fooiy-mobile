import React, {useCallback, useRef, useMemo, useState} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

import {globalVariable} from '../../../common/globalVariable';
import {fooiyColor, fooiyFont} from '../../../common/globalStyles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FlatList} from 'react-native-gesture-handler';
import CatalogedList from './CatalogedList';

const MapBottomSheet = props => {
  const {screenLocation, isCafe, sheetRef} = props;

  const categoryList = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isOpend, setIsOpend] = useState(false);
  const insets = useSafeAreaInsets();

  const snapPoints = useMemo(
    () => [
      globalVariable.tabBarHeight + 54 + insets.bottom,
      globalVariable.height - 8 - insets.top,
    ],
    [insets.top, insets.bottom],
  );

  const handleSheetChange = useCallback(
    index => {
      if (index === 0) {
        setIsOpend(false);
      } else {
        setIsOpend(true);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [screenLocation],
  );

  const renderScene = ['personalize', 'popular'];
  const renderItem = item => {
    return (
      <CatalogedList
        {...item}
        isCafe={isCafe}
        isOpend={isOpend}
        screenLocation={screenLocation}
        setCurrentIndex={setCurrentIndex}
      />
    );
  };

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      containerStyle={{zIndex: 5}}
      onChange={handleSheetChange}>
      <Text style={styles.title}>주변 {isCafe ? '카페' : '맛집'} 리스트</Text>
      <View style={styles.bodyContainer}>
        <Pressable
          style={styles.categoryTab}
          onPress={() => {
            categoryList.current.scrollToIndex({
              index: 0,
              animated: true,
              viewOffset: 100,
            });
            setCurrentIndex(0);
          }}>
          <Text
            style={{
              ...fooiyFont.Subtitle1,
              color: currentIndex === 0 ? fooiyColor.G800 : fooiyColor.G400,
              marginTop: 8,
            }}>
            내 푸이티아이순
          </Text>
        </Pressable>
        <Pressable
          style={styles.categoryTab}
          onPress={() => {
            categoryList.current.scrollToIndex({
              index: 1,
              animated: true,
            });
            setCurrentIndex(1);
          }}>
          <Text
            style={{
              ...fooiyFont.Subtitle1,
              color: currentIndex === 1 ? fooiyColor.G800 : fooiyColor.G400,
            }}>
            전체 인기순
          </Text>
        </Pressable>
      </View>
      <View style={{width: globalVariable.width}}>
        <View
          style={[
            styles.indicator,
            {
              marginLeft:
                currentIndex === 0
                  ? (globalVariable.width / 2 - 62) / 2
                  : globalVariable.width - (globalVariable.width / 2 - 68),
            },
          ]}
        />
      </View>
      <FlatList
        ref={categoryList}
        data={renderScene}
        renderItem={renderItem}
        numColumns={1}
        horizontal
        pagingEnabled
        // bounces={false}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{width: 16 - 7.5}}></View>}
        ListHeaderComponent={() => <View style={{width: 16 - 7.5}}></View>}
        ListFooterComponent={() => <View style={{width: 16 - 7.5}}></View>}
        onMomentumScrollEnd={event => {
          const index = Math.floor(
            (Math.floor(event.nativeEvent.contentOffset.x) * 2) /
              Math.floor(event.nativeEvent.layoutMeasurement.width),
          );
          setCurrentIndex(index);
        }}
      />
    </BottomSheet>
  );
};

export default MapBottomSheet;

const styles = StyleSheet.create({
  bodyContainer: {
    flexDirection: 'row',
    backgroundColor: fooiyColor.W,
    paddingBottom: 12,
  },
  title: {
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 16,
    ...fooiyFont.Subtitle2,
  },
  categoryTab: {
    width: globalVariable.width / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: 62,
    height: 4,
    backgroundColor: fooiyColor.B,
    borderRadius: 4,
  },
});
