import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  Ic_arrow_right_large_G400,
  Ic_taste_evaluation_10,
  Ic_taste_evaluation_30,
  Ic_taste_evaluation_50,
  Ic_taste_evaluation_70,
  Ic_taste_evaluation_99,
} from '../../../assets/svg';
import FooiyToast from '../../common/FooiyToast';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';
import {elapsedText} from '../../common/helpers/elapsedText';

const FeedShopInfo = props => {
  const {
    shop_id,
    shop_name,
    shop_address,
    longitude,
    latitude,
    taste_evaluation,
    menu_name,
    menu_price,
    disableShopButton,
    setModalVisible,
    is_confirm,
    isLogin,
  } = props;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          isLogin !== false
            ? !is_confirm &&
              !disableShopButton &&
              navigation.push('Shop', {
                shop_id: shop_id,
                shop_name: shop_name,
                shop_address: shop_address,
                shop_longitude: longitude,
                shop_latitude: latitude,
              })
            : FooiyToast.message('뒤로가기 후 로그인해주세요', false, 0)
        }>
        <View style={styles.shop_info_container}>
          <View style={styles.shop_info}>
            <View>
              <Text style={styles.shop_name}>{shop_name}</Text>
              <View style={styles.menu_container}>
                <Text style={styles.menu_name}>
                  {elapsedText(menu_name, 14)}
                </Text>
                <Text style={styles.menu_price}>{menu_price}</Text>
              </View>
            </View>
          </View>
          <View style={styles.arrow_icon}>
            <Ic_arrow_right_large_G400 />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setModalVisible(true)}>
        <View style={styles.taste_evaluation_container}>
          <Text style={styles.taste_evaluation_text}>맛 평가</Text>
          <View style={styles.taste_evaluation_imogi}>
            {taste_evaluation === 99 ? (
              <Ic_taste_evaluation_99 />
            ) : taste_evaluation === 70 ? (
              <Ic_taste_evaluation_70 />
            ) : taste_evaluation === 50 ? (
              <Ic_taste_evaluation_50 />
            ) : taste_evaluation === 30 ? (
              <Ic_taste_evaluation_30 />
            ) : (
              <Ic_taste_evaluation_10 />
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default memo(FeedShopInfo);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: globalVariable.width,
    height: 80,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  shop_info_container: {
    width: globalVariable.width - 112,
    height: 80,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: fooiyColor.G200,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shop_info: {
    justifyContent: 'center',
    paddingLeft: 16,
  },
  shop_name: {
    ...fooiyFont.Subtitle2,
    color: fooiyColor.G800,
  },
  menu_container: {
    flexDirection: 'row',
  },
  menu_name: {
    ...fooiyFont.Body2,
    color: fooiyColor.G800,
  },
  menu_price: {
    marginLeft: 4,
    ...fooiyFont.Body2,
    color: fooiyColor.P500,
  },
  arrow_icon: {
    width: 24,
    height: 24,
    marginRight: 16,
    marginVertical: 28,
  },
  taste_evaluation_container: {
    marginLeft: 8,
    width: 72,
    height: 80,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: fooiyColor.G200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taste_evaluation_text: {
    ...fooiyFont.Subtitle3,
    color: fooiyColor.G800,
  },
  taste_evaluation_imogi: {
    width: 24,
    height: 24,
    marginTop: 4,
  },
});
