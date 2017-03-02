import React, { PropTypes as T, Component } from 'react';
import GoogleMap from 'google-map-react';
import Marker from 'components/Markers';
import UserIcon from 'media/icons/user.png';
import mapStyles from 'fixtures/map-styles.json';
import { UserPinWrapper, UserPin, UserImage, UserInfo } from './styles';


const MARKER_SIZE = 40;

export default class Map extends Component {
  // Specifies the type of each prop
  static propTypes = {
    bootStrapURLKeys: T.object,
    center: T.object,
    userLocation: T.object,
    zoom: T.number,
    places: T.array,
    defaultCenter: T.object,
    defaultZoom: T.number,
    onBoundsChange: T.func,
    onCenterChange: T.func,
    onZoomChange: T.func,
    currentMarker: T.object,
    clearPlaceInfo: T.func,
    clickOnPlaceCard: T.func,
  };

  // Set some default props
  static defaultProps = {
    defaultCenter: {
      lat: 43.084167,
      lng: -77.677085,
    },
    defaultZoom: 17,
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
    this.props.clearPlaceInfo();
  }

  /**
   * renderPlaces
   * Checks to see if there are places props in Map
   * If there are then it displays Markers for each place
   */
  renderPlaces() {
    const { places } = this.props;

    if (!places) { return null; }

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

    return (
      <UserPinWrapper lat={userLocation.lat} lng={userLocation.lng}>
        <UserPin>
          <UserImage alt="Profile picture" src={UserIcon} />
        </UserPin>
        <UserInfo>
          <p>My Location</p>
        </UserInfo>
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
        onClick={this.handleClick}
      >
        {this.renderPlaces()}
        {this.renderUser()}
      </GoogleMap>
    );
  }
}

