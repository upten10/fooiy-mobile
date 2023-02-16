import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {Platform} from 'react-native';
import RNFS from 'react-native-fs';
import FooiyToast from '../../../common/FooiyToast';
// 갤러리에서 사진 받아오기

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

const getGalleryPhotos = async (
  galleryCursor,
  setGalleryCursor,
  galleryList,
  setGalleryList,
) => {
  const params = {
    first: 12,
    assetType: 'Photos',
    ...(galleryCursor && {after: galleryCursor}),
  };
  try {
    if (galleryCursor !== false) {
      const {edges, page_info} = await CameraRoll.getPhotos(params).catch(e =>
        console.log(e),
      );
      if (page_info.has_next_page === false) {
        setGalleryCursor(false);
      } else {
        setGalleryCursor(page_info.end_cursor);
      }
      /*ios인 경우는 ph:// 형식으로 사진이 저장 uri가 아닌 url 이기에 읽을 수 없어
            react-native-fs의 파일 시스템을 이용하여 변환.*/
      for await (const item of edges) {
        if (Platform.OS === 'ios') {
          item.node.image.url = item.node.image.uri;
          const fileName = item.node.image.url.replace('ph://', '');
          const result = await phPathToFilePath(item.node.image.url, fileName);
          item.node.image.url = result;
        } else {
          item.node.image.url = item.node.image.uri;
        }
        // uri: 크롭뷰랑 위에 하나씩 뜨는 쪽
        // url : 아래 이미지 flat
      }
      setGalleryList([...galleryList, ...edges]);
    }
  } catch (error) {
    FooiyToast.error();
  }
};

export default getGalleryPhotos;
