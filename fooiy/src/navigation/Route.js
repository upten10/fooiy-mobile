import MapStackNavigation from '../screens/map/StackNavigation';
import FeedStackNavigation from '../screens/feed/StackNavigation';
import Suggestion from '../screens/suggestion/Suggestion';
import Mypage from '../screens/mypage/Mypage';
import RegisterStackNavigation from '../screens/register/RegisterStackNavigation';

export const Route = [
  {
    id: 1,
    name: 'MapStackNavigation',
    component: MapStackNavigation,
    focused: require('../../assets/icons/navigation/ic_map_focused.png'),
    unfocused: require('../../assets/icons/navigation/ic_map.png'),
  },
  {
    id: 2,
    name: 'FeedStackNavigation',
    component: FeedStackNavigation,
    focused: require('../../assets/icons/navigation/ic_feed_focused.png'),
    unfocused: require('../../assets/icons/navigation/ic_feed.png'),
  },
  {
    id: 3,
    name: 'RegisterStackNavigation',
    component: RegisterStackNavigation,
    focused: require('../../assets/icons/navigation/ic_register.png'),
    unfocused: require('../../assets/icons/navigation/ic_register.png'),
  },
  {
    id: 4,
    name: 'Suggestion',
    component: Suggestion,
    focused: require('../../assets/icons/navigation/ic_suggestion_focused.png'),
    unfocused: require('../../assets/icons/navigation/ic_suggestion.png'),
  },
  {
    id: 5,
    name: 'Mypage',
    component: Mypage,
    focused: require('../../assets/icons/navigation/ic_mypage_focused.png'),
    unfocused: require('../../assets/icons/navigation/ic_mypage.png'),
  },
];
