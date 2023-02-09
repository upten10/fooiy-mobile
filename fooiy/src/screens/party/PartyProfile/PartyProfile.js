import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {ApiManagerV2} from '../../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../../common/Enums';
import {fooiyColor, fooiyFont} from '../../../common/globalStyles';
import {globalVariable} from '../../../common/globalVariable';
import {StackHeader} from '../../../common_ui/headers/StackHeader';
import PartyProfileHeader from './PartyProfileHeader';

export default props => {
  const {party_id} = props.route.params;

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [partyInfo, setPartyInfo] = useState({});
  const [partyFeeds, setPartyFeeds] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getPartyInfo();
    getPartyFeeds();
  }, []);

  const getPartyInfo = async () => {
    await ApiManagerV2.get(apiUrl.PARTY_INFO, {
      params: {
        party_id,
      },
    }).then(res => {
      setPartyInfo(res.data.payload.party_info);
    });
  };

  const getPartyFeeds = async () => {
    await ApiManagerV2.get(apiUrl.PARTY_FEED_LIST, {
      params: {
        type: 'image',
        party_id: party_id,
      },
    }).then(res => setPartyFeeds(res.data.payload.feed_list.results));
  };

  const renderItem = ({item, index}) => {
    const onPressFeed = () => {
      navigation.navigate('PartyFeedDetail', {...item, ...partyInfo, party_id});
    };
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onPressFeed}>
        {item.is_confirm ? (
          <ImageBackground
            source={{uri: item.image[0]}}
            style={{flex: 1, resizeMode: 'cover', ...styles.feedImage}}>
            <Image
              source={require('../../../../assets/image/feed_confirm_simple.png')}
              style={{flex: 1, resizeMode: 'cover', ...styles.feedImage}}
            />
          </ImageBackground>
        ) : (
          <FastImage
            source={{
              uri: item.image[0],
            }}
            style={styles.feedImage}
          />
        )}
      </TouchableOpacity>
    );
  };

  const onPressSetting = () => {
    navigation.navigate('PartySetting', {
      party_id,
      ...partyInfo,
    });
  };

  const onRefresh = () => {
    if (!refreshing) {
      getRefreshData();
    }
  };

  const getRefreshData = async () => {
    setRefreshing(true);
    await getPartyInfo();
    await getPartyFeeds();
    setRefreshing(false);
  };

  const ListEmptyComponent = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <FastImage
          source={require('../../../../assets/image/empty_notice.png')}
          style={{width: 137, height: 56, marginBottom: 16, marginTop: 76}}
        />
        <Text
          style={{
            ...fooiyFont.Body1,
            color: fooiyColor.G600,
            textAlign: 'center',
          }}>
          아직 등록한 피드가 없어요.{'\n'}
          방문한 음식점을 등록해보세요!
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: fooiyColor.W}}>
      <StackHeader
        title={partyInfo.name}
        owner_id={partyInfo.owner_id}
        onPressSetting={onPressSetting}
      />
      {/* Body */}
      <View
        style={{
          width: '100%',
          height:
            globalVariable.height -
            insets.top -
            insets.bottom -
            globalVariable.tabBarHeight -
            56,
        }}>
        <FlatList
          data={partyFeeds}
          numColumns={3}
          onRefresh={onRefresh}
          refreshing={refreshing}
          renderItem={renderItem}
          removeClippedSubviews={true}
          keyExtractor={item => String(item.id)}
          ListHeaderComponent={
            <PartyProfileHeader partyInfo={{...partyInfo, party_id}} />
          }
          ListEmptyComponent={ListEmptyComponent}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  feedImage: {
    width: globalVariable.width * (1 / 3) - 4 / 3,
    height: globalVariable.width * (1 / 3) - 4 / 3,
    marginRight: 2,
    marginBottom: 2,
  },
});