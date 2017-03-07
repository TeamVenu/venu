/*
 * Main
 *
 * This is the first thing users see of our App, at the '/' route
 */
import React, { PropTypes as T } from 'react';
import Header from 'components/Header';
import PlacesPanel from 'containers/PlacesPanel';
import { getExhibitsArray, getFacilitiesArray, getPlacesArray } from 'utils/helpers';
import Map from './Map';
import { Wrapper, MapWrapper } from './styles';

export default class Main extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: T.object,
  };

  constructor(props, context) {
    super(props, context);
    const { children } = this.props;

    this.state = {
      places: children.places,
      exhibits: children.exhibits,
      facilities: children.facilities,
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
    this.askUserForLocation();
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
        newState.exhibits = getExhibitsArray(exhibits);
        newState.facilities = getFacilitiesArray(facilities);
        break;
      case 'Itinerary':
        newState.mapMode = 'Itinerary';
        newState.exhibits = getExhibitsArray(exhibits).filter((exhibit) => { // eslint-disable-line
          return exhibit.subType === 'bookmarked';
        });
        newState.facilities = getFacilitiesArray(facilities);
        break;
      case 'Facilities':
        newState.mapMode = 'Facilities';
        newState.exhibits = [];
        newState.facilities = getFacilitiesArray(facilities);
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
    const places = getPlacesArray(this.state.exhibits, this.state.facilities);

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
    const places = getPlacesArray(this.state.exhibits, this.state.facilities);

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
    const places = getPlacesArray(this.state.exhibits, this.state.facilities);

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
    const places = getPlacesArray(this.state.exhibits, this.state.facilities);

    // Use the new places array
    this.setState({
      places,
    });
  }

    /**
   * askUserForLocation
   * Prompts the user for access to their location
   */
  askUserForLocation() {
    const location = {};

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(this.retrieveUsersLocation.bind(this), () => {
        // Error
        console.warn(' ⛔️ 📍 Unable to retrieve location, user might have declined to use location');
        location.lat = 43.08516;
        location.lng = -77.677192;

        this.setState({
          userLocation: location,
          center: location,
          locationEnabled: false,
        });
      });
    } else {
      console.warn('⚠️🗺 Geolocation is not available');
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
    console.log(`🚶🏻‍ Take me to ${place.name} which has a latitude of ${place.lat} and a longitude of ${place.lng}.`);
    this.clearPlaceInfo();
  }

  /**
   * likeExhibit
   * Allows user to like an exhibit
   * @param  {Object} place
   */
  likeExhibit(place) {
    console.log(`👍🏻 I liked the ${place.name} exhibit.`);
    this.clearPlaceInfo();
  }

  /**
   * unLikeExhibit
   * Allows user to remove their like from an exhibit
   * @param  {Object} place
   */
  unLikeExhibit(place) {
    console.log(`😕 I removed my like from the ${place.name} exhibit.`);
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
          mapMode={this.state.mapMode}
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
