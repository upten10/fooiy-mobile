import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {StackHeader} from '../../../common_ui/headers/StackHeader';
import {fooiyColor, fooiyFont} from '../../../common/globalStyles';
import {ScrollView} from 'react-native-gesture-handler';
import {ApiManagerV2} from '../../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../../common/Enums';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {Search_Icon} from '../../../../assets/icons/svg';
import FooiyToast from '../../../common/FooiyToast';

const FindMenu = props => {
  const shop_id = props.route.params.shop.shop_id
    ? props.route.params.shop.shop_id
    : props.route.params.shop.public_id;
  const address = props.route.params.address
    ? props.route.params.address
    : props.route.params.shop.shop_address;
  const [menuList, setMenuList] = useState([]);
  const [searchMenu, setSearchMenu] = useState([]);
  const [isFocus, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const navigation = useNavigation();
  console.log(props.route.params);
  const getMenuList = async () => {
    await ApiManagerV2.get(apiUrl.SHOP_MENU, {
      params: {
        type: 'select_menu',
        shop_id: shop_id,
      },
    })
      .then(res => {
        setMenuList(res.data.payload.menu_list);
        setSearchMenu(res.data.payload.menu_list);
      })
      .catch(e => FooiyToast.error());
  };
  const onChangeText = text => {
    const nextData = menuList.filter(
      menuList => menuList.name.indexOf(text) > -1,
    );
    setSearchMenu(nextData);
  };

  useEffect(() => {
    getMenuList();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <StackHeader title="메뉴 선택" />
        <View style={styles.top_text_view}>
          <Text style={styles.top_text}>메뉴를{'\n'}선택해주세요</Text>
        </View>
        <View style={styles.search_view}>
          <TextInput
            placeholder="메뉴를 검색해보세요!"
            style={
              !isFocus && value === ''
                ? [styles.empty_value, {borderColor: fooiyColor.G200}]
                : isFocus && value === ''
                ? [styles.empty_value, {borderColor: fooiyColor.G400}]
                : isFocus && value !== ''
                ? [styles.is_value, {borderColor: fooiyColor.G400}]
                : [styles.is_value, {borderColor: fooiyColor.G200}]
            }
            maxLength={20}
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
            placeholderTextColor={fooiyColor.G400}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChangeText={text => {
              setValue(text);
              onChangeText(text);
            }}
          />
          <Search_Icon style={styles.search_icon} />
        </View>
        <ScrollView>
          {searchMenu &&
            searchMenu.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate('RegisterFeed', {
                      photo_list: props.route.params.photo_list,
                      shop: props.route.params.shop,
                      menu: item,
                      address: address,
                      category: props.route.params.category,
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
                category: props.route.params.category,
              });
            }}>
            <Text style={styles.no_menu_text}>먹은 메뉴가 없어요</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default FindMenu;

const styles = StyleSheet.create({
  container: {
    backgroundColor: fooiyColor.W,
    flex: 1,
    paddingBottom: Platform.select({ios: 0, android: 16}),
  },
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
  empty_value: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    height: 56,
    padding: 16,
    ...fooiyFont.Subtitle2,
    lineHeight: Platform.select({ios: 0, android: null}),
  },
  is_value: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    height: 56,
    padding: 16,
    ...fooiyFont.Body1,
    lineHeight: Platform.select({ios: 0, android: null}),
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
