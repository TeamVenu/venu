import React, { PropTypes as T, Component } from 'react';

import GoogleMap from 'google-map-react';
import Marker from 'components/Markers';

export default class Map extends Component {
  static propTypes = {
    apiKey: T.string,
    center: T.object,
    zoom: T.number,
    pinCoords: T.any,
  };

  static defaultProps = {
    apiKey: 'AIzaSyCC_hT5gMai_hZh8JSnlFzFOCTetRBYhQg',
    center: {
      lat: 43.085190399999995,
      lng: -77.6768412,
    },
    zoom: 18,
    pinCoords: {
      lat: 43.085190399999995,
      lng: -77.6768412,
    },
  };

  render() {
    return (
      <GoogleMap
        bootstrapURLKeys={this.props.apiKey}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        <Marker
          {...this.props.pinCoords}
          text={'Bathroom'}
        />
      </GoogleMap>
    );
  }
}
