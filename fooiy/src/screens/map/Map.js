import React, {useEffect} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import NaverMap from './NaverMap';
import {LocationPermission} from '../../common/Permission';
import BottomSheet from './BottomSheet';
const {width} = Dimensions.get('screen');

const ITEM_WIDTH = width * 0.9;
const ITEM_HEIGHT = ITEM_WIDTH * 0.9;

const Map = () => {
  const tabBarheight = useBottomTabBarHeight();
  useEffect(() => {
    LocationPermission();
  }, []);
  return (
    <View style={{flex: 1}}>
      <NaverMap />
      <BottomSheet />
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    color: '#000',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 14,
  },
  imageCard: {
    borderRadius: 14,
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
  },
});
