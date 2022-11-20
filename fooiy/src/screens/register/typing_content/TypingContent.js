import React, {useEffect, useState} from 'react';
import {FlatList, Image, View} from 'react-native';

const TypingContent = props => {
  const photo_list = props.route.params.photo_list;
  return (
    <View>
      {photo_list[0].image ? (
        <FlatList
          data={photo_list}
          keyExtractor={index => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <Image
                source={{uri: item.image.uri}}
                style={{width: 200, height: 200}}
              />
            );
          }}
        />
      ) : (
        <Image
          source={{uri: photo_list[0]}}
          style={{width: 200, height: 200}}
        />
      )}
    </View>
  );
};

export default TypingContent;
