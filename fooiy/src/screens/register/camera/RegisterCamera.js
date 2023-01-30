import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

import {CameraPermission} from '../../../common/Permission';
import {StackHeader} from '../../../common_ui/headers/StackHeader';
import {check, PERMISSIONS} from 'react-native-permissions';
import {Linking} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {fooiyColor} from '../../../common/globalStyles';
import {globalVariable} from '../../../common/globalVariable';
import {Change, FlashOn, FlashOff} from '../../../../assets/icons/svg';

const RegisterCamera = props => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const camera = useRef(null);
  const devices = useCameraDevices();
  const [position, setPosition] = useState(true);
  const [flash, setFlash] = useState(false);
  const device = position ? devices.back : devices.front;
  const width = Dimensions.get('window').width;

  const takePhotoOptions = {
    qualityPrioritization: 'speed',
    flash: flash ? 'on' : 'off',
    exif: true,
    width: width,
    height: width,
  };

  const takePhoto = async () => {
    const platformPermissions =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA;
    check(platformPermissions).then(async res => {
      if (res === 'blocked' || res === 'denied') {
        Alert.alert(
          '서비스 이용 알림',
          '사진 권한을 허용해야 서비스 정상 이용이 가능합니다. 설정에서 권한을 허용해주세요.',
          [
            {text: '닫기', onPress: navigation.goBack},
            {text: '설정', onPress: Linking.openSettings},
          ],
        );
      } else {
        try {
          if (camera.current == null) throw new Error('Camera Ref is Null');
          const photo = await camera.current.takePhoto(takePhotoOptions);
          const path = 'file://' + photo.path;
          props.route.params
            ? navigation.navigate('ImageCrop', {
                photo: path,
                shop: props.route.params.shop,
              })
            : navigation.navigate('ImageCrop', {
                photo: path,
              });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  useEffect(() => {
    CameraPermission();
  }, []);

  if (device == null)
    return <View style={{flex: 1, backgroundColor: '#666'}} />;

  return (
    <SafeAreaView
      style={{backgroundColor: fooiyColor.W}}
      edges={Platform.OS === 'ios' ? 'top' : null}>
      <StackHeader title="카메라" />
      <View style={{}}>
        <Camera
          ref={camera}
          style={{width: globalVariable.width, height: globalVariable.width}}
          device={device}
          isActive={true}
          photo={true}
          enableZoomGesture={true}
        />
        <View
          style={{
            width: '100%',
            height:
              globalVariable.height - 56 - insets.top - globalVariable.width,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingHorizontal: 16,
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setPosition(!position)}>
            <Change />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={takePhoto}
            activeOpacity={0.8}
            style={{
              width: 72,
              height: 72,
              borderWidth: 2,
              borderRadius: 36,
              borderColor: fooiyColor.G600,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 60,
                height: 60,
                backgroundColor: fooiyColor.G600,
                borderRadius: 30,
              }}></View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setFlash(!flash)}>
            {flash ? <FlashOn /> : <FlashOff />}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterCamera;

const styles = StyleSheet.create({});
