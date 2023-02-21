export const getMarkerImage = length => {
  if (length === 2) {
    return {
      image: require('../../../../../assets/marker/spot/length2.png'),
      width: 48,
    };
  } else if (length === 3) {
    return {
      image: require('../../../../../assets/marker/spot/length3.png'),
      width: 56,
    };
  } else if (length === 4) {
    return {
      image: require('../../../../../assets/marker/spot/length4.png'),
      width: 65,
    };
  } else if (length === 5) {
    return {
      image: require('../../../../../assets/marker/spot/length5.png'),
      width: 74,
    };
  } else if (length === 6) {
    return {
      image: require('../../../../../assets/marker/spot/length6.png'),
      width: 82,
    };
  } else if (length === 7) {
    return {
      image: require('../../../../../assets/marker/spot/length7.png'),
      width: 91,
    };
  } else if (length === 8) {
    return {
      image: require('../../../../../assets/marker/spot/length8.png'),
      width: 100,
    };
  } else if (length === 9) {
    return {
      image: require('../../../../../assets/marker/spot/length9.png'),
      width: 108,
    };
  } else if (length === 10) {
    return {
      image: require('../../../../../assets/marker/spot/length10.png'),
      width: 117,
    };
  }
};
