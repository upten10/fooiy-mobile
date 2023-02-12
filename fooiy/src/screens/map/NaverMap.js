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
import {LocationDarkIcon} from '../../../assets/icons/svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AndroidMapMarker from './AndroidMapMarker';

const NaverMap = props => {
  const depthOneScreenLocation = [
    {latitude: 30.397517566296486, longitude: 124.91716542482237},
    {latitude: 40.26662580495315, longitude: 130.52104864676795},
  ];
  const insets = useSafeAreaInsets();
  //map ref 초기화
  const mapView = useRef(null);
  const sheetRef = useRef(null);
  const {debounceCallback, isLoading} = useDebounce({time: 250});

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
  const [shopCount, setShopCount] = useState(0);

  useEffect(() => {
    console.log(shopMarkers);
    if (depth <= 2) {
      setShopMarkers([]);
      toggleModal();
    }
  }, [depth]);

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
      <Pressable
        style={[
          styles.button,
          {
            bottom: globalVariable.tabBarHeight + 54 + insets.bottom + 16,
          },
        ]}
        onPress={onClickLocationBtn}>
        <LocationDarkIcon />
      </Pressable>
    );
  };

  const getShopMarkerList = data => {
    ApiManagerV2.get(apiUrl.MAP_SHOP_MARKER, {
      params: {
        longitude_left_bottom:
          depth === 1 ? depthOneScreenLocation[0].longitude : data[0].longitude,
        latitude_left_bottom:
          depth === 1 ? depthOneScreenLocation[0].latitude : data[0].latitude,
        latitude_right_top:
          depth === 1 ? depthOneScreenLocation[1].latitude : data[1].latitude,
        longitude_right_top:
          depth === 1 ? depthOneScreenLocation[1].longitude : data[1].longitude,
        shop_category: isCafe ? globalVariable.category_cafe : null,
        depth: depth,
      },
    })
      .then(res => {
        if (res.data.payload.shop_list) {
          if (depth === 1) {
            setShopMarkers(res.data.payload.shop_list.regions);
          } else {
            setShopMarkers(res.data.payload.shop_list);
            setShopCount(res.data.payload.shop_count);
          }
        } else {
          setShopMarkers([]);
        }
      })
      .catch(e => console.log('getShopMarkerList: ', e));
  };

  const getShopMarkerDetail = data => {
    ApiManagerV2.get(apiUrl.MAP_SHOP_MARKER_DETAIL, {
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
  }, [screenLocation, isCafe]);

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
    <View style={{flex: 1}}>
      <MapHeader
        isCafe={isCafe}
        setIsCafe={setIsCafe}
        setShopMarkers={setShopMarkers}
        shopCount={shopCount}
        sheetRef={sheetRef}
        depth={depth}
      />
      <NaverMapView
        ref={mapView}
        // liteModeEnabled
        // useTextureView={true}
        center={center}
        showsMyLocationButton={false}
        zoomControl={false}
        scaleBar={false}
        rotateGesturesEnabled={false}
        minZoomLevel={5}
        maxZoomLevel={18}
        style={styles.map}
        onMapClick={() => toggleModal()}
        onCameraChange={e => onCameraChange(e)}
        logoMargin={Platform.select({
          ios: {
            left: 16,
            bottom: globalVariable.tabBarHeight + 54 + 16,
          },
          android: {
            left: 16,
            bottom: globalVariable.tabBarHeight + 54 + 23 + 16,
          },
        })}>
        {shopMarkers.length > 0
          ? Platform.select({
              ios: shopMarkers.map(item => {
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
              }),
              android: shopMarkers.map(item => {
                return (
                  <AndroidMapMarker
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
              }),
            })
          : null}
      </NaverMapView>
      <LocationBtn />
      {isModalVisible ? (
        <ShopModal onBackdropPress={toggleModal} shops_info={clickedShop} />
      ) : null}
      <MapBottomSheet
        screenLocation={screenLocation}
        isCafe={isCafe}
        sheetRef={sheetRef}
      />
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
    width: 40,
    height: 40,
    position: 'absolute',
    right: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 100,
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
});
