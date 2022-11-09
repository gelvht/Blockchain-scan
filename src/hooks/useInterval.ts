import { useEffect } from 'react';

const useInterval = (func: () => void, seconds: number) => {
  useEffect(() => {
    const interval = setInterval(func, seconds * 1000);
    return () => clearInterval(interval);
  }, [seconds]);
};

export default useInterval;
