import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
  Button,
  StyleSheet,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {CropView} from 'react-native-image-crop-tools';
import RNFS from 'react-native-fs';
import {globalVariable} from '../../../common/globalVariable';
import {GalleryPermission} from '../../../common/Permission';
import {StackHeader} from '../../../common_ui/headers/StackHeader';
import cloneDeep from 'lodash/cloneDeep';
import {check, PERMISSIONS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

const Gallery = () => {
  console.log('rendering Gallery');
  const navigation = useNavigation();
  const width = globalVariable.width;
  const height = globalVariable.height;
  const cropViewRef = useRef(null);
  const [cropPhoto, setCropPhoto] = useState(false);
  const [galleryCursor, setGalleryCursor] = useState(null);
  const [galleryList, setGalleryList] = useState([]);
  const [galleryOriginalListIOS, setGalleryOriginalListIOS] = useState([]); // ios 전용
  const [galleryOriginalList, setGalleryOriginalList] = useState([]);
  const [selectIndex, setSelectIndex] = useState(0);
  const [selectedPhotoIndexList, setSelectedPhotoList] = useState([]);

  const go_next = () => {
    if (selectedPhotoIndexList.length === 0) {
      // 사진 하나는 골라야한다는 경고 로직 추가
    } else {
      const photoList = selectedPhotoIndexList.map(index => {
        return galleryList[index].node;
      });
      navigation.navigate('SetAddress', {
        photo_list: photoList,
        address:
          photoList.length === 1 && photoList[0].location
            ? photoList[0].location
            : photoList.length === 2 && photoList[0].location
            ? photoList[0].location
            : photoList.length === 2 && photoList[1].location
            ? photoList[1].location
            : photoList.length === 3 && photoList[0].location
            ? photoList[0].location
            : photoList.length === 3 && photoList[1].location
            ? photoList[1].location
            : photoList.length === 3 && photoList[2].location
            ? photoList[2].location
            : null,
        // : {
        //     altitude: 0,
        //     heading: 0,
        //     latitude: globalVariable.default_latitude,
        //     longitude: globalVariable.default_longitude,
        //     speed: 0,
        //   },
      });
    }
  };

  // 갤러리에서 사진 받아오기
  const getGalleryPhotos = async () => {
    Platform.OS === 'ios';
    check(PERMISSIONS.IOS.PHOTO_LIBRARY).then(res => {
      if (res === 'blocked' || res === 'denied') {
        Alert.alert(
          '서비스 이용 알림',
          '사진 권한을 허용해야 서비스 정상 이용이 가능합니다. 설정에서 권한을 허용해주세요.',
          [
            {text: '닫기', onPress: navigation.goBack},
            {text: '설정', onPress: Linking.openSettings},
          ],
        );
      }
    });
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
    if (selectedPhotoIndexList.findIndex(element => element === index) === -1) {
      if (selectedPhotoIndexList.length === 5) {
        return;
      }
      setSelectedPhotoList([...selectedPhotoIndexList, index]);
    } else {
      setSelectedPhotoList(selectedPhotoIndexList.filter(idx => idx !== index));
    }
  };

  useEffect(() => {
    GalleryPermission();
    getGalleryPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const SelectedPhoto = useCallback(() => {
    const width = globalVariable.width;
    if (selectedPhotoIndexList.length === 0) {
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
                  ? galleryOriginalListIOS[selectedPhotoIndexList[selectIndex]]
                      .node.image.uri
                  : galleryList[selectedPhotoIndexList[selectIndex]].node.image
                      .uri
              }
              style={styles.crop_photo}
              onImageCrop={res => {
                galleryList[
                  selectedPhotoIndexList[selectIndex]
                ].node.image.uri = res.uri;
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
                uri: galleryList[selectedPhotoIndexList[selectIndex]]
                  ? galleryList[selectedPhotoIndexList[selectIndex]].node.image
                      .uri
                  : null,
              }}
              style={styles.selected_photo}
            />
            <View
              style={{height: width / 10, flexDirection: 'row', bottom: 70}}>
              <Button title="편집" onPress={() => setCropPhoto(true)} />
            </View>
            <FlatList
              data={selectedPhotoIndexList}
              keyExtractor={index => index.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.selected_photo_list}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      setSelectIndex(index);
                    }}>
                    <Image
                      source={{uri: galleryList[item].node.image.uri}}
                      style={styles.selected_photo_list_item}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        )}
      </View>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPhotoIndexList, cropPhoto, selectIndex]);

  return (
    <View>
      <StackHeader title="앨범" next={go_next} />
      {selectedPhotoIndexList.length !== 0 ? (
        <SelectedPhoto />
      ) : (
        <View style={[styles.crop_photo, {backgroundColor: '#cccc'}]}></View>
      )}

      <FlatList
        data={galleryOriginalList}
        style={{height: height - width - 56}}
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
                  {selectedPhotoIndexList.findIndex(
                    element => element === index,
                  ) === -1 ? (
                    <Image
                      source={{uri: item.node.image.uri}}
                      style={styles.gallery_photos}
                    />
                  ) : (
                    <View>
                      <Image
                        source={{uri: item.node.image.uri}}
                        style={styles.gallery_photos}
                      />
                      <Text style={styles.selected_photo_index}>
                        {selectedPhotoIndexList.findIndex(
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selected_photo_corp_container: {
    width: globalVariable.width,
    height: globalVariable.width * 1.1,
  },
  gallery_photos: {
    width: globalVariable.width / 3,
    height: globalVariable.width / 3,
    borderWidth: 1,
    borderColor: '#fff',
  },
  crop_photo: {
    width: globalVariable.width,
    height: globalVariable.width,
  },
  selected_photo: {
    width: globalVariable.width,
    height: globalVariable.width,
    resizeMode: 'contain',
  },
  selected_photo_index: {
    position: 'absolute',
    right: 0,
  },
  selected_photo_list: {
    position: 'absolute',
    bottom: 10,
    width: globalVariable.width,
  },
  selected_photo_list_item: {
    width: globalVariable.width / 6,
    height: globalVariable.width / 6,
    borderRadius: 20,
    marginLeft: 10,
  },
});
