/*
 * AccountSettings
 */
import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';

// Components
import H2 from 'components/H2';
import H3 from 'components/H3';
import Button from 'components/Button';
import TabBar from 'components/TabBar';
import Container from 'components/Header';
import TabBarList from 'components/TabBarList';
import SmallWrapper from 'components/SmallWrapper';
import FullWrapper from 'components/FullWrapper';

// Selectors
import {
  makeSelectUser,
  makeSelectIsSignedIn,
} from 'containers/App/selectors';

// Dispacthes
import {
  dispatchSignOutUser,
  dispatchGetAuthenticatedUser,
} from 'containers/App/dispatches';

// Helpers
import { isUserOnboardingComplete } from 'utils/helpers';

// Local
import {
  SettingsList,
  SettingsItem,
  SettingsLink,
} from 'containers/Profile/styles';

import messages from 'containers/Profile/messages';

export class AccountSettings extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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

  render() {
    const { userProps, isSignedIn, onSignOut } = this.props;
    const user = (userProps.location) ? userProps : userProps.toJS();
    const { goBack } = browserHistory;

    if (!isSignedIn || !isUserOnboardingComplete(user)) return null;

    return (
      <FullWrapper bottomPadding>
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
                <H2 className={'title'}>{ messages.header.settings.defaultMessage }</H2>
              </li>
              <li />
            </TabBarList>
          </TabBar>
        </Container>
        <div>
          <SmallWrapper>
            <H3 gray>Account Settings</H3>
          </SmallWrapper>
          <SettingsList>
            <SettingsItem>
              <SettingsLink to={'/changeemail'}>
                { messages.links.settings.email.defaultMessage }
              </SettingsLink>
            </SettingsItem>
            <SettingsItem>
              <SettingsLink to={'/changepassword'}>
                { messages.links.settings.password.defaultMessage }
              </SettingsLink>
            </SettingsItem>
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
        <SmallWrapper>
          <Button
            btnClasses={'full rounded bordered'}
            name={messages.actions.signOut.defaultMessage}
            onClickEvent={onSignOut}
          />
        </SmallWrapper>
      </FullWrapper>
    );
  }
}

AccountSettings.propTypes = {
  isSignedIn: T.bool,
  onSignOut: T.func.isRequired,
  userProps: T.object.isRequired,
  onGetAuthenticatedUser: T.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userProps: makeSelectUser(),
  isSignedIn: makeSelectIsSignedIn(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSignOut: () => dispatchSignOutUser(dispatch),
    onGetAuthenticatedUser: () => dispatchGetAuthenticatedUser(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);
