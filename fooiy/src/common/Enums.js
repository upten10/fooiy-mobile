// // import 필요

export const apiUrl = {
  // 카카오 로그인
  KAKAO_LOGIN: 'accounts/kakao_login/',
  // 애플 로그인
  APPLE_LOGIN: 'accounts/apple_login/',
  // 계정 정보
  ACCOUNT_INFO: 'accounts/info/',
  // 프로필 변경
  PROFILE_EDIT: 'accounts/profile/',
  // 회원탈퇴
  WITHDRAW: 'accounts/withdrawal/',

  // 문의 등록
  SUGGESTION: 'archives/suggestion/',
  // 주소 필터 리스트
  STORAGE_ADRESS: 'archives/filter/address/',

  // 피드 리스트
  FEED_LIST: 'feeds/feed/',
  // 매장 피드 리스트
  SHOP_LIST: 'feeds/feed/shop/',
  // 피드 댓글
  FEED_COMMENT: 'feeds/feed/comment/',
  // 피드 좋아요 등록, 취소
  FEED_LIKE: 'feeds/feed/like/',
  // 피드 보관 등록, 취소 (PATCH) && 피드 보관 리스트 (GET)
  FEED_STORAGE: 'feeds/feed/storage/',
  // 피드 상세 보기
  RETRIEVE_FEED: 'feeds/feed/retrieve_feed/',
  // 마이페이지 피드 리스트
  MYPAGE_FEED_LIST: 'feeds/feed/mypage/',
  // 피드 지도 마커
  FEED_MAP_MARKER: 'feeds/feed/map_picker/',
  // 피드 지도 디테일
  FEED_MAP_DETAIL: 'feeds/feed/map_detail/',
  // 개척 등록
  REGISTER_PIONEER: 'feeds/pioneer/',
  // 기록 등록
  REGISTER_RECORD: 'feeds/record/',

  // 음식점 지도 리스트
  MAP_SHOP_LIST: 'shops/shop/shop_map_picker/',
  // 개척, 근처 매장 리스트
  SHOP_NEARBY: 'shops/shop/nearby/',
  // 개척, 메뉴 리스트
  SHOP_MENU: 'shops/menu/',
  // 음식점 검색
  SHOP_SEARCH: 'search/shops/',
  // 위치 검색
  SPOT_SEARCH: 'search/spot/',
  // 계정 검색
  ACCOUNT_SEARCH: 'search/account/',
  // 계정 랭커
  ACCOUNT_RANKER: 'accounts/ranking/',
  // 음식점 지도 마커
  MAP_SHOP_MARKER: 'shops/shop/shop_map_marker/',
  // 음식점 지도 마커 상세
  MAP_SHOP_MARKER_DETAIL: 'shops/shop/shop_map_marker_detail/',
};
