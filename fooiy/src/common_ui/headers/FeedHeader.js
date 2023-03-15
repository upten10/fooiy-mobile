import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Ic_arrow_bottom_regular_G300,
  Ic_arrow_top_regular_G300,
  Ic_cafe_28_G400,
  Ic_dining_28_G400,
  Ic_logo,
  Ic_notifications_badge_G400,
  Ic_notifications_G400,
  Ic_search_G400,
} from '../../../assets/svg';
import {ApiManagerV2} from '../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../common/Enums';
import FooiyToast from '../../common/FooiyToast';
import {globalVariable} from '../../common/globalVariable';

const FeedHeader = props => {
  // Push Notification
  const [isPush, setIsPush] = useState(false);
  const [pushCount, setPushCount] = useState(0);

  const pushHandler = async () => {
    const cnt = await AsyncStorage.getItem('push_count');
    await ApiManagerV2.get(apiUrl.PUSH_NOTIFICATION)
      .then(res => {
        if (res.data.payload.push_notifications.total_count > cnt) {
          setPushCount(res.data.payload.push_notifications.total_count - cnt);
          setIsPush(true);
        } else {
          setIsPush(false);
        }
      })
      .catch(e => FooiyToast.error());
  };
  useEffect(() => {
    pushHandler();
  }, []);
  // Push Notification

  const {category, open, setOpen} = props;
  const navigation = useNavigation();

  const search = () => {
    navigation.navigate('Search');
  };
  const notification = pushCount => {
    navigation.navigate('Notification', pushCount);
    setPushCount(0);
  };

  return (
    <View>
      <View style={styles.header_container}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => setOpen(!open)}>
          <View style={styles.logo}>
            <Ic_logo />
            <View style={styles.category}>
              {category === globalVariable.category_cafe ? (
                <Ic_cafe_28_G400 />
              ) : (
                <Ic_dining_28_G400 />
              )}
            </View>
            {open ? (
              <Ic_arrow_top_regular_G300 style={{marginLeft: 2}} />
            ) : (
              <Ic_arrow_bottom_regular_G300 style={{marginLeft: 2}} />
            )}
          </View>
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{marginRight: 16}}
            onPress={() => {
              notification(pushCount);
              setIsPush(false);
            }}>
            {isPush ? (
              <Ic_notifications_badge_G400 />
            ) : (
              <Ic_notifications_G400 />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              search();
            }}>
            <Ic_search_G400 />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FeedHeader;

const styles = StyleSheet.create({
  header_container: {
    height: 56,
    paddingLeft: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 16,
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  category: {
    marginLeft: 4,
  },
});
