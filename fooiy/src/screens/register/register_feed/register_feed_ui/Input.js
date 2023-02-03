import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {fooiyColor, fooiyFont} from '../../../../common/globalStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Notice} from '../../../../../assets/icons/svg';
import {Clear} from '../../../../../assets/icons/svg';

const Input = props => {
  const {holders, onChangeText, value, title, checkInput} = props;
  const [isFocus, setFocused] = useState(false);
  const textInputRef = useRef();

  return (
    <View style={{marginBottom: 20}}>
      <Text style={styles.title}>{title}</Text>
      <View
        style={
          checkInput()
            ? styles.input_container
            : isFocus
            ? styles.input_container
            : [styles.input_container, {borderColor: fooiyColor.G200}]
        }>
        <TextInput
          ref={textInputRef}
          style={
            checkInput()
              ? [
                  styles.input,
                  {
                    ...fooiyFont.Body1,
                    lineHeight: Platform.OS === 'ios' ? 0 : 24,
                  },
                ]
              : [
                  styles.input,
                  {
                    ...fooiyFont.Subtitle2,
                    lineHeight: Platform.OS === 'ios' ? 0 : 24,
                  },
                ]
          }
          placeholder={holders}
          autoCapitalize={false}
          autoCorrect={false}
          spellCheck={false}
          onChangeText={onChangeText}
          maxLength={20}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholderTextColor={fooiyColor.G400}
          value={value}
        />
        {isFocus && checkInput() ? (
          <TouchableOpacity
            hitSlop={{top: 16, bottom: 16, left: 16, right: 16}}
            onPress={() => {
              textInputRef.current.clear(), onChangeText('');
            }}>
            <Clear />
          </TouchableOpacity>
        ) : (
          <View style={{width: 24, height: 24}}></View>
        )}
      </View>
      {title === '위치' ? (
        <View style={styles.location_notice}>
          <View style={{flexDirection: 'row'}}>
            <Notice style={styles.location_notice_icon} />
            <Text style={styles.location_notice_text}>
              정확한 위치를 몰라도 대략적인 위치를 적어주세요.{'\n'}ex)강남역
              9번 출구 편의점 옆
            </Text>
          </View>
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
  input_container: {
    marginTop: 16,
    paddingRight: 16,
    flexDirection: 'row',
    width: '100%',
    height: 56,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: fooiyColor.G400,
  },
  input: {
    flex: 1,
    height: 54,
    padding: 16,
  },
  location_notice: {
    width: '100%',
    backgroundColor: fooiyColor.P50,
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  location_notice_text: {
    ...fooiyFont.Caption1,
    marginLeft: 8,
    color: fooiyColor.G600,
  },
  location_notice_icon: {
    width: 18,
    height: 18,
    color: fooiyColor.G600,
  },
});
