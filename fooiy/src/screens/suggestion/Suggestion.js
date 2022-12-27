import React from 'react';
import {Text, StyleSheet, View, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { login, logout, getProfile as getKakaoProfile, unlink } from '@react-native-seoul/kakao-login';

const Suggestion = () => {

  const signOutWithKakao = async () => {
    try {
      const message = await logout();

      console.log(11)
    } catch (err) {
      console.error('signOut error', err);
    }
  };

  return (
    <SafeAreaView style={styles.container}> 
      <View style={styles.container}>
        <Pressable
          style={styles.button}
          onPress={() => signOutWithKakao()}
        >
          <Text style={styles.text}>
            카카오 로그아웃
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
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
  },
});

export default Suggestion;
