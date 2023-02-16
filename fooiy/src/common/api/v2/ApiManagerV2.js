import axios from 'axios';
import {Platform} from 'react-native';
import {getUniqueId} from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {BASEURL, AUTHORIZATION, DEVICEID} from '@env';
const BASEURL = 'http://dev-api.fooiy.com/api/v2/';
// const BASEURL = 'https://api.fooiy.com/api/v2/';
const baseURL = BASEURL;
const ApiManagerV2 = axios.create({
  baseURL: baseURL, // your url
  responseType: 'json',
  headers: {
    Authorization: '',
    os: Platform.OS,
    'device-id': '',
  }, // your headers
  withCredentials: true,
});

ApiManagerV2.interceptors.request.use(
  async config => {
    const auth = await AsyncStorage.getItem('auth');
    if (auth) {
      config.headers.Authorization = auth;
    }
    const device_id = await getUniqueId();
    if (device_id) {
      config.headers['device-id'] = device_id;
    }
    return config;
  },
  error => {
    console.log('requestError====>', error);
  },
);

ApiManagerV2.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // console.log("responseError====>", error);
  },
);

export {ApiManagerV2};
