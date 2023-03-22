const getPhotoAddress = photoList => {
  return photoList.length === 1 && photoList[0].location
    ? photoList[0].location
    : photoList.length === 2 && photoList[0].location
    ? photoList[0].location
    : photoList.length === 2 && photoList[1].location
    ? photoList[1].location
    : photoList.length === 3 && photoList[0].location
    ? photoList[0].location
    : photoList.length === 3 && photoList[1].location
    ? photoList[1].location
    : photoList.length === 3 && photoList[2].location
    ? photoList[2].location
    : null;
};

export default getPhotoAddress;
