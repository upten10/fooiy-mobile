import React, {useState, useEffect, useRef, memo} from 'react';
import {View, Animated} from 'react-native';
import {feedsAction} from '../../redux/actions/feedsAction';
import {useDispatch, useSelector} from 'react-redux';
import {ApiManagerV2} from '../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../common/Enums';
import KakaoShareLink from 'react-native-kakao-share-link';
import FeedProfile from './FeedProfile';
import FeedImage from './FeedImage';
import FeedUsefulContent from './FeedUsefulContent';
import FeedShopInfo from './FeedShopInfo';
import FeedComment from './FeedComment';
import TasteEvaluationModal from './TasteEvaluationModal';

import {useDebounce} from '../../common/hooks/useDebounce';

const UI_Feed = item => {
  // feed redux
  const [isModalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const [disableShopButton, setDisableShopButton] = useState(false);
  const [likeIcon, setLikeIcon] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [storeIcon, setStoreIcon] = useState(false);

  const {debounceCallback, isLoading} = useDebounce({time: 1500});

  const debounceLike = async (liked, count) => {
    if (feed.is_liked === (await liked)) {
      feed.is_liked = !(await liked);
      feed.count_liked = await count;
      dispatch(feedsAction.setChanged(feeds));
      await ApiManagerV2.patch(apiUrl.FEED_LIKE, {
        feed_id: item.id,
      });
    }
  };

  const debounceStore = async stored => {
    if (feed.is_store === (await stored)) {
      feed.is_store = !(await stored);
      dispatch(feedsAction.setChanged(feeds));
      // axios fetch
      await ApiManagerV2.patch(apiUrl.FEED_STORAGE, {
        feed_id: item.id,
      });
    }
  };

  const feed_redux = {
    id: item.id,
    count_liked: item.count_liked,
    is_liked: item.is_liked,
    is_store: item.is_store,
  };

  useEffect(() => {}, []);

  dispatch(feedsAction.append(feed_redux));

  const feeds = useSelector(state => state.feeds.feeds.value);
  const feed = feeds.find(e => e.id === item.id);

  useEffect(() => {
    setLikeIcon(feed.is_liked);
    setLikeCount(
      feed.is_liked === item.is_liked
        ? item.count_liked
        : feed.is_liked
        ? item.count_liked + 1
        : item.count_liked - 1,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feed.is_liked]);

  useEffect(() => {
    setStoreIcon(feed.is_store);
  }, [feed.is_store]);

  useEffect(() => {
    item.disable_shop_button && setDisableShopButton(item.disable_shop_button);
  }, [item.disable_shop_button]);

  const onClickLikeIcon = () => {
    likeIcon ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1);
    setLikeIcon(!likeIcon);
    debounceCallback(() => {
      debounceLike(likeIcon, likeCount);
    });
  };
  const onClickStoreIcon = () => {
    setStoreIcon(!storeIcon);
    debounceCallback(() => {
      debounceStore(storeIcon);
    });
  };

  const onClickShareIcon = async () => {
    try {
      const response = await KakaoShareLink.sendLocation({
        address: item.shop_address,
        addressTitle: item.shop_name,
        content: {
          title: item.shop_name,
          imageUrl: item.image[0],
          link: {
            androidExecutionParams: [{key: 'feed_id', value: item.id}],
            iosExecutionParams: [{key: 'feed_id', value: item.id}],
          },
          description: item.menu_name + ' ' + item.menu_price,
        },
      });
      console.log(response);
    } catch (e) {
      console.error(e);
      console.error(e.message);
    }
  };

  const animationProgress = useRef(new Animated.Value(0));

  return (
    <View>
      <TasteEvaluationModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
      {/* 프로필 사진 */}
      <FeedProfile
        account_id={item.account_id}
        nickname={item.nickname}
        profile_image={item.profile_image}
        fooiyti={item.fooiyti}
        rank={item.rank}
      />

      <FeedImage
        images={item.image}
        is_confirm={item.is_confirm}
        animationProgress={animationProgress}
        onClickLikeIcon={onClickLikeIcon}
        likeIcon={likeIcon}
      />

      {/* 유용한 기능 포크, 댓글 등등 */}
      <FeedUsefulContent
        onClickLikeIcon={onClickLikeIcon}
        likeIcon={likeIcon}
        likeCount={likeCount}
        onClickShareIcon={onClickShareIcon}
        onClickStoreIcon={onClickStoreIcon}
        storeIcon={storeIcon}
      />

      <FeedShopInfo
        shop_id={item.shop_id}
        shop_name={item.shop_name}
        shop_address={item.shop_address}
        longitude={item.longitude}
        latitude={item.latitude}
        taste_evaluation={item.taste_evaluation}
        menu_name={item.menu_name}
        menu_price={item.menu_price}
        disableShopButton={disableShopButton}
        setModalVisible={setModalVisible}
      />

      <FeedComment comment={item.comment} created_at={item.created_at} />
    </View>
  );
};

export default memo(UI_Feed);
