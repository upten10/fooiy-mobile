import React from 'react';
import NaverMapView, {Align, Marker} from 'react-native-nmap';
import MarkerArr from './MarkerArr';

const NaverMap = () => {
  const currentLocation = {latitude: 37.301796, longitude: 126.840034};
  const markerImg = '../../../assets/icons/marker/marker.png';

  return (
    <NaverMapView
      style={{flex: 1}}
      showsMyLocationButton={true}
      center={{...currentLocation, zoom: 16}}
      // onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
      // onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
      // onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}
    >
      {MarkerArr.map((elem, index) => (
        <Marker
          key={index}
          coordinate={elem.Location}
          width={48}
          height={58}
          image={require(markerImg)}
          // image={require(markerImg)}
          caption={{
            text: `${elem.suitability}%`,
            align: Align.Center,
            color: '#FE5B5C',
            textSize: 13,
          }}
          // 글자 위치 변경 안돼서 subCaption 넣어서 위로 밀었음
          subCaption={{text: 'ㅤ', textSize: 15}}
        />
      ))}
    </NaverMapView>
  );
};

export default NaverMap;
