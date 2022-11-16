import {Dimensions} from 'react-native';
const window = Dimensions.get('window');

export const globalVariable = {
  FeedLimit: 12,
  width: window.width,
  height: window.height,
};
