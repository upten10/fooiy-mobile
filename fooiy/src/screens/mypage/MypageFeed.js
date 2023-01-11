import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {ApiMangerV1} from '../../common/api/v1/ApiMangerV1';
import {apiUrl} from '../../common/Enums';
import {globalVariable} from '../../common/globalVariable';
import MypageProfile from './MypageProfile';

const MypageFeed = () => {
  const [feeds, setFeeds] = useState([]);
  const [offset, setOffset] = useState(0);
  const [lastIndex, setLastIndex] = useState(-1);

  const navigation = useNavigation();

  useEffect(() => {
    getFeedList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  const getFeed = async data => {
    const {id, is_confirm} = data;
    if (is_confirm) {
      await ApiMangerV1.get(apiUrl.MYPAGE_FEED_LIST, {
        params: {
          type: 'list',
          pioneer_id: id,
        },
      }).then(res =>
        navigation.navigate('Feed', {
          data: res.data.payload.feed_list.results,
        }),
      );
    } else {
      await ApiMangerV1.get(apiUrl.MYPAGE_FEED_LIST, {
        params: {
          type: 'list',
          feed_id: id,
        },
      }).then(res =>
        navigation.navigate('Feed', {
          data: res.data.payload.feed_list.results,
        }),
      );
    }
  };

  const getFeedList = async data => {
    const limit = 4;
    await ApiMangerV1.get(apiUrl.MYPAGE_FEED_LIST, {
      params: {
        offset: offset,
        limit,
        type: 'image',
      },
    }).then(res => {
      if (lastIndex === -1 || offset < lastIndex) {
        setLastIndex(res.data.payload.feed_list.total_count);
        setFeeds([...feeds, ...res.data.payload.feed_list.results]);
        setOffset(offset + limit);
      }
    });
  };

  const renderItem = useCallback(({item, index}) => {
    const onPressFeed = () => {
      getFeed(item);
    };
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onPressFeed}>
        <Image source={{uri: item.image[0]}} style={styles.feedImage} />
      </TouchableOpacity>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const keyExtractor = useCallback((item, index) => index.toString(), []);

  return (
    <View style={styles.rootContainer}>
      <FlatList
        data={feeds}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        scrollEventThrottle={16}
        bounces={false}
        numColumns={3}
        scrollToOverflowEnabled
        ListHeaderComponent={MypageProfile}
        ListFooterComponent={() => <View style={styles.emptyComp}></View>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
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

export default MypageFeed;
