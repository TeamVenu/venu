import React, { PropTypes as T, Component } from 'react';
import GoogleMap from 'google-map-react';
import Marker from 'components/Markers';
import UserIcon from 'media/icons/user.png';
import { getFacilitiesArray, getPlacesArray, filterExhibitsBy } from 'utils/helpers';
import mapStyles from 'fixtures/map-styles.json';
import { UserPinWrapper, UserPin, UserImage } from './styles';

const MARKER_SIZE = 40;

export default class Map extends Component {
  // Specifies the type of each prop
  static propTypes = {
    zoom: T.number,
    center: T.object,
    mapMode: T.string.isRequired,
    exhibits: T.object.isRequired,
    facilities: T.object.isRequired,
    userLocation: T.object,
    bootStrapURLKeys: T.object,
    defaultCenter: T.object,
    defaultZoom: T.number,
    onBoundsChange: T.func,
    onCenterChange: T.func,
    onZoomChange: T.func,
    currentMarker: T.object,
    clickOnPlaceCard: T.func,
  };

  // Set some default props
  static defaultProps = {
    defaultCenter: {
      lat: 43.084167,
      lng: -77.677085,
    },
    defaultZoom: 20,
    bootStrapURLKeys: {
      key: 'AIzaSyCC_hT5gMai_hZh8JSnlFzFOCTetRBYhQg',
      language: 'en',
    },
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  onBoundsChange(center, zoom) {
    this.props.onCenterChange(center);
    this.props.onZoomChange(zoom);
  }

  onChildMouseEnter() {

  }

  onChildMouseLeave() {

  }

  distanceToMouse(markerPosition, mousePosition, markerProps) {
    const x = markerPosition.x;

    const y = markerPosition.y - MARKER_SIZE;

    const distanceCoefficient = markerProps.type !== 'event' ? 1.5 : 1;

    const horizontalDistance = (x - mousePosition.x) * (x - mousePosition.x);
    const verticalDistance = (y - mousePosition.y) * (y - mousePosition.y);

    return distanceCoefficient * Math.sqrt(horizontalDistance + verticalDistance);
  }

  createMapOptions(maps) {
    return {
      clickableIcons: true,
      zoomControl: true,
      zoomControlOptions: {
        position: maps.ControlPosition.RIGHT_CENTER,
      },
      styles: mapStyles,
    };
  }

  handleClick() {
    // if (!this.props.clearPlaceInfo) return;
    // this.props.clearPlaceInfo();
  }

  /**
   * renderPlaces
   * Checks to see if there are places props in Map
   * If there are then it displays Markers for each place
   */
  renderPlaces() {
    // Get the props
    const { exhibits, facilities, mapMode } = this.props;

    if (!exhibits || !facilities || !mapMode) { return null; }

    // Initialize places
    let places;
    // For Itinerary
    const property = 'subType'; // Filter with subType
    const value = 'bookmarked'; // Value bookmarked

    // Verify mapMode
    switch (mapMode) {
      // If mode is Itinerary
      case 'Itinerary':
        // We want to just show bookmarked places
        places = filterExhibitsBy(exhibits, property, value);
        break;
      // If mode is Facilities
      case 'Facilities':
        // We want to just show facilities
        places = getFacilitiesArray(facilities);
        break;
      // Otherwise mode is Discover
      default:
        // We want to show all places
        places = getPlacesArray(exhibits, facilities);
        break;
    }

    return places.map((place) => { //eslint-disable-line
      return (
        <Marker
          key={place.id}
          lat={place.lat}
          lng={place.lng}
          place={place}
          currentMarker={this.props.currentMarker}
          clickOnPlaceCard={this.props.clickOnPlaceCard}
        />
      );
    });
  }

  renderUser() {
    const { userLocation } = this.props;

    if (!userLocation) return null;

    return (
      <UserPinWrapper lat={userLocation.lat} lng={userLocation.lng}>
        <UserPin>
          <UserImage alt="Profile picture" src={UserIcon} />
        </UserPin>
      </UserPinWrapper>
    );
  }

  /**
   * render
   * Returns the GoogleMap component to render
   */
  render() {
    return (
      <GoogleMap
        bootstrapURLKeys={this.props.bootStrapURLKeys}
        defaultCenter={this.props.defaultCenter}
        defaultZoom={this.props.defaultZoom}
        options={this.createMapOptions}
        hoverDistance={MARKER_SIZE}
        distanceToMouse={this.distanceToMouse}
        center={this.props.center}
        zoom={this.props.zoom}
        onBoundsChange={this.props.onBoundsChange}
      >
        {this.renderPlaces()}
        {this.renderUser()}
      </GoogleMap>
    );
  }
}

