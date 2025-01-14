import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Modal from 'react-native-modal';
import {
  Album,
  Camera,
  Cancel,
  Notice,
  Register_icon,
} from '../../../assets/icons/svg';
import {fooiyColor} from '../../common/globalStyles';
import {CameraPermission, GalleryPermission} from '../../common/Permission';
import {StackHeader} from '../../common_ui/headers/StackHeader';

const width = Dimensions.get('window').width;

const Register = props => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const register_photo = () => {
    setModalVisible(true);
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const goCamera = async () => {
    setModalVisible(false);
    (await CameraPermission()) &&
      (props.route.params
        ? navigation.navigate('RegisterCamera', {
            shop: props.route.params.shop,
          })
        : navigation.navigate('RegisterCamera'));
  };
  const goGallery = async () => {
    (await GalleryPermission()) && Platform.OS === 'ios'
      ? launchImageLibrary({includeExtra: true, selectionLimit: 3}, res => {
          if (res.didCancel) {
            console.log('Cancel');
          } else {
            setModalVisible(false);
            props.route.params
              ? navigation.navigate('IOSCrop', {
                  shop: props.route.params.shop,
                  navigation: 'FindMenu',
                  is_multi: true,
                  photos: res.assets,
                })
              : navigation.navigate('IOSCrop', {
                  navigation: 'SetAddress',
                  is_multi: true,
                  photos: res.assets,
                });
          }
        })
      : props.route.params
      ? navigation.navigate('Gallery', {
          shop: props.route.params.shop,
          navigation: 'FindMenu',
          is_multi: true,
        })
      : navigation.navigate('Gallery', {
          navigation: 'SetAddress',
          is_multi: true,
        });
  };

  return (
    <SafeAreaView style={{backgroundColor: fooiyColor.W}}>
      <StackHeader title="사진 등록" style={{color: 'black'}} />
      <TouchableOpacity
        onPress={register_photo}
        activeOpacity={0.8}
        style={styles.register_photo_container}>
        <View style={styles.register_photo}>
          <Register_icon style={styles.register_icon} />
          <Text style={styles.register_text}>사진 등록</Text>
        </View>
      </TouchableOpacity>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.modal}>
        <View style={styles.modal_container}>
          <View style={styles.modal_header}>
            <TouchableOpacity
              style={styles.cancel_btn}
              onPress={() => setModalVisible(false)}>
              <Cancel />
            </TouchableOpacity>
            <Text style={styles.register_method_text}>사진 등록 방법</Text>
          </View>
          <View style={styles.select_container}>
            <TouchableOpacity
              onPress={goCamera}
              activeOpacity={0.8}
              style={{width: (width - 71) / 2}}>
              <View style={styles.camera}>
                <Camera style={styles.camera_icon} />
                <Text style={styles.camera_text}>카메라</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={goGallery}
              activeOpacity={0.8}
              style={{width: (width - 71) / 2}}>
              <View style={styles.album}>
                <Album style={styles.album_icon} />
                <Text style={styles.album_text}>앨범</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.info_container}>
        <View style={styles.info_title}>
          <Text style={styles.info_title_text}>사진 등록 안내 사항</Text>
          <View style={styles.info}>
            <Notice style={styles.notice_icon} />
            <Text style={styles.info_text}>
              정방형 (1:1) 사진으로 촬영해요.
            </Text>
          </View>
          <View style={styles.info}>
            <Notice style={styles.notice_icon} />
            <Text style={styles.info_text}>
              사진에 주소가 등록되어있으면 편해요.
            </Text>
          </View>
          <View style={styles.info}>
            <Notice style={styles.notice_icon} />
            <Text style={styles.info_text}>
              메뉴 1개에 사진 여러 장 등록 가능해요.
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  register_photo_container: {
    width: '100%',
    height: width,
    backgroundColor: fooiyColor.G50,
  },
  register_icon: {
    width: 24,
    height: 24,
  },
  register_text: {
    marginTop: 8,
    color: fooiyColor.G600,
    fontFamily: 'Pretendard-SemiBold',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
    alignItems: 'center',
  },
  register_photo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
  },
  modal_container: {
    width: '100%',
    borderRadius: 16,
    backgroundColor: fooiyColor.W,
  },
  modal_header: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    paddingBottom: 0,
  },
  cancel_btn: {
    position: 'absolute',
    left: 0,
    margin: 16,
    color: fooiyColor.B,
  },
  register_method_text: {
    color: fooiyColor.B,
    fontFamily: 'Pretendard-SemiBold',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
  },
  select_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 16,
  },
  camera: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: fooiyColor.G200,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 3.5,
    height: (width - 71) / 2,
  },
  camera_icon: {
    width: 36,
    height: 36,
    marginBottom: 8,
  },
  camera_text: {
    color: fooiyColor.G600,
    fontFamily: 'Pretendard-SemiBold',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
  },
  album: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: fooiyColor.G200,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 3.5,
    height: (width - 71) / 2,
  },
  album_icon: {
    width: 36,
    height: 36,
    marginBottom: 8,
  },
  album_text: {
    color: fooiyColor.G600,
    fontFamily: 'Pretendard-SemiBold',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
  },
  info_container: {
    height: '100%',
    backgroundColor: fooiyColor.W,
    padding: 16,
  },
  info_title: {
    backgroundColor: fooiyColor.P50,
    borderRadius: 8,
    padding: 16,
  },
  info_title_text: {
    color: fooiyColor.G600,
    fontFamily: 'Pretendard-SemiBold',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
  },
  info: {
    flexDirection: 'row',
    marginTop: 8,
  },
  notice_icon: {
    marginRight: 8,
    width: 18,
    height: 18,
  },
  info_text: {
    color: fooiyColor.G600,
    fontFamily: 'Pretendard-Regular',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
  },
});
