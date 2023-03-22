import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
import {ApiManagerV2} from '../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../common/Enums';
import FooiyToast from '../../common/FooiyToast';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';
import {StackHeader} from '../headers/StackHeader';
import Margin from '../Margin';

const placeholder =
  '예) 메뉴 가격, 음식점 위치, 폐업 등 김치찌개\n- 김치찌개 가격이 12,900원인데 잘못 적혀있어요.\n- 저번주에 폐업했어요.';

const MenuReport = props => {
  const navigation = useNavigation();
  const shopInfo = props.route.params.shop;
  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const reportMenu = async () => {
    await ApiManagerV2.post(apiUrl.MENU_REPORT, {
      shop_id: shopInfo.shop_id,
      content: value,
    })
      .then(navigation.goBack())
      .catch(e => FooiyToast.error());
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <StackHeader title={'제보하기'} />
        <View style={styles.view_container}>
          <Margin h={16} />
          <Text style={styles.shop_name}>{shopInfo.name}</Text>
          <Text style={styles.shop_address}>{shopInfo.address}</Text>
          <Margin h={24} />
          <TextInput
            style={
              isFocus
                ? [styles.is_value, {borderColor: fooiyColor.G400}]
                : [styles.is_value, {borderColor: fooiyColor.G200}]
              // !isFocus && value === ''
              //   ? [styles.empty_value, {borderColor: fooiyColor.G200}]
              //   : isFocus && value === ''
              //   ? [styles.empty_value, {borderColor: fooiyColor.G400}]
              //   : isFocus && value !== ''
              //   ? [styles.is_value, {borderColor: fooiyColor.G400}]
              //   : [styles.is_value, {borderColor: fooiyColor.G200}]
            }
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            multiline={true}
            textAlignVertical="top"
            maxLength={500}
            onChangeText={setValue}
            value={value}
            placeholder={placeholder}
            placeholderTextColor={fooiyColor.G300}
            autoCapitalize={false}
            autoCorrect={false}
            spellCheck={false}
          />
        </View>
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.select({
            ios: 16,
            android: null,
          })}
          behavior={Platform.select({
            ios: 'position',
            android: null,
          })}>
          <TouchableOpacity
            style={{
              height: 56,
              width: globalVariable.width - 32,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: Platform.OS === 'ios' ? 0 : 16,
              borderRadius: 8,
              marginHorizontal: 16,
              backgroundColor: value ? fooiyColor.P500 : fooiyColor.G100,
            }}
            onPress={value ? reportMenu : null}
            activeOpacity={0.8}>
            <Text style={{...fooiyFont.Button, color: fooiyColor.W}}>
              수정 요청
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default MenuReport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: fooiyColor.W,
  },
  view_container: {
    paddingHorizontal: 16,
    flex: 1,
  },

  shop_name: {
    ...fooiyFont.Subtitle1,
    color: fooiyColor.G800,
  },
  shop_address: {
    ...fooiyFont.Subtitle3,
    color: fooiyColor.G400,
  },
  empty_value: {
    width: '100%',
    height: 104,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    paddingTop: 16,
    ...fooiyFont.Body2,
    color: fooiyColor.G300,
    lineHeight: Platform.select({ios: 0, android: null}),
  },
  is_value: {
    width: '100%',
    height: 104,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    paddingTop: 16,
    ...fooiyFont.Body2,
    color: fooiyColor.G600,
    lineHeight: Platform.select({ios: 0, android: null}),
  },
});
