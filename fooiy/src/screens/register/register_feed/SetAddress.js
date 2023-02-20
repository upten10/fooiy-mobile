import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {debounce} from 'lodash';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Modal from 'react-native-modal';
import NaverMapView from 'react-native-nmap';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  CafeShop36,
  Cancel,
  CommonShop36,
  Current_Location,
} from '../../../../assets/icons/svg';
import {fooiyColor, fooiyFont} from '../../../common/globalStyles';
import {globalVariable} from '../../../common/globalVariable';
import {
  CheckLocationPermission,
  LocationPermission,
} from '../../../common/Permission';
import {StackHeader} from '../../../common_ui/headers/StackHeader';
import Margin from '../../../common_ui/Margin';

const width = Dimensions.get('window').width;
const SetAddress = props => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const photo_list = props.route.params.photo_list;
  const [btnActivate, setBtnActivate] = useState(false);
  const mapView = useRef(null);
  const [navigateName, setNavigateName] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [address, setAddress] = useState({
    area1: '',
    area2: '',
    area4: '',
    land_name: '',
    land_number1: 0,
    land_number2: 0,
  });
  const [fullAddress, setFullAddress] = useState('');
  const [location, setLocation] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 17,
  });

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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
              (land_number2 && '-' + land_number2),
          );
        } else {
          setBtnActivate(false);
          setAddress('', '', '', '', '', 0, 0);
          setFullAddress('');
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
            {address.area1} {address.area2} {address.area4}
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

  const onClickNextButton = name => {
    if (name === 'FindShop') {
      btnActivate && setNavigateName(name);
      btnActivate && setModalVisible(true);
    } else {
      setNavigateName(name);
      setModalVisible(true);
    }
  };

  useEffect(() => {
    const center = async () => {
      props.route.params.address
        ? setLocation({
            longitude: props.route.params.address.longitude,
            latitude: props.route.params.address.latitude,
            zoom: 17,
          })
        : (await CheckLocationPermission())
        ? onClickLocationBtn()
        : setLocation({
            longitude: globalVariable.default_longitude,
            latitude: globalVariable.default_latitude,
            zoom: 17,
          });
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
          center={location}
          style={{
            width: '100%',
            height: globalVariable.height - 56 - insets.top - 258 + 16,
          }}
          scaleBar={false}
          rotateGesturesEnabled={false}
          tiltGesturesEnabled={false}
          logoMargin={{left: 16, bottom: 16 + 24}}></NaverMapView>
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
          onPress={() => onClickNextButton('FindShop')}>
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
          onPress={() => onClickNextButton('RegisterFeed')}>
          <Text style={styles.input_adress_text}>주소 직접 입력</Text>
        </TouchableOpacity>
      </View>
      {btnActivate ? (
        <Image
          source={require('../../../../assets/image/Center_Marker.png')}
          style={{
            position: 'absolute',
            width: 34,
            height: 42,
            left: globalVariable.width / 2 - 17,
            top:
              insets.top +
              56 +
              (globalVariable.height - 56 - insets.top - 258 + 16) / 2 -
              42,
          }}
        />
      ) : (
        <Image
          source={require('../../../../assets/image/Center_Marker_Gray.png')}
          style={{
            position: 'absolute',
            width: 34,
            height: 42,
            left: globalVariable.width / 2 - 17,
            top:
              insets.top +
              56 +
              (globalVariable.height - 56 - insets.top - 258 + 16) / 2 -
              42,
          }}
        />
      )}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.modal}>
        <View style={styles.modal_container}>
          <View style={styles.modal_header}>
            <TouchableOpacity
              style={styles.cancel_btn}
              onPress={() => setModalVisible(false)}>
              <Cancel />
            </TouchableOpacity>
            <Text style={styles.register_method_text}>방문한 매장 종류</Text>
          </View>
          <View style={styles.select_container}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(navigateName, {
                  photo_list: photo_list,
                  shop: null,
                  menu: null,
                  address: navigateName === 'RegisterFeed' ? null : fullAddress,
                  category: 'common',
                });
                toggleModal();
              }}
              activeOpacity={0.8}
              style={{width: (width - 71) / 2}}>
              <View style={styles.camera}>
                <CommonShop36 />
                <Margin h={8} />
                <Text style={styles.camera_text}>음식점</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(navigateName, {
                  photo_list: photo_list,
                  shop: null,
                  menu: null,
                  address: navigateName === 'RegisterFeed' ? null : fullAddress,
                  category: globalVariable.category_cafe,
                });
                toggleModal();
              }}
              activeOpacity={0.8}
              style={{width: (width - 71) / 2}}>
              <View style={styles.album}>
                <CafeShop36 />
                <Margin h={8} />
                <Text style={styles.album_text}>카페</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
  },
  modal_container: {
    width: '100%',
    borderRadius: 16,
    backgroundColor: fooiyColor.W,
  },
  modal_header: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    paddingBottom: 0,
  },
  cancel_btn: {
    position: 'absolute',
    left: 0,
    margin: 16,
    color: fooiyColor.B,
  },
  register_method_text: {
    color: fooiyColor.B,
    fontFamily: 'Pretendard-SemiBold',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
  },
  select_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 16,
  },
  camera: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: fooiyColor.G200,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 3.5,
    height: (width - 71) / 2,
  },
  camera_icon: {
    width: 36,
    height: 36,
    marginBottom: 8,
  },
  camera_text: {
    color: fooiyColor.G600,
    fontFamily: 'Pretendard-SemiBold',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
  },
  album: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: fooiyColor.G200,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 3.5,
    height: (width - 71) / 2,
  },
  album_icon: {
    width: 36,
    height: 36,
    marginBottom: 8,
  },
  album_text: {
    color: fooiyColor.G600,
    fontFamily: 'Pretendard-SemiBold',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
  },
});
