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
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ApiManagerV2} from '../../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../../common/Enums';
import FooiyToast from '../../../common/FooiyToast';
import {fooiyColor} from '../../../common/globalStyles';
import {globalVariable} from '../../../common/globalVariable';
import {StackHeader} from '../../../common_ui/headers/StackHeader';
import OtherUserPageProfile from './OtherUserPageProfile';

const limit = 12;

const OtherUserPage = props => {
  const [feeds, setFeeds] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(-1);
  const [noFeedImage, setNoFeedImage] = useState('');
  const [otherUserInfo, setOtherUserInfo] = useState({});

  const other_account_id = props.route.params.other_account_id;

  const navigation = useNavigation();

  useEffect(() => {
    getAccountInfo();
    getFeedList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAccountInfo = async data => {
    await ApiManagerV2.get(apiUrl.ACCOUNT_INFO, {
      params: {
        other_account_id,
      },
    })
      .then(res => {
        setOtherUserInfo(res.data.payload.account_info);
      })
      .catch(e => FooiyToast.error());
  };

  const getFeedList = async data => {
    await ApiManagerV2.get(apiUrl.MYPAGE_FEED_LIST, {
      params: {
        offset: offset,
        limit,
        type: 'image',
        other_account_id,
      },
    })
      .then(res => {
        if (res.data.payload.image === undefined) {
          setFeeds([...feeds, ...res.data.payload.feed_list.results]);
          if (totalCount === -1) {
            setOffset(offset + limit);
            setTotalCount(res.data.payload.feed_list.total_count);
          }
        } else {
          setNoFeedImage(res.data.payload.image);
        }
      })
      .catch(e => FooiyToast.error());
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
      navigation.push('OtherUserFeedDetail', {
        other_account_id,
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
      <StackHeader title={otherUserInfo.nickname} />
      {noFeedImage === '' ? (
        <FlatList
          data={feeds}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          scrollEventThrottle={16}
          bounces={true}
          numColumns={3}
          // scrollToOverflowEnabled
          onEndReached={loadMoreFeeds}
          ListHeaderComponent={() => OtherUserPageProfile(otherUserInfo)}
          ListFooterComponent={() => <View style={styles.emptyComp}></View>}
        />
      ) : (
        <View>
          <OtherUserPageProfile otherUserInfo={otherUserInfo} />
          <View style={{alignItems: 'center'}}>
            <FastImage
              source={require('../../../../assets/image/empty_notice.png')}
              style={{width: 137, height: 56, marginBottom: 16, marginTop: 76}}
            />
          </View>
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

export default OtherUserPage;
