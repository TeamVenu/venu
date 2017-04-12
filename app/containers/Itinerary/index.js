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
import TabBar from 'components/TabBar';
import Container from 'components/Header';
import TabBarList from 'components/TabBarList';
import SmallWrapper from 'components/SmallWrapper';
import TabBarActions from 'components/TabBarActions';
import Card from 'components/Card';

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
import messages from './messages';

// Selectors
import { makeSelectMode } from './selectors';

// Dispatches
import { dispatchSetExhibitMode } from './dispatches';

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

    this.renderTabList = this.renderTabList.bind(this);
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
      const distance = `${exhibit.distance} mi`;
      const link = `/${exhibit.type}/${exhibit.colorZone}/${exhibit.exhibitCode}/${exhibit.key}`;

      const place = {
        link,
        location,
        distance,
        name: exhibit.name,
        zone: exhibit.imagineRitArea,
        zoneClass: exhibit.colorZone,
      };
      return (
        <Item key={exhibit.id}>
          <Card place={place} />
        </Item>
      );
    });
  }

  renderExhibitList() {
    const { mode, exhibitProps } = this.props;
    const allExhibits = (exhibitProps.artisticAlley) ? exhibitProps : exhibitProps.toJS();
    const property = 'subType';
    let subType = '';

    switch (mode) {
      case 'Visited':
        subType = 'visited';
        break;
      case 'Itinerary':
      default:
        subType = 'bookmarked';
        break;
    }

    const exhibits = filterExhibitsBy(allExhibits, property, subType);

    if (exhibits.length === 0) {
      const btnText = `Add Exhibits To Your ${mode} List`;

      return (
        <SmallWrapper className={'.centered-text'} padding>
          <A to={'/'} className={'btn full rounded special'}>
            <Ionicon icon={'icon ion-plus'} />
            { btnText }
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

  renderTabList() {
    const { mode, onSetMode } = this.props;
    const { modes } = messages;
    return modes.map((m) => { // eslint-disable-line
      const currentModeClass = (mode === m.defaultMessage) ? 'selected' : null;

      return (
        <li key={m.id} className={'tab'}>
          <TabBarActions
            className={currentModeClass}
            onClick={onSetMode}
          >
            { m.defaultMessage }
          </TabBarActions>
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
          <TabBar>
            <TabBarList two>
              { this.renderTabList() }
            </TabBarList>
          </TabBar>
        </Container>
        { this.renderExhibitList(exhibits) }
      </div>
    );
  }
}

Itinerary.propTypes = {
  isSignedIn: T.bool,
  exhibitProps: T.object,
  mode: T.string.isRequired,
  onSetMode: T.func.isRequired,
  userProps: T.object.isRequired,
  onGetAuthenticatedUser: T.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  mode: makeSelectMode(),
  userProps: makeSelectUser(),
  isSignedIn: makeSelectIsSignedIn(),
  exhibitProps: makeSelectExhibits(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSetMode: (e) => dispatchSetExhibitMode(dispatch, e),
    onGetAuthenticatedUser: () => dispatchGetAuthenticatedUser(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);
