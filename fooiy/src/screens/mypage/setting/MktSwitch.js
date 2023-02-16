import React from 'react';
import {useState} from 'react';
import {fooiyColor} from '../../../common/globalStyles';
import {Platform, Switch} from 'react-native';
import {useDebounce} from '../../../common/hooks/useDebounce';
import {ApiManagerV2} from '../../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../../common/Enums';
import {useDispatch, useSelector} from 'react-redux';
import {userInfoAction} from '../../../redux/actions/userInfoAction';
import FooiyToast from '../../../common/FooiyToast';

const MktSwitch = () => {
  const dispatch = useDispatch();
  const mktAgreeRedux = useSelector(state => state.userInfo.value.is_mkt_agree);
  const [isSwitchOn, setIsSwitchOn] = useState(mktAgreeRedux);
  const {debounceCallback, isLoading} = useDebounce({time: 1500});

  const patchMkt = async switchOn => {
    await ApiManagerV2.patch(apiUrl.PROFILE_EDIT, {
      is_mkt_agree: `${switchOn}`,
    })
      .then(res => {
        dispatch(userInfoAction.edit(res.data.payload.account_info));
      })
      .catch(e => FooiyToast.error());
  };

  const onToggleSwitch = () => {
    debounceCallback(() => {
      patchMkt(!isSwitchOn);
    });
    setIsSwitchOn(!isSwitchOn);
  };

  return (
    <Switch
      onChange={onToggleSwitch}
      value={isSwitchOn}
      trackColor={Platform.select({
        android: {
          false: fooiyColor.G300,
          true: fooiyColor.P200,
        },
        ios: {
          false: null,
          true: fooiyColor.P500,
        },
      })}
      thumbColor={Platform.select({
        android: isSwitchOn ? fooiyColor.P500 : fooiyColor.G50,
        ios: null,
      })}
    />
  );
};

export default MktSwitch;
