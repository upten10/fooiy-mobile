import React, {useState, useRef} from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {fooiyColor, fooiyFont} from '../../../../common/globalStyles';

const BOX = 234 / 5;
const CIRCLE = 18;

function FooiytiRating(props) {
  const {left, right, setFooiytiRating} = props;
  const [step, setStep] = useState(2);
  const circleAnim = useRef(new Animated.Value(0)).current;
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onStartShouldSetPanResponder: () => true,
    onPanResponderStart: (evt, gestureState) => {
      circleAnim.setValue(step * BOX - 93.6);
    },
    onPanResponderMove: (evt, gestureState) => {
      gestureState.dx + step * BOX - 93.6 < 110 &&
        gestureState.dx + step * BOX - 93.6 > -110 &&
        circleAnim.setValue(gestureState.dx + step * BOX - 93.6);
    },
    onPanResponderEnd: (evt, gestureState) => {
      if (gestureState.dx + step * BOX - 93.6 < -110) {
        const fooiytiStep = 0;
        const toValue = fooiytiStep * BOX - 93.6;
        setStep(fooiytiStep);
        setFooiytiRating(fooiytiStep);
        Animated.spring(circleAnim, {
          toValue,
          friction: 7,
          tension: 50,
          duration: 100,
          useNativeDriver: true,
        }).start();
      } else if (gestureState.dx + step * BOX - 93.6 > 110) {
        const fooiytiStep = 4;
        const toValue = fooiytiStep * BOX - 93.6;
        setStep(fooiytiStep);
        setFooiytiRating(fooiytiStep);
        Animated.spring(circleAnim, {
          toValue,
          friction: 7,
          tension: 50,
          duration: 100,
          useNativeDriver: true,
        }).start();
      } else {
        const fooiytiStep = step + Math.round(gestureState.dx / 50);
        const toValue = fooiytiStep * BOX - 93.6;
        setStep(fooiytiStep);
        setFooiytiRating(fooiytiStep);
        Animated.spring(circleAnim, {
          toValue,
          friction: 7,
          tension: 50,
          duration: 100,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const onPress = index => {
    setStep(index);
    setFooiytiRating(index);
    Animated.spring(circleAnim, {
      toValue: index * BOX - 93.6,
      friction: 7,
      tension: 50,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.fooiyti}>
          <Text style={{...fooiyFont.Subtitle2, color: fooiyColor.G600}}>
            {left.en}
          </Text>
          <Text style={{...fooiyFont.Caption2, color: fooiyColor.G400}}>
            {left.kor}
          </Text>
        </View>
        <View style={styles.slider}>
          <View style={{flexDirection: 'row'}}>
            {[...Array(5)].map((value, index) => (
              <TouchableWithoutFeedback onPress={() => onPress(index)}>
                <View key={index} style={styles.track}>
                  <View style={styles.track_mark} />
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
          <Animated.View
            {...panResponder.panHandlers}
            style={[styles.pointer, {transform: [{translateX: circleAnim}]}]}
          />
        </View>
        <View style={[styles.fooiyti, {alignItems: 'flex-end'}]}>
          <Text style={{...fooiyFont.Subtitle2, color: fooiyColor.G600}}>
            {right.en}
          </Text>
          <Text style={{...fooiyFont.Caption2, color: fooiyColor.G400}}>
            {right.kor}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default FooiytiRating;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
  },
  fooiyti: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  slider: {
    width: BOX * 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  track: {
    width: BOX,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  track_mark: {
    width: CIRCLE,
    height: CIRCLE,
    borderRadius: CIRCLE / 2,
    backgroundColor: fooiyColor.G50,
    borderColor: fooiyColor.G200,
    borderWidth: 1,
  },
  pointer: {
    width: CIRCLE,
    height: CIRCLE,
    borderRadius: CIRCLE / 2,
    borderWidth: 1,
    backgroundColor: fooiyColor.P500,
    borderColor: fooiyColor.P700,
    position: 'absolute',
  },
});
