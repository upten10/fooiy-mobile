import React, {useMemo, useState, useCallback} from 'react';
import {View, StyleSheet, PanResponder, SafeAreaView} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  interpolate,
  Extrapolate,
  withTiming,
} from 'react-native-reanimated';
// import TransparentStarGroupSvg from '../assets/images/transparentStarGroup.svg';
import {TOTAL_0} from '../../../assets/icons/svg';

function Suggestion(props) {
  const [rootViewPosX, setRootViewPosX] = useState(0);
  const [starRatingImageWidth, setStarRatingImageWidth] = useState(0);
  const panX = useSharedValue(0); // 사용자의 드래그 위치를 저장하는 변수

  const starRatingWidth = useDerivedValue(() => {
    // 실제 별점의 너비를 표현하는 변수로 animated.View의 width style에 사용되는 값 입니다.
    return interpolate(
      panX.value,
      [0, starRatingImageWidth],
      [0, starRatingImageWidth],
      Extrapolate.CLAMP,
    );
  }, [starRatingImageWidth]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: starRatingWidth.value,
    };
  }, []);

  const panResponders = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => false,
        onPanResponderTerminationRequest: () => false,
        onPanResponderGrant: (event, gestureState) => {
          panX.value = gestureState.x0 + gestureState.dx - rootViewPosX; // 사용자의 초기 터치 위치 + 이동 위치 - rootView의 x 위치
        },
        onPanResponderMove: (event, gestureState) => {
          panX.value = gestureState.x0 + gestureState.dx - rootViewPosX; // 사용자의 초기 터치 위치 + 이동 위치 - rootView의 x 위치
        },
        onPanResponderRelease: (event, gestureState) => {},
        onPanResponderTerminate: (event, gestureState) => {},
        onShouldBlockNativeResponder: (evt, gestureState) => {
          return false;
        },
      }),
    [rootViewPosX, starRatingImageWidth],
  );

  const rootContainerOnLayout = useCallback(e => {
    // root Component onLayout으로 root View의 position x를 계산합니다.
    const {x} = e.nativeEvent.layout;

    setRootViewPosX(x);
  }, []);

  const starRatingImageOnLayout = useCallback(e => {
    // star Rating Image onLayout으로 별 이미지의 width를 계산합니다.
    const {width} = e.nativeEvent.layout;

    setStarRatingImageWidth(width);
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.rootContainer} onLayout={rootContainerOnLayout}>
        <View>
          <Animated.View
            style={[styles.starBackground, animatedStyle]}
            pointerEvents="none"
          />
          <View
            onLayout={starRatingImageOnLayout}
            {...panResponders.panHandlers}>
            <TOTAL_0 />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  starBackground: {
    position: 'absolute',
    backgroundColor: '#ffd800',
    height: '100%',
    minWidth: 0,
    maxWidth: 202,
  },
});

export default Suggestion;
