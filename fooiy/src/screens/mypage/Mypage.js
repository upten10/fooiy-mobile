import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MypageFeed from './MypageFeed';
import {globalVariable} from '../../common/globalVariable';
import {useDispatch} from 'react-redux';
import {ApiMangerV1} from '../../common/api/v1/ApiMangerV1';
import {apiUrl} from '../../common/Enums';
import {userInfoAction} from '../../redux/actions/userInfoAction';
import {fooiyColor} from '../../common/globalStyles';

const Mypage = () => {
  const dispatch = useDispatch();

  const getAccountInfo = async data => {
    await ApiMangerV1.get(apiUrl.ACCOUNT_INFO, {params: {}}).then(res =>
      dispatch(userInfoAction.init(res.data.payload.account_info)),
    );
  };
  useEffect(() => {
    getAccountInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.rootContainer}>
      <MypageFeed />
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

export default Mypage;
