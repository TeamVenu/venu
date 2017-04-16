/*
 * ChangeParking
 */
import React, { PropTypes as T } from 'react';
import GoogleMap from 'google-map-react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';

// Components
import H2 from 'components/H2';
import TabBar from 'components/TabBar';
import Navigation from 'components/Header';
import TabBarList from 'components/TabBarList';
import FullWrapper from 'components/FullWrapper';
import Radio from 'components/Input';
import FlexListView from 'components/FlexListView';
import Marker from 'components/Markers';

// Components
import Button from 'components/Button';
import Notifications from 'components/Notifications';
import {
  Container,
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

// Helpers
import { isUserOnboardingComplete } from 'utils/helpers';

import messages from 'containers/Profile/messages';

// Selectors
import {
  makeSelectParking,
} from 'containers/Profile/selectors';

// Dispatch Methods
import {
  dispatchChangeParkingLocation,
} from 'containers/Profile/dispatches';

export class ChangeParking extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.renderParkingLotList = this.renderParkingLotList.bind(this);
  }

  componentWillMount() {
    const { userProps, onChangeParking, onGetAuthenticatedUser } = this.props;
    const user = (userProps.location) ? userProps : userProps.toJS();
    onGetAuthenticatedUser();

    onChangeParking(user.parking);
  }

  componentDidUpdate() {
    const { userProps, isSignedIn } = this.props;
    const user = (userProps.location) ? userProps : userProps.toJS();

    if (!isSignedIn || !isUserOnboardingComplete(user)) {
      browserHistory.push('/login');
    }
  }

  renderParkingLotList() {
    const { onChangeParking } = this.props;
    const { lots } = messages.settings.changeParking.lot;

    return lots.map((lot) => { // eslint-disable-line
      return (
        <OptionItem key={lot.name}>
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
      parking,
      venuMap,
      userProps,
      isSignedIn,
      onChangeParking,
      onClearErrorMessages,
      onClearSuccessMessages,
      onSubmitChangeParking,
    } = this.props;

    const user = (userProps.location) ? userProps : userProps.toJS();
    const { goBack } = browserHistory;
    const mapProps = (venuMap.bootstrapURLKeys) ? venuMap : venuMap.toJS();
    const options = Object.assign(mapProps.options, { draggable: false, scrollwheel: false });
    const place = {
      type: 'facility',
      subType: 'parking',
    };

    if (!isSignedIn || !isUserOnboardingComplete(user)) return null;

    return (
      <FullWrapper className={'gradient-bg'} bottomPadding>
        <Navigation>
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
                <H2 className={'title'}>{ messages.settings.changeParking.header.defaultMessage }</H2>
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
        <Container>
          <Body>
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
                    onChangeParking(user.location);
                  }}
                />
              </OptionItem>
              { this.renderParkingLotList() }
            </FlexListView>
          </Body>
          <Footer>
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
        </Container>
      </FullWrapper>
    );
  }
}

ChangeParking.propTypes = {
  error: T.string,
  success: T.string,
  venuMap: T.object,
  parking: T.object,
  isSignedIn: T.bool,
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
  parking: makeSelectParking(),
  success: makeSelectSuccess(),
  venuMap: makeSelectVenuMap(),
  isSignedIn: makeSelectIsSignedIn(),
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
