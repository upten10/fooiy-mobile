import React, {useEffect, useState} from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {Align, Marker} from 'react-native-nmap';
import {fooiyColor, fooiyFont} from '../../../common/globalStyles';
import {ArrowIcon} from '../../../../assets/icons/svg/index';

const AndroidMypageMapMarker = props => {
  // index는 MypageMap에서 준 id
  const {
    item,
    index,
    toggleModal,
    setClickedIndex,
    setModalVisible,
    getFeedMarkerDetail,
    clickedIndex,
    zoomLevel,
  } = props;
  const {feed_image, feeds_count, latitude, longitude} = item;
  const [isClicked, setIsClicked] = useState(false);

  console.log(feed_image);

  useEffect(() => {
    if (clickedIndex === index) {
      setIsClicked(true);
    } else {
      setIsClicked(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedIndex]);

  // 마커 클릭 이벤트
  const onClickMarker = (item, index) => {
    toggleModal();
    setClickedIndex(index);
    setModalVisible(true);
    getFeedMarkerDetail(item);
  };

  // return (
  //   feed_image && (
  //     <>
  //       {/* 이미지 */}
  //       <Marker
  //         key={index}
  //         coordinate={{
  //           latitude: latitude * 1,
  //           longitude: longitude * 1,
  //         }}
  //         image={{uri: feed_image}}
  //         style={
  //           zoomLevel > 11
  //             ? styles.image_big
  //             : zoomLevel > 8
  //             ? styles.image_mid
  //             : styles.image_small
  //         }
  //         onClick={() => onClickMarker(item, index)}
  //         zIndex={isClicked ? 1 : null}
  //       />
  //       {/* 테두리 */}
  //       <Marker
  //         coordinate={{
  //           latitude: latitude * 1,
  //           longitude: longitude * 1,
  //         }}
  //         image={
  //           isClicked
  //             ? require('../../../../assets/icons/marker/mypage_marker_clicked.png')
  //             : require('../../../../assets/icons/marker/mypage_marker_unclicked.png')
  //         }
  //         style={
  //           zoomLevel > 11
  //             ? styles.frame_big
  //             : zoomLevel > 8
  //             ? styles.frame_mid
  //             : styles.frame_small
  //         }
  //         anchor={{x: 0.5, y: 0.772}}
  //         onClick={() => onClickMarker(item, index)}
  //         hidden={!isClicked}
  //         zIndex={isClicked ? 1 : null}
  //       />
  //       {feeds_count !== 1 ? (
  //         <>
  //           {/* 뱃지 */}
  //           <Marker
  //             coordinate={{
  //               latitude: latitude * 1,
  //               longitude: longitude * 1,
  //             }}
  //             image={
  //               isClicked
  //                 ? require('../../../../assets/icons/marker/marker_badge_clicked.png')
  //                 : require('../../../../assets/icons/marker/marker_badge_unclicked.png')
  //             }
  //             style={
  //               zoomLevel > 11
  //                 ? styles.badge_big
  //                 : zoomLevel > 8
  //                 ? styles.badge_mid
  //                 : styles.badge_small
  //             }
  //             onClick={() => onClickMarker(item, index)}
  //             hidden={!isClicked}
  //             anchor={{x: 0.1, y: 0.95}}
  //             zIndex={isClicked ? 1 : null}
  //             caption={{
  //               text: JSON.stringify(feeds_count),
  //               color: isClicked ? fooiyColor.W : fooiyColor.G600,
  //               haloColor: isClicked ? fooiyColor.P500 : fooiyColor.W,
  //               offset:
  //                 zoomLevel > 11 ? -60 : zoomLevel > 8 ? -60 * 0.8 : -60 * 0.6,
  //               textSize:
  //                 zoomLevel > 11 ? 12 : zoomLevel > 8 ? 12 * 0.8 : 12 * 0.6,
  //             }}
  //           />
  //         </>
  //       ) : null}
  //     </>
  //   )
  // );
  return (
    <Marker
      key={index}
      style={
        zoomLevel > 11
          ? styles.marker_big
          : zoomLevel > 8
          ? styles.marker_mid
          : styles.marker_small
      }
      onClick={() => onClickMarker(item, index)}
      zIndex={isClicked ? 1 : null}
      coordinate={{
        latitude: latitude * 1,
        longitude: longitude * 1,
      }}>
      <View
        style={
          zoomLevel > 11
            ? styles.marker_big
            : zoomLevel > 8
            ? styles.marker_mid
            : styles.marker_small
        }>
        <Image
          source={{uri: feed_image}}
          resizeMode={'cover'}
          style={
            zoomLevel > 11
              ? styles.image_big
              : zoomLevel > 8
              ? styles.image_mid
              : styles.image_small
          }
        />
        <Image
          source={
            isClicked
              ? require('../../../../assets/icons/marker/mypage_marker_clicked.png')
              : require('../../../../assets/icons/marker/mypage_marker_unclicked.png')
          }
          style={
            zoomLevel > 11
              ? styles.frame_big
              : zoomLevel > 8
              ? styles.frame_mid
              : styles.frame_small
          }
        />
      </View>
      <View
        style={
          zoomLevel > 11
            ? styles.badge_big
            : zoomLevel > 8
            ? styles.badge_mid
            : styles.badge_small
        }>
        <Image
          style={
            zoomLevel > 11
              ? styles.badge_big
              : zoomLevel > 8
              ? styles.badge_mid
              : styles.badge_small
          }
          source={
            isClicked
              ? require('../../../../assets/icons/marker/mypage_aos_marker_badge_clicked.png')
              : require('../../../../assets/icons/marker/mypage_aos_marker_badge_unclicked.png')
          }
        />
        <Text
          style={
            isClicked
              ? zoomLevel > 11
                ? [styles.badge_text_big, {color: fooiyColor.W}]
                : zoomLevel > 8
                ? [styles.badge_text_mid, {color: fooiyColor.W}]
                : [styles.badge_text_small, {color: fooiyColor.W}]
              : zoomLevel > 11
              ? styles.badge_text_big
              : zoomLevel > 8
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
