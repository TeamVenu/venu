/*
 * Main
 *
 * This is the first thing users see of our App, at the '/' route
 */
import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Button from 'components/Button';

// Selectors
import {
  makeSelectUser,
  makeSelectError,
  makeSelectLoading,
  makeSelectVenuMap,
  makeSelectMapMode,
  makeSelectExhibits,
  makeSelectFacilities,
  makeSelectCurrentPlace,
} from 'containers/App/selectors';

import {
  dispatchChangeExhibit,
  dispatchGetUserLocation,
 } from 'containers/App/dispatches';

// Containers
import Header from './Header';
import VenuMap from './VenuMap';
import Panel from './Panel';

// Local components
import {
  Wrapper,
  MapWrapper,
} from './styles';

export class Main extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { user, exhibits, onChangeExhibit } = this.props;
    const exhibitsObj = (exhibits.artisticAlley) ? exhibits : exhibits.toJS();

    // For recommended exhibits
    // If recommended exhibits is greater than 1
    if (user.exhibits.recommended.length > 1) {
      // Go through recommended exhibits
      user.exhibits.recommended.forEach((recommended) => { // eslint-disable-line
        // If value is not empty
        if (recommended.length > 0) {
          // splice value
          const keys = recommended.split('-');

          // Make a place with the values
          const place = exhibitsObj[keys[0]][keys[1]];

          // If a place exists
          if (place) {
            // Change exhibit
            onChangeExhibit(place, 'recommended');
          }
        }
      });
    } // End recommended exhibits

    // For saved exhibits
    // If saved exhibits is greater than 1
    if (user.exhibits.saved.length > 1) {
      // Go through saved exhibits
      user.exhibits.saved.forEach((saved) => { // eslint-disable-line
        // If value is not empty
        if (saved.length > 0) {
          // splice value
          const keys = saved.split('-');

          // Make a place with the values
          const place = exhibitsObj[keys[0]][keys[1]];

          // If a place exists
          if (place) {
            // Change exhibit
            onChangeExhibit(place, 'saved');
          }
        }
      });
    } // End Saved exhibits

    // For visited exhibits
    // If visited exhibits is greater than 1
    if (user.exhibits.visited.length > 1) {
      // Go through visited exhibits
      user.exhibits.visited.forEach((visited) => { // eslint-disable-line
        // If value is not empty
        if (visited.length > 0) {
          // splice value
          const keys = visited.split('-');

          // Make a place with the values
          const place = exhibitsObj[keys[0]][keys[1]];

          // If a place exists
          if (place) {
            // Change exhibit
            onChangeExhibit(place, 'visited');
          }
        }
      });
    } // End visited exhibits
  }

  render() {
    const { user, onGetUserLocation } = this.props;

    return (
      <section>
        <MapWrapper>
          <VenuMap />
        </MapWrapper>
        <Wrapper>
          <Header />
          <Button
            btnClasses={'fab'}
            icon={'ion-android-locate'}
            onClickEvent={() => { onGetUserLocation(user); }}
          />
          <Panel />
        </Wrapper>
      </section>
    );
  }
}

Main.propTypes = {
  user: T.object,
  // mapMode: T.string,
  // venuMap: T.object,
  exhibits: T.object,
  // facilities: T.object,
  // currentPlace: T.object,
  onChangeExhibit: T.func.isRequired,
  onGetUserLocation: T.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  error: makeSelectError(),
  loading: makeSelectLoading(),
  mapMode: makeSelectMapMode(),
  venuMap: makeSelectVenuMap(),
  exhibits: makeSelectExhibits(),
  facilities: makeSelectFacilities(),
  currentPlace: makeSelectCurrentPlace(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onGetUserLocation: (user) => dispatchGetUserLocation(dispatch, user),
    onChangeExhibit: (p, subType) => {
      // Make a new place object
      // Make sure we don't mutate te old object
      // To do this we user Object.assing({}, ...)
      const place = Object.assign({}, p, { previousSubType: p.subType, subType });
      dispatchChangeExhibit(dispatch, place);
    },
  };
}

// Connect our props to Main
export default connect(mapStateToProps, mapDispatchToProps)(Main);
