import React, {memo, useCallback, useEffect, useState} from 'react';
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
import {
  fooiyColor,
  fooiyFont,
  globalStyles,
} from '../../../common/globalStyles';
import {globalVariable} from '../../../common/globalVariable';
import {StackHeader} from '../../../common_ui/headers/StackHeader';
import {Notice} from '../../../../assets/icons/svg';
import DropDownPicker from 'react-native-dropdown-picker';
import {ApiManagerV2} from '../../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../../common/Enums';
import {useNavigation} from '@react-navigation/native';
import FooiyToast from '../../../common/FooiyToast';

const Suggestion = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [inputValue, setInputValue] = useState('');
  const [isBtnActivated, setIsBtnActivated] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('IMP');
  const [items, setItems] = useState([
    {value: 'IMP', label: '개선 사항'},
    {value: 'FR', label: '기능 추가 요청'},
    {value: 'BUG', label: '버그 신고'},
    {value: 'AC', label: '계정 관련'},
    {value: 'AD', label: '광고 제의'},
    {value: 'ETC', label: '기타 피드백'},
  ]);
  const Category = useCallback(() => {
    return (
      <DropDownPicker
        items={items}
        open={open}
        value={value}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        maxHeight={336}
        style={styles.categoryContainer}
        labelStyle={styles.dropDownTitle}
        textStyle={styles.dropDownValue}
        selectedItemContainerStyle={styles.dropDownSelected}
        listItemContainerStyle={styles.dropDownItem}
        dropDownContainerStyle={styles.dropDownContainer}
        description={'카테고리'}
        descriptionStyle={styles.description}
      />
    );
  }, [items, value, open]);

  const postSuggestion = async data => {
    const {type, content} = data;
    await ApiManagerV2.post(apiUrl.SUGGESTION, {
      content,
      type,
    }).catch(e => FooiyToast.error());
  };

  const onPressBtn = () => {
    const data = {
      content: inputValue,
      type: value,
    };
    postSuggestion(data);
    navigation.goBack();
  };

  const checkInputLength = () => {
    inputValue.length >= 10
      ? setIsBtnActivated(true)
      : setIsBtnActivated(false);
  };

  const onInputFocus = () => {
    setIsFocused(true);
  };

  const onInputBlur = () => {
    setIsFocused(false);
  };

  useEffect(
    () => {
      checkInputLength();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputValue],
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <StackHeader title="문의함" />
        {/* body */}
        <View style={BodyStyles(insets.top, insets.bottom).bodyContainer}>
          {/* text */}
          <View>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>
                소중한 의견을{'\n'}남겨주세요
              </Text>
            </View>
            {/* 카테고리 container */}
            <Category />
            {/* 텍스트 박스 */}
            <View style={styles.inputContainer}>
              <View
                style={
                  isFocused
                    ? [
                        styles.textInputContainerBlur,
                        styles.textInputContainerFocus,
                      ]
                    : styles.textInputContainerBlur
                }>
                <TextInput
                  style={styles.textInput}
                  placeholder="여기에 내용을 적어주세요 :)"
                  placeholderTextColor={fooiyColor.G300}
                  multiline
                  autoCapitalize={false}
                  autoCorrect={false}
                  spellCheck={false}
                  textAlignVertical="top"
                  onChangeText={setInputValue}
                  maxLength={300}
                  onFocus={onInputFocus}
                  onBlur={onInputBlur}
                />
              </View>
              {/* 글자수 */}
              <Text style={styles.textInputLength}>
                ({inputValue.length}/300)
              </Text>
            </View>
            {/* 안내사항 */}
            <View style={styles.noticeContainer}>
              <View style={styles.noticeTextContainer}>
                <Text style={styles.noticeTitle}>안내사항</Text>
              </View>
              <View style={styles.noticeTextContainer}>
                <Notice style={styles.noticeIcon} />
                <Text style={styles.noticeText}>
                  최소 10자 이상 적어주세요.
                </Text>
              </View>
              <View style={styles.noticeTextContainerLast}>
                <Notice style={[styles.noticeIcon, {paddingTop: 17}]} />
                <Text style={styles.noticeText}>
                  푸이가 더 나은 방향으로 나아갈 수 있도록{'\n'}다양하고 소중한
                  의견을 남겨주세요 :)
                </Text>
              </View>
            </View>
          </View>

          {/* 버튼 */}

          <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.select({
              ios: 150,
              android: 70,
            })}
            behavior={Platform.select({
              ios: 'position',
              android: 'position',
            })}>
            <View style={styles.sendBtnContainer}>
              <TouchableOpacity
                style={
                  isBtnActivated
                    ? styles.sendBtn
                    : [styles.sendBtn, styles.sendBtnOff]
                }
                activeOpacity={0.8}
                onPress={isBtnActivated ? onPressBtn : null}>
                <Text
                  style={
                    isBtnActivated
                      ? styles.sendBtnText
                      : [styles.sendBtnText, styles.sendBtnTextOff]
                  }>
                  문의하기
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Suggestion;

const styles = StyleSheet.create({
  container: {
    backgroundColor: fooiyColor.W,
    height: globalVariable.height,
  },
  titleContainer: {
    marginBottom: 24,
  },
  titleText: {
    ...fooiyFont.H3,
    color: fooiyColor.B,
  },
  inputContainer: {
    marginTop: 8,
    marginBottom: 8,
    alignItems: 'flex-end',
  },
  textInputContainerBlur: {
    width: '100%',
    height: 104,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: fooiyColor.G200,
    marginBottom: 8,
  },
  textInputContainerFocus: {
    borderColor: fooiyColor.G400,
  },
  textInput: {
    width: '100%',
    height: '100%',
    ...fooiyFont.Body2,
    color: fooiyColor.G600,
    lineHeight: Platform.select({
      ios: 0,
      android: null,
    }),
    padding: 0,
  },
  textInputLength: {
    ...fooiyFont.Caption1,
    color: fooiyColor.G600,
  },
  noticeContainer: {
    width: '100%',
    backgroundColor: fooiyColor.P50,
    padding: 16,
    borderRadius: 8,
  },
  noticeTextContainer: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  noticeTextContainerLast: {
    flexDirection: 'row',
  },
  noticeTitle: {
    ...fooiyFont.Subtitle3,
    color: fooiyColor.G600,
  },
  noticeIcon: {
    marginRight: 8,
  },
  noticeText: {
    ...fooiyFont.Caption1,
    color: fooiyColor.G600,
  },
  sendBtnContainer: {
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
  sendBtn: {
    height: 56,
    backgroundColor: fooiyColor.P500,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    ...globalStyles.transparency,
  },
  sendBtnOff: {
    backgroundColor: fooiyColor.G100,
  },
  sendBtnText: {
    ...fooiyFont.Button,
    color: fooiyColor.W,
  },
  sendBtnTextOff: {
    ...fooiyFont.Button,
    color: fooiyColor.G300,
  },
  categoryContainer: {
    backgroundColor: fooiyColor.W,
    borderWidth: 1,
    borderColor: fooiyColor.G200,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
    height: 58,
  },
  dropDownTitle: {
    ...fooiyFont.Subtitle2,
    color: fooiyColor.B,
  },
  description: {
    ...fooiyFont.Subtitle4,
    color: fooiyColor.G400,
    lineHeight: 17,
  },
  dropDownValue: {
    ...fooiyFont.Body1,
    color: fooiyColor.B,
  },
  dropDownSelected: {
    backgroundColor: fooiyColor.G50,
  },
  dropDownItem: {
    height: 56,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomColor: fooiyColor.G50,
    borderBottomWidth: 1,
  },
  dropDownContainer: {
    borderColor: fooiyColor.G200,
    borderWidth: 1,
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    borderRadius: 8,
    marginTop: 8,
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
