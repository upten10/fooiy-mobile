import React, {useState, useCallback, useRef} from 'react';
import {StyleSheet, Animated} from 'react-native';
import MypageProfile from './MypageProfile';
import MypageFeed from './MypageFeed';
import {globalVariable} from '../../common/globalVariable';
import {DefaultHeader} from '../../common_ui/headers/DefaultHeader';
import {SafeAreaView} from 'react-native-safe-area-context';

function Mypage(props) {
  // const [headerHeight, setHeaderHeight] = useState(0);

  // const scrollY = useRef(new Animated.Value(0)).current;
  // const headerTranslateY = scrollY.interpolate({
  //   inputRange: [0, headerHeight],
  //   outputRange: [0, -headerHeight],
  //   extrapolate: 'clamp',
  // });

  // const headerOnLayout = useCallback(event => {
  //   const {height} = event.nativeEvent.layout;
  //   console.log(height);
  //   setHeaderHeight(height);
  // }, []);

  return (
    <SafeAreaView style={styles.rootContainer} edges="top">
      <MypageFeed />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    width: globalVariable.width,
    height: globalVariable.height * 0.5,
  },
});

export default Mypage;
