import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  ImageBackground,
  FlatList,
} from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import {globalVariable} from '../../common/globalVariable';
import FastImage from 'react-native-fast-image';
import {fooiyColor} from '../../common/globalStyles';
import FooiyToast from '../../common/FooiyToast';

const FeedImage = props => {
  const {
    images,
    is_confirm,
    animationProgress,
    onClickLikeIcon,
    likeIcon,
    isLogin,
  } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  // 두번 터치 감지
  var lastTap = null;
  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      if (!likeIcon) {
        onClickLikeIcon();
      }
      Animated.sequence([
        Animated.timing(animationProgress.current, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(animationProgress.current, {
          toValue: 0,
          duration: 1,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      lastTap = now;
    }
  };

  const ImageUI = item => {
    return (
      <TouchableWithoutFeedback
        onPress={() =>
          isLogin !== false
            ? handleDoubleTap()
            : FooiyToast.message('뒤로가기 후 로그인해주세요', false, 0)
        }>
        <View>
          <FastImage
            source={{
              uri: item.item,
            }}
            style={styles.image}
          />
          <AnimatedLottieView
            source={require('../../../assets/lottie/fork.json')}
            progress={animationProgress.current}
            imageAssetsFolder={'images'} // for android
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={styles.image_container}>
      {/* 피드 사진 */}

      <View>
        {is_confirm ? (
          <ImageBackground source={{uri: images[0]}} style={styles.image}>
            <Image
              source={require('../../../assets/image/feed_confirm_detail.png')}
              style={styles.image}
            />
          </ImageBackground>
        ) : (
          /* 이미지 3개까지 처리 */
          <View>
            <FlatList
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              data={images}
              renderItem={image => <ImageUI {...image} />}
              keyExtractor={item => item}
              bounces={false}
              onMomentumScrollEnd={event => {
                const index = Math.floor(
                  Math.floor(event.nativeEvent.contentOffset.x) /
                    Math.floor(event.nativeEvent.layoutMeasurement.width),
                );
                setCurrentIndex(index);
              }}
            />
            <View style={styles.image_indicator_container}>
              {images.length > 1 &&
                images.map((image, index) => (
                  <View
                    key={index}
                    style={[
                      styles.image_indicator,
                      {
                        backgroundColor:
                          index === currentIndex
                            ? fooiyColor.P500
                            : fooiyColor.G200,
                      },
                    ]}
                  />
                ))}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default FeedImage;
const styles = StyleSheet.create({
  image_container: {
    width: globalVariable.width,
    height: globalVariable.width,
  },
  image: {
    width: globalVariable.width,
    height: globalVariable.width,
  },
  image_indicator_container: {
    width: globalVariable.width,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 16,
  },
  image_indicator: {
    width: 6,
    height: 6,
    borderRadius: 100,
    marginHorizontal: 2,
  },
});
