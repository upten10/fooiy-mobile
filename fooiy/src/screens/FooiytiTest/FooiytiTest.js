import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Fooiyticheck, FooiytiUncheck} from '../../../assets/icons/svg';
import {ApiManagerV2} from '../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../common/Enums';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {StackHeader} from '../../common_ui/headers/StackHeader';

export default props => {
  const navigation = useNavigation();
  const [questionList, setQuestionList] = useState([
    {
      question: '음식으로 스트레스를 해소한다면 어떻게 하시나요?',
      is_multi_answer: false,
      answers: [
        '매운 음식',
        '단 음식',
        '그냥 많이 먹음',
        '먹는 걸로 풀지 않음',
      ],
    },
  ]);
  const [curIndex, setCurIndex] = useState(0);
  const [curCheckedIndex, setCurCheckedIndex] = useState([]);
  const [testResult, setTestResult] = useState([]);

  console.log(testResult);

  useEffect(() => {
    getQuestionList();
  }, []);

  const getQuestionList = async () => {
    await ApiManagerV2.get(apiUrl.FOOIYTI_QUESTION_LIST, {}).then(res =>
      setQuestionList(res.data.payload.fooiyti_questions),
    );
  };

  const CheckBox = props => {
    const {item, index} = props;

    const onPressCheckBox = () => {
      if (questionList[curIndex].is_multi_answer) {
        if (curCheckedIndex.findIndex(elem => elem === index) !== -1) {
          setCurCheckedIndex(curCheckedIndex.filter(elem => elem !== index));
        } else {
          setCurCheckedIndex([...curCheckedIndex, index]);
        }
      } else {
        setCurCheckedIndex([index]);
      }
    };

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPressCheckBox}
        style={
          curCheckedIndex.findIndex(elem => elem === index) !== -1
            ? [styles.checkBoxContainer, styles.checkBoxCheckedContainer]
            : styles.checkBoxContainer
        }>
        <Text
          style={
            curCheckedIndex.findIndex(elem => elem === index) !== -1
              ? [styles.checkBoxText, styles.checkBoxCheckedText]
              : styles.checkBoxText
          }>
          {item}
        </Text>
        {curCheckedIndex.findIndex(elem => elem === index) !== -1 ? (
          <Fooiyticheck />
        ) : (
          <FooiytiUncheck />
        )}
      </TouchableOpacity>
    );
  };

  const onPressNext = () => {
    if (curCheckedIndex.length > 0) {
      if (curIndex !== questionList.length - 1) {
        let arr = testResult;
        arr[curIndex] = curCheckedIndex;
        setTestResult(arr);
        setCurCheckedIndex(testResult[curIndex + 1] ?? []);
        setCurIndex(curIndex + 1);
      } else if (curIndex === questionList.length - 1) {
        testResult[curIndex] || setTestResult([...testResult, curCheckedIndex]);
        navigation.navigate('FooiytiTestResultLoading', {testResult});
      }
    }
  };

  const onPressBack = () => {
    if (curIndex === 0) {
      navigation.navigate('InformationInput');
    } else {
      let arr = testResult;
      arr[curIndex] = curCheckedIndex;
      setTestResult(arr);
      setCurCheckedIndex(testResult[curIndex - 1]);
      setCurIndex(curIndex - 1);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: fooiyColor.W}}>
      <StackHeader title={'푸이티아이 검사'} />
      <View style={{flex: 1, paddingHorizontal: 16, marginTop: 16}}>
        {/* info */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 16,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
            <Text style={{...fooiyFont.H1, marginRight: 8}}>
              Q{curIndex + 1}
            </Text>
            <Text style={{...fooiyFont.Subtitle1, color: fooiyColor.G200}}>
              /11
            </Text>
          </View>
          {questionList[curIndex].is_multi_answer ? (
            <Text style={{...fooiyFont.Subtitle3, color: fooiyColor.P500}}>
              *중복 선택 가능
            </Text>
          ) : null}
        </View>
        {/* question */}
        <View style={{height: 72, marginBottom: 48}}>
          <Text style={{...fooiyFont.Body1, color: fooiyColor.G800}}>
            {questionList[curIndex].question}
          </Text>
        </View>
        {/* checkbox */}
        <View>
          {questionList[curIndex].answers.map((item, index) => {
            return <CheckBox item={item} index={index} key={index} />;
          })}
        </View>
        {/* control */}
        <View
          style={{
            position: 'absolute',
            bottom: Platform.select({
              ios: 0,
              android: 16,
            }),
            left: 16,
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={onPressBack}
            activeOpacity={0.8}
            style={[styles.btnContainer, {marginRight: 7}]}>
            <Text style={styles.btnText}>이전</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressNext}
            activeOpacity={0.8}
            style={
              curCheckedIndex.length > 0
                ? [
                    styles.btnContainer,
                    {borderWidth: 0, backgroundColor: fooiyColor.P500},
                  ]
                : [styles.btnContainer, {borderColor: fooiyColor.P500}]
            }>
            <Text
              style={
                curCheckedIndex.length > 0
                  ? [styles.btnText, {borderWidth: 0, color: fooiyColor.W}]
                  : [styles.btnText, {color: fooiyColor.P500}]
              }>
              다음
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  checkBoxContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 56,
    borderWidth: 1,
    borderColor: fooiyColor.G200,
    borderRadius: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  checkBoxText: {
    ...fooiyFont.Button,
    color: fooiyColor.G300,
    lineHeight: Platform.select({
      ios: 0,
      android: null,
    }),
  },
  checkBoxCheckedContainer: {
    borderColor: fooiyColor.P500,
  },
  checkBoxCheckedText: {
    color: fooiyColor.P500,
  },
  btnText: {
    ...fooiyFont.Button,
    color: fooiyColor.G600,
    lineHeight: Platform.select({
      ios: 0,
      android: null,
    }),
  },
  btnContainer: {
    borderWidth: 1,
    borderColor: fooiyColor.G200,
    borderRadius: 8,
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
