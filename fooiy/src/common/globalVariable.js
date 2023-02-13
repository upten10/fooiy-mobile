import {Dimensions, Platform} from 'react-native';
import {PERMISSIONS} from 'react-native-permissions';
const window = Dimensions.get('window');

export const globalVariable = {
  FeedLimit: 12,
  Limit20: 20,
  MapBottomSheetLimit: 8,
  width: window.width,
  height: window.height,
  tabBarHeight: 66,
  app_version: '1.2.0',
  default_longitude: 127.002736308322,
  default_latitude: 37.5833730477478,
  category_cafe: 'BAKERY/CAFE',
  permission_camera: Platform.select({
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA,
  }),
  permission_gallery: Platform.select({
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    android: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
  }),
  permission_location: Platform.select({
    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    android: [
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ],
  }),
};
