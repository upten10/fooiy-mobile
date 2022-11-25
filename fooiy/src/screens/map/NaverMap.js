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
  const mapView = useRef(null);
  let curLocation = Location();

  const [clickedIndex, setClickedIndex] = useState(null);

  const onClickMarker = index => {
    setClickedIndex(index);
  };

  const onClickLocationBtn = () => {
    mapView.current.setLocationTrackingMode(3);
  };

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
        center={{...curLocation, zoom: 16}}
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
              onClick={() => onClickMarker(index)}
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
