// @flow

import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import 'jest-dom/extend-expect';

import { WalletAddress } from '../../app/components/wallet-address';
import appTheme from '../../app/theme';

afterEach(cleanup);

describe('<WalletAddress />', () => {
  test('should render wallet address component correctly', () => {
    const { queryByTestId } = render(
      <ThemeProvider theme={appTheme}>
        <div style={{ width: '700px' }}>
          <WalletAddress
            address='t14oHp2v54vfmdgQ3v3SNuQga8JKHTNi2a1'
          />
        </div>
      </ThemeProvider>,
    );

    expect(queryByTestId('Address')).toBeInTheDocument();
  });
});