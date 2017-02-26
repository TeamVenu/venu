/*
 * Main
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import axios from 'axios';
import Header from 'components/Header';
import PlacesContainer from 'containers/PlacesContainer';
import Map from './Map';
import { Wrapper, MapWrapper } from './styles';

export default class Main extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props, context) {
    super(props, context);

    this.state = {
      places: [],
      exhibits: [],
      facilities: [],
      viewMode: 'Discover',
      center: {
        lat: 43.08516,
        lng: -77.677192,
      },
      currentMarker: {},
    };

    this.centerMap = this.centerMap.bind(this);
    this.updateViewMode = this.updateViewMode.bind(this);
    this.clickOnPlaceCard = this.clickOnPlaceCard.bind(this);
    this.showPlaceInfo = this.showPlaceInfo.bind(this);
    this.clearPlaceInfo = this.clearPlaceInfo.bind(this);
  }

  componentWillMount() { }

  componentDidMount() {
    this.getPlacesData();
  }

  getPlacesData() {
    // Get Places through AJAX or fetch here from our API
    axios.get('/api/places')
      .then((response) => {
        this.setPlacesData(response.data);
      })
      .catch((error) => {
        console.error('Error getting API ' + error);
      });
  }

  setPlacesData(data) {
    // Concatenate every place into one array
    const allPlaces = data.exhibits.concat(data.facilities.restrooms);

    this.setState({
      places: allPlaces,
      exhibits: data.exhibits,
      facilities: data.facilities.restrooms,
    });
  }

  centerMap(center) {
    this.setState({
      center,
    });
  }

  clearPlaceInfo() {
    this.setState({
      currentMarker: {},
    });
  }

  clickOnPlaceCard(place) {
    const centerLocation = {
      lat: place.lat,
      lng: place.lng,
    };

    this.setState({
      center: centerLocation,
      currentMarker: centerLocation,
    });
  }

  showPlaceInfo(location) {
    this.setState({
      currentMarker: location,
    });
  }

  updateViewMode(e) {
    e.preventDefault();

    const mode = e.target.textContent;
    const newState = {
      exhibits: [],
      facilities: [],
      viewMode: '',
    };

    switch (mode) {
      case 'Discover':
        newState.viewMode = 'Discover';
        newState.exhibits = this.state.exhibits;
        newState.facilities = this.state.facilities;
        break;
      case 'Itinerary':
        newState.viewMode = 'Itinerary';
        newState.exhibits = this.state.exhibits;
        newState.facilities = [];
        break;
      case 'Facilities':
        newState.viewMode = 'Facilities';
        newState.exhibits = [];
        newState.facilities = this.state.facilities;
        break;
      default:
        newState.viewMode = 'none';
        newState.exhibits = [];
        newState.facilities = [];
        break;
    }
    const newPlaces = newState.exhibits.concat(newState.facilities);

    this.setState({
      places: newPlaces,
      viewMode: newState.viewMode,
    });
  }

  render() {
    return (
      <Wrapper>
        <Header updateViewMode={this.updateViewMode} viewMode={this.state.viewMode} />
        <MapWrapper>
          <Map places={this.state.places} center={this.state.center} clearPlaceInfo={this.clearPlaceInfo} currentMarker={this.state.currentMarker} clickOnPlaceCard={this.clickOnPlaceCard} />
        </MapWrapper>
        <PlacesContainer places={this.state.places} clickOnPlaceCard={this.clickOnPlaceCard} />
      </Wrapper>
    );
  }
}
