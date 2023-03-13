import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, Image, ImageBackground, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {Menu_clinic_musang_transparency} from '../../../../assets/svg';
import {ApiManagerV2} from '../../../common/api/v2/ApiManagerV2';
import {apiUrl, resizeImageType} from '../../../common/Enums';
import FooiyToast from '../../../common/FooiyToast';
import {fooiyColor} from '../../../common/globalStyles';
import {globalVariable} from '../../../common/globalVariable';
import ListEmptyTextComponent from '../../../common_ui/empty_component/ListEmptyTextComponent';
import {DefaultHeader} from '../../../common_ui/headers/DefaultHeader';
import ResizeImage from '../../../common_ui/ResizeImage';
import {userInfoAction} from '../../../redux/actions/userInfoAction';
import MypageProfile from './MypageProfile';

const limit = 12;

const Mypage = props => {
  const tabNavigation = props.navigation.getParent();
  const stackNavigation = props.navigation;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const flatListRef = useRef(null);

  const [feeds, setFeeds] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getFeedList(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  tabNavigation?.addListener('tabPress', e => {
    if (
      stackNavigation.getState().index === 0 &&
      flatListRef.current !== null
    ) {
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

  const getFeedList = async data => {
    setOffset(data);
    await ApiManagerV2.get(apiUrl.MYPAGE_FEED_LIST, {
      params: {
        offset: data,
        limit: globalVariable.FeedLimit,
        type: 'image',
      },
    })
      .then(res => {
        if (res.data.payload.feed_list) {
          if (data === 0) {
            setFeeds(res.data.payload.feed_list.results);
          } else {
            setFeeds([...feeds, ...res.data.payload.feed_list.results]);
          }
          totalCount === 0 &&
            setTotalCount(res.data.payload.feed_list.total_count);
        }
      })
      .catch(e => {
        FooiyToast.error();
      });
  };

  const getAccountInfo = async data => {
    ApiManagerV2.get(apiUrl.ACCOUNT_INFO, {
      params: {},
    })
      .then(res => {
        dispatch(userInfoAction.init(res.data.payload.account_info));
      })
      .catch(e => FooiyToast.error());
  };

  const loadMoreFeeds = () => {
    if (totalCount > offset + globalVariable.FeedLimit) {
      setOffset(offset + globalVariable.FeedLimit);
      getFeedList(offset + globalVariable.FeedLimit);
    }
  };

  const onRefresh = () => {
    if (!refreshing) {
      getRefreshData();
    }
  };

  const getRefreshData = async () => {
    setRefreshing(true);
    await getFeedList(0);
    await getAccountInfo();
    setRefreshing(false);
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
              source={require('../../../../assets/images/feed_confirm_simple.png')}
              style={{flex: 1, resizeMode: 'cover', ...styles.feedImage}}
            />
          </ImageBackground>
        ) : (
          // <Image source={{uri: item.image[0]}} style={styles.feedImage} />
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
        <Menu_clinic_musang_transparency style={{marginBottom: 16}} />
        <EmptyText />
      </View>
    );
  }, []);

  const keyExtractor = useCallback((item, index) => index.toString(), []);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <DefaultHeader flatListRef={flatListRef} toTop={toTop} />

      {/* <Header>
        <Header.Group direction={'column'}>
          <Header.Title></Header.Title>
          <Header.GoBack></Header.GoBack>
        </Header.Group>
      </Header> */}
      <FlatList
        ref={flatListRef}
        data={feeds}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        scrollEventThrottle={16}
        onEndReached={loadMoreFeeds}
        onRefresh={onRefresh}
        refreshing={refreshing}
        bounces={true}
        numColumns={3}
        scrollToOverflowEnabled
        ListHeaderComponent={MypageProfile}
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

export default Mypage;
