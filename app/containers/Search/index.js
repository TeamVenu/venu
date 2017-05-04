/*
 * Search
 */

import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';

// Components
import P from 'components/P';
import H3 from 'components/H3';
import H4 from 'components/H4';
import Carousel from 'components/Carousel';
import Card from 'components/Card';
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

import {
  Wrapper,
  SearchBox,
  List,
  Item,
  VerticalListView,
  VerticalListSection,
  HorizontalListView,
  HorizontalListItem,
  TagButton,
  FacilityButton,
  FacilityIcon,
} from './styles';

import messages from './messages';

export class Search extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.searchTerm = this.searchTerm.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.renderPlacesList = this.renderPlacesList.bind(this);
    this.renderInitianState = this.renderInitianState.bind(this);
    this.renderRecommendedPlaces = this.renderRecommendedPlaces.bind(this);
    this.renderCarouselList = this.renderCarouselList.bind(this);
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

  componentWillUnmount() {
    const { onChangeTerm } = this.props;
    const event = { target: { value: '' } };
    onChangeTerm(event);
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
        place: result,
        name: result.name,
        zone: result.imagineRitArea,
        zoneClass: result.colorZone,
      };

      return (
        <Item key={index}>
          <Card place={place} cardClass={'full'} />
        </Item>
      );
    });
  }

  renderInitianState() {
    const { userProps } = this.props;
    const user = (userProps.location) ? userProps : userProps.toJS();
    const interests = Array.from(user.interests);

    return (
      <Wrapper>
        <VerticalListView>
          <VerticalListSection>
            <H4>{messages.tagsHeader.defaultMessage}</H4>
            <HorizontalListView>
              {interests.map((interest, index) => (
                <HorizontalListItem key={index}>
                  <TagButton>
                    {interest}
                  </TagButton>
                </HorizontalListItem>
              ))}
            </HorizontalListView>
          </VerticalListSection>
          <VerticalListSection>
            <H4>{messages.facilitiesHeader.defaultMessage}</H4>
            <HorizontalListView>
              {
                messages.facilities.map((facility, index) => (
                  <HorizontalListItem key={index}>
                    <FacilityButton>
                      <FacilityIcon src={facility.src} alt={`${facility.name} Icon`} />
                      <P>{facility.name}</P>
                    </FacilityButton>
                  </HorizontalListItem>
                ))
              }
            </HorizontalListView>
          </VerticalListSection>
          {this.renderRecommendedPlaces()}
        </VerticalListView>
      </Wrapper>
    );
  }

  renderRecommendedPlaces() {
    const { userProps, exhibitProps } = this.props;
    const user = (userProps.location) ? userProps : userProps.toJS();
    const exhibitObj = (exhibitProps.artisticAlley) ? exhibitProps : exhibitProps.toJS();

    // Make an exhibits object that will hold recommended
    const exhibits = {
      artisticAlley: [],
      businessDistrict: [],
      computerZone: [],
      engineeringPark: [],
      globalVillage: [],
      greenPlace: [],
      innovationCenter: [],
      ntidArea: [],
      recreationZone: [],
      ritCentral: [],
      scienceCenter: [],
      technologyQuarter: [],
      thinkTank: [],
    };

    // If recommended exhibits is greater than 1
    if (user.exhibits.recommended.length > 0) {
      // Go through recommended exhibits
      user.exhibits.recommended.forEach((recommended) => { // eslint-disable-line
        // If value is not empty
        if (recommended.length > 0) {
          // splice value
          const keys = recommended.split('-');

          // Make a place with the values
          const place = exhibitObj[keys[0]][keys[1]];

          // If a place exists
          if (place) {
            // Change exhibit
            exhibits[keys[0]].push(place);
          }
        }
      });

      // return exhibitComponent.artisticAlley;
      return messages.recommendedArray.map((zone, index) => {
        if (exhibits[zone.name].length <= 0) return null;
        return (
          <VerticalListSection key={index}>
            <H4>{ zone.defaultMessage }</H4>
            <Carousel
              decorators={[]}
              cellSpacing={5}
              slideWidth={0.95}
              cellAlign={'center'}
              edgeEasing={'easeOutCirc'}
            >
              { this.renderCarouselList(exhibits[zone.name]) }
            </Carousel>
          </VerticalListSection>
        );
      });
    }

    return null;
  }

  renderCarouselList(exhibits) {
    return exhibits.map((exhibit, index) => {
      const link = `/${exhibit.type}/${exhibit.colorZone}/${exhibit.exhibitCode}/${exhibit.key}`;
      const room = (isNaN(exhibit.location) && isNaN(exhibit.location.charAt(1)))
        ? exhibit.location
        : exhibit.exhibitCode;
      const location = `${exhibit.building}, ${room}`;
      const place = {
        link,
        location,
        place: exhibit,
        name: exhibit.name,
        zone: exhibit.imagineRitArea,
        zoneClass: exhibit.colorZone,
      };
      return (
        <Card key={index} place={place} />
      );
    });
  }

  render() {
    const { searchResults, isSearching, searchTerm, onChangeTerm } = this.props;

    let bodyContent = null;
    if (isSearching) {
      bodyContent = (<SmallWrapper className={'center'}><H3>Searching...</H3></SmallWrapper>);
    } else if (
      (searchResults.length === 0)
      || (searchResults.length === undefined)
      || (searchTerm.length === 0)) {
      bodyContent = this.renderInitianState();
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
          <TabBar>
            <TabBarList className={'header'}>
              <li>
                <SearchBox
                  placeholder={'Find Places'}
                  type={'text'}
                  value={searchTerm}
                  onChange={onChangeTerm}
                  onKeyPress={this.handleKeyPress}
                />
              </li>
            </TabBarList>
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
