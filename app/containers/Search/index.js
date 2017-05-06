/*
 * Search
 */

import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';
import Ionicon from 'react-ionicons';

// Components
import P from 'components/P';
import H3 from 'components/H3';
import H4 from 'components/H4';
import Card from 'components/Card';
import TabBar from 'components/TabBar';
import Button from 'components/Button';
import Slider from 'components/Slider';
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
  SearchContainer,
  SearchLabel,
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
  SlideList,
} from './styles';

import messages from './messages';

export class Search extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.searchTerm = this.searchTerm.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.renderPlacesList = this.renderPlacesList.bind(this);
    this.renderInitianState = this.renderInitianState.bind(this);
    this.renderCarouselList = this.renderCarouselList.bind(this);
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
    this.renderRecommendedPlaces = this.renderRecommendedPlaces.bind(this);
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
    this.clearSearch();
  }

  clearSearch() {
    const { onChangeTerm } = this.props;
    const event = { target: { value: '' } };
    onChangeTerm(event);
    this.searchTerm('');
  }
  handleKeyPress(event) {
    const { onBeginSearchQuery } = this.props;

    if (event.key === 'Enter') {
      onBeginSearchQuery();
      this.searchTerm(event.target.value, false);
    }
  }

  handleCategoryClick(category) {
    const { onChangeTerm, onBeginSearchQuery } = this.props;
    const event = { target: { value: category } };
    onChangeTerm(event);
    onBeginSearchQuery();
    this.searchTerm(category, true);
  }

  searchTerm(term, exact) {
    const { searchData, onSearchResultsLoaded, exhibitProps, facilityProps } = this.props;
    if (term.length > 0) {
      const queryResults = search(term, searchData, exact);
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
    } else {
      onSearchResultsLoaded([]);
    }
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
                  <TagButton onClick={() => { this.handleCategoryClick(interest); }}>
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
                    <FacilityButton onClick={() => { this.handleCategoryClick(facility.term); }}>
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

    // Slider settings
    const settings = {
      arrows: false,
      // infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [{
        breakpoint: 1170,
        settings: {
          slidesToShow: 3,
        },
      }, {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
        },
      }, {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
      ],
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
        if (exhibits[zone.name].length <= 2) return null;
        return (
          <VerticalListSection key={index}>
            <H4>{ zone.defaultMessage }</H4>
            <Slider {...settings}>
              { this.renderCarouselList(exhibits[zone.name]) }
            </Slider>
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
        <SlideList key={index}>
          <Card place={place} />
        </SlideList>
      );
    });
  }

  render() {
    const { searchTerm, searchResults, isSearching, onChangeTerm } = this.props;
    let bodyContent = null;
    const closeButton = (searchTerm.length > 0) ? (
      <Button
        btnClasses={'clear'}
        icon={'ion-ios-close'}
        onClickEvent={this.clearSearch}
      />
    ) : null;

    if (isSearching) {
      bodyContent = (<SmallWrapper className={'center'}><H3>Searching...</H3></SmallWrapper>);
    } else if (
      (searchResults.length === 0)
      || (searchResults.size === 0)) {
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
      <section>
        <TabBar className={'sticky'}>
          <SearchContainer>
            <SearchLabel htmlFor={'search-input'}>
              <Ionicon icon={'icon ion-android-search'} />
            </SearchLabel>
            { closeButton }
            <SearchBox
              id={'search-input'}
              type={'text'}
              value={searchTerm}
              onChange={onChangeTerm}
              onKeyPress={this.handleKeyPress}
              placeholder={messages.header.defaultMessage}
            />
          </SearchContainer>
        </TabBar>
        {bodyContent}
      </section>
    );
  }
}

Search.propTypes = {
  isSearching: T.bool,
  isSignedIn: T.bool,
  searchTerm: T.string,
  searchResults: T.any,
  exhibitProps: T.object,
  facilityProps: T.object,
  userProps: T.object.isRequired,
  searchData: T.string.isRequired,
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
