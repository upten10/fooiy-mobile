import {appleAuth} from '@invertase/react-native-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getProfile as getKakaoProfile,
  login,
} from '@react-native-seoul/kakao-login';
import {useNavigation} from '@react-navigation/native';
import {React, useEffect, useState} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getUniqueId} from 'react-native-device-info';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch} from 'react-redux';
import {
  Apple,
  Kakaotalk,
  Login_icon,
  Login_img,
} from '../../../assets/icons/svg';
import {ApiManagerV2} from '../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../common/Enums';
import {fooiyColor} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';
import {userInfoAction} from '../../redux/actions/userInfoAction';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLogin, setisLogin] = useState(false);
  const [auth, setAuth] = useState('');

  const getAccountInfo = async data => {
    await ApiManagerV2.get(apiUrl.ACCOUNT_INFO, {
      params: {},
    }).then(res => {
      if (res.data.payload.account_info.fooiyti === null) {
        navigation.navigate('FooiytiTestHome');
      } else {
        dispatch(userInfoAction.init(res.data.payload.account_info));
        navigation.navigate('TabNavigator');
      }
    });
  };

  const route = async () => {
    const value = await AsyncStorage.getItem('auth');
    if (value) {
      getAccountInfo();
      setTimeout(() => SplashScreen.hide(), 500);
    } else {
      setTimeout(() => SplashScreen.hide(), 500);
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

    await ApiManagerV2.post(apiUrl.KAKAO_LOGIN, {
      social_id: profile.id,
      os: Platform.OS,
      app_version: globalVariable.app_version,
      device_id: DEVICEID,
      fcm_token: '0',
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

    await ApiManagerV2.post(apiUrl.APPLE_LOGIN, {
      social_id: responseObject.user,
      os: Platform.OS,
      app_version: '1.2.0',
      device_id: DEVICEID,
      fcm_token: '0',
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
    backgroundColor: fooiyColor.W,
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
