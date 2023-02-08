import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import NaverMapView, {Marker} from 'react-native-nmap';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fooiyColor} from '../../common/globalStyles';
import {StackHeader} from '../headers/StackHeader';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  Copy,
  Current_Location_2,
  KakaoMap,
  NaverMap,
  Tmap,
} from '../../../assets/icons/svg';
import {fooiyFont} from '../../common/globalStyles';
import {check, PERMISSIONS} from 'react-native-permissions';
import Clipboard from '@react-native-clipboard/clipboard';

const FindWay = props => {
  const shop = props.route.params.shop;
  const mapView = useRef(null);
  const insets = useSafeAreaInsets();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const onClickCopy = () => {
    Clipboard.setString(shop.shop_address);
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
      `${shop.shop_latitude}` +
      '&dlng=' +
      `${shop.shop_longitude}` +
      '&dname=' +
      `${shop.shop_name}`;
    await Linking.openURL(destinationURL);
  };
  const onClickKakaoMap = async () => {
    destinationURL =
      'kakaomap://route?ep=' +
      `${shop.shop_latitude},${shop.shop_longitude}` +
      '&by=CAR';
    await Linking.openURL(destinationURL);
  };
  const onClickTMap = async () => {
    destinationURL =
      'tmap://route?goalname=' +
      `${shop.shop_name}` +
      '&goalx=' +
      `${shop.shop_longitude}` +
      '&goaly=' +
      `${shop.shop_latitude}`;
    await Linking.openURL(destinationURL);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StackHeader title={shop.shop_name} />
      <View>
        <View>
          <NaverMapView
            ref={mapView}
            showsMyLocationButton={false}
            zoomControl={false}
            center={{
              longitude: shop.shop_longitude * 1,
              latitude: shop.shop_latitude * 1,
              zoom: 17,
            }}
            style={styles.map}>
            <Marker
              coordinate={{
                longitude: shop.shop_longitude * 1,
                latitude: shop.shop_latitude * 1,
              }}
              width={34}
              height={44}
              image={require('../../../assets/image/Current_Position.png')}
            />
          </NaverMapView>
        </View>
        <View style={styles.copy_container}>
          <Text style={styles.shop_address}>{shop.shop_address}</Text>
          <TouchableOpacity
            style={styles.copy_btn}
            onPress={onClickCopy}
            activeOpacity={0.8}>
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
            style={{
              justifyContent: 'flex-end',
              margin: 0,
            }}>
            <View style={styles.item}>
              <TouchableOpacity
                onPress={onClickNaverMap}
                style={{alignItems: 'center'}}
                activeOpacity={0.8}>
                <NaverMap />
                <Text style={styles.item_text}>네이버 지도</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onClickKakaoMap}
                style={{marginLeft: 48, marginRight: 48, alignItems: 'center'}}
                activeOpacity={0.8}>
                <KakaoMap />
                <Text style={styles.item_text}>카카오맵</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onClickTMap}
                style={{alignItems: 'center'}}
                activeOpacity={0.8}>
                <Tmap />
                <Text style={styles.item_text}>티맵</Text>
              </TouchableOpacity>
            </View>
            {Platform.OS === 'ios' ? (
              <View
                style={{height: insets.bottom, backgroundColor: fooiyColor.W}}
              />
            ) : null}
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
  item: {
    height: 130,
    backgroundColor: fooiyColor.W,
    flexDirection: 'row',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item_text: {
    marginTop: 8,
    ...fooiyFont.Caption1,
    color: fooiyColor.G500,
  },
});
