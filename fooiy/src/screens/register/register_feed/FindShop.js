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
import {ApiMangerV1} from '../../../common/api/v1/ApiMangerV1';
import {apiUrl} from '../../../common/Enums';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {Search} from '../../../../assets/icons/svg';

const FindShop = props => {
  console.log('rendering ShopMenu');
  // console.log(props.route.params.address);
  // const photo_list = props.route.params.photo_list;
  const [shopList, setShopList] = useState([]);
  const [searchShop, setSearchShop] = useState([]);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const getShopList = async () => {
    await ApiMangerV1.get(apiUrl.SHOP_NEARBY, {
      params: {
        address: props.route.params.address,
        // address: '서울 종로구 동숭길 148',
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
        <View
          style={{
            width: '100%',
            height: 64,
            justifyContent: 'flex-end',
            marginTop: 16,
          }}>
          <Text style={{...fooiyFont.H3, marginLeft: 16}}>방문한 음식점을</Text>
          <Text style={{...fooiyFont.H3, marginLeft: 16}}>선택해주세요</Text>
        </View>
        <View
          style={{
            width: '100%',
            height: 56,
            marginTop: 24,
            marginBottom: 16,
            paddingHorizontal: 16,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TextInput
            placeholder="음식점을 검색해보세요!"
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: fooiyColor.G50,
              borderRadius: 8,
              ...fooiyFont.Subtitle3,
              padding: 16,
              justifyContent: 'center',
              lineHeight: 0,
            }}
            maxLength={20}
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
            placeholderTextColor={fooiyColor.G400}
            onChangeText={text => {
              onChangeText(text);
            }}
          />
          <Search
            style={{
              width: 24,
              height: 24,
              position: 'absolute',
              right: 32,
            }}
          />
        </View>
        {searchShop &&
          searchShop.map((item, index) => {
            return (
              <TouchableOpacity
                style={{borderWidth: 0}}
                onPress={() =>
                  navigation.navigate('FindMenu', {
                    photo_list: props.route.params.photo_list,
                    shop: item,
                    menu: null,
                    address: props.route.params.address,
                  })
                }>
                <View
                  style={{
                    height: 78,
                    borderBottomWidth: 1,
                    borderColor: fooiyColor.G200,
                    paddingTop: 16,
                    marginHorizontal: 16,
                  }}
                  key={index}>
                  <Text
                    style={{
                      width: '100%',
                      height: 24,
                      ...fooiyFont.Subtitle1,
                      color: fooiyColor.G800,
                      marginBottom: 4,
                    }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      width: '100%',
                      height: 18,
                      ...fooiyFont.Subtitle4,
                      color: fooiyColor.G400,
                    }}>
                    {item.address}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
      <View>
        <TouchableOpacity
          style={{
            marginHorizontal: 16,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: fooiyColor.P500,
            height: 56,
          }}
          onPress={() => {
            navigation.navigate('RegisterFeed', {
              photo_list: props.route.params.photo_list,
              shop: null,
              menu: null,
              address: props.route.params.address,
            });
          }}>
          <Text style={{...fooiyFont.Button, color: fooiyColor.W}}>
            방문한 음식점이 없어요
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FindShop;

const styles = StyleSheet.create({});
