import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  PanResponder,
} from 'react-native';
import {fooiyColor} from '../../common/globalStyles';
import Margin from '../../common_ui/Margin';
import {categoryToEnglish} from './categoryList';
import Animated from 'react-native-reanimated';
import {globalVariable} from '../../common/globalVariable';
import {ApiManagerV2} from '../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../common/Enums';
import {useNavigation} from '@react-navigation/native';

import FastImage from 'react-native-fast-image';
import FooiyToast from '../../common/FooiyToast';

const MenuClinicFlatlist = props => {
  const {
    footerBottomHeight,
    setOffsetY,
    itemFlatListRef,
    tabIndex,
    categoryList,
    scrollY,
    headerHeight,
    tabBarHeight,
  } = props;

  const [categoryFeedlist, setCategoryFeedlist] = useState([]);
  const navigation = useNavigation();
  const onClickImage = shop_id => {
    navigation.navigate('Shop', {
      shop_id: shop_id,
    });
  };
  const RenderItem = useCallback(item => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onClickImage(item.item.shop_id)}>
        <View
          style={[
            styles.itemContainer,
            item.index % 3 === 2
              ? {borderRightWidth: 0}
              : item.index % 3 === 0
              ? {borderLeftWidth: 0}
              : null,
          ]}>
          <FastImage style={styles.image} source={{uri: item.item.image}} />
        </View>
      </TouchableOpacity>
    );
  }, []);
  const endSetOffsetY = e => {
    setOffsetY(e.nativeEvent.contentOffset.y);
  };

  const getShopList = async (offset, categoryFeedlist) => {
    await ApiManagerV2.get(apiUrl.MENU_CLINIC, {
      params: {
        category: categoryToEnglish[categoryList[tabIndex]],
        offset: offset,
        limit: 21,
      },
    })
      .then(res => {
        setCategoryFeedlist([
          ...categoryFeedlist,
          ...res.data.payload.feed_list.results,
        ]);
      })
      .catch(e => FooiyToast.error());
  };
  const ListFooterComponent = useCallback(() => {
    return <Margin h={footerBottomHeight} />;
  }, [footerBottomHeight]);

  useEffect(() => {
    getShopList(0, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabIndex]);

  return (
    <>
      <Animated.FlatList
        ref={itemFlatListRef}
        data={categoryFeedlist}
        renderItem={item => <RenderItem {...item} />}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScrollEndDrag={endSetOffsetY}
        onMomentumScrollEnd={endSetOffsetY}
        numColumns={3}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={10}
        removeClippedSubviews={true}
        ListFooterComponent={ListFooterComponent}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: true,
          },
        )}
        contentContainerStyle={{
          paddingTop: headerHeight + tabBarHeight,
          minHeight: globalVariable.height,
        }}
        scrollToOverflowEnabled={false}
      />
    </>
  );
};

export default MenuClinicFlatlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: fooiyColor.W,
    zIndex: 10000,
  },
  safearea_container: {
    zIndex: 1000,
    backgroundColor: fooiyColor.W,
  },
  itemContainer: {
    width: globalVariable.width / 3,
    height: globalVariable.width / 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: fooiyColor.W,
  },
  headerContainer: {
    position: 'absolute',
    width: '100%',
  },
  image: {
    width: globalVariable.width / 3,
    height: globalVariable.width / 3,
  },
});
