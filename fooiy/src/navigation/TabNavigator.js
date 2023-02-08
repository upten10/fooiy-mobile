import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Route} from './Route';
import {fooiyColor, fooiyFont, globalStyles} from '../common/globalStyles';
import SplashScreen from 'react-native-splash-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {globalVariable} from '../common/globalVariable';
import {useDispatch} from 'react-redux';
import {insetsAction} from '../redux/actions/insetsAction';
import TabBarIcon from '../../assets/icons/svg/TabBar/TabBarIcon';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  dispatch(insetsAction.setInsets(insets));
  useEffect(() => {
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
