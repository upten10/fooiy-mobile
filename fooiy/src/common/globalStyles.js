import {StyleSheet, Platform} from 'react-native';
import {globalVariable} from './globalVariable';

export const fooiyColor = {
  P50: '#FFF5F5',
  P100: '#FFDBDB',
  P200: '#FFC2C2',
  P300: '#FFA8A8',
  P400: '#FF8F8F',
  P500: '#FF5c5c',
  P600: '#FF2929',
  P700: '#DB0000',
  P800: '#A80000',
  P900: '#750000',
  W: '#FFFFFF',
  G50: '#F1F4FF',
  G100: '#E6E8FF',
  G200: '#D7D9F6',
  G300: '#C2C4E1',
  G400: '#9C9FBA',
  G500: '#7A7D97',
  G600: '#54576F',
  G700: '#41445C',
  G800: '#23273D',
  G900: '#00021D',
  B: '#000000',
};

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
  transparency: {
    ...Platform.select({
      ios: {
        shadowColor: fooiyColor.W,
        shadowOffset: {
          width: 0,
          height: -15, // 낮을수록 진해짐
        },
        shadowOpacity: 1, // 높을수록 진해짐
        shadowRadius: 7,
      },
      android: {
        elevation: 10,
      },
    }),
  },
});
