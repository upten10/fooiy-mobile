import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Keyboard,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {
  ArrowIconRight,
  Search,
  Ranker_1st,
  Ranker_2nd,
  Ranker_3rd,
} from '../../../assets/icons/svg';
import {ApiManagerV2} from '../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../common/Enums';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {debounce} from 'lodash';
import {useNavigation} from '@react-navigation/native';

const UserSearch = () => {
  const navigation = useNavigation();
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState('');
  const [user, setUser] = useState([]);
  const [ranker, setRanker] = useState([]);

  const onFocus = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };
  const debounceCallback = useCallback(value => {
    debounceSearch(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const debounceSearch = debounce(async value => {
    value &&
      (await ApiManagerV2.get(apiUrl.ACCOUNT_SEARCH, {
        params: {
          keyword: value,
        },
      }).then(res => {
        setUser(res.data.payload.accounts_list.results);
      }));
  }, 300);
  const rankerSearch = async () => {
    await ApiManagerV2.get(apiUrl.ACCOUNT_RANKER).then(res =>
      setRanker(res.data.payload.ranker_list),
    );
  };
  const ListEmptyComponent = () => {
    return (
      <View>
        <View style={styles.empty_container}>
          <Text style={{...fooiyFont.Body1, color: fooiyColor.G600}}>
            검색 결과가 없어요
          </Text>
          <Text style={{...fooiyFont.Body1, color: fooiyColor.G600}}>
            철자와 띄어쓰기를 확인해보세요!
          </Text>
        </View>
        <View>
          <Text style={styles.fooyi_ranker}>오늘의 푸이랭커</Text>
        </View>
        <FlatList
          data={ranker}
          renderItem={RankerItem}
          keyExtractor={(user, index) => index.toString()}
          scrollEventThrottle={16}
          bounces={true}
          scrollToOverflowEnabled
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };
  const UserItem = item => {
    const {
      index,
      item: {fooiyti, nickname, profile_image, public_id, rank, count},
    } = item;

    return (
      <TouchableOpacity
        key={index}
        style={{backgroundColor: fooiyColor.W, marginBottom: 16}}
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('OtherUserPage', {
            other_account_id: public_id,
          })
        }>
        <View
          style={{
            height: 56,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image source={{uri: profile_image}} style={styles.profile_image} />
          <View style={{justifyContent: 'center', alignItems: 'flex-start'}}>
            <Text style={{...fooiyFont.Subtitle3, color: fooiyColor.G800}}>
              {nickname}
            </Text>
            <View style={styles.user_info}>
              <Text
                style={[
                  styles.info_text,
                  {
                    marginRight: 4,
                    color: fooiyColor.P500,
                    borderColor: fooiyColor.P500,
                  },
                ]}>
                {fooiyti}
              </Text>
              <Text
                style={[
                  styles.info_text,
                  {
                    color: fooiyColor.G400,
                    borderColor: fooiyColor.G400,
                  },
                ]}>
                피드 {count}
              </Text>
            </View>
          </View>
          <ArrowIconRight
            style={{position: 'absolute', right: 0, width: 24, height: 24}}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const RankerItem = item => {
    const {
      index,
      item: {count, fooiyti, nickname, profile_image, public_id, rank},
    } = item;
    return (
      <TouchableOpacity
        key={index}
        style={{backgroundColor: fooiyColor.W, marginBottom: 16}}
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('OtherUserPage', {
            other_account_id: public_id,
          })
        }>
        <View
          style={{
            height: 56,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{marginRight: 8}}>
            {index === 0 ? (
              <Ranker_1st />
            ) : index === 1 ? (
              <Ranker_2nd />
            ) : index === 2 ? (
              <Ranker_3rd />
            ) : (
              <Text style={styles.rank}>{index + 1}</Text>
            )}
          </View>
          <Image source={{uri: profile_image}} style={styles.profile_image} />
          <View style={{justifyContent: 'center', alignItems: 'flex-start'}}>
            <Text style={{...fooiyFont.Subtitle3, color: fooiyColor.G800}}>
              {nickname}
            </Text>
            <View style={styles.user_info}>
              <Text
                style={[
                  styles.info_text,
                  {
                    marginRight: 4,
                    color: fooiyColor.P500,
                    borderColor: fooiyColor.P500,
                  },
                ]}>
                {fooiyti}
              </Text>
              <Text
                style={[
                  styles.info_text,
                  {
                    color: fooiyColor.G400,
                    borderColor: fooiyColor.G400,
                  },
                ]}>
                피드 {count}
              </Text>
            </View>
          </View>
          <ArrowIconRight
            style={{position: 'absolute', right: 0, width: 24, height: 24}}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const MainUI = useCallback(() => {
    if (value.length !== 0) {
      // 아이템들 그려주면 됨.
      return (
        <>
          <FlatList
            data={user}
            renderItem={UserItem}
            ListEmptyComponent={ListEmptyComponent}
            keyExtractor={(user, index) => index.toString()}
            scrollEventThrottle={16}
            bounces={true}
            scrollToOverflowEnabled
            showsVerticalScrollIndicator={false}
          />
        </>
      );
    } else {
      // 처음 들어왔을 때
      return (
        <>
          <View>
            <Text style={styles.fooyi_ranker}>오늘의 푸이랭커</Text>
          </View>
          <FlatList
            data={ranker}
            renderItem={RankerItem}
            keyExtractor={(ranker, index) => index.toString()}
            scrollEventThrottle={16}
            bounces={true}
            scrollToOverflowEnabled
            showsVerticalScrollIndicator={false}
          />
        </>
      );
    }
  }, [value, user, ranker]);

  useEffect(() => {
    debounceCallback(value);
  }, [value]);
  useEffect(() => {
    rankerSearch();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          paddingHorizontal: 16,
          backgroundColor: fooiyColor.W,
          height: '100%',
        }}>
        <View style={styles.input_container}>
          <TextInput
            placeholder="보고 싶은 유저를 검색해보세요"
            placeholderTextColor={fooiyColor.G400}
            onFocus={onFocus}
            onBlur={onBlur}
            multiline={false}
            autoCapitalize={false}
            autoCorrect={false}
            spellCheck={false}
            onChangeText={setValue}
            value={value}
            style={
              focus && value !== ''
                ? styles.input
                : focus && value === ''
                ? [
                    {...fooiyFont.Subtitle2, color: fooiyColor.G400},
                    styles.input,
                  ]
                : !focus && value !== ''
                ? styles.input
                : [
                    {
                      ...fooiyFont.Subtitle2,
                      color: fooiyColor.G400,
                      borderColor: fooiyColor.G200,
                    },
                    styles.input,
                  ]
            }
          />
          <Search style={{position: 'absolute', right: 16}} />
        </View>
        <MainUI />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UserSearch;

const styles = StyleSheet.create({
  empty_container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    height: 48,
  },
  profile_image: {
    width: 56,
    height: 56,
    borderRadius: 36,
    marginRight: 8,
  },
  user_info: {
    flexDirection: 'row',
    marginTop: 4,
    height: 18,
    alignItems: 'center',
  },
  info_text: {
    ...fooiyFont.Subtitle4,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    textAlign: 'center',
  },
  fooyi_ranker: {
    ...fooiyFont.Subtitle1,
    color: fooiyColor.G800,
    marginBottom: 16,
  },
  rank: {
    ...fooiyFont.Subtitle1,
    color: fooiyColor.G400,
    width: 48,
    textAlign: 'center',
  },
  input_container: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: fooiyColor.G400,
    borderRadius: 8,
    height: 56,
    padding: 16,
    ...fooiyFont.Body1,
    color: fooiyColor.B,
    ...Platform.select({
      ios: {
        lineHeight: 0,
      },
      android: {
        lineHeight: 24,
      },
    }),
  },
});
