import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';

const ShopListUI = item => {
  const {
    index,
    address,
    menu_price,
    name,
    public_id,
    score,
    shop_category_list,
    thumbnail,
  } = item;
  const navigation = useNavigation();
  const imageWidth = (globalVariable.width - 32 - 15) / 2;

  return (
    <TouchableOpacity
      key={index}
      style={{
        backgroundColor: fooiyColor.W,
        marginHorizontal: 7.5,
        paddingBottom: 24,
      }}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('Shop', {
          shop_id: public_id,
          shop_name: name,
          shop_address: address,
          // 수정 필요
          shop_longitude: 127.11729911704028,
          shop_latitude: 37.32417435738688,
          // 수정 필요
        })
      }>
      {/* img */}
      <View style={{width: imageWidth, height: imageWidth, marginBottom: 8}}>
        <View style={styles.fooiyti_container}>
          <Text style={{...fooiyFont.Subtitle4, color: fooiyColor.W}}>
            {score}%
          </Text>
        </View>
        <View>
          <FastImage
            source={{uri: thumbnail}}
            style={{width: '100%', height: '100%', borderRadius: 16}}
          />
        </View>
      </View>
      {/* shop info */}
      <View style={{marginBottom: 8}}>
        <Text
          style={{
            ...fooiyFont.Subtitle2,
            color: fooiyColor.B,
            width: imageWidth,
          }}>
          {name}
        </Text>
        <Text
          style={{
            ...fooiyFont.Body2,
            color: fooiyColor.G800,
            width: imageWidth,
          }}>
          {menu_price}
        </Text>
      </View>
      {/* category */}
      <View style={{flexDirection: 'row', width: imageWidth}}>
        {shop_category_list.map((item, index) => {
          return (
            <View style={styles.category_container} key={index}>
              <Text style={{...fooiyFont.Caption1_1, paddingHorizontal: 8}}>
                {item}
              </Text>
            </View>
          );
        })}
      </View>
    </TouchableOpacity>
  );
};

export default ShopListUI;

const styles = StyleSheet.create({
  fooiyti_container: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: fooiyColor.P500,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  category_container: {
    backgroundColor: fooiyColor.G50,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
});
