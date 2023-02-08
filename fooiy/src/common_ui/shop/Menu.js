import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Notice_24, Notice_24_Bold} from '../../../assets/icons/svg';
import {ApiManagerV2} from '../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../common/Enums';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';
import {StackHeader} from '../headers/StackHeader';
import Margin from '../Margin';
import MenuFrame from './MenuFrame';

const Menu = props => {
  const [main, setMain] = useState([]);
  const [set, setSet] = useState([]);
  const [side, setSide] = useState([]);
  const [beverage, setBeverage] = useState([]);
  const [liquor, setLiquor] = useState([]);
  const shopInfo = props.route.params.shop;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const setMenu = menu_list => {
    if (shopInfo.category !== globalVariable.category_cafe) {
      setMain(menu_list.MAIN);
      setSet(menu_list.SET);
      setSide(menu_list.SIDE);
      setBeverage(menu_list.BEVERAGE);
      setLiquor(menu_list.LIQUOR);
    } else {
      setBeverage(menu_list.BEVERAGE);
      setLiquor(menu_list.LIQUOR);
      setMain(menu_list.MAIN);
    }
  };

  const getMenuList = async () => {
    await ApiManagerV2.get(apiUrl.SHOP_MENU, {
      params: {
        shop_id: shopInfo.shop_id,
      },
    }).then(res => setMenu(res.data.payload.menu_list));
  };

  const onclickReport = () => {
    navigation.navigate('MenuReport', {shop: shopInfo});
  };

  useEffect(() => {
    shopInfo && getMenuList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopInfo]);

  const ShopMenu = () => {
    if (shopInfo.category === globalVariable.category_cafe) {
      return (
        <>
          {beverage.length !== 0 && (
            <MenuFrame title={'음료'} menu_list={beverage} />
          )}
          {liquor.length !== 0 && (
            <MenuFrame title={'주류'} menu_list={liquor} />
          )}
          {main.length !== 0 && (
            <MenuFrame title={'디저트/브런치'} menu_list={main} />
          )}
        </>
      );
    } else if (shopInfo.category === 'PUB') {
      return (
        <>
          {main.length !== 0 && <MenuFrame title={'메인'} menu_list={main} />}
          {set.length !== 0 && <MenuFrame title={'세트'} menu_list={set} />}
          {side.length !== 0 && <MenuFrame title={'사이드'} menu_list={side} />}
          {liquor.length !== 0 && (
            <MenuFrame title={'주류'} menu_list={liquor} />
          )}
          {beverage.length !== 0 && (
            <MenuFrame title={'음료'} menu_list={beverage} />
          )}
        </>
      );
    } else {
      return (
        <>
          {main.length !== 0 && <MenuFrame title={'메인'} menu_list={main} />}
          {set.length !== 0 && <MenuFrame title={'세트'} menu_list={set} />}
          {side.length !== 0 && <MenuFrame title={'사이드'} menu_list={side} />}
          {beverage.length !== 0 && (
            <MenuFrame title={'음료'} menu_list={beverage} />
          )}
          {liquor.length !== 0 && (
            <MenuFrame title={'주류'} menu_list={liquor} />
          )}
        </>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StackHeader menu={{shop_name: shopInfo.name}} />
      <ScrollView>
        <View
          style={{minHeight: globalVariable.height - 56 - insets.top - 220}}>
          <ShopMenu />
        </View>
        <Margin h={16} />
        <View style={styles.empty_space}>
          <Margin h={8} />
          <View style={styles.report_text_container}>
            <Notice_24 />
            <Margin w={8} />
            <Text style={styles.report_text}>
              메뉴와 가격은 음식점 사정에 따라 달라질 수 있어요.{'\n'}
              실제 가격과 다른 경우 '제보하기'로 정확한 정보를 알려주세요.
            </Text>
          </View>
          <Margin h={16} />
          <TouchableOpacity activeOpacity={0.8} onPress={onclickReport}>
            <View style={styles.report_button_container}>
              <Text style={styles.report_button}>제보하기</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    backgroundColor: fooiyColor.W,
  },

  empty_space: {
    height: 204,
    backgroundColor: fooiyColor.G50,
    padding: 16,
  },
  report_text_container: {
    flexDirection: 'row',
  },
  report_text: {
    ...fooiyFont.Subtitle4,
    color: fooiyColor.G400,
  },
  report_button_container: {
    borderWidth: 1,
    borderRadius: 8,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: fooiyColor.G200,
  },
  report_button: {
    ...fooiyFont.Button,
    color: fooiyColor.G600,
    lineHeight: Platform.select({ios: 0, android: 16}),
  },
});
