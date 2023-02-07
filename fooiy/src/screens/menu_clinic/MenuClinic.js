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
import {globalVariable} from '../../common/globalVariable';
import FooiyToast from '../../common/FooiyToast';
const window = Dimensions.get('window');
const tabBarHeight = 52;
const MenuClinic = () => {
  const TestFlat = props => {
    const RenderItem = (item, index) => {
      return (
        <View
          style={{
            ...styles.itemContainer,
            backgroundColor: index % 2 === 0 ? '#587498' : '#E86850',
          }}>
          <Text style={styles.itemText}>1</Text>
        </View>
      );
    };
    const sampleData = new Array(20).fill(0);
    return (
      <Animated.FlatList
        data={sampleData}
        renderItem={item => <RenderItem {...item} />}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: props.scrollY}}}],
          {useNativeDriver: true},
        )}
        contentContainerStyle={{
          paddingTop: headerHeight + tabBarHeight,
          //   marginTop: 56,
        }}
        scrollToOverflowEnabled={false}
      />
    );
  };

  const insets = useSafeAreaInsets();
  const [headerHeight, setHeaderHeight] = useState(0);
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
  return (
    <View style={styles.container}>
      <View style={[styles.safearea_container, {height: insets.top}]} />
      <View style={styles.safearea_container} />
      <View style={styles.safearea_container}>
        <StackHeader title={'메뉴 상담소'} />
      </View>

      <TestFlat scrollY={scrollY} />
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
        <TouchableOpacity onPress={() => FooiyToast.error()}>
          <View style={{backgroundColor: 'red', height: 52}} />
        </TouchableOpacity>
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
  itemContainer: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    position: 'absolute',
    width: '100%',
  },
});
