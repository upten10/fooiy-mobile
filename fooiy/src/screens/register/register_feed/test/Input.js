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
import {globalVariable} from '../../../../common/globalVariable';
import {StackHeader} from '../../../../common_ui/headers/StackHeader';
import {fooiyColor, fooiyFont} from '../../../../common/globalStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {globalStyles} from '../../../../common/globalStyles';
import Slider from '@react-native-community/slider';
import {Notice} from '../../../../../assets/icons/svg';
import {Clear} from '../../../../../assets/icons/svg';
const Input = props => {
  const {holders, onChangeText, title, checkInput} = props;

  const [isFocus, setFocused] = useState(false);
  const [isInput, setInput] = useState(false);
  const [isNull, setIsNull] = useState(true);
  const textInputRef = useRef();

  const onFocus = () => {
    setFocused(true);
  };
  const onBlur = () => {
    setFocused(false);
  };

  useEffect(() => {
    setIsNull(!checkInput());
  }, [isFocus]);

  return (
    <View>
      <Text style={{...fooiyFont.Subtitle1, marginTop: 16}}>{title}</Text>
      <View
        style={
          isFocus
            ? {
                marginTop: 16,
                justifyContent: 'center',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 8,
                borderColor: fooiyColor.G400,
              }
            : {
                marginTop: 16,
                justifyContent: 'center',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 8,
                borderColor: fooiyColor.G200,
              }
        }>
        <TextInput
          ref={textInputRef}
          style={
            isFocus
              ? {
                  padding: 16,
                  ...fooiyFont.Body1,
                  lineHeight: 0,
                  width: '90%',
                }
              : {
                  padding: 16,
                  ...fooiyFont.Subtitle2,
                  lineHeight: 0,
                  color: fooiyColor.G400,
                  width: '90%',
                }
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
        <TouchableOpacity
          style={
            isFocus
              ? {
                  width: 24,
                  height: 24,
                  right: 16,
                  justifyContent: 'center',
                }
              : {right: 16}
          }
          hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
          onPress={() => textInputRef.current.clear()}>
          {isFocus ? <Clear /> : null}
        </TouchableOpacity>
      </View>
      {title === '위치' ? (
        <View
          style={{
            width: '100%',
            backgroundColor: fooiyColor.P50,
            borderRadius: 8,
            padding: 16,
            marginTop: 16,
          }}>
          <Text
            style={{
              ...fooiyFont.Subtitle3,
              marginBottom: 8,
              color: fooiyColor.G600,
            }}>
            위치 작성 안내사항
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Notice style={{width: 18, height: 18, color: fooiyColor.G600}} />
            <Text style={{marginLeft: 8, color: fooiyColor.G600}}>
              정확한 위치를 몰라도 대략적인 위치를 적어주세요.
            </Text>
          </View>
          <Text style={{marginLeft: 26, color: fooiyColor.G600}}>
            ex)강남역 9번 출구 편의점 옆
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default Input;
