// @flow
import { connect } from 'react-redux';
import eres from 'eres';

import rpc from '../../services/api';
import { SendView } from '../views/send';

import {
  sendTransaction,
  sendTransactionSuccess,
  sendTransactionError,
} from '../redux/modules/send';

import type { AppState } from '../types/app-state';
import type { Dispatch } from '../types/redux';

export type SendTransactionInput = {
  from: string,
  to: string,
  amount: number,
  fee: number,
  memo: string,
};

const mapStateToProps = ({ walletSummary, sendStatus }: AppState) => ({
  balance: walletSummary.total,
  zecPrice: walletSummary.zecPrice,
  addresses: walletSummary.addresses,
  error: sendStatus.error,
  isSending: sendStatus.isSending,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  sendTransaction: async ({
    from,
    to,
    amount,
    fee,
    memo,
  }: SendTransactionInput) => {
    dispatch(sendTransaction());

    const [sendErr] = await eres(
      rpc.z_sendmany(from, [{ address: to, amount, memo }], 1, fee),
    );

    // eslint-disable-next-line
    if (sendErr) return dispatch(sendTransactionError({ error: sendErr.message }));

    dispatch(sendTransactionSuccess());
  },
});

export const SendContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SendView);