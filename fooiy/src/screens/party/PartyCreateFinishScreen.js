import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {Text, View} from 'react-native';
import {PartyCreateComplete} from '../../../assets/icons/svg';
import {ApiManagerV2} from '../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../common/Enums';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';

export default props => {
  const {params} = props.route;
  const navigation = useNavigation();

  const createParty = useCallback(async () => {
    await ApiManagerV2.post(apiUrl.CREATE_PARTY, {
      ...params,
    }).then(res => console.log('파티 생성'));
  }, [params]);

  useEffect(() => {
    createParty();
    setTimeout(() => navigation.navigate('Party', {refresh: true}), 1500);
  }, [navigation, createParty]);

  return (
    <View
      style={{
        width: globalVariable.width,
        height: globalVariable.height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: fooiyColor.W,
      }}>
      <Text
        style={{
          ...fooiyFont.H3,
          color: fooiyColor.G800,
          textAlign: 'center',
          marginBottom: 16,
        }}>
        파티가{'\n'}생성되었어요!
      </Text>
      <PartyCreateComplete />
    </View>
  );
};
