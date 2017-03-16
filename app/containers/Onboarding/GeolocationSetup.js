import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Ionicon from 'react-ionicons';

// Components
import SmallWrapper from 'components/SmallWrapper';
import Button from 'components/Button';

// Messages
import messages from './messages';

// Local Styles
import {
  Header,
  Body,
  Alert,
  // NumberedList,
  // OptionItem,
} from './styles';

// Selectors
import {
  makeSelectUser,
  makeSelectUserLocation,
  makeSelectGeolocationEnabled,
  makeSelectOnboardingValidation,
} from './selectors';

// Dispatch Methods
import {
  askUserToEnableLocation,
} from './helpers';

// GeolocationSetup
export class GeolocationSetup extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { onAskUserToEnableLocation } = this.props;
    onAskUserToEnableLocation();
  }

  render() {
    const { user, userLocation, validation, onAskUserToEnableLocation } = this.props;

    console.log(validation.get('geolocationSetup'));
    console.log(userLocation);
    return (
      <SmallWrapper>
        <Header>
          <h1>{messages.geolocationSetup.messages.title.defaultMessage}</h1>
          <p>
            Welcome {user.name}!
            {messages.geolocationSetup.messages.intro.defaultMessage}
          </p>
        </Header>
        <Body>
          <Alert className={'show'}>
            <Ionicon icon={'icon ion-load-d'} rotate />
            {messages.geolocationSetup.messages.location.retrieving.defaultMessage}
          </Alert>
          <Alert className={'show success'}>
            <Ionicon icon={'icon ion-checkmark-round'} />
            {messages.geolocationSetup.messages.location.succeeded.defaultMessage}
          </Alert>
          <Alert className={'show warning'}>
            <Ionicon icon={'icon ion-alert'} />
            {messages.geolocationSetup.messages.location.failed.defaultMessage}
          </Alert>
          <Alert className={'show error'}>
            <Ionicon icon={'icon ion-close-round'} />
            {messages.geolocationSetup.messages.location.unavailable.defaultMessage}
          </Alert>
          <Button
            btnClasses={'reversed bordered full'}
            name={messages.buttons.messages.retryGeolocation.defaultMessage}
            onClickEvent={onAskUserToEnableLocation}
          />
          <Button
            btnClasses={'reversed bordered'}
            name={messages.buttons.messages.back.defaultMessage}
            isDisabled
          />
          <Button
            btnClasses={'reversed bordered'}
            name={messages.buttons.messages.next.defaultMessage}
            isDisabled
          />
        </Body>
      </SmallWrapper>
    );
  }
}

// Set our PropTypes
GeolocationSetup.propTypes = {
  user: T.object.isRequired,
  userLocation: T.object,
  // locationEnabled: T.bool,
  validation: T.object,
  onAskUserToEnableLocation: T.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onAskUserToEnableLocation: () => askUserToEnableLocation(dispatch),
  };
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  userLocation: makeSelectUserLocation(),
  locationEnabled: makeSelectGeolocationEnabled(),
  validation: makeSelectOnboardingValidation(),
});

// Connect our GeolocationSetup
export default connect(mapStateToProps, mapDispatchToProps)(GeolocationSetup);
