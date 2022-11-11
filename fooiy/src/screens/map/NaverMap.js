import React from 'react';
import {Text} from 'react-native';
import NaverMapView, {Align, Marker} from 'react-native-nmap';

const NaverMap = () => {
  const currentLocation = {latitude: 37.296425, longitude: 126.838933};
  const markerImg = '../../../assets/icons/marker/marker.png';
  const markerClickedImg = '../../../assets/icons/marker/marker_clicked.png';

  const onClickMarker = e => {
    console.dir(e);
  };

  return (
    <NaverMapView
      style={{width: '100%', height: '100%'}}
      showsMyLocationButton={true}
      center={{...currentLocation, zoom: 16}}
      onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
      onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
      onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}>
      <Marker
        coordinate={currentLocation}
        width={48}
        height={58}
        image={require(markerImg)}
        caption={{
          text: '98%',
          align: Align.Center,
          color: '#FE5B5C',
          textSize: 13,
        }}
        // 글자 위치 변경 안돼서 subCaption 넣어서 위로 밀었음
        subCaption={{text: 'ㅤ', textSize: 15}}
        onClick={e => onClickMarker(e)}
      />
    </NaverMapView>
  );
};

export default NaverMap;
