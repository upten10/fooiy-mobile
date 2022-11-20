import React from 'react';
import {Image, View, Text, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackHeader} from '../../../common_ui/headers/StackHeader';

const ImageCrop = props => {
  const navigation = useNavigation();
  const photo = props.route.params.photo;
  const width = Dimensions.get('window').width;
  const go_next = () => {
    navigation.navigate('TypingContent', {photo_list: [photo]});
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <StackHeader title="사진등록" next={go_next} />
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
