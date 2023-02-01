import React, {memo, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ApiManagerV2} from '../../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../../common/Enums';
import {globalVariable} from '../../../common/globalVariable';
import ShopListUI from '../../../common_ui/shop/ShopListUI';

const CatalogedList = props => {
  const insets = useSafeAreaInsets();

  const {item, isCafe, isOpend, screenLocation, setCurrentIndex} = props;

  const [shops, setShops] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [emptyShopImage, setEmptyShopImage] = useState('');

  const curList = useRef(null);

  useEffect(() => {
    if (isOpend) {
      getShopList(screenLocation);
    } else {
      setShops([]);
      setOffset(0);
      setTotalCount(0);
      setEmptyShopImage('');
      setCurrentIndex(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpend]);

  const getShopList = async data => {
    await ApiManagerV2.get(apiUrl.MAP_SHOP_LIST, {
      params: {
        limit: globalVariable.MapBottomSheetLimit,
        offset: offset,
        longitude_left_bottom: data[0].longitude,
        latitude_left_bottom: data[0].latitude,
        latitude_right_top: data[1].latitude,
        longitude_right_top: data[1].longitude,
        ...(isCafe ? {shop_category: globalVariable.category_cafe} : null),
        type: item,
      },
    })
      .then(res => {
        if (res.data.payload.shop_list) {
          setShops([...shops, ...res.data.payload.shop_list.results]);
          setTotalCount(res.data.payload.shop_list.total_count);
          setOffset(offset + globalVariable.MapBottomSheetLimit);
        } else if (res.data.payload.image) {
          setEmptyShopImage(res.data.payload.image);
        }
      })
      .catch(e => console.log(e));
  };

  const loadMoreItem = () => {
    if (totalCount > offset) {
      getShopList(screenLocation);
    }
  };

  const listEmptyComponent = () => {
    if (isOpend) {
      return (
        <View style={styles.emptyShopContainer}>
          {emptyShopImage ? (
            <Image
              source={{uri: emptyShopImage}}
              style={styles.empty_shop_image}
            />
          ) : (
            <View style={styles.indicator_container}>
              <ActivityIndicator size="large" style={styles.loader} />
            </View>
          )}
        </View>
      );
    }
  };

  const ListHeaderComponent = () => {
    return <View style={{height: 16}} />;
  };

  const listFooterComponent = () => {
    return (
      <View style={{height: globalVariable.tabBarHeight + insets.bottom}} />
    );
  };

  return (
    <FlatList
      key={item}
      ref={curList}
      data={shops}
      ListEmptyComponent={listEmptyComponent}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={listFooterComponent}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <ShopListUI {...item} />}
      onEndReached={loadMoreItem}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={true}
    />
  );
};

export default memo(CatalogedList);

const styles = StyleSheet.create({
  emptyShopContainer: {
    width: globalVariable.width,
    height: globalVariable.width,
    justifyContent: 'center',
  },
  empty_shop_image: {
    width: globalVariable.width,
    height: globalVariable.width,
  },
});
