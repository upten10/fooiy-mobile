import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Align, Marker} from 'react-native-nmap';
import {fooiyColor} from '../../../common/globalStyles';

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
        {/* 이미지 */}
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
          zIndex={isClicked ? 1 : null}
        />
        {/* 테두리 */}
        <Marker
          coordinate={{
            latitude: latitude * 1,
            longitude: longitude * 1,
          }}
          image={
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
          anchor={{x: 0.5, y: 0.772}}
          onClick={() => onClickMarker(item, index)}
          hidden={!isClicked}
          zIndex={isClicked ? 1 : null}
        />
        {feeds_count !== 1 ? (
          <>
            {/* 뱃지 */}
            <Marker
              coordinate={{
                latitude: latitude * 1,
                longitude: longitude * 1,
              }}
              image={
                isClicked
                  ? require('../../../../assets/icons/marker/marker_badge_clicked.png')
                  : require('../../../../assets/icons/marker/marker_badge_unclicked.png')
              }
              style={
                zoomLevel > 11
                  ? styles.badge_big
                  : zoomLevel > 8
                  ? styles.badge_mid
                  : styles.badge_small
              }
              onClick={() => onClickMarker(item, index)}
              hidden={!isClicked}
              anchor={{x: 0.1, y: 0.95}}
              zIndex={isClicked ? 1 : null}
              caption={{
                text: JSON.stringify(feeds_count),
                color: isClicked ? fooiyColor.W : fooiyColor.G600,
                haloColor: isClicked ? fooiyColor.P500 : fooiyColor.W,
                offset:
                  zoomLevel > 11 ? -60 : zoomLevel > 8 ? -60 * 0.8 : -60 * 0.6,
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

export default AndroidMypageMapMarker;

const styles = StyleSheet.create({
  image_big: {
    width: 48.5,
    height: 48.5,
  },
  image_mid: {
    width: 48.5 * 0.8,
    height: 48.5 * 0.8,
  },
  image_small: {
    width: 48.5 * 0.6,
    height: 48.5 * 0.6,
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
    width: 62,
    height: 62,
  },
  badge_mid: {
    width: 62 * 0.8,
    height: 62 * 0.8,
  },
  badge_small: {
    width: 62 * 0.6,
    height: 62 * 0.6,
  },
});
