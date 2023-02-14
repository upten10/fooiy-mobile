import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ApiManagerV2} from '../../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../../common/Enums';
import {fooiyColor, fooiyFont} from '../../../common/globalStyles';
import {globalVariable} from '../../../common/globalVariable';
import {StackHeader} from '../../../common_ui/headers/StackHeader';

const imageWidth = (globalVariable.width - 32 - 15) / 2;

const Storage = () => {
  const navigation = useNavigation();
  const limit = 12;

  const flatListRef = useRef(null);

  const [offset, setOffset] = useState(0);
  const [feeds, setFeeds] = useState([]);
  const [lastIndex, setLastIndex] = useState(-1);
  const [noFeedImage, setNoFeedImage] = useState('');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('전체');
  const [items, setItems] = useState([{value: '전체', label: '전체'}]);

  useEffect(
    () => {
      getAddress();
      setItems([{value: '전체', label: '전체'}]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(
    () => {
      if (lastIndex === -1 || offset < lastIndex) {
        getStoredShopList();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [offset],
  );

  useEffect(() => {
    setLastIndex(-1);
    setFeeds([]);
    setNoFeedImage('');
    setOffset(0);
  }, [value]);

  const toTop = () => {
    console.log('top');
    if (flatListRef.current !== null) {
      flatListRef.current.scrollToOffset({
        offset: 0,
        animated: true,
        viewPosition: 1,
      });
    }
  };

  const getStoredShopList = async () => {
    await ApiManagerV2.get(apiUrl.FEED_STORAGE, {
      params: {
        // address_depth1: 시,도 단위
        // address_depth2: 구,동 단위
        ...(value !== '전체' && {address_depth1: value}),
        limit,
        offset,
      },
    }).then(res => {
      if (res.data.payload.image) {
        setNoFeedImage(res.data.payload.image);
      } else if (lastIndex === -1 || offset < lastIndex) {
        setNoFeedImage('');
        setLastIndex(res.data.payload.storage_list.total_count);
        setFeeds([...feeds, ...res.data.payload.storage_list.results]);
        setOffset(offset + limit);
      }
    });
  };

  const setFilter = address => {
    const filters = address.map(item => {
      return {value: item, label: item};
    });
    setItems([...items, ...filters]);
  };

  const getAddress = async () => {
    await ApiManagerV2.get(apiUrl.STORAGE_ADRESS, {}).then(res => {
      setFilter(res.data.payload.address_list);
    });
  };

  const Filter = useCallback(() => {
    return (
      <DropDownPicker
        items={items}
        setItems={setItems}
        autoScroll={true}
        open={open}
        value={value}
        setOpen={setOpen}
        setValue={setValue}
        maxHeight={336}
        placeholder={'지역 필터'}
        style={filter_styles.categoryContainer}
        labelStyle={filter_styles.dropDownTitle}
        textStyle={filter_styles.dropDownValue}
        selectedItemContainerStyle={filter_styles.dropDownSelected}
        listItemContainerStyle={filter_styles.dropDownItem}
        dropDownContainerStyle={filter_styles.dropDownContainer}
        description={'지역 필터'}
        descriptionStyle={filter_styles.description}
      />
    );
  }, [items, open, value]);

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
            <Text numberOfLines={1} style={item_styles.profileNicknameText}>
              {nickname}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StackHeader title="보관함" toTop={toTop} />
      {/* 바디 */}
      <View style={styles.bodyContainer}>
        {/* 지역 필터 */}
        <View style={styles.filterContainer}>
          <Filter />
        </View>
        {/* 리스트 */}
        <View style={styles.flatListContainer}>
          {noFeedImage !== '' ? (
            <View style={styles.noFeedImageContainer}>
              <Image source={{uri: noFeedImage}} style={styles.noFeedImage} />
            </View>
          ) : (
            <FlatList
              ref={flatListRef}
              data={feeds}
              renderItem={StorageItem}
              keyExtractor={(feeds, index) => index.toString()}
              scrollEventThrottle={16}
              bounces={true}
              numColumns={2}
              scrollToOverflowEnabled
              style={styles.flatList}
              columnWrapperStyle={styles.flatListRow}
              ListFooterComponent={<View style={styles.flatListFooter}></View>}
            />
          )}
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
  filterContainer: {
    zIndex: 1,
    paddingHorizontal: 16,
  },
  flatListContainer: {
    marginTop: 24,
  },
  flatList: {
    paddingHorizontal: 16,
  },
  flatListRow: {
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  flatListFooter: {
    height: 250,
  },
  noFeedImageContainer: {
    width: '100%',
    height: 500,
    paddingHorizontal: 16,
  },
  noFeedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
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
    width: 164,
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
    width: 138,
  },
});

const filter_styles = StyleSheet.create({
  categoryContainer: {
    backgroundColor: fooiyColor.W,
    borderWidth: 1,
    borderColor: fooiyColor.G200,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
    height: 58,
  },
  description: {
    ...fooiyFont.Subtitle4,
    color: fooiyColor.G400,
    lineHeight: 17,
  },
  dropDownTitle: {
    ...fooiyFont.Subtitle2,
    color: fooiyColor.B,
  },
  dropDownValue: {
    ...fooiyFont.Body1,
    color: fooiyColor.B,
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
