import React, {useRef, useState} from 'react';
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
import {SafeAreaView} from 'react-native-safe-area-context';
import {GalleryPencil, Notice} from '../../../../assets/icons/svg';
import {
  fooiyColor,
  fooiyFont,
  globalStyles,
} from '../../../common/globalStyles';
import {globalVariable} from '../../../common/globalVariable';
import {StackHeader} from '../../headers/StackHeader';

export default props => {
  const list = useRef(null);
  const currentOffset = useRef(0);
  const [photoList, setPhotoList] = useState(props.route.params.photos);

  let imageWidth = globalVariable.width - (59 + 16);

  const onClickNextButton = () => {
    console.log('next');
  };

  const renderItem = image => {
    const {item} = image;
    return (
      <Pressable onPress={() => console.log('jijiji')}>
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
  const onScrollEndDrag = e => {
    console.log(e.nativeEvent.contentOffset.x, currentOffset.current);
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
            onPress={() => console.log('jijiji')}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
