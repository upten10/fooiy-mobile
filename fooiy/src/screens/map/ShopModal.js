import React, {useRef, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {globalVariable} from '../../common/globalVariable';
import BottomSheetShop from '../../common_ui/shop/BottomSheetShop';
const ShopModal = props => {
  const [current, setCurrent] = useState(0);
  const shopRef = useRef(null);
  const {onBackdropPress, shops_info} = props;
  const shops = shops_info.map(shop => {
    return {
      public_id: shop.public_id,
      longitude: shop.longitude,
      latitude: shop.latitude,
      address: shop.address,
      name: shop.name,
      shop_category_list: shop.shop_category_list,
      shop_score: shop.shop_score,
      menu_image: shop.menu_image,
      menu_price: shop.menu_price,
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
        renderItem={({item}) => (
          <View style={styles.shop_container}>
            <BottomSheetShop {...item} />
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
  },
  shop_container: {
    width: globalVariable.width - 20,
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#fff',
    height: globalVariable.height / 6,
  },
  item_separator: {
    width: 20,
  },
  list_header: {
    width: 10,
  },
  shop_list_indicator: {
    flex: 1,
    backgroundColor: '#000',
    width: globalVariable.width / 8,
    borderRadius: 20,
    margin: 10,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },
  shop_list_indicator_text: {color: '#fff'},
});
