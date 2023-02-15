import React, {useEffect, useRef, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import NaverMapView, {Marker} from 'react-native-nmap';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ApiManagerV2} from '../../../common/api/v2/ApiManagerV2';
import {apiUrl, toastMessage} from '../../../common/Enums';
import FooiyToast from '../../../common/FooiyToast';
import {fooiyColor} from '../../../common/globalStyles';
import {globalVariable} from '../../../common/globalVariable';
import {useDebounce} from '../../../common/hooks/useDebounce';
import {LocationPermission} from '../../../common/Permission';
import {StackHeader} from '../../../common_ui/headers/StackHeader';
import ShopModal from '../../map/ShopModal';
import AndroidMypageMapMarker from './AndroidMypageMapMarker';
import MypageMapMarker from './MypageMapMarker';

// 다른 유저 페이지에서 접근 시 props에 account_id랑 nickname 들어있음
const MypageMap = props => {
  const mapView = useRef(null);
  const [center, setCenter] = useState();
  const {debounceCallback, isLoading} = useDebounce({time: 500});

  const {
    // other user page
    account_id,
    nickname,

    // party page
    name,
    party_id,
  } = props.route.params;

  const [screenLocation, setScreenLocation] = useState([]);
  const [feedMarkers, setFeedMarkers] = useState([]);
  const [feedMarkerDetails, setFeedMarkerDetails] = useState([]);

  const [clickedIndex, setClickedIndex] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(14);

  useEffect(() => {
    if (screenLocation.length !== 0) {
      getFeedMarkerList(screenLocation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenLocation]);
  useEffect(() => {
    const center = async () => {
      (await LocationPermission())
        ? onClickLocationBtn()
        : (FooiyToast.message('위치 권한을 허용해주세요!', true, 0),
          setCenter({
            ...{
              longitude: globalVariable.default_longitude,
              latitude: globalVariable.default_latitude,
              zoom: 16,
            },
          }));
    };
    center();
  }, []);
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

  // 모달 없애기
  const toggleModal = () => {
    setModalVisible(false);
    setClickedIndex(null);
  };

  const onCameraChange = e => {
    debounceCallback(() => {
      setScreenLocation([e.contentRegion[0], e.contentRegion[2]]);
      setZoomLevel(e.zoom);
    });
  };

  const getFeedMarkerList = async data => {
    ApiManagerV2.get(apiUrl.FEED_MAP_MARKER, {
      params: {
        type: party_id !== undefined ? 'party' : 'mypage',
        longitude_left_bottom: screenLocation[0].longitude,
        latitude_left_bottom: screenLocation[0].latitude,
        latitude_right_top: screenLocation[1].latitude,
        longitude_right_top: screenLocation[1].longitude,
        ...(account_id && {other_account_id: account_id}),
        ...(party_id && {party_id: party_id}),
      },
    })
      .then(res => {
        setFeedMarkers(res.data.payload.feed_list);
      })
      .catch(e => console.log(e));
  };

  const getFeedMarkerDetail = async data => {
    await ApiManagerV2.get(apiUrl.FEED_MAP_DETAIL, {
      params: {
        type: party_id !== undefined ? 'party' : 'mypage',
        latitude: data.latitude,
        longitude: data.longitude,
        ...(account_id && {other_account_id: account_id}),
        ...(party_id && {party_id: party_id}),
      },
    })
      .then(res => {
        setFeedMarkerDetails(res.data.payload.shop_list);
      })
      .catch(e => console.log(e));
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: fooiyColor.W}}
      edges={Platform.OS === 'ios' ? 'top' : null}>
      <StackHeader
        title={
          name !== undefined
            ? name
            : nickname !== undefined
            ? nickname
            : '내 지도'
        }
      />
      <View style={{flex: 1}}>
        <NaverMapView
          ref={mapView}
          style={styles.map}
          useTextureView={Platform.select({
            ios: false,
            android: true,
          })}
          onMapClick={toggleModal}
          zoomControl={false}
          minZoomLevel={5}
          maxZoomLevel={18}
          scaleBar={false}
          rotateGesturesEnabled={false}
          tiltGesturesEnabled={false}
          onCameraChange={e => onCameraChange(e)}
          center={center}>
          <Marker
            coordinate={{
              latitude: 47.61424127195381,
              longitude: -122.33682336610559,
            }}
            image={require('../../../../assets/icons/marker/marker.png')}
          />
          {feedMarkers.length > 0
            ? Platform.select({
                ios: feedMarkers.map(item => {
                  return (
                    <MypageMapMarker
                      key={item.id}
                      item={item}
                      index={item.id}
                      toggleModal={toggleModal}
                      setClickedIndex={setClickedIndex}
                      setModalVisible={setModalVisible}
                      getFeedMarkerDetail={getFeedMarkerDetail}
                      clickedIndex={clickedIndex}
                      zoomLevel={zoomLevel}
                    />
                  );
                }),
                android: feedMarkers.map(item => {
                  return (
                    <AndroidMypageMapMarker
                      key={item.id}
                      item={item}
                      index={item.id}
                      toggleModal={toggleModal}
                      setClickedIndex={setClickedIndex}
                      setModalVisible={setModalVisible}
                      getFeedMarkerDetail={getFeedMarkerDetail}
                      clickedIndex={clickedIndex}
                      zoomLevel={zoomLevel}
                    />
                  );
                }),
              })
            : null}
        </NaverMapView>
        {isModalVisible && (
          <ShopModal
            onBackdropPress={toggleModal}
            myPage={true}
            shops_info={feedMarkerDetails}
            other_account_id={account_id && account_id}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default MypageMap;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
