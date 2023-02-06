import React from 'react';

const Party = () => {
  return (
    <SafeAreaView>
      <DefaultHeader />
      {/* Body */}
      <View style={{paddingHorizontal: 16, paddingTop: 16}}>
        {/* 상단바 */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {/* 왼쪽 */}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{marginRight: 8}}>
              <PartyIcon />
            </View>
            <Text style={{...fooiyFont.H3, color: fooiyColor.G800}}>
              내 파티
            </Text>
          </View>
          {/* 오른쪽 */}
          <TouchableOpacity activeOpacity={0.8}>
            <View
              style={{
                backgroundColor: fooiyColor.P500,
                borderRadius: 24,
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}>
              <Text style={{...fooiyFont.Subtitle2, color: fooiyColor.W}}>
                파티 생성
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* 플랫리스트 */}
        <View>
          <FlatList
            ref={curList}
            data={shops}
            // ListEmptyComponent={listEmptyComponent}
            // ListHeaderComponent={ListHeaderComponent}
            // ListFooterComponent={listFooterComponent}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <ShopListUI {...item} />}
            onEndReached={loadMoreItem}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={true}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Party;
