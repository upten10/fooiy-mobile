import {Alert, Linking, Platform} from 'react-native';
import {
  check,
  PERMISSIONS,
  RESULTS,
  request,
  checkNotifications,
  checkLocationAccuracy,
  requestLocationAccuracy,
} from 'react-native-permissions';

const CameraPermission = async () => {
  const platformPermissions = Platform.OS === "ios" ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
  return (
    request(platformPermissions)
      .then(result => {
        switch(result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            console.log('The permission has not been requested / is denied but requestable');
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            Alert.alert('blocked', 'go to setting and unblock it', [
              {text: 'no', style: 'cancel'},
              {text: 'ok', onPress: Linking.openSettings},
            ]);
            break;
        }
      })
      .catch(error => {
        console.log('Error!');
      })
  );
};

const GalleryPermission = async () => {
  const platformPermissions = Platform.OS === "ios" ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
  return (
    request(platformPermissions)
      .then(result => {
        switch(result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            console.log('The permission has not been requested / is denied but requestable');
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            Alert.alert('blocked', 'go to setting and unblock it', [
              {text: 'no', style: 'cancel'},
              {text: 'ok', onPress: Linking.openSettings},
            ]);
            break;
        }
      })
      .catch(error => {
        console.log('Error!');
      })
  );
};

const LocationPermission = async () => {
  const platformPermissions = Platform.OS === "ios" ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION;
  return (
    requestLocationAccuracy({purposeKey: 'YOUR-PURPOSE-KEY'})
      .then(accuracy => console.log(`Location accuracy is: ${accuracy}`))
      .catch(() => console.warn('Cannot request location accuracy')),
    request(platformPermissions)
      .then(result => {
        switch(result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            console.log('The permission has not been requested / is denied but requestable');
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            Alert.alert('blocked', 'go to setting and unblock it', [
              {text: 'no', style: 'cancel'},
              {text: 'ok', onPress: Linking.openSettings},
            ]);
            break;
        }
      })
      .catch(error => {
        console.log('Error!');
      })
  );
};

export {CameraPermission};
export {GalleryPermission};
export {LocationPermission};
