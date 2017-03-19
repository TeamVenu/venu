import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';

// Global Selectors
import {
  makeSelectUser,
  makeSelectVenuMap,
  makeSelectExhibits,
  makeSelectFacilities,
  makeSelectCurrentPlace,
} from 'containers/App/selectors';

// Local Components
import Header from './Header';
import Map from './Map';
import Detail from './Detail';

import { ViewWrapper } from './styles';

export class DetailView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const { place } = this.props;

    // If no place redirect back to main
    if (place === {} || place.size === 0) {
      // Redirect to onboarding
      browserHistory.push({
        pathname: '/',
      });
    }
  }

  render() {
    const { place } = this.props;

    if (place === {} || place.size === 0) return null;
    return (
      <ViewWrapper className={place.colorZone}>
        <Header />
        <Map />
        <Detail />
      </ViewWrapper>
    );
  }
}

DetailView.propTypes = {
  place: T.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  venuMap: makeSelectVenuMap(),
  exhibits: makeSelectExhibits(),
  facilities: makeSelectFacilities(),
  place: makeSelectCurrentPlace(),
});

export default connect(mapStateToProps)(DetailView);
