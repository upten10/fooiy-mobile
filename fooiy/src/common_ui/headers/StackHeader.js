import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {GoBackArrow, Map_shop, PartySetting} from '../../../assets/icons/svg';
import {globalVariable} from '../../common/globalVariable';
import {useSelector} from 'react-redux';

export const StackHeader = props => {
  const {toTop, blockGoBack} = props;
  const navigation = useNavigation();
  const userInfoRedux = useSelector(state => state.userInfo.value);

  return (
    <View>
      <View style={styles.header_container}>
        {props.shop ? (
          <View style={styles.shop_detail}>
            <Text style={styles.shop_name}>{props.shop.name}</Text>
            <Text style={styles.shop_address}>{props.shop.short_address}</Text>
          </View>
        ) : // It is for account stack header
        props.title ? (
          <View style={styles.header_container}>
            {toTop === undefined ? (
              <Text style={styles.title_name}>{props.title}</Text>
            ) : (
              <TouchableOpacity
                activeOpacity={0.8}
                hitSlop={{top: 16, bottom: 16}}
                onPress={() => {
                  toTop();
                }}>
                <Text style={styles.title_name}>{props.title}</Text>
              </TouchableOpacity>
            )}
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
      {blockGoBack ?? (
        <View style={styles.go_back_container}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              props.isParty ? props.setIsVisible(false) : navigation.goBack();
            }}>
            <GoBackArrow />
          </TouchableOpacity>
        </View>
      )}
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
        ) : props.owner_id && props.owner_id === userInfoRedux.public_id ? (
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
            onPress={() => {
              props.onPressSetting();
            }}>
            <PartySetting />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header_container: {
    ...fooiyFont.Subtitle2,
    color: fooiyColor.B,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: fooiyColor.W,
  },
  go_back_container: {
    height: 56,
    paddingLeft: 16,
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
    ...fooiyFont.Subtitle2,
    color: fooiyColor.P500,
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
    ...fooiyFont.Subtitle2,
    color: fooiyColor.B,
  },
  shop_address: {
    ...fooiyFont.Caption1,
    color: fooiyColor.B,
  },
  title_name: {
    ...fooiyFont.Subtitle2,
    color: fooiyColor.B,
    width: globalVariable.width - 56 * 2,
    textAlign: 'center',
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
