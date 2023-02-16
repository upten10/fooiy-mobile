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
import {Notice, Search_Icon} from '../../../assets/icons/svg';
import {ApiManagerV2} from '../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../common/Enums';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import Geolocation from 'react-native-geolocation-service';
import {globalVariable} from '../../common/globalVariable';
import {debounce} from 'lodash';
import {useNavigation} from '@react-navigation/native';
import {CheckLocationPermission} from '../../common/Permission';
import FooiyToast from '../../common/FooiyToast';

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
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const onFocus = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };

  const getShop = async (offset, value, shops) => {
    await ApiManagerV2.get(apiUrl.SHOP_SEARCH, {
      params: {
        limit: globalVariable.FeedLimit,
        offset: offset,
        keyword: value,
        longitude: currentLocation.longitude,
        latitude: currentLocation.latitude,
      },
    })
      .then(res => {
        {
          setShop([...shops, ...res.data.payload.shop_list.results]);
          setTotalCount(res.data.payload.shop_list.total_count);
          console.log('토탈카운트', res.data.payload.shop_list.total_count);
        }
      })
      .catch(e => FooiyToast.error());
  };
  const loadMoreItem = () => {
    if (totalCount > offset + globalVariable.FeedLimit) {
      setOffset(offset + globalVariable.FeedLimit);
      getShop(offset + globalVariable.FeedLimit, value, shop);
    }
  };

  const debounceCallback = useCallback(value => {
    debounceSearch(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const debounceSearch = debounce(async value => {
    setOffset(0);
    setTotalCount(0);
    value && getShop(0, value, []);
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
  const ShopItem = useCallback(item => {
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
            {name.length >= 11 ? name.substr(0, 11) + '...' : name}
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
  }, []);
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
            onScroll={Keyboard.dismiss}
            // scrollToOverflowEnabled
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<View style={{marginBottom: 16}} />}
            onEndReached={loadMoreItem}
            onEndReachedThreshold={2}
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
  }, [shop, totalCount]);

  useEffect(() => {
    debounceCallback(value);
  }, [value]);

  useEffect(() => {
    const center = async () => {
      (await CheckLocationPermission()) &&
        Geolocation.getCurrentPosition(async position => {
          const {longitude, latitude} = position.coords;
          setCurrentLocation({
            longitude,
            latitude,
          });
        });
    };
    center();
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
              !focus && value === ''
                ? [styles.empty_value, {borderColor: fooiyColor.G200}]
                : focus && value === ''
                ? [styles.empty_value, {borderColor: fooiyColor.G400}]
                : focus && value !== ''
                ? [styles.is_value, {borderColor: fooiyColor.G400}]
                : [styles.is_value, {borderColor: fooiyColor.G200}]
            }
          />
          <Search_Icon style={{position: 'absolute', right: 16}} />
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
});
