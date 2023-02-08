import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import Margin from '../../common_ui/Margin';

import {categoryToKorean} from './categoryList';

const TabView = props => {
  const {categoryList, tabIndex, setCurrentTab, tabRef} = props;

  const CategoryTab = item => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setCurrentTab(item.index);
        }}>
        <View style={styles.tab_container}>
          <Text
            style={[
              styles.tab_text,
              tabIndex === item.index && {color: fooiyColor.B},
            ]}>
            {categoryToKorean[item.item]}
          </Text>
        </View>
        {tabIndex === item.index && <View style={styles.indicator} />}
      </TouchableOpacity>
    );
  };
  return (
    <View style={{backgroundColor: fooiyColor.W}}>
      <FlatList
        ref={tabRef}
        data={categoryList}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index}
        renderItem={item => <CategoryTab {...item} />}
        horizontal={true}
        ListHeaderComponent={<Margin w={8} />}
        ListFooterComponent={<Margin w={8} />}
        onScrollToIndexFailed={info => {
          const wait = new Promise(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            tabRef.current?.scrollToIndex({
              index: tabIndex,
              animated: true,
            });
          });
        }}
      />
    </View>
  );
};

export default TabView;

const styles = StyleSheet.create({
  tab_container: {
    padding: 8,
    paddingBottom: 16,
  },
  tab_text: {
    ...fooiyFont.H4,
    color: fooiyColor.G200,
  },
  indicator: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    height: 4,
    backgroundColor: fooiyColor.B,
    borderRadius: 4,
  },
});
