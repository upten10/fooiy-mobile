import React from 'react';
import {StyleSheet} from 'react-native';
import {Marker} from 'react-native-nmap';
import {fooiyColor} from '../../common/globalStyles';

export default props => {
  const {
    id,
    latitude,
    longitude,
    setClickedIndex,
    clickedIndex,
    getShopMarkerDetail,
    setModalVisible,
    depth,

    name,
    count,
    onPressClusterMarker,
  } = props;
  return depth === 1 ? (
    <Marker
      image={require('../../../assets/icons/marker/cluster_marker.png')}
      coordinate={{latitude: latitude * 1, longitude: longitude * 1}}
      style={styles.clusterMarker}
      caption={{
        text: `${name}`,
        textSize: 12,
        offset: -53,
        color: fooiyColor.P500,
      }}
      subCaption={{
        text: `${count}`,
        textSize: 18,
        color: fooiyColor.P500,
      }}
      anchor={{x: 0.3, y: 0.5}}
      onClick={() => onPressClusterMarker(id)}
    />
  ) : depth === 2 ? null : (
    <>
      <Marker
        image={require('../../../assets/icons/marker/marker_clicked.png')}
        coordinate={{latitude: latitude * 1, longitude: longitude * 1}}
        style={styles.markerClicked}
        hidden={clickedIndex === id ? false : true}
      />
      <Marker
        image={require('../../../assets/icons/marker/marker.png')}
        coordinate={{latitude: latitude * 1, longitude: longitude * 1}}
        style={styles.markerUnclicked}
        hidden={clickedIndex === id ? true : false}
        onClick={() => {
          setClickedIndex(id);
          getShopMarkerDetail({latitude, longitude});
          setModalVisible(true);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  markerClicked: {
    width: 24,
    height: 24,
  },
  markerUnclicked: {
    width: 24,
    height: 24,
  },
  clusterMarker: {
    width: 64,
    height: 64,
  },
});
