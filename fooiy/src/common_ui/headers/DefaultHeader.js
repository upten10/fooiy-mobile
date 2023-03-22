import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {
  Logo,
  Notification,
  Notification_Push,
  Search_Icon,
} from '../../../assets/icons/svg';
import {ApiManagerV2} from '../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../common/Enums';
import FooiyToast from '../../common/FooiyToast';
import {globalVariable} from '../../common/globalVariable';

export const DefaultHeader = props => {
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

  const navigation = useNavigation();

  const {flatListRef, toTop, isParty} = props;

  const search = () => {
    navigation.navigate('Search');
  };
  const notification = pushCount => {
    navigation.navigate('Notification', pushCount);
    setPushCount(0);
  };

  const partySearch = () => {
    navigation.navigate('PartySearch');
  };

  return (
    <View>
      <View style={styles.header_container}>
        {flatListRef !== undefined ? (
          <TouchableWithoutFeedback
            onPress={() => {
              if (flatListRef.current !== null) {
                toTop();
              }
            }}>
            <View
              style={{
                width: globalVariable.width - 104,
                height: 56,
                justifyContent: 'center',
              }}>
              <Logo />
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <Logo />
        )}
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{marginRight: 16}}
            onPress={() => {
              notification(pushCount);
              setIsPush(false);
            }}>
            {isPush ? <Notification_Push /> : <Notification />}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              isParty === undefined ? search() : partySearch();
            }}>
            <Search_Icon />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header_container: {
    height: 56,
    paddingLeft: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 16,
  },
});
