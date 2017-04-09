import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// Components
import Carousel from 'components/Carousel';
import Button from 'components/Button';

// Global Selectors
import {
  makeSelectUser,
  makeSelectMapMode,
  makeSelectExhibits,
  makeSelectCurrentPlace,
} from 'containers/App/selectors';

// Dispatches
import {
  dispatchChangeMapCenter,
  dispatchChangeCurrentPlace,
  dispatchChangeMapMode,
} from 'containers/App/dispatches';

import { filterExhibitsBy } from 'utils/helpers';

// Local Containers
import Item from './Item';

// Local Components
import { Wrapper } from './styles';

export class Panel extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.renderPlaces = this.renderPlaces.bind(this);
  }

  renderPlaces(places) {
    const { currentPlace, onSelectPlace } = this.props;
    const detailedPlace = (typeof currentPlace === 'object') ? currentPlace : currentPlace.toJS();

    return places.map((place) => { // eslint-disable-line
      return (
        <Item
          key={place.id}
          place={place}
          currentPlace={detailedPlace}
          onClickEvent={onSelectPlace}
        />
      );
    });
  }

  render() {
    const { mapMode, exhibits, onChangeMapMode } = this.props;

    const exhibitsObj = exhibits.toJS();

    if (!exhibits) return null;

    // Initialize places
    let places;

    // For Itinerary
    const property = 'subType'; // Filter with subType
    const bookmarked = 'bookmarked'; // Value bookmarked
    const recommended = 'recommended'; // Value recommended

    // Verify mapMode
    switch (mapMode) {
      // If mode is Discover
      case 'Discover':
        // We want to just show recommended places
        places = filterExhibitsBy(exhibitsObj, property, recommended);
        break;
      // If mode is Itinerary
      case 'Itinerary':
        // We want to just show bookmarked places
        places = filterExhibitsBy(exhibitsObj, property, bookmarked);
        break;
      // Otherwise mode is Discover
      default:
        // We don't want to show cards
        places = [];
        break;
    }

    // If in itinerary with no places
    if (places.length === 0 && mapMode === 'Itinerary') {
      // Return a button that changes map to discover
      return (
        <Wrapper>
          <Button
            icon={'ion-plus'}
            btnClasses={'rounded special full'}
            name={'Add Activities To Your Itinerary'}
            onClickEvent={() => {
              onChangeMapMode('Discover');
            }}
          />
        </Wrapper>
      );
    } else if (places.length === 0) {
      // If no places return null
      return null;
    }

    // Otherwise return places in carousel
    return (
      <Wrapper full>
        <Carousel
          decorators={[]}
          cellSpacing={15}
          slideWidth={0.85}
          cellAlign={'center'}
          edgeEasing={'easeOutCirc'}
        >
          { this.renderPlaces(places) }
        </Carousel>
      </Wrapper>
    );
  }
}

Panel.propTypes = {
  exhibits: T.object,
  mapMode: T.string,
  currentPlace: T.object,
  onSelectPlace: T.func,
  onChangeMapMode: T.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  mapMode: makeSelectMapMode(),
  exhibits: makeSelectExhibits(),
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
    onChangeMapMode: (mode) => dispatchChangeMapMode(dispatch, mode),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
