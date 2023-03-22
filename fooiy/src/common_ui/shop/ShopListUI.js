import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {PartyCrown} from '../../../assets/icons/svg';
import {resizeImageType} from '../../common/Enums';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';
import {elapsedText} from '../../common/helpers/elapsedText';
import ResizeImage from '../ResizeImage';

const ShopListUI = item => {
  const {
    index,
    address,
    menu_price,
    name,
    public_id,
    score,
    shop_category_list,
    thumbnail,

    party_id,
    owner,
    owner_id,
    image,
    feed_count,
    account_count,
    is_subscribe,
  } = item;
  const navigation = useNavigation();
  const imageWidth = (globalVariable.width - 32 - 15) / 2;

  const onPress = () => {
    if (public_id !== undefined) {
      navigation.navigate('Shop', {
        shop_id: public_id,
      });
    } else if (party_id !== undefined) {
      navigation.navigate('PartyProfile', {party_id});
    }
  };

  return (
    <TouchableOpacity
      key={index}
      style={{
        backgroundColor: fooiyColor.W,
        marginHorizontal: 7.5,
        marginBottom: 24,
      }}
      activeOpacity={0.8}
      onPress={onPress}>
      {/* img */}
      <View style={{width: imageWidth, height: imageWidth, marginBottom: 8}}>
        {score !== undefined ? (
          <View style={styles.fooiyti_container}>
            <Text style={{...fooiyFont.Subtitle4, color: fooiyColor.W}}>
              {score}%
            </Text>
          </View>
        ) : null}
        <View style={{backgroundColor: fooiyColor.G100, borderRadius: 16}}>
          <ResizeImage
            uri={thumbnail !== undefined ? thumbnail : image}
            size={resizeImageType.SMALL}
            imageStyle={{width: '100%', height: '100%', borderRadius: 16}}
          />
        </View>
      </View>
      {/* shop info */}
      <View style={{marginBottom: 8}}>
        <Text
          style={{
            ...fooiyFont.Subtitle2,
            color: fooiyColor.B,
            width: imageWidth,
          }}>
          {elapsedText(name, 11)}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {owner !== undefined ? (
            <View style={{marginRight: 4}}>
              <PartyCrown />
            </View>
          ) : null}
          <Text
            style={{
              ...fooiyFont.Body2,
              color: fooiyColor.G800,
            }}>
            {menu_price !== undefined
              ? menu_price
              : owner.length >= 10
              ? owner.substr(0, 10) + '...'
              : owner}
          </Text>
        </View>
      </View>
      {/* category */}
      <View style={{flexDirection: 'row', width: imageWidth}}>
        {shop_category_list !== undefined ? (
          shop_category_list.map((item, index) => {
            return (
              <View style={styles.category_container} key={index}>
                <Text
                  style={{
                    ...fooiyFont.Caption1_1,
                    color: fooiyColor.G600,
                    paddingHorizontal: 8,
                  }}>
                  {item}
                </Text>
              </View>
            );
          })
        ) : (
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                paddingHorizontal: 8,
                paddingVertical: 6,
                backgroundColor: fooiyColor.G50,
                borderRadius: 8,
                marginRight: 4,
              }}>
              <Text style={{...fooiyFont.Caption1_1, color: fooiyColor.G600}}>
                피드 {feed_count}개
              </Text>
            </View>
            <View
              style={{
                paddingHorizontal: 8,
                paddingVertical: 6,
                backgroundColor: fooiyColor.G50,
                borderRadius: 8,
              }}>
              <Text style={{...fooiyFont.Caption1_1, color: fooiyColor.G600}}>
                파티원 {account_count}명
              </Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ShopListUI;

const styles = StyleSheet.create({
  fooiyti_container: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: fooiyColor.P500,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  category_container: {
    backgroundColor: fooiyColor.G50,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
});
