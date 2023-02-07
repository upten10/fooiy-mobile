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
import {
  categoryList,
  categoryToEnglish,
  categoryToKorean,
} from './categoryList';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import Header from './Header';
import FooiyToast from '../../common/FooiyToast';
import MenuClinicFlatlist from './MenuClinicFlatlist';
import TabView from './TabView';

const tabBarHeight = 52;
const MenuClinic = () => {
  const insets = useSafeAreaInsets();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [categories, setCategories] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const itemFlatListRef = useRef(null);
  const offsetRef = useRef(0);

  // collapsing
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
    extrapolate: 'clamp',
  });
  const tabBarTranslateY = scrollY.interpolate({
    // 위로 갈때가 input 아래로 갈때가 output
    // output 처음 값이 처음 위치
    inputRange: [0, headerHeight],
    outputRange: [headerHeight, 0],
    extrapolateRight: 'clamp',
  });
  const headerOnLayout = useCallback(event => {
    const {height} = event.nativeEvent.layout;
    setHeaderHeight(height);
  }, []);
  // collapsing

  const setOffset = value => {
    offsetRef.current = value;
  };

  const toTop = useCallback(() => {
    if (itemFlatListRef) {
      if (offsetRef.current > headerHeight) {
        offsetRef.current = headerHeight;
      }
      itemFlatListRef.current.scrollToOffset({
        offset: offsetRef.current,
        animated: true,
      });
    }
  }, [itemFlatListRef, offsetRef, headerHeight]);

  useEffect(() => {
    setCategories(categoryList);
  }, []);

  console.log(scrollY.value);

  return (
    <View style={styles.container}>
      <View style={[styles.safearea_container, {height: insets.top}]} />
      <View style={styles.safearea_container} />
      <View style={styles.safearea_container}>
        <StackHeader title={'메뉴 상담소'} />
      </View>

      <MenuClinicFlatlist
        setOffset={setOffset}
        itemFlatListRef={itemFlatListRef}
        categoryList={categoryList}
        tabIndex={tabIndex}
        scrollY={scrollY}
        headerHeight={headerHeight}
        tabBarHeight={tabBarHeight}
      />
      <Animated.View
        style={[
          styles.headerContainer,
          {marginTop: insets.top + 56},
          {
            transform: [{translateY: headerTranslateY}],
          },
        ]}
        onLayout={headerOnLayout}
        pointerEvents="box-none">
        <Header />
      </Animated.View>
      <Animated.View
        style={[
          styles.headerContainer,
          {marginTop: insets.top + 56},
          {
            transform: [{translateY: tabBarTranslateY}],
          },
        ]}
        pointerEvents="box-none">
        <TabView
          toTop={toTop}
          categoryList={categoryList}
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
        />
      </Animated.View>
    </View>
  );
};

export default MenuClinic;

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
  headerContainer: {
    position: 'absolute',
    width: '100%',
  },
});
