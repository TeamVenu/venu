import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Ionicon from 'react-ionicons';
import ErrorIcon from 'media/icons/error.png';
import CheckIcon from 'media/icons/success.png';

// Components
import P from 'components/P';
import H3 from 'components/H3';
import Icon from 'components/Icon';
import Button from 'components/Button';
import SmallWrapper from 'components/SmallWrapper';

import {
  Header,
  Body,
  Footer,
  ButtonRow,
  ButtonItem,
} from 'components/FullPage';

// Global Selectors
import {
  makeSelectUser,
} from 'containers/App/selectors';

// Local Selectors
import {
  makeSelectIsLocating,
  makeSelectGeolocationMode,
  makeSelectUserLocation,
  makeSelectOnboardingStage,
} from './selectors';

// Local Dispatch Methods
import {
  askUserToEnableLocation,
  dispatchGoToNextStage,
} from './dispatches';

// Messages
import messages from './messages';

// GeolocationSetup
export class GeolocationSetup extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    // Get the props we need
    const {
      userProps,
      mode,
      stage,
      position,
      isLocating,
      onNextStage,
      onAskUserToEnableLocation,
    } = this.props;
    // Store the userProps props we will use in an object
    const user = (userProps.location) ? userProps : userProps.toJS();

    let imageComponent = (isLocating) ? <H3><Ionicon icon={'icon ion-load-d'} rotate /></H3> : null;
    let geolocationBtnComponent = (isLocating) ? null : (
      <Body>
        <Button
          isIconAfter
          btnClasses={'special reversed rounded'}
          name={messages.buttons.getLocation.defaultMessage}
          onClickEvent={onAskUserToEnableLocation}
        />
      </Body>
    );

    let btnMsg = messages.buttons.skip.defaultMessage;
    let msg = (isLocating)
      ? messages.geolocationSetup.location.retrieving.defaultMessage
      : messages.geolocationSetup.intro.defaultMessage;

    switch (mode) {
      case 'succeeded':
        geolocationBtnComponent = null;
        btnMsg = messages.buttons.next.defaultMessage;
        msg = messages.geolocationSetup.location.succeeded.defaultMessage;
        imageComponent = (<Icon src={CheckIcon} alt={'Success Icon'} title={'Success'} />);
        break;
      case 'failed':
      case 'unavailable':
        geolocationBtnComponent = null;
        msg = messages.geolocationSetup.location.unavailable.defaultMessage;
        imageComponent = (<Icon src={ErrorIcon} alt={'Error Icon'} title={'Failed'} />);
        break;
      default:
        break;
    }

    return (
      <SmallWrapper className={'centered'}>
        <Header>
          { imageComponent }
          <H3>{ messages.geolocationSetup.title.defaultMessage }</H3>
          <P>{ msg }</P>
        </Header>
        { geolocationBtnComponent }
        <Footer>
          <ButtonRow>
            <ButtonItem>
              <Button
                isIconAfter
                icon={'ion-ios-arrow-thin-right'}
                name={btnMsg}
                isDisabled={isLocating}
                onClickEvent={() => {
                  const location = (position.lat) ? position : position.toJS();
                  const parking = (mode === 'succeeded') ? location : '';
                  const props = Object.assign({}, user, { location, parking });
                  onNextStage(props, stage);
                }}
              />
            </ButtonItem>
          </ButtonRow>
        </Footer>
      </SmallWrapper>
    );
  }
}

// Set our PropTypes
GeolocationSetup.propTypes = {
  mode: T.string,
  isLocating: T.bool,
  stage: T.any.isRequired,
  position: T.object.isRequired,
  userProps: T.object.isRequired,
  onNextStage: T.func.isRequired,
  onAskUserToEnableLocation: T.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userProps: makeSelectUser(),
  mode: makeSelectGeolocationMode(),
  stage: makeSelectOnboardingStage(),
  isLocating: makeSelectIsLocating(),
  position: makeSelectUserLocation(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onAskUserToEnableLocation: () => askUserToEnableLocation(dispatch),
    onNextStage: (user, stage) => dispatchGoToNextStage(dispatch, user, stage),
  };
}

// Connect our GeolocationSetup
export default connect(mapStateToProps, mapDispatchToProps)(GeolocationSetup);
