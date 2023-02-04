import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {StackHeader} from '../../../common_ui/headers/StackHeader';
import {Check, Uncheck} from '../../../../assets/icons/svg/index';
import {fooiyColor, fooiyFont} from '../../../common/globalStyles';
import {globalVariable} from '../../../common/globalVariable';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

const Withdraw = props => {
  const checkBoxData = [
    '사용을 잘 안해요',
    '가고싶은 음식점이 없어요',
    '사용법이 너무 어려워요',
    '기타',
  ];

  const textInput = useRef(null);

  const [clickedIndex, setClickedIndex] = useState(-1);
  const [inputValue, setInputValue] = useState('');
  const [btnActivate, setBtnActivate] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  useEffect(() => {
    if (clickedIndex === 3) {
      inputValue.length >= 10 ? setBtnActivate(true) : setBtnActivate(false);
    } else if (clickedIndex !== -1 && clickedIndex !== 3) {
      setInputValue('');
      setBtnActivate(true);
      // Keyboard.dismiss();
    } else {
      setBtnActivate(false);
    }
  }, [inputValue, clickedIndex]);

  const onPressCheckBox = index => {
    setClickedIndex(index);
  };

  const onPressBtn = () => {
    if (clickedIndex === 3) {
      navigation.navigate('WithdrawConfirm', {
        reason: inputValue,
        userInfo: props.route.params,
      });
    } else {
      navigation.navigate('WithdrawConfirm', {
        reason: checkBoxData[clickedIndex],
        userInfo: props.route.params,
      });
    }
  };

  const CheckBox = props => {
    const {index, item} = props;
    return (
      <TouchableOpacity
        style={
          clickedIndex === index
            ? [styles.checkBox, styles.checkedCheckBox]
            : styles.checkBox
        }
        activeOpacity={0.8}
        onPress={() => onPressCheckBox(index)}>
        <Text
          style={
            clickedIndex === index
              ? [styles.checkBoxText, styles.checkedCheckBoxText]
              : styles.checkBoxText
          }>
          {item}
        </Text>
        {clickedIndex === index ? <Check /> : <Uncheck />}
      </TouchableOpacity>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={{backgroundColor: fooiyColor.W, flex: 1}}
        edges={Platform.select({
          ios: 'bottom',
          android: null,
        })}>
        <View
          style={{zIndex: 1, backgroundColor: fooiyColor.W, height: insets.top}}
        />
        <View style={{zIndex: 1}}>
          <StackHeader title="회원 탈퇴" />
        </View>
        <KeyboardAvoidingView
          style={{flex: 1}}
          keyboardVerticalOffset={Platform.select({
            ios: null,
            android: 30,
          })}
          behavior={Platform.select({
            ios: 'position',
            android: 'position',
          })}>
          {/* Body */}
          <View style={BodyStyles(insets.top, insets.bottom).bodyContainer}>
            {/* Title */}
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>푸이를{'\n'}탈퇴하시나요?</Text>
            </View>
            {/* SubTitle */}
            <View style={styles.subTitleContainer}>
              <Text style={styles.subtitleText}>
                탈퇴하시는 이유를 알려주세요.
              </Text>
            </View>
            {/* checkbox */}
            <View>
              {checkBoxData.map((item, index) => {
                return <CheckBox key={index} item={item} index={index} />;
              })}

              <View
                style={
                  clickedIndex === 3
                    ? styles.yesGuitarContainer
                    : styles.noGuitarContainer
                }>
                <View style={styles.textInputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="아쉬운 점에 대해 말씀해주세요. (최소 10자 이상)"
                    multiline
                    autoCapitalize={false}
                    autoCorrect={false}
                    spellCheck={false}
                    textAlignVertical="top"
                    onChangeText={setInputValue}
                    maxLength={300}
                    value={inputValue}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  />
                </View>
                <Text style={styles.textInputLength}>
                  ({inputValue.length}/300)
                </Text>
              </View>
            </View>
            {/* Btn */}
            <TouchableOpacity
              style={
                btnActivate
                  ? styles.changeBtn
                  : [styles.changeBtn, styles.changeBtnOff]
              }
              activeOpacity={0.8}
              onPress={btnActivate ? onPressBtn : null}>
              <Text
                style={
                  btnActivate
                    ? styles.changeBtnText
                    : [styles.changeBtnText, styles.changeBtnTextOff]
                }>
                다음
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Withdraw;

const styles = StyleSheet.create({
  bodyContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    height: '100%',
  },
  titleContainer: {
    marginBottom: 8,
  },
  titleText: {
    ...fooiyFont.H3,
  },
  subTitleContainer: {
    // subtitle에 마진 바텀 8 주고 체크박스에 마진 탑 16줘서 24맞춤
    marginBottom: 8,
  },
  subtitleText: {
    ...fooiyFont.Body1,
    color: fooiyColor.G600,
  },
  checkBox: {
    width: '100%',
    marginTop: 16,
    borderWidth: 1,
    borderColor: fooiyColor.G200,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  checkedCheckBox: {
    borderColor: fooiyColor.P500,
  },
  checkBoxText: {
    ...fooiyFont.Button,
    color: fooiyColor.G300,
    lineHeight: Platform.select({
      ios: 0,
      android: 20,
    }),
  },
  checkedCheckBoxText: {
    color: fooiyColor.P500,
  },
  yesGuitarContainer: {
    alignItems: 'flex-end',
  },
  noGuitarContainer: {
    display: 'none',
    alignItems: 'flex-end',
  },
  textInputContainer: {
    borderWidth: 1,
    borderColor: fooiyColor.G200,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
    width: '100%',
    height: 104,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  textInput: {
    width: '100%',
    height: '100%',
    fontSize: 14,
    fontWeight: '400',
    color: fooiyColor.G600,
  },
  textInputLength: {
    ...fooiyFont.Caption1,
    color: fooiyColor.G600,
  },
  changeBtn: {
    position: 'absolute',
    bottom: Platform.select({
      ios: 0,
      android: 20,
    }),
    width: '100%',
    height: 56,
    backgroundColor: fooiyColor.P500,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: 16,
  },
  changeBtnOff: {
    backgroundColor: fooiyColor.G100,
  },
  changeBtnText: {
    color: fooiyColor.W,
    fontSize: 16,
    fontWeight: '600',
  },
  changeBtnTextOff: {
    color: fooiyColor.G300,
  },
});

const BodyStyles = (topSafeAreaHeight, bottomSafeAreaHeight) =>
  StyleSheet.create({
    bodyContainer: {
      height:
        globalVariable.height - (topSafeAreaHeight + bottomSafeAreaHeight + 72),
      marginHorizontal: 16,
      marginTop: 16,
    },
  });
