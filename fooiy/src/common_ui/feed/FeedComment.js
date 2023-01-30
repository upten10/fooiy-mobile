import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';

const FeedComment = props => {
  const {comment, created_at} = props;
  const [line, setLine] = useState(3);
  const [moreTextActive, setMoreTextActive] = useState(false);
  const isOverLines = lines => {
    if (lines > 2 && line === 3) {
      setMoreTextActive(true);
    }
  };

  const elapsedTime = date => {
    const start = new Date(date);
    const end = new Date();
    const diff = (end - start) / 1000;
    const times = [
      {name: '년', milliSeconds: 60 * 60 * 24 * 365},
      {name: '개월', milliSeconds: 60 * 60 * 24 * 30},
      {name: '일', milliSeconds: 60 * 60 * 24},
      {name: '시간', milliSeconds: 60 * 60},
      {name: '분', milliSeconds: 60},
    ];

    for (const value of times) {
      const betweenTime = Math.floor(diff / value.milliSeconds);
      if (betweenTime > 0) {
        return `${betweenTime}${value.name} 전`;
      }
    }
    return '방금 전';
  };
  return (
    <View style={styles.container}>
      {comment && (
        <Text
          numberOfLines={line}
          style={styles.comment}
          onTextLayout={({nativeEvent: {lines}}) => {
            isOverLines(lines.length);
          }}>
          {comment}
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

export default FeedComment;

const styles = StyleSheet.create({
  container: {
    width: globalVariable.width - 32,
    marginHorizontal: 16,
  },
  comment: {
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
    color: '#FF5C5C',
  },
  feed_time: {
    position: 'absolute',
    right: 0,
    color: '#B3BBD3',
  },
});
