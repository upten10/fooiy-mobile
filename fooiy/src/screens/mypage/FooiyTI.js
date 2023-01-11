import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {fooiyColor, globalStyles} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';
import {StackHeader} from '../../common_ui/headers/StackHeader';

const FooiyTI = props => {
  const userInfoRedux = useSelector(state => state.userInfo.value);
  const resultArr = [
    {
      text: '자극적인/순한',
      left: ['E', userInfoRedux.fooiyti_e_percentage],
      right: ['I', userInfoRedux.fooiyti_i_percentage],
    },
    {
      text: '짠/싱거운',
      left: ['S', userInfoRedux.fooiyti_s_percentage],
      right: ['N', userInfoRedux.fooiyti_n_percentage],
    },
    {
      text: '담백한/느끼한',
      left: ['T', userInfoRedux.fooiyti_t_percentage],
      right: ['F', userInfoRedux.fooiyti_f_percentage],
    },
    {
      text: '초딩/어른',
      left: ['C', userInfoRedux.fooiyti_c_percentage],
      right: ['A', userInfoRedux.fooiyti_a_percentage],
    },
  ];

  const ResultPercentage = param => {
    const {text, left, right} = param;
    return (
      <View style={styles.resultPercentage}>
        <View>
          <Text style={styles.resultPercentageText}>{text}</Text>
        </View>
        <View style={styles.PercentageBarContainer}>
          <View style={styles.PercentageBarFirstRow}>
            <View style={styles.percentageBarTextContainer}>
              <Text
                style={[
                  left[1] > right[1] ? styles.higherText : styles.lowerText,
                  styles.fooiytiText,
                  styles.fooiytiTextLeft,
                ]}>
                {left[0]}
              </Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBarBack,
                  left[1] > right[1]
                    ? progressBarStyles(left[1], right[1]).progressBarLeft
                    : progressBarStyles(left[1], right[1]).progressBarRight,
                ]}
              />
              <View style={styles.progressBarBack} />
            </View>
            <View style={styles.percentageBarTextContainer}>
              <Text
                style={[
                  left[1] < right[1] ? styles.higherText : styles.lowerText,
                  styles.fooiytiText,
                  styles.fooiytiTextRight,
                ]}>
                {right[0]}
              </Text>
            </View>
          </View>
          <View style={styles.percentageBarSecondRow}>
            <Text
              style={[
                left[1] > right[1] ? styles.higherText : styles.lowerText,
                styles.fooiytiPercentText,
              ]}>
              {left[1] + '%'}
            </Text>
            <Text
              style={[
                left[1] < right[1] ? styles.higherText : styles.lowerText,
                styles.fooiytiPercentText,
              ]}>
              {right[1] + '%'}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFF', paddingHorizontal: 16}}>
      <StackHeader title="푸이티아이" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.fooiytiContainer}>
            <Text style={styles.fooiytiNickname}>
              {userInfoRedux.fooiyti_nickname}
            </Text>
            <Text style={styles.fooiyti}>{userInfoRedux.fooiyti}</Text>
          </View>
          <View style={styles.resultPercentageContainer}>
            {resultArr.map((elem, index) => (
              <ResultPercentage
                text={elem.text}
                left={elem.left}
                right={elem.right}
                key={index}
              />
            ))}
          </View>
          <View style={styles.resultImgContainer}>
            <Image
              source={{uri: userInfoRedux.fooiyti_result_image}}
              style={styles.resultImg}
              resizeMode={'contain'}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.reBtnContainer}>
        <TouchableOpacity style={styles.reBtn} activeOpacity={0.8}>
          <Text style={styles.reBtnText}>검사 다시하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FooiyTI;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 16,
  },
  fooiytiContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  fooiytiNickname: {
    fontSize: 14,
    fontWeight: '600',
    color: fooiyColor.G600,
  },
  fooiyti: {
    fontSize: 36,
    fontWeight: '600',
    color: fooiyColor.P500,
  },
  resultPercentageContainer: {
    width: '100%',
    marginBottom: 28,
  },
  resultImgContainer: {
    width: '100%',
    height: (globalVariable.width - 32) / 0.548780487804878,
  },
  resultImg: {
    width: '100%',
    height: '100%',
  },
  percentageBarTextContainer: {},
  resultPercentage: {
    alignItems: 'center',
    marginBottom: 8,
  },
  resultPercentageText: {
    fontWeight: '600',
    fontSize: 14,
    color: fooiyColor.G600,
  },
  PercentageBarContainer: {
    width: '100%',
  },
  PercentageBarFirstRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  percentageBarSecondRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fooiytiText: {
    fontSize: 24,
    fontWeight: '600',
  },
  fooiytiTextLeft: {
    marginRight: 28,
  },
  fooiytiTextRight: {
    marginLeft: 28,
  },
  fooiytiPercentText: {
    fontSize: 14,
    fontWeight: '600',
  },
  higherText: {
    color: fooiyColor.P500,
  },
  lowerText: {
    color: fooiyColor.G200,
  },
  progressBarContainer: {
    flex: 1,
    height: 8,
  },
  progressBarBack: {
    width: '100%',
    height: '100%',
    backgroundColor: fooiyColor.G200,
    borderRadius: 6,
    position: 'absolute',
    zIndex: 1,
  },
  reBtnContainer: {
    width: '100%',
    height: 56,
    marginBottom: 34,
  },
  reBtn: {
    width: '100%',
    height: '100%',
    backgroundColor: fooiyColor.P500,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    ...globalStyles.transparency,
  },
  reBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: fooiyColor.W,
  },
});

const progressBarStyles = (leftPercentage, rightPercentage) =>
  StyleSheet.create({
    progressBarLeft: {
      width: leftPercentage + '%',
      backgroundColor: fooiyColor.P500,
      zIndex: 5,
    },
    progressBarRight: {
      right: 0,
      width: rightPercentage + '%',
      backgroundColor: fooiyColor.P500,
      zIndex: 5,
    },
  });
