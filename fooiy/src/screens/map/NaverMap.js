import React, {useState, useRef, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import NaverMapView, {Marker, Align} from 'react-native-nmap';
import {throttle} from 'lodash';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {globalVariable} from '../../common/globalVariable';

import MapBottomSheet from './bottom_sheet/MapBottomSheet';
import ShopModal from './ShopModal';
import {ApiMangerV1} from '../../common/api/v1/ApiMangerV1';
import {apiUrl} from '../../common/Enums';
import CustomMarker from './Marker';
import Geolocation from 'react-native-geolocation-service';
import {LocationPermission} from '../../common/Permission';

const NaverMap = () => {
  //map ref 초기화
  const mapView = useRef(null);

  // 클릭 된 마커 키
  const [clickedIndex, setClickedIndex] = useState(null);
  const [clickedShop, setClickedShop] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [center, setCenter] = useState();
  // 좌측 하단, 우측 하단 순으로 들어감
  const [screenLocation, setScreenLocation] = useState([]);
  const [zoom, setZoom] = useState(16);
  const [depth, setDepth] = useState(4);
  const [currentLocation, setCurrentLocation] = useState({});
  const [shopMarkers, setShopMarkers] = useState([]);

  // 맵 움직이고 몇초 후에 설정됨 -> throttle
  const throttled = throttle(e => {
    setScreenLocation([e.contentRegion[0], e.contentRegion[2]]);
    setDepth(e.zoom > 11 ? 4 : e.zoom > 8 ? 2 : 1);
    setZoom(e.zoom);
  }, 5000);
  const onCameraChange = e => {
    throttled(e);
  };

  // 모달 없애기
  const toggleModal = () => {
    setModalVisible(false);
    setClickedIndex(null);
    setClickedShop(null);
  };
  // 마커 클릭 이벤트
  const onClickMarker = index => {
    if (depth === 4) {
      setClickedIndex(index);
      setModalVisible(true);
      setClickedShop(shopMarkers[index].shops_info);
    } else {
      setCenter({
        ...{
          longitude: shopMarkers[index].longitude * 1,
          latitude: shopMarkers[index].latitude * 1,
        },
        zoom: depth === 1 ? 8.01 : 11.01,
      });
    }
  };
  // 현위치 버튼 클릭 이벤트
  const onClickLocationBtn = () => {
    mapView.current.setLocationTrackingMode(2);
    if (Platform.OS === 'ios') {
      mapView.current.setLocationTrackingMode(2);
    } else {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setCurrentLocation({latitude, longitude, zoom: zoom});
          mapView.current.animateToCoordinate({
            longitude,
            latitude,
          });
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };
  // 현위치 버튼 컴포넌트
  const LocationBtn = () => {
    return (
      <Pressable style={styles.button} onPress={onClickLocationBtn}>
        <Text style={styles.text}>{'현위치'}</Text>
      </Pressable>
    );
  };

  const getShopMarkerList = async data => {
    await ApiMangerV1.get(apiUrl.MAP_SHOP_MARKER, {
      params: {
        longitude_left_bottom: data[0].longitude,
        latitude_left_bottom: data[0].latitude,
        latitude_right_top: data[1].latitude,
        longitude_right_top: data[1].longitude,
        depth: depth,
      },
    })
      .then(res => {
        if (res.data.payload.shop_list) {
          if (depth === 4) {
            setShopMarkers(res.data.payload.shop_list.results);
          } else {
            setShopMarkers(res.data.payload.shop_list.regions);
          }
        }
      })
      .catch(e => console.log(e));
  };

  const CurrentLocation = useCallback(() => {
    return Platform.OS === 'android' ? (
      currentLocation.latitude ? (
        <Marker
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
        />
      ) : null
    ) : null;
  }, [currentLocation]);

  useEffect(() => {
    LocationPermission();
    onClickLocationBtn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getShopMarkerList(screenLocation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenLocation]);

  return (
    <View>
      <NaverMapView
        ref={mapView}
        style={styles.map}
        showsMyLocationButton={true}
        center={center}
        onMapClick={() => toggleModal()}
        zoomControl={false}
        minZoomLevel={5}
        maxZoomLevel={18}
        locationTrackingMode={2}
        rotateGesturesEnabled={false}
        // onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
        onCameraChange={e => onCameraChange(e)}
        // onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}
      >
        <CurrentLocation />
        {shopMarkers.map((marker, index) => {
          return (
            <CustomMarker
              marker={marker}
              index={index}
              depth={depth}
              clickedIndex={clickedIndex}
              is_plural={
                shopMarkers[index].shops_info
                  ? shopMarkers[index].shops_info.length
                  : 1
              }
              is_yummy={
                shopMarkers[index].shops_info
                  ? shopMarkers[index].shops_info.is_yummy
                  : false
              }
              onClickMarker={onClickMarker}
            />
          );
        })}
      </NaverMapView>
      <LocationBtn />
      {isModalVisible ? (
        <ShopModal onBackdropPress={toggleModal} shops_info={clickedShop} />
      ) : null}
      <MapBottomSheet screenLocation={screenLocation} />
    </View>
  );
};

export default NaverMap;

const styles = StyleSheet.create({
  map: {
    width: globalVariable.width,
    height: globalVariable.height,
  },
  button: {
    position: 'absolute',
    bottom: globalVariable.height / 5,
    left: globalVariable.width / 1.25,
    backgroundColor: 'white',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 0.3, // 낮을수록 진해짐
        },
        shadowOpacity: 0.15, // 높을수록 진해짐
        shadowRadius: 5,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#FE5B5C',
  },
});
