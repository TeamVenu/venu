import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// Components
import Slider from 'components/Slider';
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
import { Wrapper, SlideList, ButtonWrapper } from './styles';

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
    const { mapMode, exhibits, onChangeMapMode } = this.props;

    const exhibitsObj = exhibits.toJS();

    if (!exhibits) return null;

    // Initialize places
    let places;

    // For Itinerary
    const property = 'subType'; // Filter with subType
    const saved = 'saved'; // Value saved
    const recommended = 'recommended'; // Value recommended

    // Slider settings
    const settings = {
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [{
        breakpoint: 1170,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      }, {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      }, {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      ],
    };

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

    // If in itinerary with no places
    if (places.length === 0 && mapMode === 'All') {
      // Return a button that changes map to discover
      return (
        <ButtonWrapper>
          <Button
            icon={'ion-plus'}
            btnClasses={'rounded special full'}
            name={'Find recommended activities'}
            onClickEvent={() => {
              const e = {
                target: {
                  textContent: 'Recommended',
                },
              };

              onChangeMapMode(e);
            }}
          />
        </ButtonWrapper>
      );
    } else if (places.length === 0) {
      // If no places return null
      return null;
    }

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

// <Carousel
//   decorators={[]}
//   cellSpacing={15}
//   slideWidth={0.85}
//   cellAlign={'center'}
//   edgeEasing={'easeOutCirc'}
// >
//   { this.renderPlaces(places) }
// </Carousel>
Panel.propTypes = {
  exhibits: T.object,
  mapMode: T.string,
  currentPlace: T.object,
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
    onSelectPlace2: (place) => {
      const center = {
        lat: place.lat,
        lng: place.lng,
      };
      dispatchChangeCurrentPlace(dispatch, place);
      dispatchChangeMapCenter(dispatch, center);
    },
    onSelectPlace: (place) => {
      const center = {
        lat: place.lat,
        lng: place.lng,
      };

      dispatchChangeMapCenter(dispatch, center);
    },
    onChangeMapMode: (mode) => dispatchChangeMapMode(dispatch, mode),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
