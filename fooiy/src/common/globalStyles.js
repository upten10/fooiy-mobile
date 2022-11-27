import {StyleSheet, Platform} from 'react-native';
import {globalVariable} from './globalVariable';

export const globalStyles = StyleSheet.create({
  tab_bar: {
    position: 'absolute',
    height: globalVariable.tabBarHeight,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 0,
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 0.15, // 낮을수록 진해짐
        },
        shadowOpacity: 0.3, // 높을수록 진해짐
        shadowRadius: 5,
      },
      android: {
        elevation: 6,
      },
    }),
  },
});
