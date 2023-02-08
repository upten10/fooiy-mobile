import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Notification, Search_Icon} from '../../../assets/icons/svg';
import {Logo} from '../../../assets/icons/svg';
import {globalVariable} from '../../common/globalVariable';

export const DefaultHeader = props => {
  const navigation = useNavigation();

  const {flatListRef, toTop, isParty} = props;

  const search = () => {
    navigation.navigate('Search');
  };

  const partySearch = () => {
    navigation.navigate('PartySearch');
  };

  return (
    <View>
      <View style={styles.header_container}>
        {flatListRef !== undefined ? (
          <TouchableWithoutFeedback
            onPress={() => {
              console.log('header');
              if (flatListRef.current !== null) {
                toTop();
              }
            }}>
            <View
              style={{
                width: globalVariable.width - 104,
                height: 56,
                justifyContent: 'center',
              }}>
              <Logo />
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <Logo />
        )}
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{marginRight: 16}}
            // onPress={() => props.notification()}
          >
            <Notification />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              isParty === undefined ? search() : partySearch();
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
