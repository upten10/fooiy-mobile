import {React, useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {ApiMangerV1} from '../../common/api/v1/ApiMangerV1';
import {apiUrl} from '../../common/Enums';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  login,
  getProfile as getKakaoProfile,
} from '@react-native-seoul/kakao-login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUniqueId} from 'react-native-device-info';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {
  Kakaotalk,
  Apple,
  Login_img,
  Login_icon,
} from '../../../assets/icons/svg';
import {globalVariable} from '../../common/globalVariable';

import TabNavigator from '../../navigation/TabNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {loginActions} from '../redux/reducer/login';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const [isLogin, setisLogin] = useState(false);
  const [auth, setAuth] = useState('');

  const route = async () => {
    const value = await AsyncStorage.getItem('auth');
    if (value) {
      navigation.navigate('TabNavigator');
    }
  };

  useEffect(() => {
    route();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  const signInWithKakao = async data => {
    const token = await login();
    const profile = await getKakaoProfile();
    const DEVICEID = await getUniqueId();

    await ApiMangerV1.post(apiUrl.KAKAO_LOGIN, {
      social_id: profile.id,
      os: Platform.OS,
      app_version: globalVariable.app_version,
      device_id: DEVICEID,
      fcm_token: '123',
    }).then(res => {
      setAuth(res.data.payload.account_info.account_token);
    });
    token ? setisLogin(true) : null;
  };

  const onAppleButtonPress = async () => {
    const DEVICEID = await getUniqueId();

    const responseObject = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    console.log('responseObject:::', responseObject);
    const credentialState = await appleAuth.getCredentialStateForUser(
      responseObject.user,
    );
    if (credentialState === appleAuth.State.AUTHORIZED) {
      console.log('user is authenticated');
    }

    await ApiMangerV1.post(apiUrl.APPLE_LOGIN, {
      social_id: responseObject.user,
      os: Platform.OS,
      app_version: '1.2.0',
      device_id: DEVICEID,
      fcm_token: '123',
    }).then(res => {
      setAuth(res.data.payload.account_info.account_token);
    });
    appleAuth.State.AUTHORIZED === 1 ? setisLogin(true) : null;
  };

  auth !== '' ? AsyncStorage.setItem('auth', auth) : null;

  if (Platform.OS === 'android') {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <View style={styles.info_container}>
            <Login_img style={styles.login_img} />
            <Login_icon style={styles.login_icon} />
          </View>
          <TouchableOpacity
            style={styles.kakao_btn_android}
            onPress={signInWithKakao}>
            <Kakaotalk style={styles.kakaotalk_icon} />
            <Text style={styles.kakao_text}>카카오로 시작하기</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaProvider>
    );
  } else {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <View style={styles.info_container}>
            <Login_img style={styles.login_img} />
            <Login_icon style={styles.login_icon} />
          </View>
          <TouchableOpacity style={styles.kakao_btn} onPress={signInWithKakao}>
            <Kakaotalk style={styles.kakaotalk_icon} />
            <Text style={styles.kakao_text}>카카오로 시작하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.apple_btn}
            onPress={() => onAppleButtonPress()}>
            <Apple style={styles.apple_icon} />
            <Text style={styles.apple_text}>APPLE로 시작하기</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaProvider>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 16,
    justifyContent: 'flex-end',
  },
  info_container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
    height: 396,
  },
  login_img: {
    marginLeft: 16,
    marginBottom: 30,
  },
  login_icon: {
    marginLeft: 4,
    marginBottom: 28,
  },
  kakao_btn: {
    flexDirection: 'row',
    backgroundColor: '#FEE500',
    width: '100%',
    height: 56,
    marginTop: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kakao_btn_android: {
    flexDirection: 'row',
    backgroundColor: '#FEE500',
    width: '100%',
    height: 56,
    marginTop: 16,
    marginBottom: 70,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kakaotalk_icon: {
    position: 'absolute',
    width: 24,
    height: 24,
    left: 0,
    marginLeft: 24,
  },
  kakao_text: {
    color: '#000000',
    fontFamily: 'Pretendard-SemiBold',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 0.5,
    alignItems: 'center',
  },
  apple_btn: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    width: '100%',
    height: 56,
    marginBottom: 70,
    marginTop: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  apple_icon: {
    position: 'absolute',
    width: 24,
    height: 24,
    left: 0,
    marginLeft: 24,
  },
  apple_text: {
    color: '#FFFFFF',
    fontFamily: 'Pretendard-SemiBold',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 0.5,
    alignItems: 'center',
  },
});

export default Login;
