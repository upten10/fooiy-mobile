import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {Text, View} from 'react-native';
import {PartyCreateComplete} from '../../../../assets/icons/svg';
import {ApiManagerV2} from '../../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../../common/Enums';
import FooiyToast from '../../../common/FooiyToast';
import {fooiyColor, fooiyFont} from '../../../common/globalStyles';
import {globalVariable} from '../../../common/globalVariable';

export default props => {
  const {party_image, party_name, introduction, imageType} = props.route.params;
  const navigation = useNavigation();
  const formData = new FormData();

  const createForm = () => {
    formData.append('party_name', party_name);
    formData.append('introduction', introduction);
    party_image &&
      formData.append('party_image', {
        uri: party_image.uri,
        name:
          party_image.filename !== null ? party_image.filename : 'image.jpg',
        type: imageType,
      });
  };

  const createParty = async () => {
    await ApiManagerV2.post(apiUrl.CREATE_PARTY, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: (formData, headers) => {
        return formData;
      },
    }).catch(e => FooiyToast.error());
  };

  useEffect(() => {
    createForm();
    createParty();
    setTimeout(() => navigation.navigate('Party', {refresh: true}), 1500);
  }, []);

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
