import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {EmptyMenuClinic, PartyIcon} from '../../../assets/icons/svg';
import {ApiManagerV2} from '../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../common/Enums';
import FooiyToast from '../../common/FooiyToast';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';
import {DefaultHeader} from '../../common_ui/headers/DefaultHeader';
import ShopListUI from '../../common_ui/shop/ShopListUI';
import ListEmptyTextComponent from '../../common_ui/empty_component/ListEmptyTextComponent';

const Party = props => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [partyList, setPartyList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getPartyList();
  }, [props.route.params]);

  const getPartyList = async () => {
    await ApiManagerV2.get(apiUrl.MY_PARTY_LIST, {
      params: {},
    })
      .then(res => {
        setPartyList(res.data.payload.party_list);
      })
      .catch(e => FooiyToast.error());
  };

  const onPressCreate = () => {
    navigation.navigate('PartyCreateName');
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

  const ListEmptyComponent = useCallback(() => {
    const EmptyText = () => {
      return ListEmptyTextComponent(
        '아직 가입한 파티가 없어요.\n새로운 파티를 생성하거나 가입해보세요!',
      );
    };
    return (
      <View
        style={{
          flex: 1,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 190 - 16,
        }}>
        <EmptyMenuClinic />
        <EmptyText />
      </View>
    );
  }, []);

  const onRefresh = () => {
    if (!refreshing) {
      getRefreshData();
    }
  };

  const getRefreshData = async () => {
    setRefreshing(true);
    await getPartyList();
    setRefreshing(false);
  };

  const ListFooterComponent = () => {
    return (
      <View
        style={{
          height: globalVariable.tabBarHeight,
        }}
      />
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: fooiyColor.W, flex: 1}}>
      <DefaultHeader isParty={true} />
      {/* Body */}
      <View
        style={{
          paddingHorizontal: 16 - 7.5,
          flex: 1,
        }}>
        <FlatList
          data={partyList}
          ListHeaderComponent={listHeaderComponent}
          ListEmptyComponent={ListEmptyComponent}
          ListFooterComponent={ListFooterComponent}
          onRefresh={onRefresh}
          refreshing={refreshing}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <ShopListUI {...item} />}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          initialNumToRender={4}
          maxToRenderPerBatch={4}
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
