import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ApiManagerV2} from '../common/api/v2/ApiManagerV2';
import {apiUrl} from '../common/Enums';
import FooiyToast from '../common/FooiyToast';
import {fooiyColor, fooiyFont} from '../common/globalStyles';
import elapsedTime from '../common/helpers/elapsedTime';
import {StackHeader} from './headers/StackHeader';

const Notification = props => {
  const [notification, setNotification] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const navigation = useNavigation();

  const getNotificationList = async (offset, notification) => {
    await ApiManagerV2.get(apiUrl.PUSH_NOTIFICATION, {
      params: {
        limit: 20,
        offset: offset,
      },
    })
      .then(res => {
        if (res.data.payload.push_notifications) {
          setNotification([
            ...notification,
            ...res.data.payload.push_notifications.results,
          ]);
          totalCount === 0 &&
            setTotalCount(res.data.payload.push_notifications.total_count);
        }
      })
      .catch(e => FooiyToast.error());
  };
  const loadMoreItem = () => {
    if (totalCount > offset + 20) {
      setOffset(offset + 20);
      getNotificationList(offset + 20, notification);
    }
  };
  useEffect(() => {
    getNotificationList(offset, notification);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    AsyncStorage.setItem('push_count', JSON.stringify(totalCount));
  }, [totalCount]);

  const NotificationItem = item => {
    const notificationList = item;
    return (
      <TouchableOpacity
        style={{
          padding: 16,
          justifyContent: 'center',
          backgroundColor:
            item.index > props.route.params - 1 ? fooiyColor.W : fooiyColor.P50,
        }}
        activeOpacity={0.8}
        onPress={() => {
          notification[item.index].navigation === 'feed'
            ? navigation.navigate('StorageSingleFeed', {
                feed_id: notification[item.index].navigation_id,
              })
            : notification[item.index].navigation === 'party'
            ? navigation.navigate('PartyStackNavigation', {
                params: {party_id: notification[item.index].navigation_id},
              })
            : notification[item.index].navigation === 'comment'
            ? navigation.navigate('FeedComment', {
                feed_id: notification[item.index].navigation_id,
              })
            : null;
        }}>
        <Text numberOfLines={1} style={styles.title}>
          {notificationList.title}
        </Text>
        <View style={{flexDirection: 'row'}}>
          {notificationList.image === null ? null : (
            <Image
              source={{uri: notificationList.image}}
              style={styles.image}
            />
          )}
          <View style={{flex: 1, justifyContent: 'space-between'}}>
            <Text
              numberOfLines={2}
              style={{...fooiyFont.Body2, color: fooiyColor.G600}}>
              {notificationList.content}
            </Text>
            <Text style={{...fooiyFont.Caption1, color: fooiyColor.G300}}>
              {elapsedTime(notificationList.created_at)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const ListEmptyComponent = () => {
    return (
      <>
        <View style={styles.empty}>
          <Text style={{...fooiyFont.Subtitle2, color: fooiyColor.G600}}>
            받은 알림이 없어요.
          </Text>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView
      style={{backgroundColor: fooiyColor.W, flex: 1}}
      edges={Platform.OS === 'ios' ? 'top' : null}>
      <StackHeader title={'알림'} />
      <FlatList
        data={notification}
        renderItem={({item, index}) => (
          <NotificationItem {...item} index={index} />
        )}
        ListEmptyComponent={ListEmptyComponent}
        keyExtractor={item => String(item.id)}
        bounces={false}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{marginBottom: 16}} />}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={1}
      />
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  title: {
    ...fooiyFont.Subtitle2,
    color: fooiyColor.G800,
    marginBottom: 8,
  },
  image: {
    width: 66,
    height: 66,
    borderRadius: 16,
    marginRight: 8,
  },
  empty: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
});
