import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Button,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackHeader} from '../headers/StackHeader';
import {ApiManagerV2} from '../../common/api/v2/ApiManagerV2';
import {globalVariable} from '../../common/globalVariable';
import {RenderLoader} from '../RenderLoader';
import UI_Feed from '../feed/UI_Feed';
import {useNavigation} from '@react-navigation/native';
import {apiUrl} from '../../common/Enums';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Menu} from '../../../assets/icons/svg';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import ShopFooiyti from './ShopFooiyti';

const Shop = props => {
  const [feeds, setFeeds] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [shopInfo, setShopInfo] = useState({});
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const type = props.route.params.type && props.route.params.type;
  const other_account_id =
    props.route.params.other_account_id && props.route.params.other_account_id;

  const getShopInfo = async () => {
    await ApiManagerV2.get(apiUrl.SHOP_INFO, {
      params: {
        shop_id: props.route.params.shop_id,
      },
    }).then(res => setShopInfo(res.data.payload.shop_info));
  };
  useEffect(() => {
    getShopInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.route.params]);

  const getFeedList = async data => {
    setIsLoading(true);
    await ApiManagerV2.get(apiUrl.SHOP_LIST, {
      params: {
        limit: globalVariable.FeedLimit,
        offset: offset,
        shop_id: data,
        ...(type && {type: type}),
        ...(other_account_id && {other_account_id: other_account_id}),
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

  const go_map = () => {
    navigation.navigate('FindWay', {
      shop: shopInfo,
    });
  };
  const onClickMenu = () => {
    navigation.navigate('Menu', {
      shop: shopInfo,
    });
  };
  const onClickRegister = () => {
    navigation.navigate('Register', {
      shop: props.route.params,
    });
  };

  const ListHeaderComponent = useCallback(() => {
    return shopInfo.fooiyti && <ShopFooiyti fooiyti={shopInfo.fooiyti} />;
  }, [shopInfo.fooiyti]);

  return (
    <SafeAreaView style={styles.container}>
      <StackHeader shop={shopInfo} map={go_map} />

      <FlatList
        data={feeds}
        renderItem={({item}) => (
          <UI_Feed {...item} disable_shop_button={true} />
        )}
        keyExtractor={(feeds, index) => index.toString()}
        ListFooterComponent={RenderLoader(isLoading)}
        ListHeaderComponent={ListHeaderComponent}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={3}
      />
      <View style={[styles.bottom_container, {height: insets.bottom + 88}]}>
        <TouchableOpacity
          style={styles.menu_container}
          activeOpacity={0.8}
          onPress={onClickMenu}>
          <Menu style={styles.menu} />
          <Text style={styles.menu_text}>메뉴판</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.register_container}
          activeOpacity={0.8}
          onPress={onClickRegister}>
          <Text style={styles.register_text}>피드 등록하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Shop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: fooiyColor.W,
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
  bottom_container: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    backgroundColor: fooiyColor.W,
    flexDirection: 'row',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.16,
    shadowOffset: {width: 0, height: -4},
    shadowRadius: 16,
  },
  menu_container: {
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    width: 56,
    height: 56,
  },
  menu: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  menu_text: {
    ...fooiyFont.Caption1,
    lineHeight: 18,
    color: fooiyColor.P500,
    textAlign: 'center',
  },
  register_container: {
    margin: 16,
    marginLeft: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: fooiyColor.P500,
    height: 56,
    flex: 1,
    borderRadius: 8,
  },
  register_text: {
    ...fooiyFont.Button,
    letterSpacing: 0.5,
    color: fooiyColor.W,
    textAlign: 'center',
  },
});
