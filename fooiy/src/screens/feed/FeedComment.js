import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  Keyboard,
  Platform,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';
import {StackHeader} from '../../common_ui/headers/StackHeader';
import {apiUrl} from '../../common/Enums';
import {ApiManagerV2} from '../../common/api/v2/ApiManagerV2';
import FlatListFooter from '../../common_ui/footer/FlatListFooter';
import UI_Comment from '../../common_ui/feed/UI_Comment';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RegistComment, RegistCommentFocused} from '../../../assets/icons/svg';
import MoreVertModal from '../../common_ui/modal/MoreVertModal';
import ListEmptyTextComponent from '../../common_ui/empty_component/ListEmptyTextComponent';
import {useSelector} from 'react-redux';
import WorkingCommentModal from './WorkingCommentModal';

const FeedComment = props => {
  const flatListRef = useRef(null);
  const textInputRef = useRef(null);

  const {feed_id, feed_account_id} = props.route.params;
  const [comments, setComments] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const [value, setValue] = useState('');
  const [isFocused, setIsFocus] = useState(false);

  const [workingComment, setWorkingComment] = useState({});

  const [isWorking, setIsWorking] = useState(false);
  const [buttons, setButtons] = useState([
    {
      name: '신고',
      domain: '댓글',
      onClick: () => deleteComment(),
      isNext: true,
      textColor: fooiyColor.P700,
    },
  ]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const openModal = async (
    comment_id,
    account_id,
    profile_image,
    nickname,
    rank,
    fooiyti,
    content,
  ) => {
    if (isWorking) {
      setIsOpenModal(false);
    } else {
      setWorkingComment({
        account_id: account_id,
        comment_id: comment_id,
        profile_image: profile_image,
        nickname: nickname,
        rank: rank,
        fooiyti: fooiyti,
        content: content,
      });
      setIsOpenModal(true);
    }
  };
  const toggleModal = () => {
    setWorkingComment({});
    setIsOpenModal(false);
  };
  const openWorkingModal = () => {
    setIsWorking(true);
  };
  const dismissKeyboard = () => {
    setIsWorking(false);
    setWorkingComment({});
    textInputRef.current.blur();
  };
  const onClickPatchComment = async () => {
    // setIsOpenModal(false);
    setIsWorking(true);
    textInputRef.current.foucs();
  };

  const userInfoRedux = useSelector(state => state.userInfo.value);
  useEffect(() => {
    if (workingComment.account_id === userInfoRedux.public_id) {
      setButtons([
        {
          name: '수정',
          domain: '댓글',
          onClick: () => onClickPatchComment(),
          isNext: false,
          textColor: fooiyColor.G800,
        },
        {
          name: '삭제',
          domain: '댓글',
          onClick: () => deleteComment(),
          isNext: true,
          textColor: fooiyColor.P700,
        },
      ]);
    } else if (userInfoRedux.public_id === feed_account_id) {
      setButtons([
        {
          name: '삭제',
          domain: '댓글',
          onClick: () => deleteComment(),
          isNext: true,
          textColor: fooiyColor.P700,
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workingComment, feed_account_id]);

  const insets = useSafeAreaInsets();
  const getCommentList = async () => {
    await ApiManagerV2.get(apiUrl.FEED_COMMENT, {
      params: {
        limit: globalVariable.FeedLimit,
        offset: offset,
        feed_id: feed_id,
      },
    }).then(res => {
      if (res.data.payload.comment_list) {
        setComments([...comments, ...res.data.payload.comment_list.results]);
        totalCount === 0 &&
          setTotalCount(res.data.payload.comment_list.total_count);
      }
    });
    // .catch(function (error) => console.log(error));
  };

  const onBlur = () => {
    setIsFocus(false);
    setIsWorking(false);
    setWorkingComment({});
  };

  useEffect(() => {
    onBlur();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toIndex = index => {
    openWorkingModal(true);
    textInputRef.current.focus();
    flatListRef.current.scrollToIndex({index: index, animated: true});
  };

  const loadMoreItem = () => {
    if (totalCount > offset + globalVariable.FeedLimit) {
      setOffset(offset + globalVariable.FeedLimit);
    }
  };

  const registerComment = async () => {
    console.log(feed_id, workingComment.comment_id, value);
    value.length !== 0 &&
      (await ApiManagerV2.post(apiUrl.FEED_COMMENT, {
        feed_id: feed_id,
        comment_id: workingComment.comment_id,
        content: value,
      })
        .then(res => {
          console.log(res);
          textInputRef.current.clear();
          setValue('');
          res.data.payload === 'success' ? updateComments() : dismissKeyboard();
        })
        .catch(e => dismissKeyboard()));
  };

  const patchComment = async () => {
    await ApiManagerV2.patch(apiUrl.FEED_COMMENT, {
      feed_id: feed_id,
      comment_id: workingComment.comment_id,
      content: value, // 바꿔야함
    }).then(res => {
      toggleModal();
      res.data.payload === 'success' && updateComments();
    });
  };

  const deleteComment = async () => {
    await ApiManagerV2.delete(
      apiUrl.FEED_COMMENT + `${workingComment.comment_id}/`,
      {
        feed_id: feed_id,
      },
    ).then(res => {
      toggleModal();
      res.data.payload === 'success' && updateComments();
    });
  };

  const updateComments = async () => {
    const findIndex = comments.findIndex(
      e => e.comment_id === workingComment.comment_id,
    );
    const updateIndex =
      findIndex !== -1
        ? findIndex
        : comments.length !== 0
        ? comments.length
        : -1;
    if (updateIndex === -1) {
      getCommentList(false);
    } else {
      setComments(
        comments.splice(0, updateIndex === 0 ? comments.length : updateIndex),
      );
      if (updateIndex === 0) {
        await ApiManagerV2.get(apiUrl.FEED_COMMENT, {
          params: {
            limit: globalVariable.FeedLimit,
            offset: 0,
            feed_id: feed_id,
          },
        }).then(res => {
          if (res.data.payload.comment_list) {
            dismissKeyboard();
            setOffset(0);
            setComments(res.data.payload.comment_list.results);
            setTotalCount(res.data.payload.comment_list.total_count);
          }
        });
      } else {
        setOffset(updateIndex);
      }
    }
  };

  useEffect(() => {
    getCommentList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <StackHeader title={'댓글'} />
      </View>

      <View
        style={{
          height: globalVariable.height - insets.top - insets.bottom - 56 - 68,
          backgroundColor: fooiyColor.W,
        }}>
        <FlatList
          onScrollBeginDrag={dismissKeyboard}
          ref={flatListRef}
          data={comments}
          renderItem={({item, index}) => (
            <UI_Comment
              {...item}
              index={index}
              toIndex={toIndex}
              setWorkingComment={setWorkingComment}
              openModal={openModal}
              isFocused={isFocused}
            />
          )}
          removeClippedSubviews={true}
          ListFooterComponent={FlatListFooter}
          ListEmptyComponent={ListEmptyTextComponent(
            '아직 댓글이 없어요.\n가장 먼저 댓글을 남겨보세요.',
          )}
          keyExtractor={item => String(item.comment_id)}
          onEndReached={loadMoreItem}
          onEndReachedThreshold={2}
        />
      </View>

      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.select({
          ios: 0,
          android: 0,
        })}
        behavior={Platform.select({
          ios: 'position',
          android: 'position',
        })}>
        <View
          style={[
            styles.textInputContainerBlur,
            isFocused ? styles.textInputContainerFocus : null,
          ]}>
          <TextInput
            ref={textInputRef}
            placeholder="댓글을 입력해주세요"
            placeholderTextColor={fooiyColor.G400}
            style={[
              {...fooiyFont.Body2},
              isFocused ? styles.textInputFocus : styles.textInputBlur,
            ]}
            multiline
            numberOfLines={3}
            textAlignVertical="center"
            autoCapitalize={false}
            autoCorrect={false}
            spellCheck={false}
            onFocus={() => setIsFocus(true)}
            onBlur={onBlur}
            onChangeText={setValue}
            value={value}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => registerComment()}>
            {value.length === 0 ? (
              <RegistComment style={styles.register_comment} />
            ) : (
              <RegistCommentFocused style={styles.register_comment} />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {isWorking && <WorkingCommentModal workingComment={workingComment} />}
      <MoreVertModal
        buttons={buttons}
        isModalVisible={isOpenModal}
        toggleModal={toggleModal}
      />
    </SafeAreaView>
  );
};

export default FeedComment;

const styles = StyleSheet.create({
  container: {
    backgroundColor: fooiyColor.W,
    flex: 1,
    zIndex: 100,
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
    color: '#FF5C5C',
  },
  feed_time: {
    position: 'absolute',
    right: 0,
    color: '#B3BBD3',
  },

  textInputContainerBlur: {
    backgroundColor: fooiyColor.W,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 68,
    padding: 16,
    marginBottom: Platform.OS === 'android' ? 16 : 0,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderColor: fooiyColor.G200,
  },
  textInputContainerFocus: {
    borderColor: fooiyColor.G400,
  },
  textInputBlur: {
    ...fooiyFont.Body2,
    padding: 0,
    margin: 0,
    color: fooiyColor.G400,
  },
  textInputFocus: {
    ...fooiyFont.Body2,
    padding: 0,
    margin: 0,
    color: fooiyColor.G800,
  },

  button_container: {
    marginHorizontal: 16,
    marginTop: 16,
    height: 56,
    backgroundColor: fooiyColor.W,
    justifyContent: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: fooiyColor.G200,
  },
});
