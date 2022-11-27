import React, {useState, useCallback, useRef, useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NaverMapView, {Align, Marker} from 'react-native-nmap';
import MarkerArr from './MarkerArr';
import MapBottomSheet from './bottom_sheet/MapBottomSheet';

const NaverMap = () => {
  const currentLocation = {latitude: 37.301796, longitude: 126.840034};
  const markerImg = '../../../assets/icons/marker/marker.png';
  const markerClickedImg = '../../../assets/icons/marker/marker_clicked.png';

  const [clickedIndex, setClickedIndex] = useState(null);
  const [screenLocation, setScreenLocation] = useState([]);
  // 좌측 하단, 우측 하단 순으로 들어감

  const onCameraChange = e => {
    setScreenLocation([e.contentRegion[0], e.contentRegion[2]]);
  };

  const handleClick = index => {
    setClickedIndex(index);
  };

  return (
    <View style={styles.container}>
      <NaverMapView
        style={styles.container}
        showsMyLocationButton={true}
        center={{...currentLocation, zoom: 16}}
        onMapClick={() => setClickedIndex(null)}
        // onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
        onCameraChange={e => onCameraChange(e)}
        // onCameraChange={e => console.warn(e.contentsRegion)}
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
      <MapBottomSheet screenLocation={screenLocation} />
    </View>
  );
};

export default NaverMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
