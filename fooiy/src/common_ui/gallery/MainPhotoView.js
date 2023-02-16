import React, {useCallback} from 'react';
import {Image, TouchableOpacity, StyleSheet, View} from 'react-native';
import {CropView} from 'react-native-image-crop-tools';
import {TurnLeft, TurnRight} from '../../../assets/icons/svg';
import {fooiyColor} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';

const MainPhotoView = props => {
  const {
    cropPhoto,
    cropViewRef,
    setCropPhoto,
    galleryList,
    galleryListIndex,
    leftRotateImage,
    rightRotateImage,
    selectedPhotoIndexListLength,
  } = props;
  const SelectedPhoto = useCallback(() => {
    if (cropPhoto) {
      return (
        <View style={styles.square}>
          <CropView
            ref={cropViewRef}
            sourceUrl={galleryList[galleryListIndex].node.image.uri}
            style={styles.crop_view}
            onImageCrop={res => {
              galleryList[galleryListIndex].node.image.uri =
                'file://' + res.uri;
              setCropPhoto(false);
            }}
            keepAspectRatio={true}
            aspectRatio={{width: 1, height: 1}}
          />
          <View style={styles.rotate_button_container}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.rotate_icon, {left: 16}]}
              onPress={leftRotateImage}>
              <TurnLeft />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.rotate_icon, {right: 16}]}
              onPress={rightRotateImage}>
              <TurnRight />
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.square}>
          <Image
            source={{
              uri: galleryList[galleryListIndex].node.image.uri,
            }}
            style={styles.square}
          />
        </View>
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cropPhoto, galleryList, galleryListIndex]);
  if (selectedPhotoIndexListLength === 0) {
    return <View style={styles.crop_view} />;
  } else {
    return SelectedPhoto();
  }
};

export default MainPhotoView;

const styles = StyleSheet.create({
  square: {
    width: globalVariable.width,
    height: globalVariable.width,
  },
  crop_view: {
    width: globalVariable.width,
    height: globalVariable.width,
    backgroundColor: fooiyColor.G100,
  },
  rotate_button_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rotate_icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 64,
  },
});
