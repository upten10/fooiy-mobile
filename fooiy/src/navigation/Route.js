import FeedStackNavigation from '../screens/feed/StackNavigation';
import Suggestion from '../screens/suggestion/Suggestion';
import MypageStackNavigation from '../screens/mypage/StackNavigation';
import RegisterStackNavigation from '../screens/register/RegisterStackNavigation';
import Map from '../screens/map/Map';

export const Route = [
  {
    id: 1,
    name: 'Map',
    component: Map,
    text: '지도',
  },
  {
    id: 2,
    name: 'FeedStackNavigation',
    component: FeedStackNavigation,
    text: '피드',
  },
  {
    id: 3,
    name: 'RegisterStackNavigation',
    component: RegisterStackNavigation,
    text: '등록',
  },
  {
    id: 4,
    name: 'Suggestion',
    component: Suggestion,
    text: '파티',
  },
  {
    id: 5,
    name: 'MypageStackNavigation',
    component: MypageStackNavigation,
    text: '내 정보',
  },
];
