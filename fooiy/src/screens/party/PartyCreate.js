import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackHeader} from '../../common_ui/headers/StackHeader';

const PartyCreate = () => {
  return (
    <SafeAreaView>
      <StackHeader title={'파티 생성'} />
    </SafeAreaView>
  );
};

export default PartyCreate;
