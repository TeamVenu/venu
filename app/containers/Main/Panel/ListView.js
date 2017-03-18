import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// Global Selectors
import {
  makeSelectUser,
  makeSelectMapMode,
  makeSelectExhibits,
  makeSelectFacilities,
  makeSelectCurrentPlace,
} from 'containers/App/selectors';

// Dispatches
import {
  dispatchChangeMapCenter,
  dispatchChangeCurrentPlace,
} from 'containers/App/dispatches';

import {
  filterExhibitsBy,
  getFacilitiesArray,
} from 'utils/helpers';

import Item from './Item';
import { ListView as List } from './styles';

export class ListView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.renderPlaces = this.renderPlaces.bind(this);
  }

  renderPlaces() {
    const { mapMode, exhibits, facilities, currentPlace, onSelectPlace } = this.props;

    const exhibitsObj = exhibits.toJS();
    const facilitiesObj = facilities.toJS();

    if (!exhibits || !facilities) return null;

        // Initialize places
    let places;

    // For Itinerary
    const property = 'subType'; // Filter with subType
    const bookmarked = 'bookmarked'; // Value bookmarked
    const recommended = 'recommended'; // Value recommended

    // Verify mapMode
    switch (mapMode) {
      // If mode is Itinerary
      case 'Itinerary':
        // We want to just show bookmarked places
        places = filterExhibitsBy(exhibitsObj, property, bookmarked);
        break;
      // If mode is Facilities
      case 'Facilities':
        // We want to just show facilities
        places = getFacilitiesArray(facilitiesObj);
        break;
      // Otherwise mode is Discover
      default:
        // We want to just show bookmarked places
        places = filterExhibitsBy(exhibitsObj, property, recommended);
        break;
    }

    return places.map((place) => { // eslint-disable-line
      return (
        <Item
          key={place.id}
          place={place}
          currentPlace={currentPlace.toJS()}
          onClickEvent={onSelectPlace}
        />
      );
    });
  }

  render() {
    return (
      <List>
        { this.renderPlaces() }
      </List>
    );
  }
}

ListView.propTypes = {
  // user: T.object,
  exhibits: T.object,
  facilities: T.object,
  mapMode: T.string,
  currentPlace: T.object,
  onSelectPlace: T.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  mapMode: makeSelectMapMode(),
  exhibits: makeSelectExhibits(),
  facilities: makeSelectFacilities(),
  currentPlace: makeSelectCurrentPlace(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSelectPlace: (place) => {
      const center = {
        lat: place.lat,
        lng: place.lng,
      };
      dispatchChangeCurrentPlace(dispatch, place);
      dispatchChangeMapCenter(dispatch, center);
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListView);
