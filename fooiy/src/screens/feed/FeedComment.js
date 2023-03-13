import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {Ic_close_W, Ic_send_G400, Ic_send_P500} from '../../../assets/svg';
import {ApiManagerV2} from '../../common/api/v2/ApiManagerV2';
import {apiUrl, toastMessage} from '../../common/Enums';
import FooiyToast from '../../common/FooiyToast';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';
import ListEmptyTextComponent from '../../common_ui/empty_component/ListEmptyTextComponent';
import UI_Comment from '../../common_ui/feed/UI_Comment';
import {StackHeader} from '../../common_ui/headers/StackHeader';
import ApiLoading from '../../common_ui/loading/ApiLoading';
import MoreVertModal from '../../common_ui/modal/MoreVertModal';
import checkFeedAuthorization from './functions/checkFeedAuthorization';
import WorkingCommentModal from './WorkingCommentModal';

const FeedComment = props => {
  const textInputRef = useRef(null);
  const insets = useSafeAreaInsets();

  const {feed_id, feed_account_id} = props.route.params;
  const [comments, setComments] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const [value, setValue] = useState('');
  const [isFocused, setIsFocus] = useState(false);

  const [workingComment, setWorkingComment] = useState({});

  const [isWorking, setIsWorking] = useState(false);
  const [workingState, setWorkingState] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [textlineHeight, setTextlineHeight] = useState(24);
  const [textInputHeight, setTextInputHeight] = useState(68);
  const [buttons, setButtons] = useState([{}]);
  const [firstLoading, setFirstLoading] = useState(false);

  const [mountTime, setMountTime] = useState(false);

  //****** modal & textinput function ******//
  const openModal = (
    comment_id,
    account_id,
    profile_image,
    nickname,
    rank,
    fooiyti,
    content,
  ) => {
    if (isWorking) {
      setIsWorking(false);
      setWorkingState('');
      setWorkingComment({});
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
  const clearIsWorking = () => {
    setWorkingComment({});
    setWorkingState('');
    setIsWorking(false);
  };
  const toggleModal = () => {
    setIsOpenModal(false);
  };
  const openWorkingModal = () => {
    setIsOpenModal(false);
    setIsWorking(true);
    setIsFocus(true);
    setWorkingState('update');
  };
  const dismissKeyboard = () => {
    setIsOpenModal(false);
    setIsFocus(false);
  };

  const onBlur = () => {
    setIsFocus(false);
    setIsOpenModal(false);
  };

  const toIndex = index => {
    setWorkingState('');
    setIsWorking(true);
    setIsFocus(true);
    // flatListRef.current.scrollToIndex({index: index, animated: true});
  };
  //****** modal & textinput function ******//

  //****** api function ******//
  const getCommentList = async (offset, comments) => {
    await ApiManagerV2.get(apiUrl.FEED_COMMENT, {
      params: {
        limit: globalVariable.FeedLimit,
        offset: offset,
        feed_id: feed_id,
      },
    })
      .then(res => {
        if (res.data.payload.comment_list) {
          setComments([...comments, ...res.data.payload.comment_list.results]);
          setTotalCount(res.data.payload.comment_list.total_count);
          setTimeout(function () {
            setFirstLoading(true);
          }, 1500);
        }
      })
      .catch(e => FooiyToast.error());
  };
  const loadMoreItem = () => {
    if (totalCount > offset + globalVariable.FeedLimit) {
      setOffset(offset + globalVariable.FeedLimit);
      getCommentList(offset + globalVariable.FeedLimit, comments);
    }
  };

  const registerComment = async () => {
    setMountTime(true);
    value.length !== 0 &&
      (await ApiManagerV2.post(apiUrl.FEED_COMMENT, {
        feed_id: feed_id,
        comment_id: workingComment.comment_id,
        content: value,
      })
        .then(res => {
          textInputRef.current.clear();
          setValue('');
          res.data.payload === 'success' && updateComments();
          res.data.payload === 'success' &&
            FooiyToast.message(toastMessage.FEED_COMMENT_REGISTER, true);
          dismissKeyboard();
        })
        .catch(e => {
          dismissKeyboard();
          FooiyToast.error();
        }));
    setTimeout(() => {
      setMountTime(false);
    }, 2000);
  };

  const patchComment = async () => {
    setMountTime(true);
    await ApiManagerV2.patch(apiUrl.FEED_COMMENT, {
      feed_id: feed_id,
      comment_id: workingComment.comment_id,
      content: value,
    })
      .then(res => {
        textInputRef.current.clear();
        setWorkingState('');
        res.data.payload === 'success' && updateComments();
        res.data.payload === 'success' &&
          FooiyToast.message(toastMessage.FEED_COMMENT_UPDATE, true);
        dismissKeyboard();
      })
      .catch(e => {
        dismissKeyboard();
        FooiyToast.error();
      });
    setTimeout(() => {
      setMountTime(false);
    }, 2000);
  };

  const deleteComment = async () => {
    await ApiManagerV2.delete(
      apiUrl.FEED_COMMENT + `${workingComment.comment_id}/`,
      {
        parmas: {feed_id},
      },
    )
      .then(res => {
        toggleModal();
        res.data.payload === 'success' && updateComments();
        res.data.payload === 'success' &&
          FooiyToast.message(toastMessage.FEED_COMMENT_DELETE, true);
        dismissKeyboard();
      })
      .catch(e => {
        dismissKeyboard();
        FooiyToast.error();
      });
  };
  const reportComment = async () => {
    await ApiManagerV2.get(apiUrl.FEED_COMMENT_REPORT, {
      params: {
        comment_id: workingComment.comment_id,
      },
    })
      .then(res => {
        toggleModal();
        res.data.payload === 'success' &&
          FooiyToast.message(toastMessage.FEED_COMMENT_REPORT);
      })
      .catch(e => {
        FooiyToast.error();
      });
  };

  const updateComments = async () => {
    clearIsWorking();
    setWorkingComment({});
    setValue('');
    setTextlineHeight(24);
    setTextInputHeight(68);
    getCommentList(0, []);
    setOffset(0);
    setTotalCount(0);
  };
  //****** api function ******//

  const textInputLayout = useCallback(
    e => {
      if (e.nativeEvent.contentSize.height === 24) {
        setTextlineHeight(24);
        setTextInputHeight(68);
      } else if (e.nativeEvent.contentSize.height === 48) {
        setTextlineHeight(48);
        setTextInputHeight(80);
      } else if (e.nativeEvent.contentSize.height === 72) {
        setTextlineHeight(72);
        setTextInputHeight(104);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value],
  );

  Keyboard.addListener('keyboardDidShow', () => {});

  const userInfoRedux = useSelector(state => state.userInfo.value);
  useEffect(() => {
    checkFeedAuthorization(
      setButtons,
      '댓글',
      feed_account_id,
      userInfoRedux,
      workingComment,
      openWorkingModal,
      deleteComment,
      reportComment,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workingComment, feed_account_id]);
  useEffect(() => {
    isFocused ? textInputRef.current.focus() : textInputRef.current.blur();
  }, [isFocused]);
  useEffect(() => {
    getCommentList(offset, comments);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ListEmptyComponent = useCallback(() => {
    if (firstLoading === false) {
      return <ApiLoading />;
    }
    return ListEmptyTextComponent(
      '아직 댓글이 없어요.\n가장 먼저 댓글을 남겨보세요.',
    );
  }, [firstLoading]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <StackHeader title={'댓글'} />
      </View>

      <View
        style={{
          height: Platform.select({
            ios: globalVariable.height - insets.bottom - insets.top - 56,
            android: globalVariable.height - 56,
          }),
          backgroundColor: fooiyColor.W,
        }}>
        <KeyboardAwareFlatList
          onScrollBeginDrag={dismissKeyboard}
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
          ListFooterComponent={<View style={styles.flat_footer} />}
          ListEmptyComponent={ListEmptyComponent}
          keyExtractor={item => String(item.comment_id)}
          onEndReached={loadMoreItem}
          onEndReachedThreshold={0}
        />
      </View>

      {Platform.OS === 'ios' && isWorking ? (
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.select({
            ios: 0,
            android: null,
          })}
          behavior={Platform.select({
            ios: 'position',
            android: null,
          })}
          enabled>
          <View
            style={[
              {
                bottom: textInputHeight + 8,
              },
              styles.working_indicator_container,
            ]}>
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              {workingState === 'update' ? (
                <Text style={styles.working_indicator_text}>
                  해당 댓글 수정 중
                </Text>
              ) : (
                <Text style={styles.working_indicator_text}>
                  {workingComment.nickname} 답글 남기는 중
                </Text>
              )}
              <TouchableOpacity
                activeOpacity={0.8}
                hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
                onPress={() => clearIsWorking()}>
                <View style={{paddingRight: 16}}>
                  <Ic_close_W />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      ) : Platform.OS === 'android' && isWorking ? (
        <View
          style={[
            {
              bottom: textInputHeight + 8,
            },
            styles.working_indicator_container,
          ]}>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            {workingState === 'update' ? (
              <Text style={styles.working_indicator_text}>
                해당 댓글 수정 중
              </Text>
            ) : (
              <Text style={styles.working_indicator_text}>
                {workingComment.nickname} 답글 남기는 중
              </Text>
            )}
            <TouchableOpacity
              activeOpacity={0.8}
              hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
              onPress={() => clearIsWorking()}>
              <View style={{paddingRight: 16}}>
                <Ic_close_W />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      {Platform.OS === 'ios' ? (
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.select({
            ios: 0,
            android: null,
          })}
          behavior={Platform.select({
            ios: 'position',
            android: null,
          })}>
          <View
            style={[
              styles.textInputContainerBlur,
              isFocused ? styles.textInputContainerFocus : null,
              {
                height: textInputHeight,
                // marginBottom: isFocused ? 0 : -16,
              },
            ]}>
            <TextInput
              ref={textInputRef}
              onContentSizeChange={textInputLayout}
              placeholder="댓글을 입력해주세요"
              defaultValue={''}
              autoFocus={Platform.OS === 'android' && true}
              placeholderTextColor={fooiyColor.G400}
              style={[
                {
                  ...fooiyFont.Body2,
                  width: globalVariable.width - 84,
                  height: textlineHeight,
                },
                isFocused ? styles.textInputFocus : styles.textInputBlur,
              ]}
              multiline
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
              onPress={() =>
                workingState === 'update'
                  ? !mountTime && patchComment()
                  : !mountTime && registerComment()
              }>
              {value.length === 0 ? (
                <Ic_send_G400 style={styles.register_comment} />
              ) : (
                <Ic_send_P500 style={styles.register_comment} />
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      ) : (
        <View
          style={[
            styles.textInputContainerBlur,
            isFocused ? styles.textInputContainerFocus : null,
            {
              height: textInputHeight,
              // marginBottom: isFocused ? 0 : -16,
            },
          ]}>
          <TextInput
            ref={textInputRef}
            onContentSizeChange={textInputLayout}
            placeholder="댓글을 입력해주세요"
            defaultValue={''}
            autoFocus={Platform.OS === 'android' && true}
            placeholderTextColor={fooiyColor.G400}
            style={[
              {
                ...fooiyFont.Body2,
                width: globalVariable.width - 84,
                height: textlineHeight,
              },
              isFocused ? styles.textInputFocus : styles.textInputBlur,
            ]}
            multiline
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
            onPress={() =>
              workingState === 'update'
                ? !mountTime && patchComment()
                : !mountTime && registerComment()
            }>
            {value.length === 0 ? (
              <Ic_send_G400 style={styles.register_comment} />
            ) : (
              <Ic_send_P500 style={styles.register_comment} />
            )}
          </TouchableOpacity>
        </View>
      )}

      {isWorking && <WorkingCommentModal workingComment={workingComment} />}
      {!isWorking && (
        <MoreVertModal
          buttons={buttons}
          isModalVisible={isOpenModal}
          toggleModal={toggleModal}
          isWorking={isWorking}
        />
      )}
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
    position: 'absolute',
    backgroundColor: fooiyColor.W,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    bottom: 0,
    height: 68,
    padding: 16,
    // marginBottom: Platform.OS === 'android' ? 16 : 0,
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

  working_indicator_container: {
    position: 'absolute',
    height: 44,
    justifyContent: 'center',
    width: globalVariable.width - 32,
    borderRadius: 8,
    marginHorizontal: 16,
    backgroundColor: fooiyColor.G800,
  },
  working_indicator_text: {
    ...fooiyFont.Body2,
    color: fooiyColor.W,
    paddingLeft: 16,
    textAlign: 'center',
  },
  flat_footer: {
    height: Platform.select({
      ios: globalVariable.tabBarHeight + 16,
      android: globalVariable.tabBarHeight + 40,
    }),
  },
});
