import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Ionicon from 'react-ionicons';
// import { fromJS } from 'immutable';

import H3 from 'components/H3';

// Global Selectors
import {
  makeSelectUser,
  makeSelectCurrentPlace,
} from 'containers/App/selectors';

// Dispatches
import {
  dispatchChangeCurrentPlace,
} from 'containers/App/dispatches';

import {
  Topbar,
  NavBar,
  NavItem,
  BackButton,
} from './styles';

export class Header extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { onGoBack } = this.props;

    // Create an empty immutable place
    const emptyPlace = {};

    return (
      <Topbar>
        <NavBar>
          <NavItem>
            <BackButton
              to={'/'}
              onClick={() => { onGoBack(emptyPlace); }}
            >
              <Ionicon icon={'ion-ios-arrow-thin-left'} />
            </BackButton>
          </NavItem>
          <NavItem>
            <H3>Detail View</H3>
          </NavItem>
          <NavItem>
            <Ionicon icon={'ion-ios-heart-outline'} />
          </NavItem>
        </NavBar>
      </Topbar>
    );
  }
}

Header.propTypes = {
  onGoBack: T.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  place: makeSelectCurrentPlace(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onGoBack: (place) => dispatchChangeCurrentPlace(dispatch, place),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
