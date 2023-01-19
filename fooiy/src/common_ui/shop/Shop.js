import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Button, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {StackHeader} from '../headers/StackHeader';
import {ApiManagerV2} from '../../common/api/v2/ApiManagerV2';
import {globalVariable} from '../../common/globalVariable';
import {RenderLoader} from '../RenderLoader';
import {UI_Feed} from '../feed/Feed';

import {useNavigation} from '@react-navigation/native';
import {apiUrl} from '../../common/Enums';

export const Shop = props => {
  const [feeds, setFeeds] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const getFeedList = async data => {
    setIsLoading(true);
    await ApiManagerV2.get(apiUrl.SHOP_LIST, {
      params: {
        limit: globalVariable.FeedLimit,
        offset: offset,
        shop_id: data,
      },
    }).then(res => {
      setFeeds([...feeds, ...res.data.payload.feed_list.results]);
      setIsLoading(false);
      setTotalCount(res.data.payload.feed_list.total_count);
    });
    // .catch(function (error) => console.log(error));
  };
  const loadMoreItem = () => {
    if (totalCount > offset) {
      setOffset(offset + globalVariable.FeedLimit);
    }
  };
  useEffect(() => {
    getFeedList(props.route.params.shop_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);
  return (
    <SafeAreaView style={styles.container}>
      <StackHeader shop={props.route.params} />
      <FlatList
        data={feeds}
        renderItem={({item}) => (
          <UI_Feed {...item} disable_shop_button={true} />
        )}
        keyExtractor={(feeds, index) => index.toString()}
        ListFooterComponent={RenderLoader(isLoading)}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={3}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  shop_name: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  test: {
    height: 100,
    zIndex: 100,
    backgroundColor: '#242424',
    display: 'flex',
    position: 'absolute',
    top: 700,
    elevation: 1,
  },
});
