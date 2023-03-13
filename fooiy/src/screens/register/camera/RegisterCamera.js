import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {Ic_flash_off, Ic_flash_on, Ic_switch} from '../../../../assets/svg';
import {fooiyColor} from '../../../common/globalStyles';
import {globalVariable} from '../../../common/globalVariable';
import {StackHeader} from '../../../common_ui/headers/StackHeader';

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
  };

  if (device == null)
    return <View style={{flex: 1, backgroundColor: fooiyColor.G100}} />;

  return (
    <SafeAreaView
      style={{backgroundColor: fooiyColor.W}}
      edges={Platform.OS === 'ios' ? 'top' : null}>
      <StackHeader title="카메라" />
      <View>
        <Camera
          ref={camera}
          style={{width: globalVariable.width, height: globalVariable.width}}
          device={device}
          isActive={true}
          photo={true}
          enableZoomGesture={true}
        />
        <View
          style={[
            styles.bottom_container,
            {
              height:
                globalVariable.height - 56 - insets.top - globalVariable.width,
            },
          ]}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setPosition(!position)}>
            <Ic_switch />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={takePhoto}
            activeOpacity={0.8}
            style={styles.btn_border}>
            <View style={styles.btn_inside}></View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setFlash(!flash)}>
            {flash ? <Ic_flash_on /> : <Ic_flash_off />}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterCamera;

const styles = StyleSheet.create({
  bottom_container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  btn_border: {
    width: 72,
    height: 72,
    borderWidth: 2,
    borderRadius: 36,
    borderColor: fooiyColor.G600,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_inside: {
    width: 60,
    height: 60,
    backgroundColor: fooiyColor.G600,
    borderRadius: 30,
  },
});
