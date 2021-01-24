import { AnyAction, Dispatch, Middleware } from 'redux';
/* eslint-disable @typescript-eslint/no-explicit-any */

type WebSocketAction<T = string> = {
  type: string;
  payload: any;
  meta?: { ws?: { action: T; payload: any } };
};

type Params = {
  connection: WebSocket;
  websocketBuilder: IWebSocketBuilder;
};

type Callback<D = any, S = any> = (
  ...args: any[]
) => (
  dispatch: D,
  getState: () => S,
  sendMessage: (data: { action: string; payload?: any }) => Promise<void>
) => void;

interface IWebSocketBuilder<D = any, S = any> {
  add: (name: string, callback: Callback<D, S>) => IWebSocketBuilder<D, S>;
  callbackMap: Map<string, Callback<D, S>>;
}

export function websocketBuilder<D = Dispatch, S = any>() {
  const callbackMap = new Map<string, Callback<D, S>>();
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const moduleReducer = () => {};

  const add = (name: string, callback: Callback<D, S>) => {
    callbackMap.set(name, callback);
    return moduleReducer;
  };

  moduleReducer.add = add;
  moduleReducer.callbackMap = callbackMap;

  return moduleReducer;
}

const waitForOpenWebSocket = (ws: WebSocket) =>
  new Promise<void>((resolve) => {
    if (ws.readyState !== ws.OPEN) {
      ws.onopen = () => {
        resolve();
      };
    } else {
      resolve();
    }
  });

const sendMessage = async (ws: WebSocket, data: any) => {
  await waitForOpenWebSocket(ws);
  ws.send(JSON.stringify(data));
};

export const websocketMiddleware = ({
  connection,
  websocketBuilder,
}: Params): Middleware => (store) => (next) => async (
  action: WebSocketAction | AnyAction
) => {
  connection.onopen = () => {
    console.log('Connected to ws server!');
  };

  connection.onerror = (error) => {
    console.error(error);
  };

  connection.onmessage = ({ data }) => {
    const { callbackMap } = websocketBuilder;
    const { action, payload } = JSON.parse(data);

    callbackMap.forEach((callback, name) => {
      if (action === name) {
        callback
          .call(null, payload)
          .call(
            store,
            store.dispatch.bind(store),
            store.getState.bind(store),
            (data) => sendMessage(connection, data)
          );
      }
    });
  };

  if (action.meta?.ws) {
    await sendMessage(connection, action.meta.ws);
  }

  return next(action);
};
