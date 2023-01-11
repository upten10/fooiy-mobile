import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ApiMangerV1} from '../../common/api/v1/ApiMangerV1';
import {apiUrl} from '../../common/Enums';
import {globalVariable} from '../../common/globalVariable';
import {UI_Feed} from '../../common_ui/feed/Feed';
import {StackHeader} from '../../common_ui/headers/StackHeader';
import {RenderLoader} from '../../common_ui/RenderLoader';

const FeedDetail = props => {
  const [feeds, setFeeds] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [nickname, setNickname] = useState('');
  const navigation = useNavigation();
  props.navigation.getParent().setOptions({tabBarStyle: {display: 'none'}});

  useEffect(() => {
    if (props.route.params.shop_id) {
    } else if (props.route.params.item) {
      getFeed(props.route.params.item);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFeed = async data => {
    const {id, is_confirm} = data;
    const idType = is_confirm ? 'pioneer_id' : 'feed_id';
    await ApiMangerV1.get(apiUrl.MYPAGE_FEED_LIST, {
      params: {
        type: 'list',
        [idType]: id,
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
    <View style={styles.container}>
      <StackHeader title={nickname} />
      <FlatList
        data={feeds}
        renderItem={({item}) => <UI_Feed {...item} />}
        keyExtractor={(feeds, index) => index.toString()}
        ListFooterComponent={RenderLoader(isLoading)}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={3}
      />
    </View>
  );
};

export default FeedDetail;

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
