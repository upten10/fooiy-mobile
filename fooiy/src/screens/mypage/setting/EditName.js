import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
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
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {Ic_clear_G400, Ic_info_18_G600} from '../../../../assets/svg';
import {ApiManagerV2} from '../../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../../common/Enums';
import FooiyToast from '../../../common/FooiyToast';
import {fooiyColor, fooiyFont} from '../../../common/globalStyles';
import {globalVariable} from '../../../common/globalVariable';
import {useDebounce} from '../../../common/hooks/useDebounce';
import {StackHeader} from '../../../common_ui/headers/StackHeader';
import {userInfoAction} from '../../../redux/actions/userInfoAction';

// setting && party setting

const EditName = props => {
  const {party_id} = props.route.params;

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {debounceCallback, isLoading} = useDebounce({time: 250});

  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [btnActivate, setBtnActivate] = useState(false);
  const [focus, setFocus] = useState(true);

  const insets = useSafeAreaInsets();

  const NICKNAME_RULE =
    /^[0-9A-Za-z가-힣][0-9A-Za-z가-힣._/]{0,13}[0-9A-Za-z가-힣]$/;

  useEffect(() => {
    if (inputValue.length !== 0) {
      debounceCallback(() => {
        checkValid(inputValue);
      });
    }
  }, [inputValue]);

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
      setBtnActivate(false);
    }
  };

  const onChangeText = value => {
    setInputValue(value);
    value.length < 3 ? setBtnActivate(false) : null;
  };

  const onInputBlur = () => {
    setFocus(false);
  };

  const onInputFocus = () => {
    setFocus(true);
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <StackHeader title={party_id ? '파티 이름 변경' : '닉네임 변경'} />
        {/* 바디 */}
        <View style={{flex: 1, paddingHorizontal: 16, paddingTop: 16}}>
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
            <View style={{marginBottom: 16}}>
              <View
                style={
                  focus
                    ? isValid || inputValue.length === 0
                      ? [styles.textInputContainer, styles.textInputValue]
                      : [
                          styles.textInputContainer,
                          styles.textInputValue,
                          styles.wrongTextInput,
                        ]
                    : isValid || inputValue.length === 0
                    ? [styles.textInputContainer, styles.textInputValue]
                    : [
                        styles.textInputContainer,
                        styles.textInputValue,
                        styles.wrongTextInput,
                      ]
                }>
                <TextInput
                  maxLength={15}
                  autoCapitalize="none"
                  autoCorrect={false}
                  spellCheck={false}
                  placeholder={'특수문자 제외, 최대 20자'}
                  placeholderTextColor={fooiyColor.G400}
                  onChangeText={onChangeText}
                  onBlur={onInputBlur}
                  onFocus={onInputFocus}
                  autoFocus
                  value={inputValue}
                  style={
                    inputValue.length === 0
                      ? styles.textInput
                      : !isValid
                      ? [
                          styles.textInput,
                          styles.textInputValue,
                          styles.wrongTextInput,
                        ]
                      : [styles.textInput, styles.textInputValue]
                  }
                />
                {inputValue.length > 0 ? (
                  <TouchableOpacity
                    // style={{position: 'absolute', right: 14, bottom: 15.5, zIndex: 1}}
                    hitSlop={{top: 16, bottom: 16, left: 16, right: 16}}
                    onPress={() => {
                      setInputValue('');
                    }}>
                    <Ic_clear_G400 />
                  </TouchableOpacity>
                ) : null}
              </View>
              <Text
                style={
                  inputValue.length === 0
                    ? styles.errorMsgOff
                    : isValid
                    ? styles.errorMsgOff
                    : styles.errorMsgOn
                }>
                사용할 수 없는 {party_id ? '파티 이름' : '닉네임'}이에요.
              </Text>
            </View>
            {/* notice */}
            <View style={styles.infoContainer}>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoTextBig}>안내사항</Text>
              </View>
              <View style={styles.infoTextContainer}>
                <Ic_info_18_G600 style={styles.infoIcon} />
                <Text style={styles.infoText}>
                  최소 2자, 최대 15자만 가능해요.
                </Text>
              </View>
              <View style={styles.infoTextContainer}>
                <Ic_info_18_G600 style={styles.infoIcon} />
                <Text style={styles.infoText}>
                  특수문자는 [./_]만 가능해요.
                </Text>
              </View>
              <View style={styles.infoTextContainerLast}>
                <Ic_info_18_G600 style={styles.infoIcon} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: fooiyColor.G200,
    borderRadius: 8,
    height: 56,
    paddingHorizontal: 16,
  },
  wrongTextInput: {
    borderColor: fooiyColor.P800,
  },
  textInput: {
    ...fooiyFont.Body1,
    lineHeight: Platform.select({
      ios: 0,
      android: null,
    }),
    width: '90%',
    height: '100%',
  },
  textInputValue: {
    borderColor: fooiyColor.G400,
  },
  errorMsgOn: {
    ...fooiyFont.Body2,
    marginTop: 4,
    marginLeft: 16,
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
    ...fooiyFont.Subtitle3,
    color: fooiyColor.G600,
  },
  infoText: {
    ...fooiyFont.Caption1,
    color: fooiyColor.G600,
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
    ...fooiyFont.Button,
    color: fooiyColor.W,
  },
  changeBtnTextOff: {
    ...fooiyFont.Button,
    color: fooiyColor.G300,
  },
});
