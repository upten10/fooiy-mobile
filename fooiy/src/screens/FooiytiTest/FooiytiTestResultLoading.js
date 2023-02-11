import {useNavigation} from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {Musang} from '../../../assets/icons/svg';
import {ApiManagerV2} from '../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../common/Enums';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {userInfoAction} from '../../redux/actions/userInfoAction';

export default props => {
  const {testResult} = props.route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    postResult();
    setTimeout(() => {
      navigation.navigate('FooiytiTestResult');
    }, 3000);
  }, []);

  const editProfile = async result => {
    const {
      fooiyti,
      fooiyti_ratio: {E, I, N, S, T, F, C, A},
    } = result;
    await ApiManagerV2.patch(apiUrl.PROFILE_EDIT, {
      fooiyti,
      fooiyti_e_percentage: E.toString(),
      fooiyti_i_percentage: I.toString(),
      fooiyti_n_percentage: N.toString(),
      fooiyti_s_percentage: S.toString(),
      fooiyti_t_percentage: T.toString(),
      fooiyti_f_percentage: F.toString(),
      fooiyti_c_percentage: C.toString(),
      fooiyti_a_percentage: A.toString(),
    }).then(res =>
      dispatch(userInfoAction.edit(res.data.payload.account_info)),
    );
  };

  const postResult = async () => {
    await ApiManagerV2.get(apiUrl.FOOIYTI_QUESTION_RESULT, {
      params: {
        fooiyti_answers: JSON.stringify(testResult),
      },
    }).then(res => {
      editProfile(res.data.payload.fooiyti_result);
    });
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: fooiyColor.W,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View>
        <Text style={{...fooiyFont.H3, color: fooiyColor.G800}}>
          푸이티아이를{'\n'}분석중입니다
        </Text>
      </View>
      <View style={{width: 192, height: 192}}>
        <AnimatedLottieView
          source={require('../../../assets/lottie/progress.json.json')}
          // progress={animationProgress.current}
          imageAssetsFolder={'images'}
          autoPlay
          loop
        />
      </View>
      <View>
        <Musang />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
