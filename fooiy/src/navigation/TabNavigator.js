import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Route} from './Route';
import {globalStyles} from '../common/globalStyles';
import SplashScreen from 'react-native-splash-screen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 500);
  }, []);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          ...globalStyles.tab_bar,
          ...globalStyles.shadow,
        },
        lazy: false,
      }}>
      {Route.map(route => (
        <Tab.Screen
          key={route.id}
          name={route.name}
          component={route.component}
          options={{
            tabBarIcon: ({focused}) => (
              <View>
                <Image
                  source={focused ? route.focused : route.unfocused}
                  resizeMode="contain"
                />
              </View>
            ),
          }}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              try {
                if (route.name === 'FeedStackNavigation') {
                  if (navigation.isFocused()) {
                    navigation.navigate('FeedStackNavigation', {
                      screen: 'Feed',
                    });
                  }
                } else {
                  navigation.navigate(route.name);
                }
              } catch (error) {}
            },
          })}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigator;
