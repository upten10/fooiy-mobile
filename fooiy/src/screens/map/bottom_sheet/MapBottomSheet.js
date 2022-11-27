import React, {useCallback, useRef, useMemo, useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';

import {ApiMangerV1} from '../../../common/api/v1/ApiMangerV1';
import {apiUrl} from '../../../common/Enums';
import {globalVariable} from '../../../common/globalVariable';

const MapBottomSheet = props => {
  const screenLocation = props.screenLocation;
  const sheetRef = useRef(null);
  const [shops, setShops] = useState([]);
  const offset = useRef(0).current;
  const totalCount = useRef(0).current;

  const snapPoints = useMemo(() => ['18%', '93%'], []);

  const handleSheetChange = useCallback(
    index => {
      if (index === 0) {
        offset.current = 0;
        totalCount.current = 0;
        setShops([]);
      } else {
        getShopList(screenLocation);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [screenLocation],
  );

  const getShopList = async data => {
    await ApiMangerV1.get(apiUrl.MAP_SHOP_LIST, {
      params: {
        limit: globalVariable.FeedLimit,
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
        }
      })
      .catch(e => console.log(e));
  };

  // render
  const RenderItem = item => {
    return (
      <View style={styles.itemContainer}>
        <Text>{item.address}</Text>
        <Text>{item.name}</Text>
      </View>
    );
  };

  const loadMoreItem = () => {
    if (totalCount > offset.current) {
      offset.current = offset.current + globalVariable.FeedLimit;
      getShopList(screenLocation);
    }
  };

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChange}>
      <Text style={styles.title}>주변 음식점 리스트</Text>
      <BottomSheetFlatList
        data={shops}
        keyExtractor={(shops, index) => index.toString()}
        renderItem={({item}) => <RenderItem {...item} />}
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
    fontSize: 16,
  },
});
