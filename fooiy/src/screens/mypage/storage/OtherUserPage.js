import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Menu_clinic_musang_transparency} from '../../../../assets/svg';
import {ApiManagerV2} from '../../../common/api/v2/ApiManagerV2';
import {apiUrl, resizeImageType} from '../../../common/Enums';
import FooiyToast from '../../../common/FooiyToast';
import {fooiyColor} from '../../../common/globalStyles';
import {globalVariable} from '../../../common/globalVariable';
import ListEmptyTextComponent from '../../../common_ui/empty_component/ListEmptyTextComponent';
import {StackHeader} from '../../../common_ui/headers/StackHeader';
import ResizeImage from '../../../common_ui/ResizeImage';
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

  const ListEmptyComponent = useCallback(() => {
    const EmptyText = () => {
      return ListEmptyTextComponent(
        '아직 등록한 피드가 없어요.\n방문한 음식점을 등록해보세요!',
      );
    };
    return (
      <View
        style={{
          flex: 1,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 65,
        }}>
        <Menu_clinic_musang_transparency />
        <EmptyText />
      </View>
    );
  }, []);

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
              source={require('../../../../assets/images/feed_confirm_simple.png')}
              style={{flex: 1, resizeMode: 'cover', ...styles.feedImage}}
            />
          </ImageBackground>
        ) : (
          <ResizeImage
            uri={item.image[0]}
            size={resizeImageType.SMALL}
            imageStyle={styles.feedImage}
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
      <FlatList
        data={feeds}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        scrollEventThrottle={16}
        onEndReached={loadMoreFeeds}
        bounces={true}
        numColumns={3}
        scrollToOverflowEnabled
        ListHeaderComponent={() => OtherUserPageProfile(otherUserInfo)}
        ListFooterComponent={() => <View style={styles.emptyComp}></View>}
        ListEmptyComponent={ListEmptyComponent}
      />
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
