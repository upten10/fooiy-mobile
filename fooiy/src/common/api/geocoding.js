import axios from 'axios';
export const geocoding = async (longitude, latitude, setAddress) => {
  await axios
    .get(
      'https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=' +
        `${longitude},${latitude}` +
        '&orders=roadaddr&output=json',
      {
        headers: {
          'X-NCP-APIGW-API-KEY-ID': 'oingm1h0rz',
          'X-NCP-APIGW-API-KEY': 'Iljylcie23BNUM8r9y8WcweI78O6OX2fNYsTjZJt',
        },
      },
    )
    .then(res => {
      if (res.data.status.code === 0) {
        setAddress({
          area1: res.data.results[0].region.area1.alias,
          area2: res.data.results[0].region.area2.name,
          area4: res.data.results[0].region.area4.name,
          land_name: res.data.results[0].land.name,
          land_number1: res.data.results[0].land.number1,
          land_number2: res.data.results[0].land.number2,
        });
      }
    });
};
