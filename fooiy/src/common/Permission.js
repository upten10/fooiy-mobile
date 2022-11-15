import {Alert, Linking} from 'react-native';
import {
  check,
  PERMISSIONS,
  RESULTS,
  request,
  checkNotifications,
} from 'react-native-permissions';

const CameraPermission = async () => {
  return (
    check(PERMISSIONS.IOS.CAMERA)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
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
      }),
    request(PERMISSIONS.IOS.CAMERA).then(result => {
      console.log(result);
    })
  );
};

export default CameraPermission;
