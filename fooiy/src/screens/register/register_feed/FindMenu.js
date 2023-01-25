import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {globalVariable} from '../../../common/globalVariable';
import {StackHeader} from '../../../common_ui/headers/StackHeader';
import {fooiyColor, fooiyFont} from '../../../common/globalStyles';
import {ScrollView} from 'react-native-gesture-handler';
import {ApiManagerV2} from '../../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../../common/Enums';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {Search} from '../../../../assets/icons/svg';

const FindMenu = props => {
  const shop_id = props.route.params.shop.shop_id
    ? props.route.params.shop.shop_id
    : props.route.params.shop.public_id;
  const address = props.route.params.address
    ? props.route.params.address
    : props.route.params.shop.shop_address;
  const [menuList, setMenuList] = useState([]);
  const [searchMenu, setSearchMenu] = useState([]);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const getMenuList = async () => {
    await ApiManagerV2.get(apiUrl.SHOP_MENU, {
      params: {
        shop_id: shop_id,
      },
    }).then(res => {
      setMenuList(res.data.payload.menu_list),
        setSearchMenu(res.data.payload.menu_list);
    });
  };

  useEffect(() => {
    getMenuList();
  }, []);

  const onChangeText = text => {
    const nextData = menuList.filter(
      menuList => menuList.name.indexOf(text) > -1,
    );
    setSearchMenu(nextData);
  };

  return (
    <SafeAreaView
      style={{backgroundColor: fooiyColor.W, flex: 1, paddingBottom: 16}}>
      <ScrollView
        style={
          {
            // height: globalVariable.height - insets.top - insets.bottom - 56 - 16,
            // marginBottom: 16,
          }
        }>
        <StackHeader title="메뉴 선택" />
        <View style={styles.top_text_view}>
          <Text style={styles.top_text}>메뉴를{'\n'}선택해주세요</Text>
        </View>
        <View style={styles.search_view}>
          <TextInput
            placeholder="메뉴를 검색해보세요!"
            style={styles.search_input}
            maxLength={20}
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
            placeholderTextColor={fooiyColor.G400}
            onChangeText={text => {
              onChangeText(text);
            }}
          />
          <Search style={styles.search_icon} />
        </View>
        {searchMenu &&
          searchMenu.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('RegisterFeed', {
                    photo_list: props.route.params.photo_list,
                    shop: props.route.params.shop,
                    menu: item,
                    address: address,
                  })
                }>
                <View style={styles.menu_view}>
                  <Text style={styles.menu_name}>{item.name}</Text>
                  <Text style={styles.menu_price}>{item.price}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
      <View>
        <TouchableOpacity
          style={styles.no_menu_btn}
          onPress={() => {
            navigation.navigate('RegisterFeed', {
              photo_list: props.route.params.photo_list,
              shop: props.route.params.shop,
              menu: null,
              address: address,
            });
          }}>
          <Text style={styles.no_menu_text}>먹은 메뉴가 없어요</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FindMenu;

const styles = StyleSheet.create({
  top_text_view: {
    width: '100%',
    height: 64,
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  top_text: {
    ...fooiyFont.H3,
    marginLeft: 16,
  },
  search_view: {
    width: '100%',
    height: 56,
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  search_input: {
    width: '100%',
    height: '100%',
    backgroundColor: fooiyColor.G50,
    borderRadius: 8,
    ...fooiyFont.Subtitle3,
    padding: 16,
    justifyContent: 'center',
    lineHeight: 0,
  },
  search_icon: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: 32,
  },
  menu_view: {
    height: 78,
    borderBottomWidth: 1,
    borderColor: fooiyColor.G200,
    paddingTop: 16,
    marginHorizontal: 16,
  },
  menu_name: {
    width: '100%',
    height: 24,
    ...fooiyFont.Subtitle1,
    color: fooiyColor.G800,
    marginBottom: 4,
  },
  menu_price: {
    width: '100%',
    height: 18,
    ...fooiyFont.Subtitle4,
    color: fooiyColor.G400,
  },
  no_menu_btn: {
    marginHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: fooiyColor.P500,
    height: 56,
  },
  no_menu_text: {
    ...fooiyFont.Button,
    color: fooiyColor.W,
  },
});
