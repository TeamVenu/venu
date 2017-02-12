/*
 * Main
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';

import styled from 'styled-components';
// import { FormattedMessage } from 'react-intl';

import Header from 'components/Header';
import Map from 'components/Map';
import Sidebar from 'components/Sidebar';

// import messages from './messages';

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  height: 100vh;
  -webkit-box-orient: horizontal;
  -o-box-orient: horizontal;

  @media (min-width: 1720px) {
    flex-direction: row;
  }
`;

export default class Main extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Wrapper>
        <Header />
        <div style={{ width: '100%', height: 500, background: 'var(--primary-color)' }}>
          <Map />
        </div>
        <Sidebar />
      </Wrapper>
    );
  }
}

