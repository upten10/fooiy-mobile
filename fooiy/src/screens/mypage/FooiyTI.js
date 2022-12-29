import React, {useEffect} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fooiyColor, globalStyles} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';
import {StackHeader} from '../../common_ui/headers/StackHeader';

const FooiyTI = param => {
  const accountInfo = param.route.params.info;

  const resultArr = [
    {
      text: '자극적인/순한',
      left: ['E', accountInfo.fooiyti_e_percentage],
      right: ['I', accountInfo.fooiyti_i_percentage],
    },
    {
      text: '짠/싱거운',
      left: ['S', accountInfo.fooiyti_s_percentage],
      right: ['N', accountInfo.fooiyti_n_percentage],
    },
    {
      text: '담백한/느끼한',
      left: ['T', accountInfo.fooiyti_t_percentage],
      right: ['F', accountInfo.fooiyti_f_percentage],
    },
    {
      text: '초딩/어른',
      left: ['C', accountInfo.fooiyti_c_percentage],
      right: ['A', accountInfo.fooiyti_a_percentage],
    },
  ];

  const ResultPercentage = param => {
    const {text, left, right} = param;
    console.log(text, left, right);
    return (
      <View style={styles.resultPercentage}>
        <View>
          <Text style={styles.resultPercentageText}>{text}</Text>
        </View>
        <View style={styles.PercentageBarContainer}>
          <View style={styles.percentageBarTextContainer}>
            <Text
              style={left[1] > right[1] ? styles.higherText : styles.lowerText}>
              {left[0]}
            </Text>
            <Text>{left[1] + '%'}</Text>
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
              style={left[1] < right[1] ? styles.higherText : styles.lowerText}>
              {right[0]}
            </Text>
            <Text>{right[1] + '%'}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <StackHeader title="푸이티아이" />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.fooiytiContainer}>
            <Text style={styles.fooiytiNickname}>
              {accountInfo.fooiyti_nickname}
            </Text>
            <Text style={styles.fooiyti}>{accountInfo.fooiyti}</Text>
          </View>
          <View style={styles.resultPercentageContainer}>
            {resultArr.map(elem => (
              <ResultPercentage
                text={elem.text}
                left={elem.left}
                right={elem.right}
              />
            ))}
          </View>
          <View style={styles.resultImgContainer}>
            <Image
              source={{uri: accountInfo.fooiyti_result_image}}
              style={styles.resultImg}
            />
          </View>
        </View>
        <View style={{height: globalVariable.tabBarHeight}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FooiyTI;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    flex: 1,
    alignItems: 'center',
  },
  fooiytiContainer: {
    flex: 1,
    alignItems: 'center',
  },
  fooiytiNickname: {
    fontSize: 20,
    fontWeight: '500',
  },
  fooiyti: {
    fontSize: 36,
    fontWeight: '700',
    color: fooiyColor.P500,
    padding: 10,
  },
  resultPercentageContainer: {
    width: globalVariable.width,
    marginVertical: 15,
  },
  resultImgContainer: {
    width: globalVariable.width * 0.9,
    height: globalVariable.height * 0.8,
  },
  percentageBarTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultPercentage: {
    alignItems: 'center',
  },
  resultPercentageText: {
    fontWeight: '500',
  },
  PercentageBarContainer: {
    width: globalVariable.width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  higherText: {
    color: fooiyColor.P500,
    fontSize: 24,
    fontWeight: '600',
  },
  lowerText: {
    color: fooiyColor.G200,
    fontSize: 24,
    fontWeight: '600',
  },
  progressBarContainer: {
    width: globalVariable.width * 0.75,
    height: 10,
  },
  progressBarBack: {
    width: '100%',
    height: '100%',
    backgroundColor: fooiyColor.G200,
    borderRadius: 6,
    position: 'absolute',
    zIndex: 1,
  },
  resultImg: {width: '100%', height: '100%'},
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
