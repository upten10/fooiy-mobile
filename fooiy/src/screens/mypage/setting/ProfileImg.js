import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {useNavigation} from '@react-navigation/native';
import cloneDeep from 'lodash/cloneDeep';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RNFS from 'react-native-fs';
import {CropView} from 'react-native-image-crop-tools';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {TurnLeft, TurnRight} from '../../../../assets/icons/svg';
import {ApiManagerV2} from '../../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../../common/Enums';
import FooiyToast from '../../../common/FooiyToast';
import {fooiyColor, fooiyFont} from '../../../common/globalStyles';
import {globalVariable} from '../../../common/globalVariable';
import {StackHeader} from '../../../common_ui/headers/StackHeader';
import {userInfoAction} from '../../../redux/actions/userInfoAction';

const ProfileImg = props => {
  const {isParty, toggleAlbum, setImage, party_id, setIsVisible, setImageType} =
    props;

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

  const dispatch = useDispatch();

  const patchProfileImg = async data => {
    isParty === 'profile'
      ? await ApiManagerV2.patch(apiUrl.EDIT_PARTY, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          transformRequest: (data, headers) => {
            return data;
          },
        })
          .then(navigation.goBack())
          .catch(e => FooiyToast.error())
      : await ApiManagerV2.patch(apiUrl.PROFILE_EDIT, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          transformRequest: (data, headers) => {
            return data;
          },
        })
          .then(res => {
            console.log(JSON.stringify(data));
            dispatch(userInfoAction.edit(res.data.payload.account_info));
          })
          .then(navigation.goBack())
          .catch(e => FooiyToast.error());
  };

  const enroll = async () => {
    if (selectIndex === -1) {
      // 사진 하나는 골라야한다는 경고 로직 추가
      console.warn('프사 안고름');
    } else {
      const photo = Platform.select({
        ios: galleryOriginalListIOS[selectIndex]
          ? galleryOriginalListIOS[selectIndex].node.image
          : null,
        android: galleryList[selectIndex].node.image,
      });
      // Platform.OS === 'ios'
      // ? galleryOriginalListIOS[selectIndex].node.image
      // : galleryList[selectIndex].node.image;

      const match = /\.(\w+)$/.exec(photo.filename ?? '');
      // file name이 없을 때 type 지정이 제대로 안돼서 node에 있는 type 정보를 대신 사용
      const type = Platform.select({
        ios: galleryOriginalListIOS[selectIndex]
          ? galleryOriginalListIOS[selectIndex].node.type === 'image'
            ? match
              ? `image/${match[1]}`
              : `image`
            : galleryOriginalListIOS[selectIndex].node.type
          : null,
        android:
          galleryList[selectIndex].node.type === 'image'
            ? match
              ? `image/${match[1]}`
              : `image`
            : galleryList[selectIndex].node.type,
      });

      const formData = new FormData();
      isParty === 'profile'
        ? (formData.append('party_id', party_id),
          formData.append('party_image', {
            uri: photo.uri,
            name: photo.filename !== null ? photo.filename : 'image.jpg',
            type,
          }))
        : formData.append('profile_image', {
            uri: photo.uri,
            name: photo.filename !== null ? photo.filename : 'image.jpg',
            type,
          });
      if (isParty === 'create') {
        toggleAlbum();
        setImage(photo);
        setImageType(type);
      } else {
        patchProfileImg(formData);
      }
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
    getGalleryPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const SelectedPhoto = useCallback(() => {
    if (selectIndex === -1) {
      return;
    }
    return (
      <View style={styles.square}>
        {cropPhoto ? (
          <View>
            <CropView
              ref={cropViewRef}
              sourceUrl={
                Platform.OS === 'ios'
                  ? galleryOriginalListIOS[selectIndex].node.image.uri
                  : galleryList[selectIndex].node.image.uri
              }
              style={styles.crop_view}
              onImageCrop={res => {
                Platform.select({
                  ios: galleryOriginalListIOS[selectIndex]
                    ? (galleryOriginalListIOS[selectIndex].node.image.uri =
                        'file://' + res.uri)
                    : null,
                  android: (galleryList[selectIndex].node.image.uri =
                    'file://' + res.uri),
                });
                setCropPhoto(false);
              }}
              keepAspectRatio={true}
              aspectRatio={{width: 1, height: 1}}
            />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                style={[styles.rotate_icon, {left: 16}]}
                onPress={() => cropViewRef.current.rotateImage(false)}>
                <TurnLeft />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.rotate_icon, {right: 16}]}
                onPress={() => cropViewRef.current.rotateImage(true)}>
                <TurnRight />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{flex: 1}}>
            <Image
              source={{
                uri: galleryList[selectIndex]
                  ? Platform.select({
                      ios: galleryOriginalListIOS[selectIndex]
                        ? galleryOriginalListIOS[selectIndex].node.image.uri
                        : null,
                      android: galleryList[selectIndex].node.image.uri,
                    })
                  : null,
              }}
              style={styles.square}
            />
          </View>
        )}
      </View>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cropPhoto, selectIndex]);

  return (
    <SafeAreaView
      style={{backgroundColor: fooiyColor.W, flex: 1}}
      edges={Platform.OS === 'ios' ? 'top' : null}>
      <StackHeader
        title="앨범"
        next={enroll}
        isParty={isParty}
        setIsVisible={setIsVisible}
      />
      {selectIndex !== -1 ? (
        <SelectedPhoto />
      ) : (
        <View style={styles.crop_view}></View>
      )}
      <View style={styles.mid_view}>
        {cropPhoto ? (
          <TouchableOpacity
            onPress={() =>
              selectIndex !== -1
                ? cropViewRef.current.saveImage(true)
                : setCropPhoto(false)
            }
            style={styles.mid_text}>
            <Text style={{...fooiyFont.Button, color: fooiyColor.P500}}>
              저장
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setCropPhoto(!cropPhoto)}
            style={styles.mid_text}>
            <Text style={{...fooiyFont.Button, color: fooiyColor.P500}}>
              편집
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={galleryOriginalList}
        style={{
          height: height - width - 56,
        }}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={4}
        numColumns={4}
        onEndReached={() => {
          getGalleryPhotos();
        }}
        renderItem={({item, index}) => {
          return (
            <View>
              {item.node ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    selectPhoto(index);
                  }}>
                  {galleryList.findIndex(element => element === index) ===
                  -1 ? (
                    <Image
                      source={{uri: item.node.image.uri}}
                      style={styles.gallery_item}
                    />
                  ) : (
                    <View>
                      <Image
                        source={{uri: item.node.image.uri}}
                        style={styles.gallery_item}
                      />
                      <View style={styles.item_index}>
                        <Text
                          style={{
                            ...fooiyFont.Caption2,
                            color: fooiyColor.W,
                          }}>
                          {galleryList.findIndex(element => element === index) +
                            1}
                        </Text>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              ) : null}
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default ProfileImg;

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
  rotate_icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 64,
  },
  mid_view: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
