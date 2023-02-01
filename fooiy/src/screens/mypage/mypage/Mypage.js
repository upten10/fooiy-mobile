import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Image, FlatList, ImageBackground} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {ApiManagerV2} from '../../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../../common/Enums';
import {fooiyColor} from '../../../common/globalStyles';
import {globalVariable} from '../../../common/globalVariable';
import {DefaultHeader} from '../../../common_ui/headers/DefaultHeader';
import {userInfoAction} from '../../../redux/actions/userInfoAction';
import MypageProfile from './MypageProfile';

const limit = 12;

const Mypage = props => {
  const [feeds, setFeeds] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(-1);
  const [noFeedImage, setNoFeedImage] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    getFeedList();
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

  const getFeedList = async data => {
    await ApiManagerV2.get(apiUrl.MYPAGE_FEED_LIST, {
      params: {
        offset: offset,
        limit,
        type: 'image',
      },
    }).then(res => {
      if (res.data.payload.image === undefined) {
        setFeeds([...feeds, ...res.data.payload.feed_list.results]);
        if (totalCount === -1) {
          setOffset(offset + limit);
          setTotalCount(res.data.payload.feed_list.total_count);
        }
      } else {
        setNoFeedImage(res.data.payload.image);
      }
    });
  };

  const loadMoreFeeds = () => {
    if (totalCount > offset) {
      if (totalCount + limit > offset) {
        setOffset(offset + limit);
        getFeedList();
      }
    }
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
            style={{flex: 1, resizeMode: 'cover', ...styles.feedImage}}>
            <Image
              source={require('../../../../assets/image/feed_confirm_simple.png')}
              style={{flex: 1, resizeMode: 'cover', ...styles.feedImage}}
            />
          </ImageBackground>
        ) : (
          // <Image source={{uri: item.image[0]}} style={styles.feedImage} />
          <FastImage
            source={{
              uri: item.image[0],
            }}
            style={styles.feedImage}
          />
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
          onEndReached={loadMoreFeeds}
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
