/*
 * Main
 *
 * This is the first thing users see of our App, at the '/' route
 */
import React from 'react';
import axios from 'axios';
import Header from 'components/Header';
import PlacesPanel from 'containers/PlacesPanel';
import placeData from 'fixtures/places.json';
import Map from './Map';
import { Wrapper, MapWrapper } from './styles';

export default class Main extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props, context) {
    super(props, context);

    this.state = {
      places: [],
      exhibits: {},
      facilities: {},
      mapMode: 'Discover',
      detailedPlace: null,
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
      locationEnabled: false,
    };

    // Exhibit Settings
    this.setExhibitToDefault = this.setExhibitToDefault.bind(this);
    this.setExhibitToRecommended = this.setExhibitToRecommended.bind(this);
    this.setExhibitToBookmarked = this.setExhibitToBookmarked.bind(this);
    this.setExhibitToVisited = this.setExhibitToVisited.bind(this);

    // Other Actions
    this.centerMap = this.centerMap.bind(this);
    this.onChangeMapMode = this.onChangeMapMode.bind(this);
    this.clickOnPlaceCard = this.clickOnPlaceCard.bind(this);
    this.showPlaceInfo = this.showPlaceInfo.bind(this);
    this.clearPlaceInfo = this.clearPlaceInfo.bind(this);
    this.navigateToPlace = this.navigateToPlace.bind(this);
    this.likeExhibit = this.likeExhibit.bind(this);
    this.unLikeExhibit = this.unLikeExhibit.bind(this);
  }

  componentWillMount() { }

  componentDidMount() {
    this.getPlacesData();
    this.getUserLocation();
  }

  /**
   * onChangeMapMode
   * Recreates our places based on the chose map mode
   * @param  {Object} e
   */
  onChangeMapMode(e) {
    e.preventDefault();

    const mode = e.target.textContent;
    const { exhibits, facilities } = this.state;

    const newState = {
      exhibits: [],
      facilities: [],
      mapMode: '',
    };

    switch (mode) {
      case 'Discover':
        newState.mapMode = 'Discover';
        newState.exhibits = this.getExhibitsArray(exhibits);
        newState.facilities = this.getFacilitiesArray(facilities);
        break;
      case 'Itinerary':
        newState.mapMode = 'Itinerary';
        newState.exhibits = this.getExhibitsArray(exhibits).filter((exhibit) => { // eslint-disable-line
          return exhibit.subType === 'bookmarked';
        });
        newState.facilities = this.getFacilitiesArray(facilities);
        break;
      case 'Facilities':
        newState.mapMode = 'Facilities';
        newState.exhibits = [];
        newState.facilities = this.getFacilitiesArray(facilities);
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

    this.clearPlaceInfo();
  }

  /**
   * getPlacesData
   * Fetches our api using axios
   * If the api fails we use the imported json
   */
  getPlacesData() {
    // Get Places through AJAX or fetch here from our API
    axios.get('/api/places')
      .then((response) => {
        if (response.data.exhibits && response.data.facilities) {
          this.setPlacesData(response.data);
        } else {
          this.setPlacesData(placeData);
        }
      })
      .catch((error) => {
        console.error('Error getting API ', error);
        this.setPlacesData(placeData);
      });
  }

  /**
   * setPlacesData
   * Initializes our data from json
   * @param  {Object} data
   */
  setPlacesData(data) {
    // Get exhibits object
    const exhibits = data.exhibits;

    // Get facilities object
    const facilities = data.facilities;

    // Put both arrays together
    const places = this.getPlacesArray(exhibits, facilities);

    // Set state to save our data
    this.setState({
      places,
      exhibits,
      facilities,
    });
  }

  /* Helper Methods */
  /**
   * getFacilitiesArray
   * Returns an array of all facilities based on facilities object
   * @param  {Object} facilities
   * @return {Array}
   */
  getFacilitiesArray(facilities) {
    return facilities.food.concat(facilities.information, facilities.medical, facilities.restrooms);
  }

  /**
   * getFacilitiesArray
   * Returns an array of all exhibits based on exhibits object
   * @param  {Object} exhibits
   * @return {Array}
   */
  getExhibitsArray(exhibits) {
    return exhibits.recreationZone.concat(
      exhibits.ritCentral, exhibits.ntidArea, exhibits.informationStation, exhibits.thinkTank, exhibits.artisticAlley,
      exhibits.engineeringPark, exhibits.scienceCenter, exhibits.businessDistrict, exhibits.innovationCenter, exhibits.globalVillage,
      exhibits.greenPlace, exhibits.technologyQuarter, exhibits.computerZone
    );
  }

  /**
   * getPlacesArray
   * Returns an array of all exhibits and facilities based on exhibits and facilities objects
   * @param  {Object} exhibits
   * @param  {Object} facilities
   * @return {Array}
   */
  getPlacesArray(exhibits, facilities) {
    const exhibitsArray = this.getExhibitsArray(exhibits);
    const facilitiesArray = this.getFacilitiesArray(facilities);

    return exhibitsArray.concat(facilitiesArray);
  }
  /* End of Places Helper Methods */

  /**
   * getUserLocation
   * Prompts the user for access to their location
   */
  getUserLocation() {
    const location = {};

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(this.retrieveUsersLocation.bind(this), () => {
        // Error
        console.warn('Unable to retrieve location, user might have declined to use location');
        location.lat = 43.08516;
        location.lng = -77.677192;

        this.setState({
          userLocation: location,
          center: location,
          locationEnabled: false,
        });
      });
    } else {
      console.warn('Geolocation is not available');
      location.lat = 43.08516;
      location.lng = -77.677192;
      // this.centerMap(location);
      this.setState({
        userLocation: location,
        center: location,
        location: false,
      });
    }

    this.centerMap(this.state.userLocation);
  }

  /**
   * setExhibitToDefault
   * Sets an exhibit's subType to default based
   * on the exhibits key and colorZone
   * @param  {Object} place
   */
  setExhibitToDefault(place) {
    // Get the key and the colorZone from the place
    const { key, colorZone } = place;

    // Set the specific exhibit to default
    this.state.exhibits[colorZone][key].subType = 'default';

    // Recreate the places array
    const places = this.getPlacesArray(this.state.exhibits, this.state.facilities);

    // Use the new places array
    this.setState({
      places,
      mapMode: 'Discover',
    });
  }

  /**
   * setExhibitToRecommended
   * Sets an exhibit's subType to recommended based
   * on the exhibits key and colorZone
   * @param  {Object} place
   */
  setExhibitToRecommended(place) {
    // Get the key and the colorZone from the place
    const { key, colorZone } = place;

    // Set the specific exhibit to recommended
    this.state.exhibits[colorZone][key].subType = 'recommended';

    // Recreate the places array
    const places = this.getPlacesArray(this.state.exhibits, this.state.facilities);

    // Use the new places array
    this.setState({
      places,
    });
  }

  /**
   * setExhibitToBookmarked
   * Sets an exhibit's subType to bookmarked based
   * on the exhibits key and colorZone
   * @param  {Object} place
   */
  setExhibitToBookmarked(place) {
    // Get the key and the colorZone from the place
    const { key, colorZone } = place;

    // Set the specific exhibit to bookmarked
    this.state.exhibits[colorZone][key].subType = 'bookmarked';

    // Recreate the places array
    const places = this.getPlacesArray(this.state.exhibits, this.state.facilities);

    // Use the new places array
    this.setState({
      places,
    });
  }

  /**
   * setExhibitToVisited
   * Sets an exhibit's subType to visited based
   * on the exhibits key and colorZone
   * @param  {Object} place
   */
  setExhibitToVisited(place) {
    // Get the key and the colorZone from the place
    const { key, colorZone } = place;

    // Set the specific exhibit to visited
    this.state.exhibits[colorZone][key].subType = 'visited';

    // Recreate the places array
    const places = this.getPlacesArray(this.state.exhibits, this.state.facilities);

    // Use the new places array
    this.setState({
      places,
    });
  }

  /**
   * retrieveUsersLocation
   * Sets the user location based on their position
   * @param  {Object} position
   */
  retrieveUsersLocation(position) {
    const location = {};

    location.lat = position.coords.latitude;
    location.lng = position.coords.longitude;

    this.setState({
      userLocation: location,
      center: location,
      locationEnabled: true,
    });
  }

  /**
   * centerMap
   * Centers the map on the given location
   * and zooms the map to 20
   * @param  {Object} center
   */
  centerMap(center) {
    this.setState({
      zoom: 20,
      center,
    });
  }

  /**
   * clearPlaceInfo
   * Clears the currently selected place hiding the PlaceDetailView
   */
  clearPlaceInfo() {
    this.setState({
      currentMarker: {},
      detailedPlace: null,
    });
  }

  /**
   * clickOnPlaceCard
   * When a card is clicked this calls the showPlaceInfo function
   * @param  {Object} place
   */
  clickOnPlaceCard(place) {
    // Open up Detail view
    this.showPlaceInfo(place);
  }

  /**
   * showPlaceInfo
   * Centers the map on the selected location
   * and shows the Detailed View of the place
   * @param  {} place
   */
  showPlaceInfo(place) {
    const location = {
      lat: place.lat,
      lng: place.lng,
    };

    this.setState({
      center: location,
      currentMarker: location,
      detailedPlace: place,
    });
  }

  /**
   * navigateToPlace
   * Navigates user to specific place based on latitude and longitude
   * @param  {Object} place
   */
  navigateToPlace(place) {
    console.log(`Take me to ${place.name} which has a latitude of ${place.lat} and a longitude of ${place.lng}`);
    this.clearPlaceInfo();
  }

  /**
   * likeExhibit
   * Allows user to like an exhibit
   * @param  {Object} place
   */
  likeExhibit(place) {
    console.log(`I liked the ${place.name} exhibit.`);
    this.clearPlaceInfo();
  }

  /**
   * unLikeExhibit
   * Allows user to remove their like from an exhibit
   * @param  {Object} place
   */
  unLikeExhibit(place) {
    console.log(`I removed my like from the ${place.name} exhibit.`);
    this.clearPlaceInfo();
  }

  render() {
    return (
      <Wrapper>
        <Header onChangeMapMode={this.onChangeMapMode} mapMode={this.state.mapMode} />
        <MapWrapper>
          <Map
            places={this.state.places}
            zoom={this.state.zoom}
            center={this.state.center}
            userLocation={this.state.userLocation}
            clearPlaceInfo={this.clearPlaceInfo}
            currentMarker={this.state.currentMarker}
            clickOnPlaceCard={this.clickOnPlaceCard}
          />
        </MapWrapper>
        <PlacesPanel
          places={this.state.places}
          clearPlaceInfo={this.clearPlaceInfo}
          detailedPlace={this.state.detailedPlace}
          clickOnPlaceCard={this.clickOnPlaceCard}
          navigateToPlace={this.navigateToPlace}
          likeExhibit={this.likeExhibit}
          unLikeExhibit={this.unLikeExhibit}
          setExhibitToDefault={this.setExhibitToDefault}
          setExhibitToRecommended={this.setExhibitToRecommended}
          setExhibitToBookmarked={this.setExhibitToBookmarked}
          setExhibitToVisited={this.setExhibitToVisited}
        />
      </Wrapper>
    );
  }
}
