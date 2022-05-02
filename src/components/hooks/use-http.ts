import { useCallback, useState } from 'react';

type HttpState<T> = {
  data: T | null;
  error: string;
  status: string;
};

const useHttp = <Response>(
  requestCallback: () => Promise<Response>,
  isPending: boolean = false
) => {
  const [response, setResponse] = useState<HttpState<Response>>({
    data: null,
    error: '',
    status: isPending ? 'pending' : '',
  });

  const httpCallback = useCallback(async () => {
    setResponse((oldState) => {
      return { ...oldState, status: 'pending' };
    });
    try {
      const response = await requestCallback();
      setResponse(() => {
        return { data: response, status: 'completed', error: '' };
      });
    } catch (err) {
      setResponse(() => {
        return { data: null, status: 'completed', error: (err as Error).message };
      });
    }
  }, [requestCallback]);

  return { httpCallback, ...response };
};

export default useHttp;
