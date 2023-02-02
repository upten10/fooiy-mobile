import React from 'react';
import {Text, View} from 'react-native';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';

const ListEmptyTextComponent = text => {
  return (
    <View style={{justifyContent: 'center'}}>
      <Text
        style={{
          ...fooiyFont.Body1,
          color: fooiyColor.G800,
          textAlign: 'center',
        }}>
        {text}
      </Text>
    </View>
  );
};

export default ListEmptyTextComponent;
