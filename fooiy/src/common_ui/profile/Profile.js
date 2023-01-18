import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ApiMangerV1} from '../../common/api/v1/ApiMangerV1';
import {apiUrl} from '../../common/Enums';
import {fooiyColor} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';
import {StackHeader} from '../headers/StackHeader';
import FeedList from './FeedList';

const Profile = props => {
  const {other_account_id} = props.route.params;

  const [userInfo, setUserInfo] = useState({});

  const getAccountInfo = async data => {
    await ApiMangerV1.get(apiUrl.ACCOUNT_INFO, {
      params: {
        other_account_id,
      },
    }).then(res => {
      setUserInfo(res.data.payload.account_info);
    });
  };

  useEffect(() => {
    getAccountInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.rootContainer}>
      <StackHeader title={userInfo.nickname} />
      <FeedList otherUserInfo={userInfo} navigation={props.navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: fooiyColor.W,
  },
  headerContainer: {
    position: 'absolute',
    width: globalVariable.width,
    height: globalVariable.height * 0.5,
  },
});

export default Profile;
