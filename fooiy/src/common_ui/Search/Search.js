import React from 'react';
import {View, Text, Platform} from 'react-native';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {StackHeader} from '../headers/StackHeader';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ShopSearch from './ShopSearch';
import LocationSearch from './LocationSearch';
import UserSearch from './UserSearch';
import {globalVariable} from '../../common/globalVariable';
import {SafeAreaView} from 'react-native-safe-area-context';

const Search = props => {
  const Tab = createMaterialTopTabNavigator();
  const initialRouteName =
    props.navigation.getState().routes[0].name === 'Feed'
      ? '음식점'
      : props.navigation.getState().routes[0].name === 'Mypage'
      ? '유저'
      : '위치';

  return (
    <SafeAreaView
      style={{backgroundColor: fooiyColor.W, flex: 1}}
      edges={Platform.OS === 'ios' ? 'top' : null}>
      <StackHeader title={'검색'} />
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            borderBottomColor: fooiyColor.B,
            borderBottomWidth: 4,
            borderRadius: 4,
            width: 62,
            marginHorizontal: (globalVariable.width / 3 - 62) / 2,
          },
        }}
        initialRouteName={initialRouteName}>
        <Tab.Screen
          name="음식점"
          component={ShopSearch}
          options={{
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  ...fooiyFont.Subtitle1,
                  color: focused ? fooiyColor.G800 : fooiyColor.G400,
                }}>
                음식점
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name="위치"
          component={LocationSearch}
          options={{
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  ...fooiyFont.Subtitle1,
                  color: focused ? fooiyColor.G800 : fooiyColor.G400,
                }}>
                위치
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name="유저"
          component={UserSearch}
          options={{
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  ...fooiyFont.Subtitle1,
                  color: focused ? fooiyColor.G800 : fooiyColor.G400,
                }}>
                유저
              </Text>
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default Search;
