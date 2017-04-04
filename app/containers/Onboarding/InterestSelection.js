import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// Components
import Button from 'components/Button';
import Checkbox from 'components/Input';
import FlexListView from 'components/FlexListView';

// Global Selectors
import {
  makeSelectUser,
} from 'containers/App/selectors';

// Selectors
import {
  makeSelectInterests,
  makeSelectInterestsValid,
  makeSelectOnboardingStage,
} from './selectors';

// Local Dispatch Methods
import {
  dispatchGoToPreviousStage,
  dispatchGoToNextStage,
  dispatchChangeUserInterests,
} from './dispatches';

// Messages
import messages from './messages';

// Local Styles
import {
  Container,
  Header,
  Body,
  Footer,
  OptionItem,
  ButtonRow,
  ButtonItem,
} from './styles';

export class InterestSelection extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.renderInterestList = this.renderInterestList.bind(this);
    this.verifyInterests = this.verifyInterests.bind(this);
  }

  verifyInterests() {
    const { onUpdateInterests } = this.props;

    const allInterests = document.getElementsByName('interests');
    const interests = [];
    const allInterestsLength = allInterests.length;
    // Loop through elements
    for (let i = 0; i < allInterestsLength; i += 1) {
      const interest = allInterests[i];

      if (interest.checked) {
        interests.push(interest.value);
      }
    }

    onUpdateInterests(interests);
  }

  renderInterestList() {
    const { interests } = messages.interestSelection;

    return interests.map((interest) => { // eslint-disable-line
      return (
        <OptionItem key={interest.name}>
          <Checkbox
            id={interest.name}
            name={'interests'}
            value={interest.defaultMessage}
            text={interest.defaultMessage}
            type={'checkbox'}
            onChangeEvent={this.verifyInterests}
          />
        </OptionItem>
      );
    });
  }

  render() {
    const { userProps, stage, interests, areInterestsValid, onPrevStage, onSubmitProfile } = this.props;
    const user = (userProps.location) ? userProps : userProps.toJS();
    return (
      <Container>
        <Header>
          <h1>
            { messages.interestSelection.title.defaultMessage }
          </h1>
        </Header>
        <Body>
          <h4>
            { messages.interestSelection.subtitle.defaultMessage }
          </h4>
          <p>
            { messages.interestSelection.intro.defaultMessage }
          </p>
          <FlexListView>
            { this.renderInterestList() }
          </FlexListView>
        </Body>
        <Footer>
          <ButtonRow>
            <ButtonItem>
              <Button
                icon={'ion-ios-arrow-thin-left'}
                name={messages.buttons.back.defaultMessage}
                onClickEvent={() => { onPrevStage(stage); }}
              />
            </ButtonItem>
            <ButtonItem>
              <Button
                name={messages.buttons.finish.defaultMessage}
                isIconAfter
                isDisabled={!areInterestsValid}
                icon={'ion-ios-arrow-thin-right'}
                onClickEvent={() => {
                  const newUser = Object.assign({}, user, { interests });
                  onSubmitProfile(newUser, stage);
                }}
              />
            </ButtonItem>
          </ButtonRow>
        </Footer>
      </Container>
    );
  }
}

InterestSelection.propTypes = {
  userProps: T.object,
  interests: T.any,
  areInterestsValid: T.bool,
  stage: T.any.isRequired,
  onPrevStage: T.func,
  onSubmitProfile: T.func,
  onUpdateInterests: T.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onUpdateInterests: (interests) => dispatchChangeUserInterests(dispatch, interests),
    onPrevStage: (stage) => dispatchGoToPreviousStage(dispatch, stage),
    onSubmitProfile: (newUser, stage) => dispatchGoToNextStage(dispatch, newUser, stage),
  };
}

// Map state to props
const mapStateToProps = createStructuredSelector({
  userProps: makeSelectUser(),
  stage: makeSelectOnboardingStage(),
  interests: makeSelectInterests(),
  areInterestsValid: makeSelectInterestsValid(),
});

// Connect our AccountCreation
export default connect(mapStateToProps, mapDispatchToProps)(InterestSelection);
