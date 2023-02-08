import messaging from '@react-native-firebase/messaging';
import {useFlipper} from '@react-navigation/devtools';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Platform, StatusBar, Text, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {fooiyColor, fooiyFont} from './src/common/globalStyles';
import {globalVariable} from './src/common/globalVariable';
import RootNavigator from './src/navigation/RootNavigator';
import store from './src/redux/store';

const toastConfig = {
  notification: ({text1, text2}) => (
    <View
      style={{
        height: 82,
        width: globalVariable.width - 32,
        backgroundColor: fooiyColor.G800,
        borderRadius: 8,
        marginTop: Platform.OS === 'ios' ? 16 : 0,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}>
      <Text style={{...fooiyFont.Subtitle2, color: fooiyColor.W}}>{text1}</Text>
      <Text style={{...fooiyFont.Caption1, color: fooiyColor.W}}>{text2}</Text>
    </View>
  ),
  message: ({text1}) => (
    <View
      style={{
        height: 56,
        marginBottom: Platform.OS === 'ios' ? globalVariable.tabBarHeight : 32,
        width: globalVariable.width - 32,
        backgroundColor: fooiyColor.G800,
        borderRadius: 8,
        marginTop: Platform.OS === 'ios' ? 16 : 0,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}>
      <Text style={{...fooiyFont.Subtitle2, color: fooiyColor.W}}>{text1}</Text>
    </View>
  ),
};

const App = () => {
  // Test
  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      // remoteMessage ? console.log('true') : console.log('false');
      console.log(remoteMessage, 'Test notification');
    });
  }, []);
  // Background Notification
  useEffect(() => {
    messaging().onNotificationOpenedApp(async remoteMessage => {
      console.log(remoteMessage, 'Background notification');
    });
  }, []);
  // // Quit Notification
  // useEffect(() => {
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       console.log(remoteMessage, 'Quit notification');
  //     });
  // }, []);
  // Foreground Notification
  useEffect(() => {
    messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage, 'Foreground notification');
      const {notification} = remoteMessage;
      if (notification !== null) {
        const {title, body} = notification;
        Toast.show({
          type: 'notification',
          text1: title,
          text2: body,
        });
      }
    });
  }, []);

  const linking = {
    prefixes: ['kakaoadeeb3a64a0ef610048dbcbe1010c07f://'],
    config: {
      screens: {
        Test: 'kakaolink',
      },
    },
  };

  const navigationRef = useNavigationContainerRef();

  useFlipper(navigationRef);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer linking={linking} ref={navigationRef}>
          <RootNavigator />
          <StatusBar barStyle={'dark-content'} />
        </NavigationContainer>
        <Toast config={toastConfig} />
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
