import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import {PermissionsAndroid, Platform} from 'react-native';

import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {GalleryPermission} from '../../../common/Permission';
// import RNFS from 'react-native-fs';

const Gallery = () => {
  const hasAndroidPermission = async () => {
    //외부 스토리지를 읽고 쓰는 권한 가져오기
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };

  useEffect(() => {
    GalleryPermission();
  }, []);

  //스크롤 될 때마다 사진을 불러올 경우 현재의 갤러리를 어디까지 불러왔는지에 대한 저장 값
  const [galleryCursor, setGalleryCursor] = useState(null);
  const [galleryList, setGalleryList] = useState([]);
  const getGalleryPhotos = async () => {
    const params = {
      //이미지를 불러올 개수 (최신순으로)
      first: 50,
      assetType: 'Photos',
      ...(galleryCursor && {after: galleryCursor}),
    };

    try {
      //사진을 불러옵니다. edges는 gallery photo에 대한 정보
      const {edges, page_info} = await CameraRoll.getPhotos(params);
      console.warn(edges, page_info);

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
          const result = await this.phPathToFilePath(
            item.node.image.uri,
            fileName,
          );
          item.node.image.uri = result;
        }
      }

      console.log('edges', edges);
      setGalleryList(...galleryList, edges);
    } catch (error) {
      console.log('[takeStore getPhotos error occured] ', error);
    }
  };

  //   const phPathToFilePath = async uri => {
  //     let fileURI = encodeURI(uri);

  //     if (uri.startsWith('ph://')) {
  //       const copyPath = `${
  //         // RNFS.DocumentDirectoryPath
  //       }/${new Date().toISOString()}.jpg`.replace(/:/g, '-');

  //       // ph경로의 이미지를 file로 옮기는 작업
  //     //   fileURI = await RNFS.copyAssetsFileIOS(uri, copyPath, 360, 360);
  //     }

  //     return fileURI;
  //   };

  const getPhotoWithPermission = async () => {
    getGalleryPhotos();
  };

  return (
    <View>
      <FlatList
        key="gallery_item"
        data={[...galleryList]}
        keyExtractor={(item, index) => index.toString()}
        style={{
          width: 200,
        }}
        getItemLayout={(data, index) => ({
          length: 200 / 3,
          offset: (200 / 3) * (index + 2),
          index,
        })}
        onEndReachedThreshold={0.7}
        numColumns={3}
        nestedScrollEnabled
        howsHorizontalScrollIndicator
        onEndReached={() => {
          //화면의 맨 끝에 도달했을 때 getGalleryPhotos 함수 호출
          getGalleryPhotos();
        }}
        renderItem={({item, index}) => {
          return (
            //이미지 보여줄 컴포넌트 (생략)
            <View />
          );
        }}
      />
    </View>
  );
};

export default Gallery;
