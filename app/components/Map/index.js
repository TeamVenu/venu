import React, { PropTypes as T, Component } from 'react';
import GoogleMap from 'google-map-react';
import Marker from 'components/Markers';
import styled from 'styled-components';

const UserPin = styled.div`
  width: 20px;
  min-width: 20px;
  height: 20px;
  border: 2px solid #e74c3c;
  background: #e74c3c;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:hover {
    background: var(--white);
  }
`;

const MARKER_SIZE = 40;

export default class Map extends Component {
  // Specifies the type of each prop
  static propTypes = {
    bootStrapURLKeys: T.object,
    center: T.object,
    zoom: T.number,
    places: T.array,
    facilities: T.array,
    defaultCenter: T.object,
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
    bootStrapURLKeys: {
      key: 'AIzaSyCC_hT5gMai_hZh8JSnlFzFOCTetRBYhQg',
      language: 'en',
    },
    zoom: 17,
  };

  constructor(props) {
    super(props);

    this.clickEvent = this.clickEvent.bind(this);
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
      styles: [
        { stylers: [{ visibility: 'off' }] },
        { featureType: 'water', stylers: [{ visibility: 'on' }] },
        { featureType: 'poi', stylers: [{ visibility: 'on' }] },
        { featureType: 'transit', stylers: [{ visibility: 'on' }] },
        { featureType: 'landscape', stylers: [{ visibility: 'on' }] },
        { featureType: 'road', stylers: [{ visibility: 'on' }] },
        { featureType: 'administrative', stylers: [{ visibility: 'on' }] },
        {
          elementType: 'geometry',
          stylers: [{ color: '#1f1e1f' }],
        },
        {
          elementType: 'labels.text.stroke',
          stylers: [{ color: '#1f1f1f' }],
        },
        {
          elementType: 'labels.text.fill',
          stylers: [{ color: '#f1f1f1' }],
        },
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }],
        },
        {
          featureType: 'landscape.man_made',
          elementType: 'geometry.fill',
          stylers: [{ color: '#2b2b2b' }],
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{ color: '#333333' }],
        },
        // {
        //   featureType: 'transit',
        //   elementType: 'labels.icon',
        //   stylers: [{ visibility: 'off' }],
        // },
      ],
    };
  }

  clickEvent() {
    this.props.clearPlaceInfo();
  }

  /**
   * renderEventMarkers
   * Checks to see if there are places props in Map
   * If there are then it displays Markers for each place
   */
  renderEventMarkers() {
    if (!this.props.places) { return null; }
    return this.props.places.map(place => { //eslint-disable-line
      return (
        <Marker
          key={place.id}
          type={'event'}
          lat={place.location.latitude}
          lng={place.location.longitude}
          {...place}
          currentMarker={this.props.currentMarker}
          clickOnPlaceCard={this.props.clickOnPlaceCard}
        />
      );
    });
  }

  renderFacilityMarkers() {
    if (!this.props.facilities) { return null; }
    return this.props.facilities.map(place => { //eslint-disable-line
      return (
        <Marker
          key={place.id}
          type={'facility'}
          lat={place.location.latitude}
          lng={place.location.longitude}
          currentMarker={this.props.currentMarker}
          clickOnPlaceCard={this.props.clickOnPlaceCard}
          {...place}
        />
      );
    });
  }

  renderUser() {
    const center = {
      lat: 43.084167,
      lng: -77.677085,
    };

    return (
      <UserPin lat={center.lat} lng={center.lng} />
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
        defaultZoom={this.props.zoom}
        options={this.createMapOptions}
        hoverDistance={MARKER_SIZE}
        distanceToMouse={this.distanceToMouse}
        center={this.props.center}
        onBoundsChange={this.props.onBoundsChange}
        onClick={this.clickEvent}
      >
        {this.renderEventMarkers()}
        {this.renderFacilityMarkers()}
        {this.renderUser()}
      </GoogleMap>
    );
  }
}

