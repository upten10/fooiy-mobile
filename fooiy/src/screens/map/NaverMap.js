import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import NaverMapView, {Align, Marker} from 'react-native-nmap';
import MarkerArr from './MarkerArr';

const NaverMap = () => {
  const currentLocation = {latitude: 37.301796, longitude: 126.840034};
  const markerImg = '../../../assets/icons/marker/marker.png';
  const markerClickedImg = '../../../assets/icons/marker/marker_clicked.png';

  const [clickedIndex, setClickedIndex] = useState(null);

  const handleClick = index => {
    setClickedIndex(index);
  };

  return (
    <NaverMapView
      style={{flex: 1}}
      showsMyLocationButton={true}
      center={{...currentLocation, zoom: 16}}
      onMapClick={() => setClickedIndex(null)}
      // onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
      // onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
      // onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}
    >
      {MarkerArr.map((elem, index) => {
        return (
          <Marker
            key={index}
            coordinate={elem.Location}
            width={40}
            height={50}
            image={
              clickedIndex === index
                ? require(markerClickedImg)
                : require(markerImg)
            }
            caption={{
              text: `${elem.suitability}%`,
              align: Align.Center,
              color: '#FE5B5C',
              textSize: 13,
            }}
            onClick={() => handleClick(index)}
          />
        );
      })}
    </NaverMapView>
  );
};

export default NaverMap;
