/*
 * Main
 *
 * This is the first thing users see of our App, at the '/' route
 */
import React, { PropTypes as T } from 'react';
// import { browserHistory } from 'react-router';
import Header from 'components/Header';
import PlacesPanel from 'containers/PlacesPanel';
import Map from './Map';
import { Wrapper, MapWrapper } from './styles';

export default class Main extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: T.object,
    // location: T.object,
  };

  constructor(props, context) {
    super(props, context);
    const { children } = this.props;

    this.state = {
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
      zoom: 19,
      currentMarker: {},
      userName: children.userName,
      userEmail: children.userEmail,
      userInterests: children.userInterests,
      locationEnabled: children.locationEnabled,
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
    // if (!this.props.location.state) {
    //   browserHistory.push({
    //     pathname: '/onboarding',
    //     state: {
    //       firstTime: true,
    //     },
    //   });
    // } else {
    //   this.onboardingFinish(this.props.location.state).bind(this);
    // }
  }

  /**
   * onChangeMapMode
   * Changes our Map mode
   * @param {Object} e
   */
  onChangeMapMode(e) {
    e.preventDefault();

    const mode = e.target.textContent;

    this.setState({
      mapMode: mode,
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
    // Get the exhibits
    const { exhibits } = this.state;

    // Get the key and the colorZone from the place
    const { key, colorZone } = place;

    // Set the specific exhibit to default
    exhibits[colorZone][key].subType = 'default';

    // Use the new exhibits object
    this.setState({
      exhibits,
    });
  }

  /**
   * setExhibitToRecommended
   * Sets an exhibit's subType to recommended based
   * on the exhibits key and colorZone
   * @param  {Object} place
   */
  setExhibitToRecommended(place) {
    // Get the exhibits
    const { exhibits } = this.state;

    // Get the key and the colorZone from the place
    const { key, colorZone } = place;

    // Set the specific exhibit to recommended
    exhibits[colorZone][key].subType = 'recommended';

    // Use the new exhibits object
    this.setState({
      exhibits,
    });
  }

  /**
   * setExhibitToBookmarked
   * Sets an exhibit's subType to bookmarked based
   * on the exhibits key and colorZone
   * @param  {Object} place
   */
  setExhibitToBookmarked(place) {
    // Get the exhibits
    const { exhibits } = this.state;

    // Get the key and the colorZone from the place
    const { key, colorZone } = place;

    // Set the specific exhibit to bookmarked
    exhibits[colorZone][key].subType = 'bookmarked';

    // Use the new exhibits object
    this.setState({
      exhibits,
    });
  }

  /**
   * setExhibitToVisited
   * Sets an exhibit's subType to visited based
   * on the exhibits key and colorZone
   * @param  {Object} place
   */
  setExhibitToVisited(place) {
    // Get the exhibits
    const { exhibits } = this.state;

    // Get the key and the colorZone from the place
    const { key, colorZone } = place;

    // Set the specific exhibit to visited
    exhibits[colorZone][key].subType = 'visited';

    // Use the new exhibits object
    this.setState({
      exhibits,
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

    // Crappy way
    // Get the Panel Wrapper
    const panel = document.getElementById('places-list-slider').parentNode;

    // Remove collapsed class
    panel.classList.remove('collapsed');

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
    const { exhibits, facilities, mapMode, zoom, center, detailedPlace, currentMarker, userLocation, locationEnabled } = this.state;

    return (
      <Wrapper>
        <Header onChangeMapMode={this.onChangeMapMode} mapMode={this.state.mapMode} />
        <MapWrapper>
          <Map
            exhibits={exhibits}
            facilities={facilities}
            mapMode={mapMode}
            zoom={zoom}
            center={center}
            userLocation={userLocation}
            locationEnabled={locationEnabled}
            currentMarker={currentMarker}
            clearPlaceInfo={this.clearPlaceInfo}
            clickOnPlaceCard={this.clickOnPlaceCard}
          />
        </MapWrapper>
        <PlacesPanel
          exhibits={exhibits}
          facilities={facilities}
          mapMode={mapMode}
          detailedPlace={detailedPlace}
          locationEnabled={locationEnabled}
          clearPlaceInfo={this.clearPlaceInfo}
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
