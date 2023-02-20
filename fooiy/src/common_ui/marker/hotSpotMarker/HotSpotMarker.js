import React, {memo, useCallback, useEffect, useState} from 'react';
import {Image, Platform, Text, View} from 'react-native';
import {Marker} from 'react-native-nmap';
import {ApiManagerV2} from '../../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../../common/Enums';
import {fooiyColor, fooiyFont} from '../../../common/globalStyles';
import {getMarkerImage} from './function/getMarkerImage';

const HotSpotMarker = props => {
  const {setCenter, mapView} = props;
  const [spotMarkers, setSpotMarker] = useState([]);
  const getSpotMarkers = () => {
    ApiManagerV2.get(apiUrl.MAP_SHOP_MARKER, {params: {type: 'spot'}}).then(
      res => {
        setSpotMarker(res.data.payload.spot_list.regions);
      },
    );
  };
  useEffect(() => {
    getSpotMarkers();
  }, []);

  const CustomMarker = useCallback((item, index) => {
    const markerImage = getMarkerImage(item.name.length);
    return Platform.select({
      ios: (
        <Marker
          image={markerImage.image}
          key={index}
          coordinate={{
            latitude: item.latitude * 1,
            longitude: item.longitude * 1,
          }}
          zIndex={-1}
          isHideCollidedMarkers={true}
          style={{height: 30, width: markerImage.width}}
          caption={{
            text: `     ${item.name}`,
            textSize: 10,
            ...fooiyFont.Caption2,
            offset: -24,
            color: fooiyColor.W,
            haloColor: fooiyColor.G600,
          }}
          onClick={() => {
            setCenter({
              longitude: item.longitude * 1,
              latitude: item.latitude * 1,
              zoom: 15,
            });
            mapView.current.animateToCoordinate({
              longitude: item.longitude * 1,
              latitude: item.latitude * 1,
            });
          }}
        />
      ),
      android: (
        <Marker
          key={index}
          image={markerImage.image}
          coordinate={{
            latitude: item.latitude * 1,
            longitude: item.longitude * 1,
          }}
          onClick={() => {
            setCenter({
              longitude: item.longitude * 1,
              latitude: item.latitude * 1,
              zoom: 15,
            });
            mapView.current.animateToCoordinate({
              longitude: item.longitude * 1,
              latitude: item.latitude * 1,
            });
          }}
          zIndex={-1}
          style={{height: 30, width: markerImage.width + 6}}>
          <View style={{position: 'absolute'}}>
            <Image
              source={markerImage.image}
              style={{
                height: 30,
                width: markerImage.width + 6,
                position: 'absolute',
              }}
            />
          </View>
          <View style={{position: 'absolute', width: markerImage.width}}>
            <Text
              style={{
                ...fooiyFont.Caption2,
                zIndex: 100,
                color: fooiyColor.W,
                width: markerImage.width + 6,
                height: 30,
                fontSize: 10,
                left: 26,
                top: 5,
                lineHeight: null,
              }}>
              {item.name}
            </Text>
          </View>
        </Marker>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return spotMarkers.map((item, index) => {
    return CustomMarker(item, index);
  });
};

export default memo(HotSpotMarker);
