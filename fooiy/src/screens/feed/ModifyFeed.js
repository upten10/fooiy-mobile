import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Ic_info_18_G600} from '../../../assets/svg';
import {ApiManagerV2} from '../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../common/Enums';
import FooiyToast from '../../common/FooiyToast';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';
import {StackHeader} from '../../common_ui/headers/StackHeader';
import Margin from '../../common_ui/Margin';
import SelectParties from '../../common_ui/SelectParties';
import FooiytiRating from '../../screens/register/register_feed/register_feed_ui/FooiytiRating';
import TotalRating from '../register/register_feed/register_feed_ui/TotalRating';
import transformFooiytiRating from './functions/transformFooiytiRating';

const ModifyFeed = props => {
  const {feed} = props.route.params;
  const [isCafe, setIsCafe] = useState(false);

  const [selectedPartyList, setSelectedPartyList] = useState([]);

  const [comment, setComment] = useState(
    feed.description ? feed.description : '',
  );
  const [fooiytiRatingEI, setFooiytiRatingEI] = useState(
    transformFooiytiRating(feed.fooiyti_i),
  );
  const [fooiytiRatingSN, setFooiytiRatingSN] = useState(
    transformFooiytiRating(feed.fooiyti_n),
  );
  const [fooiytiRatingTF, setFooiytiRatingTF] = useState(
    transformFooiytiRating(feed.fooiyti_f),
  );
  const [fooiytiRatingAC, setFooiytiRatingAC] = useState(
    transformFooiytiRating(feed.fooiyti_c),
  );
  const [totalRating, setTotalRating] = useState(
    transformFooiytiRating(feed.taste_evaluation),
  );
  const valueSet = [90, 70, 50, 30, 10];
  const totalValueSet = [10, 30, 50, 70, 99];
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const commentRef = useRef();

  const getFeed = async () => {
    if (feed !== undefined) {
      await ApiManagerV2.get(apiUrl.RETRIEVE_FEED, {
        params: {feed_id: feed.id},
      })
        .then(res => setIsCafe(res.data.payload.feed.is_cafe))
        .catch(e => FooiyToast.error());
    }
  };

  useEffect(() => {
    getFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateFeed = async data => {
    await ApiManagerV2.patch(apiUrl.UPDATE_FEED, {
      feed_id: feed.id,
      description: comment,
      taste_evaluation: totalValueSet[totalRating],
      subscribe_parties:
        selectedPartyList.length === 0 ? null : selectedPartyList,
      fooiyti_e: valueSet[fooiytiRatingEI],
      fooiyti_i: valueSet[4 - fooiytiRatingEI],
      fooiyti_s: valueSet[fooiytiRatingSN],
      fooiyti_n: valueSet[4 - fooiytiRatingSN],
      fooiyti_t: valueSet[fooiytiRatingTF],
      fooiyti_f: valueSet[4 - fooiytiRatingTF],
      fooiyti_a: valueSet[fooiytiRatingAC],
      fooiyti_c: valueSet[4 - fooiytiRatingAC],
    })
      .then(res => {
        res.data.payload === 'success' && navigation.goBack();
      })
      .catch(e => FooiyToast.error());
  };

  return (
    <SafeAreaView style={styles.container}>
      <StackHeader title="피드 수정" />
      <KeyboardAwareScrollView
        extraScrollHeight={insets.top}
        style={styles.view}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        {/* 음식점 */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            {/* 푸이티아이 평가 */}
            {!isCafe && (
              <>
                <Margin h={16} />
                <Text style={styles.fooiyti_evaluation}>푸이티아이 평가</Text>
                <View style={styles.fooiyti_view} key={1}>
                  <FooiytiRating
                    key={1}
                    firstValue={fooiytiRatingEI}
                    left={{en: 'E', kor: '자극적인'}}
                    right={{en: 'I', kor: '순한'}}
                    setFooiytiRating={setFooiytiRatingEI}
                  />
                </View>
                <View style={styles.fooiyti_view} key={2}>
                  <FooiytiRating
                    key={2}
                    firstValue={fooiytiRatingSN}
                    left={{en: 'S', kor: '짠'}}
                    right={{en: 'N', kor: '싱거운'}}
                    setFooiytiRating={setFooiytiRatingSN}
                  />
                </View>
                <View style={styles.fooiyti_view} key={3}>
                  <FooiytiRating
                    key={3}
                    firstValue={fooiytiRatingTF}
                    left={{en: 'T', kor: '담백한'}}
                    right={{en: 'F', kor: '느끼한'}}
                    setFooiytiRating={setFooiytiRatingTF}
                  />
                </View>
                <View style={styles.fooiyti_view} key={4}>
                  <FooiytiRating
                    key={4}
                    firstValue={fooiytiRatingAC}
                    left={{en: 'A', kor: '어른'}}
                    right={{en: 'C', kor: '초딩'}}
                    setFooiytiRating={setFooiytiRatingAC}
                  />
                </View>
                <Margin h={20} />
              </>
            )}
            <Margin h={16} />
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
              <View style={styles.comment_focus_active}>
                <TextInput
                  ref={commentRef}
                  style={styles.r}
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
          <Ic_info_18_G600 />
          <Text style={styles.commnet_notice_text}>
            욕설, 비방 등의 코멘트는 지양해주세요.
          </Text>
        </View>
        <Margin h={36} />
        <SelectParties
          selectedPartyList={selectedPartyList}
          setSelectedPartyList={setSelectedPartyList}
          feed_id={feed.id}
        />
        <Margin h={48} />
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.register_btn_active}
          onPress={updateFeed}>
          <Text style={styles.register_btn_text_active}>피드 수정</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ModifyFeed;

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
  },
  fooiyti_view: {
    justifyContent: 'center',
    marginTop: 16,
  },
  total_evaluation: {
    ...fooiyFont.Subtitle1,
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
    width: '100%',
    height: 104,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: fooiyColor.G200,
  },
  r: {
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
    flexDirection: 'row',
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
    ...fooiyFont.Caption1,
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
    fontSize: 16,
  },
  register_btn_text_deactive: {
    ...fooiyFont.Button,
    color: fooiyColor.G300,
    fontSize: 16,
  },
});
