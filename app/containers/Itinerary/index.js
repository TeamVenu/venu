/*
 * Itinerary
 */

import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';
import Ionicon from 'react-ionicons';
import styled from 'styled-components';

// Components
import A from 'components/A';
import H2 from 'components/H2';
import Card from 'components/Card';
import TabBar from 'components/TabBar';
import Container from 'components/Header';
import TabBarList from 'components/TabBarList';
import SmallWrapper from 'components/SmallWrapper';

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

const List = styled.ul`
  margin: 0 0 calc(var(--topbar-height) * 1.5) 0;
  padding: 0;
  list-style-type: 0;
`;

const Item = styled.li`
  border-bottom: 1px solid var(--light-gray);
`;

export class Itinerary extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.renderExhibits = this.renderExhibits.bind(this);
    this.renderExhibitList = this.renderExhibitList.bind(this);
  }

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

  renderExhibits(exhibits) {
    return exhibits.map((exhibit) => { // eslint-disable-line
      const room = (isNaN(exhibit.location) && isNaN(exhibit.location.charAt(1)))
        ? exhibit.location
        : exhibit.exhibitCode;

      const location = `${exhibit.building}, ${room}`;
      const link = `/${exhibit.type}/${exhibit.colorZone}/${exhibit.exhibitCode}/${exhibit.key}`;
      const place = {
        link,
        location,
        place: exhibit,
        name: exhibit.name,
        zone: exhibit.imagineRitArea,
        zoneClass: exhibit.colorZone,
      };

      return (
        <Item key={exhibit.id}>
          <Card place={place} cardClass={'full'} />
        </Item>
      );
    });
  }

  renderExhibitList() {
    const { exhibitProps } = this.props;
    const allExhibits = (exhibitProps.artisticAlley) ? exhibitProps : exhibitProps.toJS();
    const property = 'subType';
    // Make exhibits with property of bookmark first then visited
    const exhibits = filterExhibitsBy(allExhibits, property, 'saved').concat(filterExhibitsBy(allExhibits, property, 'visited'));

    if (exhibits.length === 0) {
      return (
        <SmallWrapper className={'.centered-text'} padding>
          <A to={'/'} className={'btn full rounded special'}>
            <Ionicon icon={'icon ion-plus'} />
            Find exhibits
          </A>
        </SmallWrapper>
      );
    }

    return (
      <List>
        { this.renderExhibits(exhibits) }
      </List>
    );
  }

  render() {
    const { userProps, isSignedIn } = this.props;
    const user = (userProps.location) ? userProps : userProps.toJS();
    if (!isSignedIn || !isUserOnboardingComplete(user)) return null;

    return (
      <div>
        <Container>
          <TabBar>
            <TabBarList className={'header'}>
              <li />
              <li>
                <H2 className={'title'}>Itinerary</H2>
              </li>
              <li />
            </TabBarList>
          </TabBar>
        </Container>
        { this.renderExhibitList() }
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
