/*
 * Search
 */

import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

// Components
import H2 from 'components/H2';
import Button from 'components/Button';
import TabBar from 'components/TabBar';
import Container from 'components/Header';
import TabBarList from 'components/TabBarList';

// Containers

// Selectors
import {
  makeSelectUser,
  makeSelectIsSignedIn,
} from 'containers/App/selectors';

// Dispacthes
import {
  dispatchGetAuthenticatedUser,
} from 'containers/App/dispatches';

// Helpers
import {
  search,
  isUserOnboardingComplete,
} from 'utils/helpers';

import { makeSelectSearchTerm, makeSelectSearchData } from './selectors';
import { dispatchSetSearchTerm, dispatchSearchTerm } from './dispatches';
// Local

const SearchBox = styled.input`
  border: 1px solid var(--foreground-color);
  border-radius: 1em;
  display: block;
  // width: 100%;
  margin: auto;
  padding: calc(var(--padding) / 2);

  &:focus {
    outline: 0;
  }
`;

export class Search extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.searchTerm = this.searchTerm.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentWillMount() {
    const { onGetAuthenticatedUser } = this.props;
    onGetAuthenticatedUser();
  }

  componentDidUpdate() {
    const { userProps, isSignedIn } = this.props;
    const user = (userProps.location) ? userProps : userProps.toJS();

    if (!isSignedIn || !isUserOnboardingComplete(user)) {
      browserHistory.push('/login');
    }
  }

  handleKeyPress(event) {
    // const { onSubmitSearch } = this.props;

    if (event.key === 'Enter') {
      this.searchTerm();
    }
  }

  searchTerm() {
    const { searchTerm, searchData } = this.props;
    const placesArray = search(searchTerm, searchData, true);
    console.log(placesArray);
  }

  render() {
    const { userProps, isSignedIn, searchTerm, onChangeTerm } = this.props;
    const user = (userProps.location) ? userProps : userProps.toJS();

    if (!isSignedIn || !isUserOnboardingComplete(user)) return null;

    return (
      <div>
        <Container>
          <TabBar borderless>
            <TabBarList className={'header'}>
              <li>
                <Button
                  btnClasses={'large'}
                  icon={'ion-android-search'}
                  onClickEvent={null}
                />
              </li>
              <li>
                <H2>Search</H2>
              </li>
              <li />
            </TabBarList>
          </TabBar>
          <TabBar>
            <SearchBox
              placeholder={'Find Places'}
              type={'text'}
              value={searchTerm}
              onChange={onChangeTerm}
              onKeyPress={this.handleKeyPress}
            />
          </TabBar>
        </Container>
      </div>
    );
  }
}

Search.propTypes = {
  isSignedIn: T.bool,
  userProps: T.object.isRequired,
  searchData: T.string.isRequired,
  searchTerm: T.string,
  onChangeTerm: T.func.isRequired,
  // onSubmitSearch: T.func.isRequired,
  onGetAuthenticatedUser: T.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userProps: makeSelectUser(),
  searchData: makeSelectSearchData(),
  searchTerm: makeSelectSearchTerm(),
  isSignedIn: makeSelectIsSignedIn(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeTerm: (event) => dispatchSetSearchTerm(dispatch, event),
    onSubmitSearch: (event) => dispatchSearchTerm(dispatch, event),
    onGetAuthenticatedUser: () => dispatchGetAuthenticatedUser(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
