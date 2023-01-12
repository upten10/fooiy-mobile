import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {ApiMangerV1} from '../../common/api/v1/ApiMangerV1';
import {apiUrl} from '../../common/Enums';
import {globalVariable} from '../../common/globalVariable';
import MypageProfile from './MypageProfile';

const MypageFeed = () => {
  const [feeds, setFeeds] = useState([]);
  const [offset, setOffset] = useState(0);
  const [lastIndex, setLastIndex] = useState(-1);
  const [noFeedImage, setNoFeedImage] = useState('');

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
    <View style={styles.rootContainer}>
      {noFeedImage === '' ? (
        <FlatList
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
