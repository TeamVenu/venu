/*
 * Main
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';

// import { FormattedMessage } from 'react-intl';
import Header from 'components/Header';
import Map from 'components/Map';
import PlacesContainer from 'components/PlacesContainer';
import testData from 'fixtures/test-data.json';
import { Wrapper, MapWrapper } from './styles';

// import messages from './messages';

export default class Main extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props, context) {
    super(props, context);

    this.state = {
      places: testData.places,
    };

    this.addPlaces();
  }

  componentDidMount() {

  }

  addPlaces() {
    if (!testData.places || testData.places.length === 0) return;

    this.setState = {
      places: testData.places,
    };
  }

  render() {
    return (
      <Wrapper>
        <Header />
        <MapWrapper>
          <Map places={this.state.places} />
        </MapWrapper>
        <PlacesContainer places={this.state.places} />
      </Wrapper>
    );
  }
}
