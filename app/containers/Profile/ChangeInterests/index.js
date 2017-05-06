/*
 * ChangeInterests
 */
import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';

// Components
import P from 'components/P';
import H3 from 'components/H3';
import TabBar from 'components/TabBar';
import Checkbox from 'components/Input';
import Navigation from 'components/Header';
import TabBarList from 'components/TabBarList';
import FullWrapper from 'components/FullWrapper';
import FlexListView from 'components/FlexListView';

// Components
import Button from 'components/Button';
import Notifications from 'components/Notifications';
import {
  Header,
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
import { getRecommendExhibits } from 'utils/helpers';

import messages from 'containers/Profile/messages';

// Selectors
import {
  makeSelectInterests,
  makeSelectInterestsValid,
} from 'containers/Profile/selectors';

// Dispatch Methods
import {
  dispatchChangeUserInterests,
} from 'containers/Profile/dispatches';

export class ChangeInterests extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.verifyInterests = this.verifyInterests.bind(this);
    this.renderInterestsList = this.renderInterestsList.bind(this);
  }

  componentWillMount() {
    const { userProps, onChangeInterests, onGetAuthenticatedUser } = this.props;
    const user = (userProps.location) ? userProps : userProps.toJS();
    onGetAuthenticatedUser();
    onChangeInterests(user.interests);
  }

  componentDidUpdate() {
    const { isSignedIn } = this.props;

    if (!isSignedIn) {
      browserHistory.push('/login');
    }
  }

  verifyInterests() {
    const { onChangeInterests } = this.props;

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

    onChangeInterests(interests);
  }

  renderInterestsList() {
    const { interests } = this.props;
    const { interestList } = messages.settings.chooseInterests;

    return interestList.map((interest) => { // eslint-disable-line
      return (
        <OptionItem key={interest.name}>
          <Checkbox
            id={interest.name}
            name={'interests'}
            text={interest.defaultMessage}
            value={interest.defaultMessage}
            type={'checkbox'}
            isSelected={interests.includes(interest.defaultMessage)}
            onChangeEvent={this.verifyInterests}
          />
        </OptionItem>
      );
    });
  }

  render() {
    const {
      error,
      success,
      interests,
      userProps,
      areInterestsValid,
      onClearErrorMessages,
      onClearSuccessMessages,
      onSubmitChangeInterests,
    } = this.props;

    const user = (userProps.location) ? userProps : userProps.toJS();
    const { goBack } = browserHistory;

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
                <H3 className={'title'}>{ messages.settings.chooseInterests.header.defaultMessage }</H3>
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
          <Header>
            <P>
              { messages.settings.chooseInterests.intro.defaultMessage }
            </P>
          </Header>
          <Body>
            <FlexListView>
              { this.renderInterestsList() }
            </FlexListView>
          </Body>
          <Footer centered>
            <ButtonRow>
              <ButtonItem>
                <Button
                  name={messages.settings.chooseInterests.button.defaultMessage}
                  isDisabled={!areInterestsValid}
                  onClickEvent={() => {
                    const u = Object.assign({}, user, { interests });
                    onSubmitChangeInterests(u);
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

ChangeInterests.propTypes = {
  error: T.string,
  success: T.string,
  isSignedIn: T.bool,
  interests: T.any,
  onClearErrorMessages: T.func,
  onClearSuccessMessages: T.func,
  userProps: T.object.isRequired,
  areInterestsValid: T.bool,
  onChangeInterests: T.func.isRequired,
  onSubmitChangeInterests: T.func.isRequired,
  onGetAuthenticatedUser: T.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  interests: makeSelectInterests(),
  userProps: makeSelectUser(),
  success: makeSelectSuccess(),
  isSignedIn: makeSelectIsSignedIn(),
  areInterestsValid: makeSelectInterestsValid(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeInterests: (interests) => dispatchChangeUserInterests(dispatch, interests),
    onGetAuthenticatedUser: () => dispatchGetAuthenticatedUser(dispatch),
    onClearErrorMessages: () => dispatchSetErrorMessages(dispatch, null),
    onClearSuccessMessages: () => dispatchSetSuccessMessages(dispatch, null),
    onSubmitChangeInterests: (u) => {
      // Cache the exhibits object
      const exhibits = {
        recommended: [],
        saved: u.exhibits.saved,
        visited: u.exhibits.visited,
      };

      // Cache interests
      const interests = u.interests;

      // Loop through interests and get the recommended exhibits
      interests.forEach((interest) => {
        // Search through the exhibits
        const recommended = getRecommendExhibits(interest, u.exhibits);

        if (exhibits.recommended.length > 0) {
          exhibits.recommended.concat(recommended);
        } else {
          exhibits.recommended = recommended;
        }
      });

      const user = Object.assign({}, u, { exhibits });
      dispatchSetUser(dispatch, user);
      dispatchSetSuccessMessages(dispatch, 'Your interests have been updated!');
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeInterests);
