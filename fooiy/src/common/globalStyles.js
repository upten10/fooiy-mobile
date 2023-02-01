import {StyleSheet, Platform} from 'react-native';

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

export const fooiyFont = StyleSheet.create({
  H1: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 36,
    fontWeight: '600',
    color: fooiyColor.B,
    lineHeight: Platform.select({ios: 0, android: 44}),
  },
  H2: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 28,
    fontWeight: '600',
    color: fooiyColor.B,
    lineHeight: Platform.select({ios: 0, android: 36}),
  },
  H3: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 24,
    fontWeight: '600',
    color: fooiyColor.B,
    lineHeight: Platform.select({ios: 0, android: 32}),
  },
  H4: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 20,
    fontWeight: '600',
    color: fooiyColor.B,
    lineHeight: Platform.select({ios: 0, android: 28}),
  },
  Subtitle1: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 18,
    fontWeight: '600',
    color: fooiyColor.B,
    lineHeight: Platform.select({ios: 0, android: 24}),
  },
  Subtitle2: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    fontWeight: '600',
    color: fooiyColor.B,
    lineHeight: Platform.select({ios: 0, android: 24}),
  },
  Subtitle3: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 14,
    fontWeight: '600',
    color: fooiyColor.B,
    lineHeight: Platform.select({ios: 0, android: 20}),
  },
  Subtitle4: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 12,
    fontWeight: '600',
    color: fooiyColor.B,
    lineHeight: Platform.select({ios: 0, android: 18}),
  },
  Body1: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 16,
    fontWeight: '400',
    color: fooiyColor.B,
    lineHeight: Platform.select({ios: 0, android: 24}),
  },
  Body2: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    fontWeight: '400',
    color: fooiyColor.B,
    lineHeight: Platform.select({ios: 0, android: 24}),
  },
  Caption1: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    fontWeight: '400',
    color: fooiyColor.B,
    lineHeight: Platform.select({ios: 0, android: 18}),
  },
  Caption1_1: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    fontWeight: '600',
    color: fooiyColor.B,
    lineHeight: Platform.select({ios: 0, android: 16}),
  },
  Caption2: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 10,
    fontWeight: '600',
    color: fooiyColor.B,
    lineHeight: Platform.select({ios: 0, android: 12}),
  },
  Button: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    fontWeight: '600',
    color: fooiyColor.B,
    lineHeight: Platform.select({ios: 0, android: 16}),
  },
});

export const globalStyles = StyleSheet.create({
  tab_bar: {
    position: 'absolute',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 0,
    paddingHorizontal: 8,
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
        elevation: 20,
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
