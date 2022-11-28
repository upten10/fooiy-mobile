import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {globalVariable} from '../../common/globalVariable';

const BottomSheetShop = item => {
  const category_list = item.shop_category_list;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        item.onBackdropPress ? item.onBackdropPress() : null;
        navigation.navigate('Shop', {
          shop_id: item.public_id,
          shop_name: item.name,
          shop_address: item.address,
        });
      }}>
      <View style={styles.container}>
        <View style={styles.menu_image_container}>
          <Image source={{uri: item.menu_image}} style={styles.menu_image} />
        </View>
        <View style={styles.shop_info_container}>
          <View style={styles.category_list_container}>
            {category_list
              ? category_list.map(category => (
                  <View style={styles.category_container}>
                    <Text style={styles.category}>{category}</Text>
                  </View>
                ))
              : null}
          </View>
          <View style={styles.shop_detail_container}>
            <Text>{item.name}</Text>
            <Text>{item.menu_price}</Text>
          </View>
          <View style={styles.score_container}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
              <Text style={styles.score}>{item.shop_score}</Text>
              <Text style={styles.score_text}>확률로 마음에 들거에요</Text>
            </View>
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
    height: globalVariable.height / 7,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 7,
    marginBottom: 7,
    alignItems: 'center',
    flexDirection: 'row',
  },
  shop_info_container: {
    marginLeft: 15,
    height: globalVariable.height / 8.5,
    flex: 1,
  },
  category_list_container: {
    flexDirection: 'row',
  },
  category_container: {
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#FF5C5C',
    borderRadius: 10,
  },
  category: {
    margin: 6,
    color: '#FF5C5C',
  },
  shop_detail_container: {justifyContent: 'center', flex: 1},
  score_container: {justifyContent: 'flex-end', flex: 1},
  score: {
    fontSize: 18,
  },

  menu_image: {
    width: globalVariable.height / 8.5,
    height: globalVariable.height / 8.5,
    resizeMode: 'contain',
    borderRadius: 10,
  },
});
