import React from 'react';
import {Image, View, Text, Dimensions} from 'react-native';

const ImageCrop = props => {
  const photo = props.route.params.photo;
  const width = Dimensions.get('window').width;
  return (
    <View style={{flex: 1}}>
      <Image
        source={{uri: photo}}
        style={{
          width: width,
          height: width,
        }}
      />
    </View>
  );
};

export default ImageCrop;
