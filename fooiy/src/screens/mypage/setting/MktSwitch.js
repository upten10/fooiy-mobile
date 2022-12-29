import React, {useEffect} from 'react';
import {debounce} from 'lodash';
import {useState, useCallback} from 'react';
import {Switch} from 'react-native-paper';
import {fooiyColor} from '../../../common/globalStyles';

const MktSwitch = param => {
  const {is_mkt_agree} = param;
  const [isSwitchOn, setIsSwitchOn] = useState(is_mkt_agree);

  const debounceCallback = useCallback(switchState => {
    debounceSwitch(switchState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debounceSwitch = debounce(async switched => {
    setIsSwitchOn(!(await switched));
    switched ? console.log('off') : console.log('on');
  }, 1500);

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    debounceCallback(isSwitchOn);
  };

  return (
    <Switch
      value={isSwitchOn}
      onValueChange={onToggleSwitch}
      color={fooiyColor.P500}
    />
  );
};

export default MktSwitch;
