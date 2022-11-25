import React, {useRef, useState} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import NaverMapView, {Align, Marker} from 'react-native-nmap';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {globalVariable} from '../../common/globalVariable';
import Location from './Location';
import MarkerArr from './MarkerArr';

const markerImg = '../../../assets/icons/marker/marker.png';
const markerClickedImg = '../../../assets/icons/marker/marker_clicked.png';

const NaverMap = props => {
  // 현재 위치 (오브젝트)
  let curLocation = Location();
  //map ref 초기화
  const mapView = useRef(null);
  // 클릭 된 마커 키
  const [clickedIndex, setClickedIndex] = useState(null);

  // 마커 클릭 이벤트
  const onClickMarker = index => {
    setClickedIndex(index);
  };

  // 현위치 버튼 클릭 이벤트
  const onClickLocationBtn = () => {
    mapView.current.setLocationTrackingMode(3);
  };

  // 현위치 버튼 컴포넌트
  const LocationBtn = () => {
    return (
      <Pressable style={styles.button} onPress={onClickLocationBtn}>
        <Text style={styles.text}>{'현위치'}</Text>
      </Pressable>
    );
  };

  return (
    <View>
      <NaverMapView
        ref={mapView}
        style={styles.map}
        center={{...curLocation, zoom: 16}} // 지도 시작 시 첫 위치 => 현재위치
        onMapClick={() => setClickedIndex(null)} // 맵 클릭 시 클릭 된 마커 해제
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
                color: clickedIndex === index ? '#ffffff' : '#FE5B5C',
                textSize: 13,
                haloColor: clickedIndex === index ? '#FE5B5C' : '#ffffff',
              }}
              onClick={() => onClickMarker(index)} // 마커 클릭 시 해당 마커 키 저장
            />
          );
        })}
      </NaverMapView>
      <LocationBtn />
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: globalVariable.width,
    height: globalVariable.height,
  },
  button: {
    position: 'absolute',
    bottom: globalVariable.height / 5,
    left: globalVariable.width / 1.25,
    backgroundColor: 'white',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 0.3, // 낮을수록 진해짐
        },
        shadowOpacity: 0.15, // 높을수록 진해짐
        shadowRadius: 5,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#FE5B5C',
  },
});

export default NaverMap;
