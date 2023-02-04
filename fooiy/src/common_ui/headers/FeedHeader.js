import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  ArrowIconBottomGray,
  ArrowIconTopGray,
  CafeShop,
  CommonShop,
  Notification,
  Search_Icon,
} from '../../../assets/icons/svg';
import {Logo} from '../../../assets/icons/svg';
import {globalVariable} from '../../common/globalVariable';

export const FeedHeader = props => {
  const {category, open, setOpen} = props;
  const navigation = useNavigation();

  const search = () => {
    navigation.navigate('Search');
  };

  return (
    <View>
      <View style={styles.header_container}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => setOpen(!open)}>
          <View style={styles.logo}>
            <Logo />
            <View style={styles.category}>
              {category === globalVariable.category_cafe ? (
                <CafeShop />
              ) : (
                <CommonShop />
              )}
            </View>
            {open ? <ArrowIconTopGray /> : <ArrowIconBottomGray />}
          </View>
        </TouchableOpacity>
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
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  category: {
    width: 28,
    marginLeft: 4,
  },
});
