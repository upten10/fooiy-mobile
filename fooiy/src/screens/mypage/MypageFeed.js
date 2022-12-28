import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import {ApiMangerV1} from '../../common/api/v1/ApiMangerV1';
import {apiUrl} from '../../common/Enums';
import {globalVariable} from '../../common/globalVariable';
import MypageProfile from './MypageProfile';

const MypageFeed = props => {
  const [feeds, setFeeds] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [noFeedImage, setNoFeedImage] = useState(null);

  useEffect(() => {
    getFeedList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFeedList = async data => {
    await ApiMangerV1.get(apiUrl.FEED_LIST, {
      params: {
        limit: globalVariable.FeedLimit,
        offset: offset,
        address_depth1: '',
      },
    }).then(res => {
      if (res.data.payload.feed_list) {
        setFeeds([...feeds, ...res.data.payload.feed_list.results]);
        setTotalCount(res.data.payload.feed_list.total_count);
      } else {
        setNoFeedImage(res.data.payload.image);
      }
    });
    // .catch(function (error) => console.log(error));
  };

  const renderItem = useCallback(({item, index}) => {
    return (
      <View>
        <Image
          source={{uri: item.image[0]}}
          style={{
            width: globalVariable.width * (1 / 3),
            height: globalVariable.width * (1 / 3),
          }}
        />
      </View>
    );
  }, []);

  const keyExtractor = useCallback((item, index) => index.toString(), []);

  return (
    <View style={styles.rootContainer}>
      <FlatList
        data={feeds}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        scrollEventThrottle={16}
        ListHeaderComponent={MypageProfile}
        bounces={false}
        numColumns={3}
        scrollToOverflowEnabled
        ListFooterComponent={() => <View style={styles.emptyComp}></View>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  emptyComp: {
    height: globalVariable.tabBarHeight,
    width: '100%',
  },
});

export default MypageFeed;
