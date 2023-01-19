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
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {Search} from '../../../../assets/icons/svg';

const FindShop = props => {
  const [shopList, setShopList] = useState([]);
  const [searchShop, setSearchShop] = useState([]);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const getShopList = async () => {
    await ApiManagerV2.get(apiUrl.SHOP_NEARBY, {
      params: {
        address: props.route.params.address,
      },
    }).then(res => {
      setShopList(res.data.payload.shop_list.results),
        setSearchShop(res.data.payload.shop_list.results);
    });
  };

  useEffect(() => {
    getShopList();
  }, []);

  const onChangeText = text => {
    const nextData = shopList.filter(
      shopList => shopList.name.indexOf(text) > -1,
    );
    setSearchShop(nextData);
  };

  return (
    <View style={{backgroundColor: fooiyColor.W}}>
      <ScrollView
        style={{
          height: globalVariable.height - insets.top - insets.bottom - 56 - 16,
          marginBottom: 16,
        }}>
        <StackHeader title="음식점 선택" />
        <View style={styles.top_text_view}>
          <Text style={styles.top_text}>방문한 음식점을</Text>
          <Text style={styles.top_text}>선택해주세요</Text>
        </View>
        <View style={styles.search_view}>
          <TextInput
            placeholder="음식점을 검색해보세요!"
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
        {searchShop &&
          searchShop.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('FindMenu', {
                    photo_list: props.route.params.photo_list,
                    shop: item,
                    menu: null,
                    address: props.route.params.address,
                  })
                }>
                <View style={styles.shop_view}>
                  <Text style={styles.shop_name}>{item.name}</Text>
                  <Text style={styles.shop_address}>{item.address}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
      <View>
        <TouchableOpacity
          style={styles.no_shop_btn}
          onPress={() => {
            navigation.navigate('RegisterFeed', {
              photo_list: props.route.params.photo_list,
              shop: null,
              menu: null,
              address: props.route.params.address,
            });
          }}>
          <Text style={styles.no_shop_text}>방문한 음식점이 없어요</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FindShop;

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
  shop_view: {
    height: 78,
    borderBottomWidth: 1,
    borderColor: fooiyColor.G200,
    paddingTop: 16,
    marginHorizontal: 16,
  },
  shop_name: {
    width: '100%',
    height: 24,
    ...fooiyFont.Subtitle1,
    color: fooiyColor.G800,
    marginBottom: 4,
  },
  shop_address: {
    width: '100%',
    height: 18,
    ...fooiyFont.Subtitle4,
    color: fooiyColor.G400,
  },
  no_shop_btn: {
    marginHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: fooiyColor.P500,
    height: 56,
  },
  no_shop_text: {
    ...fooiyFont.Button,
    color: fooiyColor.W,
  },
});
