import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import {globalVariable} from '../../../../common/globalVariable';
import {StackHeader} from '../../../../common_ui/headers/StackHeader';
import {fooiyColor, fooiyFont} from '../../../../common/globalStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {globalStyles} from '../../../../common/globalStyles';
import {Notice} from '../../../../../assets/icons/svg';
import Input from './Input';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SliderImage from './SliderImage';
import FooiytiRating from './FooiytiRating';

const RegisterFeed = props => {
  // const photo_list = props.route.params.photo_list;
  const {photo_list, shop, menu, address} = props.route.params;

  const [shopValue, setShopValue] = useState('');
  const [locationValue, setLocationValue] = useState('');
  const [menuValue, setMenuValue] = useState('');
  const [btnActivate, setBtnActivate] = useState(false);
  const [comment, setComment] = useState('');
  const [isCommentFocus, setCommentFocused] = useState(false);
  const [fooiytiRatingEI, setFooiytiRatingEI] = useState(2);
  const [fooiytiRatingSN, setFooiytiRatingSN] = useState(2);
  console.log(fooiytiRatingEI, fooiytiRatingSN);
  // console.log(sliderImage[2]);
  const insets = useSafeAreaInsets();
  const onFocus = () => {
    setCommentFocused(true);
  };
  const onBlur = () => {
    setCommentFocused(false);
  };
  const commentRef = useRef();
  const checkShopInput = () => {
    shopValue.length > 0 ? true : false;
  };
  const checkLocationInput = () => {
    locationValue.length > 0 ? true : false;
  };
  const checkMenuInput = () => {
    menuValue.length > 0 ? true : false;
  };

  return (
    <View>
      <StackHeader title="피드 등록" />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: fooiyColor.W,
          height: '100%',
          paddingHorizontal: 16,
        }}>
        {/* 음식점 */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            {!shop && (
              <Input
                onChangeText={setShopValue}
                holders="음식점 이름을 적어주세요"
                title="음식점"
                checkInput={checkShopInput}
              />
            )}
            {/* 위치 */}
            {!address && (
              <Input
                onChangeText={setLocationValue}
                holders="대략적인 위치를 적어주세요"
                title="위치"
                checkInput={checkLocationInput}
              />
            )}

            {/* 메뉴 */}
            {!menu && (
              <Input
                onChangeText={setMenuValue}
                holders="메뉴 이름을 적어주세요"
                title="메뉴"
                checkInput={checkMenuInput}
              />
            )}
            {/* 푸이티아이 평가 */}
            <View>
              <FooiytiRating
                left={'E'}
                right={'I'}
                leftText={'자극적인'}
                rightText={'순한'}
                fooiytiRating={fooiytiRatingEI}
                setFooiytiRating={setFooiytiRatingEI}
                type={'EI'}
              />
            </View>
            <View>
              <FooiytiRating
                left={'E'}
                right={'I'}
                leftText={'자극적인'}
                rightText={'순한'}
                fooiytiRating={fooiytiRatingSN}
                setFooiytiRating={setFooiytiRatingSN}
                type={'SN'}
              />
            </View>
            {/* 맛 평가 */}

            {/* 코멘트 */}
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  marginTop: 36,
                }}>
                <Text style={{...fooiyFont.Subtitle1}}>코멘트</Text>
                <Text
                  style={{
                    ...fooiyFont.Caption1,
                    color: fooiyColor.G600,
                    marginLeft: 8,
                  }}>
                  ({comment.length}/500)
                </Text>
              </View>
              <View
                style={
                  isCommentFocus
                    ? {
                        marginTop: 16,
                        justifyContent: 'center',
                        width: '100%',
                        flexDirection: 'row',
                        height: 104,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderRadius: 8,
                        borderColor: fooiyColor.G400,
                      }
                    : {
                        marginTop: 16,
                        justifyContent: 'center',
                        width: '100%',
                        height: 104,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderRadius: 8,
                        borderColor: fooiyColor.G200,
                      }
                }>
                <TextInput
                  ref={commentRef}
                  style={
                    isCommentFocus
                      ? {
                          paddingTop: 16,
                          padding: 16,
                          ...fooiyFont.Body1,
                          lineHeight: 0,
                          width: '90%',
                          height: '100%',
                          fontSize: 14,
                          fontWeight: '400',
                        }
                      : {
                          padding: 16,
                          ...fooiyFont.Subtitle2,
                          lineHeight: 0,
                          color: 'red',
                          width: '90%',
                          height: '100%',
                          fontSize: 14,
                          paddingTop: 16,
                          fontWeight: '400',
                        }
                  }
                  multiline
                  textAlignVertical="top"
                  autoCapitalize={false}
                  autoCorrect={false}
                  spellCheck={false}
                  onChangeText={setComment}
                  maxLength={500}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            width: '100%',
            backgroundColor: fooiyColor.P50,
            borderRadius: 8,
            padding: 16,
            marginTop: 16,
          }}>
          <Text
            style={{
              ...fooiyFont.Subtitle3,
              marginBottom: 8,
              color: fooiyColor.G600,
            }}>
            코멘트 작성 안내사항
          </Text>

          <View style={{flexDirection: 'row'}}>
            <Notice style={{width: 18, height: 18, color: fooiyColor.G600}} />
            <Text style={{marginLeft: 8, color: fooiyColor.G600}}>
              10자 이상 적어주세요.
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 8}}>
            <Notice style={{width: 18, height: 18, color: fooiyColor.G600}} />
            <Text style={{marginLeft: 8, color: fooiyColor.G600}}>
              욕설, 비방 등의 코멘트는 지양해주세요.
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 8}}>
            <Notice style={{width: 18, height: 18, color: fooiyColor.G600}} />
            <Text style={{marginLeft: 8, color: fooiyColor.G600}}>
              개척이 완료되면 게시물을 삭제할 수 없어요.
            </Text>
          </View>
        </View>
        <View
          style={{
            width: globalVariable.width - 32,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 36,
            backgroundColor: fooiyColor.P500,
            height: 56,
          }}>
          <TouchableOpacity>
            <Text
              style={{...fooiyFont.Button, color: fooiyColor.W, fontSize: 14}}>
              피드 등록
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{height: insets.bottom + 80}} />
      </ScrollView>
    </View>
    // </TouchableWithoutFeedback>÷
  );
};

export default RegisterFeed;

const styles = StyleSheet.create({});
