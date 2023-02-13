import {React, useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import messaging from '@react-native-firebase/messaging';
import {requestNotifications, RESULTS} from 'react-native-permissions';
import {ArrowIconRight24, Total_2} from '../../../assets/icons/svg';
import {ApiManagerV2} from '../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../common/Enums';
import FooiyToast from '../../common/FooiyToast';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';
import UI_Feed from '../../common_ui/feed/UI_Feed';
import FlatListFooter from '../../common_ui/footer/FlatListFooter';
import FeedHeader from '../../common_ui/headers/FeedHeader';
import SelectCategoryModal from './SelectCategoryModal';

const Feed = props => {
  const [token, setToken] = useState();

  useEffect(() => {
    requestUserPermission();
  }, [requestUserPermission]);

  const requestUserPermission = useCallback(async () => {
    const {status} = await requestNotifications([]);
    const enabled = status === RESULTS.GRANTED;

    enabled &&
      (await messaging()
        .getToken()
        .then(res => {
          setToken(res);
        }));
  }, []);
  const patchFCM = async () => {
    await ApiManagerV2.patch(apiUrl.PROFILE_EDIT, {
      fcm_token: token,
    });
  };
  useEffect(() => {
    patchFCM();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const [feeds, setFeeds] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [noFeedImage, setNoFeedImage] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [category, setCategory] = useState('');
  const [open, setOpen] = useState(false);

  const onRefresh = () => {
    if (!refreshing) {
      getRefreshData();
    }
  };

  const getRefreshData = async () => {
    setRefreshing(true);
    await getFeedList(0);
    setRefreshing(false);
  };

  // go to scroll on top
  const flatListRef = useRef(null);
  const stackNavigation = props.navigation;
  const tabNavigation = props.navigation.getParent();
  tabNavigation?.addListener('tabPress', e => {
    if (stackNavigation.getState().index === 0) {
      toTop();
    }
  });
  const toTop = useCallback(() => {
    flatListRef &&
      flatListRef.current.scrollToIndex({index: 0, animated: true});
  }, [flatListRef]);

  const getFeedList = async data => {
    setOffset(data);
    await ApiManagerV2.get(apiUrl.FEED_LIST, {
      params: {
        limit: globalVariable.FeedLimit,
        offset: data,
        category: category,
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
        } else {
          setNoFeedImage(res.data.payload.image);
        }
      })
      .catch(e => {
        FooiyToast.error();
      });
  };

  const loadMoreItem = () => {
    if (totalCount > offset + globalVariable.FeedLimit) {
      setOffset(offset + globalVariable.FeedLimit);
      getFeedList(offset + globalVariable.FeedLimit);
    }
  };

  const ListEmptyComponent = () => {
    return noFeedImage ? (
      <View>
        <Image source={{uri: noFeedImage}} />
      </View>
    ) : null;
  };

  const ListHeaderComponent = useCallback(() => {
    return (
      category !== globalVariable.category_cafe && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => stackNavigation.navigate('MenuClinic')}>
          <View style={styles.header_container}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Total_2 />
              <View style={{marginLeft: 14}}>
                <Text style={{...fooiyFont.Body2, color: fooiyColor.G600}}>
                  지금 뭐 먹을지 고민된다면?
                </Text>
                <Text style={{...fooiyFont.H4, color: fooiyColor.B}}>
                  메뉴상담소
                </Text>
              </View>
            </View>
            <View style={{marginRight: 16}}>
              <ArrowIconRight24 />
            </View>
          </View>
        </TouchableOpacity>
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  useEffect(() => {
    setFeeds([]);
    getFeedList(0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const renderItem = useCallback(({item}) => {
    return <UI_Feed {...item} parent={props.route.name} />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FeedHeader category={category} setOpen={setOpen} open={open} />
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={feeds}
          onRefresh={onRefresh}
          refreshing={refreshing}
          renderItem={renderItem}
          // https://reactnative.dev/docs/optimizing-flatlist-configuration#updatecellsbatchingperiod
          updateCellsBatchingPeriod={10}
          removeClippedSubviews={true}
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={FlatListFooter}
          keyExtractor={item => String(item.id)}
          onEndReached={loadMoreItem}
          ListEmptyComponent={ListEmptyComponent}
          onEndReachedThreshold={2}
          maxToRenderPerBatch={5}
        />
      </View>
      {open && (
        <SelectCategoryModal
          currentCategory={category}
          setCategory={setCategory}
          setOpen={setOpen}
          setFeeds={setFeeds}
          setOffset={setOffset}
          toTop={toTop}
          setTotalCount={setTotalCount}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header_container: {
    height: 80,
    paddingVertical: 12,
    marginLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Feed;
