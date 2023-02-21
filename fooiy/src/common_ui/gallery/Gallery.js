import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {Platform, PanResponder, Animated, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ArrowIconBottom} from '../../../assets/icons/svg';
import {fooiyColor} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';
import SelectCategoryModal from '../../screens/feed/SelectCategoryModal';
import {StackHeader} from '../headers/StackHeader';
import getGalleryPhotos from './functions/getGalleryPhotos';
import goNext from './functions/goNext';
import GalleryPhotoFlatlist from './GalleryPhotoFlatlist';
import MainPhotoView from './MainPhotoView';
import WorkingPhotos from './WorkingPhotos';
// import {useAnimatedValue} from 'react-native-reanimated';

const Gallery = props => {
  const collapsingY = -globalVariable.width;
  const navigation = useNavigation();
  const cropViewRef = useRef(null);
  const [cropPhoto, setCropPhoto] = useState(false);
  const [galleryCursor, setGalleryCursor] = useState(null);
  const [galleryList, setGalleryList] = useState([]);
  const [selectIndex, setSelectIndex] = useState(0);
  const [selectedPhotoIndexList, setSelectedPhotoList] = useState([]);
  const [open, setOpen] = useState(false);
  const [album, setAlbum] = useState('all');
  const isCollapse = useRef(false);

  const workingPhotosPositionY = useRef(new Animated.Value(0)).current;
  const currentValue = useRef(0);
  const upSpring = () => {
    currentValue.current = collapsingY;
    Animated.spring(workingPhotosPositionY, {
      toValue: collapsingY,
      duration: 100,
      useNativeDriver: true,
    }).start();
    isCollapse.current = true;
  };
  const downSpring = () => {
    currentValue.current = 0;
    Animated.spring(workingPhotosPositionY, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
    isCollapse.current = false;
  };
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      if (gestureState.dy > 0) {
        if (isCollapse.current) {
          return true;
        } else {
          return false;
        }
      } else {
        if (isCollapse.current) {
          return false;
        } else {
          return true;
        }
      }
    },
    onStartShouldSetPanResponder: () => false,
    onPanResponderMove: (evt, gestureState) => {
      workingPhotosPositionY.setValue(currentValue.current + gestureState.dy);
    },
    onPanResponderEnd: (evt, gestureState) => {
      if (gestureState.dy < -100) {
        upSpring();
      } else {
        downSpring();
      }
    },
  });

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
      album,
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

  const selectItem = () => {
    setOpen(!open);
  };

  return (
    <SafeAreaView
      style={{backgroundColor: fooiyColor.W, flex: 1, zIndex: 100}}
      edges={Platform.OS === 'ios' ? 'top' : null}>
      <View style={{zIndex: 100}}>
        <StackHeader
          title={album === 'all' ? '모든 앨범' : '즐겨찾기'}
          next={onClickNextButton}
          toTop={Platform.OS === 'ios' ? selectItem : undefined}
          isAlbum={true}
        />
        {open && (
          <SelectCategoryModal
            isAlbum={true}
            setOpen={setOpen}
            open={open}
            setAlbum={setAlbum}
            album={album}
            galleryCursor={galleryCursor}
            setGalleryCursor={setGalleryCursor}
            galleryList={galleryList}
            setGalleryList={setGalleryList}
          />
        )}
      </View>

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
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          {backgroundColor: fooiyColor.W},
          {transform: [{translateY: workingPhotosPositionY}]},
        ]}>
        <WorkingPhotos
          cropPhoto={cropPhoto}
          galleryList={galleryList}
          setSelectIndex={setSelectIndex}
          selectedPhotoIndexList={selectedPhotoIndexList}
          saveImage={saveImage}
          setCropPhoto={setCropPhoto}
          downSpring={downSpring}
        />
      </Animated.View>
      <Animated.View
        style={[{transform: [{translateY: workingPhotosPositionY}]}]}>
        <GalleryPhotoFlatlist
          cropPhoto={cropPhoto}
          getPhotos={getPhotos}
          galleryList={galleryList}
          selectedPhotoIndexList={selectedPhotoIndexList}
          setSelectedPhotoList={setSelectedPhotoList}
          setSelectIndex={setSelectIndex}
          setCropPhoto={setCropPhoto}
          downSpring={downSpring}
          is_multi={props.route?.params.is_multi}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

export default Gallery;
