import { useState, useEffect } from 'react';

import Api from '../utils/api';

export const useApiGet = ({ initialState, pathname, dependency }) => {
  const [data, setData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Api.get(`/api/${pathname}`);
        const data = await res.json();
        setData(data);
      } catch (err) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [pathname, dependency]);

  return { data, isLoading, isError };
};
