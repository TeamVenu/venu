import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';

// Components
import Button from 'components/Button';
import TabBar from 'components/TabBar';
import TabBarList from 'components/TabBarList';

// Global Selectors
import {
  makeSelectUser,
} from 'containers/App/selectors';

// Dispatches
import {
  dispatchChangeCurrentPlace,
} from 'containers/App/dispatches';

export class Header extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { goBack } = browserHistory;

    return (
      <TabBar absolute borderless transparent>
        <TabBarList className={'header'}>
          <li>
            <Button
              btnClasses={'large reversed'}
              icon={'ion-ios-arrow-back'}
              onClickEvent={goBack}
            />
          </li>
          <li />
          <li />
        </TabBarList>
      </TabBar>
    );
  }
}

Header.propTypes = {
  place: T.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onGoBack: (currentPlace) => dispatchChangeCurrentPlace(dispatch, currentPlace),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
