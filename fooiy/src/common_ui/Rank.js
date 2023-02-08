import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {fooiyColor} from '../common/globalStyles';

import LinearGradient from 'react-native-linear-gradient';

const Rank = props => {
  const {font, rank, containerStyle} = props;
  const height = font.lineHeight + 2;
  return (
    rank && (
      <View>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={
            rank === 'bronze'
              ? ['#CA7526', '#E7DCCC']
              : rank === 'silver'
              ? ['#7D7D94', '#DFDFDF']
              : rank === 'gold'
              ? ['#FFA918', '#FFEDB0']
              : rank === 'platinum'
              ? ['#1B9FBF', '#B1FAD7']
              : ['#FF332F', '#FFE600']
          }
          style={[{height: height}, styles.rank_container, containerStyle]}>
          <Text style={[{...font}, styles.rank]}>{rank}</Text>
        </LinearGradient>
      </View>
    )
  );
};

export default Rank;

const styles = StyleSheet.create({
  rank_container: {
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rank: {
    paddingHorizontal: 6,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: fooiyColor.W,
    lineHeight: Platform.select({ios: 0, android: null}),
  },
});
