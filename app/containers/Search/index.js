/*
 * Search
 */

import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

// Components
import P from 'components/P';
import H2 from 'components/H2';
import H3 from 'components/H3';
import Card from 'components/Card';
import Button from 'components/Button';
import TabBar from 'components/TabBar';
import Container from 'components/Header';
import TabBarList from 'components/TabBarList';
import SmallWrapper from 'components/SmallWrapper';
// Containers

// Selectors
import {
  makeSelectUser,
  makeSelectIsSignedIn,
  makeSelectExhibits,
  makeSelectFacilities,
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

// Local
import {
  makeSelectSearchTerm,
  makeSelectSearchData,
  makeSelectIsSearching,
  makeSelectSearchResults,
} from './selectors';

import {
  dispatchSearchTerm,
  dispatchSetSearchTerm,
  dispatchBeginSearch,
  dispatchSearchCompleted,
} from './dispatches';

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

const List = styled.ul`
  margin: 0 0 calc(var(--topbar-height) * 1.5) 0;
  padding: 0;
  list-style-type: 0;
`;

const Item = styled.li`
  border-bottom: 1px solid var(--light-gray);
`;

export class Search extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.searchTerm = this.searchTerm.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.renderPlacesList = this.renderPlacesList.bind(this);
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
    const { onBeginSearchQuery } = this.props;

    if (event.key === 'Enter') {
      onBeginSearchQuery();
      this.searchTerm();
    }
  }

  searchTerm() {
    const { searchTerm, searchData, onSearchResultsLoaded, exhibitProps, facilityProps } = this.props;
    const queryResults = search(searchTerm, searchData, true);

    const exhibits = (exhibitProps.artisticAlley) ? exhibitProps : exhibitProps.toJS();
    const facilities = (facilityProps.medical) ? facilityProps : facilityProps.toJS();
    //
    const returnedPlaces = [];

    //
    let placeResult;

    //
    let key = 0;

    // Create array of places using queryResults
    queryResults.forEach((place) => { // eslint-disable-line
      switch (place.type) {
        case 'exhibit':
          key = parseInt(place.key, 10);
          placeResult = exhibits[place.subType][key];
          returnedPlaces.push(placeResult);
          break;
        case 'facility':
          key = parseInt(place.key, 10);
          placeResult = facilities[place.subType][key];
          returnedPlaces.push(placeResult);
          break;
        default:
          break;
      }
    });

    // Call search results loaded
    onSearchResultsLoaded(returnedPlaces);
  }

  renderPlacesList() {
    const { searchResults } = this.props;

    if (searchResults.length === 0) return null;

    return searchResults.map((result, index) => { // eslint-disable-line

      const room = (isNaN(result.location) && isNaN(result.location.charAt(1)))
        ? result.location
        : result.exhibitCode;

      const location = `${result.building}, ${room}`;
      const link = (result.type === 'exhibit')
        ? `/${result.type}/${result.colorZone}/${result.exhibitCode}/${result.key}`
        : `/${result.type}/${result.colorZone}/${result.subType}/${result.key}`;

      const place = {
        link,
        location,
        name: result.name,
        zone: result.imagineRitArea,
        zoneClass: result.colorZone,
      };

      return (
        <Item key={index}>
          <Card place={place} />
        </Item>
      );
    });
  }

  render() {
    const { searchResults, isSearching, searchTerm, onChangeTerm } = this.props;

    let bodyContent = null;

    if (isSearching) {
      bodyContent = (<SmallWrapper className={'centered'}><H3>Searching...</H3></SmallWrapper>);
    } else if (
      (searchResults.length === 0)
      || (searchResults.length === undefined)
      || (searchTerm.length === 0)) {
      bodyContent = (<SmallWrapper className={'centered'}><P>Show Empty State here</P></SmallWrapper>);
    } else {
      // Call function for lists
      bodyContent = (
        <List>
          {this.renderPlacesList()}
        </List>
      );
    }

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
          {bodyContent}
        </Container>
      </div>
    );
  }
}

Search.propTypes = {
  isSearching: T.bool,
  isSignedIn: T.bool,
  searchResults: T.any,
  exhibitProps: T.object,
  facilityProps: T.object,
  userProps: T.object.isRequired,
  searchData: T.string.isRequired,
  searchTerm: T.string,
  onChangeTerm: T.func.isRequired,
  onGetAuthenticatedUser: T.func.isRequired,
  onBeginSearchQuery: T.func.isRequired,
  onSearchResultsLoaded: T.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userProps: makeSelectUser(),
  searchData: makeSelectSearchData(),
  searchTerm: makeSelectSearchTerm(),
  isSignedIn: makeSelectIsSignedIn(),
  isSearching: makeSelectIsSearching(),
  searchResults: makeSelectSearchResults(),
  exhibitProps: makeSelectExhibits(),
  facilityProps: makeSelectFacilities(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onBeginSearchQuery: () => dispatchBeginSearch(dispatch),
    onSubmitSearch: (event) => dispatchSearchTerm(dispatch, event),
    onChangeTerm: (event) => dispatchSetSearchTerm(dispatch, event),
    onGetAuthenticatedUser: () => dispatchGetAuthenticatedUser(dispatch),
    onSearchResultsLoaded: (results) => dispatchSearchCompleted(dispatch, results),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
