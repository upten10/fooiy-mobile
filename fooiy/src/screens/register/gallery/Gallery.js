import React, {useEffect, useState, useCallback} from 'react';
import {View, FlatList, Image, TouchableOpacity, Text} from 'react-native';
import {Platform} from 'react-native';

import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import RNFS from 'react-native-fs';

import {globalVariable} from '../../../common/globalVariable';
import {GalleryPermission} from '../../../common/Permission';

const Gallery = () => {
  const width = globalVariable.width;
  const height = globalVariable.height;
  const image_width = width / 3;
  const [galleryCursor, setGalleryCursor] = useState(null);
  const [galleryList, setGalleryList] = useState([]);
  const [selectedPhotoIndexs, setSelectedPhotoIndexs] = useState([]);
  const getGalleryPhotos = async () => {
    const params = {
      first: 12,
      assetType: 'Photos',
      ...(galleryCursor && {after: galleryCursor}),
    };

    try {
      const {edges, page_info} = await CameraRoll.getPhotos(params);
      if (page_info.has_next_page === false) {
        setGalleryCursor(null);
      } else {
        setGalleryCursor(page_info.end_cursor);
      }

      /*ios인 경우는 ph:// 형식으로 사진이 저장됩니다.
      이미지를 읽을 수 없는 오류가 생기기 때문에
      react-native-fs의 파일 시스템을 이용하여 변환 시켜줍니다.*/
      if (Platform.OS === 'ios') {
        for await (const item of edges) {
          const fileName = item.node.image.uri.replace('ph://', '');
          const result = await phPathToFilePath(item.node.image.uri, fileName);
          item.node.image.uri = result;
        }
      }
      setGalleryList([...galleryList, ...edges]);
    } catch (error) {
      console.log('[takeStore getPhotos error occured] ', error);
    }
  };

  const phPathToFilePath = async uri => {
    let fileURI = encodeURI(uri);

    if (uri.startsWith('ph://')) {
      const copyPath = `${
        RNFS.DocumentDirectoryPath
      }/${new Date().toISOString()}.jpg`.replace(/:/g, '-');
      // ph경로의 이미지를 file로 옮기는 작업
      fileURI = await RNFS.copyAssetsFileIOS(uri, copyPath, 500, 500);
    }
    return fileURI;
  };

  const selectPhoto = index => {
    if (selectedPhotoIndexs.findIndex(element => element === index) === -1) {
      setSelectedPhotoIndexs([...selectedPhotoIndexs, index]);
    } else {
      setSelectedPhotoIndexs(selectedPhotoIndexs.filter(idx => idx !== index));
    }
  };

  useEffect(() => {
    GalleryPermission();
    getGalleryPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const SelectedPhoto = useCallback(() => {
    const width = globalVariable.width;
    return (
      <View style={{width: width, height: width}}>
        <Image
          source={
            selectedPhotoIndexs.length !== 0
              ? {uri: galleryList[selectedPhotoIndexs[0]].node.image.uri}
              : null
          }
          style={{
            width: width,
            height: width,
            resizeMode: 'contain',
          }}
        />
      </View>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPhotoIndexs]);

  return (
    <View>
      <SelectedPhoto />
      <FlatList
        data={galleryList}
        style={{height: height - width}}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.7}
        numColumns={3}
        onEndReached={() => {
          getGalleryPhotos();
        }}
        renderItem={({item, index}) => {
          return (
            <View style={{flex: 1}}>
              {item.node ? (
                <TouchableOpacity
                  onPress={() => {
                    selectPhoto(index);
                  }}>
                  {selectedPhotoIndexs.findIndex(
                    element => element === index,
                  ) === -1 ? (
                    <Image
                      source={{uri: item.node.image.uri}}
                      style={{width: image_width, height: image_width}}
                    />
                  ) : (
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                      <Image
                        source={{uri: item.node.image.uri}}
                        style={{width: image_width, height: image_width}}
                      />
                      <Text style={{position: 'absolute'}}>
                        {selectedPhotoIndexs.findIndex(
                          element => element === index,
                        ) + 1}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              ) : null}
            </View>
          );
        }}
      />
    </View>
  );
};

export default Gallery;
