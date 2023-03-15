import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {Marker} from 'react-native-nmap';
import {fooiyColor} from '../../../common/globalStyles';

const IosMypageMapMarker = props => {
  // index는 MypageMap에서 준 id
  const {item, index, onClickMarker, clickedIndex, zoomLevel} = props;
  const {category_is_cafe, feeds_count, latitude, longitude} = item;

  // 마커 클릭 이벤트
  const markerImage = category_is_cafe
    ? require('../../../../assets/images/ios_mypage_cafe_marker_unclicked.png')
    : require('../../../../assets/images/ios_mypage_dining_marker_unclicked.png');
  const markerClickedImage = category_is_cafe
    ? require('../../../../assets/images/ios_mypage_cafe_marker_clicked.png')
    : require('../../../../assets/images/ios_mypage_dining_marker_clicked.png');

  return (
    <>
      {/* 이미지 */}
      <Marker
        coordinate={{
          latitude: latitude * 1,
          longitude: longitude * 1,
        }}
        image={markerImage}
        style={
          zoomLevel === 1
            ? styles.image_big
            : zoomLevel === 2
            ? styles.image_mid
            : styles.image_small
        }
        onClick={() => onClickMarker(item, index)}
        caption={{
          text: JSON.stringify(feeds_count),
          color: fooiyColor.G600,
          textSize: zoomLevel === 1 ? 10 : zoomLevel === 2 ? 7.5 : 5,
          offset: zoomLevel === 1 ? -29 : zoomLevel === 2 ? -29 * 0.75 : -14.5,
        }}
        zIndex={clickedIndex === index ? 1 : null}
        hidden={clickedIndex === index}
        isHideCollidedSymbols={true}
      />
      <Marker
        coordinate={{
          latitude: latitude * 1,
          longitude: longitude * 1,
        }}
        image={markerClickedImage}
        style={
          zoomLevel === 1
            ? styles.image_big
            : zoomLevel === 2
            ? styles.image_mid
            : styles.image_small
        }
        caption={{
          text: JSON.stringify(feeds_count),
          color: fooiyColor.W,
          textSize: zoomLevel === 1 ? 10 : zoomLevel === 2 ? 7.5 : 5,
          haloColor: fooiyColor.P500,
          offset: zoomLevel === 1 ? -29 : zoomLevel === 2 ? -29 * 0.75 : -14.5,
        }}
        onClick={() => onClickMarker(item, index)}
        zIndex={clickedIndex === index ? 1 : null}
        hidden={clickedIndex !== index}
        isHideCollidedSymbols={true}
      />
    </>
  );
};

export default memo(IosMypageMapMarker);

const styles = StyleSheet.create({
  image_big: {
    width: 53,
    height: 62,
  },
  image_mid: {
    width: 53 * 0.75,
    height: 62 * 0.75,
  },
  image_small: {
    width: 53 * 0.5,
    height: 62 * 0.5,
  },
});
