import React, { PropTypes as T } from 'react';
import GoogleMap from 'google-map-react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// Components
import P from 'components/P';
import H3 from 'components/H3';
import Radio from 'components/Input';
import Button from 'components/Button';
import FlexListView from 'components/FlexListView';
import Marker from 'components/Markers';
import {
  Container,
  Header,
  Body,
  Footer,
  OptionItem,
  ButtonRow,
  ButtonItem,
} from 'components/FullPage';

// Global Selectors
import {
  makeSelectUser,
  makeSelectVenuMap,
} from 'containers/App/selectors';

// Local Selectors
import {
  makeSelectUserLocation,
  makeSelectParking,
  makeSelectOnboardingStage,
} from './selectors';

// Local Dispatch Methods
import {
  dispatchChangeParkingLocation,
  dispatchGoToPreviousStage,
  dispatchGoToNextStage,
} from './dispatches';

// Messages
import messages from './messages';

export class ParkingSetup extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.renderParkingLots = this.renderParkingLots.bind(this);
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

  render() {
    const { userProps, venuMap, stage, location, parking, onPreviousStage, onNextStage, onSetParkingLocation } = this.props;
    const user = (userProps.location) ? userProps : userProps.toJS();
    const mapProps = (venuMap.bootstrapURLKeys) ? venuMap : venuMap.toJS();
    const options = Object.assign(mapProps.options, { draggable: false, scrollwheel: false });
    const place = {
      type: 'facility',
      subType: 'parking',
    };

    return (
      <Container>
        <Header>
          <H3>{ messages.geolocationSetup.parking.title.defaultMessage }</H3>
        </Header>
        <Body>
          <P>
            { messages.geolocationSetup.parking.description.defaultMessage }
          </P>
          <div style={{ width: '100%', height: '300px' }}>
            <GoogleMap
              bootstrapURLKeys={mapProps.bootstrapURLKeys}
              options={options}
              zoom={16}
              center={parking}
            >
              <Marker
                place={place}
                lat={parking.lat}
                lng={parking.lng}
              />
            </GoogleMap>
          </div>
          <FlexListView className={'spaced'}>
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
            { this.renderParkingLots() }
          </FlexListView>
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
                onClickEvent={() => {
                  const props = Object.assign({}, user, { parking });
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

ParkingSetup.propTypes = {
  parking: T.object,
  userProps: T.object,
  stage: T.number.isRequired,
  venuMap: T.object.isRequired,
  location: T.object.isRequired,
  onNextStage: T.func.isRequired,
  onPreviousStage: T.func.isRequired,
  onSetParkingLocation: T.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userProps: makeSelectUser(),
  venuMap: makeSelectVenuMap(),
  parking: makeSelectParking(),
  location: makeSelectUserLocation(),
  stage: makeSelectOnboardingStage(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSetParkingLocation: (location) => dispatchChangeParkingLocation(dispatch, location),
    onPreviousStage: (stage) => dispatchGoToPreviousStage(dispatch, stage),
    onNextStage: (user, stage) => dispatchGoToNextStage(dispatch, user, stage),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ParkingSetup);
