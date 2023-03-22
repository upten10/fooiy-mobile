import React, {useState, useRef} from 'react';
import {
  Image,
  View,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CropView} from 'react-native-image-crop-tools';

import {StackHeader} from '../../../common_ui/headers/StackHeader';
import {globalVariable} from '../../../common/globalVariable';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Notice, TurnLeft, TurnRight} from '../../../../assets/icons/svg';
import {fooiyColor, fooiyFont} from '../../../common/globalStyles';

const ImageCrop = props => {
  const navigation = useNavigation();
  const [cropPhoto, setCropPhoto] = useState(false);
  const cropViewRef = useRef(null);
  const [photo, setPhoto] = useState(props.route.params.photo);
  const width = globalVariable.width;

  const go_next = () => {
    props.route.params.shop
      ? navigation.navigate('FindMenu', {
          photo_list: [{image: {uri: photo, filename: 'image.jpg'}}],
          shop: props.route.params.shop,
        })
      : navigation.navigate('SetAddress', {
          photo_list: [{image: {uri: photo, filename: 'image.jpg'}}],
          address: null,
        });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StackHeader title="사진 등록" next={go_next} />
      {cropPhoto ? (
        <View
          style={{width: globalVariable.width, height: globalVariable.width}}>
          <CropView
            ref={cropViewRef}
            sourceUrl={photo}
            style={{width: width, height: width}}
            onImageCrop={res => {
              setPhoto('file://' + res.uri);
              setCropPhoto(false);
            }}
            keepAspectRatio
            aspectRatio={{width: 1, height: 1}}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              style={[styles.rotate_icon, {left: 16}]}
              onPress={() => cropViewRef.current.rotateImage(false)}>
              <TurnLeft />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.rotate_icon, {right: 16}]}
              onPress={() => cropViewRef.current.rotateImage(true)}>
              <TurnRight />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <Image source={{uri: photo}} style={{width: width, height: width}} />
        </View>
      )}

      <View style={styles.mid_view}>
        <Image source={{uri: photo}} style={styles.taken_photo} />
        {cropPhoto ? (
          <TouchableOpacity
            onPress={() => {
              cropViewRef.current.saveImage(true);
            }}
            style={styles.mid_text}>
            <Text style={{...fooiyFont.Button, color: fooiyColor.P500}}>
              저장
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setCropPhoto(!cropPhoto)}
            style={styles.mid_text}>
            <Text style={{...fooiyFont.Button, color: fooiyColor.P500}}>
              편집
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.notice}>
        <Text style={{...fooiyFont.Subtitle3, color: fooiyColor.G600}}>
          사진 등록 안내사항
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Notice style={{marginRight: 8, marginTop: 8}} />
          <Text style={styles.notice_text}>
            정방형 (1:1) 사진으로 촬영해요.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Notice style={{marginRight: 8, marginTop: 8}} />
          <Text style={styles.notice_text}>
            사진에 주소가 등록되어있으면 편해요.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Notice style={{marginRight: 8, marginTop: 8}} />
          <Text style={styles.notice_text}>
            카메라로 촬영하면 1장만 등록 가능해요.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ImageCrop;

const styles = StyleSheet.create({
  rotate_icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 64,
  },
  mid_view: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 8,
  },
  taken_photo: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginLeft: 8,
  },
  mid_text: {
    height: 32,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: fooiyColor.P500,
    paddingHorizontal: 10,
    paddingVertical: 8,
    right: 16,
    justifyContent: 'center',
  },
  notice: {
    backgroundColor: fooiyColor.P50,
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
  },
  notice_text: {
    ...fooiyFont.Caption1,
    color: fooiyColor.G600,
    marginTop: 8,
  },
});
