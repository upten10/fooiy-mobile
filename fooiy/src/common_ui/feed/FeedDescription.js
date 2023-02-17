import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';
import elapsedTime from '../../common/helpers/elapsedTime';

const FeedDescription = props => {
  const {description, created_at} = props;
  const [line, setLine] = useState(3);
  const [moreTextActive, setMoreTextActive] = useState(false);
  const isOverLines = lines => {
    if (lines > 2 && line === 3) {
      setMoreTextActive(true);
    }
  };

  return (
    <View style={styles.container}>
      {description && (
        <Text
          numberOfLines={line}
          style={styles.description}
          onTextLayout={({nativeEvent: {lines}}) => {
            isOverLines(lines.length);
          }}>
          {description}
        </Text>
      )}

      <View style={styles.footer}>
        {moreTextActive ? (
          <Text
            style={styles.more_text}
            onPress={() => {
              setLine(100);
              setMoreTextActive(false);
            }}>
            더보기
          </Text>
        ) : null}
        <Text style={styles.feed_time}>{elapsedTime(created_at)}</Text>
      </View>
    </View>
  );
};

export default FeedDescription;

const styles = StyleSheet.create({
  container: {
    width: globalVariable.width - 32,
    marginHorizontal: 16,
  },
  description: {
    marginTop: 16,
    ...fooiyFont.Body2,
    color: fooiyColor.G800,
  },

  footer: {
    marginTop: 8,
    flexDirection: 'row',
    marginBottom: 24,
  },
  more_text: {
    color: fooiyColor.G400,
  },
  feed_time: {
    position: 'absolute',
    right: 0,
    color: fooiyColor.G400,
  },
});
