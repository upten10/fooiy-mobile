import React, {useCallback, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';

const WorkingPhotos = props => {
  const {
    cropPhoto,
    galleryList,
    setSelectIndex,
    selectedPhotoIndexList,
    saveImage,
    setCropPhoto,
    downSpring,
  } = props;

  const RenderPhotos = useCallback(
    props => {
      const {item, index} = props;
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            downSpring();
            setSelectIndex(index);
            setCropPhoto(false);
          }}>
          <Image
            source={{uri: galleryList[item]?.node.image.uri}}
            style={styles.select_image}
          />
        </TouchableOpacity>
      );
    },
    [galleryList],
  );

  return (
    <View style={styles.mid_view}>
      <FlatList
        data={selectedPhotoIndexList}
        keyExtractor={index => index.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={item => <RenderPhotos {...item} />}
      />
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
    justifyContent: 'center',
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
  },
  crop_photo_text: {...fooiyFont.Button, color: fooiyColor.P500},
});
