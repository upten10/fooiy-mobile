import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {ApiManagerV2} from '../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../common/Enums';

const Suggestion = () => {
  // const [token, setToken] = useState();

  // useEffect(() => {
  //   requestUserPermission();
  // }, [requestUserPermission]);

  // const requestUserPermission = useCallback(async () => {
  //   const authStatus = await messaging().requestPermission();

  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     const token = await messaging().getToken();
  //     console.log('Authorization token : ', token);
  //     setToken(token);
  //   }
  // }, []);

  // const patchFCM = async () => {
  //   await ApiManagerV2.patch(apiUrl.PROFILE_EDIT, {
  //     fcm_token: token,
  //   }).then(res =>
  //     console.log('patchFCM result : ', res.data.payload.account_info),
  //   );
  // };
  return (
    <SafeAreaView>
      <TouchableOpacity
        // onPress={patchFCM}
        style={{width: 100, height: 100, borderWidth: 1}}>
        <Text>FCM TOKEN EDIT !!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Suggestion;
