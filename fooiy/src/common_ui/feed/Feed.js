import React, {useState, useCallback, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {debounce} from 'lodash';
import AnimatedLottieView from 'lottie-react-native';
import {feedsAction} from '../../redux/actions/feedsAction';
import {useDispatch, useSelector} from 'react-redux';
import {globalVariable} from '../../common/globalVariable';
import {
  Fork,
  ForkFocused,
  Store,
  StoreFocused,
  Share,
  Comment,
} from '../../../assets/icons/svg';
import {ApiManagerV2} from '../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../common/Enums';
import KakaoShareLink from 'react-native-kakao-share-link';

const {width} = Dimensions.get('screen');
const PROFILE_IMAGE_WIDTH = width * 0.1;
const PROFILE_IMAGE_HEIGHT = PROFILE_IMAGE_WIDTH;
const IMAGE_WIDTH = width;
const IMAGE_HEIGHT = IMAGE_WIDTH;

export const UI_Feed = (item, props) => {
  const navigation = useNavigation();
  const [disableShopButton, setDisableShopButton] = useState(false);

  useEffect(() => {
    item.disable_shop_button && setDisableShopButton(item.disable_shop_button);
  }, [item.disable_shop_button]);

  const [line, setLine] = useState(3);
  const [moreTextActive, setMoreTextActive] = useState(false);
  const isOverLines = lines => {
    if (lines > 2 && line === 3) {
      setMoreTextActive(true);
    }
  };
  const elapsedTime = date => {
    const start = new Date(date);
    const end = new Date();
    const diff = (end - start) / 1000;
    const times = [
      {name: '년', milliSeconds: 60 * 60 * 24 * 365},
      {name: '개월', milliSeconds: 60 * 60 * 24 * 30},
      {name: '일', milliSeconds: 60 * 60 * 24},
      {name: '시간', milliSeconds: 60 * 60},
      {name: '분', milliSeconds: 60},
    ];

    for (const value of times) {
      const betweenTime = Math.floor(diff / value.milliSeconds);
      if (betweenTime > 0) {
        return `${betweenTime}${value.name} 전`;
      }
    }
    return '방금 전';
  };

  // feed redux
  const dispatch = useDispatch();
  const feed_redux = {
    id: item.id,
    count_liked: item.count_liked,
    is_liked: item.is_liked,
    is_store: item.is_store,
  };
  dispatch(feedsAction.append(feed_redux));
  const feeds = useSelector(state => state.feeds.feeds.value);
  const feed = feeds.find(e => e.id === item.id);

  const [likeIcon, setLikeIcon] = useState(feed.is_liked);
  const [likeCount, setLikeCount] = useState(
    feed.is_liked === item.is_liked
      ? item.count_liked
      : feed.is_liked
      ? item.count_liked + 1
      : item.count_liked - 1,
  );
  const [storeIcon, setStoreIcon] = useState(feed.is_store);

  useEffect(() => {
    setLikeIcon(feed.is_liked);
    setLikeCount(
      feed.is_liked === item.is_liked
        ? item.count_liked
        : feed.is_liked
        ? item.count_liked + 1
        : item.count_liked - 1,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feed.is_liked]);

  useEffect(() => {
    setStoreIcon(feed.is_store);
  }, [feed.is_store]);

  // debounce에 콜백 안쓰면 계속 랜더링 되서 이상해짐
  const debounceCallback = useCallback((like, store, count) => {
    if (typeof like === typeof true) {
      debounceLike(like, count);
    }
    if (typeof store === typeof true) {
      debounceStore(store);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debounceLike = debounce(async (liked, count) => {
    if (feed.is_liked === (await liked)) {
      feed.is_liked = !(await liked);
      feed.count_liked = await count;
      dispatch(feedsAction.setChanged(feeds));
      // axios fetch
      await ApiManagerV2.patch(apiUrl.FEED_LIKE, {
        feed_id: item.id,
      }).then(res => {
        console.log(res.data);
      });
    }
  }, 1500);

  const debounceStore = debounce(async stored => {
    if (feed.is_store === (await stored)) {
      feed.is_store = !(await stored);
      dispatch(feedsAction.setChanged(feeds));
      // axios fetch
      await ApiManagerV2.patch(apiUrl.FEED_STORAGE, {
        feed_id: item.id,
      }).then(res => {
        console.log(res.data);
      });
    }
  }, 1500);

  const onClickLikeIcon = () => {
    likeIcon ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1);
    setLikeIcon(!likeIcon);
    debounceCallback(likeIcon, undefined, likeCount);
  };

  const onClickShareIcon = async () => {
    try {
      const response = await KakaoShareLink.sendLocation({
        address: item.shop_address,
        addressTitle: item.shop_name,
        content: {
          title: item.shop_name,
          imageUrl: item.image[0],
          link: {
            androidExecutionParams: [{key: 'feed_id', value: item.id}],
            iosExecutionParams: [{key: 'feed_id', value: item.id}],
          },
          description: item.menu_name + ' ' + item.menu_price,
        },
      });
      console.log(response);
    } catch (e) {
      console.error(e);
      console.error(e.message);
    }
  };

  const onClickStoreIcon = () => {
    setStoreIcon(!storeIcon);
    debounceCallback(undefined, storeIcon, undefined);
  };

  const onPressProfileImg = () => {
    navigation.push('OtherUserPage', {
      parent: item.parent,
      other_account_id: item.account_id,
    });
  };

  const animationProgress = useRef(new Animated.Value(0));

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

  return (
    <View style={styles.container}>
      {/* 프로필 사진 */}
      <TouchableOpacity
        style={styles.header_container}
        activeOpacity={0.8}
        onPress={() => onPressProfileImg(item.stackName)}>
        <Image
          source={{uri: item.profile_image}}
          style={styles.profile_image}
        />
        <Text style={styles.nickname}>{item.nickname}</Text>
      </TouchableOpacity>
      <View style={styles.image_container}>
        {/* 피드 사진 */}
        <TouchableWithoutFeedback onPress={handleDoubleTap}>
          <View>
            {item.is_confirm ? (
              <ImageBackground
                source={{uri: item.image[0]}}
                style={{flex: 1, resizeMode: 'cover', ...styles.image}}
                blurRadius={10} //Blur 효과
              />
            ) : (
              <Image source={{uri: item.image[0]}} style={styles.image} />
            )}
            <AnimatedLottieView
              source={require('../../../assets/lottie/fork.json')}
              progress={animationProgress.current}
              imageAssetsFolder={'images'} // for android
            />
          </View>
        </TouchableWithoutFeedback>
      </View>

      {/* 유용한 기능 포크, 댓글 등등 */}
      <View style={styles.useful_content}>
        <View style={styles.ic_fork}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onClickLikeIcon}
            hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}>
            {likeIcon ? <ForkFocused /> : <Fork />}
          </TouchableOpacity>
        </View>
        {likeCount > 0 ? (
          <Text style={styles.fork_count}>
            {likeCount}명이 포크로 찍었어요.
          </Text>
        ) : null}
        <View style={styles.right_side_icon}>
          <View style={styles.ic_comment}>
            <TouchableOpacity
              activeOpacity={0.8}
              hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}>
              <Comment />
            </TouchableOpacity>
          </View>
          <View style={styles.ic_share}>
            <TouchableOpacity
              activeOpacity={0.8}
              hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
              onPress={onClickShareIcon}>
              <Share />
            </TouchableOpacity>
          </View>
          <View style={styles.ic_store}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onClickStoreIcon}
              hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}>
              {storeIcon ? <StoreFocused /> : <Store />}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.content_detail}>
          <View style={styles.fooiyti_container}>
            <Text style={styles.fooiyti}>{item.fooiyti}</Text>
            <Image
              source={{uri: item.taste_evaluation_image}}
              style={styles.taste_evaluation_image}
            />
          </View>
          <View style={styles.shop_container}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.shop}
              onPress={() => {
                !disableShopButton &&
                  navigation.push('Shop', {
                    shop_id: item.shop_id,
                    shop_name: item.shop_name,
                    shop_address: item.shop_address,
                    shop_longitude: item.longitude,
                    shop_latitude: item.latitude,
                  });
              }}>
              <Text>{item.shop_name}</Text>
            </TouchableOpacity>

            <View style={styles.menu_container}>
              <Text>{item.menu_name}</Text>
              <Text style={styles.menu_price}>{item.menu_price}</Text>
            </View>
          </View>
        </View>
        <Text
          numberOfLines={line}
          style={styles.comment}
          onTextLayout={({nativeEvent: {lines}}) => {
            isOverLines(lines.length);
          }}>
          {item.comment}
        </Text>
        <View style={styles.footer}>
          {moreTextActive ? (
            <Text
              style={styles.more_text}
              onPress={() => {
                setLine(100);
                setMoreTextActive(false);
              }}>
              더보기
            </Text>
          ) : null}
          <Text style={styles.feed_time}>{elapsedTime(item.created_at)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
  },
  header_container: {
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profile_image: {
    borderRadius: 100,
    width: PROFILE_IMAGE_WIDTH,
    height: PROFILE_IMAGE_HEIGHT,
  },

  nickname: {
    paddingLeft: 10,
  },

  image_container: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
  },

  useful_content: {
    height: 40,
    width: globalVariable.width,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
  },
  ic_fork: {
    width: 20,
    height: 20,
  },
  fork_count: {
    left: 8,
  },
  right_side_icon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  ic_comment: {
    width: 20,
    height: 20,
    marginRight: 20,
  },
  ic_share: {
    width: 20,
    height: 20,
    marginRight: 20,
  },
  ic_store: {
    width: 20,
    height: 20,
  },

  content_detail: {
    flexDirection: 'row',
  },
  fooiyti_container: {
    width: width / 6,
    height: width / 6,
    marginLeft: 16,
    borderColor: '#FF5C5C',
    borderStyle: 'solid',
    borderWidth: 1.3,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fooiyti: {
    color: '#FF5C5C',
    fontSize: 18,
  },
  taste_evaluation_image: {
    width: 24,
    height: 24,
    fontStyle: 'normal',
    marginTop: 4,
  },
  shop_container: {
    marginLeft: 20,
    height: width / 6,
    justifyContent: 'center',
  },
  shop: {
    color: '#000',
    fontSize: 18,
  },
  menu_container: {
    marginTop: 10,
    flexDirection: 'row',
  },
  menu_price: {
    marginLeft: 8,
    color: '#FF5C5C',
  },

  comment: {
    marginLeft: 20,
    marginTop: 16,
    color: '#4A5470',
    lineHeight: 24,
    fontSize: 14,
  },

  footer: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 17,
  },
  more_text: {
    color: '#FF5C5C',
  },
  feed_time: {
    position: 'absolute',
    right: 16,
    color: '#B3BBD3',
  },
});
