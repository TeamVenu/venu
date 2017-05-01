import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// Components
import P from 'components/P';
import H3 from 'components/H3';
import Button from 'components/Button';
import Checkbox from 'components/Input';
import FlexListView from 'components/FlexListView';
import FullWrapper from 'components/FullWrapper';

import {
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
} from 'containers/App/selectors';

import { getRecommendExhibits } from 'utils/helpers';

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

    return interests.map((interest, index) => { // eslint-disable-line
      return (
        <OptionItem key={index}>
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
      <FullWrapper className={'centered'}>
        <Header>
          <H3>
            { messages.interestSelection.title.defaultMessage }
          </H3>
        </Header>
        <Body>
          <P>
            { messages.interestSelection.intro.defaultMessage }
          </P>
          <FlexListView>
            { this.renderInterestList() }
          </FlexListView>
        </Body>
        <Footer>
          <ButtonRow>
            <ButtonItem>
              <Button
                name={messages.buttons.previous.defaultMessage}
                icon={'ion-ios-arrow-thin-left'}
                onClickEvent={() => {
                  onPrevStage(stage);
                }}
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
      </FullWrapper>
    );
  }
}

InterestSelection.propTypes = {
  userProps: T.object,
  interests: T.any,
  areInterestsValid: T.bool,
  stage: T.any.isRequired,
  onPrevStage: T.func.isRequired,
  onSubmitProfile: T.func,
  onUpdateInterests: T.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onPrevStage: (stage) => dispatchGoToPreviousStage(dispatch, stage),
    onUpdateInterests: (interests) => dispatchChangeUserInterests(dispatch, interests),
    onSubmitProfile: (newUser, stage) => {
      // Cache the exhibits object
      const exhibits = {
        recommended: [],
        saved: newUser.exhibits.saved,
        visited: newUser.exhibits.visited,
      };

      // Cache interests
      const interests = newUser.interests;

      // Loop through interests and get the recommended exhibits
      interests.forEach((interest) => {
        // Search through the exhibits
        const recommended = getRecommendExhibits(interest);

        if (exhibits.recommended.length > 0) {
          exhibits.recommended.concat(recommended);
        } else {
          exhibits.recommended = recommended;
        }
      });

      const user = Object.assign({}, newUser, { exhibits });
      dispatchGoToNextStage(dispatch, user, stage);
    },
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
