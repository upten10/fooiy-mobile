import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import CameraPermission from '../../../common/Permission';

import {StackHeader} from '../../../common_ui/headers/StackHeader';

const RegisterCamera = () => {
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
    try {
      if (camera.current == null) throw new Error('Camera Ref is Null');
      const photo = await camera.current.takePhoto(takePhotoOptions);
      // console.log(photo);
      const path = 'file://' + photo.path;
      navigation.navigate('ImageCrop', {
        photo: path,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    CameraPermission();
  }, []);

  if (device == null)
    return <View style={{flex: 1, backgroundColor: '#666'}} />;

  return (
    <View style={styles.container}>
      <StackHeader title="카메라" />
      <Camera
        ref={camera}
        style={{width: width, height: width}}
        device={device}
        isActive={true}
        photo={true}
      />
      <View style={[styles.take_photo_box, {height: height - width - 156}]}>
        <TouchableOpacity onPress={takePhoto}>
          <View style={styles.take_photo} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterCamera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
