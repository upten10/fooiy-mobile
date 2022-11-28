import React, {useRef, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {globalVariable} from '../../common/globalVariable';
import BottomSheetShop from '../../common_ui/shop/BottomSheetShop';
const ShopModal = props => {
  const [current, setCurrent] = useState(0);
  const shopRef = useRef(null);
  const {onBackdropPress} = props;
  const items = [
    {
      public_id: '20b8ca6c-6955-42c4-a4e3-e2cd94b0a6cf',
      longitude: '126.840060807676',
      latitude: '37.3002844901945',
      address: '경기 안산시 상록구 학사2길 18',
      name: '점수ㅐ계산테스트',
      shop_category_list: ['돈까스'],
      shop_score: '94%',
      menu_image:
        'https://dev-fooiy.s3.ap-northeast-2.amazonaws.com/feeds/pioneer/5bfe4c27-553f-4985-bc8a-b6fce2d05423/06aaf8d0-5bd0-4433-a9b7-acd915705e50/8E9F7F14.png.small',
      menu_price: '44,444원',
      onBackdropPress: onBackdropPress,
    },
    {
      public_id: '20b8ca6c-6955-42c4-a4e3-e2cd94b0a6cf',
      longitude: '126.840060807676',
      latitude: '37.3002844901945',
      address: '경기 안산시 상록구 학사2길 18',
      name: '점수ㅐ계산테스트',
      shop_category_list: ['돈까스'],
      shop_score: '92%',
      menu_image:
        'https://dev-fooiy.s3.ap-northeast-2.amazonaws.com/feeds/pioneer/5bfe4c27-553f-4985-bc8a-b6fce2d05423/06aaf8d0-5bd0-4433-a9b7-acd915705e50/8E9F7F14.png.small',
      menu_price: '44,444원',
      onBackdropPress: onBackdropPress,
    },
    {
      public_id: '20b8ca6c-6955-42c4-a4e3-e2cd94b0a6cf',
      longitude: '126.840060807676',
      latitude: '37.3002844901945',
      address: '경기 안산시 상록구 학사2길 18',
      name: '점수ㅐ계산테스트',
      shop_category_list: ['돈까스'],
      shop_score: '92%',
      menu_image:
        'https://dev-fooiy.s3.ap-northeast-2.amazonaws.com/feeds/pioneer/5bfe4c27-553f-4985-bc8a-b6fce2d05423/06aaf8d0-5bd0-4433-a9b7-acd915705e50/8E9F7F14.png.small',
      menu_price: '44,444원',
      onBackdropPress: onBackdropPress,
    },
  ];
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
      {items.length > 1 ? (
        <View style={styles.shop_list_indicator}>
          <Text style={styles.shop_list_indicator_text}>
            {current + 1} / {items.length}
          </Text>
        </View>
      ) : null}

      <FlatList
        ref={shopRef}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        data={items}
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
