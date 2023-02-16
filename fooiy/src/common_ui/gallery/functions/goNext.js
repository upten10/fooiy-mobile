import {ApiManagerV2} from '../../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../../common/Enums';
import FooiyToast from '../../../common/FooiyToast';
import getPhotoAddress from './getPhotoAddress';

const goNext = (params, navigation, selectedPhotoIndexList, galleryList) => {
  if (selectedPhotoIndexList.length === 0) {
    FooiyToast.up_message('사진을 하나 이상 선택해주세요 :)');
  } else {
    if (
      params.navigation === 'FindMenu' ||
      params.navigation === 'SetAddress'
    ) {
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
          : params.navigation === 'SetAddress'
          ? {
              photo_list: photoList,
              address: getPhotoAddress(photoList),
            }
          : null;

      navigation.navigate(params.navigation, navigate_params);
    } else {
      const match = /\.(\w+)$/.exec(
        galleryList[selectedPhotoIndexList].node.image.filename ?? '',
      );
      const type =
        galleryList[selectedPhotoIndexList].node.type === 'image'
          ? match
            ? `image/${match[1]}`
            : `image`
          : galleryList[selectedPhotoIndexList].node.type;
      const formData = new FormData();
      const name = 'image.jpg';
      const uri = galleryList[selectedPhotoIndexList].node.image.uri;
      if (params.navigation === 'Mypage') {
        formData.append('profile_image', {
          uri,
          name,
          type,
        });
        ApiManagerV2.patch(apiUrl.PROFILE_EDIT, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          transformRequest: (data, headers) => {
            return data;
          },
        })
          .then(res => {
            res.data.success && navigation.navigate(params.navigation);
          })
          .catch(e => FooiyToast.error());
      } else if (params.navigation === 'Party') {
        formData.append('party_id', params.party_id);
        formData.append('party_image', {
          uri,
          name,
          type,
        });
        ApiManagerV2.patch(apiUrl.EDIT_PARTY, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          transformRequest: (data, headers) => {
            return data;
          },
        })
          .then(res => {
            res.data.success && navigation.navigate(params.navigation);
          })
          .catch(e => FooiyToast.error());
      }
    }
  }
};

export default goNext;
