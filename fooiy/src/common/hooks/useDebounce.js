import React, {useRef, useState} from 'react';

const useDebounce = ({time}) => {
  let timer = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const debounceCallback = async func => {
    timer.current && clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      setIsLoading(true);
      // Do something
      await func();
      setIsLoading(false);
      timer.current = undefined;
    }, time);
  };

  return {debounceCallback, isLoading};
};

export {useDebounce};
