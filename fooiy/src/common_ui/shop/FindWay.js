import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Linking} from 'react-native';
import Modal from 'react-native-modal';
import NaverMapView, {Marker} from 'react-native-nmap';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fooiyColor} from '../../common/globalStyles';
import {StackHeader} from '../headers/StackHeader';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Copy, Current_Location_2} from '../../../assets/icons/svg';
import {fooiyFont} from '../../common/globalStyles';
import {check, PERMISSIONS} from 'react-native-permissions';
import Clipboard from '@react-native-clipboard/clipboard';
import {ApiManagerV2} from '../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../common/Enums';
import FooiyToast from '../../common/FooiyToast';

const FindWay = props => {
  const shop = props.route.params.shop;
  const mapView = useRef(null);
  const insets = useSafeAreaInsets();
  const [isModalVisible, setModalVisible] = useState(false);
  const [markerImage, setMarkerImage] = useState();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const onClickCopy = () => {
    FooiyToast.message('주소가 복사되었습니다.', true);
    Clipboard.setString(shop.address);
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
  const onClickNaverMap = async () => {
    destinationURL =
      'nmap://route/car?dlat=' +
      `${shop.latitude}` +
      '&dlng=' +
      `${shop.longitude}` +
      '&dname=' +
      `${shop.shop_name}`;
    await Linking.openURL(destinationURL);
  };
  const onClickKakaoMap = async () => {
    destinationURL =
      'kakaomap://route?ep=' + `${shop.latitude},${shop.longitude}` + '&by=CAR';
    await Linking.openURL(destinationURL);
  };
  const onClickTMap = async () => {
    destinationURL =
      'tmap://route?goalname=' +
      `${shop.shop_name}` +
      '&goalx=' +
      `${shop.longitude}` +
      '&goaly=' +
      `${shop.latitude}`;
    await Linking.openURL(destinationURL);
  };
  const getMarkerImage = async () => {
    await ApiManagerV2.get(apiUrl.SHOP_LIST, {
      params: {
        shop_id: props.route.params.shop.shop_id,
      },
    }).then(res =>
      setMarkerImage(res.data.payload.feed_list.results[0].image[0]),
    );
  };

  useEffect(() => {
    getMarkerImage();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StackHeader title={shop.name} />
      <View>
        <View>
          <NaverMapView
            ref={mapView}
            showsMyLocationButton={false}
            zoomControl={false}
            center={{
              longitude: shop.longitude * 1,
              latitude: shop.latitude * 1,
              zoom: 17,
            }}
            style={styles.map}>
            <Marker
              coordinate={{
                longitude: shop.longitude * 1,
                latitude: shop.latitude * 1,
              }}
              image={{uri: markerImage}}
              style={styles.marker_image}
              onClick={() => onClickMarker(item, index)}
            />
            <Marker
              coordinate={{
                longitude: shop.longitude * 1,
                latitude: shop.latitude * 1,
              }}
              image={require('../../../assets/icons/marker/mypage_marker_clicked.png')}
              style={styles.marker_border}
              anchor={{x: 0.5, y: 0.838}}
            />
          </NaverMapView>
        </View>
        <View style={styles.copy_container}>
          <Text style={styles.shop_address}>{shop.address}</Text>
          <TouchableOpacity style={styles.copy_btn} onPress={onClickCopy}>
            <Text style={styles.copy_text}>주소 복사</Text>
            <Copy style={styles.copy_icon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.bottom_container, {height: insets.bottom + 88}]}>
        <TouchableOpacity
          style={styles.current_location_container}
          activeOpacity={0.8}
          onPress={onClickLocationBtn}>
          <Current_Location_2 style={styles.current_location_icon} />
          <Text style={styles.current_location_text}>현위치</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.find_way_container}
          activeOpacity={0.8}
          onPress={() => setModalVisible(true)}>
          <Modal
            isVisible={isModalVisible}
            onBackdropPress={toggleModal}
            style={{backgroundColor: fooiyColor.P100}}>
            <View>
              <TouchableOpacity onPress={onClickNaverMap}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: fooiyColor.G100,
                  }}></View>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClickKakaoMap}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: fooiyColor.G300,
                  }}></View>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClickTMap}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: fooiyColor.G500,
                  }}></View>
              </TouchableOpacity>
            </View>
          </Modal>
          <Text style={styles.find_way_text}>길찾기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FindWay;

const styles = StyleSheet.create({
  container: {
    backgroundColor: fooiyColor.W,
    flex: 1,
  },
  map: {
    width: '100%',
    height: '98%',
  },
  marker_image: {
    width: 38.4,
    height: 38.4,
  },
  marker_border: {
    width: 44.8,
    height: 49.6,
  },
  copy_container: {
    width: '100%',
    height: 48,
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255,0.8)',
  },
  shop_address: {
    ...fooiyFont.Body2,
    color: fooiyColor.G600,
    marginLeft: 16,
  },
  copy_btn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  copy_text: {
    ...fooiyFont.Subtitle3,
    color: fooiyColor.G600,
    marginRight: 8,
  },
  copy_icon: {
    marginRight: 16,
  },
  bottom_container: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    backgroundColor: fooiyColor.W,
    flexDirection: 'row',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.16,
    shadowOffset: {width: 0, height: -4},
    shadowRadius: 16,
  },
  current_location_container: {
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    width: 56,
    height: 56,
  },
  current_location_icon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  current_location_text: {
    ...fooiyFont.Caption1,
    lineHeight: 18,
    color: fooiyColor.P500,
    textAlign: 'center',
  },
  find_way_container: {
    margin: 16,
    marginLeft: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: fooiyColor.P500,
    height: 56,
    flex: 1,
    borderRadius: 8,
  },
  find_way_text: {
    ...fooiyFont.Button,
    letterSpacing: 0.5,
    color: fooiyColor.W,
    textAlign: 'center',
  },
});
