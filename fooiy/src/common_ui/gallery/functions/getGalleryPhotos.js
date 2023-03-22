import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {Platform} from 'react-native';
import RNFS from 'react-native-fs';
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
  let startTime = new Date().getTime();

  const params = {
    first: 48,
    ...(galleryCursor && {after: galleryCursor}),
    assetType: 'Photos',
  };

  try {
    if (galleryCursor !== false) {
      const {edges, page_info} = await CameraRoll.getPhotos(params);
      if (page_info.has_next_page === false) {
        setGalleryCursor(false);
      } else {
        setGalleryCursor(page_info.end_cursor);
      }
      for await (const item of edges) {
        item.node.image.url = item.node.image.uri;
        // if (Platform.OS === 'ios') {
        //   item.node.image.url = await phPathToFilePath(
        //     item.node.image.url,
        //     item.node.image.filename,
        //   );
        // }
        // uri: 크롭뷰랑 위에 하나씩 뜨는 쪽
        // url : 아래 이미지 flat
      }
      setGalleryList([...galleryList, ...edges]);
      let endTime = new Date().getTime();
    }
  } catch (error) {}
};

export {getGalleryPhotos};
