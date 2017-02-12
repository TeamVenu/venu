import React, { PropTypes as T, Component } from 'react';

import GoogleMap from 'google-map-react';
import Marker from 'components/Markers';

export default class Map extends Component {
  static propTypes = {
    apiKey: T.string,
    center: T.object,
    zoom: T.number,
    places: T.array,
  };

  static defaultProps = {
    apiKey: 'AIzaSyCC_hT5gMai_hZh8JSnlFzFOCTetRBYhQg',
    center: {
      lat: 43.085190399999995,
      lng: -77.6768412,
    },
    zoom: 17,
    places: [{
      lat: 43.085190399999995,
      lng: -77.6768412,
      title: 'James E. Booth',
    },
    {
      lat: 43.0837819,
      lng: -77.6761046,
      title: 'Wallace Library',
    }],
  };

  render() {
    return (
      <GoogleMap
        bootstrapURLKeys={this.props.apiKey}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
      {this.props.places.map((place) => { //eslint-disable-line
        return (
          <Marker
            {...place}
          />
        );
      })}
      </GoogleMap>
    );
  }
}

