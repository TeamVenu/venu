import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Ionicon from 'react-ionicons';

// Components
import SmallWrapper from 'components/SmallWrapper';
import Button from 'components/Button';
import Radio from 'components/Radio';

// Global Selectors
import {
  makeSelectUser,
  makeSelectOnboardingValidation,
} from 'containers/App/selectors';

// Global Helpers
import {
  askUserToEnableLocation,
  dispatchChangeParkingLocation,
} from 'utils/helpers';

// Local Selectors
import {
  makeSelectOnboardingStage,
} from './selectors';

// Local Dispatch Methods
import {
  dispatchGoToPreviousStage,
  dispatchGoToNextStageFromGeolocation,
} from './helpers';

// Messages
import messages from './messages';

// Local Styles
import {
  Header,
  Body,
  Alert,
  // NumberedList,
  OptionList,
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
    const { user, validation, onSetParkingLocation } = this.props;
    const mode = validation.getIn(['geolocationSetup', 'mode']);
    const userLocation = user.get('location');

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
            <OptionList>
              <OptionItem>
                <Radio
                  id={'currentLocation'}
                  name={'parkingLot'}
                  value={'currentLocation'}
                  text={'Set parking to current location'}
                  type={'radio'}
                  onChangeEvent={() => {
                    // Set parking location using current location
                    onSetParkingLocation(userLocation);
                  }}
                />
              </OptionItem>
              {this.renderParkingLots()}
            </OptionList>
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
    const { user, stage, onPrevStage, onNextStage } = this.props;
    // Will show the update alert to user
    const bodyContent = this.renderBodyContent;
    // Store the user props we will use in an object
    const userProps = {
      stage,
      name: user.get('name'),
      location: user.get('location'),
      locationEnabled: user.get('locationEnabled'),
    };

    // Check if geolocation process is complete
    const geolocationComplete = (userProps.location && (userProps.locationEnabled !== null));

    return (
      <SmallWrapper>
        <Header>
          <h1>{ messages.geolocationSetup.title.defaultMessage }</h1>
          <p>
            Welcome { userProps.name }!
            { messages.geolocationSetup.intro.defaultMessage }
          </p>
        </Header>
        <Body>
          { bodyContent() }
          <ButtonRow>
            <ButtonItem>
              <Button
                btnClasses={'reversed bordered full'}
                name={messages.buttons.back.defaultMessage}
                onClickEvent={() => { onPrevStage(stage); }}
              />
            </ButtonItem>
            <ButtonItem>
              <Button
                btnClasses={'reversed bordered full'}
                name={messages.buttons.next.defaultMessage}
                isDisabled={!geolocationComplete}
                onClickEvent={() => { onNextStage(userProps); }}
              />
            </ButtonItem>
          </ButtonRow>
        </Body>
      </SmallWrapper>
    );
  }
}

// Set our PropTypes
GeolocationSetup.propTypes = {
  user: T.object.isRequired,
  stage: T.any.isRequired,
  validation: T.object,
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
    onNextStage: (props) => dispatchGoToNextStageFromGeolocation(dispatch, props),
  };
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  user2: makeSelectUser(),
  stage: makeSelectOnboardingStage(),
  validation: makeSelectOnboardingValidation(),
});

// Connect our GeolocationSetup
export default connect(mapStateToProps, mapDispatchToProps)(GeolocationSetup);
