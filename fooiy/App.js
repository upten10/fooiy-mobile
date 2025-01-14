import messaging from '@react-native-firebase/messaging';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Platform, StatusBar, Text, View} from 'react-native';
import CodePush from 'react-native-code-push';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import analytics from '@react-native-firebase/analytics';
import {fooiyColor, fooiyFont} from './src/common/globalStyles';
import {globalVariable} from './src/common/globalVariable';
import RootNavigator from './src/navigation/RootNavigator';
import store from './src/redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useCodePush from './src/common/hooks/useCodePush';

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
        paddingLeft: 16,
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}>
      <Text
        style={{
          ...fooiyFont.Subtitle2,
          color: fooiyColor.W,
          textAlign: 'center',
          lineHeight: Platform.select({ios: 0, android: null}),
        }}>
        {text1}
      </Text>
    </View>
  ),
};

const App = () => {
  const {updating} = useCodePush();
  // Test
  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {});
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
  //
  // Foreground Notification
  useEffect(() => {
    messaging().onMessage(async remoteMessage => {
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
        Share: 'kakaolink',
      },
    },
  };

  const navigationRef = useNavigationContainerRef();
  const routeNameRef = React.useRef(null);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        {updating ? null : (
          <NavigationContainer
            linking={linking}
            ref={navigationRef}
            onReady={() =>
              (routeNameRef.current =
                navigationRef.current.getCurrentRoute().name)
            }
            onStateChange={state => {
              const previousRouteName = routeNameRef.current;
              const currentRouteName =
                navigationRef.current.getCurrentRoute().name;

              if (previousRouteName !== currentRouteName) {
                analytics()
                  .logScreenView({
                    screen_name: currentRouteName,
                    screen_class: currentRouteName,
                  })
                  .then(() => {})
                  .catch(err => {});
              }
              routeNameRef.current = currentRouteName;
            }}>
            <RootNavigator />
            <StatusBar barStyle={'dark-content'} />
          </NavigationContainer>
        )}
        <Toast config={toastConfig} />
      </Provider>
    </SafeAreaProvider>
  );
};

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.MANUAL,
};
export default CodePush(codePushOptions)(App);
