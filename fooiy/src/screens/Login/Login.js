import {React, useState} from 'react';
import {Pressable, View, Text, StyleSheet, Platform} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import { login, getProfile as getKakaoProfile } from '@react-native-seoul/kakao-login';
import {ApiMangerV1} from '../../common/api/v1/ApiMangerV1';
import {apiUrl} from '../../common/Enums';

const Login = () => {

    const signInWithKakao = async data => {
        const token = await login();
        const profile = await getKakaoProfile();

        await ApiMangerV1.post(apiUrl.KAKAO_LOGIN, {
                social_id: profile.id,
                os: Platform.OS,
                app_version: '1.2.0',
                device_id: '6EE35198-F6C9-4739-8720-671BA1AD9F3E',
                fcm_token: '123',
        },)
    };

  return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
            <Pressable
                style={styles.button}
                onPress={() => {
                signInWithKakao();
                }}
            >
                <Text style={styles.text}>
                카카오 로그인
                </Text>
            </Pressable>
        </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "flex-end",
    alignItems: 'center',
    paddingBottom: 100
  },
  button: {
    backgroundColor: '#FEE500',
    borderRadius: 40,
    borderWidth: 1,
    width: 250,
    height: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10
  },
  text: {
    textAlign: "center"
  }
});

export default Login;
