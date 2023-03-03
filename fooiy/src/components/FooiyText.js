import React from 'react';
import {Platform, StyleSheet, Text} from 'react-native';
import {fooiyColor} from '../common/globalStyles';

export default props => {
  const {children, font} = props;
  return <Text style={styles[font]}>{children}</Text>;
};

const styles = StyleSheet.create({
  H1: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 36,
    fontWeight: '600',
    color: fooiyColor.B,
    lineHeight: 44,
  },
  H2: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 28,
    fontWeight: '600',
    color: fooiyColor.B,
    lineHeight: 36,
  },
  H3: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 24,
    fontWeight: '600',
    color: fooiyColor.B,
    lineHeight: 32,
  },
  H4: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 20,
    fontWeight: '600',
    color: fooiyColor.B,
    lineHeight: 28,
  },
  Subtitle1: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 18,
    fontWeight: '600',
    color: fooiyColor.B,
    lineHeight: 24,
  },
  Subtitle2: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    fontWeight: '600',
    color: fooiyColor.B,
    lineHeight: 24,
  },
  Subtitle3: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 14,
    fontWeight: '600',
    color: fooiyColor.B,
    lineHeight: 20,
  },
  Subtitle4: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 12,
    fontWeight: '600',
    color: fooiyColor.B,
    lineHeight: 18,
  },
  Body1: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 16,
    fontWeight: '400',
    color: fooiyColor.B,
    lineHeight: 24,
  },
  Body2: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    fontWeight: '400',
    color: fooiyColor.B,
    lineHeight: 24,
  },
  Caption1: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    fontWeight: '400',
    color: fooiyColor.B,
    lineHeight: 18,
  },
  Caption1_1: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 12,
    fontWeight: '600',
    color: fooiyColor.B,
    lineHeight: 16,
  },
  Caption2: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 10,
    fontWeight: '600',
    color: fooiyColor.B,
    lineHeight: 12,
  },
  Button: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    fontWeight: '600',
    color: fooiyColor.B,
    lineHeight: Platform.select({
      ios: 0,
      android: 16,
    }),
  },
});
