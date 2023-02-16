import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  AgreeAllCheck,
  AgreeCheck,
  AgreeUncheck,
  ArrowRight24G400,
} from '../../../assets/icons/svg';
import {ApiManagerV2} from '../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../common/Enums';
import FooiyToast from '../../common/FooiyToast';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';

const tabs = [
  {
    title: '서비스 이용약관 동의 (필수)',
    link: 'https://fooiy.com/policy/terms',
  },
  {
    title: '위치기반 이용약관 동의 (필수)',
    link: 'https://fooiy.com/policy/location',
  },
  {
    title: '개인정보 수집 및 이용 동의 (필수)',
    link: 'https://fooiy.com/policy/privacy',
  },
  {
    title: '만 14세 이상 (필수)',
  },
  {
    title: '마케팅 정보 수신 동의 (선택)',
  },
];

export default props => {
  const navigation = useNavigation();

  const [checkedIndex, setCheckedIndex] = useState([]);
  const [btnActive, setBtnActive] = useState(false);

  useEffect(() => {
    if (
      checkedIndex.includes(0) &&
      checkedIndex.includes(1) &&
      checkedIndex.includes(2) &&
      checkedIndex.includes(3)
    ) {
      setBtnActive(true);
    } else {
      setBtnActive(false);
    }
  }, [checkedIndex]);

  const onPressAllCheck = () => {
    if (checkedIndex.length === 5) {
      setCheckedIndex([]);
    } else {
      setCheckedIndex([0, 1, 2, 3, 4]);
    }
  };

  const onPressNext = () => {
    ApiManagerV2.patch(apiUrl.PROFILE_EDIT, {
      is_mkt_agree: checkedIndex.includes(4) ? 'true' : 'false',
    })
      .then(
        res =>
          res.data.success === true && navigation.navigate('FooiytiTestHome'),
      )
      .catch(FooiyToast.error());
  };

  const AgreeAllTab = () => {
    return (
      <TouchableOpacity
        onPress={onPressAllCheck}
        activeOpacity={0.8}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          height: 56,
          backgroundColor:
            checkedIndex.length === 5 ? fooiyColor.G600 : fooiyColor.G50,
          borderRadius: 8,
          padding: 16,
          marginBottom: 8,
        }}>
        {checkedIndex.length === 5 ? <AgreeAllCheck /> : <AgreeUncheck />}
        <Text
          style={{
            marginLeft: 8,
            ...fooiyFont.Button,
            color: checkedIndex.length === 5 ? fooiyColor.W : fooiyColor.G600,
            lineHeight: Platform.select({
              ios: 0,
              android: null,
            }),
          }}>
          약관 전체 동의
        </Text>
      </TouchableOpacity>
    );
  };

  const AgreeTab = props => {
    const {title, link, index} = props;
    const onPressLink = () => {
      Linking.canOpenURL(link).then(
        supported => {
          supported && Linking.openURL(link);
        },
        err => console.log(err),
      );
    };
    return (
      <TouchableOpacity
        onPress={() => {
          if (checkedIndex.findIndex(elem => elem === index) === -1) {
            setCheckedIndex([...checkedIndex, index]);
          } else {
            setCheckedIndex(checkedIndex.filter(elem => elem !== index));
          }
        }}
        activeOpacity={0.8}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          height: 48,
          paddingHorizontal: 16,
          paddingVertical: 12,
          marginBottom: 8,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {checkedIndex.findIndex(elem => elem === index) !== -1 ? (
            <AgreeCheck />
          ) : (
            <AgreeUncheck />
          )}
          <Text
            style={{
              marginLeft: 8,
              ...fooiyFont.Subtitle3,
              color: fooiyColor.G600,
            }}>
            {title}
          </Text>
        </View>
        {link ? (
          <TouchableOpacity activeOpacity={0.8} onPress={onPressLink}>
            <ArrowRight24G400 />
          </TouchableOpacity>
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{flex: 1, paddingHorizontal: 16, backgroundColor: fooiyColor.W}}>
      <View style={{height: 48}} />
      <View style={{flex: 1}}>
        <View style={{marginBottom: 24}}>
          <Text style={{...fooiyFont.H3, marginBottom: 8}}>푸이 약관 동의</Text>
          <Text style={{...fooiyFont.Body1, color: fooiyColor.G600}}>
            푸이 서비스 이용을 위해{'\n'}이용약관에 동의해주세요.
          </Text>
        </View>
        {/* tab */}
        <View>
          <AgreeAllTab />
          {tabs.map((item, index) => (
            <AgreeTab key={index} {...item} index={index} />
          ))}
        </View>
        {/* btn */}
        <TouchableOpacity
          onPress={btnActive ? onPressNext : null}
          activeOpacity={0.8}
          style={
            btnActive
              ? [styles.btn, {backgroundColor: fooiyColor.P500}]
              : styles.btn
          }>
          <Text
            style={
              btnActive
                ? [styles.btnText, {color: fooiyColor.W}]
                : styles.btnText
            }>
            다음
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    height: 56,
    backgroundColor: fooiyColor.G100,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
  btnText: {
    ...fooiyFont.Button,
    color: fooiyColor.G300,
    lineHeight: Platform.select({
      ios: 0,
      android: null,
    }),
  },
});
