import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Ionicon from 'react-ionicons';

// Components
import H3 from 'components/H3';
import Button from 'components/Button';
import {
  Container,
  Header,
  Body,
  Footer,
  Alert,
  ButtonRow,
  ButtonItem,
} from 'components/FullPage';

// Global Selectors
import {
  makeSelectUser,
} from 'containers/App/selectors';

// Local Selectors
import {
  makeSelectGeolocationMode,
  makeSelectUserLocation,
  makeSelectParking,
  makeSelectLocationValid,
  makeSelectOnboardingStage,
} from './selectors';

// Local Dispatch Methods
import {
  askUserToEnableLocation,
  dispatchGoToPreviousStage,
  dispatchGoToNextStage,
} from './dispatches';

// Messages
import messages from './messages';

// GeolocationSetup
export class GeolocationSetup extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.renderBodyContent = this.renderBodyContent.bind(this);
  }

  componentDidMount() {
    const { onAskUserToEnableLocation } = this.props;
    onAskUserToEnableLocation();
  }

  renderBodyContent() {
    const { mode, userProps } = this.props;
    const user = (userProps.location) ? userProps : userProps.toJS();

    switch (mode) {
      case 'succeeded':
        return (
          <section>
            <Alert className={'show success'}>
              <Ionicon icon={'icon ion-checkmark-round'} />
              { messages.geolocationSetup.location.succeeded.defaultMessage }
            </Alert>
          </section>
        );
      case 'failed':
        return (
          <div>
            <Alert className={'show warning'}>
              <Ionicon icon={'icon ion-alert'} />
              { messages.geolocationSetup.location.failed.defaultMessage }
            </Alert>
            <Button
              isIconAfter
              btnClasses={'full'}
              icon={'ion-android-locate'}
              name={messages.buttons.retryGeolocation.defaultMessage}
              onClickEvent={() => { window.location.reload(); }}
            />
          </div>
        );
      case 'unavailable':
        return (
          <div>
            <Alert className={'show error'}>
              <Ionicon icon={'icon ion-close-round'} />
              { messages.geolocationSetup.location.unavailable.defaultMessage }
            </Alert>
            <Button
              isIconAfter
              btnClasses={'full'}
              icon={'ion-android-locate'}
              name={messages.buttons.retryGeolocation.defaultMessage}
              onClickEvent={() => { window.location.reload(); }}
            />
          </div>
        );
      default:
        return (
          <Alert className={'show'}>
            <Ionicon icon={'icon ion-load-d'} rotate />
            Welcome { user.name }!
            { messages.geolocationSetup.location.retrieving.defaultMessage }
          </Alert>
        );
    }
  }

  render() {
    // Get the props we need
    const { userProps, stage, location, parking, isLocationValid, onPreviousStage, onNextStage } = this.props;
    // Will show the update alert to userProps
    const bodyContent = this.renderBodyContent;
    // Store the userProps props we will use in an object
    const user = (userProps.location) ? userProps : userProps.toJS();

    return (
      <Container>
        <Header>
          <H3>{ messages.geolocationSetup.title.defaultMessage }</H3>
        </Header>
        <Body>
          { bodyContent() }
        </Body>
        <Footer>
          <ButtonRow>
            <ButtonItem>
              <Button
                icon={'ion-ios-arrow-thin-left'}
                name={messages.buttons.previous.defaultMessage}
                onClickEvent={() => {
                  onPreviousStage(stage);
                }}
              />
            </ButtonItem>
            <ButtonItem>
              <Button
                isIconAfter
                icon={'ion-ios-arrow-thin-right'}
                name={messages.buttons.next.defaultMessage}
                isDisabled={!isLocationValid}
                onClickEvent={() => {
                  const props = Object.assign({}, user, { location, parking });
                  onNextStage(props, stage);
                }}
              />
            </ButtonItem>
          </ButtonRow>
        </Footer>
      </Container>
    );
  }
}

// Set our PropTypes
GeolocationSetup.propTypes = {
  mode: T.string,
  stage: T.any.isRequired,
  isLocationValid: T.bool,
  parking: T.object.isRequired,
  location: T.object.isRequired,
  userProps: T.object.isRequired,
  onNextStage: T.func.isRequired,
  onPreviousStage: T.func.isRequired,
  onAskUserToEnableLocation: T.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userProps: makeSelectUser(),
  mode: makeSelectGeolocationMode(),
  location: makeSelectUserLocation(),
  parking: makeSelectParking(),
  isLocationValid: makeSelectLocationValid(),
  stage: makeSelectOnboardingStage(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onAskUserToEnableLocation: () => askUserToEnableLocation(dispatch),
    onPreviousStage: (stage) => dispatchGoToPreviousStage(dispatch, stage),
    onNextStage: (user, stage) => dispatchGoToNextStage(dispatch, user, stage),
  };
}

// Connect our GeolocationSetup
export default connect(mapStateToProps, mapDispatchToProps)(GeolocationSetup);
