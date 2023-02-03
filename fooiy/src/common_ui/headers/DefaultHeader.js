import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Notification, Search_Icon} from '../../../assets/icons/svg';
import {Logo} from '../../../assets/icons/svg';

export const DefaultHeader = () => {
  const navigation = useNavigation();

  const search = () => {
    navigation.navigate('Search');
  };

  return (
    <View>
      <View style={styles.header_container}>
        <Logo />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{marginRight: 16}}
            // onPress={() => props.notification()}
          >
            <Notification />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              search();
            }}>
            <Search_Icon />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header_container: {
    height: 56,
    paddingLeft: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 16,
  },
});
