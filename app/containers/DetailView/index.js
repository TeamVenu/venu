import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';

import Map from 'components/Map';


// Global Selectors
import {
  makeSelectVenuMap,
  makeSelectExhibits,
  makeSelectFacilities,
  makeSelectIsSignedIn,
  makeSelectCurrentPlace,
} from 'containers/App/selectors';

// Dispacthes
import { dispatchGetAuthenticatedUser } from 'containers/App/dispatches';

// Local Components
import Header from './Header';
import Detail from './Detail';

import { MapWrapper } from './styles';

export class DetailView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const { onGetAuthenticatedUser } = this.props;
    // Check if user is logged in
    onGetAuthenticatedUser();
  }

  componentDidUpdate() {
    const { isSignedIn } = this.props;

    if (!isSignedIn) {
      browserHistory.push('/login');
    }
  }

  render() {
    const { venuMap, location, allExhibits, allFacilities } = this.props;
    const mapProps = (venuMap.options) ? venuMap : venuMap.toJS();
    const { pathname } = location;
    const pathArray = pathname.split('/').splice(1);
    const zone = pathArray[1];
    const exhibits = (allExhibits.artisticAlley) ? allExhibits : allExhibits.toJS();
    const facilities = (allFacilities.restroom) ? allFacilities : allFacilities.toJS();

    let place = null;

    switch (pathArray[0]) {
      case 'exhibit':
        place = exhibits[pathArray[1]][pathArray[3]];
        break;
      case 'facility':
        place = facilities[pathArray[2]][pathArray[3]];
        break;
      default:
        place = null;
        break;
    }

    if (!place) return null;
    const markers = [place];
    const center = {
      lat: place.lat,
      lng: place.lng,
    };

    return (
      <section className={zone}>
        <Header place={place} />
        <MapWrapper>
          <Map
            containerElement={
              <div style={{ height: '100%' }} />
            }
            mapElement={
              <div style={{ height: '100%' }} />
            }
            center={center}
            markers={markers}
            mapProps={mapProps}
          />
        </MapWrapper>
        <Detail currentPlace={place} />
      </section>
    );
  }
}

DetailView.propTypes = {
  venuMap: T.object.isRequired,
  location: T.object.isRequired,
  isSignedIn: T.bool.isRequired,
  allExhibits: T.object.isRequired,
  allFacilities: T.object.isRequired,
  onGetAuthenticatedUser: T.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  venuMap: makeSelectVenuMap(),
  allExhibits: makeSelectExhibits(),
  allFacilities: makeSelectFacilities(),
  isSignedIn: makeSelectIsSignedIn(),
  currentPlace: makeSelectCurrentPlace(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onGetAuthenticatedUser: () => dispatchGetAuthenticatedUser(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailView);
