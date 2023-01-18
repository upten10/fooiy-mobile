import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {FlatList, FlatListgi, StyleSheet, View} from 'react-native';
import {ApiMangerV1} from '../../../common/api/v1/ApiMangerV1';
import {apiUrl} from '../../../common/Enums';
import {globalVariable} from '../../../common/globalVariable';
import {StackHeader} from '../../../common_ui/headers/StackHeader';
import {UI_Feed} from '../../../common_ui/feed/Feed';
import {RenderLoader} from '../../../common_ui/RenderLoader';
import {SafeAreaView} from 'react-native-safe-area-context';

const OtherUserFeedDetail = props => {
  const [feeds, setFeeds] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [nickname, setNickname] = useState('');

  console.log(props.route.params.other_account_id);

  useEffect(() => {
    if (props.route.params) {
      getOtherFeed(props.route.params);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props, offset]);

  const getOtherFeed = async data => {
    const {id, is_confirm} = data.item;
    const idType = is_confirm ? 'pioneer_id' : 'feed_id';
    await ApiMangerV1.get(apiUrl.MYPAGE_FEED_LIST, {
      params: {
        type: 'list',
        [idType]: id,
        other_account_id: data.other_account_id,
      },
    }).then(res => {
      setFeeds([...res.data.payload.feed_list.results]);
      setIsLoading(false);
      setTotalCount(res.data.payload.feed_list.total_count);
      setNickname(res.data.payload.feed_list.results[0].nickname);
    });
  };

  const loadMoreItem = () => {
    if (totalCount > offset) {
      setOffset(offset + globalVariable.FeedLimit);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StackHeader title={nickname} />
      <FlatList
        data={feeds}
        renderItem={({item}) => (
          <UI_Feed
            {...item}
            parent={props.route.name}
            stackName={'OtherUserPage'}
          />
        )}
        keyExtractor={(feeds, index) => index.toString()}
        ListFooterComponent={RenderLoader(isLoading)}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={3}
      />
    </SafeAreaView>
  );
};

export default OtherUserFeedDetail;

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