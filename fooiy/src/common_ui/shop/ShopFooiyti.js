import React, {useCallback, useState} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import {Ic_info_24_G600} from '../../../assets/svg';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import Margin from '../Margin';
import FooiytiImogi from './FooiytiImogi';
import ShopFooiytiModal from './ShopFooiytiModal';

const ShopFooiyti = props => {
  const {fooiyti} = props;
  const [isModalVisible, setModalVisible] = useState(false);

  const Fooiyti = useCallback(item => {
    const fooiyti_info = item.fooiyti;
    const inner_styles = StyleSheet.create({
      fooiyti_text: {
        marginRight: 24,
        ...fooiyFont.H2,
        color: fooiyti_info
          ? fooiyti_info.different
            ? fooiyColor.G400
            : fooiyColor.P500
          : null,
        textAlign: 'center',
      },
    });

    return (
      <View style={styles.fooiyti_container}>
        <CircularProgress
          radius={40}
          value={fooiyti_info ? fooiyti_info.percentage : null}
          activeStrokeColor={
            fooiyti_info
              ? fooiyti_info.different
                ? fooiyColor.G400
                : fooiyColor.P500
              : null
          }
          inActiveStrokeColor={fooiyColor.G100}
          inActiveStrokeOpacity={0.5}
          inActiveStrokeWidth={4}
          activeStrokeWidth={5}
          showProgressValue={false}
          title={fooiyti_info && fooiyti_info.fooiyti.toUpperCase()}
          titleStyle={inner_styles.fooiyti_text}
          subtitle={fooiyti_info && fooiyti_info.percentage + '%'}
          subtitleStyle={styles.fooiyti_percentage_text}
        />
        <View style={styles.fooiyti_imogi}>
          <FooiytiImogi each_fooiyti={fooiyti_info.fooiyti} />
        </View>
      </View>
    );
  }, []);
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setModalVisible(true)}>
        <View style={styles.title_container}>
          <Text style={styles.title_text}>음식점 푸이티아이</Text>
          <Margin w={4} />
          <Ic_info_24_G600 />
        </View>
      </TouchableOpacity>
      <View style={styles.container}>
        <Fooiyti fooiyti={fooiyti && fooiyti[0]} />
        <Fooiyti fooiyti={fooiyti && fooiyti[1]} />
        <Fooiyti fooiyti={fooiyti && fooiyti[2]} />
        <Fooiyti fooiyti={fooiyti && fooiyti[3]} />
      </View>
      <ShopFooiytiModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
      <Margin h={24} />
    </View>
  );
};

export default ShopFooiyti;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fooiyti_container: {
    marginHorizontal: 4,
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  fooiyti_indicator_container: {
    marginHorizontal: 16,
    flexDirection: 'row',
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },
  fooiyti_percentage_text: {
    ...fooiyFont.Subtitle4,
    color: fooiyColor.G400,
    textAlign: 'center',
  },
  fooiyti_imogi: {
    position: 'absolute',
    left: 40,
    top: 20,
  },
  title_container: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title_text: {
    textAlign: 'center',
    ...fooiyFont.Subtitle2,
    color: fooiyColor.G600,
    lineHeight: Platform.select({ios: 0, android: 24}),
  },
});
