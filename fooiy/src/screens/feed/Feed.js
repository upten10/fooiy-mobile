import {React, useEffect, useState, useRef, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, StyleSheet, Image, FlatList, Text} from 'react-native';

import {ApiManagerV2} from '../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../common/Enums';
import {globalVariable} from '../../common/globalVariable';
import UI_Feed from '../../common_ui/feed/UI_Feed';
import {FeedHeader} from '../../common_ui/headers/FeedHeader';
import SelectCategoryModal from './SelectCategoryModal';
import FlatListFooter from '../../common_ui/footer/FlatListFooter';

const Feed = props => {
  const [feeds, setFeeds] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [noFeedImage, setNoFeedImage] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [category, setCategory] = useState('');
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setTimeout(function () {
      setOpen(false);
    }, 3000);
  }, []);

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
  const toTop = () => {
    flatListRef.current.scrollToIndex({index: 0, animated: true});
  };

  const getFeedList = async data => {
    setOffset(data);
    await ApiManagerV2.get(apiUrl.FEED_LIST, {
      params: {
        limit: globalVariable.FeedLimit,
        offset: data,
        category: category,
      },
    }).then(res => {
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
    });
    // .catch(function (error) => console.log(error));
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
        <View style={{height: 80}}>
          <Text>메뉴상담소</Text>
        </View>
      )
    );
  }, [category]);

  useEffect(() => {
    setFeeds([]);
    getFeedList(0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const renderItem = useCallback(item => {
    return <UI_Feed {...item.item} />;
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
          updateCellsBatchingPeriod={100}
          removeClippedSubviews={true}
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={FlatListFooter}
          keyExtractor={item => String(item.id)}
          onEndReached={loadMoreItem}
          ListEmptyComponent={ListEmptyComponent}
          onEndReachedThreshold={2}
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
});

export default Feed;
