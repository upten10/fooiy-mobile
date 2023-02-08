import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {StackHeader} from '../../common_ui/headers/StackHeader';
import TabView from './TabView';
import Geolocation from 'react-native-geolocation-service';
import {checkLocation} from '../../common/Permission';
import {ApiManagerV2} from '../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../common/Enums';
import {categoryToEnglish} from './categoryList';
import FooiyToast from '../../common/FooiyToast';
import {globalVariable} from '../../common/globalVariable';
import FastImage from 'react-native-fast-image';
import Margin from '../../common_ui/Margin';
import {geocoding} from '../../common/api/geocoding';
import {EmptyMenuClinic, LocationGrayIcon} from '../../../assets/icons/svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ListEmptyTextComponent from '../../common_ui/empty_component/ListEmptyTextComponent';
import {useNavigation} from '@react-navigation/native';

const MenuClinicFindShop = props => {
  const {categoryList, tabIndex} = props.route.params;
  const [innerTabIndex, setInnerTabIndex] = useState(tabIndex);
  const [location, setLocation] = useState({longitude: 0, latitude: 0});
  const [isCheck, setIsCheck] = useState(false);
  const [address, setAddress] = useState({});
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [shops, setShops] = useState([]);
  const tabRef = useRef(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    tabRef &&
      tabRef.current.scrollToIndex({index: innerTabIndex, animated: true});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabRef]);

  useEffect(() => {
    checkLocation();
    Geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords;
      setLocation({
        longitude,
        latitude,
      });
    });
    setTimeout(() => {
      setIsCheck(true);
    }, 2000);
  }, []);

  useEffect(() => {
    if (location.longitude !== 0) {
      setIsCheck(true);
    }
  }, [location]);

  const navigation = useNavigation();

  const onClickImage = shop_id => {
    navigation.navigate('Shop', {
      shop_id: shop_id,
    });
  };

  const ShopList = useCallback(
    item => {
      const shop = item.item;
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onClickImage(shop.shop_id)}>
          <View
            style={[
              item.index % 2 === 0 ? {left: 16} : {left: 31},
              styles.shop_container,
            ]}>
            <FastImage
              source={{uri: shop.thumbnail}}
              style={styles.shop_thumbnail}
            />
            <Margin h={8} />
            <Text style={styles.shop_name}>{shop.shop_name}</Text>
            <Text style={styles.shop_price}>{shop.menu_price}</Text>
            <Margin h={6} />
            <View style={styles.extra_info_container}>
              <View style={styles.score_container}>
                <Text style={styles.score_text}>{shop.score}%</Text>
              </View>
              <Margin w={4} />
              <View style={styles.distance_container}>
                <Text style={styles.distance_text}>{shop.distance}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [onClickImage],
  );

  const ListHeaderComponent = useCallback(() => {
    return (
      address && (
        <View>
          <Margin h={8} />
          <View style={styles.header_container}>
            <LocationGrayIcon />
            <Margin w={8} />
            <Text style={styles.address_text}>
              {address.area1} {address.area2}
            </Text>
          </View>
          <Margin h={16} />
        </View>
      )
    );
  }, [address]);

  const getNearShop = async (offset, shops) => {
    await ApiManagerV2.get(apiUrl.MENU_NEAR_CLINIC, {
      params: {
        category: categoryToEnglish[categoryList[innerTabIndex]],
        longitude: location.longitude,
        latitude: location.latitude,
        offset: offset,
        limit: globalVariable.FeedLimit,
      },
    })
      .then(res => {
        setShops([...shops, ...res.data.payload.shop_list.results]);
        setTotalCount(res.data.payload.shop_list.total_count);
      })
      .catch(e => FooiyToast.message('위치권한이 없어 이용이 불가합니다.'));
  };

  const loadMoreItem = () => {
    if (totalCount > offset + globalVariable.FeedLimit) {
      setOffset(offset + globalVariable.FeedLimit);
      getNearShop(offset + globalVariable.FeedLimit, shops);
    }
  };

  const ListEmptyComponent = useCallback(() => {
    const EmptyText = () => {
      return ListEmptyTextComponent(
        '근처에 음식점이 없어요.\n이 지역에 가장 먼저 등록해보세요!',
      );
    };
    return (
      <View
        style={{
          flex: 1,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <EmptyMenuClinic />
        <EmptyText />
      </View>
    );
  }, []);

  useEffect(() => {
    isCheck && geocoding(location.longitude, location.latitude, setAddress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheck]);

  useEffect(() => {
    isCheck && getNearShop(0, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheck, innerTabIndex]);

  return (
    <SafeAreaView style={styles.container}>
      <StackHeader title={'메뉴 상담소'} />
      <TabView
        categoryList={categoryList}
        tabIndex={innerTabIndex}
        setCurrentTab={setInnerTabIndex}
        tabRef={tabRef}
      />

      <FlatList
        data={shops}
        renderItem={item => <ShopList {...item} />}
        numColumns={2}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={{
          minHeight: globalVariable.height - 140 - insets.top,
        }}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={4}
      />
    </SafeAreaView>
  );
};

export default MenuClinicFindShop;

const image_size = (globalVariable.width - 47) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: fooiyColor.W,
    zIndex: 10000,
  },
  shop_container: {
    width: image_size,
    height: image_size + 104,
  },
  header_container: {
    marginLeft: 16,
    alignItems: 'center',
    flexDirection: 'row',
  },
  address_text: {
    ...fooiyFont.G400,
    color: fooiyColor.G400,
  },
  shop_thumbnail: {
    borderRadius: 16,
    width: image_size,
    height: image_size,
  },
  shop_name: {
    ...fooiyFont.Subtitle2,
    color: fooiyColor.B,
  },
  shop_price: {
    ...fooiyFont.Body2,
    color: fooiyColor.G800,
  },
  extra_info_container: {
    flexDirection: 'row',
  },
  score_container: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: fooiyColor.P500,
  },
  score_text: {
    ...fooiyFont.Subtitle4,
    color: fooiyColor.P500,
    marginHorizontal: 6,
  },
  distance_container: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: fooiyColor.G400,
  },
  distance_text: {
    ...fooiyFont.Subtitle4,
    color: fooiyColor.G400,
    marginHorizontal: 6,
  },
});
