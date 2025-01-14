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
  // 피드 신고
  FEED_REPORT: 'feeds/feed/report/',
  // 매장 피드 리스트
  SHOP_LIST: 'feeds/feed/shop/',
  // 피드 댓글
  FEED_COMMENT: 'feeds/feed/comment/',
  // 피드 댓글 신고
  FEED_COMMENT_REPORT: 'feeds/feed/comment/report/',
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
  // 기록 삭제
  DELETE_FEED: 'feeds/record/',
  // 기록 등록
  UPDATE_FEED: 'feeds/feed/modify/',

  // 메뉴 상담소
  MENU_CLINIC: 'shops/menu_clinic/latest_order/',
  // 메뉴 상담소 매장 찾기
  MENU_NEAR_CLINIC: 'shops/menu_clinic/distance_order/',

  // 음식점 지도 리스트
  MAP_SHOP_LIST: 'shops/shop/shop_map_list/',
  // 개척, 근처 매장 리스트
  SHOP_NEARBY: 'shops/shop/nearby/',
  // 개척, 메뉴 리스트
  SHOP_MENU: 'shops/menu/',
  // 매장 정보
  SHOP_INFO: 'shops/shop/info/',
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

  // 가입한 파티 리스트
  MY_PARTY_LIST: 'party/accounts/',

  // 메뉴판 제보하기
  MENU_REPORT: 'shops/menu/suggestion/',

  // 파티 생성
  CREATE_PARTY: 'party/accounts/',
  // 파티 정보 변경
  EDIT_PARTY: 'party/accounts/',
  // 파티 정보
  PARTY_INFO: 'party/accounts/info/',
  // 파티 피드 리스트
  PARTY_FEED_LIST: 'feeds/feed/party/',
  // 파티원 리스트
  PARTY_MEMBER_LIST: 'party/accounts/member_list/',
  // 파티 검색
  SEARCH_PARTY: 'search/party/',
  // 파티 가입
  JOIN_PARTY: 'party/accounts/join/',
  // 파티 가입 검수
  CONFIRM_PARTY: 'party/accounts/check_join/',

  // 푸시 알림
  PUSH_NOTIFICATION: 'archives/push_notification/',

  // 푸이티아이 질문지
  FOOIYTI_QUESTION_LIST: 'archives/fooiyti/question/',
  // 푸이티아이 결과
  FOOIYTI_QUESTION_RESULT: 'archives/fooiyti/result/',

  // Init
  INIT: 'archives/init/',
  // 공지사항
  ANNOUNCEMENT: 'archives/notice/',
};

export const toastMessage = {
  // 피드 신고
  FEED_REPORT: '피드 신고가 완료되었습니다.',
  FEED_DELETE: '피드 삭제가 완료되었습니다.',
  FEED_COMMENT_DELETE: '댓글 삭제가 완료되었습니다.',
  FEED_COMMENT_REGISTER: '댓글 등록이 완료되었습니다.',
  FEED_COMMENT_REPORT: '댓글 신고가 완료되었습니다.',
  FEED_COMMENT_UPDATE: '댓글 수정이 완료되었습니다.',
};

export const resizeImageType = {
  SMALL: 'small',
  MEDIUM: 'medium',
};

export const fooiyFontType = {
  H1: 'H1',
  H2: 'H2',
  H3: 'H3',
  H4: 'H4',
  Subtitle1: 'Subtitle1',
  Subtitle2: 'Subtitle2',
  Subtitle3: 'Subtitle3',
  Subtitle4: 'Subtitle4',
  Body1: 'Body1',
  Body2: 'Body2',
  Caption1: 'Caption1',
  Caption1_1: 'Caption1_1',
  Caption2: 'Caption2',
  Button: 'Button',
};
