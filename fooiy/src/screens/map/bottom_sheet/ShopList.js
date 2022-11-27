import React, {useState} from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';

import {ApiMangerV1} from '../../../common/api/v1/ApiMangerV1';
import {apiUrl} from '../../../common/Enums';

const ShopList = props => {
  //   const screenLocation = props.screenLocation;
  const screenLocation = [
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
    {longitude: 120},
  ];

  return (
    <View style={styles.container}>
      <FlatList
        scrollToOverflowEnabled={true}
        data={screenLocation}
        //   onMomentumScrollBegin={onMomentumScrollBegin}
        scrollEventThrottle={16} // ios 떨림 방지
        renderItem={({item}) => (
          <View>
            <Text>{item.longitude}</Text>
          </View>
        )}
        onScroll={props.scrollHandler}
        // onScroll={Animated.event(
        //   [{nativeEvent: {contentOffset: {y: props.translationY.value}}}],
        //   {useNativeDriver: true},
        // )}
      />
    </View>
  );
};

export default ShopList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
