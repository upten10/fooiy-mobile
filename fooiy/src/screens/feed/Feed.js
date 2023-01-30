import {React, useEffect, useState, useRef, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, StyleSheet, Image, FlatList, Text} from 'react-native';

import {ApiManagerV2} from '../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../common/Enums';
import {globalVariable} from '../../common/globalVariable';
import UI_Feed from '../../common_ui/feed/UI_Feed';
import {FeedHeader} from '../../common_ui/headers/FeedHeader';
import SelectCategoryModal from './SelectCategoryModal';

const Feed = props => {
  const [feeds, setFeeds] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [noFeedImage, setNoFeedImage] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [category, setCategory] = useState('');
  const [open, setOpen] = useState(true);

  const onRefresh = () => {
    if (!refreshing) {
      setOffset(0);
      setFeeds([]);
      getRefreshData();
    }
  };

  const getRefreshData = async () => {
    setRefreshing(true);
    await getFeedList();
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

  const getFeedList = async () => {
    await ApiManagerV2.get(apiUrl.FEED_LIST, {
      params: {
        limit: globalVariable.FeedLimit,
        offset: offset,
        category: category,
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
  const loadMoreItem = () => {
    if (totalCount > offset) {
      setOffset(offset + globalVariable.FeedLimit);
    }
  };

  const ListEmptyComponent = () => {
    return noFeedImage ? (
      <View>
        <Image source={{uri: noFeedImage}} />
      </View>
    ) : null;
  };

  useEffect(() => {
    getFeedList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, category]);

  return (
    <SafeAreaView style={styles.container}>
      <FeedHeader category={category} setOpen={setOpen} open={open} />

      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={feeds}
          onRefresh={onRefresh}
          refreshing={refreshing}
          renderItem={({item}) => (
            <UI_Feed {...item} parent={props.route.name} />
          )}
          updateCellsBatchingPeriod={5}
          removeClippedSubviews={true}
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
