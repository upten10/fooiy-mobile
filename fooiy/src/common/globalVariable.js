import {Dimensions} from 'react-native';
const window = Dimensions.get('window');

export const globalVariable = {
  FeedLimit: 12,
  MapBottomSheetLimit: 8,
  width: window.width,
  height: window.height,
  tabBarHeight: 66,
  app_version: '1.2.0',
  default_longitude: 127.002736308322,
  default_latitude: 37.5833730477478,
};
