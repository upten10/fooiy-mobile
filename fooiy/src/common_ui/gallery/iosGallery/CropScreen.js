import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {CropView} from 'react-native-image-crop-tools';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  GalleryPencil,
  Notice,
  TurnLeft,
  TurnRight,
} from '../../../../assets/icons/svg';
import {fooiyColor, fooiyFont} from '../../../common/globalStyles';
import {globalVariable} from '../../../common/globalVariable';
import {StackHeader} from '../../headers/StackHeader';
import goNext from '../functions/goNext';

export default props => {
  const navigation = useNavigation();

  const list = useRef(null);
  const currentOffset = useRef(0);
  const cropViewRef = useRef(null);

  const [photoList, setPhotoList] = useState(props.route.params.photos);
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  let imageWidth = globalVariable.width - (59 + 16);

  const onClickNextButton = () => {
    const photos = photoList.map(photo => {
      return {
        node: {
          image: {
            uri: photo.uri,
            filename: photo.fileName,
            id: photo.id,
            timestamp: photo.timestamp,
          },
          location: photo.location,
          type: photo.type,
        },
      };
    });
    goNext(props.route.params, navigation, [0, 1, 2], photos);
  };

  const onEdit = index => {
    setSelectedPhoto(index);
    setIsVisible(true);
  };

  const onScrollEndDrag = e => {
    if (e.nativeEvent.contentOffset.x > currentOffset.current) {
      list.current.scrollToOffset({
        offset: currentOffset.current + imageWidth - 16,
        animated: true,
      });
    } else if (e.nativeEvent.contentOffset.x < currentOffset.current) {
      list.current.scrollToOffset({
        offset: currentOffset.current - imageWidth + 16,
        animated: true,
      });
    }
  };

  const EditPhotoView = () => {
    const saveImage = () => {
      cropViewRef.current.saveImage(true);
    };

    const leftRotateImage = () => {
      cropViewRef.current.rotateImage(false);
    };

    const rightRotateImage = () => {
      cropViewRef.current.rotateImage(true);
    };
    return (
      <SafeAreaView
        style={{
          position: 'absolute',
          height: globalVariable.height,
          backgroundColor: fooiyColor.W,
        }}>
        <StackHeader
          title={'사진 편집'}
          isParty={true}
          setIsVisible={setIsVisible}
        />
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={styles.square}>
            <CropView
              ref={cropViewRef}
              sourceUrl={photoList[selectedPhoto].uri}
              style={styles.crop_view}
              onImageCrop={res => {
                photoList[selectedPhoto].uri = 'file://' + res.uri;
                setIsVisible(false);
              }}
              keepAspectRatio={true}
              aspectRatio={{width: 1, height: 1}}
            />
            <View style={styles.rotate_button_container}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.rotate_icon, {left: 16}]}
                onPress={leftRotateImage}>
                <TurnLeft />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.rotate_icon, {right: 16}]}
                onPress={rightRotateImage}>
                <TurnRight />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={saveImage}
          style={{
            width: globalVariable.width - 32,
            height: 56,
            backgroundColor: fooiyColor.P500,
            borderRadius: 8,
            marginLeft: 16,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              ...fooiyFont.Button,
              color: fooiyColor.W,
              lineHeight: Platform.select({
                ios: 0,
                android: null,
              }),
            }}>
            저장
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  const renderItem = image => {
    const {item, index} = image;
    return (
      <Pressable key={index} onPress={() => onEdit(index)}>
        <FastImage
          source={{uri: item.uri}}
          style={{
            width: imageWidth,
            height: imageWidth,
            borderRadius: 8,
          }}
        />
        <View
          style={{
            position: 'absolute',
            right: 16,
            bottom: 16,
            backgroundColor: fooiyColor.W,
            width: 36,
            height: 36,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            ...Platform.select({
              ios: {
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 0.15, // 낮을수록 진해짐
                },
                shadowOpacity: 0.25, // 높을수록 진해짐
                shadowRadius: 5,
              },
              android: {
                elevation: 20,
              },
            }),
          }}>
          <GalleryPencil />
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: fooiyColor.W}}>
      <StackHeader next={onClickNextButton} />
      <View>
        {photoList.length > 1 ? (
          <FlatList
            ref={list}
            data={photoList}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            onScrollBeginDrag={e => {
              currentOffset.current = e.nativeEvent.contentOffset.x;
            }}
            onScrollEndDrag={e => {
              onScrollEndDrag(e);
            }}
            horizontal
            ItemSeparatorComponent={<View style={{width: 8}} />}
            ListHeaderComponent={<View style={{width: 16}} />}
            ListFooterComponent={<View style={{width: 16}} />}
            style={{marginTop: 24}}
          />
        ) : (
          <Pressable
            style={{
              alignItems: 'center',
              marginTop: 24,
              paddingHorizontal: 16,
            }}
            onPress={() => onEdit(photoList[0])}>
            <FastImage
              source={{uri: photoList[0].uri}}
              style={{
                width: globalVariable.width - 32,
                height: globalVariable.width - 32,
                borderRadius: 8,
              }}
            />
            <View
              style={{
                position: 'absolute',
                right: 32,
                bottom: 16,
                backgroundColor: fooiyColor.W,
                width: 36,
                height: 36,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                ...Platform.select({
                  ios: {
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 0.15, // 낮을수록 진해짐
                    },
                    shadowOpacity: 0.25, // 높을수록 진해짐
                    shadowRadius: 5,
                  },
                  android: {
                    elevation: 20,
                  },
                }),
              }}>
              <GalleryPencil />
            </View>
          </Pressable>
        )}
      </View>
      <View
        style={{
          backgroundColor: fooiyColor.P50,
          padding: 16,
          borderRadius: 8,
          marginTop: 24,
          marginHorizontal: 16,
        }}>
        <Text
          style={{
            marginBottom: 8,
            ...fooiyFont.Subtitle3,
            color: fooiyColor.G600,
          }}>
          사진 등록 안내사항
        </Text>
        <View style={{flexDirection: 'row', marginBottom: 8}}>
          <Notice style={{marginRight: 8}} />
          <Text style={{...fooiyFont.Caption1, color: fooiyColor.G600}}>
            정방형 (1:1) 사진으로 촬영해요.
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 8}}>
          <Notice style={{marginRight: 8}} />
          <Text style={{...fooiyFont.Caption1, color: fooiyColor.G600}}>
            사진에 주소가 등록되어있으면 편해요.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Notice style={{marginRight: 8}} />
          <Text style={{...fooiyFont.Caption1, color: fooiyColor.G600}}>
            카메라로 촬영하면 1장만 등록 가능해요.
          </Text>
        </View>
      </View>
      {isVisible ? <EditPhotoView /> : null}
    </SafeAreaView>
  );
};

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
  rotate_button_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});
