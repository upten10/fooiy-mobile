import React, {memo, useEffect, useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Platform} from 'react-native';
import Modal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import Margin from '../Margin';

const MoreVertModal = props => {
  const insets = useSafeAreaInsets();
  const {buttons, isModalVisible, toggleModal, isWorking} = props;
  const [currentStage, setCurrentStage] = useState('');

  useEffect(() => {
    !isModalVisible && setCurrentStage('');
  }, [isModalVisible]);

  const SelectButtons = props => {
    const {button} = props;
    return button.isNext ? (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setCurrentStage(button.name);
        }}>
        <View style={styles.button_container}>
          <Text style={[styles.button, {color: button.textColor}]}>
            {button.name}
          </Text>
        </View>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity activeOpacity={0.8} onPress={button.onClick}>
        <View style={styles.button_container}>
          <Text style={[styles.button, {color: button.textColor}]}>
            {button.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    !isWorking && (
      <Modal
        style={styles.modal_container}
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}>
        <View style={styles.container}>
          {currentStage === '' ? (
            buttons.map((button, index) => {
              return <SelectButtons key={index} button={button} />;
            })
          ) : (
            <View style={styles.next_container}>
              <Text style={styles.next_title}>
                {buttons[0].domain}을 {currentStage}하시겠습니까?
              </Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity activeOpacity={0.8} onPress={toggleModal}>
                  <View style={styles.next_cancel_button}>
                    <Text style={styles.next_cancel_button_text}>취소</Text>
                  </View>
                </TouchableOpacity>
                <Margin w={8} />
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={
                    buttons.find(button => button.name === currentStage).onClick
                  }>
                  <View style={styles.next_button}>
                    <Text style={styles.next_button_text}>{currentStage}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        <View style={{backgroundColor: fooiyColor.W, height: insets.bottom}} />
      </Modal>
    )
  );
};

export default MoreVertModal;

const styles = StyleSheet.create({
  modal_container: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: fooiyColor.W,
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
  },
  button_container: {
    marginHorizontal: 16,
    marginTop: 16,
    height: 56,
    backgroundColor: fooiyColor.W,
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: fooiyColor.G200,
  },
  button: {
    ...fooiyFont.Button,
    lineHeight: Platform.select({ios: 0, android: 16}),
    textAlign: 'center',
  },
  next_container: {
    height: 168,
    alignItems: 'center',
    justifyContent: 'center',
  },
  next_title: {
    ...fooiyFont.Subtitle1,
    color: fooiyColor.B,
    marginBottom: 24,
  },
  next_cancel_button: {
    width: 168,
    height: 48,
    borderWidth: 1,
    borderColor: fooiyColor.G200,
    borderRadius: 8,
    justifyContent: 'center',
  },
  next_cancel_button_text: {
    ...fooiyFont.Button,
    color: fooiyColor.G600,
    lineHeight: Platform.select({ios: 0, android: 16}),
    textAlign: 'center',
  },
  next_button: {
    width: 168,
    height: 48,
    backgroundColor: fooiyColor.P500,
    borderRadius: 8,
    justifyContent: 'center',
    textAlign: 'center',
  },
  next_button_text: {
    ...fooiyFont.Button,
    color: fooiyColor.W,
    textAlign: 'center',
  },
});
