import React from 'react';
import {Marker} from 'react-native-nmap';

const MapMarker = props => {
  const {shopMarkers, clickedIndex, onClickMarker} = props;
  return shopMarkers.map((item, index) => {
    if (clickedIndex === item.id) {
      return (
        <Marker
          image={require('../../../assets/marker/clickedMapMarker.png')}
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
          zIndex={1}
        />
      );
    } else {
      return (
        <Marker
          image={require('../../../assets/marker/mapMarker.png')}
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
