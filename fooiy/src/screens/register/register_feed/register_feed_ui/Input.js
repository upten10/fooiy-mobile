import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Touchable,
} from 'react-native';
import {fooiyColor, fooiyFont} from '../../../../common/globalStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Notice} from '../../../../../assets/icons/svg';
import {Clear} from '../../../../../assets/icons/svg';
import {check} from 'react-native-permissions';
const Input = props => {
  const {holders, onChangeText, title, checkInput} = props;
  const [isFocus, setFocused] = useState(false);
  const textInputRef = useRef();

  const onFocus = () => {
    setFocused(true);
  };
  const onBlur = () => {
    setFocused(false);
  };

  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <View
        style={
          checkInput() ? styles.focus_active_view : styles.focus_deactive_view
        }>
        <TextInput
          ref={textInputRef}
          style={
            checkInput()
              ? styles.focus_active_input
              : styles.focus_deactive_input
          }
          placeholder={holders}
          multiline={false}
          textAlignVertical="top"
          autoCapitalize={false}
          autoCorrect={false}
          spellCheck={false}
          onChangeText={onChangeText}
          maxLength={100}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholderTextColor={fooiyColor.G400}
        />
        {isFocus && (
          <TouchableOpacity
            style={styles.focus_active_icon}
            hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
            onPress={() => {
              textInputRef.current.clear(), onChangeText('');
            }}>
            <Clear />
          </TouchableOpacity>
        )}
      </View>
      {title === '위치' ? (
        <View style={styles.location_notice}>
          <Text style={styles.location_notice_text}>위치 작성 안내사항</Text>
          <View style={{flexDirection: 'row'}}>
            <Notice style={styles.location_notice_icon} />
            <Text style={styles.location_notice_text_1}>
              정확한 위치를 몰라도 대략적인 위치를 적어주세요.
            </Text>
          </View>
          <Text style={styles.location_notice_text_2}>
            ex)강남역 9번 출구 편의점 옆
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  title: {
    ...fooiyFont.Subtitle1,
    marginTop: 16,
  },
  focus_active_view: {
    marginTop: 16,
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: fooiyColor.G400,
  },
  focus_deactive_view: {
    marginTop: 16,
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: fooiyColor.G200,
  },
  focus_active_input: {
    padding: 16,
    ...fooiyFont.Body1,
    lineHeight: 0,
    width: '90%',
  },
  focus_deactive_input: {
    padding: 16,
    ...fooiyFont.Subtitle2,
    lineHeight: 0,
    color: fooiyColor.G400,
    width: '90%',
  },
  focus_active_icon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    marginRight: 16,
  },
  location_notice: {
    width: '100%',
    backgroundColor: fooiyColor.P50,
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  location_notice_text: {
    ...fooiyFont.Subtitle3,
    marginBottom: 8,
    color: fooiyColor.G600,
  },
  location_notice_text_1: {
    ...fooiyFont.Caption1,
    marginLeft: 8,
    color: fooiyColor.G600,
  },
  location_notice_text_2: {
    ...fooiyFont.Caption1,
    marginLeft: 26,
    color: fooiyColor.G600,
  },
  location_notice_icon: {
    width: 18,
    height: 18,
    color: fooiyColor.G600,
  },
});
