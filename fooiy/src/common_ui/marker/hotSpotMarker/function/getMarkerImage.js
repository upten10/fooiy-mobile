export const getMarkerImage = length => {
  if (length === 2) {
    return {
      image: require('../../../../../assets/images/map_marker_length02.png'),
      width: 48,
    };
  } else if (length === 3) {
    return {
      image: require('../../../../../assets/images/map_marker_length03.png'),
      width: 56,
    };
  } else if (length === 4) {
    return {
      image: require('../../../../../assets/images/map_marker_length04.png'),
      width: 65,
    };
  } else if (length === 5) {
    return {
      image: require('../../../../../assets/images/map_marker_length05.png'),
      width: 74,
    };
  } else if (length === 6) {
    return {
      image: require('../../../../../assets/images/map_marker_length06.png'),
      width: 82,
    };
  } else if (length === 7) {
    return {
      image: require('../../../../../assets/images/map_marker_length07.png'),
      width: 91,
    };
  } else if (length === 8) {
    return {
      image: require('../../../../../assets/images/map_marker_length08.png'),
      width: 100,
    };
  } else if (length === 9) {
    return {
      image: require('../../../../../assets/images/map_marker_length09.png'),
      width: 108,
    };
  } else if (length === 10) {
    return {
      image: require('../../../../../assets/images/map_marker_length10.png'),
      width: 117,
    };
  }
};
