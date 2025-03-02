import {Alert, Linking, Platform} from 'react-native';
import {
  check,
  checkMultiple,
  PERMISSIONS,
  request,
  requestLocationAccuracy,
  requestMultiple,
} from 'react-native-permissions';
import {globalVariable} from './globalVariable';

const CameraPermission = async () => {
  return await request(globalVariable.permission_camera)
    .then(res => {
      if (res === 'blocked' || res === 'denied') {
        Alert.alert(
          '서비스 이용 알림',
          '카메라 권한을 허용해야 서비스 정상 이용이 가능합니다. 설정에서 권한을 허용해주세요.',
          [{text: '닫기'}, {text: '설정', onPress: Linking.openSettings}],
        );
        return false;
      } else {
        return true;
      }
    })
    .catch(error => {});
};

const GalleryPermission = async () => {
  return Platform.OS === 'ios'
    ? await request(globalVariable.permission_gallery)
        .then(res => {
          if (res === 'blocked' || res === 'denied') {
            Alert.alert(
              '서비스 이용 알림',
              '사진 권한을 허용해야 서비스 정상 이용이 가능합니다. 설정에서 권한을 허용해주세요.',
              [{text: '닫기'}, {text: '설정', onPress: Linking.openSettings}],
            );
            return false;
          } else {
            return true;
          }
        })
        .catch(error => {})
    : await requestMultiple(globalVariable.permission_gallery)
        .then(res => {
          if (
            res[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] !== 'granted' &&
            res[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] !== 'granted'
          ) {
            Alert.alert(
              '서비스 이용 알림',
              '사진 권한을 허용해야 서비스 정상 이용이 가능합니다. 설정에서 권한을 허용해주세요.',
              [{text: '닫기'}, {text: '설정', onPress: Linking.openSettings}],
            );
            return false;
          } else {
            return true;
          }
        })
        .catch(error => {});
};

const LocationPermission = async () => {
  return Platform.OS === 'ios'
    ? (requestLocationAccuracy({purposeKey: 'full-accuracy'}).catch(
        error => {},
      ),
      await request(globalVariable.permission_location)
        .then(res => {
          if (res === 'blocked' || res === 'denied') {
            Alert.alert(
              '서비스 이용 알림',
              '위치 권한을 허용해야 서비스 정상 이용이 가능합니다. 설정에서 권한을 허용해주세요.',
              [{text: '닫기'}, {text: '설정', onPress: Linking.openSettings}],
            );
            return false;
          } else {
            return true;
          }
        })
        .catch(error => {}))
    : await requestMultiple(globalVariable.permission_location)
        .then(res => {
          if (
            res[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] === 'denied' ||
            res[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === 'denied' ||
            res[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] === 'blocked' ||
            res[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === 'blocked'
          ) {
            Alert.alert(
              '서비스 이용 알림',
              '위치 권한을 허용해야 서비스 정상 이용이 가능합니다. 설정에서 권한을 허용해주세요.',
              [{text: '닫기'}, {text: '설정', onPress: Linking.openSettings}],
            );
            return false;
          } else {
            return true;
          }
        })
        .catch(error => {});
};
const CheckLocationPermission = async () => {
  return Platform.OS === 'ios'
    ? await check(globalVariable.permission_location)
        .then(res => {
          if (res === 'blocked' || res === 'denied') {
            return false;
          } else {
            return true;
          }
        })
        .catch(error => {})
    : await checkMultiple(globalVariable.permission_location)
        .then(res => {
          if (
            res[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] === 'denied' ||
            res[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === 'denied' ||
            res[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] === 'blocked' ||
            res[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === 'blocked'
          ) {
            return false;
          } else {
            return true;
          }
        })
        .catch(error => {});
};

export {CameraPermission};
export {GalleryPermission};
export {LocationPermission};
export {CheckLocationPermission};
