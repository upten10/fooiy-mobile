import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {globalVariable} from '../../../../common/globalVariable';
import {StackHeader} from '../../../../common_ui/headers/StackHeader';
import {fooiyColor, fooiyFont} from '../../../../common/globalStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Notice} from '../../../../../assets/icons/svg';
import Input from './Input';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import FooiytiRating from './FooiytiRating';
import {ApiManagerV2} from '../../../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../../../common/Enums';
import {useNavigation} from '@react-navigation/native';
import TotalRating from './TotalRating';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SelectParties from '../../../../common_ui/SelectParties';
import Margin from '../../../../common_ui/Margin';
import FooiyToast from '../../../../common/FooiyToast';

const RegisterFeed = props => {
  const {photo_list, shop, menu, address} = props.route.params;
  const [selectedPartyList, setSelectedPartyList] = useState([]);
  const shop_init = shop
    ? props.route.params.shop.name
      ? props.route.params.shop.name
      : props.route.params.shop.shop_name
    : '';
  const shop_id = shop
    ? props.route.params.shop.shop_id
      ? props.route.params.shop.shop_id
      : props.route.params.shop.public_id
    : null;
  const menu_init = menu ? props.route.params.menu.name : '';
  const [accountValue, setAccountValue] = useState('');
  const [shopValue, setShopValue] = useState(shop_init);
  const [locationValue, setLocationValue] = useState(address);
  const [menuValue, setMenuValue] = useState(menu_init);
  const [comment, setComment] = useState('');
  const [fooiytiRatingEI, setFooiytiRatingEI] = useState(2);
  const [fooiytiRatingSN, setFooiytiRatingSN] = useState(2);
  const [fooiytiRatingTF, setFooiytiRatingTF] = useState(2);
  const [fooiytiRatingAC, setFooiytiRatingAC] = useState(2);
  const [totalRating, setTotalRating] = useState(2);
  const valueSet = [90, 70, 50, 30, 10];
  const totalValueSet = [10, 30, 50, 70, 99];
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const commentRef = useRef();

  const checkShopInput = () => {
    return shopValue ? true : false;
  };
  const checkLocationInput = () => {
    return locationValue ? true : false;
  };
  const checkMenuInput = () => {
    return menuValue ? true : false;
  };
  const checkCommentInput = () => {
    return comment ? true : false;
  };
  const getAccountInfo = async () => {
    await ApiManagerV2.get(apiUrl.ACCOUNT_INFO, {params: {}}).then(res =>
      setAccountValue(res.data.payload.account_info.public_id),
    );
  };

  useEffect(() => {
    getAccountInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const postRegister = async data => {
    shop && menu
      ? await ApiManagerV2.post(apiUrl.REGISTER_RECORD, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          transformRequest: (data, headers) => {
            return data;
          },
        }).catch(e => FooiyToast.error())
      : await ApiManagerV2.post(apiUrl.REGISTER_PIONEER, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          transformRequest: (data, headers) => {
            return data;
          },
        }).catch(e => FooiyToast.error());
    navigation.navigate('FeedStackNavigation');
  };
  const onClickRegister = async () => {
    const match = /\.(\w+)$/.exec(photo_list[0].filename ?? '');
    // file name이 없을 때 type 지정이 제대로 안돼서 node에 있는 type 정보를 대신 사용
    const type = Platform.OS === 'ios' ? `image.jpg` : `image/jpeg`;
    const formData = new FormData();
    formData.append('account', accountValue);
    shop
      ? formData.append('shop_id', shop_id)
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
      formData.append('image_3', {
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
    formData.append('subscribe_parties', selectedPartyList);

    postRegister(formData);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StackHeader title="피드 등록" />
      <KeyboardAwareScrollView
        extraScrollHeight={insets.top}
        style={styles.view}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        {/* 음식점 */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            {!shop && (
              <Input
                onChangeText={setShopValue}
                holders="음식점 이름을 적어주세요"
                title="음식점"
                checkInput={checkShopInput}
                value={shopValue}
              />
            )}
            {/* 위치 */}
            {!address && (
              <Input
                onChangeText={setLocationValue}
                holders="대략적인 위치를 적어주세요"
                title="위치"
                checkInput={checkLocationInput}
                value={locationValue}
              />
            )}

            {/* 메뉴 */}
            {!menu && (
              <Input
                onChangeText={setMenuValue}
                holders="메뉴 이름을 적어주세요"
                title="메뉴"
                checkInput={checkMenuInput}
                value={menuValue}
              />
            )}
            {/* 푸이티아이 평가 */}
            <Text style={styles.fooiyti_evaluation}>푸이티아이 평가</Text>
            <View style={styles.fooiyti_view}>
              <FooiytiRating
                left={{en: 'E', kor: '자극적인'}}
                right={{en: 'I', kor: '순한'}}
                setFooiytiRating={setFooiytiRatingEI}
              />
            </View>
            <View style={styles.fooiyti_view}>
              <FooiytiRating
                left={{en: 'S', kor: '짠'}}
                right={{en: 'N', kor: '싱거운'}}
                setFooiytiRating={setFooiytiRatingSN}
              />
            </View>
            <View style={styles.fooiyti_view}>
              <FooiytiRating
                left={{en: 'T', kor: '담백한'}}
                right={{en: 'F', kor: '느끼한'}}
                setFooiytiRating={setFooiytiRatingTF}
              />
            </View>
            <View style={styles.fooiyti_view}>
              <FooiytiRating
                left={{en: 'A', kor: '어른'}}
                right={{en: 'C', kor: '초딩'}}
                setFooiytiRating={setFooiytiRatingAC}
              />
            </View>
            {/* 종합 만족도 */}
            <View>
              <Text style={styles.total_evaluation}>종합 만족도</Text>
              <View style={styles.fooiyti_view}>
                <TotalRating
                  totalRating={totalRating}
                  setTotalRating={setTotalRating}
                />
              </View>
            </View>
            {/* 코멘트 */}
            <View>
              <View style={styles.comment}>
                <Text style={{...fooiyFont.Subtitle1}}>코멘트</Text>
                <Text style={styles.comment_limit}>({comment.length}/500)</Text>
              </View>
              <View
                style={
                  checkCommentInput()
                    ? styles.comment_focus_active
                    : styles.comment_focus_deactive
                }>
                <TextInput
                  ref={commentRef}
                  style={styles.comment_text_focus_active}
                  multiline
                  textAlignVertical="top"
                  autoCapitalize={false}
                  autoCorrect={false}
                  spellCheck={false}
                  onChangeText={setComment}
                  maxLength={500}
                  value={comment}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.commnet_notice}>
          <View style={{flexDirection: 'row'}}>
            <Notice style={styles.comment_notice_icon} />
            <Text style={[styles.commnet_notice_text, {marginBottom: 8}]}>
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
        <Margin h={36} />
        <SelectParties
          selectedPartyList={selectedPartyList}
          setSelectedPartyList={setSelectedPartyList}
        />
        <Margin h={48} />
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
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default RegisterFeed;

const styles = StyleSheet.create({
  container: {
    backgroundColor: fooiyColor.W,
    flex: 1,
  },
  view: {
    backgroundColor: fooiyColor.W,
    paddingHorizontal: 16,
  },
  fooiyti_evaluation: {
    ...fooiyFont.Subtitle1,
    marginTop: 16,
  },
  fooiyti_view: {
    justifyContent: 'center',
    marginTop: 16,
  },
  total_evaluation: {
    ...fooiyFont.Subtitle1,
    marginTop: 36,
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
    lineHeight: Platform.select({ios: 0, android: null}),
    width: '100%',
    height: '100%',
    fontSize: 14,
    fontWeight: '400',
  },
  commnet_notice: {
    width: '100%',
    backgroundColor: fooiyColor.P50,
    borderRadius: 8,
    marginTop: 16,
    padding: 16,
    marginBottom: 16,
  },
  comment_notice_icon: {
    ...fooiyFont.Subtitle3,
    color: fooiyColor.G600,
  },
  commnet_notice_text: {
    marginLeft: 8,
    color: fooiyColor.G600,
  },
  register_btn_active: {
    width: globalVariable.width - 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: fooiyColor.P500,
    height: 56,
    marginBottom: Platform.OS === 'ios' ? 0 : 16,
  },
  register_btn_deactive: {
    width: globalVariable.width - 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: fooiyColor.G100,
    height: 56,
    marginBottom: Platform.OS === 'ios' ? 0 : 16,
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
