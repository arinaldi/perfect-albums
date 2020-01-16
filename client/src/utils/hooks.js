import { useState, useEffect } from 'react';

import Api from '../utils/api';

export const useApiGet = ({ initialState, pathname, dependency }) => {
  const [data, setData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Api.get(`/api/${pathname}`);
        const data = await res.json();
        setData(data);
      } catch (err) {
        setHasError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [pathname, dependency]);

  return { data, isLoading, hasError };
};

export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
