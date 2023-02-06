import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import Rank from '../../common_ui/Rank';
// import {fooiyColor, fooiyFont} from '../../common/globalStyles';
// import Margin from '../Margin';

const WorkingCommentModal = props => {
  const {workingComment} = props;

  return (
    <SafeAreaView style={[styles.modal_container]}>
      <View style={styles.container}>
        <View style={styles.info_container}>
          <FastImage
            source={{
              uri: workingComment.profile_image,
            }}
            style={styles.profile_image}
          />
          <View>
            <Text style={styles.nickname}>{workingComment.nickname}</Text>
            <View style={styles.profile_detail_container}>
              <Rank
                containerStyle={{marginLeft: 8}}
                rank={workingComment.rank}
                font={fooiyFont.Subtitle4}
              />
              <Text style={styles.fooiyti}>{workingComment.fooiyti}</Text>
            </View>
          </View>
        </View>
        <View style={styles.content_container}>
          <Text style={{...fooiyFont.Body2}}>{workingComment.content}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WorkingCommentModal;

const styles = StyleSheet.create({
  modal_container: {
    position: 'absolute',
    marginTop: 56,
    width: '100%',
    paddingHorizontal: 16,
  },
  container: {
    borderRadius: 8,
    width: '100%',
    padding: 16,
    shadowColor: '#000000',
    backgroundColor: fooiyColor.W,
    shadowOpacity: 0.16,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 8,
    elevation: 20,
  },
  info_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profile_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profile_image: {
    borderRadius: 100,
    width: 40,
    height: 40,
  },
  nickname: {
    marginLeft: 8,
    marginBottom: 2,
    ...fooiyFont.Subtitle3,
    color: fooiyColor.G800,
  },
  profile_detail_container: {
    flexDirection: 'row',
  },
  fooiyti: {
    paddingHorizontal: 6,
    textAlign: 'center',
    ...fooiyFont.Subtitle4,
    marginLeft: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: fooiyColor.G200,
    color: fooiyColor.G600,
  },
  rank_container: {
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rank: {
    paddingHorizontal: 6,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: fooiyColor.W,
  },
  content_container: {
    marginLeft: 48,
    marginTop: 8,
  },
});
