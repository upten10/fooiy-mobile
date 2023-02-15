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
  const [openParties, setOpenParties] = useState(false);
  const [partyList, setPartyList] = useState([]);
  const getMyParties = async () => {
    await ApiManagerV2.get(apiUrl.MY_PARTY_LIST, {
      params: {feed_id: feed_id ? feed_id : null},
    }).then(res => {
      setPartyList(res.data.payload.party_list);
    });
  };

  useEffect(() => {
    if (partyList.length < 3 && partyList.length !== 0) {
      setOpenParties(true);
    }
  }, [partyList]);

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
    if (is_subscribe) {
      setSelectedPartyList(selectedPartyList.filter(e => e !== party_id));
    } else {
      if (selectedPartyList.length < 10) {
        setSelectedPartyList([...selectedPartyList, party_id]);
      }
    }
  };
  const PartyUI = item => {
    const is_subscribe = isSubscribe(item.party_id);
    return (
      <View key={item.index}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onClickParty(is_subscribe, item.party_id)}>
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
              {item.name}
            </Text>
            {is_subscribe ? <Check /> : <Uncheck />}
          </View>
        </TouchableOpacity>
        <Margin h={16} />
      </View>
    );
  };

  const Parties = () => {
    if (openParties) {
      return partyList.map((item, index) => {
        return <PartyUI {...item} index={index} />;
      });
    } else {
      return (
        <>
          <PartyUI {...partyList[0]} index={0} />
          <PartyUI {...partyList[1]} index={1} />
          <TouchableOpacity onPress={() => setOpenParties(true)}>
            <View style={[styles.party_container, {justifyContent: 'center'}]}>
              <Text style={styles.party_all_button}>전체보기</Text>
            </View>
          </TouchableOpacity>
        </>
      );
    }
  };

  if (partyList.length !== 0) {
    return (
      <View>
        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          <Text style={styles.title}>공유할 파티</Text>
          <Margin w={8} />
          <Text style={styles.count}>({selectedPartyList.length}/10)</Text>
        </View>
        <Margin h={16} />
        <Parties />
        <Margin h={16} />
        <View style={styles.commnet_notice}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Notice />
            <Text style={styles.commnet_notice_text}>
              선택하지 않으면 개인 피드에만 게시돼요.
            </Text>
          </View>
          <Margin h={8} />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Notice />
            <Text style={styles.commnet_notice_text}>
              피드 1개당 공유할 파티는 10개만 선택할 수 있어요.
            </Text>
          </View>
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
  count: {
    ...fooiyFont.Caption1,
    color: fooiyColor.G600,
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
    borderColor: fooiyColor.G200,
  },
  party_all_button: {
    ...fooiyFont.Button,
    color: fooiyColor.G600,
    lineHeight: Platform.select({ios: 0, android: null}),
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
  },
  commnet_notice_text: {
    textAlign: 'center',
    ...fooiyFont.Caption1,
    lineHeight: Platform.select({ios: 0, android: 20}),
    marginLeft: 8,
    color: fooiyColor.G600,
  },
});
