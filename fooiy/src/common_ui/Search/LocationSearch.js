import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Keyboard,
  FlatList,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {
  Landmark,
  Notice,
  University,
  Search_Icon,
  Subway,
  District,
} from '../../../assets/icons/svg';
import {ApiManagerV2} from '../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../common/Enums';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {debounce} from 'lodash';
import {useNavigation} from '@react-navigation/native';

const LocationSearch = () => {
  const navigation = useNavigation();
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState('');
  const [spot, setSpot] = useState([]);

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
      (await ApiManagerV2.get(apiUrl.SPOT_SEARCH, {
        params: {
          keyword: value,
          limit: 30,
          offset: 0,
        },
      }).then(res => {
        setSpot(res.data.payload.spot_list.results);
      }));
  }, 300);
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
        <View style={styles.init_container}>
          <Text style={{...fooiyFont.Subtitle3, color: fooiyColor.G600}}>
            이렇게 검색해 보세요!
          </Text>
          <View style={{flexDirection: 'row', marginTop: 8}}>
            <Notice style={{marginRight: 8}} />
            <Text style={{...fooiyFont.Caption1, color: fooiyColor.G600}}>
              지역 이름
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 8}}>
            <Notice style={{marginRight: 8}} />
            <Text style={{...fooiyFont.Caption1, color: fooiyColor.G600}}>
              지역 랜드마크
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 8}}>
            <Notice style={{marginRight: 8}} />
            <Text style={{...fooiyFont.Caption1, color: fooiyColor.G600}}>
              지하철역
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const SpotItem = item => {
    const {
      index,
      item: {address, id, latitude, longitude, name, type},
    } = item;
    return (
      <TouchableOpacity
        key={index}
        style={{backgroundColor: fooiyColor.W}}
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('TabNavigator', {
            screen: 'Map',
            params: {longitude: longitude, latitude: latitude},
          })
        }>
        <View style={styles.result_container}>
          <View style={styles.result_type}>
            {type === 'subway' ? (
              <Subway />
            ) : type === 'landmark' ? (
              <Landmark />
            ) : type === 'district' ? (
              <District />
            ) : type === 'university' ? (
              <University />
            ) : null}
          </View>
          <View>
            <Text style={{...fooiyFont.Subtitle2, color: fooiyColor.G800}}>
              {name}
            </Text>
            <Text style={{...fooiyFont.Caption1, color: fooiyColor.G400}}>
              {address}
            </Text>
          </View>
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
            data={spot}
            renderItem={SpotItem}
            ListEmptyComponent={ListEmptyComponent}
            keyExtractor={item => String(item.id)}
            scrollEventThrottle={16}
            bounces={true}
            scrollToOverflowEnabled
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<View style={{marginBottom: 16}} />}
          />
        </>
      );
    } else {
      // 처음 들어왔을 때
      return (
        <>
          <View style={styles.init_container}>
            <Text style={{...fooiyFont.Subtitle3, color: fooiyColor.G600}}>
              이렇게 검색해 보세요!
            </Text>
            <View style={{flexDirection: 'row', marginTop: 8}}>
              <Notice style={{marginRight: 8}} />
              <Text style={{...fooiyFont.Caption1, color: fooiyColor.G600}}>
                지역 이름
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 8}}>
              <Notice style={{marginRight: 8}} />
              <Text style={{...fooiyFont.Caption1, color: fooiyColor.G600}}>
                지역 랜드마크
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 8}}>
              <Notice style={{marginRight: 8}} />
              <Text style={{...fooiyFont.Caption1, color: fooiyColor.G600}}>
                지하철역
              </Text>
            </View>
          </View>
        </>
      );
    }
  }, [value, spot]);

  useEffect(() => {
    debounceCallback(value);
  }, [value]);

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
            placeholder="보고 싶은 위치를 검색해보세요"
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
              !focus && value === ''
                ? [styles.empty_value, {borderColor: fooiyColor.G200}]
                : focus && value === ''
                ? [styles.empty_value, {borderColor: fooiyColor.G400}]
                : focus && value !== ''
                ? [styles.is_value, {borderColor: fooiyColor.G400}]
                : [styles.is_value, {borderColor: fooiyColor.G200}]
            }
          />
          <Search_Icon style={{position: 'absolute', right: 16}} />
        </View>
        <MainUI />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LocationSearch;

const styles = StyleSheet.create({
  empty_container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    height: 48,
  },
  init_container: {
    padding: 16,
    backgroundColor: fooiyColor.P50,
    borderRadius: 8,
  },
  result_container: {
    flexDirection: 'row',
    height: 74,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: fooiyColor.G200,
  },
  result_type: {
    width: 36,
    height: 36,
    borderRadius: 36,
    backgroundColor: fooiyColor.G600,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  input_container: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  empty_value: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    height: 56,
    padding: 16,
    ...fooiyFont.Subtitle2,
    lineHeight: Platform.select({ios: 0, android: null}),
  },
  is_value: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    height: 56,
    padding: 16,
    ...fooiyFont.Body1,
    lineHeight: Platform.select({ios: 0, android: null}),
  },
});
