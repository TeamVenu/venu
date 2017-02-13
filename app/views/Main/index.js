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
import PlacesContainer from 'components/PlacesContainer';

// import messages from './messages';

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  marging: 0;
  height: 100vh;
  -webkit-box-orient: horizontal;
  -o-box-orient: horizontal;

  @media (min-width: 720px) {
    flex-direction: row;
  }
`;

const MapWrapper = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
`;

export default class Main extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Wrapper>
        <Header />
        <MapWrapper>
          <Map />
        </MapWrapper>
        <PlacesContainer />
      </Wrapper>
    );
  }
}

