/*
 * Profile
 */
import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';

// Components
import P from 'components/P';
import H2 from 'components/H2';
import H3 from 'components/H3';
import Tag from 'components/Tag';
import Button from 'components/Button';
import TabBar from 'components/TabBar';
import Container from 'components/Header';
import TabBarList from 'components/TabBarList';
import SmallWrapper from 'components/SmallWrapper';
import FullWrapper from 'components/FullWrapper';

// Media
import User from 'media/icons/pins/user.png';

// Containers

// Selectors
import {
  makeSelectUser,
  makeSelectExhibits,
  makeSelectIsSignedIn,
} from 'containers/App/selectors';

// Dispacthes
import {
  dispatchSignOutUser,
  dispatchGetAuthenticatedUser,
} from 'containers/App/dispatches';

// Helpers
import { filterExhibitsBy, isUserOnboardingComplete } from 'utils/helpers';

// Local
import {
  Header,
  ImageContainer,
  ProfileImage,
  StatisticsBarList,
  StatisticsBarListItem,
  SettingsList,
  SettingsItem,
  SettingsLink,
  TagsContainer,
} from './styles';

import messages from './messages';

export class Profile extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.renderUserInterests = this.renderUserInterests.bind(this);
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

  renderUserInterests() {
    const { userProps } = this.props;
    const user = (userProps.location) ? userProps : userProps.toJS();
    const { interests } = user;

    if (interests.length === 0) return null;

    return interests.map((interest, index) => { // eslint-disable-line
      if (interest.length <= 0) return null;

      return (
        <Tag key={index}>{interest}</Tag>
      );
    });
  }

  render() {
    const { userProps, isSignedIn, exhibitProps, onSignOut } = this.props;
    const user = (userProps.location) ? userProps : userProps.toJS();

    if (!isSignedIn || !isUserOnboardingComplete(user)) return null;
    const allExhibits = (exhibitProps.artisticAlley) ? exhibitProps : exhibitProps.toJS();

    const favoritedExhibits = filterExhibitsBy(allExhibits, 'subType', 'saved');
    const visitedExhibits = filterExhibitsBy(allExhibits, 'subType', 'visited');
    const numberOfFavorited = favoritedExhibits.length;
    const numberOfVisited = visitedExhibits.length;
    const image = (user.photoURL !== '') ? user.photoURL : User;

    return (
      <FullWrapper bottomPadding>
        <TabBar>
          <TabBarList className={'header'}>
            <li />
            <li>
              <H2 className={'title'}>{ messages.header.profile.defaultMessage }</H2>
            </li>
            <li>
              <Button
                name={messages.actions.signOut.defaultMessage}
                onClickEvent={onSignOut}
              />
            </li>
          </TabBarList>
        </TabBar>
        <Header>
          <ImageContainer>
            <ProfileImage src={image} alt={'Profile Picture'} />
          </ImageContainer>
          <P className={'large'}>{ user.name }</P>
        </Header>
        <Container>
          <StatisticsBarList>
            <StatisticsBarListItem>
              <P className={'large'}>{ numberOfFavorited }</P>
              <P>Places Saved</P>
            </StatisticsBarListItem>
            <StatisticsBarListItem>
              <P className={'large'}>{ numberOfVisited }</P>
              <P>Places Visited</P>
            </StatisticsBarListItem>
          </StatisticsBarList>
        </Container>
        <SmallWrapper>
          <H3 gray>Interests</H3>
          <TagsContainer>
            { this.renderUserInterests() }
          </TagsContainer>
        </SmallWrapper>
        <div>
          <SettingsList>
            <SettingsItem>
              <SettingsLink to={'/changeinterests'}>
                { messages.links.settings.interests.defaultMessage }
              </SettingsLink>
            </SettingsItem>
            <SettingsItem>
              <SettingsLink to={'/changeparking'}>
                { messages.links.settings.parking.defaultMessage }
              </SettingsLink>
            </SettingsItem>
          </SettingsList>
        </div>
      </FullWrapper>
    );
  }
}

Profile.propTypes = {
  isSignedIn: T.bool,
  exhibitProps: T.object,
  onSignOut: T.func.isRequired,
  userProps: T.object.isRequired,
  onGetAuthenticatedUser: T.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userProps: makeSelectUser(),
  exhibitProps: makeSelectExhibits(),
  isSignedIn: makeSelectIsSignedIn(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSignOut: () => dispatchSignOutUser(dispatch),
    onGetAuthenticatedUser: () => dispatchGetAuthenticatedUser(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
