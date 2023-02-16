import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {GoBackArrow} from '../../assets/icons/svg';
import {ApiManagerV2} from '../common/api/v2/ApiManagerV2';
import {apiUrl} from '../common/Enums';
import FooiyToast from '../common/FooiyToast';
import {fooiyColor, fooiyFont} from '../common/globalStyles';
import UI_Feed from '../common_ui/feed/UI_Feed';

const Share = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [item, setItem] = useState();
  const [isLogin, setisLogin] = useState(false);

  const check_login = async () => {
    const value = await AsyncStorage.getItem('auth');
    if (value) {
      setisLogin(true);
    }
  };

  const getFeedId = async () => {
    ApiManagerV2.interceptors.request.use(
      async config => {
        config.headers.Authorization =
          'fooiy!@123hzqlfhrmdls02WEBasejkfbkajsbefkj123123123fassjefbkasjb!@*sgdrkln1aeg123';
        return config;
      },
      error => {
        // console.log("requestError====>", error);
      },
    );
    await ApiManagerV2.get(apiUrl.RETRIEVE_FEED, {
      params: {
        feed_id: route.params.feed_id,
      },
    })
      .then(res => {
        setItem(res.data.payload.feed);
      })
      .catch(e => FooiyToast.error());
  };
  useEffect(() => {
    getFeedId();
    check_login();
    SplashScreen.hide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <View
        style={{
          height: 56,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            isLogin
              ? navigation.navigate('TabNavigator')
              : navigation.navigate('Login');
          }}
          style={{position: 'absolute', left: 16}}>
          <GoBackArrow />
        </TouchableOpacity>
        <Text style={{...fooiyFont.Subtitle2, color: fooiyColor.B}}>피드</Text>
      </View>
      <View style={{backgroundColor: 'white', height: '100%'}}>
        {item && <UI_Feed {...item} isLogin={isLogin} />}
      </View>
    </SafeAreaView>
  );
};

export default Share;
