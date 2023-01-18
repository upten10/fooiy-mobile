import React, {useState, useRef} from 'react';
import {Image, View, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CropView} from 'react-native-image-crop-tools';

import {StackHeader} from '../../../common_ui/headers/StackHeader';
import {globalVariable} from '../../../common/globalVariable';

const ImageCrop = props => {
  const navigation = useNavigation();
  const [cropPhoto, setCropPhoto] = useState(false);
  const cropViewRef = useRef(null);
  const [photo, setPhoto] = useState(props.route.params.photo);
  const width = globalVariable.width;
  const go_next = () => {
    navigation.navigate('SetAddress', {
      photo_list: [{image: {uri: photo, filename: 'image.jpg'}}],
      address: null,
    });
    console.log(photo);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <StackHeader title="사진등록" next={go_next} />
      {cropPhoto ? (
        <View>
          <CropView
            ref={cropViewRef}
            sourceUrl={photo}
            style={{
              width: width,
              height: width,
            }}
            onImageCrop={res => {
              setPhoto(res.uri);
              setCropPhoto(false);
            }}
            keepAspectRatio
            aspectRatio={{width: 9, height: 9}}
          />
          <View style={{height: width / 10, flexDirection: 'row'}}>
            <Button
              title="저장"
              onPress={() => cropViewRef.current.saveImage(true)}
            />
            <Button
              title="우회전"
              onPress={() => cropViewRef.current.rotateImage(true)}
            />
            <Button
              title="좌회전"
              onPress={() => cropViewRef.current.rotateImage(false)}
            />
          </View>
        </View>
      ) : (
        <View>
          <Image
            source={{uri: photo}}
            style={{
              width: width,
              height: width,
            }}
          />
          <Button title="편집" onPress={() => setCropPhoto(true)} />
        </View>
      )}
    </View>
  );
};

export default ImageCrop;
