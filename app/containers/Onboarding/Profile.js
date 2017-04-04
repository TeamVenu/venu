import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// Components
import TextField from 'components/TextField';
import Button from 'components/Button';
import Notifications from 'components/Notifications';

// Global Selectors
import { makeSelectUser, makeSelectError } from 'containers/App/selectors';

// Global Helpers
import {
  dispatchSetErrorMessages,
} from 'containers/App/dispatches';

// Messages
import messages from './messages';

// Local Styles
import {
  Container,
  Header,
  Body,
  Footer,
  ButtonRow,
  ButtonItem,
} from './styles';

// Selectors
import {
  makeSelectAge,
  makeSelectDisplayName,
  makeSelectAgeValid,
  makeSelectNameValid,
  makeSelectOnboardingStage,
} from './selectors';

// Dispatch Methods
import {
  dispatchChangeDisplayName,
  dispatchChangeUserAge,
  dispatchGoToNextStage,
} from './dispatches';

// AccountCreation
export class Profile extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    // Get the props we need
    const {
      userProp,
      name,
      age,
      error,
      stage,
      isAgeValid,
      isNameValid,
      onChangeName,
      onChangeAge,
      onClearErrorMessages,
      onSubmitProfile,
    } = this.props;

    const user = (userProp.location) ? userProp : userProp.toJS();

    // Verify that the data is valid so we can enable to button
    const validData = (isNameValid && isAgeValid);
    const ageRequirements = ['Must be a number'];

    return (
      <Container>
        <Notifications
          type={'error'}
          message={error}
          onClickEvent={onClearErrorMessages}
        />
        <Header>
          <h3>Profile</h3>
        </Header>
        <Body>
          <TextField
            name={'name'}
            id={'nameField'}
            type={'text'}
            labelText={messages.accountCreation.nameLabel.defaultMessage}
            isValid={isNameValid}
            value={name}
            onChangeEvent={onChangeName}
            isRequired
          />
          <TextField
            name={'age'}
            id={'ageField'}
            type={'number'}
            labelText={messages.accountCreation.ageLabel.defaultMessage}
            isValid={isAgeValid}
            value={age}
            requirements={ageRequirements}
            onChangeEvent={onChangeAge}
            isRequired
          />
        </Body>
        <Footer>
          <ButtonRow>
            <ButtonItem>
              <Button
                btnClasses={''}
                icon={'ion-ios-arrow-thin-right'}
                name={messages.buttons.next.defaultMessage}
                onClickEvent={() => {
                  const newUser = Object.assign({}, user, { name, age });
                  onSubmitProfile(newUser, stage);
                }}
                isDisabled={!validData}
                isIconAfter
              />
            </ButtonItem>
          </ButtonRow>
        </Footer>
      </Container>
    );
  }
}

// Set our PropTypes
Profile.propTypes = {
  userProp: T.object,
  name: T.string.isRequired,
  age: T.string,
  stage: T.any.isRequired,
  error: T.string,
  isAgeValid: T.bool,
  isNameValid: T.bool,
  onChangeName: T.func,
  onChangeAge: T.func,
  onClearErrorMessages: T.func,
  onSubmitProfile: T.func,
};

// Map dispatch functions to props so we can call them
export function mapDispatchToProps(dispatch) {
  return {
    onChangeName: (event) => {
      dispatchChangeDisplayName(dispatch, event);
    },
    onChangeAge: (event) => {
      dispatchChangeUserAge(dispatch, event);
    },
    onClearErrorMessages: () => dispatchSetErrorMessages(dispatch, null),
    onSubmitProfile: (newUser, stage) => dispatchGoToNextStage(dispatch, newUser, stage),
  };
}

// Map state to props
const mapStateToProps = createStructuredSelector({
  userProp: makeSelectUser(),
  age: makeSelectAge(),
  name: makeSelectDisplayName(),
  isAgeValid: makeSelectAgeValid(),
  isNameValid: makeSelectNameValid(),
  error: makeSelectError(),
  stage: makeSelectOnboardingStage(),
});

// Connect our AccountCreation
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
