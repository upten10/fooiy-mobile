import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Marker, Circle, Align} from 'react-native-nmap';
import {fooiyColor, globalStyles} from '../../../common/globalStyles';

const MypageMapMarker = props => {
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
    // setClickedShop(feedMarkers[index].shops_info);
  };

  return (
    feed_image && (
      <>
        <Marker
          key={index}
          coordinate={{
            latitude: latitude * 1,
            longitude: longitude * 1,
          }}
          image={{uri: feed_image}}
          style={
            zoomLevel > 11
              ? styles.image_big
              : zoomLevel > 8
              ? styles.image_mid
              : styles.image_small
          }
          onClick={() => onClickMarker(item, index)}
        />
        <Marker
          coordinate={{
            latitude: latitude * 1,
            longitude: longitude * 1,
          }}
          image={require('../../../../assets/icons/marker/mypage_marker_clicked.png')}
          style={
            zoomLevel > 11
              ? styles.frame_big
              : zoomLevel > 8
              ? styles.frame_mid
              : styles.frame_small
          }
          anchor={{x: 0.5, y: 0.838}}
          onClick={() => onClickMarker(item, index)}
          hidden={!isClicked}
        />
        <Marker
          coordinate={{
            latitude: latitude * 1,
            longitude: longitude * 1,
          }}
          image={require('../../../../assets/icons/marker/mypage_marker_unclicked.png')}
          style={
            zoomLevel > 11
              ? styles.frame_big
              : zoomLevel > 8
              ? styles.frame_mid
              : styles.frame_small
          }
          anchor={{x: 0.5, y: 0.838}}
          onClick={() => onClickMarker(item, index)}
          hidden={isClicked}
        />
        {feeds_count !== 1 ? (
          <>
            <Marker
              coordinate={{
                latitude: latitude * 1,
                longitude: longitude * 1,
              }}
              image={require('../../../../assets/icons/marker/marker_badge_clicked.png')}
              style={
                zoomLevel > 11
                  ? styles.badge_big
                  : zoomLevel > 8
                  ? styles.badge_mid
                  : styles.badge_small
              }
              onClick={() => onClickMarker(item, index)}
              hidden={!isClicked}
              anchor={{x: 0.1, y: 1}}
              caption={{
                text: JSON.stringify(feeds_count),
                color: fooiyColor.W,
                haloColor: fooiyColor.P500,
                offset:
                  zoomLevel > 11 ? -60 : zoomLevel > 8 ? -60 * 0.8 : -60 * 0.6,
                textSize:
                  zoomLevel > 11 ? 12 : zoomLevel > 8 ? 12 * 0.8 : 12 * 0.6,
              }}
            />
            <Marker
              coordinate={{
                latitude: latitude * 1,
                longitude: longitude * 1,
              }}
              image={require('../../../../assets/icons/marker/marker_badge_unclicked.png')}
              style={
                zoomLevel > 11
                  ? styles.badge_big
                  : zoomLevel > 8
                  ? styles.badge_mid
                  : styles.badge_small
              }
              onClick={() => onClickMarker(item, index)}
              hidden={isClicked}
              anchor={{x: 0.1, y: 1}}
              caption={{
                text: JSON.stringify(feeds_count),
                color: fooiyColor.G600,
                offset:
                  zoomLevel > 11 ? -60 : zoomLevel > 8 ? -60 * 0.8 : -60 * 0.6,
                requestedWidth: 100,
                textSize:
                  zoomLevel > 11 ? 12 : zoomLevel > 8 ? 12 * 0.8 : 12 * 0.6,
              }}
            />
          </>
        ) : null}
      </>
    )
  );
};

export default MypageMapMarker;

const styles = StyleSheet.create({
  image_big: {
    width: 48,
    height: 48,
  },
  frame_big: {
    width: 56,
    height: 62,
  },
  badge_big: {
    width: 62,
    height: 62,
  },
  image_mid: {
    width: 48 * 0.8,
    height: 48 * 0.8,
  },
  frame_mid: {
    width: 56 * 0.8,
    height: 62 * 0.8,
  },
  badge_mid: {
    width: 62 * 0.8,
    height: 62 * 0.8,
  },
  image_small: {
    width: 48 * 0.6,
    height: 48 * 0.6,
  },
  frame_small: {
    width: 56 * 0.6,
    height: 62 * 0.6,
  },
  badge_small: {
    width: 62 * 0.6,
    height: 62 * 0.6,
  },
});
