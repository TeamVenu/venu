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
import testData from 'fixtures/test.json';
import { Wrapper, MapWrapper } from './styles';

// import messages from './messages';

export default class Main extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props, context) {
    super(props, context);

    this.state = {
      placesHolder: testData.booths,
      facilitiesHolder: testData.facilities[0].restrooms,
      places: testData.booths,
      facilities: testData.facilities[0].restrooms,
      viewMode: 'discover',
      center: {
        lat: 43.084167,
        lng: -77.677085,
      },
      currentMarker: {},
    };

    this.centerMap = this.centerMap.bind(this);
    this.updateViewMode = this.updateViewMode.bind(this);
    this.clickOnPlaceCard = this.clickOnPlaceCard.bind(this);
    this.showPlaceInfo = this.showPlaceInfo.bind(this);
    this.clearPlaceInfo = this.clearPlaceInfo.bind(this);
  }

  updateViewMode(e) {
    e.preventDefault();

    const mode = e.target.textContent;
    const newState = {
      places: [],
      facilities: [],
      viewMode: '',
    };

    switch (mode) {
      case 'Discover':
        newState.viewMode = 'discover';
        newState.places = this.state.placesHolder;
        newState.facilities = this.state.facilitiesHolder;
        break;
      case 'Events':
        newState.viewMode = 'events';
        newState.places = this.state.placesHolder;
        newState.facilities = [];
        break;
      case 'Facilities':
        newState.viewMode = 'facilities';
        newState.places = [];
        newState.facilities = this.state.facilitiesHolder;
        break;
      default:
        newState.viewMode = 'none';
        newState.places = [];
        newState.facilities = [];
        break;
    }

    this.setState({
      places: newState.places,
      facilities: newState.facilities,
      viewMode: newState.viewMode,
    });
  }

  centerMap(center) {
    this.setState({
      center,
    });
  }

  clickOnPlaceCard(place) {
    const centerLocation = {
      lat: place.location.latitude,
      lng: place.location.longitude,
    };
    this.centerMap(centerLocation);
    this.showPlaceInfo(centerLocation);
  }

  showPlaceInfo(location) {
    this.setState({
      currentMarker: location,
    });
  }

  clearPlaceInfo() {
    this.setState({
      currentMarker: {},
    });
  }

  render() {
    return (
      <Wrapper>
        <Header updateViewMode={this.updateViewMode} viewMode={this.state.viewMode} />
        <MapWrapper>
          <Map places={this.state.places} facilities={this.state.facilities} center={this.state.center} clearPlaceInfo={this.clearPlaceInfo} currentMarker={this.state.currentMarker} clickOnPlaceCard={this.clickOnPlaceCard} />
        </MapWrapper>
        <PlacesContainer places={this.state.places} facilities={this.state.facilities} clickOnPlaceCard={this.clickOnPlaceCard} />
      </Wrapper>
    );
  }
}
