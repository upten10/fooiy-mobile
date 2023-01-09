import {Dimensions} from 'react-native';
const window = Dimensions.get('window');

export const globalVariable = {
  FeedLimit: 12,
  MapBottomSheetLimit: 8,
  width: window.width,
  height: window.height,
  tabBarHeight: 90,
  app_version: '1.2.0',
};
