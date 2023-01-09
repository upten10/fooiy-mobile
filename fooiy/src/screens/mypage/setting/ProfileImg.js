import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
  Button,
  StyleSheet,
} from 'react-native';
import {Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {CropView} from 'react-native-image-crop-tools';
import RNFS from 'react-native-fs';

import {globalVariable} from '../../../common/globalVariable';
import {GalleryPermission} from '../../../common/Permission';
import {StackHeader} from '../../../common_ui/headers/StackHeader';
import cloneDeep from 'lodash/cloneDeep';
import {ApiMangerV1} from '../../../common/api/v1/ApiMangerV1';
import {apiUrl} from '../../../common/Enums';
import {useDispatch} from 'react-redux';
import {userInfoAction} from '../../../redux/actions/userInfoAction';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {fooiyColor} from '../../../common/globalStyles';

const ProfileImg = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const width = globalVariable.width;
  const height = globalVariable.height;
  const cropViewRef = useRef(null);
  const [cropPhoto, setCropPhoto] = useState(false);
  const [galleryCursor, setGalleryCursor] = useState(null);
  const [galleryList, setGalleryList] = useState([]);
  const [galleryOriginalListIOS, setGalleryOriginalListIOS] = useState([]); // ios 전용
  const [galleryOriginalList, setGalleryOriginalList] = useState([]);
  const [selectIndex, setSelectIndex] = useState(-1);
  const [curEdges, setCurEdges] = useState([]);

  navigation.getParent().setOptions({tabBarStyle: {display: 'none'}});
  const dispatch = useDispatch();

  const patchProfileImg = async data => {
    await ApiMangerV1.patch(apiUrl.PROFILE_EDIT, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: (data, headers) => {
        return data;
      },
    })
      .then(res => {
        dispatch(userInfoAction.editIntro(res.data.payload.account_info));
      })
      .then(navigation.goBack());
  };

  const enroll = async () => {
    if (selectIndex === -1) {
      // 사진 하나는 골라야한다는 경고 로직 추가
      console.warn('프사 안고름');
    } else {
      const photo =
        Platform.OS === 'ios'
          ? galleryOriginalListIOS[selectIndex].node.image
          : galleryList[selectIndex].node.image;

      const match = /\.(\w+)$/.exec(photo.filename ?? '');
      // file name이 없을 때 type 지정이 제대로 안돼서 node에 있는 type 정보를 대신 사용
      const type =
        galleryList[selectIndex].node.type === 'image'
          ? match
            ? `image/${match[1]}`
            : `image`
          : galleryList[selectIndex].node.type;

      const formData = new FormData();
      formData.append('profile_image', {
        uri: photo.uri,
        name: photo.filename !== null ? photo.filename : 'image.jpg',
        type,
      });

      patchProfileImg(formData);
    }
  };

  // 갤러리에서 사진 받아오기
  const getGalleryPhotos = async () => {
    const params = {
      first: 12,
      assetType: 'Photos',
      ...(galleryCursor && {after: galleryCursor}),
    };

    try {
      if (galleryCursor !== false) {
        const {edges, page_info} = await CameraRoll.getPhotos(params);
        setCurEdges(edges);

        if (page_info.has_next_page === false) {
          setGalleryCursor(false);
        } else {
          setGalleryCursor(page_info.end_cursor);
        }
        /*ios인 경우는 ph:// 형식으로 사진이 저장 uri가 아닌 url 이기에 읽을 수 없어
            react-native-fs의 파일 시스템을 이용하여 변환.*/
        if (Platform.OS === 'ios') {
          const copy_edges = cloneDeep(edges);
          setGalleryOriginalListIOS([...galleryOriginalListIOS, ...copy_edges]);
          for await (const item of edges) {
            const fileName = item.node.image.uri.replace('ph://', '');
            const result = await phPathToFilePath(
              item.node.image.uri,
              fileName,
            );
            item.node.image.uri = result;
          }
        }
        const copy_edges = cloneDeep(edges);
        setGalleryOriginalList([...galleryOriginalList, ...copy_edges]);
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
    setSelectIndex(index);
  };

  useEffect(() => {
    GalleryPermission();
    getGalleryPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const SelectedPhoto = useCallback(() => {
    const width = globalVariable.width;
    if (selectIndex === -1) {
      return;
    }
    return (
      <View style={styles.selected_photo_corp_container}>
        {cropPhoto ? (
          <View>
            <CropView
              ref={cropViewRef}
              sourceUrl={
                Platform.OS === 'ios'
                  ? galleryOriginalListIOS[selectIndex].node.image.uri
                  : galleryList[selectIndex].node.image.uri
              }
              style={styles.crop_photo}
              onImageCrop={res => {
                galleryList[selectIndex].node.image.uri = res.uri;
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
          <View style={styles.container}>
            <Image
              source={{
                uri: galleryList[selectIndex]
                  ? galleryList[selectIndex].node.image.uri
                  : null,
              }}
              style={styles.selected_photo}
            />
            <View style={{height: width / 10, flexDirection: 'row', bottom: 0}}>
              <Button title="편집" onPress={() => setCropPhoto(true)} />
            </View>
          </View>
        )}
      </View>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cropPhoto, selectIndex]);

  return (
    <View style={{backgroundColor: fooiyColor.W}}>
      <StackHeader title="앨범" enroll={enroll} />
      {selectIndex !== -1 ? (
        <SelectedPhoto />
      ) : (
        <View
          style={[styles.crop_photo, {backgroundColor: fooiyColor.W}]}></View>
      )}

      <FlatList
        data={galleryOriginalList}
        style={BodyStyles(insets.top, insets.bottom).bodyContainer}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.7}
        numColumns={3}
        onEndReached={() => {
          getGalleryPhotos();
        }}
        renderItem={({item, index}) => {
          return (
            <View style={styles.container}>
              {item.node ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    selectPhoto(index);
                  }}>
                  <Image
                    source={{uri: item.node.image.uri}}
                    style={styles.gallery_photos}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          );
        }}
      />
    </View>
  );
};

export default ProfileImg;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selected_photo_corp_container: {
    width: globalVariable.width,
    height: globalVariable.width * 0.9,
  },
  gallery_photos: {
    width: globalVariable.width / 3,
    height: globalVariable.width / 3,
    borderWidth: 1,
    borderColor: fooiyColor.W,
  },
  crop_photo: {
    width: globalVariable.width,
    height: globalVariable.width * 0.8,
  },
  selected_photo: {
    width: globalVariable.width,
    height: globalVariable.width * 0.8,
    resizeMode: 'contain',
  },
  // selected_photo_index: {
  // position: 'absolute',
  // right: 0,
  // },
  // selected_photo_list: {
  //   position: 'absolute',
  //   bottom: 100,
  //   width: globalVariable.width,
  // },
  // selected_photo_list_item: {
  //   width: globalVariable.width / 6,
  //   height: globalVariable.width / 6,
  //   borderRadius: 20,
  //   marginLeft: 10,
  // },
});

const BodyStyles = (topSafeAreaHeight, bottomSafeAreaHeight) =>
  StyleSheet.create({
    bodyContainer: {
      height:
        globalVariable.height - (topSafeAreaHeight + bottomSafeAreaHeight + 72),
    },
  });
