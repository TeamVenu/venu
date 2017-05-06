/*
 * ChangeParking
 */
import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

// Components
import H2 from 'components/H2';
import Map from 'components/Map';
import TabBar from 'components/TabBar';
import Navigation from 'components/Header';
import TabBarList from 'components/TabBarList';
import FullWrapper from 'components/FullWrapper';
import Radio from 'components/Input';
import FlexListView from 'components/FlexListView';

// Components
import Button from 'components/Button';
import Notifications from 'components/Notifications';
import {
  Body,
  Footer,
  OptionItem,
  ButtonRow,
  ButtonItem,
} from 'components/FullPage';

// Selectors
import {
  makeSelectUser,
  makeSelectError,
  makeSelectSuccess,
  makeSelectVenuMap,
  makeSelectIsSignedIn,
} from 'containers/App/selectors';

// Dispacthes
import {
  dispatchSetUser,
  dispatchSetErrorMessages,
  dispatchSetSuccessMessages,
  dispatchGetAuthenticatedUser,
} from 'containers/App/dispatches';

import messages from 'containers/Profile/messages';

// Selectors
import {
  makeSelectParking,
} from 'containers/Profile/selectors';

// Dispatch Methods
import {
  dispatchChangeParkingLocation,
} from 'containers/Profile/dispatches';

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

export class ChangeParking extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.renderParkingLotList = this.renderParkingLotList.bind(this);
  }

  componentWillMount() {
    const { userProps, onChangeParking, onGetAuthenticatedUser } = this.props;
    const user = (userProps.location) ? userProps : userProps.toJS();
    onGetAuthenticatedUser();

    if (user.parking) {
      onChangeParking(user.parking);
    }
  }

  componentDidUpdate() {
    const { isSignedIn } = this.props;

    if (!isSignedIn) {
      browserHistory.push('/login');
    }
  }

  renderParkingLotList() {
    const { onChangeParking } = this.props;
    const { lots } = messages.settings.changeParking.lot;

    return lots.map((lot, index) => { // eslint-disable-line
      return (
        <OptionItem key={index}>
          <Radio
            id={lot.name}
            name={'parkingLot'}
            text={lot.defaultMessage}
            value={lot.location}
            type={'radio'}
            onChangeEvent={() => {
              onChangeParking(lot.location);
            }}
          />
        </OptionItem>
      );
    });
  }

  render() {
    const {
      error,
      success,
      venuMap,
      userProps,
      parkingPosition,
      onChangeParking,
      onClearErrorMessages,
      onClearSuccessMessages,
      onSubmitChangeParking,
    } = this.props;

    const { goBack } = browserHistory;
    const user = (userProps.location) ? userProps : userProps.toJS();
    let parking = '';

    if (parkingPosition.lat && parkingPosition.lng) {
      parking = parkingPosition;
    } else if (parking !== '') {
      parking = parkingPosition.toJS();
    }

    const mapProps = (venuMap.bootstrapURLKeys) ? venuMap : venuMap.toJS();
    const center = (parking !== '') ? parking : mapProps.center;

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
          onChangeParking(location);
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
          onChangeParking('');
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
      <FullWrapper className={'gradient-bg'} bottomPadding>
        <Navigation>
          <TabBar transparent reversed borderless>
            <TabBarList className={'header'}>
              <li>
                <Button
                  btnClasses={'large'}
                  icon={'ion-ios-arrow-back'}
                  onClickEvent={goBack}
                />
              </li>
              <li>
                <H2>{ messages.settings.changeParking.header.defaultMessage }</H2>
              </li>
              <li />
            </TabBarList>
          </TabBar>
        </Navigation>
        <Notifications
          type={'error'}
          message={error}
          onClickEvent={onClearErrorMessages}
        />
        <Notifications
          type={'success'}
          message={success}
          onClickEvent={() => {
            onClearSuccessMessages();
            goBack();
          }}
        />
        <FullWrapper className={'centered'}>
          <Body>
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
            <FlexListView className={'s2paced'}>
              { this.renderParkingLotList() }
            </FlexListView>
            { clearParkingPosition }
          </Body>
          <Footer centered>
            <ButtonRow>
              <ButtonItem>
                <Button
                  name={messages.settings.changeParking.button.defaultMessage}
                  onClickEvent={() => {
                    const u = Object.assign({}, user, { parking });
                    onSubmitChangeParking(u);
                  }}
                />
              </ButtonItem>
            </ButtonRow>
          </Footer>
        </FullWrapper>
      </FullWrapper>
    );
  }
}

ChangeParking.propTypes = {
  error: T.string,
  success: T.string,
  venuMap: T.object,
  isSignedIn: T.bool,
  parkingPosition: T.any,
  onClearErrorMessages: T.func,
  onClearSuccessMessages: T.func,
  userProps: T.object.isRequired,
  onChangeParking: T.func.isRequired,
  onSubmitChangeParking: T.func.isRequired,
  onGetAuthenticatedUser: T.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  userProps: makeSelectUser(),
  success: makeSelectSuccess(),
  venuMap: makeSelectVenuMap(),
  isSignedIn: makeSelectIsSignedIn(),
  parkingPosition: makeSelectParking(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeParking: (parking) => dispatchChangeParkingLocation(dispatch, parking),
    onGetAuthenticatedUser: () => dispatchGetAuthenticatedUser(dispatch),
    onClearErrorMessages: () => dispatchSetErrorMessages(dispatch, null),
    onClearSuccessMessages: () => dispatchSetSuccessMessages(dispatch, null),
    onSubmitChangeParking: (user) => {
      dispatchSetUser(dispatch, user);
      dispatchSetSuccessMessages(dispatch, 'Your parking spot has been updated!');
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeParking);
