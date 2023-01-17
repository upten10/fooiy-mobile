import React, {useRef, useEffect} from 'react';
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
import {SafeAreaView} from 'react-native-safe-area-context';

const RegisterCamera = props => {
  const navigation = useNavigation();
  const camera = useRef(null);
  const devices = useCameraDevices();
  const device = devices.back;
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const takePhotoOptions = {
    qualityPrioritization: 'speed',
    flash: 'off',
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
          navigation.navigate('ImageCrop', {
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
    <SafeAreaView style={styles.container}>
      <StackHeader title="카메라" />
      <Camera
        ref={camera}
        style={{width: width, height: width}}
        device={device}
        isActive={true}
        photo={true}
        enableZoomGesture={true}
      />
      <View style={[styles.take_photo_box, {height: height - width - 156}]}>
        <TouchableOpacity onPress={takePhoto} activeOpacity={0.8}>
          <View style={styles.take_photo} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RegisterCamera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  take_photo_box: {
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  take_photo: {
    width: 50,
    height: 50,
    backgroundColor: '#777',
  },
});
