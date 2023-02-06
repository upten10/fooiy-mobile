import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {PartyIcon} from '../../../assets/icons/svg';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {DefaultHeader} from '../../common_ui/headers/DefaultHeader';
import {ApiManagerV2} from '../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../common/Enums';
import ShopListUI from '../../common_ui/shop/ShopListUI';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {globalVariable} from '../../common/globalVariable';
import {useNavigation} from '@react-navigation/native';

const Party = props => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [partyList, setPartyList] = useState([]);

  useEffect(() => {
    getPartyList();
  }, []);

  const getPartyList = async () => {
    await ApiManagerV2.get(apiUrl.MY_PARTY_LIST, {
      params: {},
    }).then(res => {
      setPartyList(res.data.payload.party_list);
    });
  };

  const onPressCreate = async () => {
    navigation.navigate('PartyCreate');
  };

  const listHeaderComponent = () => {
    return (
      <View style={styles.list_header_container}>
        {/* 왼쪽 */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{marginRight: 8}}>
            <PartyIcon />
          </View>
          <Text style={styles.list_header_title}>내 파티</Text>
        </View>
        {/* 오른쪽 */}
        <TouchableOpacity activeOpacity={0.8} onPress={onPressCreate}>
          <View style={styles.create_btn}>
            <Text style={styles.create_btn_text}>파티 생성</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const ListEmptyComponent = () => {
    return (
      <View
        style={{
          height:
            globalVariable.height -
            insets.top -
            56 -
            insets.bottom -
            globalVariable.tabBarHeight -
            56 -
            20,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            ...fooiyFont.Body1,
            color: fooiyColor.G600,
            textAlign: 'center',
          }}>
          아직 가입한 파티가 없어요.{'\n'}새로운 파티를 생성하거나 가입해보세요!
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: fooiyColor.W}}>
      <DefaultHeader />
      {/* Body */}
      <View
        style={{
          paddingHorizontal: 16 - 7.5,
          height:
            globalVariable.height -
            insets.top -
            56 -
            insets.bottom -
            globalVariable.tabBarHeight,
        }}>
        <FlatList
          data={partyList}
          ListHeaderComponent={listHeaderComponent}
          ListEmptyComponent={ListEmptyComponent}
          scrollEnabled={partyList.length === 0 ? false : true}
          // ListFooterComponent={listFooterComponent}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <ShopListUI {...item} />}
          // onEndReached={loadMoreItem}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          style={{height: '100%'}}
        />
      </View>
    </SafeAreaView>
  );
};

export default Party;

const styles = StyleSheet.create({
  list_header_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 7.5,
    marginTop: 16,
    marginBottom: 20,
  },
  list_header_title: {
    ...fooiyFont.H3,
    color: fooiyColor.G800,
  },
  create_btn: {
    backgroundColor: fooiyColor.P500,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  create_btn_text: {
    ...fooiyFont.Subtitle2,
    color: fooiyColor.W,
  },
});
