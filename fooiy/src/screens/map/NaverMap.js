import React, {useEffect, useRef, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import NaverMapView, {Marker} from 'react-native-nmap';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {LocationDarkIcon} from '../../../assets/icons/svg';
import {ApiManagerV2} from '../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../common/Enums';
import FooiyToast from '../../common/FooiyToast';
import {globalVariable} from '../../common/globalVariable';
import {useDebounce} from '../../common/hooks/useDebounce';
import {LocationPermission} from '../../common/Permission';
import AndroidMapMarker from './AndroidMapMarker';
import MapBottomSheet from './bottom_sheet/MapBottomSheet';
import MapHeader from './MapHeader';
import MapMarker from './MapMarker';
import ShopModal from './ShopModal';

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
    if (depth <= 2) {
      setShopMarkers([]);
      toggleModal();
    }
  }, [depth]);

  useEffect(() => {
    if (screenLocation.length !== 0) {
      getShopMarkerList(screenLocation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenLocation, isCafe]);

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
  const onClickLocationBtn = async () => {
    (await LocationPermission())
      ? Platform.OS === 'android'
        ? Geolocation.getCurrentPosition(
            async position => {
              const {longitude, latitude} = position.coords;
              mapView.current.animateToCoordinate({longitude, latitude});
            },
            error => this.setState({error: error.message}),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
          )
        : mapView.current.setLocationTrackingMode(2)
      : null;
  };

  // 현위치 버튼 컴포넌트
  const LocationBtn = () => {
    return (
      <Pressable
        style={[
          styles.button,
          {
            bottom: globalVariable.tabBarHeight + 54 + 24 + insets.bottom,
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
          setShopCount(res.data.payload.shop_count);
          setShopMarkers([]);
        }
      })
      .catch(e => FooiyToast.error());
  };

  const getShopMarkerDetail = data => {
    ApiManagerV2.get(apiUrl.MAP_SHOP_MARKER_DETAIL, {
      params: {
        latitude: data.latitude,
        longitude: data.longitude,
        shop_category: isCafe ? globalVariable.category_cafe : '',
      },
    })
      .then(res => {
        setClickedShop(res.data.payload.shop_list);
      })
      .catch(e => FooiyToast.error());
  };

  useEffect(() => {
    props.center
      ? setCenter({
          ...{
            longitude: props.center.longitude * 1,
            latitude: props.center.latitude * 1,
          },
          zoom: 16,
        })
      : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.center]);
  useEffect(() => {
    const center = async () => {
      (await LocationPermission())
        ? onClickLocationBtn()
        : setCenter({
            ...{
              longitude: globalVariable.default_longitude,
              latitude: globalVariable.default_latitude,
            },
            zoom: 16,
          });
    };

    center();
  }, []);

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
        tiltGesturesEnabled={false}
        minZoomLevel={5}
        maxZoomLevel={18}
        style={styles.map}
        onMapClick={() => toggleModal()}
        onCameraChange={e => onCameraChange(e)}
        logoMargin={Platform.select({
          ios: {
            left: 16,
            bottom: globalVariable.tabBarHeight + 54 + 24,
          },
          android: {
            left: 16,
            bottom: globalVariable.tabBarHeight + 54 + 24 + 16,
          },
        })}>
        <Marker
          coordinate={{
            latitude: 47.61424127195381,
            longitude: -122.33682336610559,
          }}
          image={require('../../../assets/icons/marker/marker.png')}
        />
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
