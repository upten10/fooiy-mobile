import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import NaverMapView, {Marker} from 'react-native-nmap';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ApiMangerV1} from '../../../common/api/v1/ApiMangerV1';
import {apiUrl} from '../../../common/Enums';
import {fooiyColor, globalStyles} from '../../../common/globalStyles';
import {globalVariable} from '../../../common/globalVariable';
import {LocationPermission} from '../../../common/Permission';
import {StackHeader} from '../../../common_ui/headers/StackHeader';
import Geolocation from 'react-native-geolocation-service';
import {throttle} from 'lodash';
import ShopModal from '../../map/ShopModal';
import MypageMapMarker from './MypageMapMarker';

const MypageMap = () => {
  const mapView = useRef(null);

  console.log(feedMarkerDetails);

  const [screenLocation, setScreenLocation] = useState([]);
  const [feedMarkers, setFeedMarkers] = useState([]);
  const [feedMarkerDetails, setFeedMarkerDetails] = useState([]);

  const [clickedIndex, setClickedIndex] = useState(null);
  const [clickedShop, setClickedShop] = useState([]);
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
    setClickedShop(null);
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
    await ApiMangerV1.get(apiUrl.FEED_MAP_MARKER, {
      params: {
        type: 'mypage',
        longitude_left_bottom: screenLocation[0].longitude,
        latitude_left_bottom: screenLocation[0].latitude,
        latitude_right_top: screenLocation[1].latitude,
        longitude_right_top: screenLocation[1].longitude,
      },
    })
      .then(res => {
        setFeedMarkers(res.data.payload.feed_list);
      })
      .catch(e => console.log(e));
  };

  const getFeedMarkerDetail = async data => {
    await ApiMangerV1.get(apiUrl.FEED_MAP_DETAIL, {
      params: {
        type: 'mypage',
        latitude: data.latitude,
        longitude: data.longitude,
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
      edges={Platform.OS === 'ios' && 'top'}>
      <StackHeader title={'내 지도'} />
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
          {feedMarkers.map((item, index) => {
            return (
              <MypageMapMarker
                key={index}
                item={item}
                index={index}
                toggleModal={toggleModal}
                setClickedIndex={setClickedIndex}
                setModalVisible={setModalVisible}
                getFeedMarkerDetail={getFeedMarkerDetail}
                clickedIndex={clickedIndex}
                style={{...globalStyles.shadow}}
                zoomLevel={zoomLevel}
              />
            );
          })}
        </NaverMapView>
        {isModalVisible && (
          <ShopModal
            onBackdropPress={toggleModal}
            shops_info={feedMarkerDetails}
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