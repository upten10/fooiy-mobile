import {Slider} from '@miblanchard/react-native-slider';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Ic_total_evaluation_10,
  Ic_total_evaluation_30,
  Ic_total_evaluation_50,
  Ic_total_evaluation_70,
  Ic_total_evaluation_99,
} from '../../../../../assets/svg';
import {fooiyColor} from '../../../../common/globalStyles';

function TotalRating(props) {
  const {totalRating, setTotalRating} = props;

  const Imogi = () => {
    if (totalRating === 0) {
      return <Ic_total_evaluation_10 />;
    } else if (totalRating === 1) {
      return <Ic_total_evaluation_30 />;
    } else if (totalRating === 2) {
      return <Ic_total_evaluation_50 />;
    } else if (totalRating === 3) {
      return <Ic_total_evaluation_70 />;
    } else if (totalRating === 4) {
      return <Ic_total_evaluation_99 />;
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
