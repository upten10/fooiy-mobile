import React, {useCallback} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';

const GalleryPhotoFlatlist = props => {
  const {
    getPhotos,
    galleryList,
    selectedPhotoIndexList,
    setSelectedPhotoList,
    setSelectIndex,
    setCropPhoto,
    is_multi,
  } = props;

  const selectPhoto = index => {
    if (is_multi) {
      setCropPhoto(false);
      if (
        selectedPhotoIndexList.findIndex(element => element === index) === -1
      ) {
        if (selectedPhotoIndexList.length === 3) {
          return;
        }
        setSelectIndex(selectedPhotoIndexList.length);
        setSelectedPhotoList([...selectedPhotoIndexList, index]);
      } else {
        setSelectIndex(selectedPhotoIndexList.length - 2);
        setSelectedPhotoList(
          selectedPhotoIndexList.filter(idx => idx !== index),
        );
      }
    } else {
      setSelectedPhotoList([index]);
    }
  };

  const RenderPhoto = useCallback(
    props => {
      const {item, index} = props;
      const PhotoIndicator = props => {
        if (
          selectedPhotoIndexList.findIndex(
            element => element === props.index,
          ) !== -1 &&
          is_multi
        ) {
          return (
            <View style={styles.item_index}>
              <Text
                style={{
                  ...fooiyFont.Caption2,
                  color: fooiyColor.W,
                }}>
                {selectedPhotoIndexList.findIndex(
                  element => element === props.index,
                ) + 1}
              </Text>
            </View>
          );
        }
      };
      if (item?.node) {
        return (
          <View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                selectPhoto(index);
              }}>
              <FastImage
                source={{uri: item.node.image.url}}
                style={styles.gallery_item}
              />
              <PhotoIndicator index={index} />
            </TouchableOpacity>
          </View>
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedPhotoIndexList],
  );

  return (
    <FlatList
      data={galleryList}
      style={{
        height: globalVariable.height - globalVariable.width - 56,
      }}
      keyExtractor={(item, index) => index.toString()}
      maxToRenderPerBatch={12}
      updateCellsBatchingPeriod={12}
      removeClippedSubviews={true}
      numColumns={4}
      onEndReached={getPhotos}
      renderItem={item => <RenderPhoto {...item} />}
    />
  );
};

export default GalleryPhotoFlatlist;

const styles = StyleSheet.create({
  gallery_item: {
    width: globalVariable.width / 4,
    height: globalVariable.width / 4,
    borderWidth: 1,
    borderColor: fooiyColor.W,
  },
  item_index: {
    position: 'absolute',
    right: 0,
    margin: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: fooiyColor.W,
    backgroundColor: fooiyColor.P500,
    justifyContent: 'center',
    alignItems: 'center',
  },
});