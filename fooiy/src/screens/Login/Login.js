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
  Ic_apple,
  Ic_kakao_talk,
  Ic_login_logo,
  Ic_login_text,
} from '../../../assets/svg';
import {ApiManagerV2} from '../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../common/Enums';
import FooiyToast from '../../common/FooiyToast';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';
import {userInfoAction} from '../../redux/actions/userInfoAction';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLogin, setisLogin] = useState(false);
  const [auth, setAuth] = useState('');
  const [isJoin, setIsJoin] = useState(false);

  useEffect(() => {
    route();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, isLogin]);

  useEffect(() => {
    auth !== '' ? AsyncStorage.setItem('auth', auth) : null;
  }, [auth, isLogin]);

  const getAccountInfo = async data => {
    await ApiManagerV2.get(apiUrl.ACCOUNT_INFO, {
      params: {},
    })
      .then(res => {
        if (res.data.payload.account_info.fooiyti === null) {
          navigation.navigate('Agree');
        } else {
          dispatch(userInfoAction.init(res.data.payload.account_info));
          navigation.navigate('TabNavigator');
        }
      })
      .catch(e => FooiyToast.error());
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
    })
      .then(res => {
        setAuth(res.data.payload.account_info.account_token);
      })
      .catch(e => FooiyToast.error());
    token ? setisLogin(true) : null;
  };

  const onAppleButtonPress = async () => {
    const DEVICEID = await getUniqueId();

    const responseObject = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    ApiManagerV2.post(apiUrl.APPLE_LOGIN, {
      social_id: responseObject.user,
      os: Platform.OS,
      app_version: globalVariable.app_version,
      device_id: DEVICEID,
      fcm_token: '0',
    })
      .then(res => {
        setAuth(res.data.payload.account_info.account_token);
        appleAuth.State.AUTHORIZED === 1 ? setisLogin(true) : null;
      })
      .catch(e => FooiyToast.error());
  };

  if (Platform.OS === 'android') {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <View style={styles.info_container}>
            <Ic_login_text style={styles.login_img} />
            <Ic_login_logo style={styles.login_icon} />
          </View>
          <TouchableOpacity
            style={styles.kakao_btn_android}
            onPress={signInWithKakao}
            activeOpacity={0.8}>
            <Ic_kakao_talk style={styles.kakaotalk_icon} />
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
            <Ic_login_text style={styles.login_img} />
            <Ic_login_logo style={styles.login_icon} />
          </View>
          <TouchableOpacity
            style={styles.kakao_btn}
            onPress={signInWithKakao}
            activeOpacity={0.8}>
            <Ic_kakao_talk style={styles.kakaotalk_icon} />
            <Text style={styles.kakao_text}>카카오로 시작하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.apple_btn}
            onPress={() => onAppleButtonPress()}
            activeOpacity={0.8}>
            <Ic_apple style={styles.apple_icon} />
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
    ...fooiyFont.Button,
    color: fooiyColor.B,
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
    ...fooiyFont.Button,
    color: fooiyColor.W,
    letterSpacing: 0.5,
    alignItems: 'center',
  },
});

export default Login;
