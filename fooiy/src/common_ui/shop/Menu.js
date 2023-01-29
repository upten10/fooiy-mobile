import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ApiManagerV2} from '../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../common/Enums';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {StackHeader} from '../headers/StackHeader';

const Menu = props => {
  const [menuList, setMenuList] = useState([]);

  const getMenuList = async () => {
    await ApiManagerV2.get(apiUrl.SHOP_MENU, {
      params: {
        shop_id: props.route.params.shop.shop_id,
      },
    }).then(res => setMenuList(res.data.payload.menu_list));
  };

  const mainList = menuList.filter(item => item.price > 55555);
  const sideList = menuList.filter(item => item.price < 55556);
  console.log(mainList, 'mainList');
  console.log(sideList, 'sideList');
  console.log(menuList);
  useEffect(() => {
    getMenuList();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StackHeader menu={{shop_name: props.route.params.shop.shop_name}} />
      <ScrollView style={{height: '100%'}}>
        {mainList.length !== 0 ? (
          <Text style={styles.main_title}>메인</Text>
        ) : null}
        {mainList.map(item => {
          return (
            <View style={styles.menu_container}>
              <Text style={styles.menu_name}>{item.name}</Text>
              <Text style={styles.menu_price}>{item.price}원</Text>
            </View>
          );
        })}
        {sideList.length !== 0 ? (
          <Text style={styles.side_title}>사이드</Text>
        ) : null}
        {sideList.map(item => {
          return (
            <View style={styles.menu_container}>
              <Text style={styles.menu_name}>{item.name}</Text>
              <Text style={styles.menu_price}>{item.price}원</Text>
            </View>
          );
        })}
        <View style={styles.empty_space}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    backgroundColor: fooiyColor.W,
  },
  main_title: {
    ...fooiyFont.H3,
    margin: 16,
    marginBottom: 8,
  },
  menu_container: {
    borderBottomWidth: 1,
    borderBottomColor: fooiyColor.G200,
    height: 78,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  menu_name: {
    ...fooiyFont.Subtitle1,
    color: fooiyColor.G600,
    marginBottom: 4,
  },
  menu_price: {
    ...fooiyFont.Subtitle4,
    color: fooiyColor.P500,
  },
  side_title: {
    ...fooiyFont.H3,
    marginLeft: 16,
    marginBottom: 8,
    marginTop: 48,
  },
  empty_space: {
    height: 48,
  },
});
