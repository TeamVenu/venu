import React, { PropTypes as T, Component } from 'react';
import GoogleMap from 'google-map-react';
import Marker from 'components/Markers';

export default class Map extends Component {
  // Specifies the type of each prop
  static propTypes = {
    apiKey: T.string,
    center: T.object,
    zoom: T.number,
    places: T.array,
  };

  // Set some default props
  static defaultProps = {
    apiKey: 'AIzaSyCC_hT5gMai_hZh8JSnlFzFOCTetRBYhQg',
    center: {
      lat: 43.085190399999995,
      lng: -77.6768412,
    },
    zoom: 19,
  };

  /**
   * renderMarkers
   * Checks to see if there are places props in Map
   * If there are then it displays Markers for each place
   */
  renderMarkers() {
    if (!this.props.places) { return null; }
    return this.props.places.map(place => { //eslint-disable-line
      return (
        <Marker
          key={place.id}
          lat={place.location.latitude}
          lng={place.location.longitude}
          {...place}
        />
      );
    });
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
        {this.renderMarkers()}
      </GoogleMap>
    );
  }
}

