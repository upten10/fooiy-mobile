import React, {useState, useEffect, useCallback, useRef} from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import MainNavigator from './MainNavigator';
import {ApiManagerV2} from '../common/api/v2/ApiManagerV2';
import {apiUrl} from '../common/Enums';
import UI_Feed from '../common_ui/feed/UI_Feed';
import {GuestFeed} from '../common_ui/feed/GuestFeed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';

const Share = () => {
  const navigation = useNavigation();
  const route = useRoute();
  console.log(route.params);

  const [item, setItem] = useState();
  const [isLogin, setisLogin] = useState(false);

  const check_login = async () => {
    const value = await AsyncStorage.getItem('auth');
    if (value) {
      setisLogin(true);
    }
    console.log(value);
    console.log(123);
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
    }).then(res => {
      setItem(res.data.payload.feed);
    });
  };
  useEffect(() => {
    getFeedId();
    check_login();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      {/* <StackHeader title={'피드'} /> */}
      <View
        style={{
          width: '100%',
          height: 30,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate(MainNavigator, {
              screen: 'TabNavigator',
            });
          }}
          style={{position: 'absolute', left: 16}}>
          <Image
            // style={styles.go_back_logo}
            source={require('../../assets/icons/navigation/ic_go_back.png')}
          />
        </TouchableOpacity>
        <Text>피드</Text>
      </View>
      <View style={{backgroundColor: 'white', height: '100%'}}>
        {isLogin
          ? item && <UI_Feed {...item} />
          : item && <GuestFeed {...item} />}
      </View>
    </SafeAreaView>
  );
};

export default Share;
