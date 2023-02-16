import AsyncStorage from '@react-native-async-storage/async-storage';
import {isEmpty} from 'lodash';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ApiManagerV2} from '../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../common/Enums';
import FooiyToast from '../../common/FooiyToast';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';

const AnnouncementModal = props => {
  const insets = useSafeAreaInsets();

  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isOpenAnnouncementModal, setIsOpenAnnouncementModal] = useState(false);
  const [update, setUpdate] = useState({});
  const [emergency, setEmergency] = useState({});
  const [announcement, setAnnouncement] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dontSeeAnn, setDontSeeAnn] = useState(true);

  useEffect(() => {
    getInit();
    getAnnouncement();
  }, []);

  useEffect(() => {
    if (!isEmpty(update) || !isEmpty(emergency)) {
      setIsOpenUpdateModal(true);
    } else if (isEmpty(update) && isEmpty(emergency) && !dontSeeAnn) {
      setIsOpenAnnouncementModal(true);
    }
  }, [emergency, update]);

  const checkAnnouncementId = async currentAnnouncement => {
    const announcement_id =
      (await AsyncStorage.getItem('announcement_id')) || 0;
    const checkArr = currentAnnouncement.filter(
      announcement => announcement.id > announcement_id * 1,
    );
    if (checkArr.length === 0) {
      setDontSeeAnn(true);
    } else {
      setDontSeeAnn(false);
    }
  };

  const getInit = () => {
    ApiManagerV2.get(apiUrl.INIT, {
      params: {
        version: globalVariable.app_version,
        os: Platform.OS,
      },
    })
      .then(res => {
        setUpdate(res.data.payload.update_info ?? {});
        setEmergency(res.data.payload.emergency_notice ?? {});
      })
      .catch(e => FooiyToast.error());
  };

  const getAnnouncement = () => {
    ApiManagerV2.get(apiUrl.ANNOUNCEMENT, {})
      .then(res => {
        setAnnouncement(res.data.payload.notice_list);
        checkAnnouncementId(res.data.payload.notice_list);
      })
      .catch(e => FooiyToast.error());
  };

  const onPressDontSee = () => {
    let max_id = announcement
      .map(o => o.id)
      .reduce((max, curr) => (max < curr ? curr : max));
    AsyncStorage.setItem('announcement_id', `${max_id}`);
    setIsOpenAnnouncementModal(false);
  };

  const onMomentumScrollEnd = event => {
    const index = Math.floor(
      Math.floor(event.nativeEvent.contentOffset.x) /
        Math.floor(event.nativeEvent.layoutMeasurement.width),
    );
    setCurrentIndex(index);
  };

  const Update = () => {
    const {change_history, is_force_update, update_title} = update;
    const {id, title, content} = emergency;

    const onPressLater = () => {
      if (isEmpty(emergency)) {
        setIsOpenUpdateModal(false);
      }
    };

    const onPressUpdate = async () => {
      const link = Platform.select({
        ios: 'itms-apps://apps.apple.com/us/app/%ED%91%B8%EC%9D%B4-%EB%82%B4-%EC%86%90%EC%95%88%EC%9D%98-%EB%AA%A8%EB%93%A0-%EC%9D%8C%EC%8B%9D%EC%A0%90/id1640024571',
        android:
          'https://play.google.com/store/apps/details?id=com.fooiy.fooiy',
      });
      Linking.canOpenURL(link).then(
        supported => {
          supported && Linking.openURL(link);
        },
        err => console.log(err),
      );
    };

    return (
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 36,
        }}>
        <Text style={{...fooiyFont.H4, marginBottom: 8}}>
          {update_title ?? title}
        </Text>
        <Text
          style={{
            ...fooiyFont.Body1,
            color: fooiyColor.G600,
            marginBottom: 24,
          }}>
          {change_history ?? content}
        </Text>
        {isEmpty(update) ? null : (
          <TouchableOpacity
            onPress={onPressUpdate}
            activeOpacity={0.8}
            style={{
              width: '100%',
              height: 56,
              borderRadius: 8,
              backgroundColor: fooiyColor.P500,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                ...fooiyFont.Button,
                color: fooiyColor.W,
                lineHeight: Platform.select({
                  ios: 0,
                  android: null,
                }),
              }}>
              업데이트
            </Text>
          </TouchableOpacity>
        )}
        {is_force_update || !isEmpty(emergency) ? null : (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPressLater}
            style={{
              width: '100%',
              height: 56,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: fooiyColor.G200,
              backgroundColor: fooiyColor.W,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 16,
            }}>
            <Text
              style={{
                ...fooiyFont.Button,
                color: fooiyColor.G600,
                lineHeight: Platform.select({
                  ios: 0,
                  android: null,
                }),
              }}>
              나중에 하기
            </Text>
          </TouchableOpacity>
        )}
        <View style={{height: 36}} />
      </View>
    );
  };

  const IndexBox = useCallback(() => {
    return (
      <View
        style={{
          position: 'absolute',
          right: 16,
          top: 16,
          backgroundColor: fooiyColor.B,
          opacity: 0.8,
          width: 46,
          height: 28,
          borderRadius: 14,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{...fooiyFont.Subtitle4, color: fooiyColor.W}}>
          {currentIndex + 1} / {announcement.length}
        </Text>
      </View>
    );
  }, [currentIndex, announcement.length]);

  const AnnouncementList = useCallback(() => {
    return (
      <View>
        <FlatList
          data={announcement}
          numColumns={1}
          renderItem={Announcement}
          style={{
            width: globalVariable.width,
            height: globalVariable.width * (4 / 5),
            borderTopStartRadius: 16,
            borderTopEndRadius: 16,
          }}
          horizontal
          pagingEnabled
          bounces={false}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onMomentumScrollEnd}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 68,
            paddingHorizontal: 16,
            paddingVertical: 24,
          }}>
          <TouchableOpacity activeOpacity={0.8} onPress={onPressDontSee}>
            <Text style={{...fooiyFont.Subtitle3, color: fooiyColor.G400}}>
              다시보지 않기
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setIsOpenAnnouncementModal(false);
            }}>
            <Text style={{...fooiyFont.Subtitle3, color: fooiyColor.G600}}>
              닫기
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }, [announcement, Announcement]);

  const Announcement = useCallback(props => {
    const {id, image} = props.item;
    return (
      <View
        style={{
          width: globalVariable.width,
          height: globalVariable.width * (4 / 5),
        }}>
        <FastImage
          source={{uri: image}}
          style={{
            flex: 1,
            borderTopStartRadius: Platform.select({
              android: 16,
              ios: null,
            }),
            borderTopEndRadius: Platform.select({
              android: 16,
              ios: null,
            }),
          }}
          resizeMode={'cover'}
        />
      </View>
    );
  }, []);

  return (
    <>
      {!isEmpty(update) || !isEmpty(emergency) ? (
        <Modal
          style={styles.modal_container}
          isVisible={isOpenUpdateModal}
          onModalHide={() => {
            if (!dontSeeAnn) {
              setIsOpenAnnouncementModal(true);
            }
          }}
          onBackdropPress={() => {
            if (!update.is_force_update && isEmpty(emergency)) {
              setIsOpenUpdateModal(false);
            }
          }}>
          <View style={styles.container}>
            <Update />
          </View>
          <View
            style={{backgroundColor: fooiyColor.W, height: insets.bottom}}
          />
        </Modal>
      ) : null}

      {dontSeeAnn ? null : (
        <Modal
          style={styles.modal_container}
          isVisible={isOpenAnnouncementModal}
          onBackdropPress={() => {
            setIsOpenAnnouncementModal(false);
          }}>
          <View style={styles.container}>
            <AnnouncementList />
            <IndexBox />
          </View>
          <View
            style={{backgroundColor: fooiyColor.W, height: insets.bottom}}
          />
        </Modal>
      )}
    </>
  );
};

export default memo(AnnouncementModal);

const styles = StyleSheet.create({
  modal_container: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: fooiyColor.W,
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    paddingBottom: Platform.OS === 'android' ? 16 : 0,
  },
});
