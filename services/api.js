// @flow
import got from 'got';
/* eslint-disable-next-line */
import isDev from 'electron-is-dev';

import { METHODS, type APIMethods } from './utils';
import store from '../config/electron-store';

const RPC = {
  host: '127.0.0.1',
  port: isDev ? 18232 : 8232,
  user: store.get('rpcuser'),
  password: store.get('rpcpassword'),
};

const client = got.extend({
  method: 'POST',
  json: true,
  auth: `${RPC.user}:${RPC.password}`,
});

// $FlowFixMe
const api: APIMethods = METHODS.reduce(
  (obj, method) => ({
    ...obj,
    [method]: (...args) => client
      .post(`http://${RPC.host}:${RPC.port}`, {
        body: {
          method,
          jsonrpc: '2.0',
          id: Date.now(),
          params: args,
        },
      })
      .then(data => Promise.resolve(data.body && data.body.result)),
  }),
  {},
);

export default api;