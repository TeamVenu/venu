/**
 * Onboarding
 */

import React, { PropTypes as T } from 'react';
import { browserHistory } from 'react-router';
import Ionicon from 'react-ionicons';
import { Container, FieldContainer, Label, Input, PrimaryButton, Notification, OptionList, OptionItem, OptionButton } from './styles';

export default class Onboarding extends React.PureComponent { // eslint-disable-line
  static propTypes = {
    location: T.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      onboardingStep: null,
      userName: null,
      userEmail: null,
      userInterests: null,
      userLocation: null,
      locationEnabled: null,
    };

    this.handleUserNameField = this.handleUserNameField.bind(this);
    this.handleUserEmailField = this.handleUserEmailField.bind(this);
    this.submitUserInfo = this.submitUserInfo.bind(this);
    this.handleLocationSubmit = this.handleLocationSubmit.bind(this);
    this.handleSelectedInterest = this.handleSelectedInterest.bind(this);
    this.handleInterestSubmit = this.handleInterestSubmit.bind(this);
  }

  handleUserNameField(event) {
    if (event.target.value && event.target.value !== '') {
      const userNameInput = document.getElementById('usernameInput');
      userNameInput.classList.remove('invalid');
    }

    this.setState({
      userName: event.target.value,
    });
  }

  handleUserEmailField(event) {
    if (event.target.value && event.target.value !== '') {
      const userEmailInput = document.getElementById('emailInput');
      userEmailInput.classList.remove('invalid');
    }

    this.setState({
      userEmail: event.target.value,
    });
  }

  submitUserInfo() {
    const { userName, userEmail } = this.state;
    let valid = true;

    if (!userName || userName === '') {
      const userNameInput = document.getElementById('usernameInput');
      userNameInput.classList.add('invalid');
      valid = false;
    }

    if (!userEmail || userEmail === '') {
      const userEmailInput = document.getElementById('emailInput');
      userEmailInput.classList.add('invalid');
      valid = false;
    }

    if (valid) {
      this.setState({
        onboardingStep: 1,
      });
    }
  }

  /**
   * askUserForLocation
   * Prompts the user for access to their location
   */
  askUserForLocation() {
    const location = {};

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(this.retrieveUsersLocation.bind(this), () => {
        // Error
        console.warn(' ⛔️ 📍 Unable to retrieve location, user might have declined to use location');
        const notification = document.getElementById('onboarding-location-denied');
        notification.classList.add('show');
        location.lat = 43.08516;
        location.lng = -77.677192;

        this.setState({
          userLocation: location,
          locationEnabled: false,
        });
      });
    } else {
      console.warn('⚠️🗺 Geolocation is not available');
      const notification = document.getElementById('onboarding-location-unavailable');
      notification.classList.add('show');
      location.lat = 43.08516;
      location.lng = -77.677192;
      // this.centerMap(location);
      this.setState({
        userLocation: location,
        locationEnabled: false,
      });
    }
  }

  /**
   * retrieveUsersLocation
   * Sets the user location based on their position
   * @param  {Object} position
   */
  retrieveUsersLocation(position) {
    const location = {};

    location.lat = position.coords.latitude;
    location.lng = position.coords.longitude;
    const notification = document.getElementById('onboarding-location-succeeded');
    notification.classList.add('show');
    this.setState({
      userLocation: location,
      locationEnabled: true,
    });
  }

  renderUserInfoView() { // eslint-disable-line
    return (
      <article>
        <Container>
          <h2>Welcome to Venu</h2>
          <p>
            Venu assists you in finding the activities that you care about the most.
          </p>
          <br />
          <h3>Get started</h3>
          <FieldContainer>
            <Label for="usernameInput" id="usernameInputLabel">Enter your name:</Label>
            <Input id="usernameInput" name="usernameInput" type="text" placeholder="Jane Doe" onChange={this.handleUserNameField} />
          </FieldContainer>
          <FieldContainer>
            <Label for="emailInput" id="usernameInputLabel">Enter a valid email:</Label>
            <Input id="emailInput" name="emailInput" type="email" placeholder="jane.doe@rit.edu" onChange={this.handleUserEmailField} />
          </FieldContainer>
          <PrimaryButton onClick={this.submitUserInfo}>Next</PrimaryButton>
        </Container>
      </article>
    );
  }

  renderRequestUserLocation() {
    this.askUserForLocation();
    return (
      <article>
        <Container>
          <h2>Hello {this.state.userName}, Allow Venu to access your location?</h2>
          <p>
            Venu utilizes your location to provide wayfinding and help
            you find activities near you.
          </p>
          <br />
          <p>
            If you allow the browser to access your location, simply allow a few seconds to
            find you.
          </p>
          <Notification className="warning" id="onboarding-location-unavailable">
            <Ionicon icon={'icon ion-alert'} />
            Geolocation is not available in your browser!
            Try going into your browser settings to allow the browser to
            access your location.
          </Notification>

          <Notification className="error" id="onboarding-location-denied">
            <Ionicon icon={'icon ion-close-round'} />
            You have denied access your location.
            Some features may be unavailable.
          </Notification>
          <Notification className="success" id="onboarding-location-succeeded">
            <Ionicon icon={'icon ion-checkmark-round'} />
            Success! Your location has been enabled.
          </Notification>
          <PrimaryButton onClick={this.handleLocationSubmit}>Next</PrimaryButton>
        </Container>
      </article>
    );
  }

  handleLocationSubmit() {
    this.setState({
      onboardingStep: 2,
    });
  }

  handleSelectedInterest(event) {
    event.target.classList.toggle('selected');
  }

  renderSelectInterests() {
    return (
      <article>
        <Container>
          <h2>Select your interests</h2>
          <p>
            Venu will be able to recommend you activities based on your interests.
          </p>
          <br />
          <p>
            Select the type of activities you would like to see!
          </p>
          <OptionList>
            <OptionItem>
              <OptionButton onClick={this.handleSelectedInterest}>
                Books
                <Ionicon icon={'icon ion-checkmark-round'} />
              </OptionButton>
            </OptionItem>
            <OptionItem>
              <OptionButton onClick={this.handleSelectedInterest}>
                Games
                <Ionicon icon={'icon ion-checkmark-round'} />
              </OptionButton>
            </OptionItem>
            <OptionItem>
              <OptionButton onClick={this.handleSelectedInterest}>
                General
                <Ionicon icon={'icon ion-checkmark-round'} />
              </OptionButton>
            </OptionItem>
            <OptionItem>
              <OptionButton onClick={this.handleSelectedInterest}>
                Interactive
                <Ionicon icon={'icon ion-checkmark-round'} />
              </OptionButton>
            </OptionItem>
            <OptionItem>
              <OptionButton onClick={this.handleSelectedInterest}>
                Installation
                <Ionicon icon={'icon ion-checkmark-round'} />
              </OptionButton>
            </OptionItem>
            <OptionItem>
              <OptionButton onClick={this.handleSelectedInterest}>
                Music
                <Ionicon icon={'icon ion-checkmark-round'} />
              </OptionButton>
            </OptionItem>
            <OptionItem>
              <OptionButton onClick={this.handleSelectedInterest}>
                Physical Activity
                <Ionicon icon={'icon ion-checkmark-round'} />
              </OptionButton>
            </OptionItem>
            <OptionItem>
              <OptionButton onClick={this.handleSelectedInterest}>
                Visual
                <Ionicon icon={'icon ion-checkmark-round'} />
              </OptionButton>
            </OptionItem>
          </OptionList>
          <PrimaryButton onClick={this.handleInterestSubmit}>Next</PrimaryButton>
        </Container>
      </article>
    );
  }

  handleInterestSubmit() {
    const selectedButtons = Array.from(document.getElementsByClassName('selected'));

    if (selectedButtons.length === 0) return;

    const interests = [];

    selectedButtons.forEach((interest) => {
      interests.push(interest.textContent);
    });

    browserHistory.push({
      pathname: '/',
      state: {
        userName: this.state.userName,
        userEmail: this.state.userEmail,
        userInterests: interests,
        userLocation: this.state.userLocation,
        locationEnabled: this.state.locationEnabled,
      },
    });
  }

  renderOnboardingStep() {
    const { onboardingStep } = this.state;

    if (!onboardingStep) {
      return (this.renderUserInfoView());
    } else if (onboardingStep === 1) {
      return (this.renderRequestUserLocation());
    }
    return (this.renderSelectInterests());
  }

  render() {
    return (
      <div>
        {this.renderOnboardingStep()}
      </div>
    );
  }
}
