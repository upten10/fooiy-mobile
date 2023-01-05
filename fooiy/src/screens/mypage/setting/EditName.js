import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Info} from '../../../../assets/icons/svg';
import {fooiyColor} from '../../../common/globalStyles';
import {globalVariable} from '../../../common/globalVariable';
import {StackHeader} from '../../../common_ui/headers/StackHeader';

const EditName = () => {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [btnActivate, setBtnActivate] = useState(false);
  const insets = useSafeAreaInsets();
  // const regExp = /[ \{\}\[\]\?,;:|\)*~`!^\-+┼<>@\#$%&\'\"\\\(\=]/gi;
  // const checkKor = /[ㄱ-ㅎ|ㅏ-ㅣ]/;
  // const allowed = /[./_]/gi;
  const NICKNAME_RULE =
    /^[0-9A-Za-z가-힣][0-9A-Za-z가-힣._]{0,18}[0-9A-Za-z가-힣]$/;

  useEffect(() => setNameError(false), [inputValue]);

  const checkValid = name => {
    if (NICKNAME_RULE.test(name)) {
      setIsValid(true);
      setBtnActivate(true);
      console.log('Allowed');
    } else {
      setIsValid(false);
      setNameError(true);
      setBtnActivate(false);
      console.log('Not allowed');
    }
  };

  const onChangeText = value => {
    setInputValue(value);
    value === '' ? setBtnActivate(false) : setBtnActivate(true);
  };

  const onInputBlur = () => {
    inputValue === '' ? null : checkValid(inputValue);
  };

  const onPressBtn = () => {
    console.log('Nickname Changed!');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StackHeader title="닉네임 변경" />
        {/* 바디 */}
        <View style={BodyStyles(insets.top, insets.bottom).bodyContainer}>
          {/* 새로운 닉네임을 입력해주세요 텍스트 컨테이너 */}
          <View style={styles.upperContainer}>
            <View style={styles.introContainer}>
              <Text style={styles.introText}>새로운 닉네임을</Text>
              <Text style={styles.introText}>입력해주세요</Text>
            </View>
            {/* input */}
            <View style={styles.textInputContainer}>
              <TextInput
                maxLength={20}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="특수문자 제외, 최대 20자"
                placeholderTextColor={fooiyColor.G400}
                style={
                  inputValue === ''
                    ? styles.textInput
                    : nameError
                    ? [
                        styles.textInput,
                        styles.textInputValue,
                        styles.wrongTextInput,
                      ]
                    : [styles.textInput, styles.textInputValue]
                }
                onChangeText={onChangeText}
                // onFocus={}
                onBlur={onInputBlur}
                autoFocus
                value={inputValue}
              />
              <Text style={nameError ? styles.errorMsgOn : styles.errorMsgOff}>
                사용할 수 없는 닉네임이에요.
              </Text>
            </View>
            {/* notice */}
            <View style={styles.infoContainer}>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoTextBig}>안내사항</Text>
              </View>
              <View style={styles.infoTextContainer}>
                <Info style={styles.infoIcon} />
                <Text style={styles.infoText}>
                  최소 2자, 최대 20자만 가능해요.
                </Text>
              </View>
              <View style={styles.infoTextContainer}>
                <Info style={styles.infoIcon} />
                <Text style={styles.infoText}>영문 소문자만 가능해요.</Text>
              </View>
              <View style={styles.infoTextContainer}>
                <Info style={styles.infoIcon} />
                <Text style={styles.infoText}>
                  특수문자는 [./_]만 가능해요.
                </Text>
              </View>
              <View style={styles.infoTextContainerLast}>
                <Info style={styles.infoIcon} />
                <Text style={styles.infoText}>[./_]는 중간에만 가능해요.</Text>
              </View>
            </View>
          </View>
          {/* btn */}
          <KeyboardAvoidingView
            behavior={Platform.select({ios: 'padding', android: undefined})}
            style={styles.changeBtnContainer}>
            <TouchableOpacity
              style={
                btnActivate
                  ? styles.changeBtn
                  : [styles.changeBtn, styles.changeBtnOff]
              }
              activeOpacity={0.8}
              onPress={isValid ? onPressBtn : null}>
              <Text
                style={
                  btnActivate
                    ? styles.changeBtnText
                    : [styles.changeBtnText, styles.changeBtnTextOff]
                }>
                변경
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EditName;

const styles = StyleSheet.create({
  container: {
    backgroundColor: fooiyColor.W,
  },
  introContainer: {
    marginBottom: 24,
  },
  introText: {
    fontSize: 24,
    fontWeight: '600',
  },
  textInputContainer: {
    marginBottom: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: fooiyColor.G200,
    borderRadius: 8,
    height: 56,
    color: fooiyColor.G400,
    fontSize: 16,
    fontWeight: '600',
    padding: 16,
  },
  textInputValue: {
    borderColor: fooiyColor.G400,
    color: fooiyColor.B,
    fontWeight: '400',
  },
  wrongTextInput: {
    borderColor: fooiyColor.P800,
  },
  errorMsgOn: {
    marginTop: 4,
    marginLeft: 16,
    fontWeight: '400',
    fontSize: 14,
  },
  errorMsgOff: {
    display: 'none',
  },
  infoContainer: {
    width: '100%',
    backgroundColor: fooiyColor.P50,
    borderRadius: 8,
    padding: 16,
  },
  infoTextContainer: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoTextContainerLast: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: 8,
  },
  infoTextBig: {
    color: fooiyColor.G600,
    fontSize: 14,
    fontWeight: '600',
  },
  infoText: {
    color: fooiyColor.G600,
    fontSize: 12,
    fontWeight: '400',
  },
  changeBtnContainer: {
    width: '100%',
    height: 56,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'pink',
  },
  changeBtn: {
    height: 56,
    backgroundColor: fooiyColor.P500,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
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
    },
  });
