import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Map, PartyProfileArrow} from '../../../../assets/icons/svg';
import {fooiyColor, fooiyFont} from '../../../common/globalStyles';
import {globalVariable} from '../../../common/globalVariable';
import Rank from '../../../common_ui/Rank';
import {ApiManagerV2} from '../../../common/api/v2/ApiManagerV2';
import {apiUrl, resizeImageType} from '../../../common/Enums';
import FooiyToast from '../../../common/FooiyToast';
import ResizeImage from '../../../common_ui/ResizeImage';

//  ("subscribe", "가입 중"),
// ("confirm", "검수"),
// ("unsubscribe", "미가입"),
// ("reject", "반려"),
// ("expulsion", "추방"),

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
    waiting_join_count,
    party_id,
  } = props.partyInfo;

  const navigation = useNavigation();

  const [joinState, setJoinState] = useState('');

  useEffect(() => {
    setJoinState(join_state);
  }, [join_state]);

  const joinParty = async () => {
    await ApiManagerV2.post(apiUrl.JOIN_PARTY, {
      party_id,
    })
      .then(res => setJoinState('confirm'))
      .catch(e => FooiyToast.error());
  };

  const onPressSubscribeBtn = () => {
    switch (join_state) {
      case 'subscribe':
        break;
      case 'confirm':
        break;
      default:
        joinParty();
        break;
    }
  };

  // 가입 버튼
  const SubscribeBtn = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPressSubscribeBtn}
        style={[
          styles.subscribe_common_text_container,
          joinState === 'subscribe'
            ? styles.subscribe_subscribed_text_container
            : joinState === 'confirm'
            ? styles.subscribe_confirm_text_container
            : styles.subscribe_unsubscribe_text_container,
        ]}>
        <Text
          style={[
            styles.subscribe_common_text,
            joinState === 'subscribe'
              ? styles.subscribe_subscribed_text
              : joinState === 'confirm'
              ? styles.subscribe_confirm_text
              : styles.subscribe_unsubscribe_text,
          ]}>
          {joinState === 'subscribe'
            ? '가입함'
            : joinState === 'confirm'
            ? '승인 대기'
            : '가입 신청'}
        </Text>
      </TouchableOpacity>
    );
  };

  const onPressPartyMemberList = () => {
    navigation.navigate('PartyMemberList', {
      party_id,
      owner_id,
    });
  };

  const onPressMap = () => {
    navigation.navigate('PartyMap', {
      party_id,
      name,
    });
  };

  return (
    <View style={{paddingHorizontal: 16, paddingTop: 16}}>
      {/* 프로필 사진 있는 로우 */}
      <View
        style={{flexDirection: 'row', marginBottom: 16, alignItems: 'center'}}>
        <ResizeImage
          uri={image}
          size={resizeImageType.SMALL}
          imageStyle={styles.profile_image}
        />
        <View>
          <View style={{flexDirection: 'row', marginBottom: 16}}>
            <View style={styles.party_info_text_container}>
              <Text style={styles.party_info_text}>피드 {feed_count}개</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onPressPartyMemberList}
              style={[
                styles.party_info_text_container,
                styles.account_count_container,
              ]}>
              <Text style={[styles.party_info_text, styles.account_count_text]}>
                파티원 {account_count}명
              </Text>
              <PartyProfileArrow />
            </TouchableOpacity>
          </View>
          <Text style={{...fooiyFont.Subtitle1}}>{name}</Text>
        </View>
      </View>
      {/* 파티장 정보 */}
      <View
        style={{flexDirection: 'row', marginBottom: 4, alignItems: 'center'}}>
        <Text
          style={{
            ...fooiyFont.Subtitle3,
            color: fooiyColor.G800,
            marginRight: 4,
          }}>
          {owner}
        </Text>
        <Rank
          containerStyle={{height: 18, marginRight: 4, borderRadius: 4}}
          rank={owner_rank}
          font={fooiyFont.Subtitle4}
        />
        <View
          style={{
            borderWidth: 1,
            borderColor: fooiyColor.G200,
            borderRadius: 4,
          }}>
          <Text
            style={{
              ...fooiyFont.Subtitle4,
              color: fooiyColor.G600,
              marginHorizontal: 6,
            }}>
            {owner_fooiyti}
          </Text>
        </View>
      </View>
      {/* 소개글 */}
      {introduction === null ? null : (
        <View>
          <Text style={{...fooiyFont.Body2, color: fooiyColor.G600}}>
            {introduction}
          </Text>
        </View>
      )}
      {/* 버튼 */}
      <View
        style={{
          flexDirection: 'row',
          marginTop: 16,
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 24,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPressMap}
          style={{
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: fooiyColor.G200,
            paddingHorizontal: 28,
            paddingVertical: 12,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            height: 48,
          }}>
          <Map />
          <Text
            style={{
              ...fooiyFont.Button,
              color: fooiyColor.G500,
              marginLeft: 8,
              lineHeight: Platform.select({
                ios: 0,
                android: 20,
              }),
            }}>
            지도
          </Text>
        </TouchableOpacity>
        {/* 가입 버튼 */}
        <SubscribeBtn />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profile_image: {
    width: 80,
    height: 80,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: fooiyColor.G200,
    marginRight: 16,
  },
  party_info_text_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: fooiyColor.G200,
    borderRadius: 8,
    marginRight: 8,
  },
  party_info_text: {
    ...fooiyFont.Subtitle3,
    color: fooiyColor.G600,
    marginHorizontal: 10,
    marginVertical: 4,
  },
  account_count_container: {
    paddingLeft: 10,
    paddingRight: 4,
  },
  account_count_text: {
    marginHorizontal: 0,
  },
  subscribe_common_text_container: {
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subscribe_common_text: {
    ...fooiyFont.Button,
    width: globalVariable.width - 32 - 117 - 8 - 32,
    textAlign: 'center',
    lineHeight: Platform.select({
      ios: 0,
      android: null,
    }),
  },
  subscribe_unsubscribe_text_container: {
    backgroundColor: fooiyColor.P500,
  },
  subscribe_unsubscribe_text: {
    color: fooiyColor.W,
  },
  subscribe_confirm_text_container: {
    borderWidth: 1,
    borderColor: fooiyColor.P500,
  },
  subscribe_confirm_text: {
    color: fooiyColor.P500,
  },
  subscribe_subscribed_text_container: {
    borderWidth: 1,
    borderColor: fooiyColor.G200,
  },
  subscribe_subscribed_text: {
    color: fooiyColor.G500,
  },
});
