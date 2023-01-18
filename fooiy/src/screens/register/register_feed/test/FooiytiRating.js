import React, {useMemo, useState, useRef, useCallback, useEffect} from 'react';
import {View, StyleSheet, PanResponder, Image, Text} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  interpolate,
  Extrapolate,
  withTiming,
} from 'react-native-reanimated';
import {fooiyColor, fooiyFont} from '../../../../common/globalStyles';
import {globalVariable} from '../../../../common/globalVariable';
import {SliderEI_0} from '../../../../../assets/icons/svg';
import {SliderEI_1} from '../../../../../assets/icons/svg';
import {SliderEI_2} from '../../../../../assets/icons/svg';
import {SliderEI_3} from '../../../../../assets/icons/svg';
import {SliderEI_4} from '../../../../../assets/icons/svg';
import {SliderSN_0} from '../../../../../assets/icons/svg';
import {SliderSN_1} from '../../../../../assets/icons/svg';
import {SliderSN_2} from '../../../../../assets/icons/svg';
import {SliderSN_3} from '../../../../../assets/icons/svg';
import {SliderSN_4} from '../../../../../assets/icons/svg';
import {SliderTF_0} from '../../../../../assets/icons/svg';
import {SliderTF_1} from '../../../../../assets/icons/svg';
import {SliderTF_2} from '../../../../../assets/icons/svg';
import {SliderTF_3} from '../../../../../assets/icons/svg';
import {SliderTF_4} from '../../../../../assets/icons/svg';
import {SliderAC_0} from '../../../../../assets/icons/svg';
import {SliderAC_1} from '../../../../../assets/icons/svg';
import {SliderAC_2} from '../../../../../assets/icons/svg';
import {SliderAC_3} from '../../../../../assets/icons/svg';
import {SliderAC_4} from '../../../../../assets/icons/svg';
import {SliderTOTAL_0} from '../../../../../assets/icons/svg';
import {SliderTOTAL_1} from '../../../../../assets/icons/svg';
import {SliderTOTAL_2} from '../../../../../assets/icons/svg';
import {SliderTOTAL_3} from '../../../../../assets/icons/svg';
import {SliderTOTAL_4} from '../../../../../assets/icons/svg';

// const margin = 56;

const leftBarColor = 'red';
const rightBarColor = 'blue';
const imogiSize = 40;

function FooiytiRating(props) {
  console.log('rendering FooiytiRating');
  const {
    left,
    right,
    leftText,
    rightText,
    fooiytiRating,
    setFooiytiRating,
    type,
    margin,
  } = props;
  const [rootViewPosX, setRootViewPosX] = useState(0);

  const fooiytiRatingWidth = globalVariable.width - margin * 2 - 40;
  const step = useMemo(() => fooiytiRatingWidth * 0.25, [fooiytiRatingWidth]);
  const panX = useSharedValue(fooiytiRatingWidth / 2); // 사용자의 드래그 위치를 저장하는 변수

  // useEffect(() => {
  //   setFooiytiRating(rating);
  // }, [FooiytiRating]);

  const FooiytiImogi = () => {
    if (type === 'EI' && fooiytiRating === 0) {
      return <SliderEI_0 />;
    } else if (type === 'EI' && fooiytiRating === 1) {
      return <SliderEI_1 />;
    } else if (type === 'EI' && fooiytiRating === 2) {
      return <SliderEI_2 />;
    } else if (type === 'EI' && fooiytiRating === 3) {
      return <SliderEI_3 />;
    } else if (type === 'EI' && fooiytiRating === 4) {
      return <SliderEI_4 />;
    } else if (type === 'SN' && fooiytiRating === 0) {
      return <SliderSN_0 />;
    } else if (type === 'SN' && fooiytiRating === 1) {
      return <SliderSN_1 />;
    } else if (type === 'SN' && fooiytiRating === 2) {
      return <SliderSN_2 />;
    } else if (type === 'SN' && fooiytiRating === 3) {
      return <SliderSN_3 />;
    } else if (type === 'SN' && fooiytiRating === 4) {
      return <SliderSN_4 />;
    } else if (type === 'TF' && fooiytiRating === 0) {
      return <SliderTF_0 />;
    } else if (type === 'TF' && fooiytiRating === 1) {
      return <SliderTF_1 />;
    } else if (type === 'TF' && fooiytiRating === 2) {
      return <SliderTF_2 />;
    } else if (type === 'TF' && fooiytiRating === 3) {
      return <SliderTF_3 />;
    } else if (type === 'TF' && fooiytiRating === 4) {
      return <SliderTF_4 />;
    } else if (type === 'AC' && fooiytiRating === 0) {
      return <SliderAC_0 />;
    } else if (type === 'AC' && fooiytiRating === 1) {
      return <SliderAC_1 />;
    } else if (type === 'AC' && fooiytiRating === 2) {
      return <SliderAC_2 />;
    } else if (type === 'AC' && fooiytiRating === 3) {
      return <SliderAC_3 />;
    } else if (type === 'AC' && fooiytiRating === 4) {
      return <SliderAC_4 />;
    } else if (type === 'TOTAL' && fooiytiRating === 0) {
      return <SliderTOTAL_0 />;
    } else if (type === 'TOTAL' && fooiytiRating === 1) {
      return <SliderTOTAL_1 />;
    } else if (type === 'TOTAL' && fooiytiRating === 2) {
      return <SliderTOTAL_2 />;
    } else if (type === 'TOTAL' && fooiytiRating === 3) {
      return <SliderTOTAL_3 />;
    } else if (type === 'TOTAL' && fooiytiRating === 4) {
      return <SliderTOTAL_4 />;
    }
  };
  const position = [0 * step, 1 * step, 2 * step, 3 * step, 4 * step];
  // 왼쪽 푸이티아이 비율 표시하는 부분 넓이
  const leftRatingWidth = useDerivedValue(() => {
    return interpolate(
      panX.value,
      [0, fooiytiRatingWidth],
      [0, fooiytiRatingWidth],
      Extrapolate.CLAMP,
    );
  }, []);
  const leftFooiytiStyle = useAnimatedStyle(() => {
    return {
      width: leftRatingWidth.value,
    };
  }, []);

  // 오른쪽 푸이티아이 비율 표시하는 부분 넓이
  const rightRatingWidth = useDerivedValue(() => {
    return interpolate(
      fooiytiRatingWidth - panX.value,
      [0, fooiytiRatingWidth],
      [0, fooiytiRatingWidth],
      Extrapolate.CLAMP,
    );
  }, []);
  const rightFooiytiStyle = useAnimatedStyle(() => {
    return {
      width: rightRatingWidth.value,
      marginLeft: panX.value > 0 ? panX.value : 0,
    };
  }, []);

  // 이모지 스타일
  const imogiStyle = useAnimatedStyle(() => {
    if (panX.value > 0 && panX.value < fooiytiRatingWidth) {
      return {
        marginLeft: panX.value - imogiSize / 2 + 8,
      };
    }
  }, []);

  const dot1Style = useAnimatedStyle(() => {
    return {
      marginLeft: position[1],
      backgroundColor: panX.value >= position[1] ? leftBarColor : rightBarColor,
    };
  }, []);
  const dot2Style = useAnimatedStyle(() => {
    return {
      marginLeft: position[2],
      backgroundColor: panX.value >= position[2] ? leftBarColor : rightBarColor,
    };
  }, []);
  const dot3Style = useAnimatedStyle(() => {
    return {
      marginLeft: position[3],
      backgroundColor: panX.value >= position[3] ? leftBarColor : rightBarColor,
    };
  }, []);

  const panResponders = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => false,
        onPanResponderTerminationRequest: () => false,
        // onPanResponderGrant: (event, gestureState) => {
        //   // props.setScrollEnabled(false); // scrollView와 함께 사용할 때 scrollEnabled를 false로 지정하는 게 좋습니다.
        //   // props.setPointerEvent("none"); // 다른 component에 의해 responder가 전환된다면 grant 발생 시 다른 컴포넌트의 pointerEvent에 none을 지정하는 게 좋습니다.
        //   panX.value = gestureState.x0 + gestureState.dx - rootViewPosX; // 사용자의 초기 터치 위치 + 이동 위치 - rootView의 x 위치
        // },
        onPanResponderMove: (event, gestureState) => {
          const rate = Math.round(
            (gestureState.x0 + gestureState.dx - margin - 16) / step,
          );
          if (rate < 0) {
            setFooiytiRating(0);
          } else if (rate > 4) {
            setFooiytiRating(4);
          } else {
            setFooiytiRating(rate);
          }

          panX.value = gestureState.x0 + gestureState.dx - margin - 16;
        },

        onPanResponderRelease: (event, gestureState) => {
          const rate = Math.round(
            (gestureState.x0 + gestureState.dx - margin - 16) / step,
          );
          if (rate < 0) {
            setFooiytiRating(0);
          } else if (rate > 4) {
            setFooiytiRating(4);
          } else {
            setFooiytiRating(rate);
          }
          panX.value = withTiming(rate * step, {duration: 300}); // 별점에 맞게 Animated.View의 width를 조절합니다.
          // 별점을 저장합니다.

          // props.setScrollEnabled(true); // onPanResponderGrant와 반대로 설정합니다.
          // props.setPointerEvent("auto");
        },
        onShouldBlockNativeResponder: () => {
          return false;
        },
      }),
    [rootViewPosX],
  );

  const rootContainerOnLayout = useCallback(e => {
    // root Component onLayout으로 root View의 position x를 계산합니다.
    const {x} = e.nativeEvent.layout;

    setRootViewPosX(x);
  }, []);

  return (
    <View style={styles.rootContainer} onLayout={rootContainerOnLayout}>
      <View style={{position: 'absolute', height: 36}}>
        <Text
          style={{
            ...fooiyFont.Subtitle2,
            color: fooiyColor.G600,
            height: 24,
            alignItems: 'center',
          }}>
          {left}
        </Text>
        <Text
          style={{...fooiyFont.Caption2, color: fooiyColor.G400, height: 12}}>
          {leftText}
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          right: 0,
          color: fooiyColor.G600,
          alignItems: 'flex-end',
          height: 36,
        }}>
        <Text
          style={{
            ...fooiyFont.Subtitle2,
            height: 24,
            alignItems: 'center',
          }}>
          {right}
        </Text>
        <Text
          style={{...fooiyFont.Caption2, color: fooiyColor.G400, height: 12}}>
          {rightText}
        </Text>
      </View>
      <View
        style={[
          styles.starRatingContainer,
          {
            marginLeft: margin,
            marginRight: margin,
            width: globalVariable.width - margin * 2,
          },
        ]}>
        <Animated.View
          style={[styles.leftBackground, leftFooiytiStyle]}
          pointerEvents="none"
        />
        <Animated.View
          style={[styles.rightBackground, rightFooiytiStyle]}
          pointerEvents="none"
        />
        <View style={[styles.dot, {backgroundColor: leftBarColor}]} />
        <Animated.View style={[styles.dot, dot1Style]} />
        <Animated.View style={[styles.dot, dot2Style]} />
        <Animated.View style={[styles.dot, dot3Style]} />
        <View
          style={[
            styles.dot,
            {backgroundColor: rightBarColor, marginLeft: position[4]},
          ]}
        />

        <Animated.View style={[styles.imogi, imogiStyle]} pointerEvents="none">
          <View {...panResponders.panHandlers}>
            <FooiytiImogi />
          </View>
        </Animated.View>
        <View
          style={{
            width: fooiytiRatingWidth + 16,
            height: 40,
            alignSelf: 'center',
          }}
          {...panResponders.panHandlers}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    marginTop: 24,
    height: 40,
    width: '100%',
    flexDirection: 'row',
  },
  starRatingText: {
    fontFamily: 'AppleSDGothicNeo-Regular',
    fontSize: 12,
  },
  starRatingContainer: {
    flexDirection: 'row',
    marginTop: 19,
    height: 2,
    // marginLeft: margin,
    // marginRight: margin,
    // width: globalVariable.width - margin * 2,
  },
  leftBackground: {
    position: 'absolute',
    backgroundColor: leftBarColor,
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    // minWidth: 0,
    maxWidth: '100%',
  },
  rightBackground: {
    position: 'absolute',
    backgroundColor: rightBarColor,
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    // marginLeft: globalVariable.width - 68 - 68,
    // minWidth: 0,
    maxWidth: '100%',
  },
  imogi: {
    justifyContent: 'center',
    position: 'absolute',
    alignSelf: 'center',
    height: '100%',
  },
  dot: {
    alignSelf: 'center',
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 100,
  },
});

export default FooiytiRating;
