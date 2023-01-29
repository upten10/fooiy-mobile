import React, {useCallback, useRef, useMemo, useState} from 'react';
import {StyleSheet, View, Text, Image, ActivityIndicator} from 'react-native';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';

import {ApiManagerV2} from '../../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../../common/Enums';
import {globalVariable} from '../../../common/globalVariable';
import BottomSheetShop from '../../../common_ui/shop/BottomSheetShop';
import {fooiyFont} from '../../../common/globalStyles';

const MapBottomSheet = props => {
  const {screenLocation} = props;
  const sheetRef = useRef(null);
  const [shops, setShops] = useState([]);
  const [isOpend, setIsOpend] = useState(false);
  const offset = useRef(0).current;
  const [emptyShopImage, setEmptyShopImage] = useState('');
  const totalCount = useRef(0).current;

  const snapPoints = useMemo(() => ['17%', '93%'], []);

  const handleSheetChange = useCallback(
    index => {
      if (index === 0) {
        offset.current = 0;
        totalCount.current = 0;
        setShops([]);
        setEmptyShopImage('');
        setIsOpend(false);
      } else {
        getShopList(screenLocation);
        setIsOpend(true);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [screenLocation],
  );

  const getShopList = async data => {
    await ApiManagerV2.get(apiUrl.MAP_SHOP_LIST, {
      params: {
        limit: globalVariable.MapBottomSheetLimit,
        offset: offset,
        longitude_left_bottom: data[0].longitude,
        latitude_left_bottom: data[0].latitude,
        latitude_right_top: data[1].latitude,
        longitude_right_top: data[1].longitude,
      },
    })
      .then(res => {
        if (res.data.payload.shop_list) {
          setShops([...shops, ...res.data.payload.shop_list.results]);
          totalCount.current = res.data.payload.shop_list.total_count;
        } else if (res.data.payload.image) {
          setEmptyShopImage(res.data.payload.image);
        }
      })
      .catch(e => console.log(e));
  };

  const loadMoreItem = () => {
    if (totalCount > offset.current) {
      offset.current = offset.current + globalVariable.MapBottomSheetLimit;
      getShopList(screenLocation);
    }
  };

  const ListEmptyComponent = () => {
    if (isOpend) {
      return (
        <View>
          {emptyShopImage ? (
            <Image
              source={{uri: emptyShopImage}}
              style={styles.empty_shop_image}
            />
          ) : (
            <View style={styles.indicator_container}>
              <ActivityIndicator size="large" style={styles.loader} />
            </View>
          )}
        </View>
      );
    }
  };

  const ListFooterComponent = () => {
    return <View style={styles.footer} />;
  };

  const ItemSeparatorComponent = () => {
    return <View style={styles.item_separator_line} />;
  };

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChange}>
      <Text style={styles.title}>주변 맛집 리스트</Text>
      <BottomSheetFlatList
        data={shops}
        ListEmptyComponent={ListEmptyComponent}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListFooterComponent={ListFooterComponent}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <BottomSheetShop {...item} />}
        onEndReached={loadMoreItem}
        contentContainerStyle={styles.contentContainer}
      />
    </BottomSheet>
  );
};

export default MapBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: 'white',
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
  },
  title: {
    alignSelf: 'center',
    marginVertical: 5,
    ...fooiyFont.Subtitle2,
  },
  empty_shop_image: {
    width: globalVariable.width,
    height: globalVariable.width,
  },
  item_separator_line: {
    width: globalVariable.width - 30,
    alignSelf: 'center',
    backgroundColor: '#fdd',
    height: 1,
  },
  footer: {
    height: globalVariable.tabBarHeight,
  },
  loader: {
    marginVertical: 50,
    alignSelf: 'center',
  },
});
