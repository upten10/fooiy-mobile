import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {ApiManagerV2} from '../../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../../common/Enums';
import {fooiyColor} from '../../../common/globalStyles';
import {globalVariable} from '../../../common/globalVariable';
import {StackHeader} from '../../../common_ui/headers/StackHeader';
import PartyProfileHeader from './PartyProfileHeader';

export default props => {
  const {party_id} = props.route.params;

  const insets = useSafeAreaInsets();

  const [partyInfo, setPartyInfo] = useState({});
  const [partyFeeds, setPartyFeeds] = useState([]);

  useEffect(() => {
    getPartyInfo();
  }, []);

  const getPartyInfo = async () => {
    await ApiManagerV2.get(apiUrl.PARTY_INFO, {
      params: {
        party_id,
      },
    }).then(res => {
      setPartyInfo(res.data.payload.party_info);
    });
  };

  return (
    <SafeAreaView style={{backgroundColor: fooiyColor.W}}>
      <StackHeader title={partyInfo.name} />
      {/* Body */}
      <View
        style={{
          width: '100%',
          height:
            globalVariable.height -
            insets.top -
            insets.bottom -
            globalVariable.tabBarHeight -
            56,
        }}>
        <FlatList
          ListHeaderComponent={<PartyProfileHeader partyInfo={partyInfo} />}
        />
      </View>
    </SafeAreaView>
  );
};
