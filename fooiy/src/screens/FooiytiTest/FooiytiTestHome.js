import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  BackHandler,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {StackHeader} from '../../common_ui/headers/StackHeader';

export default props => {
  const navigation = useNavigation();

  const onPressTest = () => {
    navigation.navigate('InformationInput');
  };

  return (
    <SafeAreaView style={{backgroundColor: fooiyColor.W, flex: 1}}>
      <StackHeader title={'푸이티아이'} />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 16,
          paddingTop: 24,
        }}>
        {/* 쬐깐한 박스들 */}
        <View style={{flexDirection: 'row', marginBottom: 8}}>
          <View
            style={{
              backgroundColor: fooiyColor.G50,
              borderRadius: 8,
              marginRight: 8,
            }}>
            <Text
              style={{
                ...fooiyFont.Caption1_1,
                color: fooiyColor.G600,
                marginHorizontal: 8,
                marginVertical: 6,
              }}>
              11문제
            </Text>
          </View>
          <View style={{backgroundColor: fooiyColor.G50, borderRadius: 8}}>
            <Text
              style={{
                ...fooiyFont.Caption1_1,
                color: fooiyColor.G600,
                marginHorizontal: 8,
                marginVertical: 6,
              }}>
              약 2분 소요
            </Text>
          </View>
        </View>
        <View style={{marginBottom: 43}}>
          <Text
            style={{...fooiyFont.H3, color: fooiyColor.G900, marginBottom: 8}}>
            푸이티아이 검사
          </Text>
          <Text style={{...fooiyFont.Body1, color: fooiyColor.G900}}>
            푸이티아이(Fooiyti)는 16가지 입맛을 나타내며,{'\n'}
            음식점 예상 만족도를 도출할 때 활용해요.
          </Text>
        </View>
        <View>
          <FastImage
            source={require('../../../assets/icons/svg/fooiyti/FooiytiSummary.png')}
            style={{width: '100%', height: 360}}
            resizeMode={'cover'}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPressTest}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 16,
            width: '100%',
            height: 56,
            backgroundColor: fooiyColor.P500,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: Platform.select({
              ios: 0,
              android: 16,
            }),
          }}>
          <Text
            style={{
              ...fooiyFont.Button,
              color: fooiyColor.W,
              lineHeight: Platform.select({
                ios: 0,
                android: null,
              }),
            }}>
            검사하기
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
