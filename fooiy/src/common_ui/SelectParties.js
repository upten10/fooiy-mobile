import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Check, Notice, Uncheck} from '../../assets/icons/svg';
import {ApiManagerV2} from '../common/api/v2/ApiManagerV2';
import {apiUrl} from '../common/Enums';
import {fooiyColor, fooiyFont} from '../common/globalStyles';
import {globalVariable} from '../common/globalVariable';
import Margin from './Margin';

const SelectParties = props => {
  const {selectedPartyList, setSelectedPartyList, feed_id} = props;
  const [partyList, setPartyList] = useState([]);
  const getMyParties = async () => {
    await ApiManagerV2.get(apiUrl.MY_PARTY_LIST, {
      params: {feed_id: feed_id ? feed_id : null},
    }).then(res => {
      setPartyList(res.data.payload.party_list);
    });
  };

  useEffect(() => {
    getMyParties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const party_list = partyList.map(party => {
      return party.is_subscribe ? party.party_id : undefined;
    });
    setSelectedPartyList(party_list.filter(e => e !== undefined));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partyList]);

  const isSubscribe = id => {
    return selectedPartyList.findIndex(
      selected_party => selected_party === id,
    ) !== -1
      ? true
      : false;
  };

  const onClickParty = (is_subscribe, party_id) => {
    is_subscribe
      ? setSelectedPartyList(selectedPartyList.filter(e => e !== party_id))
      : setSelectedPartyList([...selectedPartyList, party_id]);
  };

  if (partyList.length !== 0) {
    return (
      <View>
        <Text style={styles.title}>공유할 파티</Text>
        <Margin h={16} />
        {partyList.map((party, index) => {
          const is_subscribe = isSubscribe(party.party_id);
          return (
            <View key={index}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => onClickParty(is_subscribe, party.party_id)}>
                <View
                  style={[
                    styles.party_container,
                    is_subscribe
                      ? {borderColor: fooiyColor.P500}
                      : {borderColor: fooiyColor.G200},
                  ]}>
                  <Text
                    style={[
                      styles.party_name,
                      is_subscribe
                        ? {color: fooiyColor.P500}
                        : {color: fooiyColor.G300},
                    ]}>
                    {party.name}
                  </Text>
                  {is_subscribe ? <Check /> : <Uncheck />}
                </View>
              </TouchableOpacity>
              <Margin h={16} />
            </View>
          );
        })}
        <View style={styles.commnet_notice}>
          <Notice />
          <Text style={styles.commnet_notice_text}>
            선택하지 않으면 개인 피드에만 게시돼요.
          </Text>
        </View>
      </View>
    );
  } else {
    return null;
  }
};

export default SelectParties;

const styles = StyleSheet.create({
  title: {
    ...fooiyFont.Subtitle1,
    color: fooiyColor.G800,
    lineHeight: Platform.select({ios: 0, android: 24}),
  },
  party_container: {
    width: globalVariable.width - 32,
    height: 56,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  party_name: {
    ...fooiyFont.Button,
    textAlign: 'center',
    lineHeight: Platform.select({ios: 0, android: 16}),
  },
  commnet_notice: {
    width: '100%',
    backgroundColor: fooiyColor.P50,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
  },
  commnet_notice_text: {
    textAlign: 'center',
    ...fooiyFont.Caption1,
    lineHeight: Platform.select({ios: 0, android: 20}),
    marginLeft: 8,
    color: fooiyColor.G600,
  },
});
