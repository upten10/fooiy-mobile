import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import NaverMapView from 'react-native-nmap';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {globalVariable} from '../../common/globalVariable';

import MapBottomSheet from './bottom_sheet/MapBottomSheet';
import ShopModal from './ShopModal';
import {ApiManagerV2} from '../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../common/Enums';
import {LocationPermission} from '../../common/Permission';
import Geolocation from 'react-native-geolocation-service';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import MapMarker from './MapMarker';
import {useDebounce} from '../../common/hooks/useDebounce';
import {fooiyColor} from '../../common/globalStyles';
import {useSelector} from 'react-redux';
import MapHeader from './MapHeader';

const NaverMap = props => {
  //map ref 초기화
  const mapView = useRef(null);
  const {debounceCallback, isLoading} = useDebounce({time: 500});

  // 클릭 된 마커 키
  const [clickedIndex, setClickedIndex] = useState(null);
  const [clickedShop, setClickedShop] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [center, setCenter] = useState();
  // 좌측 하단, 우측 하단 순으로 들어감
  const [screenLocation, setScreenLocation] = useState([]);
  const [depth, setDepth] = useState(4);
  const [shopMarkers, setShopMarkers] = useState([]);

  //control
  const [isCafe, setIsCafe] = useState(false);

  // 맵 움직이고 몇초 후에 설정됨 -> throttle
  const onCameraChange = e => {
    debounceCallback(() => {
      setScreenLocation([e.contentRegion[0], e.contentRegion[2]]);
      // 10 < 4단계, 8 < 2단계 < 10, 1단계 < 8
      setDepth(e.zoom > 10 ? 4 : e.zoom > 8 ? 2 : 1);
    });
  };

  // 모달 없애기
  const toggleModal = () => {
    setModalVisible(false);
    setClickedIndex(null);
    setClickedShop([]);
  };

  const onPressClusterMarker = id => {
    const curMarker = shopMarkers.filter(shop => shop.id === id);
    setCenter({
      longitude: curMarker[0].longitude * 1,
      latitude: curMarker[0].latitude * 1,
      zoom: depth === 1 ? 8.01 : 11.01,
    });
  };

  // 현위치 버튼 클릭 이벤트
  const onClickLocationBtn = () => {
    check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION).then(res => {
      if (res === 'granted' || res === 'limited') {
        Platform.OS === 'android'
          ? Geolocation.getCurrentPosition(
              async position => {
                const {longitude, latitude} = position.coords;
                mapView.current.animateToCoordinate({longitude, latitude});
              },
              error => this.setState({error: error.message}),
              {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
            )
          : null;
      }
    });
    mapView.current.setLocationTrackingMode(2);
  };

  const checkGrant = async () => {
    await LocationPermission();
    Platform.OS === 'ios'
      ? check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
          .then(result => {
            switch (result) {
              case RESULTS.GRANTED:
                onClickLocationBtn();
                break;
              case RESULTS.LIMITED:
                onClickLocationBtn();
                break;
            }
          })
          .catch(error => {
            console.log('checkGrant: ', error);
          })
      : check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)
          .then(result => {
            switch (result) {
              case RESULTS.LIMITED:
                onClickLocationBtn();
                break;
              case RESULTS.GRANTED:
                onClickLocationBtn();
                break;
            }
          })
          .catch(error => {
            console.log('checkGrant: ', error);
          });
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
    await ApiManagerV2.get(apiUrl.MAP_SHOP_MARKER, {
      params: {
        longitude_left_bottom: data[0].longitude,
        latitude_left_bottom: data[0].latitude,
        latitude_right_top: data[1].latitude,
        longitude_right_top: data[1].longitude,
        // shop_category: ,
        depth: depth,
      },
    })
      .then(res => {
        if (res.data.payload.shop_list) {
          if (depth === 1) {
            setShopMarkers(res.data.payload.shop_list.regions);
          } else {
            setShopMarkers(res.data.payload.shop_list);
          }
        } else {
          setShopMarkers([]);
        }
      })
      .catch(e => console.log('getShopMarkerList: ', e));
  };

  const getShopMarkerDetail = async data => {
    await ApiManagerV2.get(apiUrl.MAP_SHOP_MARKER_DETAIL, {
      params: {
        latitude: data.latitude,
        longitude: data.longitude,
      },
    })
      .then(res => {
        setClickedShop(res.data.payload.shop_list);
      })
      .catch(e => console.warn('getShopMarkerDetail: ', e));
  };

  useEffect(() => {
    if (screenLocation.length !== 0) {
      getShopMarkerList(screenLocation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenLocation]);

  useEffect(() => {
    props.center
      ? setCenter({
          ...{
            longitude: props.center.longitude * 1,
            latitude: props.center.latitude * 1,
          },
          zoom: 16,
        })
      : checkGrant();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.center]);

  return (
    <View>
      <MapHeader isCafe={isCafe} setIsCafe={setIsCafe} />
      <NaverMapView
        ref={mapView}
        style={styles.map}
        showsMyLocationButton={true}
        center={center}
        onMapClick={() => toggleModal()}
        zoomControl={false}
        minZoomLevel={5}
        maxZoomLevel={18}
        rotateGesturesEnabled={false}
        onCameraChange={e => onCameraChange(e)}
        // onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
        // onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}
      >
        {/* {shopMarkers.map((marker, index) => {
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
        })} */}
        {shopMarkers.map(item => {
          return (
            <MapMarker
              key={item.id}
              {...item}
              setClickedIndex={setClickedIndex}
              clickedIndex={clickedIndex}
              getShopMarkerDetail={getShopMarkerDetail}
              setModalVisible={setModalVisible}
              depth={depth}
              onPressClusterMarker={onPressClusterMarker}
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
