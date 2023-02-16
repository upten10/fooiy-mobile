import FooiyToast from '../../../common/FooiyToast';
import getPhotoAddress from './getPhotoAddress';

const goNext = (params, navigation, selectedPhotoIndexList, galleryList) => {
  if (selectedPhotoIndexList.length === 0) {
    FooiyToast.up_message('사진을 하나 이상 선택해주세요 :)');
  } else {
    const photoList = selectedPhotoIndexList.map(index => {
      return galleryList[index] ? galleryList[index].node : null;
    });

    const navigate_params =
      params.navigation === 'FindMenu'
        ? {
            shop: params.shop,
            photo_list: photoList,
            address: getPhotoAddress(photoList),
          }
        : {
            photo_list: photoList,
            address: getPhotoAddress(photoList),
          };

    navigation.navigate(params.navigation, navigate_params);
  }
};

export default goNext;
