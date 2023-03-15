import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {launchImageLibrary} from 'react-native-image-picker';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  Ic_arrow_right_large_G400,
  Ic_camera_static_G400,
  Ic_edit_G400,
} from '../../../../assets/svg';
import {ApiManagerV2} from '../../../common/api/v2/ApiManagerV2';
import {apiUrl, resizeImageType} from '../../../common/Enums';
import FooiyToast from '../../../common/FooiyToast';
import {fooiyColor, fooiyFont} from '../../../common/globalStyles';
import {globalVariable} from '../../../common/globalVariable';
import {GalleryPermission} from '../../../common/Permission';
import {StackHeader} from '../../../common_ui/headers/StackHeader';
import ResizeImage from '../../../common_ui/ResizeImage';

const SettingTab = props => {
  const {title, description, party_id, owner_id} = props;
  const navigation = useNavigation();

  const onPressPartyConfirm = () => {
    navigation.navigate('PartyConfirm', {
      party_id,
    });
  };

  const onPressPartyEditName = () => {
    navigation.navigate('PartyEditName', {
      party_id,
    });
  };

  const onPressPartyMemberList = () => {
    navigation.navigate('PartyMemberList', {
      party_id,
      owner_id,
    });
  };

  return (
    <TouchableOpacity
      onPress={
        title === '파티 가입 신청 목록'
          ? onPressPartyConfirm
          : title === '파티 이름'
          ? onPressPartyEditName
          : onPressPartyMemberList
      }
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
        <Ic_arrow_right_large_G400 />
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
  const navigation = useNavigation();

  const insets = useSafeAreaInsets();

  const onImgPress = async () => {
    (await GalleryPermission()) && Platform.OS === 'ios'
      ? launchImageLibrary({includeExtra: true, selectionLimit: 1}, res => {
          if (res.didCancel) {
            console.log('Cancel');
          } else {
            navigation.navigate('IOSCrop', {
              isParty: 'party',
              photos: res.assets,
              party_id,
            });
          }
        })
      : navigation.navigate('Gallery', {
          navigation: 'Party',
          party_id: party_id,
          is_multi: false,
        });
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
    }).catch(e => FooiyToast.error());
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{backgroundColor: fooiyColor.W}}>
        <View>
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
                  <ResizeImage
                    uri={image}
                    size={resizeImageType.SMALL}
                    imageStyle={{
                      width: 72,
                      height: 72,
                      borderWidth: 1,
                      borderRadius: 24,
                      borderColor: fooiyColor.G200,
                    }}
                  />
                  <Ic_camera_static_G400 style={styles.cameraIcon} />
                </TouchableOpacity>
                <Text style={{...fooiyFont.Subtitle1}}>{name}</Text>
              </View>
              <View style={styles.introContainer}>
                <TextInput
                  maxLength={100}
                  placeholder={'인사말을 입력해주세요.'}
                  placeholderTextColor={fooiyColor.G400}
                  value={curIntro}
                  onChangeText={setCurIntro}
                  style={
                    isFocused ? [styles.intro, styles.introFocus] : styles.intro
                  }
                  onFocus={onIntroFocus}
                  onBlur={onIntroBlur}
                />
                <Ic_edit_G400
                  style={isFocused ? styles.pencilFocus : styles.pencilBlur}
                />
              </View>
            </View>
            {/* Settings */}
            <View>
              <SettingTab
                title={'파티 이름'}
                description={name}
                party_id={party_id}
              />
              <SettingTab
                title={'파티원 목록'}
                description={account_count + '명'}
                party_id={party_id}
                owner_id={owner_id}
              />
              <SettingTab
                title={'파티 가입 신청 목록'}
                description={waiting_join_count + '명'}
                party_id={party_id}
              />
            </View>
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
    ...fooiyFont.Body1,
    color: fooiyColor.B,
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
