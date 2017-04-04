import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Ionicon from 'react-ionicons';

// Components
import Button from 'components/Button';
import Radio from 'components/Input';
import FlexListView from 'components/FlexListView';

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
  dispatchChangeParkingLocation,
  dispatchGoToPreviousStage,
  dispatchGoToNextStage,
} from './dispatches';

// Messages
import messages from './messages';

// Local Styles
import {
  Container,
  Header,
  Body,
  Footer,
  Alert,
  // NumberedList,
  OptionItem,
  ButtonRow,
  ButtonItem,
} from './styles';

// GeolocationSetup
export class GeolocationSetup extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.renderBodyContent = this.renderBodyContent.bind(this);
    this.renderParkingLots = this.renderParkingLots.bind(this);
  }
  componentDidMount() {
    const { onAskUserToEnableLocation } = this.props;
    onAskUserToEnableLocation();
  }

  renderParkingLots() {
    const { onSetParkingLocation } = this.props;
    const { lots } = messages.geolocationSetup.parking.lot;
    return lots.map((lot) => { // eslint-disable-line
      return (
        <OptionItem key={lot.id}>
          <Radio
            id={lot.name}
            name={'parkingLot'}
            value={lot.value}
            text={lot.defaultMessage}
            type={'radio'}
            onChangeEvent={(e) => {
              // Get the array index from the value or the input
              const index = e.target.value;

              // Get the location using the index
              const location = lots[index].location;

              // Set parking location using the location of the lot
              onSetParkingLocation(location);
            }}
          />
        </OptionItem>
      );
    });
  }

  renderBodyContent() {
    const { mode, location, onSetParkingLocation } = this.props;

    switch (mode) {
      case 'succeeded':
        return (
          <section>
            <Alert className={'show success'}>
              <Ionicon icon={'icon ion-checkmark-round'} />
              { messages.geolocationSetup.location.succeeded.defaultMessage }
            </Alert>
            <h4>{ messages.geolocationSetup.parking.title.defaultMessage }</h4>
            <p>
              { messages.geolocationSetup.parking.description.defaultMessage }
            </p>
            <FlexListView>
              <OptionItem>
                <Radio
                  id={'currentLocation'}
                  name={'parkingLot'}
                  value={'currentLocation'}
                  text={'Set parking to current location'}
                  type={'radio'}
                  onChangeEvent={() => {
                    // Set parking location using current location
                    onSetParkingLocation(location);
                  }}
                />
              </OptionItem>
              {this.renderParkingLots()}
            </FlexListView>
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
              btnClasses={'reversed bordered full'}
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
              btnClasses={'reversed bordered full'}
              name={messages.buttons.retryGeolocation.defaultMessage}
              onClickEvent={() => { window.location.reload(); }}
            />
          </div>
        );
      default:
        return (
          <Alert className={'show'}>
            <Ionicon icon={'icon ion-load-d'} rotate />
            { messages.geolocationSetup.location.retrieving.defaultMessage }
          </Alert>
        );
    }
  }

  render() {
    // Get the props we need
    const { userProps, stage, location, parking, isLocationValid, onPrevStage, onNextStage } = this.props;
    // Will show the update alert to userProps
    const bodyContent = this.renderBodyContent;
    // Store the userProps props we will use in an object
    const user = (userProps.location) ? userProps : userProps.toJS();

    return (
      <Container>
        <Header>
          <h3>{ messages.geolocationSetup.title.defaultMessage }</h3>
        </Header>
        <Body>
          <p>
            Welcome { user.name }!
            { messages.geolocationSetup.intro.defaultMessage }
          </p>
          { bodyContent() }
        </Body>
        <Footer>
          <ButtonRow>
            <ButtonItem>
              <Button
                btnClasses={''}
                icon={'ion-ios-arrow-thin-left'}
                name={messages.buttons.back.defaultMessage}
                onClickEvent={() => { onPrevStage(stage); }}
              />
            </ButtonItem>
            <ButtonItem>
              <Button
                btnClasses={''}
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
  userProps: T.object.isRequired,
  location: T.object.isRequired,
  parking: T.object.isRequired,
  stage: T.any.isRequired,
  mode: T.string,
  isLocationValid: T.bool,
  onAskUserToEnableLocation: T.func,
  onSetParkingLocation: T.func,
  onPrevStage: T.func,
  onNextStage: T.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onAskUserToEnableLocation: () => askUserToEnableLocation(dispatch),
    onSetParkingLocation: (location) => dispatchChangeParkingLocation(dispatch, location),
    onPrevStage: (stage) => dispatchGoToPreviousStage(dispatch, stage),
    onNextStage: (user, stage) => dispatchGoToNextStage(dispatch, user, stage),
  };
}

const mapStateToProps = createStructuredSelector({
  userProps: makeSelectUser(),
  mode: makeSelectGeolocationMode(),
  location: makeSelectUserLocation(),
  parking: makeSelectParking(),
  isLocationValid: makeSelectLocationValid(),
  stage: makeSelectOnboardingStage(),
});

// Connect our GeolocationSetup
export default connect(mapStateToProps, mapDispatchToProps)(GeolocationSetup);
