import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {SafeAreaView} from 'react-native-safe-area-context';

const RegisterCamera = () => {
  const camera = useRef(null);
  const devices = useCameraDevices();
  const device = devices.back;

  const takePhotoOptions = {
    qualityPrioritization: 'speed',
    flash: 'off',
    exif: true,
  };

  const takePhoto = async () => {
    try {
      if (camera.current == null) throw new Error('Camera Ref is Null');
      const photo = await camera.current.takePhoto(takePhotoOptions);
      console.warn(photo);
    } catch (error) {
      console.log(error);
    }
  };

  const checkCameraPermission = async () => {
    let status = await Camera.getCameraPermissionStatus();
    if (status !== 'authorized') {
      await Camera.requestCameraPermission();
      status = await Camera.getCameraPermissionStatus();
      if (status === 'denied') {
        // showToast(
        //   'You will not be able to scan if you do not allow camera access',
        // );
      }
    }
  };

  useEffect(() => {
    checkCameraPermission();
  }, []);
  if (device == null)
    return <View style={{flex: 1, backgroundColor: '#666'}} />;

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />
      <View style={styles.padding} />
      <View style={styles.take_photo_box}>
        <TouchableOpacity onPress={takePhoto}>
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
  },
  padding: {
    width: '100%',
    height: '50%',
  },
  take_photo_box: {
    width: '100%',
    height: '50%',
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
