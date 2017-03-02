/*
 * Main
 *
 * This is the first thing users see of our App, at the '/' route
 */
import React from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
import Header from 'components/Header';
import PlacesPanel from 'containers/PlacesPanel';
import Map from './Map';
import { Wrapper, MapWrapper } from './styles';

export default class Main extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props, context) {
    super(props, context);

    this.state = {
      places: [],
      exhibits: [],
      facilities: [],
      mapMode: 'Discover',
      userLocation: {
        lat: 43.08516,
        lng: -77.677192,
      },
      center: {
        lat: 43.08516,
        lng: -77.677192,
      },
      zoom: 20,
      currentMarker: {},
    };

    this.centerMap = this.centerMap.bind(this);
    this.onChangeMapMode = this.onChangeMapMode.bind(this);
    this.clickOnPlaceCard = this.clickOnPlaceCard.bind(this);
    this.showPlaceInfo = this.showPlaceInfo.bind(this);
    this.clearPlaceInfo = this.clearPlaceInfo.bind(this);
  }

  componentWillMount() { }

  componentDidMount() {
    this.getPlacesData();
    this.getUserLocation();
  }

  onChangeMapMode(e) {
    e.preventDefault();

    const mode = e.target.textContent;

    const newState = {
      exhibits: [],
      facilities: [],
      mapMode: '',
    };

    switch (mode) {
      case 'Discover':
        newState.mapMode = 'Discover';
        newState.exhibits = this.state.exhibits;
        newState.facilities = this.state.facilities;
        break;
      case 'Itinerary':
        newState.mapMode = 'Itinerary';
        newState.exhibits = this.state.exhibits.filter((exhibit) => { // eslint-disable-line
          return exhibit.subType === 'bookmarked';
        });
        newState.facilities = this.state.facilities;
        break;
      case 'Facilities':
        newState.mapMode = 'Facilities';
        newState.exhibits = [];
        newState.facilities = this.state.facilities;
        break;
      default:
        newState.mapMode = 'none';
        newState.exhibits = [];
        newState.facilities = [];
        break;
    }
    const newPlaces = newState.exhibits.concat(newState.facilities);

    this.setState({
      places: newPlaces,
      mapMode: newState.mapMode,
    });
  }

  getPlacesData() {
    // Get Places through AJAX or fetch here from our API
    axios.get('/api/places')
      .then((response) => {
        this.setPlacesData(response.data);
      })
      .catch((error) => {
        console.error('Error getting API ', error);
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

  getUserLocation() {
    const location = {};

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(this.retrieveUsersLocation.bind(this), () => {
        // Error
        console.warn('Unable to retrieve location, user might have declined to use location');
        location.lat = 43.08516;
        location.lng = -77.677192;
        // this.centerMap(location);
        this.setState({
          userLocation: location,
        });
      });
    } else {
      console.warn('Geolocation is not available');
      location.lat = 43.08516;
      location.lng = -77.677192;
      // this.centerMap(location);
      this.setState({
        userLocation: location,
      });
    }

    this.centerMap(this.state.userLocation);
  }

  retrieveUsersLocation(position) {
    const location = {};

    location.lat = position.coords.latitude;
    location.lng = position.coords.longitude;

    this.setState({
      userLocation: location,
    });
  }

  centerMap(center) {
    this.setState({
      zoom: 20,
      center,
    });
  }

  clearPlaceInfo() {
    this.setState({
      currentMarker: {},
    });
  }

  clickOnPlaceCard(place) {
    const { id } = place;
    const placeURL = '/place/' + id; // eslint-disable-line
    browserHistory.push(placeURL);
  }

  showPlaceInfo(location) {
    this.setState({
      currentMarker: location,
    });
  }

  render() {
    return (
      <Wrapper>
        <Header onChangeMapMode={this.onChangeMapMode} mapMode={this.state.mapMode} />
        <MapWrapper>
          <Map places={this.state.places} zoom={this.state.zoom} center={this.state.center} userLocation={this.state.userLocation} clearPlaceInfo={this.clearPlaceInfo} currentMarker={this.state.currentMarker} clickOnPlaceCard={this.clickOnPlaceCard} />
        </MapWrapper>
        <PlacesPanel places={this.state.places} clickOnPlaceCard={this.clickOnPlaceCard} />
      </Wrapper>
    );
  }
}
