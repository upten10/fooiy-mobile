import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch} from 'react-redux';
import TabBarIcon from '../../assets/icons/svg/TabBar/TabBarIcon';
import {ApiManagerV2} from '../common/api/v2/ApiManagerV2';
import {apiUrl} from '../common/Enums';
import FooiyToast from '../common/FooiyToast';
import {fooiyColor, fooiyFont, globalStyles} from '../common/globalStyles';
import {globalVariable} from '../common/globalVariable';
import {insetsAction} from '../redux/actions/insetsAction';
import {userInfoAction} from '../redux/actions/userInfoAction';
import {Route} from './Route';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const getAccountInfo = async data => {
    ApiManagerV2.get(apiUrl.ACCOUNT_INFO, {
      params: {},
    })
      .then(res => {
        if (res.data.payload.account_info.fooiyti === null) {
          navigation.navigate('FooiytiTestHome');
        } else {
          dispatch(userInfoAction.init(res.data.payload.account_info));
        }
      })
      .catch(e => FooiyToast.error());
  };

  dispatch(insetsAction.setInsets(insets));

  useEffect(() => {
    getAccountInfo();
    setTimeout(() => SplashScreen.hide(), 500);
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="FeedStackNavigation"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          ...globalStyles.tab_bar,
          ...globalStyles.shadow,
          height: globalVariable.tabBarHeight + insets.bottom,
        },
      }}>
      {Route.map(route => (
        <Tab.Screen
          key={route.id}
          name={route.name}
          component={route.component}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.tabContainer}>
                <View style={styles.iconContainer}>
                  <TabBarIcon name={route.text} isFocused={focused} />
                </View>
                {route.id !== 3 ? (
                  <Text
                    style={
                      focused
                        ? [styles.tabText, styles.focusedTabText]
                        : styles.tabText
                    }>
                    {route.text}
                  </Text>
                ) : null}
              </View>
            ),
          }}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              try {
                navigation.navigate(route.name);
              } catch (error) {}
            },
          })}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {},
  tabText: {
    ...fooiyFont.Caption1,
    color: fooiyColor.G300,
    marginTop: 8,
  },
  focusedTabText: {
    color: fooiyColor.P500,
  },
});
