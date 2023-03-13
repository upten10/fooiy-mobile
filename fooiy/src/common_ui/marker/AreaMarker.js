import React, {memo} from 'react';
import {Marker} from 'react-native-nmap';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {area_1} from '../../common/helpers/addressKR';

const AreaMarker = props => {
  const {setCenter, mapView} = props;
  return area_1.map((item, index) => {
    return (
      <Marker
        image={require('../../../assets/images/map_marker_area1.png')}
        key={index + 14235123}
        coordinate={{
          latitude: item.latitude * 1,
          longitude: item.longitude * 1,
        }}
        width={36}
        height={40}
        caption={{
          text: `${item.name}`,
          textSize: 12,
          ...fooiyFont.Subtitle4,
          offset: -31,
          color: fooiyColor.P500,
        }}
        onClick={() => {
          setCenter({
            longitude: item.longitude * 1,
            latitude: item.latitude * 1,
            zoom: 11.01,
          });
          mapView.current.animateToCoordinate({
            longitude: item.longitude * 1,
            latitude: item.latitude * 1,
          });
        }}
      />
    );
  });
};

export default memo(AreaMarker);
