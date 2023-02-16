import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fooiyColor} from '../../common/globalStyles';
import {StackHeader} from '../headers/StackHeader';
import getGalleryPhotos from './functions/getGalleryPhotos';
import goNext from './functions/goNext';
import GalleryPhotoFlatlist from './GalleryPhotoFlatlist';
import MainPhotoView from './MainPhotoView';
import WorkingPhotos from './WorkingPhotos';

const Gallery = props => {
  const navigation = useNavigation();
  const cropViewRef = useRef(null);
  const [cropPhoto, setCropPhoto] = useState(false);
  const [galleryCursor, setGalleryCursor] = useState(null);
  const [galleryList, setGalleryList] = useState([]);
  const [selectIndex, setSelectIndex] = useState(0);
  const [selectedPhotoIndexList, setSelectedPhotoList] = useState([]);
  const onClickNextButton = () => {
    props['partyCreate']
      ? goNext(props, navigation, selectedPhotoIndexList, galleryList)
      : goNext(
          props.route.params,
          navigation,
          selectedPhotoIndexList,
          galleryList,
        );
  };

  const getPhotos = () => {
    getGalleryPhotos(
      galleryCursor,
      setGalleryCursor,
      galleryList,
      setGalleryList,
    );
  };

  const saveImage = () => {
    selectedPhotoIndexList.length !== 0 && cropViewRef.current.saveImage(true);
  };

  const leftRotateImage = () => {
    cropViewRef.current.rotateImage(false);
  };

  const rightRotateImage = () => {
    cropViewRef.current.rotateImage(true);
  };

  useEffect(() => {
    getPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView
      style={{backgroundColor: fooiyColor.W, flex: 1}}
      edges={Platform.OS === 'ios' ? 'top' : null}>
      <StackHeader title="앨범" next={onClickNextButton} />
      <MainPhotoView
        cropPhoto={cropPhoto}
        cropViewRef={cropViewRef}
        setCropPhoto={setCropPhoto}
        galleryList={galleryList}
        galleryListIndex={selectedPhotoIndexList[selectIndex]}
        leftRotateImage={leftRotateImage}
        rightRotateImage={rightRotateImage}
        selectedPhotoIndexListLength={selectedPhotoIndexList.length}
      />
      <WorkingPhotos
        cropPhoto={cropPhoto}
        galleryList={galleryList}
        setSelectIndex={setSelectIndex}
        selectedPhotoIndexList={selectedPhotoIndexList}
        saveImage={saveImage}
        setCropPhoto={setCropPhoto}
      />
      <GalleryPhotoFlatlist
        cropPhoto={cropPhoto}
        getPhotos={getPhotos}
        galleryList={galleryList}
        selectedPhotoIndexList={selectedPhotoIndexList}
        setSelectedPhotoList={setSelectedPhotoList}
        setSelectIndex={setSelectIndex}
        setCropPhoto={setCropPhoto}
        is_multi={props.route?.params.is_multi}
      />
    </SafeAreaView>
  );
};

export default Gallery;
