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
import FooiytiRating from './FooiytiRating';
import {ApiMangerV1} from '../../../../common/api/v1/ApiMangerV1';
import {apiUrl} from '../../../../common/Enums';
import {useNavigation} from '@react-navigation/native';

const RegisterFeed = props => {
  const {photo_list, shop, menu, address} = props.route.params;
  const shop_init = shop ? props.route.params.shop.name : '';
  const menu_init = menu ? props.route.params.menu.name : '';
  const [accountValue, setAccountValue] = useState('');
  const [shopValue, setShopValue] = useState(shop_init);
  const [locationValue, setLocationValue] = useState(address);
  const [menuValue, setMenuValue] = useState(menu_init);
  const [comment, setComment] = useState('');
  const [isCommentFocus, setCommentFocused] = useState(false);
  const [fooiytiRatingEI, setFooiytiRatingEI] = useState(2);
  const [fooiytiRatingSN, setFooiytiRatingSN] = useState(2);
  const [fooiytiRatingTF, setFooiytiRatingTF] = useState(2);
  const [fooiytiRatingAC, setFooiytiRatingAC] = useState(2);
  const [totalRating, setTotalRating] = useState(2);
  const valueSet = [90, 70, 50, 30, 10];
  const totalValueSet = [10, 30, 50, 70, 99];
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const onFocus = () => {
    setCommentFocused(true);
  };
  const onBlur = () => {
    setCommentFocused(false);
  };
  const commentRef = useRef();
  const checkShopInput = () => {
    shopValue && shopValue.length > 0 ? true : false;
  };
  const checkLocationInput = () => {
    locationValue && locationValue.length > 0 ? true : false;
  };
  const checkMenuInput = () => {
    menuValue && menuValue.length > 0 ? true : false;
  };
  const getAccountInfo = async () => {
    await ApiMangerV1.get(apiUrl.ACCOUNT_INFO, {params: {}}).then(res =>
      setAccountValue(res.data.payload.account_info.public_id),
    );
  };

  useEffect(() => {
    getAccountInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const postRegister = async data => {
    shop && menu
      ? await ApiMangerV1.post(apiUrl.REGISTER_RECORD, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          transformRequest: (data, headers) => {
            return data;
          },
        }).then(res => {
          console.log(res);
        })
      : await ApiMangerV1.post(apiUrl.REGISTER_PIONEER, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          transformRequest: (data, headers) => {
            return data;
          },
        }).then(res => {
          console.log(res);
        });
  };

  const onClickRegister = async () => {
    const match = /\.(\w+)$/.exec(photo_list[0].filename ?? '');
    // file name이 없을 때 type 지정이 제대로 안돼서 node에 있는 type 정보를 대신 사용
    const type =
      photo_list[0].type === 'image'
        ? match
          ? `image/${match[1]}`
          : `image`
        : photo_list[0].type;
    const formData = new FormData();
    formData.append('account', accountValue);
    shop && menu
      ? formData.append('shop_id', shop.public_id)
      : formData.append('shop_name', shopValue);
    shop && menu
      ? formData.append('menu_id', menu.id)
      : formData.append('menu_name', menuValue);
    formData.append('menu_price', 0);
    formData.append('comment', comment);
    formData.append('taste_evaluation', totalValueSet[totalRating]);
    formData.append('address', locationValue);
    formData.append('image_1', {
      uri: photo_list[0].image.uri,
      name:
        photo_list[0].image.filename !== null
          ? photo_list[0].image.filename
          : 'image.jpg',
      type,
    });
    photo_list[1] &&
      formData.append('image_2', {
        uri: photo_list[1].image.uri,
        name:
          photo_list[1].image.filename !== null
            ? photo_list[1].image.filename
            : 'image.jpg',
        type,
      });
    photo_list[2] &&
      formData.append('image_2', {
        uri: photo_list[2].image.uri,
        name:
          photo_list[2].image.filename !== null
            ? photo_list[2].image.filename
            : 'image.jpg',
        type,
      });
    formData.append('fooiyti_e', valueSet[fooiytiRatingEI]);
    formData.append('fooiyti_i', 100 - valueSet[fooiytiRatingEI]);
    formData.append('fooiyti_s', valueSet[fooiytiRatingSN]);
    formData.append('fooiyti_n', 100 - valueSet[fooiytiRatingSN]);
    formData.append('fooiyti_t', valueSet[fooiytiRatingTF]);
    formData.append('fooiyti_f', 100 - valueSet[fooiytiRatingTF]);
    formData.append('fooiyti_a', valueSet[fooiytiRatingAC]);
    formData.append('fooiyti_c', 100 - valueSet[fooiytiRatingAC]);

    postRegister(formData);
  };

  return (
    <View>
      <StackHeader title="피드 등록" />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}>
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
            <Text style={styles.fooiyti_evaluation}>푸이티아이 평가</Text>
            <View>
              <FooiytiRating
                left={'E'}
                right={'I'}
                leftText={'자극적인'}
                rightText={'순한'}
                fooiytiRating={fooiytiRatingEI}
                setFooiytiRating={setFooiytiRatingEI}
                type={'EI'}
                margin={56}
              />
            </View>
            <View>
              <FooiytiRating
                left={'S'}
                right={'N'}
                leftText={'짠'}
                rightText={'싱거운'}
                fooiytiRating={fooiytiRatingSN}
                setFooiytiRating={setFooiytiRatingSN}
                type={'SN'}
                margin={56}
              />
            </View>
            <View>
              <FooiytiRating
                left={'T'}
                right={'F'}
                leftText={'담백한'}
                rightText={'느끼한'}
                fooiytiRating={fooiytiRatingTF}
                setFooiytiRating={setFooiytiRatingTF}
                type={'TF'}
                margin={56}
              />
            </View>
            <View>
              <FooiytiRating
                left={'A'}
                right={'C'}
                leftText={'어른'}
                rightText={'초딩'}
                fooiytiRating={fooiytiRatingAC}
                setFooiytiRating={setFooiytiRatingAC}
                type={'AC'}
                margin={56}
              />
            </View>
            {/* 맛 평가 */}
            <View>
              <Text style={styles.total_evaluation}>전체 맛 평가</Text>
              <FooiytiRating
                left={''}
                right={''}
                leftText={''}
                rightText={''}
                fooiytiRating={totalRating}
                setFooiytiRating={setTotalRating}
                type={'TOTAL'}
                margin={40}
              />
            </View>
            {/* 코멘트 */}
            <View>
              <View style={styles.comment}>
                <Text style={{...fooiyFont.Subtitle1}}>코멘트</Text>
                <Text style={styles.comment_limit}>({comment.length}/500)</Text>
              </View>
              <View
                style={
                  isCommentFocus
                    ? styles.comment_focus_active
                    : styles.comment_focus_deactive
                }>
                <TextInput
                  ref={commentRef}
                  style={
                    isCommentFocus
                      ? styles.comment_text_focus_active
                      : styles.comment_text_focus_deactive
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
        <View style={styles.commnet_notice}>
          <Text style={styles.commnet_notice_title}>코멘트 작성 안내사항</Text>
          <View style={{flexDirection: 'row'}}>
            <Notice style={styles.comment_notice_icon} />
            <Text style={styles.commnet_notice_text}>
              욕설, 비방 등의 코멘트는 지양해주세요.
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Notice style={styles.comment_notice_icon} />
            <Text style={styles.commnet_notice_text}>
              개척이 완료되면 게시물을 삭제할 수 없어요.
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={
              (shop || shopValue) &&
              (address || locationValue) &&
              (menu || menuValue)
                ? styles.register_btn_active
                : styles.register_btn_deactive
            }
            onPress={
              (shop || shopValue) &&
              (address || locationValue) &&
              (menu || menuValue)
                ? onClickRegister
                : null
            }>
            <Text
              style={
                (shop || shopValue) &&
                (address || locationValue) &&
                (menu || menuValue)
                  ? styles.register_btn_text_active
                  : styles.register_btn_text_deactive
              }>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: fooiyColor.W,
    height: '100%',
    paddingHorizontal: 16,
  },
  fooiyti_evaluation: {
    ...fooiyFont.Subtitle1,
    marginTop: 16,
  },
  total_evaluation: {
    ...fooiyFont.Subtitle1,
    marginTop: 16,
  },
  comment: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 36,
  },
  comment_limit: {
    ...fooiyFont.Caption1,
    color: fooiyColor.G600,
    marginLeft: 8,
  },
  comment_focus_active: {
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
  },
  comment_focus_deactive: {
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
  },
  comment_text_focus_active: {
    paddingTop: 16,
    padding: 16,
    ...fooiyFont.Body1,
    lineHeight: 0,
    width: '90%',
    height: '100%',
    fontSize: 14,
    fontWeight: '400',
  },
  comment_text_focus_deactive: {
    padding: 16,
    ...fooiyFont.Subtitle2,
    lineHeight: 0,
    color: 'red',
    width: '90%',
    height: '100%',
    fontSize: 14,
    paddingTop: 16,
    fontWeight: '400',
  },
  commnet_notice: {
    width: '100%',
    backgroundColor: fooiyColor.P50,
    borderRadius: 8,
    marginTop: 16,
    padding: 16,
  },
  commnet_notice_title: {
    ...fooiyFont.Subtitle3,
    color: fooiyColor.G600,
  },
  comment_notice_icon: {
    ...fooiyFont.Subtitle3,
    marginTop: 8,
    color: fooiyColor.G600,
  },
  commnet_notice_text: {
    marginLeft: 8,
    color: fooiyColor.G600,
    marginTop: 8,
  },
  register_btn_active: {
    width: globalVariable.width - 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 36,
    backgroundColor: fooiyColor.P500,
    height: 56,
  },
  register_btn_deactive: {
    width: globalVariable.width - 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 36,
    backgroundColor: fooiyColor.G100,
    height: 56,
  },
  register_btn_text_active: {
    ...fooiyFont.Button,
    color: fooiyColor.W,
    fontSize: 14,
  },
  register_btn_text_deactive: {
    ...fooiyFont.Button,
    color: fooiyColor.G300,
    fontSize: 14,
  },
});
