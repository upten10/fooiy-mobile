import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';

import {StackHeader} from '../../common_ui/headers/StackHeader';

const Register = () => {
  const navigation = useNavigation();
  const width = Dimensions.get('window').width;
  const marginHeight = Dimensions.get('window').height / 2.8;
  const register_photo = () => {
    setModalVisible(true);
  };
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const goCamera = () => {
    navigation.navigate('RegisterCamera');
    toggleModal();
  };

  const goGallery = () => {
    navigation.navigate('Gallery');
    toggleModal();
  };

  return (
    <View style={styles.container}>
      <StackHeader title="사진 등록" />
      <TouchableOpacity onPress={register_photo}>
        <View style={[styles.register_photo, {width: width, height: width}]}>
          <Text>사진 등록</Text>
        </View>
      </TouchableOpacity>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={{marginTop: marginHeight, marginBottom: marginHeight}}>
        <View style={styles.modal_container}>
          <Text
            style={[
              styles.modal_title,
              {marginTop: marginHeight / 13, marginBottom: marginHeight / 13},
            ]}>
            사진 등록 방법을 선택해주세요.
          </Text>
          <View style={styles.modal_select}>
            <TouchableOpacity onPress={goCamera}>
              <Image
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  width: width / 2.7,
                  height: width / 2.7,
                  marginRight: 10,
                }}
                source={require('../../../assets/icons/register/ic_camera.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={goGallery}>
              <Image
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  width: width / 2.7,
                  height: width / 2.7,
                  marginLeft: 10,
                }}
                source={require('../../../assets/icons/register/ic_gallery.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modal_container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 8,
  },
  modal_title: {
    fontSize: 15,
  },
  modal_select: {
    flex: 1,
    flexDirection: 'row',
  },
  register_photo: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#555',
  },
});
