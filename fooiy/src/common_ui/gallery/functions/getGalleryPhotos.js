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

const getFirstPhotos = async (
  galleryCursor,
  setGalleryCursor,
  setGalleryList,
  setFavoriteCount,
  setIsFirstLoading,
) => {
  const getSmartAlbums = await CameraRoll.getSmartAlbums({
    assetType: 'Photos',
  });
  const favoriteCount = getSmartAlbums[1]
    ? getSmartAlbums[1].title === 'Favorites'
      ? getSmartAlbums[1].count > 300
        ? 300
        : getSmartAlbums[1].count
      : 0
    : 0;
  setFavoriteCount(favoriteCount);
  const params = {
    first: favoriteCount,
    groupTypes: 'Album',
    assetType: 'Photos',
  };
  const params_next = {
    first: 80,
    ...(galleryCursor && {after: galleryCursor}),
    groupTypes: 'All',
    assetType: 'Photos',
  };

  try {
    if (galleryCursor !== false) {
      const edge = await CameraRoll.getPhotos(params).then(res => {
        return res.edges;
      });
      /*ios인 경우는 ph:// 형식으로 사진이 저장 uri가 아닌 url 이기에 읽을 수 없어
            react-native-fs의 파일 시스템을 이용하여 변환.*/
      for await (const item of edge) {
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

      const {edges, page_info} = await CameraRoll.getPhotos(params_next);
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
      setGalleryList([...edge, ...edges]);
      setIsFirstLoading(true);
    }
  } catch (error) {
    console.log(error);
    setIsFirstLoading(true);
  }
};

const getGalleryPhotos = async (
  galleryCursor,
  setGalleryCursor,
  galleryList,
  setGalleryList,
) => {
  const params = {
    first: 80,
    ...(galleryCursor && {after: galleryCursor}),
    groupTypes: 'All',
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
      // console.log(edges);
      setGalleryList([...galleryList, ...edges]);
    }
  } catch (error) {}
};

export {getGalleryPhotos};
export {getFirstPhotos};
