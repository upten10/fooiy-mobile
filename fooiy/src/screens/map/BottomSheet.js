import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {globalVariable} from '../../common/globalVariable';
const BottomSheet = () => {
  const MAX_TRANSLATE_Y = -globalVariable.height * 0.79;
  const MIN_TRANSLATE_Y = 0;
  const translationY = useSharedValue(0);
  const context = useSharedValue({y: 0});

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translationY.value};
    })
    .onUpdate(event => {
      translationY.value = event.translationY + context.value.y;
      translationY.value = Math.max(translationY.value, MAX_TRANSLATE_Y);
    })
    .onEnd(event => {
      if (event.translationY > 0) {
        // 아래로 드래그
        if (translationY.value > MAX_TRANSLATE_Y * 0.9) {
          translationY.value = withSpring(MIN_TRANSLATE_Y, {
            damping: 50,
          });
        } else {
          // 유지
          translationY.value = withSpring(MAX_TRANSLATE_Y, {
            damping: 50,
          });
        }
      } else {
        // 위로 드래그
        if (translationY.value < MAX_TRANSLATE_Y * 0.1) {
          translationY.value = withSpring(MAX_TRANSLATE_Y, {
            damping: 50,
          }); // axios 여기
        } else {
          // 유지
          translationY.value = withSpring(MIN_TRANSLATE_Y, {
            damping: 50,
          });
        }
      }
    });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translationY.value}],
    };
  });
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, rBottomSheetStyle]}>
        <View style={styles.line} />
        <Text style={styles.title}>주변 음식점 리스트</Text>
      </Animated.View>
    </GestureDetector>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    height: globalVariable.height,
    width: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    top: globalVariable.height / 1.21,
    borderRadius: 20,
  },
  line: {
    width: globalVariable.width / 10,
    height: 4.5,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 2,
  },
  title: {
    alignSelf: 'center',
    marginVertical: 5,
    fontSize: 16,
  },
});
