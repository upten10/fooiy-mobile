// import * as React from 'react';
// import {useState, useEffect} from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import TabNavigator from './TabNavigator';
// import Login from '../screens/Login/Login';
// import {useDispatch, useSelector} from 'react-redux';
// import {loginActions} from '../redux/reducer/login';
// import store from '../redux/store';

// const MainNavigator = () => {
//   const isLoginRedux = useSelector(state => state.login.isLogin);
//   const dispatch = useDispatch();

//   const route = async () => {
//     const value = await AsyncStorage.getItem('auth');
//     if (value) {
//       dispatch(loginActions.setLogin(true));
//     }
//   };

//   useEffect(() => {
//     route();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <NavigationContainer independent={true}>
//       {isLoginRedux ? <TabNavigator /> : <Login />}
//     </NavigationContainer>
//   );
// };

// export default MainNavigator;
