import {React, useState} from 'react';
import {Text, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import {ApiMangerV1} from '../../common/api/v1/ApiMangerV1';
import {apiUrl} from '../../common/Enums';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {
  login,
  getProfile as getKakaoProfile,
} from '@react-native-seoul/kakao-login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RootNavigator from '../../navigation/RootNavigator';
import {getUniqueId} from 'react-native-device-info';

const Login = () => {
  const [isLogin, setisLogin] = useState(false);
  const [auth, setAuth] = useState([]);

  const signInWithKakao = async data => {
    const token = await login();
    const profile = await getKakaoProfile();
    const DEVICEID = await getUniqueId();

    await ApiMangerV1.post(apiUrl.KAKAO_LOGIN, {
      social_id: profile.id,
      os: Platform.OS,
      app_version: '1.2.0',
      device_id: DEVICEID,
      fcm_token: '123',
    }).then(res => {
      setAuth(res.data.payload.account_info.account_token);
    });
    token ? setisLogin(true) : null;
  };
  AsyncStorage.setItem('auth', auth);

  if (isLogin) {
    return <RootNavigator />;
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={signInWithKakao}>
          <Text style={styles.text}>카카오 로그인</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 100,
  },
  button: {
    backgroundColor: '#FEE500',
    borderRadius: 40,
    borderWidth: 1,
    width: 250,
    height: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
  },
  text: {
    textAlign: 'center',
  },
});

export default Login;
