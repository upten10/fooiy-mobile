import React, {useState, useRef, useCallback, useMemo, useEffect} from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {fooiyColor} from '../../../../common/globalStyles';
import {globalVariable} from '../../../../common/globalVariable';
import {
  Total_0,
  Total_1,
  Total_2,
  Total_3,
  Total_4,
} from '../../../../../assets/icons/svg';
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {Slider} from '@miblanchard/react-native-slider';

const BOX = (globalVariable.width - 32) / 5;
const CIRCLE = 24;

function TotalRating(props) {
  const {totalRating, setTotalRating} = props;
  const [step, setStep] = useState(2);
  const circleAnim = useRef(new Animated.Value(0)).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onStartShouldSetPanResponder: () => true,
    onPanResponderStart: (evt, gestureState) => {
      circleAnim.setValue(step * BOX - BOX * 2);
    },
    onPanResponderMove: (evt, gestureState) => {
      gestureState.dx + step * BOX - BOX * 2 < 180 &&
        gestureState.dx + step * BOX - BOX * 2 > -180 &&
        circleAnim.setValue(gestureState.dx + step * BOX - BOX * 2);
    },
    onPanResponderEnd: (evt, gestureState) => {
      if (gestureState.dx + step * BOX - BOX * 2 < -180) {
        const fooiytiStep = 0;
        const toValue = fooiytiStep * BOX - BOX * 2;
        setStep(fooiytiStep);
        setFooiytiRating(fooiytiStep);
        Animated.spring(circleAnim, {
          toValue,
          friction: 7,
          tension: 50,
          duration: 100,
          useNativeDriver: true,
        }).start();
      } else if (gestureState.dx + step * BOX - BOX * 2 > 180) {
        const fooiytiStep = 4;
        const toValue = fooiytiStep * BOX - BOX * 2;
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
        const fooiytiStep = step + Math.round(gestureState.dx / BOX);
        const toValue = fooiytiStep * BOX - BOX * 2;
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
      toValue: index * BOX - BOX * 2,
      friction: 7,
      tension: 50,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  //   return (
  //     <View style={{borderWidth: 1}}>
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           justifyContent: 'space-between',
  //           alignItems: 'center',
  //           height: 48,
  //         }}>
  //         {/* Slider */}
  //         <View
  //           style={{
  //             width: BOX * 5,
  //             alignItems: 'center',
  //             justifyContent: 'center',
  //           }}>
  //           {/* 가운데 선 */}
  //           <View
  //             style={{
  //               position: 'absolute',
  //               width: BOX * 4,
  //               height: 8,
  //               backgroundColor: fooiyColor.G100,
  //               borderRadius: 20,
  //             }}
  //           />
  //           {/* 가운데 선 */}
  //           {/* 점 5개 */}
  //           <View style={{flexDirection: 'row'}}>
  //             {[...Array(5)].map((value, index) => (
  //               <TouchableWithoutFeedback onPress={() => onPress(index)}>
  //                 <View
  //                   key={index}
  //                   style={{
  //                     width: BOX,
  //                     height: 48,
  //                     justifyContent: 'center',
  //                     alignItems: 'center',
  //                   }}>
  //                   <View
  //                     style={{
  //                       width: CIRCLE,
  //                       height: CIRCLE,
  //                       borderRadius: CIRCLE / 2,
  //                       backgroundColor: fooiyColor.G50,
  //                     }}
  //                   />
  //                 </View>
  //               </TouchableWithoutFeedback>
  //             ))}
  //           </View>
  //           <Animated.View
  //             {...panResponder.panHandlers}
  //             style={{
  //               position: 'absolute',
  //               transform: [{translateX: circleAnim}],
  //             }}>
  //             {step === 0 ? (
  //               <TOTAL_0 />
  //             ) : step === 1 ? (
  //               <TOTAL_1 />
  //             ) : step === 2 ? (
  //               <TOTAL_2 />
  //             ) : step === 3 ? (
  //               <TOTAL_3 />
  //             ) : (
  //               <TOTAL_4 />
  //             )}
  //           </Animated.View>
  //           {/* 점 5개 */}
  //         </View>
  //         {/* Slider */}
  //       </View>
  //     </View>
  //   );
  const Imogi = () => {
    if (totalRating === 0) {
      return <Total_0 />;
    } else if (totalRating === 1) {
      return <Total_1 />;
    } else if (totalRating === 2) {
      return <Total_2 />;
    } else if (totalRating === 3) {
      return <Total_3 />;
    } else if (totalRating === 4) {
      return <Total_4 />;
    }
  };
  return (
    <View style={styles.container}>
      <Slider
        minimumValue={0}
        maximumValue={4}
        step={1}
        minimumTrackTintColor={fooiyColor.P500}
        maximumTrackTintColor={fooiyColor.G100}
        trackStyle={{height: 8, borderRadius: 20}}
        renderThumbComponent={Imogi}
        thumbStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        value={totalRating}
        onValueChange={res => setTotalRating(res[0])}
      />
    </View>
  );
}

export default TotalRating;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginLeft: 16,
    marginRight: 16,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
