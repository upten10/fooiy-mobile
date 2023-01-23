import React, {useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {globalStyles} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';
import BottomSheetShop from '../../common_ui/shop/BottomSheetShop';
const ShopModal = props => {
  const [current, setCurrent] = useState(0);
  const shopRef = useRef(null);
  const {onBackdropPress, shops_info, other_account_id} = props;

  useEffect(() => {
    if (shops_info.length !== 0) {
      setCurrent(0);
      shopRef.current.scrollToIndex({
        index: 0,
        animated: true,
        // 이거 안쓰면 왼쪽으로 쏠림 다른 방법 나중에 고민해보삼
        viewOffset: 16,
        // viewPosition?: number;
      });
    }
  }, [shops_info]);

  const shops = shops_info.map(shop => {
    return {
      category_list: shop.category_list,
      feed_count: shop.feed_count,
      image: shop.image,
      menu_price: shop.menu_price,
      public_id: shop.public_id,
      shop_name: shop.shop_name,
      shop_address: shop.address,
      other_account_id,
      onBackdropPress: onBackdropPress,
    };
  });

  const ItemSeparatorComponent = () => {
    return <View style={styles.item_separator} />;
  };
  const ListHeaderComponent = () => {
    return <View style={styles.list_header} />;
  };
  const ListFooterComponent = () => {
    return <View style={styles.list_header} />;
  };

  return (
    <View style={styles.modal_container}>
      {shops.length > 1 ? (
        <View style={styles.shop_list_indicator}>
          <Text style={styles.shop_list_indicator_text}>
            {current + 1} / {shops.length}
          </Text>
        </View>
      ) : null}

      <FlatList
        ref={shopRef}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        data={shops}
        initialScrollIndex={0}
        ListHeaderComponent={ListHeaderComponent}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListFooterComponent={ListFooterComponent}
        onMomentumScrollEnd={event => {
          const index = Math.floor(
            Math.floor(event.nativeEvent.contentOffset.x) /
              Math.floor(event.nativeEvent.layoutMeasurement.width),
          );
          setCurrent(index);
        }}
        renderItem={({item, index}) => (
          <View style={styles.shop_container}>
            <BottomSheetShop {...item} key={index} />
          </View>
        )}
      />
    </View>
  );
};

export default ShopModal;

const styles = StyleSheet.create({
  modal_container: {
    position: 'absolute',
    bottom: globalVariable.height * 0.2,
    // marginHorizontal: 16,
    ...globalStyles.shadow,
  },
  shop_container: {
    width: globalVariable.width - 32,
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: '#fff',
    height: globalVariable.height / 6,
  },
  item_separator: {
    width: 32,
  },
  list_header: {
    width: 16,
  },
  shop_list_indicator: {
    flex: 1,
    backgroundColor: '#000',
    width: globalVariable.width / 8,
    borderRadius: 20,
    marginBottom: 8,
    marginRight: 16,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    opacity: 0.8,
  },
  shop_list_indicator_text: {color: '#fff'},
});
