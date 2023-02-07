import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {Notice_24} from '../../../assets/icons/svg';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {StackHeader} from '../../common_ui/headers/StackHeader';
import Margin from '../../common_ui/Margin';
import {categoryToEnglish} from './categoryList';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import Header from './Header';
import {globalVariable} from '../../common/globalVariable';
import FooiyToast from '../../common/FooiyToast';

const MenuClinicFlatlist = props => {
  const {
    setOffset,
    itemFlatListRef,
    tabIndex,
    categoryList,
    scrollY,
    headerHeight,
    tabBarHeight,
  } = props;
  const RenderItem = (item, index) => {
    return (
      <View
        style={{
          ...styles.itemContainer,
          backgroundColor: index % 2 === 0 ? '#587498' : '#E86850',
        }}>
        <Text style={styles.itemText}>
          {categoryToEnglish[categoryList[tabIndex]]}
        </Text>
      </View>
    );
  };
  const setOffsetY = e => {
    setOffset(e.nativeEvent.contentOffset.y);
  };

  const sampleData = new Array(50).fill(0);
  return (
    <Animated.FlatList
      ref={itemFlatListRef}
      data={sampleData}
      renderItem={item => <RenderItem {...item} />}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      onScrollEndDrag={setOffsetY}
      onMomentumScrollEnd={setOffsetY}
      numColumns={3}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
        useNativeDriver: true,
      })}
      contentContainerStyle={{
        paddingTop: headerHeight + tabBarHeight,
      }}
      scrollToOverflowEnabled={false}
    />
  );
};

export default MenuClinicFlatlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: fooiyColor.W,
    zIndex: 10000,
  },
  safearea_container: {
    zIndex: 1000,
    backgroundColor: fooiyColor.W,
  },
  itemContainer: {
    width: globalVariable.width / 3,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    position: 'absolute',
    width: '100%',
  },
});
