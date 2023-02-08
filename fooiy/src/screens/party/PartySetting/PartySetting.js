import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TextInput} from 'react-native-gesture-handler';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {ArrowIcon, Camera_Profile, Pencil} from '../../../../assets/icons/svg';
import {ApiManagerV2} from '../../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../../common/Enums';
import {fooiyColor, fooiyFont} from '../../../common/globalStyles';
import {globalVariable} from '../../../common/globalVariable';
import {StackHeader} from '../../../common_ui/headers/StackHeader';

const SettingTab = props => {
  const {title, description, party_id} = props;
  const navigation = useNavigation();

  const onPressPartyConfirm = () => {
    navigation.navigate('PartyConfirm', {
      party_id,
    });
  };

  return (
    <TouchableOpacity
      onPress={title === '파티 가입 신청 목록' ? onPressPartyConfirm : null}
      activeOpacity={0.8}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 14,
        marginBottom: 8,
      }}>
      <Text style={{...fooiyFont.Subtitle3, color: fooiyColor.G600}}>
        {title}
      </Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={{
            ...fooiyFont.Body2,
            color:
              title === '파티 가입 신청 목록'
                ? fooiyColor.P500
                : fooiyColor.G600,
            marginRight: 8,
          }}>
          {description}
        </Text>
        <ArrowIcon />
      </View>
    </TouchableOpacity>
  );
};

export default props => {
  const {
    account_count,
    feed_count,
    image,
    introduction,
    join_state,
    name,
    owner,
    owner_fooiyti,
    owner_id,
    owner_rank,
    party_id,
    waiting_join_count,
  } = props.route.params;

  const [curIntro, setCurIntro] = useState(introduction);
  const [isFocused, setIsFocused] = useState(false);

  const insets = useSafeAreaInsets();

  const onImgPress = () => {
    console.log('Image Clicked');
  };

  const onIntroFocus = () => {
    setIsFocused(true);
  };

  const onIntroBlur = () => {
    setIsFocused(false);
    if (introduction !== curIntro) {
      editIntro();
    }
  };

  const editIntro = async () => {
    await ApiManagerV2.patch(apiUrl.EDIT_PARTY, {
      party_id,
      introduction: curIntro === '' ? ' ' : curIntro,
    }).then(res => console.log('인사말 수정'));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{backgroundColor: fooiyColor.W}}>
        <StackHeader title={'파티 설정'} />
        {/* Body */}
        <View
          style={{
            width: '100%',
            height: globalVariable.height - insets.top - insets.bottom - 56,
            paddingHorizontal: 16,
            paddingTop: 16,
          }}>
          {/* Info */}
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onImgPress}
                style={{marginRight: 16}}>
                <FastImage
                  source={{uri: image}}
                  style={{
                    width: 72,
                    height: 72,
                    borderWidth: 1,
                    borderRadius: 24,
                    borderColor: fooiyColor.G200,
                  }}
                />
                <Camera_Profile style={styles.cameraIcon} />
              </TouchableOpacity>
              <Text style={{...fooiyFont.Subtitle1}}>{name}</Text>
            </View>
            <View style={styles.introContainer}>
              <TextInput
                maxLength={100}
                placeholder={'인사말을 입력해주세요.'}
                value={curIntro}
                onChangeText={setCurIntro}
                style={
                  isFocused ? [styles.intro, styles.introFocus] : styles.intro
                }
                onFocus={onIntroFocus}
                onBlur={onIntroBlur}
              />
              <Pencil
                style={isFocused ? styles.pencilFocus : styles.pencilBlur}
              />
            </View>
          </View>
          {/* Settings */}
          <View>
            <SettingTab title={'파티 이름'} description={name} />
            <SettingTab
              title={'파티원 목록'}
              description={account_count + '명'}
            />
            <SettingTab
              title={'파티 가입 신청 목록'}
              description={waiting_join_count + '명'}
              party_id={party_id}
            />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  cameraIcon: {
    position: 'absolute',
    right: -4,
    bottom: -4,
  },
  introContainer: {
    justifyContent: 'center',
    width: '100%',
    marginBottom: 16,
  },
  intro: {
    borderWidth: 1,
    borderColor: fooiyColor.G200,
    borderRadius: 8,
    height: 56,
    padding: 16,
    paddingRight: 16 + 24,
    ...fooiyFont.Subtitle2,
    color: fooiyColor.G400,
    lineHeight: Platform.select({
      ios: 0,
      android: null,
    }),
  },
  introFocus: {
    borderColor: fooiyColor.G400,
    color: fooiyColor.B,
    fontWeight: '400',
  },
  pencilBlur: {
    opacity: 0,
    position: 'absolute',
    right: 0,
    margin: 16,
  },
  pencilFocus: {
    opacity: 1,
    position: 'absolute',
    right: 0,
    margin: 16,
  },
});
