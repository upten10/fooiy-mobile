import React from 'react';
import {View, Image, Text, StyleSheet, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {GoBackArrow, Map_shop} from '../../../assets/icons/svg';
export const StackHeader = props => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.header_container}>
        {props.shop ? (
          <View style={styles.shop_detail}>
            <Text style={styles.shop_name}>{props.shop.shop_name}</Text>
            <Text style={styles.shop_address}>{props.shop.shop_address}</Text>
          </View>
        ) : // It is for account stack header
        props.title ? (
          <View style={styles.header_container}>
            <Text style={styles.title_name}>{props.title}</Text>
          </View>
        ) : props.menu ? (
          <View style={styles.menu_container}>
            <Text style={styles.menu}>메뉴판</Text>
            <Text style={styles.menu_shop_name}>{props.menu.shop_name}</Text>
          </View>
        ) : (
          <View></View>
        )}
      </View>
      {/* isolation for having absolute position back icon */}
      <View style={styles.go_back_container}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.goBack();
          }}>
          <GoBackArrow />
        </TouchableOpacity>
      </View>
      <View style={styles.go_next_container}>
        {props.next ? (
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
            onPress={() => {
              props.next();
            }}>
            <Text style={styles.next_name}>다음</Text>
          </TouchableOpacity>
        ) : props.enroll ? (
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
            onPress={() => {
              props.enroll();
            }}>
            <Text style={styles.next_name}>등록</Text>
          </TouchableOpacity>
        ) : props.map ? (
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
            onPress={() => {
              props.map();
            }}>
            <Map_shop style={styles.map_icon} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header_container: {
    height: 56,
    fontSize: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: fooiyColor.W,
  },
  go_back_container: {
    height: 56,
    paddingLeft: 10,
    position: 'absolute',
    justifyContent: 'center',
  },
  go_next_container: {
    height: 56,
    position: 'absolute',
    justifyContent: 'center',
    right: 15,
  },
  next_name: {
    fontSize: 16,
    color: '#FF5C5C',
  },
  go_back_logo: {
    width: 24,
    height: 24,
  },
  shop_detail: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shop_name: {
    color: '#0D0F14',
    marginBottom: 8,
  },
  title_name: {
    fontSize: 16,
    fontWeight: '600',
    color: fooiyColor.B,
  },

  shop_address: {
    color: '#4A5470',
  },
  menu_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    ...fooiyFont.Subtitle2,
  },
  menu_shop_name: {
    ...fooiyFont.Caption1,
  },
  map_icon: {
    width: 24,
    height: 24,
  },
});
