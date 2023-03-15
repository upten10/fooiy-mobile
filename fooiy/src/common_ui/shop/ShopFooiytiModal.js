import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {Ic_close_K, Shop_fooiyti_description} from '../../../assets/svg';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';

const ShopFooiytiModal = props => {
  const {isModalVisible, setModalVisible} = props;
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
      <View style={styles.container}>
        <View style={styles.modal_title}>
          <Text style={styles.title}>음식점 푸이티아이</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
            onPress={toggleModal}
            style={styles.icon_cancel}>
            <Ic_close_K />
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>
          음식점 푸이티아이를 확인해보세요. 음식점과 내 푸이티아이가 같을수록
          입맛에 맞을 확률이 높아져요.
        </Text>
        <View style={styles.taste_evaluation_image}>
          <Shop_fooiyti_description
            style={{width: globalVariable.width - 280}}
          />
        </View>
      </View>
    </Modal>
  );
};

export default memo(ShopFooiytiModal);

const styles = StyleSheet.create({
  container: {
    height: 252,
    width: globalVariable.width - 32,
    borderRadius: 16,
    backgroundColor: fooiyColor.W,
  },
  modal_title: {
    flexDirection: 'row',
    marginLeft: 24,
    marginTop: 24,
    justifyContent: 'space-between',
  },
  title: {
    ...fooiyFont.Subtitle1,
    color: fooiyColor.B,
  },
  icon_cancel: {
    marginRight: 24,
    width: 24,
    height: 24,
  },
  description: {
    marginTop: 8,
    marginHorizontal: 24,
    ...fooiyFont.Body2,
    color: fooiyColor.G800,
  },
  taste_evaluation_image: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 108,
    width: globalVariable.width - 80,
    marginLeft: 24,
    marginTop: 16,
    marginBottom: 24,
  },
});
