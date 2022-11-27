import Geolocation from '@react-native-community/geolocation';
import {useEffect, useState} from 'react';

const Location = () => {
  const [location, setLocation] = useState({});
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({
          latitude,
          longitude,
        });
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  return location;
};

export default Location;
