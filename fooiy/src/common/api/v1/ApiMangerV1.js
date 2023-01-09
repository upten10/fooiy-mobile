import axios from 'axios';
// import {BASEURL, AUTHORIZATION, DEVICEID} from '@env';
const BASEURL = 'http://dev-api.fooiy.com/api/v1/';
const AUTHORIZATION =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzb2NpYWxfaWQiOiIyMzg1Mzk5MDYxIiwiY3JlYXRlZF9hdCI6MTY2MTQwNjg2Mi45OTIxMjU3fQ.p55xYjWexwZP880htz6zGCDkhMoRv_vLsHP2HyolEyo';
const DEVICEID = 'BBDA65DE-63DD-48B9-97B5-B324DD3FD719';
const baseURL = BASEURL;
const headers = {
  Authorization: AUTHORIZATION,
  os: 'ios',
  'device-id': DEVICEID,
};
const ApiMangerV1 = axios.create({
  baseURL: baseURL, // your url
  responseType: 'json',
  headers: headers, // your headers
  withCredentials: true,
});

ApiMangerV1.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    // console.log("requestError====>", error);
  },
);

ApiMangerV1.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // console.log("responseError====>", error);
  },
);

export {ApiMangerV1, headers};
