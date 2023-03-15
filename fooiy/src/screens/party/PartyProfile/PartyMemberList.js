import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  Ic_arrow_right_regular_24_G600,
  Ic_check_24_P500,
  Ic_crown_P500,
  Ic_search_G400,
  Ic_uncheck_G400,
} from '../../../../assets/svg';
import {ApiManagerV2} from '../../../common/api/v2/ApiManagerV2';
import {apiUrl, resizeImageType} from '../../../common/Enums';
import FooiyToast from '../../../common/FooiyToast';
import {fooiyColor, fooiyFont} from '../../../common/globalStyles';
import {globalVariable} from '../../../common/globalVariable';
import {useDebounce} from '../../../common/hooks/useDebounce';
import {StackHeader} from '../../../common_ui/headers/StackHeader';
import Rank from '../../../common_ui/Rank';
import ResizeImage from '../../../common_ui/ResizeImage';

export const SearchBar = props => {
  const {value, setValue, placeholder, autoFocus} = props;

  const [isFocus, setIsFocus] = useState(false);

  const onFocus = () => {
    setIsFocus(true);
  };

  const onBlur = () => {
    setIsFocus(false);
  };

  return (
    <View
      style={{
        width: '100%',
        height: 56,
        borderWidth: 1,
        borderColor: isFocus ? fooiyColor.G400 : fooiyColor.G200,
        borderRadius: 8,
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 24,
      }}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        maxLength={20}
        autoCapitalize={false}
        autoCorrect={false}
        spellCheck={false}
        autoFocus={autoFocus}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholderTextColor={fooiyColor.G400}
        style={{
          width: globalVariable.width - 32 - 32 - 24,
          ...fooiyFont.Body1,
          lineHeight: Platform.select({
            ios: 0,
            android: null,
          }),
        }}
      />
      <Ic_search_G400 />
    </View>
  );
};

export default props => {
  const {party_id, owner_id} = props.route.params;

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const {debounceCallback, isLoading} = useDebounce({time: 200});

  const [value, setValue] = useState('');
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [isSetting, setIsSetting] = useState(false);
  const [checkedMembers, setCheckedMembers] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    getPartyMemberList();
  }, []);

  useEffect(() => {
    if (members.length !== 0) {
      if (value.length > 0) {
        debounceCallback(() => filter(value));
      } else {
        debounceCallback(() => setFilteredMembers(members));
      }
    }
  }, [value]);

  useEffect(() => {
    setCheckedMembers([]);
  }, [isSetting]);

  const filter = value => {
    setFilteredMembers(
      members.filter(member => member.nickname.includes(value)),
    );
  };

  const getPartyMemberList = async () => {
    await ApiManagerV2.get(apiUrl.PARTY_MEMBER_LIST, {
      params: {
        party_id: party_id,
        type: 'subscribe',
      },
    })
      .then(res => {
        setMembers(res.data.payload.party_members);
        setFilteredMembers(res.data.payload.party_members);
      })
      .catch(e => FooiyToast.error());
  };

  const onPressSetting = () => {
    setIsSetting(!isSetting);
  };

  const onPressExpulsionBtn = () => {
    setIsOpenModal(true);
  };

  const patchMemberExpulsion = async () => {
    await ApiManagerV2.post(apiUrl.CONFIRM_PARTY, {
      party_id,
      confirm_accounts: checkedMembers,
      confirm: 'expulsion',
    })
      .then(res => {
        getPartyMemberList();
        setCheckedMembers([]);
        FooiyToast.message('파티원을 내보냈습니다.');
      })
      .catch(e => FooiyToast.error());
  };

  const ConfirmModal = () => {
    const toggleModal = () => {
      setIsOpenModal(false);
    };

    return (
      <Modal
        isVisible={isOpenModal}
        onBackdropPress={toggleModal}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}>
        <View
          style={{
            width: '100%',
            height: 168,
            backgroundColor: fooiyColor.W,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{...fooiyFont.Subtitle1, marginBottom: 24}}>
            선택한 유저를 내보내시겠습니까?
          </Text>
          <View
            style={{
              width: '100%',
              paddingHorizontal: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setIsOpenModal(false);
              }}
              style={{
                width: (globalVariable.width - 39) / 2,
                height: 48,
                backgroundColor: fooiyColor.W,
                borderWidth: 1,
                borderColor: fooiyColor.G200,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  ...fooiyFont.Button,
                  color: fooiyColor.G600,
                  lineHeight: Platform.select({
                    ios: 0,
                    android: null,
                  }),
                }}>
                취소
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                patchMemberExpulsion();
              }}
              activeOpacity={0.8}
              style={{
                width: (globalVariable.width - 39) / 2,
                height: 48,
                backgroundColor: fooiyColor.P500,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  ...fooiyFont.Button,
                  color: fooiyColor.W,
                  lineHeight: Platform.select({
                    ios: 0,
                    android: null,
                  }),
                }}>
                확인
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {Platform.OS === 'ios' ? (
          <View
            style={{height: insets.bottom, backgroundColor: fooiyColor.W}}
          />
        ) : null}
      </Modal>
    );
  };

  const renderItem = ({item}) => {
    const {
      account_id,
      fooiyti,
      is_owner,
      nickname,
      profile_image,
      rank,
      feed_count,
    } = item;

    const onPress = () => {
      if (isSetting && !is_owner) {
        if (checkedMembers.findIndex(elem => elem === account_id) !== -1) {
          setCheckedMembers(checkedMembers.filter(elem => elem !== account_id));
        } else {
          setCheckedMembers([...checkedMembers, account_id]);
        }
      } else {
        navigation.navigate('OtherUserPage', {
          other_account_id: account_id,
        });
      }
    };

    return isSetting && is_owner ? null : (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={{marginBottom: 16}}>
        <View
          style={{
            width: '100%',
            height: 56,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* img */}
            <ResizeImage
              uri={profile_image}
              size={resizeImageType.SMALL}
              imageStyle={{
                width: 56,
                height: 56,
                borderRadius: 100,
                marginRight: 8,
              }}
            />
            {/* info */}
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 4,
                }}>
                {is_owner ? (
                  <View style={{marginRight: 4}}>
                    <Ic_crown_P500 />
                  </View>
                ) : null}
                <Text style={{...fooiyFont.Subtitle3, color: fooiyColor.G800}}>
                  {nickname}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    height: 18,
                    borderWidth: 1,
                    borderColor: fooiyColor.P500,
                    borderRadius: 4,
                    paddingHorizontal: 6,
                    marginRight: 4,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      ...fooiyFont.Subtitle4,
                      color: fooiyColor.P500,
                      lineHeight: Platform.select({
                        ios: 0,
                        android: 14,
                      }),
                    }}>
                    {fooiyti}
                  </Text>
                </View>
                <View
                  style={{
                    height: 18,
                    borderWidth: 1,
                    borderColor: fooiyColor.G400,
                    borderRadius: 4,
                    paddingHorizontal: 6,
                    marginRight: 4,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      ...fooiyFont.Subtitle4,
                      color: fooiyColor.G400,
                      lineHeight: Platform.select({
                        ios: 0,
                        android: 14,
                      }),
                    }}>
                    피드 {feed_count}
                  </Text>
                </View>
                <Rank
                  containerStyle={{height: 18, borderRadius: 4}}
                  rank={rank}
                  font={fooiyFont.Subtitle4}
                />
              </View>
            </View>
          </View>
          {isSetting ? (
            checkedMembers.findIndex(elem => elem === account_id) !== -1 ? (
              <Ic_check_24_P500 />
            ) : (
              <Ic_uncheck_G400 />
            )
          ) : (
            <Ic_arrow_right_regular_24_G600 />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const ListEmptyComponent = () => {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <Text
          style={{
            ...fooiyFont.Body1,
            color: fooiyColor.G600,
            textAlign: 'center',
          }}>
          검색 결과가 없어요.{'\n'}철자와 띄어쓰기를 확인해보세요!
        </Text>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{backgroundColor: fooiyColor.W, flex: 1}}>
        <StackHeader
          title={'파티원 목록'}
          owner_id={owner_id}
          onPressSetting={onPressSetting}
        />
        {/* Body */}
        <View
          style={{
            width: '100%',
            height: Platform.select({
              ios: globalVariable.height - insets.top - insets.bottom - 56,
              android: globalVariable.height - insets.top - insets.bottom - 56,
            }),
            paddingHorizontal: 16,
          }}>
          {members.length === 1 && isSetting ? null : (
            <SearchBar
              value={value}
              setValue={setValue}
              placeholder={'유저를 검색해보세요!'}
              autoFocus={false}
            />
          )}
          {members.length !== 1 || !isSetting ? (
            <FlatList
              data={filteredMembers}
              renderItem={item => renderItem(item)}
              numColumns={1}
              keyExtractor={item => String(item.account_id)}
              ListEmptyComponent={ListEmptyComponent}
            />
          ) : (
            <View
              style={{
                height: Platform.select({
                  ios:
                    globalVariable.height -
                    insets.top -
                    insets.bottom -
                    56 -
                    56,
                  android:
                    globalVariable.height -
                    insets.top -
                    insets.bottom -
                    56 -
                    56 -
                    34,
                }),
              }}>
              <Text
                style={{
                  ...fooiyFont.Subtitle2,
                  color: fooiyColor.G600,
                  textAlign: 'center',
                  marginTop: 16,
                }}>
                아직 파티원이 없어요.
              </Text>
            </View>
          )}
          {isSetting ? (
            <TouchableOpacity
              onPress={checkedMembers.length > 0 ? onPressExpulsionBtn : null}
              activeOpacity={0.8}
              style={
                checkedMembers.length > 0
                  ? styles.expulsionBtnActive
                  : styles.expulsionBtnNoActive
              }>
              <Text
                style={
                  checkedMembers.length > 0
                    ? styles.expulsionBtnTextActive
                    : styles.expulsionBtnTextNoActive
                }>
                내보내기
              </Text>
            </TouchableOpacity>
          ) : null}
          {checkedMembers.length > 0 ? <ConfirmModal /> : null}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  expulsionBtnActive: {
    width: '100%',
    height: 56,
    backgroundColor: fooiyColor.P500,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 16,
    bottom: 0,
    marginBottom: Platform.select({
      ios: null,
      android: 34,
    }),
  },
  expulsionBtnNoActive: {
    width: '100%',
    height: 56,
    backgroundColor: fooiyColor.G100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 16,
    bottom: 0,
    marginBottom: Platform.select({
      ios: null,
      android: 34,
    }),
  },
  expulsionBtnTextActive: {
    ...fooiyFont.Button,
    color: fooiyColor.W,
    lineHeight: Platform.select({
      ios: 0,
      android: null,
    }),
  },
  expulsionBtnTextNoActive: {
    ...fooiyFont.Button,
    color: fooiyColor.G300,
    lineHeight: Platform.select({
      ios: 0,
      android: null,
    }),
  },
});
