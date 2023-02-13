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
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {Clear, Notice} from '../../../../assets/icons/svg';
import {ApiManagerV2} from '../../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../../common/Enums';
import FooiyToast from '../../../common/FooiyToast';
import {fooiyColor, fooiyFont} from '../../../common/globalStyles';
import {globalVariable} from '../../../common/globalVariable';
import {StackHeader} from '../../../common_ui/headers/StackHeader';
import {userInfoAction} from '../../../redux/actions/userInfoAction';

// setting && party setting

const EditName = props => {
  const {party_id} = props.route.params;

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [btnActivate, setBtnActivate] = useState(false);
  const [focus, setFocus] = useState(true);

  const insets = useSafeAreaInsets();

  const NICKNAME_RULE =
    /^[0-9A-Za-z가-힣][0-9A-Za-z가-힣._/]{0,18}[0-9A-Za-z가-힣]$/;

  useEffect(() => setNameError(false), [inputValue]);

  const patchNickName = async name => {
    await ApiManagerV2.patch(apiUrl.PROFILE_EDIT, {
      nickname: name,
    })
      .then(res => {
        if (res.data.success) {
          dispatch(userInfoAction.edit(res.data.payload.account_info));
          navigation.goBack();
        }
      })
      .catch(e => FooiyToast.message('이미 사용중인 닉네임입니다.'));
  };

  const patchPartyName = async name => {
    await ApiManagerV2.patch(apiUrl.EDIT_PARTY, {
      party_id: party_id,
      party_name: name,
    })
      .then(res => {
        if (res.data.success) {
          navigation.goBack();
        }
      })
      .catch(e => FooiyToast.message('이미 사용중인 파티 이름입니다.'));
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
    setFocus(false);
    inputValue === '' ? null : checkValid(inputValue);
  };

  const onPressBtn = () => {
    const name = inputValue;
    if (NICKNAME_RULE.test(name)) {
      if (party_id) {
        patchPartyName(name);
      } else {
        patchNickName(name);
      }
    }
  };

  const onInputFocus = () => {
    setFocus(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <StackHeader title={party_id ? '파티 이름 변경' : '닉네임 변경'} />
        {/* 바디 */}
        <View style={{flex: 1, paddingHorizontal: 16}}>
          {/* 새로운 닉네임을 입력해주세요 텍스트 컨테이너 */}
          <View style={{flex: 1}}>
            <View style={styles.introContainer}>
              <Text style={styles.introText}>
                {party_id
                  ? '새로운 파티 이름을\n입력해주세요'
                  : '새로운 닉네임을\n입력해주세요'}
              </Text>
            </View>
            {/* input */}
            <View style={styles.textInputContainer}>
              <View
                style={
                  focus
                    ? nameError
                      ? [
                          styles.textInputCommonContainer,
                          styles.wrongTextInputContainer,
                        ]
                      : [
                          styles.textInputCommonContainer,
                          {borderColor: fooiyColor.G400},
                        ]
                    : nameError
                    ? [
                        styles.textInputCommonContainer,
                        styles.wrongTextInputContainer,
                      ]
                    : [styles.textInputCommonContainer]
                }>
                <TextInput
                  maxLength={20}
                  autoCapitalize={false}
                  autoCorrect={false}
                  spellCheck={false}
                  placeholder="특수문자 제외, 최대 20자"
                  placeholderTextColor={fooiyColor.G400}
                  style={styles.textInput}
                  onChangeText={onChangeText}
                  onBlur={onInputBlur}
                  onFocus={onInputFocus}
                  autoFocus
                  value={inputValue}
                />
                {inputValue.length > 0 ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setInputValue('')}>
                    <Clear />
                  </TouchableOpacity>
                ) : null}
              </View>
              <Text style={nameError ? styles.errorMsgOn : styles.errorMsgOff}>
                사용할 수 없는 {party_id ? '파티 이름' : '닉네임'}이에요.
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
        </View>
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.select({
            ios: 16,
            android: 0,
          })}
          behavior={Platform.select({
            ios: 'position',
            android: null,
          })}>
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
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default EditName;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: fooiyColor.W,
    // height: globalVariable.height,
  },
  introContainer: {
    marginBottom: 24,
  },
  introText: {
    ...fooiyFont.H3,
  },
  textInputContainer: {
    marginBottom: 16,
  },
  textInputCommonContainer: {
    width: '100%',
    height: 56,
    borderWidth: 1,
    borderColor: fooiyColor.G200,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  textInputValueContainer: {
    borderColor: fooiyColor.G400,
  },
  textInput: {
    ...fooiyFont.Subtitle2,
    lineHeight: Platform.select({
      ios: 0,
      android: null,
    }),
    width: globalVariable.width - (32 + 24 + 32 + 2),
    height: 56,
  },
  textInputValue: {
    ...fooiyFont.Subtitle2,
    lineHeight: Platform.select({
      ios: 0,
      android: null,
    }),
    color: fooiyColor.B,
  },
  wrongTextInputContainer: {
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
    backgroundColor: 'pink',
    width: '100%',
    height: 56,
  },
  changeBtn: {
    width: globalVariable.width - 32,
    height: 56,
    backgroundColor: fooiyColor.P500,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    position: 'absolute',
    bottom: Platform.select({
      ios: 0,
      android: 16,
    }),
    left: 16,
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
