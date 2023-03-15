import React from 'react';
import {Marker} from 'react-native-nmap';

const MapMarker = props => {
  const {shopMarkers, clickedIndex, onClickMarker} = props;
  return shopMarkers.map((item, index) => {
    if (clickedIndex === item.id) {
      return (
        <Marker
          image={require('../../../assets/images/map_marker_clicked.png')}
          key={item.id}
          coordinate={{
            latitude: item.latitude * 1,
            longitude: item.longitude * 1,
          }}
          width={38}
          height={42}
          onClick={() => {
            onClickMarker(item);
          }}
          zIndex={1}
        />
      );
    } else {
      return (
        <Marker
          image={require('../../../assets/images/map_marker_unclicked.png')}
          key={item.id}
          coordinate={{
            latitude: item.latitude * 1,
            longitude: item.longitude * 1,
          }}
          width={32}
          height={36}
          onClick={() => {
            onClickMarker(item);
          }}
        />
      );
    }
  });
};

export default MapMarker;
