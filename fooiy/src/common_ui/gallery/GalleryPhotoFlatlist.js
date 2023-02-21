import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import React, {useCallback} from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';
import FlatListFooter from '../../common_ui/footer/FlatListFooter';
import ApiLoading from '../../common_ui/loading/ApiLoading';

const GalleryPhotoFlatlist = props => {
  const [album, setAlbum] = useState();
  const {
    getPhotos,
    galleryList,
    selectedPhotoIndexList,
    setSelectedPhotoList,
    setSelectIndex,
    setCropPhoto,
    is_multi,
  } = props;

  const getSmartAlbum = async () => {
    const getSmartAlbums = await CameraRoll.getSmartAlbums({
      assetType: 'Photos',
    });
    setAlbum(getSmartAlbums[1] && getSmartAlbums[1].title === 'Favorites');
  };

  useEffect(() => {
    getSmartAlbum();
  }, []);

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

  const ListEmptyComponent = () => {
    return (
      album && (
        <View
          style={{
            height: globalVariable.width / 2,
          }}>
          <ApiLoading />
        </View>
      )
    );
  };

  return (
    <FlatList
      data={galleryList}
      ListEmptyComponent={ListEmptyComponent}
      keyExtractor={(item, index) => index.toString()}
      maxToRenderPerBatch={12}
      updateCellsBatchingPeriod={12}
      removeClippedSubviews={true}
      contentContainerStyle={{
        backgroundColor: fooiyColor.W,
        minHeight: globalVariable.width,
      }}
      ListFooterComponent={<FlatListFooter h={150} />}
      onEndReachedThreshold={30}
      numColumns={4}
      onEndReached={getPhotos}
      renderItem={RenderPhoto}
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
