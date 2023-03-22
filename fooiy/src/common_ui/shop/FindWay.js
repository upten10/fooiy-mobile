import Clipboard from '@react-native-clipboard/clipboard';
import React, {useEffect, useRef, useState} from 'react';
import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Modal from 'react-native-modal';
import NaverMapView, {Marker} from 'react-native-nmap';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {
  Copy,
  Current_Location_2,
  KakaoMap,
  NaverMap,
  Tmap,
} from '../../../assets/icons/svg';
import FooiyToast from '../../common/FooiyToast';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {elapsedText} from '../../common/helpers/elapsedText';
import {LocationPermission} from '../../common/Permission';
import {StackHeader} from '../headers/StackHeader';

const FindWay = props => {
  const shop = props.route.params.shop;
  const mapView = useRef(null);
  const insets = useSafeAreaInsets();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const onClickCopy = () => {
    Toast.show({
      type: 'message',
      text1: '주소가 복사되었습니다.',
    });
    Clipboard.setString(shop.address);
  };
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
  const onClickNaverMap = async () => {
    const destinationURL =
      'nmap://route/car?dlat=' +
      `${shop.latitude}` +
      '&dlng=' +
      `${shop.longitude}` +
      '&dname=' +
      `${shop.name}`;
    await Linking.openURL(destinationURL).catch(e => {
      toggleModal();
      FooiyToast.message('원할한 이용을 위해 어플을 설치해 주세요.');
    });
  };
  const onClickKakaoMap = async () => {
    const destinationURL =
      'kakaomap://route?ep=' + `${shop.latitude},${shop.longitude}` + '&by=CAR';
    await Linking.openURL(destinationURL).catch(e => {
      toggleModal();
      FooiyToast.message('원할한 이용을 위해 어플을 설치해 주세요.');
    });
  };
  const onClickTMap = async () => {
    const destinationURL =
      'tmap://route?goalname=' +
      `${shop.name}` +
      '&goalx=' +
      `${shop.longitude}` +
      '&goaly=' +
      `${shop.latitude}`;
    await Linking.openURL(destinationURL).catch(e => {
      toggleModal();
      FooiyToast.message('원할한 이용을 위해 어플을 설치해 주세요.');
    });
  };

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
            style={styles.map}
            logoMargin={Platform.select({
              ios: {
                left: 16,
                bottom: 88 + 24,
              },
              android: {
                left: 16,
                bottom: 88 + 24,
              },
            })}
            rotateGesturesEnabled={false}
            tiltGesturesEnabled={false}>
            <Marker
              coordinate={{
                longitude: shop.longitude * 1,
                latitude: shop.latitude * 1,
              }}
              width={34}
              height={42}
              image={require('../../../assets/image/Center_Marker.png')}
            />
          </NaverMapView>
        </View>
        <View style={styles.copy_container}>
          <Text style={styles.shop_address}>
            {elapsedText(shop.address, 20)}
          </Text>
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
          onPress={async () =>
            (await LocationPermission()) && setModalVisible(true)
          }>
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
