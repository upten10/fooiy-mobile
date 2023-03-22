import React from 'react';
import {StyleSheet, View} from 'react-native';
import {fooiyColor} from '../../../../common/globalStyles';
import {
  Total_0,
  Total_1,
  Total_2,
  Total_3,
  Total_4,
} from '../../../../../assets/icons/svg';
import {Slider} from '@miblanchard/react-native-slider';

function TotalRating(props) {
  const {totalRating, setTotalRating} = props;

  const Imogi = () => {
    if (totalRating === 0) {
      return <Total_0 />;
    } else if (totalRating === 1) {
      return <Total_1 />;
    } else if (totalRating === 2) {
      return <Total_2 />;
    } else if (totalRating === 3) {
      return <Total_3 />;
    } else if (totalRating === 4) {
      return <Total_4 />;
    }
  };

  return (
    <View style={styles.container}>
      <Slider
        minimumValue={0}
        maximumValue={4}
        step={1}
        minimumTrackTintColor={fooiyColor.P500}
        maximumTrackTintColor={fooiyColor.G100}
        trackStyle={{height: 8, borderRadius: 20}}
        renderThumbComponent={Imogi}
        thumbStyle={{justifyContent: 'center', alignItems: 'center'}}
        value={totalRating}
        onValueChange={res => setTotalRating(res[0])}
      />
    </View>
  );
}

export default TotalRating;

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
    marginRight: 16,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
