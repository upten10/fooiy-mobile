import {useNavigation} from '@react-navigation/native';
import React, {Profiler, useEffect, useState} from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Clear, Notice, Register_icon} from '../../../../assets/icons/svg';
import {fooiyColor, fooiyFont} from '../../../common/globalStyles';
import {globalVariable} from '../../../common/globalVariable';
import {GalleryPermission} from '../../../common/Permission';
import {StackHeader} from '../../../common_ui/headers/StackHeader';
import ProfileImg from '../../mypage/setting/ProfileImg';
import {useDebounce} from '../../../common/hooks/useDebounce';
import {isEmpty} from 'lodash';

const Title = props => {
  const {index} = props;
  const text =
    index === 1
      ? '파티 이름을\n입력해주세요'
      : index === 2
      ? '인사말을\n입력해주세요'
      : '프로필 사진을\n등록해주세요';
  return (
    <View style={{marginBottom: 24}}>
      <Text style={{...fooiyFont.H3}}>{text}</Text>
    </View>
  );
};

const UserInput = props => {
  const {index, setBtnActivate, setInputValue, inputValue} = props;
  const {debounceCallback, isLoading} = useDebounce({time: 250});
  const [isValid, setIsValid] = useState(false);
  const [focus, setFocus] = useState(true);

  const NICKNAME_RULE =
    /^[0-9A-Za-z가-힣][0-9A-Za-z가-힣._/]{0,18}[0-9A-Za-z가-힣]$/;

  useEffect(() => {
    if (inputValue.length !== 0 && index === 1) {
      debounceCallback(() => {
        checkValid(inputValue);
      });
    }
  }, [inputValue]);

  const checkValid = name => {
    if (NICKNAME_RULE.test(name)) {
      setIsValid(true);
      setBtnActivate(true);
    } else {
      setIsValid(false);
      setBtnActivate(false);
    }
  };

  const onChangeText = value => {
    setInputValue(value);
    if (index === 1) {
      value.length < 3 ? setBtnActivate(false) : null;
    } else if (index === 2) {
      setIsValid(true);
      setBtnActivate(true);
    }
  };

  const onInputBlur = () => {
    setFocus(false);
  };

  const onInputFocus = () => {
    setFocus(true);
  };

  return (
    <View style={{marginBottom: 16}}>
      <View
        style={
          focus
            ? isValid || inputValue.length === 0
              ? [styles.textInputContainer, styles.textInputValue]
              : [
                  styles.textInputContainer,
                  styles.textInputValue,
                  styles.wrongTextInput,
                ]
            : isValid || inputValue.length === 0
            ? [styles.textInputContainer, styles.textInputValue]
            : [
                styles.textInputContainer,
                styles.textInputValue,
                styles.wrongTextInput,
              ]
        }>
        <TextInput
          maxLength={20}
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
          placeholder={index === 1 ? '특수문자 제외, 최대 20자' : '최대 20자'}
          placeholderTextColor={fooiyColor.G400}
          onChangeText={onChangeText}
          onBlur={onInputBlur}
          onFocus={onInputFocus}
          autoFocus
          value={inputValue}
          style={
            inputValue.length === 0
              ? styles.textInput
              : !isValid
              ? [styles.textInput, styles.textInputValue, styles.wrongTextInput]
              : [styles.textInput, styles.textInputValue]
          }
        />
        {inputValue.length > 0 ? (
          <TouchableOpacity
            // style={{position: 'absolute', right: 14, bottom: 15.5, zIndex: 1}}
            hitSlop={{top: 16, bottom: 16, left: 16, right: 16}}
            onPress={() => {
              setInputValue('');
            }}>
            <Clear />
          </TouchableOpacity>
        ) : null}
      </View>
      <Text
        style={
          inputValue.length === 0
            ? styles.errorMsgOff
            : isValid
            ? styles.errorMsgOff
            : styles.errorMsgOn
        }>
        사용할 수 없는 파티 이름이에요.
      </Text>
    </View>
  );
};

const NoticeComp = props => {
  const {index} = props;
  return (
    <View style={styles.infoContainer}>
      <View style={styles.infoTextContainer}>
        <Text style={styles.infoTextBig}>안내사항</Text>
      </View>
      {index === 1 ? (
        <>
          <View style={styles.infoTextContainer}>
            <Notice style={styles.infoIcon} />
            <Text style={styles.infoText}>최소 2자, 최대 20자만 가능해요.</Text>
          </View>
          <View style={styles.infoTextContainer}>
            <Notice style={styles.infoIcon} />
            <Text style={styles.infoText}>특수문자는 [./_]만 가능해요.</Text>
          </View>
          <View style={styles.infoTextContainerLast}>
            <Notice style={styles.infoIcon} />
            <Text style={styles.infoText}>[./_]는 중간에만 가능해요.</Text>
          </View>
        </>
      ) : (
        <>
          <View style={styles.infoTextContainer}>
            <Notice style={styles.infoIcon} />
            <Text style={styles.infoText}>
              파티를 잘 설명할수록 가입 신청에 도움이 돼요.
            </Text>
          </View>
          <View style={styles.infoTextContainerLast}>
            <Notice style={styles.infoIcon} />
            <Text style={styles.infoText}>최대 20자만 가능해요.</Text>
          </View>
        </>
      )}
    </View>
  );
};

const NavigateBtn = props => {
  const {index, navigation, btnActivate, inputValue, data, image, imageType} =
    props;
  const insets = useSafeAreaInsets();

  const nextRoute =
    index === 1
      ? 'PartyCreateIntro'
      : index === 2
      ? 'PartyCreateImg'
      : 'PartyCreateFinishScreen';

  const onPressNext = () => {
    if (index === 1) {
      btnActivate
        ? navigation.navigate(nextRoute, {
            party_name: inputValue,
          })
        : null;
    } else if (index === 2) {
      navigation.navigate(nextRoute, {
        ...data,
        introduction: inputValue,
      });
    } else if (index === 3) {
      navigation.navigate(nextRoute, {
        ...data,
        party_image: image,
        imageType,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({
        ios: 'position',
        android: null,
      })}
      style={{paddingHorizontal: 16}}>
      <View
        style={
          index === 1
            ? [
                styles.navigateBtnContainer,
                {
                  bottom: Platform.select({
                    ios: insets.bottom,
                    android: 34,
                  }),
                  left: Platform.select({
                    ios: null,
                    android: 16,
                  }),
                },
              ]
            : [
                styles.navigateTwoBtnContainer,
                {
                  bottom: Platform.select({
                    ios: insets.bottom,
                    android: 34,
                  }),
                  left: Platform.select({
                    ios: null,
                    android: 16,
                  }),
                },
              ]
        }>
        {index === 1 ? null : (
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backBtnText}>이전</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPressNext}
          style={
            index === 1
              ? btnActivate
                ? styles.nextBtn
                : [styles.nextBtn, styles.nextBtnOff]
              : [styles.nextBtn, styles.secondNextBtn]
          }>
          <Text
            style={
              index === 1
                ? btnActivate
                  ? styles.nextBtnText
                  : [styles.nextBtnText, styles.nextBtnTextOff]
                : styles.nextBtnText
            }>
            다음
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const InsertImage = props => {
  const {setIsVisible} = props;

  const onPressInsertImage = async () => {
    (await GalleryPermission()) && setIsVisible(true);
  };

  return (
    <TouchableOpacity
      onPress={onPressInsertImage}
      activeOpacity={0.8}
      style={{
        width: globalVariable.width - 32,
        height: globalVariable.width - 32,
        backgroundColor: fooiyColor.G50,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{marginBottom: 8}}>
        <Register_icon />
      </View>
      <Text style={{...fooiyFont.Subtitle1, color: fooiyColor.G600}}>
        사진 등록
      </Text>
    </TouchableOpacity>
  );
};

export default props => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  // index: 1 = partyName 2 = partyIntro
  const [index, setIndex] = useState(0);
  const [btnActivate, setBtnActivate] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [image, setImage] = useState({});
  const [imageType, setImageType] = useState('');

  useEffect(() => {
    if (props.route.params !== undefined) {
      setData({...data, ...props.route.params});
    }
  }, []);

  useEffect(() => {
    setIndex(navigation.getState().index);
  }, [navigation, index]);

  const toggleAlbum = () => {
    setIsVisible(false);
  };

  if (isVisible) {
    return (
      <View
        style={{
          position: 'absolute',
          width: globalVariable.width,
          height: globalVariable.height,
          // borderWidth: 1,
        }}>
        <ProfileImg
          isParty={'create'}
          toggleAlbum={toggleAlbum}
          setImage={setImage}
          setIsVisible={setIsVisible}
          setImageType={setImageType}
        />
      </View>
    );
  } else {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={{backgroundColor: fooiyColor.W}}
          edges={Platform.select({
            ios: 'top',
            android: null,
          })}>
          <StackHeader title={'파티 생성'} />
          {/* Body */}
          <View
            style={{
              height: globalVariable.height - insets.top - 56,
              paddingHorizontal: 16,
              paddingTop: 16,
            }}>
            <Title index={index} />
            {index < 3 ? (
              <>
                <UserInput
                  index={index}
                  setBtnActivate={setBtnActivate}
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                />
                <NoticeComp index={index} />
              </>
            ) : !isEmpty(image) ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setIsVisible(true);
                }}>
                <Image
                  source={{uri: image.uri}}
                  style={{
                    width: globalVariable.width - 32,
                    height: globalVariable.width - 32,
                    borderRadius: 24,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              </TouchableOpacity>
            ) : (
              <InsertImage setIsVisible={setIsVisible} />
            )}
          </View>
          <NavigateBtn
            index={index}
            navigation={navigation}
            btnActivate={btnActivate}
            inputValue={inputValue}
            data={data}
            image={image}
            imageType={imageType}
          />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
};

const styles = StyleSheet.create({
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: fooiyColor.G200,
    borderRadius: 8,
    height: 56,
    paddingHorizontal: 16,
  },
  wrongTextInput: {
    borderColor: fooiyColor.P800,
  },
  textInput: {
    ...fooiyFont.Body1,
    lineHeight: Platform.select({
      ios: 0,
      android: null,
    }),
    width: '90%',
    height: '100%',
  },
  textInputValue: {
    borderColor: fooiyColor.G400,
  },
  errorMsgOn: {
    ...fooiyFont.Body2,
    marginTop: 4,
    marginLeft: 16,
  },
  errorMsgOff: {
    display: 'none',
  },
  infoContainer: {
    width: '100%',
    backgroundColor: fooiyColor.P50,
    borderRadius: 8,
    padding: 16,
  },
  infoTextContainer: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoTextContainerLast: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: 8,
  },
  infoTextBig: {
    ...fooiyFont.Subtitle3,
    color: fooiyColor.G600,
  },
  infoText: {
    ...fooiyFont.Caption1,
    color: fooiyColor.G600,
  },
  navigateBtnContainer: {
    width: '100%',
    height: 56,
    position: 'absolute',
  },
  navigateTwoBtnContainer: {
    width: '100%',
    height: 48,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nextBtn: {
    backgroundColor: fooiyColor.P500,
    borderRadius: 8,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextBtnOff: {
    backgroundColor: fooiyColor.G100,
  },
  nextBtnText: {
    ...fooiyFont.Button,
    color: fooiyColor.W,
    lineHeight: Platform.select({
      ios: 0,
      android: null,
    }),
  },
  nextBtnTextOff: {
    color: fooiyColor.G300,
  },
  backBtn: {
    width: (globalVariable.width - 39) / 2,
    height: '100%',
    backgroundColor: fooiyColor.W,
    borderRadius: 8,
    borderColor: fooiyColor.G200,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backBtnText: {
    ...fooiyFont.Button,
    color: fooiyColor.G600,
    lineHeight: Platform.select({
      ios: 0,
      android: null,
    }),
  },
  secondNextBtn: {
    width: (globalVariable.width - 39) / 2,
  },
});
