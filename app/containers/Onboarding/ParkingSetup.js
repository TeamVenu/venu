import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

// Components
import H3 from 'components/H3';
import Map from 'components/Map';
import Radio from 'components/Input';
import Button from 'components/Button';
import FlexListView from 'components/FlexListView';
import FullWrapper from 'components/FullWrapper';

import {
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

const MapContainer = styled.section`
  background: var(--background-color);
  margin-top: var(--padding);
  height: 100px;

  @media screen and (min-height: 600px) {
    height: 200px;
  }

  @media screen and (min-height: 760px) {
    height: 300px;
  }
`;

export class ParkingSetup extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.renderParkingLots = this.renderParkingLots.bind(this);
  }

  renderParkingLots() {
    const { onSetParkingLocation } = this.props;
    const { lots } = messages.geolocationSetup.parking.lot;
    return lots.map((lot, i) => { // eslint-disable-line
      return (
        <OptionItem key={lot.id}>
          <Radio
            id={lot.name}
            name={'parkingLot'}
            value={i}
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
    const { userProps, venuMap, stage, location, parkingPosition, onPreviousStage, onNextStage, onSetParkingLocation } = this.props;
    const user = (userProps.location) ? userProps : userProps.toJS();
    const mapProps = (venuMap.bootstrapURLKeys) ? venuMap : venuMap.toJS();
    let parking = '';

    if (parkingPosition.lat && parkingPosition.lng) {
      parking = parkingPosition;
    } else if (parking !== '') {
      parking = parkingPosition.toJS();
    }

    const center = (parking !== '') ? parking : mapProps.center;
    const btnMsg = (parking.lat) ? messages.buttons.next.defaultMessage : messages.buttons.skip.defaultMessage;
    const currentPositionRadio = (parking !== '') ? (
      <Radio
        id={'currentLocation'}
        name={'parkingLot'}
        value={'currentLocation'}
        text={'Current location'}
        type={'radio'}
        full
        onChangeEvent={() => {
          // Set parking location using current location
          onSetParkingLocation(location);
        }}
      />
    ) : null;

    const clearParkingPosition = (parking !== '') ? (
      <Radio
        id={'clearParking'}
        name={'parkingLot'}
        value={'clearParking'}
        text={'Clear Parking'}
        type={'radio'}
        full
        onChangeEvent={() => {
          // Set parking location using current location
          onSetParkingLocation('');
        }}
      />
    ) : null;

    mapProps.zoom = 15;

    const markers = (parking.lat && parking.lng) ? [{
      type: 'parking',
      lat: (parking.lat) ? parking.lat : user.location.lat,
      lng: (parking.lng) ? parking.lng : user.location.lng,
    }] : [];

    return (
      <FullWrapper className={'centered'}>
        <Body centered>
          <H3>{ messages.geolocationSetup.parking.title.defaultMessage }</H3>
          {currentPositionRadio}
          <MapContainer>
            <Map
              containerElement={
                <div style={{ height: '100%' }} />
              }
              mapElement={
                <div style={{ height: '100%' }} />
              }
              center={center}
              markers={markers}
              mapProps={mapProps}
            />
          </MapContainer>
          <FlexListView className={'spaced'}>
            { this.renderParkingLots() }
          </FlexListView>
          {clearParkingPosition}
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
                name={btnMsg}
                onClickEvent={() => {
                  const props = Object.assign({}, user, { parking });
                  onNextStage(props, stage);
                }}
              />
            </ButtonItem>
          </ButtonRow>
        </Footer>
      </FullWrapper>
    );
  }
}

ParkingSetup.propTypes = {
  userProps: T.object,
  parkingPosition: T.any,
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
  location: makeSelectUserLocation(),
  stage: makeSelectOnboardingStage(),
  parkingPosition: makeSelectParking(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSetParkingLocation: (location) => dispatchChangeParkingLocation(dispatch, location),
    onPreviousStage: (stage) => dispatchGoToPreviousStage(dispatch, stage),
    onNextStage: (user, stage) => dispatchGoToNextStage(dispatch, user, stage),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ParkingSetup);
