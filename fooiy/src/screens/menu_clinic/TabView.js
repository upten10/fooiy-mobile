import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import Margin from '../../common_ui/Margin';

import {categoryToKorean} from './categoryList';

const TabView = props => {
  const {categoryList, tabIndex, setTabIndex, toTop} = props;

  const CategoryTab = item => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setTabIndex(item.index);
          toTop();
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
      </TouchableOpacity>
    );
  };
  return (
    <View style={{backgroundColor: fooiyColor.W}}>
      <FlatList
        data={categoryList}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index}
        renderItem={item => <CategoryTab {...item} />}
        horizontal={true}
        ListFooterComponent={<Margin w={16} />}
      />
    </View>
  );
};

export default TabView;

const styles = StyleSheet.create({
  tab_container: {
    padding: 16,
    paddingTop: 8,
    paddingRight: 0,
  },
  tab_text: {
    ...fooiyFont.H4,
    color: fooiyColor.G200,
  },
});
