import React, { PropTypes as T, Component } from 'react';
import GoogleMap from 'google-map-react';
import Marker from 'components/Markers';
import styled from 'styled-components';

const UserPin = styled.div`
  width: 20px;
  min-width: 20px;
  height: 20px;
  border: 2px solid var(--primary-color);
  background: var(--primary-color);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:hover {
    background: var(--white);
  }
`;

export default class Map extends Component {
  // Specifies the type of each prop
  static propTypes = {
    apiKey: T.string,
    center: T.object,
    zoom: T.number,
    places: T.array,
    facilities: T.array,
  };

  // Set some default props
  static defaultProps = {
    apiKey: 'AIzaSyCC_hT5gMai_hZh8JSnlFzFOCTetRBYhQg',
    center: {
      lat: 43.084167,
      lng: -77.677085,
    },
    zoom: 17,
  };

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
          {...place}
        />
      );
    });
  }


  renderUser() {
    const { center } = this.props;

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
        apiKey={this.props.apiKey}
        bootstrapURLKeys={this.props.apiKey}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        {this.renderEventMarkers()}
        {this.renderFacilityMarkers()}
        {this.renderUser()}
      </GoogleMap>
    );
  }
}

