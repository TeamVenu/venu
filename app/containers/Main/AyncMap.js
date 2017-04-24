import _ from 'lodash';
import React from 'react';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import Ionicon from 'react-ionicons';

const AsyncGoogleMap = _.flowRight(withScriptjs, withGoogleMap)((props) => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={17}
    defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
  >
    {props.markers.map((marker) => (
      <Marker
        {...marker}
      />
    ))}
  </GoogleMap>
));

export class AsyncMap extends React.Component { // esling-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleMapLoad = this.handleMapLoad.bind(this);

    this.state = {
      markers: [{
        position: {
          lat: 25.0112183,
          lng: 121.52067570000001,
        },
        key: 'Taiwan',
        defaultAnimation: 2,
      }],
    };
  }

  handleMapLoad(map) {
    this._mapComponent = map; // eslint-disable-line

    if (map) {
      console.log(map.getZoom());
    }
  }

  render() {
    return (
      <AsyncGoogleMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg"
        loadingElement={
          <div style={{ height: '100%' }}>
            <Ionicon icon={'ion-load-d'} fontSize="60px" rotate />
          </div>
        }
        containerElement={
          <div style={{ height: '100%' }} />
        }
        mapElement={
          <div style={{ height: '100%' }} />
        }
        onMapLoad={this.handleMapLoad}
        markers={this.state.markers}
      />
    );
  }
}
