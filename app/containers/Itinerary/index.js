/*
 * Itinerary
 */

import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';

// Components
import A from 'components/A';
import H2 from 'components/H2';
import TabBar from 'components/TabBar';
import Container from 'components/Header';
import TabBarList from 'components/TabBarList';

// Containers

// Selectors
import {
  makeSelectUser,
  makeSelectIsSignedIn,
  makeSelectExhibits,
} from 'containers/App/selectors';

// Dispacthes
import { dispatchGetAuthenticatedUser } from 'containers/App/dispatches';

// Helpers
import { filterExhibitsBy, isUserOnboardingComplete } from 'utils/helpers';

// Local

export class Itinerary extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const { onGetAuthenticatedUser } = this.props;
    onGetAuthenticatedUser();
  }

  componentDidUpdate() {
    const { userProps, isSignedIn } = this.props;
    const user = (userProps.location) ? userProps : userProps.toJS();

    if (!isSignedIn || !isUserOnboardingComplete(user)) {
      browserHistory.push('/login');
    }
  }

  renderExhibitList(exhibits) {
    return exhibits.map((exhibit) => { // eslint-disable-line
      return (
        <li key={exhibit.id}>
          <A to={`/place/${exhibit.type}/${exhibit.id}`}>{exhibit.name}</A>
        </li>
      );
    });
  }

  render() {
    const { userProps, isSignedIn, exhibitProps } = this.props;
    const user = (userProps.location) ? userProps : userProps.toJS();

    if (!isSignedIn || !isUserOnboardingComplete(user)) return null;

    const allExhibits = (exhibitProps.artisticAlley) ? exhibitProps : exhibitProps.toJS();
    const property = 'subType';
    const bookmarked = 'bookmarked';
    const exhibits = filterExhibitsBy(allExhibits, property, bookmarked);

    if (exhibits.length > 0) {
      return (
        <div>
          <Container>
            <TabBar borderless>
              <TabBarList className={'header'}>
                <li />
                <li>
                  <H2 className={'title'}>Itinerary</H2>
                </li>
                <li />
              </TabBarList>
            </TabBar>
          </Container>
          { this.renderExhibitList(exhibits) }
        </div>
      );
    }
    return (
      <div>
        <Container>
          <TabBar borderless>
            <TabBarList className={'header'}>
              <li />
              <li>
                <H2 className={'title'}>Itinerary</H2>
              </li>
              <li />
            </TabBarList>
          </TabBar>
        </Container>
        <A
          to={'/'}
          className={'btn rounded bordered full'}
        >
          Add Activities To Your Itinerary
        </A>
      </div>
    );
  }
}

Itinerary.propTypes = {
  isSignedIn: T.bool,
  exhibitProps: T.object,
  userProps: T.object.isRequired,
  onGetAuthenticatedUser: T.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userProps: makeSelectUser(),
  isSignedIn: makeSelectIsSignedIn(),
  exhibitProps: makeSelectExhibits(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onGetAuthenticatedUser: () => dispatchGetAuthenticatedUser(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);
