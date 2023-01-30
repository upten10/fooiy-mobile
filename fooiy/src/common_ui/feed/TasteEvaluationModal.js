import React, {memo} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Modal from 'react-native-modal';

import {globalVariable} from '../../common/globalVariable';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {Cancel} from '../../../assets/icons/svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {TasteEvaluationDescription} from '../../../assets/icons/svg';

const TasteEvaluationModal = props => {
  const {isModalVisible, setModalVisible} = props;
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <Modal isVisible={isModalVisible} onBackdropPress={() => toggleModal()}>
      <View style={styles.container}>
        <View style={styles.modal_title}>
          <Text style={styles.title}>맛 평가가 무엇인가요?</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
            onPress={() => toggleModal()}
            style={styles.icon_cancel}>
            <Cancel />
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>
          유저가 먹은 음식이 맛있었는지 확인할 수 있어요.
          {'\n'}나와 같은 푸이티아이가 좋아한 음식은 맛있을 확률이 더욱
          높아져요.
        </Text>
        <View style={styles.taste_evaluation_image}>
          <TasteEvaluationDescription
            style={{width: globalVariable.width - 280}}
          />
        </View>
      </View>
    </Modal>
  );
};

export default memo(TasteEvaluationModal);

const styles = StyleSheet.create({
  container: {
    height: 248,
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
    height: 80,
    width: globalVariable.width - 80,
    marginLeft: 24,
    marginTop: 16,
    marginBottom: 24,
  },
});
