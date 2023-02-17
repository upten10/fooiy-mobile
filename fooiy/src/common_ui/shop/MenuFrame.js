import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import Margin from '../Margin';

const MenuFrame = props => {
  const {title, menu_list} = props;
  return (
    <View style={styles.container}>
      <Margin h={16} />
      <Text style={styles.main_title}>{title}</Text>
      <Margin h={8} />
      <View style={styles.title_indicator} />
      <Margin h={4} />
      {menu_list.map(item => {
        return (
          <View key={item.id}>
            <Margin h={12} />
            <View style={styles.menu_container}>
              <Text style={styles.menu_name}>
                {item.name.length >= 20
                  ? item.name.substr(0, 19) + '...'
                  : item.name}
              </Text>
              <Text style={styles.menu_price}>{item.price}원</Text>
            </View>
            <Margin h={12} />
          </View>
        );
      })}
      <Margin h={4} />
      <View style={styles.end_indicator} />
      <Margin h={20} />
    </View>
  );
};

export default MenuFrame;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: fooiyColor.W,
  },
  main_title: {
    ...fooiyFont.H3,
    color: fooiyColor.B,
    marginLeft: 8,
  },
  title_indicator: {
    height: 2,
    backgroundColor: fooiyColor.B,
  },
  menu_container: {
    justifyContent: 'space-between',
    marginHorizontal: 8,
    flexDirection: 'row',
  },
  menu_name: {
    ...fooiyFont.Subtitle2,
    color: fooiyColor.G600,
  },
  menu_price: {
    ...fooiyFont.Subtitle2,
    color: fooiyColor.P500,
  },
  end_indicator: {
    height: 0,
    borderWidth: 0.5,
    borderColor: fooiyColor.G400,
    borderStyle: 'dashed',
  },
});
