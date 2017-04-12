import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';

// Components
import H2 from 'components/H2';
import Button from 'components/Button';
import TabBar from 'components/TabBar';
import Container from 'components/Header';
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
    const { place } = this.props;
    const { goBack } = browserHistory;

    return (
      <Container>
        <TabBar>
          <TabBarList className={'header'}>
            <li>
              <Button
                btnClasses={'large'}
                icon={'ion-ios-arrow-back'}
                onClickEvent={goBack}
              />
            </li>
            <li>
              <H2 className={'title'}>{ place.name }</H2>
            </li>
            <li>
              <Button
                btnClasses={'large'}
                icon={'ion-ios-heart-outline'}
              />
            </li>
          </TabBarList>
        </TabBar>
      </Container>
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
