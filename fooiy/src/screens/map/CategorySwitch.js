import React, {useRef} from 'react';
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import {
  CafeShopDark,
  CafeShopLight,
  CommonShopDark,
  CommonShopLight,
} from '../../../assets/icons/svg';
import {fooiyColor, fooiyFont, globalStyles} from '../../common/globalStyles';
import {useDebounce} from '../../common/hooks/useDebounce';

const CategorySwitch = props => {
  const swipeable = useRef(null);
  const {isCafe, setIsCafe, setShopMarkers} = props;
  const {debounceCallback, isLoading} = useDebounce({time: 200});

  const onSwipe = isCafe => {
    debounceCallback(() => {
      setIsCafe(isCafe);
      setShopMarkers([]);
    });
  };

  const renderRightActions = (dragX, index) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <Pressable onPress={() => swipeable.current.close()}>
        <View
          style={{
            width: 34,
            height: 10,
          }}></View>
      </Pressable>
    );
  };
  return (
    <View>
      <View style={styles.background}>
        <CommonShopLight />
        <CafeShopLight />
        <GestureHandlerRootView style={styles.swipeContainer}>
          <Swipeable
            containerStyle={{width: '100%'}}
            childrenContainerStyle={{flexDirection: 'row'}}
            overshootLeft={false}
            ref={swipeable}
            onSwipeableWillOpen={() => onSwipe(true)}
            onSwipeableWillClose={() => onSwipe(false)}
            renderLeftActions={dragX => renderRightActions(dragX)}>
            <Pressable
              onPress={() => swipeable.current.openLeft()}
              style={styles.swipeBtn}>
              <View style={{marginHorizontal: 2}}>
                {isCafe ? <CafeShopDark /> : <CommonShopDark />}
              </View>
              <Text style={styles.swipeBtnText}>
                {isCafe ? '카페' : '맛집'}
              </Text>
            </Pressable>
            <Pressable
              style={{
                width: 30,
                height: 30,
                borderRadius: 24,
              }}
              onPress={() => swipeable.current.openLeft()}
            />
          </Swipeable>
        </GestureHandlerRootView>
      </View>
    </View>
  );
};

export default CategorySwitch;

const styles = StyleSheet.create({
  background: {
    width: 121,
    height: 40,
    backgroundColor: fooiyColor.G600,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    ...globalStyles.shadow,
  },
  swipeContainer: {
    position: 'absolute',
    left: 4,
    width: 113,
    height: 32,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  swipeBtn: {
    width: 79,
    height: 32,
    backgroundColor: fooiyColor.W,
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  swipeBtnText: {
    marginHorizontal: 2,
    ...fooiyFont.Subtitle3,
    color: fooiyColor.G600,
    lineHeight: Platform.select({
      ios: 20,
      android: 16,
    }),
  },
});
