import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Ic_cafe_24_G400, Ic_dining_24_G400} from '../../../assets/svg';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';

const SelectCategoryModal = props => {
  const {currentCategory, setCategory, setOpen, toTop} = props;
  const insets = useSafeAreaInsets();
  const changeCategory = category => {
    toTop();
    if (currentCategory !== category) {
      setCategory(category);
    }
    setOpen(false);
  };

  return (
    <View style={[styles.select_category_container, {top: 56 + insets.top}]}>
      <TouchableOpacity
        style={styles.each_category_container}
        onPress={() => changeCategory()}>
        <View style={styles.each_category_container}>
          <Text style={styles.each_category_text}>맛집</Text>
          <View style={styles.each_category_imogi}>
            <Ic_dining_24_G400 />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => changeCategory(globalVariable.category_cafe)}>
        <View style={[styles.each_category_container, {borderBottomWidth: 0}]}>
          <Text style={styles.each_category_text}>카페</Text>
          <View style={styles.each_category_imogi}>
            <Ic_cafe_24_G400 />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SelectCategoryModal;

const styles = StyleSheet.create({
  select_category_container: {
    width: 124,
    height: 112,
    backgroundColor: fooiyColor.W,
    position: 'absolute',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: fooiyColor.G200,
    left: 16,
    flex: 1,
  },
  each_category_container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 56,
    borderBottomColor: fooiyColor.G200,
  },
  each_category_text: {
    marginLeft: 16,
    ...fooiyFont.Subtitle2,
    color: fooiyColor.G600,
  },
  each_category_imogi: {
    marginRight: 16,
    width: 24,
    height: 24,
  },
});
