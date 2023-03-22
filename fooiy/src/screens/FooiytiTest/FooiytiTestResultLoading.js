import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {Musang} from '../../../assets/icons/svg';
import {ApiManagerV2} from '../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../common/Enums';
import FooiyToast from '../../common/FooiyToast';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import ApiLoading from '../../common_ui/loading/ApiLoading';
import {userInfoAction} from '../../redux/actions/userInfoAction';

export default props => {
  const {testResult, reTest} = props.route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    postResult();
    setTimeout(() => {
      if (reTest) {
        navigation.navigate('FooiyTI');
      } else {
        navigation.navigate('FooiytiTestResult');
      }
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
      dispatch(userInfoAction.edit(res.data.payload.account_info)).catch(e =>
        FooiyToast.error(),
      ),
    );
  };

  const postResult = async () => {
    await ApiManagerV2.get(apiUrl.FOOIYTI_QUESTION_RESULT, {
      params: {
        fooiyti_answers: JSON.stringify(testResult),
      },
    })
      .then(res => {
        editProfile(res.data.payload.fooiyti_result);
      })
      .catch(e => FooiyToast.error());
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
        <ApiLoading />
      </View>
      <View>
        <Musang />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
