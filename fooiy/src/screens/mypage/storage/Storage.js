import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ApiMangerV1} from '../../../common/api/v1/ApiMangerV1';
import {apiUrl} from '../../../common/Enums';
import {fooiyColor, fooiyFont} from '../../../common/globalStyles';
import {globalVariable} from '../../../common/globalVariable';
import {StackHeader} from '../../../common_ui/headers/StackHeader';

const imageWidth = (globalVariable.width - 32 - 15) / 2;

const Storage = () => {
  const navigation = useNavigation();
  const limit = 12;

  const [offset, setOffset] = useState(0);
  const [feeds, setFeeds] = useState([]);
  const [lastIndex, setLastIndex] = useState(-1);
  const [noFeedImage, setNoFeedImage] = useState('');

  useEffect(
    () => {
      getStoredShopList();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [offset],
  );

  const getStoredShopList = async () => {
    await ApiMangerV1.get(apiUrl.FEED_STORAGE, {
      params: {
        // address_depth1: 시,도 단위
        // address_depth2: 구,동 단위
        limit,
        offset,
      },
    }).then(res => {
      if (
        res.data.payload.storage_list.total_count === 0 &&
        res.data.payload.image
      ) {
        setNoFeedImage(res.data.payload.image);
      } else if (lastIndex === -1 || offset < lastIndex) {
        setLastIndex(res.data.payload.storage_list.total_count);
        setFeeds([...feeds, ...res.data.payload.storage_list.results]);
        setOffset(offset + limit);
      }
    });
  };

  const Filter = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('IMP');
    const [items, setItems] = useState([
      {value: 'IMP', label: '서울 전체'},
      {value: 'FR', label: '고양시 전체'},
      {value: 'BUG', label: '안산시 전체'},
      //   {value: 'AC', label: '계정 관련'},
      //   {value: 'AD', label: '광고 제의'},
      //   {value: 'ETC', label: '기타 피드백'},
    ]);
    return (
      <DropDownPicker
        items={items}
        open={open}
        value={value}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        maxHeight={336}
        style={filter_styles.categoryContainer}
        labelStyle={filter_styles.dropDownTitle}
        textStyle={filter_styles.dropDownValue}
        selectedItemContainerStyle={filter_styles.dropDownSelected}
        listItemContainerStyle={filter_styles.dropDownItem}
        dropDownContainerStyle={filter_styles.dropDownContainer}
      />
    );
  };

  const StorageItem = item => {
    const {
      index,
      item: {
        fooiyti,
        feed_id,
        menu_name,
        menu_price,
        nickname,
        shop_name,
        profile_image,
      },
    } = item;
    const image = item.item.image[0];

    return (
      <TouchableOpacity
        key={index}
        style={styles.container}
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('StorageSingleFeed', {
            feed_id,
          })
        }>
        {/* img */}
        <View style={item_styles.imageContainer}>
          <View style={item_styles.fooiytiContainer}>
            <Text style={item_styles.fooiytiText}>{fooiyti}</Text>
          </View>
          <View>
            <Image source={{uri: image}} style={item_styles.shopImg} />
          </View>
        </View>
        {/* shop info */}
        <View style={item_styles.shopInfoContainer}>
          <Text style={item_styles.shopInfoName}>{shop_name}</Text>
          <Text style={item_styles.shopInfoPrice}>{menu_price}</Text>
        </View>
        {/* profile */}
        <View style={item_styles.profileContainer}>
          <View style={item_styles.profileImgContainer}>
            {/* 프사로 변경 */}
            <Image
              source={{uri: profile_image}}
              style={item_styles.profileImg}
            />
          </View>
          <View>
            <Text style={item_styles.profileNicknameText}>{nickname}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StackHeader title="보관함" />
      {/* 바디 */}
      <View style={styles.bodyContainer}>
        {/* 지역 필터 */}
        <View></View>
        {/* 리스트 */}
        <View style={styles.flatListContainer}>
          <FlatList
            data={feeds}
            renderItem={StorageItem}
            keyExtractor={(feeds, index) => index.toString()}
            scrollEventThrottle={16}
            bounces={true}
            numColumns={2}
            scrollToOverflowEnabled
            style={styles.flatList}
            columnWrapperStyle={styles.flatListRow}
            ListHeaderComponent={Filter}
            ListFooterComponent={<View style={styles.flatListFooter}></View>}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Storage;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: fooiyColor.W,
  },
  bodyContainer: {
    marginTop: 16,
  },
  flatListContainer: {},
  flatList: {
    // width: '100%',
    paddingHorizontal: 16,
  },
  flatListRow: {
    justifyContent: 'space-between',
    marginTop: 24,
  },
  flatListFooter: {
    height: 100,
  },
});

const item_styles = StyleSheet.create({
  container: {},
  imageContainer: {
    width: imageWidth,
    height: imageWidth,
    marginBottom: 8,
  },
  fooiytiContainer: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: fooiyColor.P500,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  fooiytiText: {
    ...fooiyFont.Subtitle4,
    color: fooiyColor.W,
  },
  shopImg: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  shopInfoContainer: {
    marginBottom: 8,
  },
  shopInfoName: {
    ...fooiyFont.Subtitle2,
    color: fooiyColor.B,
  },
  shopInfoPrice: {
    ...fooiyFont.Body2,
    color: fooiyColor.G800,
  },
  profileContainer: {
    flexDirection: 'row',
  },
  profileImgContainer: {
    marginRight: 8,
  },
  profileImg: {
    width: 18,
    height: 18,
    borderRadius: 100,
  },
  profileNicknameText: {
    ...fooiyFont.Caption1,
    color: fooiyColor.G600,
  },
});

const filter_styles = StyleSheet.create({
  categoryContainer: {
    backgroundColor: fooiyColor.W,
    borderWidth: 1,
    borderColor: fooiyColor.G200,
    paddingHorizontal: 16,
    paddingVertical: 7,
  },
  dropDownTitle: {
    color: fooiyColor.B,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
  },
  dropDownValue: {
    color: fooiyColor.B,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  dropDownSelected: {
    backgroundColor: fooiyColor.G50,
  },
  dropDownItem: {
    height: 56,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomColor: fooiyColor.G50,
    borderBottomWidth: 1,
  },
  dropDownContainer: {
    borderColor: fooiyColor.G200,
    borderWidth: 1,
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    borderRadius: 8,
    marginTop: 8,
  },
});
