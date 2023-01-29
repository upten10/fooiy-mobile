import {useNavigation} from '@react-navigation/native';
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
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {Notice} from '../../../../assets/icons/svg';
import {ApiManagerV2} from '../../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../../common/Enums';
import {fooiyColor} from '../../../common/globalStyles';
import {globalVariable} from '../../../common/globalVariable';
import {StackHeader} from '../../../common_ui/headers/StackHeader';
import {userInfoAction} from '../../../redux/actions/userInfoAction';

const EditName = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [btnActivate, setBtnActivate] = useState(false);

  const insets = useSafeAreaInsets();

  const NICKNAME_RULE =
    /^[0-9A-Za-z가-힣][0-9A-Za-z가-힣._/]{0,18}[0-9A-Za-z가-힣]$/;

  useEffect(() => setNameError(false), [inputValue]);

  const patchNickName = async name => {
    await ApiManagerV2.patch(apiUrl.PROFILE_EDIT, {
      nickname: name,
    })
      .then(res => dispatch(userInfoAction.edit(res.data.payload.account_info)))
      .then(navigation.goBack());
  };

  const checkValid = name => {
    if (NICKNAME_RULE.test(name)) {
      setIsValid(true);
      setBtnActivate(true);
    } else {
      setIsValid(false);
      setNameError(true);
      setBtnActivate(false);
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
    const name = inputValue;
    if (NICKNAME_RULE.test(name)) {
      patchNickName(name);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
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
                spellCheck={false}
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
                <Notice style={styles.infoIcon} />
                <Text style={styles.infoText}>
                  최소 2자, 최대 20자만 가능해요.
                </Text>
              </View>
              <View style={styles.infoTextContainer}>
                <Notice style={styles.infoIcon} />
                <Text style={styles.infoText}>
                  특수문자는 [./_]만 가능해요.
                </Text>
              </View>
              <View style={styles.infoTextContainerLast}>
                <Notice style={styles.infoIcon} />
                <Text style={styles.infoText}>[./_]는 중간에만 가능해요.</Text>
              </View>
            </View>
          </View>
          {/* btn */}
          <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.select({
              ios: 150,
              android: 100,
            })}
            behavior={Platform.select({
              ios: 'position',
              android: 'position',
            })}
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
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default EditName;

const styles = StyleSheet.create({
  container: {
    backgroundColor: fooiyColor.W,
    height: globalVariable.height,
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
    ...Platform.select({
      ios: {
        width: '100%',
        height: 56,
      },
      android: {
        width: '100%',
        height: 56,
        marginBottom: 45,
      },
    }),
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
      justifyContent: 'space-between',
      marginTop: 16,
    },
  });
