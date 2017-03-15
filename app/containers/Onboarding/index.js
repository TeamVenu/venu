import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// Validation
import isAlphaNumeric from 'validator/lib/isAlphanumeric';
import isEmail from 'validator/lib/isEmail';

// Components
import SmallWrapper from 'components/SmallWrapper';
import TextField from 'components/TextField';
import Button from 'components/Button';
import Notifications from 'components/Notifications';

// Local Styles
import {
  Header,
  Body,
  DescriptionList,
  DescriptionTitle,
  DescriptionDefinition,
} from './styles';

// Redux
import { changeUserDisplayName, changeUserEmail, createUserAccount, errorUserAccountCreation } from './actions';
import {  makeSelectUser, makeSelectOnboardingErrorMessages } from './selectors';

export class Onboarding extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    user: {
      name: '',
      email: '',
    },
  };

  render() {
    const { user, errorMessages, onChangeDisplayName, onChangeEmail, onSubmitAccountCreation } = this.props;
    return (
      <SmallWrapper className='cen2tered'>
        <Notifications type='error' messages={errorMessages.get('accountCreation')} visible={false} />
        <Header>
          <h1>Welcome to Venu!</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam rem distinctio fugit et, consequatur molestias laudantium placeat laboriosam dolorum a voluptatum autem ipsa quasi quo minus, debitis nihil quaerat officia.</p>
        </Header>
        <Body>
          <h3>Create an account</h3>
          <DescriptionList>
            <DescriptionTitle>
              <label htmlFor='usernameField' id='usernameLabel'>Enter your name:</label>
            </DescriptionTitle>
            <DescriptionDefinition>
              <TextField 
                name='username'
                id='usernameField'
                isRequired={true}
                type='text'
                placeholderText='Jane'
                value={user.name}
                onChangeEvent={onChangeDisplayName}
                isRequired={true}
              />
            </DescriptionDefinition>
            <DescriptionTitle>
              <label htmlFor='emailField' label='emailLabel'>Enter your email:</label>
            </DescriptionTitle>
            <DescriptionDefinition>
              <TextField
                name='email'
                id='emailField'
                type='email'
                placeholderText='jane@rit.edu'
                title='Please enter a valid email.'
                value={user.email}
                onChangeEvent={onChangeEmail}
                isRequired={true}
                />
            </DescriptionDefinition>
          </DescriptionList>
        </Body>
        <Button
          btnClasses='reversed full bordered'
          name='Next'
          onClickEvent={onSubmitAccountCreation}
          />
      </SmallWrapper>
    );
  }
}

Onboarding.propTypes = {
  user: T.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeDisplayName: (event) => onChangeDisplayName(dispatch, event),
    onChangeEmail: (event) => onChangeEmail(dispatch, event),
    onSubmitAccountCreation: (event) => onSubmitAccountCreation(dispatch, event),
  };
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  errorMessages: makeSelectOnboardingErrorMessages(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);

function onChangeDisplayName(dispatch, event) {
  const name = event.target.value;
  const node = event.target;

  if (isAlphaNumeric(name)) {
    node.classList.remove('invalid');
    node.classList.add('valid');
  } else if(name === '') {
    node.classList.remove('valid');
    node.classList.remove('invalid');
  } else {
    node.classList.remove('valid');
    node.classList.add('invalid');
  }

  dispatch(changeUserDisplayName(name));
}

function onChangeEmail(dispatch, event) {
  const email = event.target.value;
  const node = event.target;

  if (isEmail(email)) {
    node.classList.remove('invalid');
    node.classList.add('valid');
  } else if(email === '') {
    node.classList.remove('valid');
    node.classList.remove('invalid');
  } else {
    node.classList.remove('valid');
    node.classList.add('invalid');
  }

  dispatch(changeUserEmail(email));
}

function onSubmitAccountCreation (dispatch, event) {
  const name = document.getElementById('usernameField').value;
  const email = document.getElementById('emailField').value;
  const user = {
    name,
    email,
  };
  const errors = [];
  let valid = true;

  if (!isAlphaNumeric(user.name)) {
    errors.push('Please enter a valid name!');
    valid = false;
  }

  if (!isEmail(user.email)) {
    errors.push('Please enter a valid email');
    valid = false;
  }

  if (valid) {
    dispatch(createUserAccount(user));
  } else {
    dispatch(errorUserAccountCreation(errors));
  }
}