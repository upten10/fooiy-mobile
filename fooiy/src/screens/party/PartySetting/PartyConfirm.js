import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  PartyConfirmCheck,
  PartyConfirmUncheck,
} from '../../../../assets/icons/svg';
import {ApiManagerV2} from '../../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../../common/Enums';
import {fooiyColor, fooiyFont} from '../../../common/globalStyles';
import {globalVariable} from '../../../common/globalVariable';
import {StackHeader} from '../../../common_ui/headers/StackHeader';
import Rank from '../../../common_ui/Rank';

export default props => {
  const {party_id} = props.route.params;

  const insets = useSafeAreaInsets();

  const [partyConfirmList, setPartyConfirmList] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isAccept, setIsAccept] = useState(false);

  useEffect(() => {
    getPartyConfirm();
  }, []);

  const getPartyConfirm = async () => {
    await ApiManagerV2.get(apiUrl.PARTY_MEMBER_LIST, {
      params: {
        party_id,
        type: 'confirm',
      },
    }).then(res => setPartyConfirmList(res.data.payload.party_members));
  };

  const renderItem = ({item}) => {
    const {account_id, fooiyti, nickname, profile_image, rank} = item;

    const onPressTab = () => {
      if (checkedList.findIndex(elem => elem === account_id) === 0) {
        setCheckedList(checkedList.filter(elem => elem !== account_id));
      } else {
        setCheckedList([...checkedList, account_id]);
      }
    };

    return (
      <TouchableOpacity
        onPress={onPressTab}
        activeOpacity={0.8}
        style={{
          width: '100%',
          height: 56,
        }}>
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
            <FastImage
              source={{uri: profile_image}}
              style={{width: 56, height: 56, borderRadius: 100, marginRight: 8}}
            />
            {/* info */}
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 4,
                }}>
                <Text style={{...fooiyFont.Subtitle3, color: fooiyColor.G800}}>
                  {nickname}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
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
                        android: null,
                      }),
                    }}>
                    {fooiyti}
                  </Text>
                </View>
                <View
                  style={{
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
                        android: null,
                      }),
                    }}>
                    피드 100
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
          {checkedList.findIndex(elem => elem === account_id) === 0 ? (
            <PartyConfirmCheck />
          ) : (
            <PartyConfirmUncheck />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorComponent = () => {
    return <View style={{height: 16}}></View>;
  };

  const onPressRefuse = () => {
    // postPartyConfirm('unsubscribe');
    if (checkedList.length > 0) {
      setIsAccept(false);
      setIsOpenModal(true);
    }
  };

  const onPressAccept = () => {
    // postPartyConfirm('subscribe');
    if (checkedList.length > 0) {
      setIsAccept(true);
      setIsOpenModal(true);
    }
  };

  const onPressFinalAccept = () => {
    if (isAccept) {
      postPartyConfirm('subscribe');
    } else {
      postPartyConfirm('reject');
    }
  };

  const postPartyConfirm = async type => {
    await ApiManagerV2.post(apiUrl.CONFIRM_PARTY, {
      party_id,
      confirm_account_id: checkedList[0],
      confirm: type,
    }).then(res => {
      setIsOpenModal(false);
      getPartyConfirm();
    });
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
            선택한 유저를 {isAccept ? '승인' : '거절'}하시겠습니까?
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
              onPress={onPressFinalAccept}
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

  const ListEmptyComponent = () => {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <Text
          style={{
            ...fooiyFont.Body1,
            color: fooiyColor.G600,
            textAlign: 'center',
          }}>
          가입 신청한 유저가 없어요.
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: fooiyColor.W}}>
      <StackHeader title={'파티 가입 신청 목록'} />
      {/* Body */}
      <View
        style={{
          width: '100%',
          height: globalVariable.height - insets.top - insets.bottom - 56,
          paddingHorizontal: 16,
          paddingTop: 16,
        }}>
        <FlatList
          data={partyConfirmList}
          renderItem={item => renderItem(item)}
          numColumns={1}
          keyExtractor={item => {
            String(item.account_id);
          }}
          ItemSeparatorComponent={ItemSeparatorComponent}
          ListEmptyComponent={ListEmptyComponent}
        />
        {partyConfirmList.length > 0 ? (
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              height: 48,
              justifyContent: 'space-between',
              paddingBottom: Platform.select({
                ios: 0,
                android: 34,
              }),
            }}>
            <TouchableOpacity
              onPress={onPressRefuse}
              activeOpacity={0.8}
              style={{
                width: (globalVariable.width - 39) / 2,
                height: '100%',
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
                거절
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onPressAccept}
              activeOpacity={0.8}
              style={{
                width: (globalVariable.width - 39) / 2,
                height: '100%',
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
                승인
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
      {checkedList.length > 0 ? <ConfirmModal /> : null}
    </SafeAreaView>
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
