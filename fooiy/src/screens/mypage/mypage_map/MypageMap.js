import React, {useEffect, useRef, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import NaverMapView from 'react-native-nmap';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ApiManagerV2} from '../../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../../common/Enums';
import {fooiyColor, globalStyles} from '../../../common/globalStyles';
import {globalVariable} from '../../../common/globalVariable';
import {LocationPermission} from '../../../common/Permission';
import {StackHeader} from '../../../common_ui/headers/StackHeader';
import Geolocation from 'react-native-geolocation-service';
import {throttle} from 'lodash';
import ShopModal from '../../map/ShopModal';
import MypageMapMarker from './MypageMapMarker';
import AndroidMypageMapMarker from './AndroidMypageMapMarker';

// 다른 유저 페이지에서 접근 시 props에 account_id랑 nickname 들어있음
const MypageMap = props => {
  const mapView = useRef(null);
  const account_id =
    props.route.params !== undefined ? props.route.params.account_id : null;

  const [screenLocation, setScreenLocation] = useState([]);
  const [feedMarkers, setFeedMarkers] = useState([]);
  const [feedMarkerDetails, setFeedMarkerDetails] = useState([]);

  const [clickedIndex, setClickedIndex] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(14);

  useEffect(() => {
    checkGrant();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getFeedMarkerList(screenLocation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenLocation]);

  // 모달 없애기
  const toggleModal = () => {
    setModalVisible(false);
    setClickedIndex(null);
  };

  const throttled = throttle(e => {
    setScreenLocation([e.contentRegion[0], e.contentRegion[2]]);
    setZoomLevel(e.zoom);
  }, 5000);

  const onCameraChange = e => {
    throttled(e);
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
            console.log(error);
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
            console.log(error);
          });
  };

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

  const getFeedMarkerList = async data => {
    await ApiManagerV2.get(apiUrl.FEED_MAP_MARKER, {
      params: {
        type: 'mypage',
        longitude_left_bottom: screenLocation[0].longitude,
        latitude_left_bottom: screenLocation[0].latitude,
        latitude_right_top: screenLocation[1].latitude,
        longitude_right_top: screenLocation[1].longitude,
        ...(account_id && {other_account_id: account_id}),
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
        type: 'mypage',
        latitude: data.latitude,
        longitude: data.longitude,
        ...(account_id && {other_account_id: account_id}),
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
        title={account_id !== null ? props.route.params.nickname : '내 지도'}
      />
      <View>
        <NaverMapView
          ref={mapView}
          style={styles.map}
          //   showsMyLocationButton={true}
          // center={center}
          onMapClick={toggleModal}
          zoomControl={false}
          minZoomLevel={5}
          maxZoomLevel={18}
          rotateGesturesEnabled={false}
          onCameraChange={e => onCameraChange(e)}
          // onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
          // onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}
        >
          {Platform.select({
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
                  style={{...globalStyles.shadow}}
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
                  style={{...globalStyles.shadow}}
                  zoomLevel={zoomLevel}
                />
              );
            }),
          })}
        </NaverMapView>
        {isModalVisible && (
          <ShopModal
            onBackdropPress={toggleModal}
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
    width: globalVariable.width,
    height: globalVariable.height,
  },
});
