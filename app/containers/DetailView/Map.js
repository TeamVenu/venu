import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import GoogleMap from 'google-map-react';

// Global Selectors
import { makeSelectVenuMap } from 'containers/App/selectors';

// Components
import Marker from 'components/Markers';

// Import local styles
import { MapWrapper } from './styles';

export class VenuMap extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { place, venuMap } = this.props;

    // Convert venuMap to a JS object
    const mapProps = venuMap.toJS();
    const options = Object.assign(mapProps.options, { draggable: false, scrollwheel: false });
    const zoom = 18;
    const center = {
      lat: place.lat,
      lng: place.lng,
    };

    // Instead of creating a whole new map
    // We could look into Google Static Maps
    // Which return an image
    return (
      <MapWrapper>
        <GoogleMap
          bootstrapURLKeys={mapProps.bootstrapURLKeys}
          zoom={zoom}
          options={options}
          center={center}
        >
          <Marker
            place={place}
            key={place.id}
            lat={place.lat}
            lng={place.lng}
            mode={'Default'}
            onClickEvent={() => {}}
          />
        </GoogleMap>
      </MapWrapper>
    );
  }
}

VenuMap.propTypes = {
  venuMap: T.object,
  place: T.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  venuMap: makeSelectVenuMap(),
});

export default connect(mapStateToProps)(VenuMap);
