import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// Components
import Slider from 'components/Slider';

// Global Selectors
import {
  makeSelectUser,
  makeSelectMapMode,
  makeSelectExhibits,
  makeSelectCurrentPlace,
} from 'containers/App/selectors';

// Dispatches
import {
  dispatchSetMapCenter,
  dispatchChangeMapMode,
} from 'containers/App/dispatches';

import { filterExhibitsBy } from 'utils/helpers';

// Local Containers
import Item from './Item';

// Local Components
import { Wrapper, SlideList } from './styles';

export class Panel extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.renderPlaces = this.renderPlaces.bind(this);
  }

  renderPlaces(places) {
    const { currentPlace } = this.props;
    const detailedPlace = (typeof currentPlace === 'object') ? currentPlace : currentPlace.toJS();

    return places.map((place) => { // eslint-disable-line
      return (
        <SlideList key={place.id}>
          <Item
            place={place}
            currentPlace={detailedPlace}
          />
        </SlideList>
      );
    });
  }

  render() {
    const { mapMode, exhibits, onChangeMapCenter } = this.props;

    const exhibitsObj = exhibits.toJS();

    if (!exhibits) return null;

    // Initialize places
    let places;

    // For Itinerary
    const property = 'subType'; // Filter with subType
    const saved = 'saved'; // Value saved
    const recommended = 'recommended'; // Value recommended

    // Verify mapMode
    switch (mapMode) {
      // If mode is Discover
      case 'Recommended':
        // We want to just show recommended places
        places = filterExhibitsBy(exhibitsObj, property, recommended);
        break;
      default:
        // We want to just show saved places
        places = filterExhibitsBy(exhibitsObj, property, saved);
        break;
    }

    if (places.length === 0) {
      // If no places return null
      return null;
    }

    // Slider settings
    const settings = {
      arrows: false,
      speed: 500,
      slidesToShow: (places.length > 3) ? 4 : places.length,
      slidesToScroll: 1,
      className: 'center',
      centerMode: true,
      centerPadding: '20px',
      afterChange: (currentSlide) => {
        const place = places[currentSlide];
        const center = {
          lat: place.lat,
          lng: place.lng,
        };

        onChangeMapCenter(center);
      },
      responsive: [{
        breakpoint: 1170,
        settings: {
          slidesToShow: (places.length > 2) ? 3 : places.length,
        },
      }, {
        breakpoint: 800,
        settings: {
          slidesToShow: (places.length > 1) ? 2 : places.length,
        },
      }, {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
      ],
    };

    // Otherwise return places in carousel
    return (
      <Wrapper full>
        <Slider {...settings}>
          {this.renderPlaces(places)}
        </Slider>
      </Wrapper>
    );
  }
}

Panel.propTypes = {
  exhibits: T.object,
  mapMode: T.string,
  currentPlace: T.object,
  onChangeMapCenter: T.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  mapMode: makeSelectMapMode(),
  exhibits: makeSelectExhibits(),
  currentPlace: makeSelectCurrentPlace(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeMapMode: (mode) => dispatchChangeMapMode(dispatch, mode),
    onChangeMapCenter: (center) => dispatchSetMapCenter(dispatch, center),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
