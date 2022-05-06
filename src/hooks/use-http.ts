import { useCallback, useReducer } from 'react';

export enum Status {
  PENDING,
  COMPLETED,
}

type HttpState<T> = {
  data: T | undefined;
  error: string | undefined;
  status: Status | undefined;
};

enum HttpAction {
  SEND,
  COMPLETE,
  FAIL,
}

const createResponseReducer =
  <T>() =>
  (
    oldState: HttpState<T>,
    action: { type: HttpAction; data?: T; error?: string }
  ): HttpState<T> => {
    if (action.type === HttpAction.SEND) {
      return { data: undefined, error: '', status: Status.PENDING };
    }
    if (action.type === HttpAction.COMPLETE) {
      return { data: action.data, error: '', status: Status.COMPLETED };
    }
    if (action.type === HttpAction.FAIL) {
      return { data: undefined, error: action.error, status: Status.COMPLETED };
    }
    return oldState;
  };

const useHttp = <Response>(
  requestCallback: () => Promise<Response>,
  isPending: boolean = false
) => {
  const [response, dispatchResponse] = useReducer(createResponseReducer<Response>(), {
    data: undefined,
    error: '',
    status: isPending ? Status.PENDING : undefined,
  });

  const httpCallback = useCallback(async () => {
    dispatchResponse({ type: HttpAction.SEND });
    try {
      const response = await requestCallback();
      dispatchResponse({ type: HttpAction.COMPLETE, data: response });
    } catch (err) {
      dispatchResponse({ type: HttpAction.FAIL, error: (err as Error).message });
    }
  }, [requestCallback]);

  return { httpCallback, ...response };
};

export default useHttp;
