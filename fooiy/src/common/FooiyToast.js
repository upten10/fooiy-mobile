import Toast from 'react-native-toast-message';

const message = (text, timer, offset) => {
  if (timer !== undefined) {
    setTimeout(function () {
      Toast.show({
        type: 'message',
        text1: text,
        position: 'bottom',
        visibilityTime: 2000,
        bottomOffset: offset,
      });
    }, 500);
  } else {
    Toast.show({
      type: 'message',
      text1: text,
      position: 'bottom',
      visibilityTime: 2000,
      bottomOffset: offset,
    });
  }
};

const error = text => {
  Toast.show({
    type: 'message',
    text1: text ? text : '알 수 없는 에러가 발생했어요.',
    position: 'bottom',
    visibilityTime: 2000,
    bottomOffset: offset,
  });
};

export default {message, error};
