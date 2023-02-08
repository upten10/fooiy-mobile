import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {ArrowIconRight} from '../../../assets/icons/svg';
import {ApiManagerV2} from '../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../common/Enums';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';
import {useDebounce} from '../../common/hooks/useDebounce';
import {SearchBar} from '../../screens/party/PartyProfile/PartyMemberList';
import {StackHeader} from '../headers/StackHeader';

export default props => {
  const insets = useSafeAreaInsets();
  const {debounceCallback, isLoading} = useDebounce({time: 300});
  const navigation = useNavigation();

  const [value, setValue] = useState('');
  const [searchedPartyList, setSearchedPartyList] = useState([]);

  useEffect(() => {
    debounceCallback(() => {
      if (value.length > 0) {
        searchParty(value);
      }
    });
  }, [value]);

  const searchParty = async value => {
    await ApiManagerV2.get(apiUrl.SEARCH_PARTY, {
      params: {
        keyword: value,
      },
    }).then(res =>
      setSearchedPartyList(res.data.payload.accounts_list.results),
    );
  };

  const renderItem = ({item}) => {
    const {account_count, feed_count, image, name, owner, owner_id, party_id} =
      item;

    const onPressPartyTab = () => {
      navigation.navigate('PartyProfile', {party_id});
    };

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPressPartyTab}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {/* info */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            {image.length === 0 ? (
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 100,
                  marginRight: 8,
                  backgroundColor: fooiyColor.G100,
                }}
              />
            ) : (
              <FastImage
                source={{uri: image}}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 100,
                  marginRight: 8,
                }}
              />
            )}
          </View>
          <View>
            <Text
              style={{
                ...fooiyFont.Subtitle3,
                color: fooiyColor.G800,
                marginBottom: 4,
              }}>
              {name}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: fooiyColor.G400,
                  borderRadius: 4,
                  paddingHorizontal: 6,
                  marginRight: 4,
                }}>
                <Text style={{...fooiyFont.Subtitle4, color: fooiyColor.G400}}>
                  피드 {feed_count}
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: fooiyColor.G400,
                  borderRadius: 4,
                  paddingHorizontal: 6,
                }}>
                <Text style={{...fooiyFont.Subtitle4, color: fooiyColor.G400}}>
                  파티원 {account_count}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <ArrowIconRight />
      </TouchableOpacity>
    );
  };

  const ItemSeparatorComponent = () => {
    return <View style={{height: 16}}></View>;
  };

  const ListEmptyComponent = () => {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <Text
          style={{
            ...fooiyFont.Body1,
            color: fooiyColor.G600,
            textAlign: 'center',
          }}>
          검색 결과가 없어요.{'\n'}철자와 띄어쓰기를 확인해보세요!
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: fooiyColor.W}}>
      <StackHeader title={'파티 검색'} />
      <View
        style={{
          width: '100%',
          height: globalVariable.height - insets.top - insets.bottom - 56,
          paddingHorizontal: 16,
        }}>
        <SearchBar
          placeholder={'파티를 검색해보세요!'}
          value={value}
          setValue={setValue}
          autoFocus={true}
        />
        <FlatList
          data={searchedPartyList}
          renderItem={item => renderItem(item)}
          numColumns={1}
          keyExtractor={item => String(item.party_id)}
          ItemSeparatorComponent={ItemSeparatorComponent}
          ListEmptyComponent={ListEmptyComponent}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
