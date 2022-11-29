import React from 'react';
import {Marker, Align} from 'react-native-nmap';

const selectMarker = {
  singular: {
    markerImg: require('../../../assets/icons/marker/marker.png'),
    markerClickedImg: require('../../../assets/icons/marker/marker_clicked.png'),
    width: 40,
    height: 50,
  },
  plural: {
    markerImg: require('../../../assets/icons/marker/marker.png'),
    markerClickedImg: require('../../../assets/icons/marker/marker_clicked.png'),
    width: 50,
    height: 60,
  },
  cluster: {
    markerImg: require('../../../assets/icons/marker/marker.png'),
    markerClickedImg: require('../../../assets/icons/marker/marker_clicked.png'),
    width: 70,
    height: 80,
  },
  yummy: {
    markerImg: require('../../../assets/icons/marker/marker.png'),
    markerClickedImg: require('../../../assets/icons/marker/marker_clicked.png'),
    width: 90,
    height: 100,
  },
};

const CustomMarker = props => {
  const {
    marker,
    index,
    clickedIndex,
    onClickMarker,
    depth,
    is_plural,
    is_yummy,
  } = props;
  const {markerImg, markerClickedImg, width, height} =
    depth > 2
      ? is_yummy
        ? selectMarker.yummy
        : is_plural === 1
        ? selectMarker.singular
        : selectMarker.plural
      : selectMarker.cluster;
  return (
    <Marker
      key={index}
      coordinate={{
        longitude: marker.longitude * 1,
        latitude: marker.latitude * 1,
      }}
      width={width}
      height={height}
      image={clickedIndex === index ? markerClickedImg : markerImg}
      caption={{
        // 캡션을 어떻게 할지 생각해야함
        // 마커를 두개 그림
        text: `${marker.shops_score}`,
        align: Align.Center,
        color: '#FE5B5C',
        textSize: 13,
      }}
      onClick={() => onClickMarker(index)}
    />
  );
};

export default CustomMarker;
