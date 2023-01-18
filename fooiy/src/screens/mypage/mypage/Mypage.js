import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {ApiMangerV1} from '../../../common/api/v1/ApiMangerV1';
import {apiUrl} from '../../../common/Enums';
import {fooiyColor} from '../../../common/globalStyles';
import {globalVariable} from '../../../common/globalVariable';
import {DefaultHeader} from '../../../common_ui/headers/DefaultHeader';
import {userInfoAction} from '../../../redux/actions/userInfoAction';
import MypageProfile from './MypageProfile';

const Mypage = props => {
  const [feeds, setFeeds] = useState([]);
  const [offset, setOffset] = useState(0);
  const [lastIndex, setLastIndex] = useState(-1);
  const [noFeedImage, setNoFeedImage] = useState('');

  const dispatch = useDispatch();

  const getAccountInfo = async data => {
    await ApiMangerV1.get(apiUrl.ACCOUNT_INFO, {params: {}}).then(res => {
      dispatch(userInfoAction.init(res.data.payload.account_info));
    });
  };

  useEffect(() => {
    getAccountInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const flatListRef = useRef(null);

  const tabNavigation = props.navigation.getParent();
  const stackNavigation = props.navigation;
  tabNavigation?.addListener('tabPress', e => {
    if (stackNavigation.getState().index === 0) {
      toTop();
    }
  });
  const toTop = () => {
    flatListRef.current.scrollToOffset({
      offset: 0,
      animated: true,
      viewPosition: 1,
    });
  };

  const navigation = useNavigation();

  useEffect(() => {
    getFeedList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  const getFeedList = async data => {
    const limit = 20;
    await ApiMangerV1.get(apiUrl.MYPAGE_FEED_LIST, {
      params: {
        offset: offset,
        limit,
        type: 'image',
      },
    }).then(res => {
      if (
        res.data.payload.feed_list.total_count === 0 &&
        res.data.payload.image
      ) {
        setNoFeedImage(res.data.payload.image);
      } else if (lastIndex === -1 || offset < lastIndex) {
        setLastIndex(res.data.payload.feed_list.total_count);
        setFeeds([...feeds, ...res.data.payload.feed_list.results]);
        setOffset(offset + limit);
      }
    });
  };

  const renderItem = useCallback(({item, index}) => {
    const onPressFeed = () => {
      navigation.navigate('FeedDetail', {
        item,
      });
    };
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onPressFeed}>
        {item.is_confirm ? (
          <ImageBackground
            source={{uri: item.image[0]}}
            style={{flex: 1, resizeMode: 'cover', ...styles.feedImage}}
            blurRadius={10} //Blur 효과
          />
        ) : (
          <Image source={{uri: item.image[0]}} style={styles.feedImage} />
        )}
      </TouchableOpacity>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const keyExtractor = useCallback((item, index) => index.toString(), []);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <DefaultHeader />
      {noFeedImage === '' ? (
        <FlatList
          ref={flatListRef}
          data={feeds}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          scrollEventThrottle={16}
          bounces={true}
          numColumns={3}
          scrollToOverflowEnabled
          ListHeaderComponent={MypageProfile}
          ListFooterComponent={() => <View style={styles.emptyComp}></View>}
        />
      ) : (
        <View>
          <MypageProfile />
          <Image
            source={{uri: noFeedImage}}
            style={{width: '100%', height: 50}}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: fooiyColor.W,
  },
  feedImage: {
    width: globalVariable.width * (1 / 3) - 4 / 3,
    height: globalVariable.width * (1 / 3) - 4 / 3,
    marginRight: 2,
    marginBottom: 2,
  },
  emptyComp: {
    height: globalVariable.tabBarHeight,
    width: '100%',
  },
});

export default Mypage;
