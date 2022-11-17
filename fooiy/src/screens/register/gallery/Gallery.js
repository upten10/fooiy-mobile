import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
  Button,
} from 'react-native';
import {Platform} from 'react-native';

import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {CropView} from 'react-native-image-crop-tools';
import RNFS from 'react-native-fs';

import {globalVariable} from '../../../common/globalVariable';
import {GalleryPermission} from '../../../common/Permission';
import cloneDeep from 'lodash/cloneDeep';

const Gallery = () => {
  const width = globalVariable.width;
  const height = globalVariable.height;
  const image_width = width / 3;
  const cropViewRef = useRef(null);
  const [cropPhoto, setCropPhoto] = useState(false);
  const [galleryCursor, setGalleryCursor] = useState(null);
  const [galleryOriginalList, setGalleryOriginalList] = useState([]);
  const [galleryList, setGalleryList] = useState([]);
  const [selectedPhotoIndexs, setSelectedPhotoIndexs] = useState([]);
  const getGalleryPhotos = async () => {
    const params = {
      first: 12,
      assetType: 'Photos',
      ...(galleryCursor && {after: galleryCursor}),
    };

    try {
      if (galleryCursor !== false) {
        const {edges, page_info} = await CameraRoll.getPhotos(params);
        if (page_info.has_next_page === false) {
          setGalleryCursor(false);
        } else {
          setGalleryCursor(page_info.end_cursor);
        }

        /*ios인 경우는 ph:// 형식으로 사진이 저장 uri가 아닌 url 이기에 읽을 수 없어
            react-native-fs의 파일 시스템을 이용하여 변환.*/
        if (Platform.OS === 'ios') {
          const copy_edges = cloneDeep(edges);
          setGalleryOriginalList([...galleryOriginalList, ...copy_edges]);
          for await (const item of edges) {
            const fileName = item.node.image.uri.replace('ph://', '');
            const result = await phPathToFilePath(
              item.node.image.uri,
              fileName,
            );
            item.node.image.uri = result;
          }
        }
        setGalleryList([...galleryList, ...edges]);
      }
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
    if (selectedPhotoIndexs.length === 0) {
      return;
    }
    return (
      <View style={{width: width, height: width * 1.1}}>
        {cropPhoto ? (
          <View style={{flex: 1}}>
            <CropView
              ref={cropViewRef}
              sourceUrl={
                Platform.OS === 'ios'
                  ? galleryOriginalList[selectedPhotoIndexs[0]].node.image.uri
                  : galleryList[selectedPhotoIndexs[0]].node.image.uri
              }
              style={{width: width, height: width}}
              onImageCrop={res => {
                galleryList[selectedPhotoIndexs[0]].node.image.uri = res.uri;
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
            <View style={{height: width / 10, flexDirection: 'row'}}>
              <Button title="편집" onPress={() => setCropPhoto(true)} />
            </View>
          </View>
        )}
      </View>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPhotoIndexs, cropPhoto]);

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
