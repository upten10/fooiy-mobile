import React from 'react';
import AnimatedLottieView from 'lottie-react-native';

const ApiLoading = () => {
  return (
    <AnimatedLottieView
      source={require('../../../assets/lottie/progress.json.json')}
      // progress={animationProgress.current}
      imageAssetsFolder={'images'}
      autoPlay
      loop
    />
  );
};

export default ApiLoading;
