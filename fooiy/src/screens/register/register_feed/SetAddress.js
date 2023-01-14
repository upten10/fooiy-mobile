import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import NaverMapView, {Marker} from 'react-native-nmap';
import {globalVariable} from '../../../common/globalVariable';
import {StackHeader} from '../../../common_ui/headers/StackHeader';
import {fooiyColor, fooiyFont} from '../../../common/globalStyles';
import {useNavigation} from '@react-navigation/native';
import Geolocation, {
  getCurrentPosition,
} from 'react-native-geolocation-service';
import axios from 'axios';
import {add, debounce, throttle} from 'lodash';
import {Current_Location} from '../../../../assets/icons/svg';
import {check, PERMISSIONS} from 'react-native-permissions';

const SetAddress = props => {
  const navigation = useNavigation();
  const photo_list = props.route.params.photo_list;
  // console.log(props.route.params.location);
  const [btnActivate, setBtnActivate] = useState(false);
  const mapView = useRef(null);
  const [address, setAddress] = useState({
    area1: '',
    area2: '',
    area3: '',
    area4: '',
    land_name: '',
    land_number1: 0,
    land_number2: 0,
  });
  // const onClickLocationBtn = () => {
  //   mapView.current.setLocationTrackingMode(2);
  // };
  // axios 에 디바운스,,,
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
          const area3 = res.data.results[0].region.area3.name;
          const area4 = res.data.results[0].region.area4.name;
          const land_name = res.data.results[0].land.name;
          const land_number1 = res.data.results[0].land.number1;
          const land_number2 = res.data.results[0].land.number2;
          setAddress({
            area1,
            area2,
            area3,
            area4,
            land_name,
            land_number1,
            land_number2,
          });
        } else {
          setBtnActivate(false);
          setAddress('', '', '', '', '', 0, 0);
        }

        // console.log(res.data.status.code);
      });
  }, 700);
  const onCameraChange = e => {
    console.log(e.longitude, e.latitude);
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
            {address.area1} {address.area2} {address.area3} {address.area4}{' '}
            {address.land_name} {address.land_number1}
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

  return (
    <View style={{height: '100%'}}>
      <StackHeader title="주소 설정" />
      <View>
        <NaverMapView
          ref={mapView}
          showsMyLocationButton={false}
          zoomControl={false}
          onCameraChange={e => onCameraChange(e)}
          center={{
            longitude: props.route.params.location
              ? props.route.params.location.longitude
              : globalVariable.default_longitude,
            latitude: props.route.params.location
              ? props.route.params.location.latitude
              : globalVariable.default_latitude,
            zoom: 17,
          }}
          style={styles.mapview}>
          <View
            style={{
              width: 10,
              height: 10,
              position: 'absolute',
              right: '50%',
              top: '50%',
              borderWidth: 2,
            }}>
            <Current_Location />
          </View>
        </NaverMapView>
      </View>
      <View
        style={{
          width: 56,
          height: 56,
          // borderWidth: 1,
          position: 'absolute',
          right: 0,
          bottom: 258,
          marginRight: 8,
          marginBottom: 8,
        }}>
        <TouchableOpacity onPress={onClickLocationBtn}>
          <Current_Location style={{}} />
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
              address: address,
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
    </View>
  );
};

export default SetAddress;

const styles = StyleSheet.create({
  mapview: {
    width: '100%',
    height: '85%',
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
    // marginLeft: -200,
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
