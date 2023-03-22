import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {resizeImageType} from '../common/Enums';

const ResizeImage = props => {
  const {uri, size, imageStyle} = props;

  const [resizeUri, setResizeUri] = useState(uri);

  const onError = useCallback(() => {
    setResizeUri(uri);
  }, [uri]);

  useEffect(() => {
    size === resizeImageType.SMALL
      ? setResizeUri(resizeUri + '.' + resizeImageType.SMALL)
      : setResizeUri(resizeUri + '.' + resizeImageType.MEDIUM);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uri]);

  return (
    <FastImage source={{uri: resizeUri}} style={imageStyle} onError={onError} />
  );
};

export default memo(ResizeImage);
