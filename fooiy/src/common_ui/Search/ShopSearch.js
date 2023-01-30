import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Keyboard,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Notice, Search} from '../../../assets/icons/svg';
import {ApiManagerV2} from '../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../common/Enums';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import Geolocation from 'react-native-geolocation-service';
import {globalVariable} from '../../common/globalVariable';
import {debounce} from 'lodash';
import {useNavigation} from '@react-navigation/native';

const ShopSearch = () => {
  const navigation = useNavigation();
  const imageWidth = (globalVariable.width - 32 - 15) / 2;
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState('');
  const [shop, setShop] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({
    longitude: 0,
    latitude: 0,
  });

  const onFocus = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };
  const debounceCallback = useCallback(value => {
    debounceSearch(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const debounceSearch = debounce(async value => {
    value &&
      (await ApiManagerV2.get(apiUrl.SHOP_SEARCH, {
        params: {
          keyword: value,
          longitude: currentLocation.longitude,
          latitude: currentLocation.latitude,
        },
      }).then(res => {
        setShop(res.data.payload.shop_list.results);
      }));
  }, 300);
  const ListEmptyComponent = () => {
    return (
      <View>
        <View style={styles.empty_container}>
          <Text style={{...fooiyFont.Body1, color: fooiyColor.G600}}>
            검색 결과가 없어요
          </Text>
          <Text style={{...fooiyFont.Body1, color: fooiyColor.G600}}>
            철자와 띄어쓰기를 확인해보세요!
          </Text>
        </View>
        <View style={styles.init_container}>
          <Text style={{...fooiyFont.Subtitle3, color: fooiyColor.G600}}>
            이렇게 검색해 보세요!
          </Text>
          <View style={{flexDirection: 'row', marginTop: 8}}>
            <Notice style={{marginRight: 8}} />
            <Text style={{...fooiyFont.Caption1, color: fooiyColor.G600}}>
              먹고 싶은 음식
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 8}}>
            <Notice style={{marginRight: 8}} />
            <Text style={{...fooiyFont.Caption1, color: fooiyColor.G600}}>
              먹고 싶은 음식점
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const ShopItem = item => {
    const {
      index,
      item: {
        score,
        public_id,
        name,
        menu_price,
        shop_category_list,
        thumbnail,
        address,
      },
    } = item;

    return (
      <TouchableOpacity
        key={index}
        style={{backgroundColor: fooiyColor.W}}
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
            <Image
              source={{uri: thumbnail}}
              style={{width: '100%', height: '100%', borderRadius: 16}}
            />
          </View>
        </View>
        {/* shop info */}
        <View style={{marginBottom: 8}}>
          <Text style={{...fooiyFont.Subtitle2, color: fooiyColor.B}}>
            {name}
          </Text>
          <Text style={{...fooiyFont.Body2, color: fooiyColor.G800}}>
            {menu_price}
          </Text>
        </View>
        {/* category */}
        <View style={{flexDirection: 'row'}}>
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
  const MainUI = useCallback(() => {
    if (value.length !== 0) {
      // 아이템들 그려주면 됨.
      return (
        <>
          <FlatList
            data={shop}
            renderItem={ShopItem}
            ListEmptyComponent={ListEmptyComponent}
            keyExtractor={item => String(item.public_id)}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              marginTop: 24,
            }}
            scrollEventThrottle={16}
            bounces={true}
            scrollToOverflowEnabled
            showsVerticalScrollIndicator={false}
          />
        </>
      );
    } else {
      // 처음 들어왔을 때
      return (
        <>
          <View style={styles.init_container}>
            <Text style={{...fooiyFont.Subtitle3, color: fooiyColor.G600}}>
              이렇게 검색해 보세요!
            </Text>
            <View style={{flexDirection: 'row', marginTop: 8}}>
              <Notice style={{marginRight: 8}} />
              <Text style={{...fooiyFont.Caption1, color: fooiyColor.G600}}>
                먹고 싶은 음식
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 8}}>
              <Notice style={{marginRight: 8}} />
              <Text style={{...fooiyFont.Caption1, color: fooiyColor.G600}}>
                먹고 싶은 음식점
              </Text>
            </View>
          </View>
        </>
      );
    }
  }, [value, shop]);

  useEffect(() => {
    debounceCallback(value);
  }, [value]);

  useEffect(() => {
    Geolocation.getCurrentPosition(async position => {
      const {longitude, latitude} = position.coords;
      setCurrentLocation({
        longitude,
        latitude,
      });
    });
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          paddingHorizontal: 16,
          backgroundColor: fooiyColor.W,
          height: '100%',
        }}>
        <View style={styles.input_container}>
          <TextInput
            placeholder="먹고 싶은 음식을 검색해보세요"
            placeholderTextColor={fooiyColor.G400}
            onFocus={onFocus}
            onBlur={onBlur}
            multiline={false}
            autoCapitalize={false}
            autoCorrect={false}
            spellCheck={false}
            onChangeText={setValue}
            value={value}
            style={
              focus && value !== ''
                ? styles.input
                : focus && value === ''
                ? [
                    {...fooiyFont.Subtitle2, color: fooiyColor.G400},
                    styles.input,
                  ]
                : !focus && value !== ''
                ? styles.input
                : [
                    {
                      ...fooiyFont.Subtitle2,
                      color: fooiyColor.G400,
                      borderColor: fooiyColor.G200,
                    },
                    styles.input,
                  ]
            }
          />
          <Search style={{position: 'absolute', right: 16}} />
        </View>
        <MainUI />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ShopSearch;

const styles = StyleSheet.create({
  empty_container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    height: 48,
  },
  init_container: {
    marginTop: 16,
    padding: 16,
    backgroundColor: fooiyColor.P50,
    borderRadius: 8,
  },
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
  input_container: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: fooiyColor.G400,
    borderRadius: 8,
    height: 56,
    padding: 16,
    ...fooiyFont.Body1,
    color: fooiyColor.B,
    ...Platform.select({
      ios: {
        lineHeight: 0,
      },
      android: {
        lineHeight: 24,
      },
    }),
  },
});
