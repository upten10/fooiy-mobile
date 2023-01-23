import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';

const BottomSheetShop = item => {
  const category_list = item.category_list;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        item.onBackdropPress ? item.onBackdropPress() : null;
        navigation.navigate('Shop', {
          shop_id: item.public_id,
          shop_name: item.shop_name,
          type: 'mypage',
          ...(item.other_account_id && {
            other_account_id: item.other_account_id,
          }),
        });
      }}>
      <View style={styles.container}>
        <View style={styles.menu_image_container}>
          <Image source={{uri: item.image}} style={styles.menu_image} />
        </View>
        <View style={styles.shop_info_container}>
          <View style={styles.shop_detail_container}>
            <Text style={styles.shop_detail_feeds_count}>
              {item.feed_count}개의 피드가 있어요
            </Text>
            <Text style={styles.shop_detail_name}>{item.shop_name}</Text>
            <Text style={styles.shop_detail_price}>{item.menu_price}</Text>
          </View>
          <View style={styles.category_list_container}>
            {category_list
              ? category_list.map(category => (
                  <View style={styles.category_container}>
                    <Text style={styles.category}>{category}</Text>
                  </View>
                ))
              : null}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BottomSheetShop;

const styles = StyleSheet.create({
  container: {
    width: globalVariable.width,
    height: 136,
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
  },
  category_list_container: {
    flexDirection: 'row',
  },
  category_container: {
    borderRadius: 8,
    backgroundColor: fooiyColor.G50,
    marginRight: 4,
  },
  category: {
    ...fooiyFont.Caption1_1,
    color: fooiyColor.G600,
    marginHorizontal: 8,
    marginVertical: 6,
  },
  shop_detail_container: {justifyContent: 'center', flex: 1},
  score_container: {justifyContent: 'flex-end', flex: 1},
  score: {
    fontSize: 18,
  },

  menu_image: {
    width: 104,
    height: 104,
    resizeMode: 'cover',
    borderRadius: 16,
    marginRight: 16,
  },
  shop_detail_name: {
    ...fooiyFont.Subtitle2,
    marginBottom: 2,
  },
  shop_detail_price: {
    ...fooiyFont.Caption1,
    marginBottom: 10,
  },
  shop_detail_feeds_count: {
    ...fooiyFont.Subtitle3,
    color: fooiyColor.P500,
    marginBottom: 2,
  },
});
