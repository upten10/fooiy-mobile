import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Marker} from 'react-native-nmap';
import {fooiyColor, fooiyFont} from '../../../common/globalStyles';

const AndroidMypageMapMarker = props => {
  // index는 MypageMap에서 준 id
  const {item, index, onClickMarker, clickedIndex, zoomLevel} = props;
  const {feed_image, feeds_count, latitude, longitude} = item;

  return (
    <Marker
      key={index}
      style={
        zoomLevel === 1
          ? styles.marker_big
          : zoomLevel === 2
          ? styles.marker_mid
          : styles.marker_small
      }
      onClick={() => onClickMarker(item, index)}
      zIndex={clickedIndex === index ? 1 : null}
      coordinate={{
        latitude: latitude * 1,
        longitude: longitude * 1,
      }}>
      <View
        style={
          zoomLevel === 1
            ? styles.marker_big
            : zoomLevel === 2
            ? styles.marker_mid
            : styles.marker_small
        }>
        <Image
          source={{uri: feed_image}}
          resizeMode={'cover'}
          style={
            zoomLevel === 1
              ? styles.image_big
              : zoomLevel === 2
              ? styles.image_mid
              : styles.image_small
          }
        />
        <Image
          source={
            clickedIndex === index
              ? require('../../../../assets/icons/marker/mypage_marker_clicked.png')
              : require('../../../../assets/icons/marker/mypage_marker_unclicked.png')
          }
          style={
            zoomLevel === 1
              ? styles.frame_big
              : zoomLevel === 2
              ? styles.frame_mid
              : styles.frame_small
          }
        />
      </View>
      <View
        style={
          zoomLevel === 1
            ? styles.badge_big
            : zoomLevel === 2
            ? styles.badge_mid
            : styles.badge_small
        }>
        <Image
          style={
            zoomLevel === 1
              ? styles.badge_big
              : zoomLevel === 2
              ? styles.badge_mid
              : styles.badge_small
          }
          source={
            clickedIndex === index
              ? require('../../../../assets/icons/marker/mypage_aos_marker_badge_clicked.png')
              : require('../../../../assets/icons/marker/mypage_aos_marker_badge_unclicked.png')
          }
        />
        <Text
          style={
            clickedIndex === index
              ? zoomLevel === 1
                ? [styles.badge_text_big, {color: fooiyColor.W}]
                : zoomLevel === 2
                ? [styles.badge_text_mid, {color: fooiyColor.W}]
                : [styles.badge_text_small, {color: fooiyColor.W}]
              : zoomLevel === 1
              ? styles.badge_text_big
              : zoomLevel === 2
              ? styles.badge_text_mid
              : styles.badge_text_small
          }>
          {feeds_count}
        </Text>
      </View>
    </Marker>
  );
};

export default AndroidMypageMapMarker;

const styles = StyleSheet.create({
  marker_big: {
    width: 64 * 1.1,
    height: 70 * 1.1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  marker_mid: {
    width: 64 * 0.8 * 1.1,
    height: 70 * 0.8 * 1.1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  marker_small: {
    width: 64 * 0.6 * 1.1,
    height: 70 * 0.6 * 1.1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  image_big: {
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 16,
  },
  image_mid: {
    width: 50 * 0.8,
    height: 50 * 0.8,
    position: 'absolute',
    bottom: 16 * 0.8,
  },
  image_small: {
    width: 50 * 0.6,
    height: 50 * 0.6,
    position: 'absolute',
    bottom: 16 * 0.6,
  },
  frame_big: {
    width: 64,
    height: 70,
  },
  frame_mid: {
    width: 64 * 0.8,
    height: 70 * 0.8,
  },
  frame_small: {
    width: 64 * 0.6,
    height: 70 * 0.6,
  },
  badge_big: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
  },
  badge_mid: {
    width: 20 * 0.8,
    height: 20 * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
  },
  badge_small: {
    width: 20 * 0.6,
    height: 20 * 0.6,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
  },
  badge_text_big: {
    zIndex: 1,
    ...fooiyFont.Subtitle4,
    color: fooiyColor.G600,
    lineHeight: null,
  },
  badge_text_mid: {
    zIndex: 1,
    ...fooiyFont.Subtitle4,
    fontSize: 12 * 0.8,
    color: fooiyColor.G600,
    lineHeight: null,
  },
  badge_text_small: {
    zIndex: 1,
    ...fooiyFont.Subtitle4,
    fontSize: 12 * 0.6,
    color: fooiyColor.G600,
    lineHeight: null,
  },
});
