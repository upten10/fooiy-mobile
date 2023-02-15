import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {debounce} from 'lodash';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import NaverMapView from 'react-native-nmap';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Current_Location} from '../../../../assets/icons/svg';
import FooiyToast from '../../../common/FooiyToast';
import {fooiyColor, fooiyFont} from '../../../common/globalStyles';
import {globalVariable} from '../../../common/globalVariable';
import {
  CheckLocationPermission,
  LocationPermission,
} from '../../../common/Permission';
import {StackHeader} from '../../../common_ui/headers/StackHeader';

const SetAddress = props => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const photo_list = props.route.params.photo_list;
  const [btnActivate, setBtnActivate] = useState(false);
  const mapView = useRef(null);
  const [address, setAddress] = useState({
    area1: '',
    area2: '',
    area4: '',
    land_name: '',
    land_number1: 0,
    land_number2: 0,
  });
  const [fullAddress, setFullAddress] = useState('');
  const [location, setLocation] = useState({longitude: 0, latitude: 0});

  const debounceCallback = useCallback((longitude, latitude) => {
    debounceLocation(longitude, latitude);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debounceLocation = debounce(async (longitude, latitude) => {
    await axios
      .get(
        'https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=' +
          `${longitude},${latitude}` +
          '&orders=roadaddr&output=json',
        {
          headers: {
            'X-NCP-APIGW-API-KEY-ID': 'oingm1h0rz',
            'X-NCP-APIGW-API-KEY': 'Iljylcie23BNUM8r9y8WcweI78O6OX2fNYsTjZJt',
          },
        },
      )
      .then(res => {
        if (res.data.status.code === 0) {
          setBtnActivate(true);

          const area1 = res.data.results[0].region.area1.alias;
          const area2 = res.data.results[0].region.area2.name;
          const area4 = res.data.results[0].region.area4.name;
          const land_name = res.data.results[0].land.name;
          const land_number1 = res.data.results[0].land.number1;
          const land_number2 = res.data.results[0].land.number2;
          setAddress({
            area1,
            area2,
            area4,
            land_name,
            land_number1,
            land_number2,
          });
          setFullAddress(
            area1 +
              ' ' +
              area2 +
              ' ' +
              area4 +
              land_name +
              ' ' +
              land_number1 +
              '-' +
              land_number2,
          );
        } else {
          setBtnActivate(false);
          setAddress('', '', '', '', '', 0, 0);
        }
      });
  }, 700);
  const onCameraChange = e => {
    debounceCallback(e.longitude, e.latitude);
  };

  const AddressUI = useCallback(() => {
    if (btnActivate) {
      return (
        <>
          <Text style={styles.address}>
            {address.land_name} {address.land_number1}
            {address.land_number2 && '-'}
            {address.land_number2 && address.land_number2}
          </Text>
          <Text style={{...fooiyFont.Body2}}>
            {address.area1} {address.area2} {address.area4} {address.land_name}{' '}
            {address.land_number1}
            {address.land_number2 && '-'}
            {address.land_number2 && address.land_number2}
          </Text>
        </>
      );
    } else {
      return (
        <>
          <Text style={styles.address}>도로명 주소가 없어요.</Text>
          <Text style={{...fooiyFont.Body2}}>
            정확한 위치로 마커를 이동해주세요!
          </Text>
        </>
      );
    }
  }, [address]);

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

  useEffect(() => {
    const center = async () => {
      (await CheckLocationPermission())
        ? Geolocation.getCurrentPosition(position => {
            const {latitude, longitude} = position.coords;
            setLocation({
              longitude,
              latitude,
            });
          })
        : (setLocation({
            longitude: globalVariable.default_longitude,
            latitude: globalVariable.default_latitude,
          }),
          FooiyToast.message('위치 권한을 허용해주세요!', false, 200));
    };
    center();
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: fooiyColor.W, height: '100%'}}>
      <StackHeader title="주소 설정" />
      <View>
        <NaverMapView
          ref={mapView}
          showsMyLocationButton={false}
          zoomControl={false}
          onCameraChange={e => onCameraChange(e)}
          center={
            props.route.params.address
              ? {
                  longitude: props.route.params.address.longitude,
                  latitude: props.route.params.address.latitude,
                  zoom: 17,
                }
              : {
                  longitude: location.longitude,
                  latitude: location.latitude,
                  zoom: 17,
                }
          }
          style={{
            width: '100%',
            height: globalVariable.height - 56 - insets.top - 258 + 16,
          }}
          scaleBar={false}
          rotateGesturesEnabled={false}
          tiltGesturesEnabled={false}
          logoMargin={Platform.select({
            ios: {
              left: 16,
              bottom: 16 + 24,
            },
            android: {
              left: 16,
              bottom: 16 + 24 + 24,
            },
          })}>
          {btnActivate ? (
            <Image
              source={require('../../../../assets/image/Center_Marker.png')}
              style={{
                width: 34,
                height: 42,
                left: globalVariable.width / 2 - 17,
                top:
                  ((globalVariable.height - insets.bottom - insets.top - 56) *
                    0.85) /
                    2 -
                  42 -
                  21,
              }}
            />
          ) : (
            <Image
              source={require('../../../../assets/image/Center_Marker_Gray.png')}
              style={{
                width: 34,
                height: 42,
                left: globalVariable.width / 2 - 17,
                top:
                  ((globalVariable.height - insets.bottom - insets.top - 56) *
                    0.85) /
                    2 -
                  42 -
                  21,
              }}
            />
          )}
        </NaverMapView>
      </View>
      <View style={styles.current_location}>
        <TouchableOpacity onPress={onClickLocationBtn}>
          <Current_Location />
        </TouchableOpacity>
      </View>
      <View style={styles.bottom_container}>
        <AddressUI />
        <TouchableOpacity
          style={
            btnActivate
              ? styles.confirm_address_btn
              : [styles.confirm_address_btn, styles.changeBtnOff]
          }
          onPress={() =>
            btnActivate &&
            navigation.navigate('FindShop', {
              photo_list: photo_list,
              shop: null,
              menu: null,
              address: fullAddress,
            })
          }>
          <Text
            style={
              btnActivate
                ? styles.confirm_address_text
                : [styles.confirm_address_text, styles.changeBtnTextOff]
            }>
            여기로 주소 설정
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.input_adress_btn}
          onPress={() =>
            navigation.navigate('RegisterFeed', {
              photo_list: photo_list,
              shop: null,
              menu: null,
              address: null,
            })
          }>
          <Text style={styles.input_adress_text}>주소 직접 입력</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SetAddress;

const styles = StyleSheet.create({
  current_location: {
    width: 56,
    height: 56,
    position: 'absolute',
    right: 0,
    bottom: 258,
    marginRight: 8,
    marginBottom: 8,
  },
  bottom_container: {
    position: 'absolute',
    bottom: 0,
    width: globalVariable.width,
    height: 258,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: fooiyColor.W,
    paddingHorizontal: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.16,
    shadowOffset: {width: 0, height: -4},
    shadowRadius: 16,
  },
  address: {
    marginTop: 24,
    ...fooiyFont.Subtitle1,
    marginBottom: 8,
  },
  confirm_address_btn: {
    width: '100%',
    height: 56,
    backgroundColor: fooiyColor.P500,
    marginTop: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeBtnOff: {
    backgroundColor: fooiyColor.G100,
  },
  confirm_address_text: {
    ...fooiyFont.Button,
    color: 'white',
    letterSpacing: 0.5,
  },
  changeBtnTextOff: {
    color: fooiyColor.G300,
  },
  input_adress_btn: {
    width: '100%',
    height: 56,
    backgroundColor: 'white',
    marginTop: 16,
    borderWidth: 1,
    borderColor: fooiyColor.G200,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input_adress_text: {
    ...fooiyFont.Button,
    color: fooiyColor.G600,
    letterSpacing: 0.5,
  },
});
