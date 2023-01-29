import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Notification, Search} from '../../../assets/icons/svg';

export const DefaultHeader = () => {
  const navigation = useNavigation();

  const search = () => {
    navigation.navigate('Search');
  };

  return (
    <View>
      <View style={styles.header_container}>
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.logo}
        />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{marginRight: 16}}
            onPress={() => props.notification()}>
            <Notification />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              search();
            }}>
            <Search />
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
  logo: {
    height: 28,
    width: 60,
  },
});
