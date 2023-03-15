import React, {useCallback} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Ic_clear_W} from '../../../assets/svg';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';

const WorkingPhotos = props => {
  const {
    cropPhoto,
    galleryList,
    setSelectIndex,
    setSelectedPhotoList,
    selectedPhotoIndexList,
    saveImage,
    setCropPhoto,
    downSpring,
  } = props;

  const selectedLength = selectedPhotoIndexList.length;

  const RenderPhotos = useCallback(
    (uri, index) => {
      return (
        <View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              downSpring();
              setSelectIndex(index);
              setCropPhoto(false);
            }}>
            <Image source={{uri: uri}} style={styles.select_image} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{top: 18, bottom: 18, left: 18, right: 18}}
            onPress={() => {
              setSelectIndex(selectedPhotoIndexList.length - 2);
              setSelectedPhotoList(
                selectedPhotoIndexList.filter(
                  idx => idx !== selectedPhotoIndexList[index],
                ),
              );
            }}
            style={styles.delete_button}>
            <Ic_clear_W />
          </TouchableOpacity>
        </View>
      );
    },
    [selectedPhotoIndexList],
  );

  return (
    <View style={styles.mid_view}>
      {selectedLength >= 1 &&
        RenderPhotos(galleryList[selectedPhotoIndexList[0]]?.node.image.uri, 0)}
      {selectedLength >= 2 &&
        RenderPhotos(galleryList[selectedPhotoIndexList[1]]?.node.image.uri, 1)}
      {selectedLength >= 3 &&
        RenderPhotos(galleryList[selectedPhotoIndexList[2]]?.node.image.uri, 2)}
      {cropPhoto ? (
        <TouchableOpacity onPress={saveImage} style={styles.mid_text}>
          <Text style={styles.crop_photo_text}>저장</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            downSpring();
            setCropPhoto(true);
          }}
          style={styles.mid_text}>
          <Text style={styles.crop_photo_text}>편집</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default WorkingPhotos;

const styles = StyleSheet.create({
  mid_view: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
  },
  select_image: {
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
    position: 'absolute',
  },
  crop_photo_text: {...fooiyFont.Button, color: fooiyColor.P500},
  delete_button: {
    width: 16,
    height: 16,
    zIndex: 100,
    position: 'absolute',
    right: 0,
    top: -8,
  },
});
