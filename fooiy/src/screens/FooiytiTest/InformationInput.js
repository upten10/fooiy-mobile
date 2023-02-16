import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ArrowIconBottom, Notice} from '../../../assets/icons/svg';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {StackHeader} from '../../common_ui/headers/StackHeader';
import {ApiManagerV2} from '../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../common/Enums';
import FooiyToast from '../../common/FooiyToast';

export default props => {
  const navigation = useNavigation();

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [displayDate, setDisplayDate] = useState('');
  const [gender, setGender] = useState('');
  const [btnActivate, setBtnActivate] = useState(false);

  const convertBirthDay = date => {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = '0' + month.toString();
    }
    if (day < 10) {
      day = '0' + day.toString();
    }
    return month + day;
  };

  useEffect(() => {
    if (displayDate.length > 0 && gender.length > 0) {
      setBtnActivate(true);
    } else {
      setBtnActivate(false);
    }
  }, [btnActivate, displayDate, gender]);

  const onPressPicker = () => {
    setOpen(true);
  };

  const onConfirm = date => {
    setOpen(false);
    setDate(date);
    setDisplayDate(
      `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`,
    );
  };

  const patchUserInfo = async () => {
    await ApiManagerV2.patch(apiUrl.PROFILE_EDIT, {
      gender,
      birth_year: date.getFullYear().toString(),
      birth_day: convertBirthDay(date),
    })
      .then(navigation.navigate('FooiytiTest'))
      .catch(e => FooiyToast.error());
  };

  const onPressNext = () => {
    if (btnActivate) {
      patchUserInfo();
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: fooiyColor.W}}>
      <StackHeader title={'정보 입력'} />
      <View style={{flex: 1, paddingHorizontal: 16, paddingTop: 16}}>
        {/* 출생연도 */}
        <View style={{marginBottom: 36}}>
          <Text
            style={{
              ...fooiyFont.Subtitle1,
              color: fooiyColor.G800,
              marginBottom: 16,
            }}>
            생년월일
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPressPicker}
            style={{
              width: '100%',
              height: 56,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderWidth: 1,
              borderRadius: 8,
              borderColor: fooiyColor.G200,
              padding: 16,
            }}>
            <Text style={{...fooiyFont.Subtitle2}}>
              {displayDate.length === 0
                ? '생년월일을 입력해주세요'
                : displayDate}
            </Text>
            <ArrowIconBottom />
          </TouchableOpacity>
          <DatePicker
            modal
            maximumDate={new Date()}
            open={open}
            date={date}
            mode={'date'}
            title={'생년월일'}
            confirmText={'선택'}
            cancelText={'취소'}
            locale={'ko'}
            onConfirm={onConfirm}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>
        {/* 성별 */}
        <View style={{marginBottom: 36}}>
          <Text
            style={{
              ...fooiyFont.Subtitle1,
              color: fooiyColor.G800,
              marginBottom: 16,
            }}>
            성별
          </Text>
          <View
            style={{
              width: '100%',
              height: 48,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setGender('M')}
              style={
                gender === 'M'
                  ? [
                      styles.gnederContainer,
                      styles.selectedGenderContainer,
                      {marginRight: 7},
                    ]
                  : [styles.gnederContainer, {marginRight: 7}]
              }>
              <Text
                style={
                  gender === 'M'
                    ? [styles.genderText, styles.selectedGenderText]
                    : styles.genderText
                }>
                남성
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setGender('F')}
              style={
                gender === 'F'
                  ? [styles.gnederContainer, styles.selectedGenderContainer]
                  : [styles.gnederContainer]
              }>
              <Text
                style={
                  gender === 'F'
                    ? [styles.genderText, styles.selectedGenderText]
                    : styles.genderText
                }>
                여성
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* notice */}
        <View
          style={{
            backgroundColor: fooiyColor.P50,
            padding: 16,
            borderRadius: 8,
          }}>
          <Text
            style={{
              marginBottom: 8,
              ...fooiyFont.Subtitle3,
              color: fooiyColor.G600,
            }}>
            안내사항
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Notice style={{marginRight: 8}} />
            <Text style={{...fooiyFont.Caption1, color: fooiyColor.G600}}>
              선택하신 정보는 푸이티아이 결과 도출에 활용해요.
            </Text>
          </View>
        </View>
        {/* Btn */}
        <TouchableOpacity
          onPress={onPressNext}
          activeOpacity={0.8}
          style={
            btnActivate
              ? styles.activateBtn
              : [styles.activateBtn, styles.noActivateBtn]
          }>
          <Text
            style={
              btnActivate
                ? styles.activateBtnText
                : [styles.activateBtnText, styles.noActivateBtnText]
            }>
            다음
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  gnederContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: fooiyColor.G200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    flex: 1,
  },
  selectedGenderContainer: {
    borderColor: fooiyColor.P500,
  },
  genderText: {
    ...fooiyFont.Button,
    color: fooiyColor.G600,
  },
  selectedGenderText: {
    color: fooiyColor.P500,
  },
  activateBtn: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    width: '100%',
    height: 56,
    backgroundColor: fooiyColor.P500,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Platform.select({
      ios: 0,
      android: 16,
    }),
  },
  activateBtnText: {
    ...fooiyFont.Button,
    color: fooiyColor.W,
    lineHeight: Platform.select({
      ios: 0,
      android: null,
    }),
  },
  noActivateBtn: {
    backgroundColor: fooiyColor.G100,
  },
  noActivateBtnText: {
    color: fooiyColor.G300,
  },
});
