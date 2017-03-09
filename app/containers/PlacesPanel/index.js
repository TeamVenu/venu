import React, { PropTypes as T } from 'react';
import DetailView from './DetailView';
import ListView from './ListView';
import { Wrapper, HandleWrapper, Handle, Title } from './styles';

export default class PlacesPanel extends React.Component {

  static propTypes = {
    exhibits: T.object.isRequired,
    facilities: T.object.isRequired,
    mapMode: T.string.isRequired,
    locationEnabled: T.bool.isRequired,
    clickOnPlaceCard: T.func,
    clearPlaceInfo: T.func,
    detailedPlace: T.object,
    navigateToPlace: T.func,
    likeExhibit: T.func,
    unLikeExhibit: T.func,
    setExhibitToDefault: T.func,
    setExhibitToRecommended: T.func,
    setExhibitToBookmarked: T.func,
    setExhibitToVisited: T.func,
  };

  static defaultProps = {
    title: 'Places',
    detailedPlace: null,
  }

  constructor(props) {
    super(props);

    this.state = {
      pressing: false,
      dragging: false,
      initialPositionY: null,
      previousPositionY: null,
      newPositionY: null,
      absolutePos: null,
      wrapperStyle: {},
      positionClass: 'collapsed',
    };

    // Bind Mouse events
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);

    // Bind Touch Events
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);

    // Bind Move events
    this.handlePanelPress = this.handlePanelPress.bind(this);
    this.handlePanelDrag = this.handlePanelDrag.bind(this);
    this.handlePanelRelease = this.handlePanelRelease.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize);
  }

  /**
   * handleWindowResize
   */
  handleWindowResize() {
    const { innerWidth } = window;
    const MIN_WIDTH = 720;

    // If window width is 720 or greater
    if (innerWidth >= MIN_WIDTH) {
      // We want to remove event listeners

      // Remove mouse event listeners
      document.removeEventListener('mousemove', this.handleMouseMove.bind(this));
      document.removeEventListener('mouseup', this.handleMouseUp.bind(this));

      // Remove touch event listeners
      document.removeEventListener('touchmove', this.handleTouchMove.bind(this));
      document.removeEventListener('touchend', this.handleTouchEnd.bind(this));
      document.removeEventListener('touchcancel', this.handleTouchEnd.bind(this));

      // We want to remove inline styles
      this.setState({
        wrapperStyle: null,
      });
    }
  }

  /* Mouse Events */
  handleMouseDown(e) {
    const { innerWidth } = window;
    const MAX_WIDTH = 720;

    // If window width is less than 720
    if (innerWidth < MAX_WIDTH) {
      // Get the position
      const position = e.pageY;

      // Activate event listeners
      document.addEventListener('mousemove', this.handleMouseMove.bind(this));
      document.addEventListener('mouseup', this.handleMouseUp.bind(this));

      // Call function which handles press event
      this.handlePanelPress(position);
    }
  }

  handleMouseMove(e) {
    const { pressing } = this.state;

    // If user is not pressing exit
    if (!pressing) return;

    // Get the position
    const position = e.pageY;

    // Call function which handles drag event
    this.handlePanelDrag(position);
  }

  handleMouseUp(e) {
    const { pressing, dragging } = this.state;

    // If user is not pressing or dragging exit
    if (!pressing || !dragging) return;

    // Get the position where user let go of mouse
    const position = e.pageY;

    // Remove event listeners
    document.removeEventListener('mousemove', this.handleMouseMove.bind(this));
    document.removeEventListener('mouseup', this.handleMouseUp.bind(this));

    // Call function which cancels moving
    this.handlePanelRelease(position);
  }

  /* Touch Events */
  handleTouchStart(e) {
    const { innerWidth } = window;
    const MAX_WIDTH = 720;

    // If window width is less than 720
    if (innerWidth < MAX_WIDTH) {
      // Prevent default action
      e.preventDefault();

      // Get the position
      const position = e.changedTouches[0].pageY;

      // Activate event listeners
      document.addEventListener('touchmove', this.handleTouchMove.bind(this));
      document.addEventListener('touchend', this.handleTouchEnd.bind(this));
      document.addEventListener('touchcancel', this.handleTouchEnd.bind(this));

      // Call function which handles press event
      this.handlePanelPress(position);
    }
  }

  handleTouchMove(e) {
    // Prevent default action
    // Commented because it would cause us
    // to be unable to scroll through list
    // e.preventDefault();

    const { pressing } = this.state;

    // If user is not pressing exit
    if (!pressing) return;

    const touches = Array.from(e.changedTouches);

    touches.forEach((touch) => {
      // Get the position
      const position = touch.pageY;

      // Call function which handles drag event
      this.handlePanelDrag(position);
    });
  }

  handleTouchEnd(e) {
    const { pressing, dragging } = this.state;

    // If user is not pressing or dragging exit
    if (!pressing || !dragging) return;

    // Get the array of touches
    const touches = Array.from(e.changedTouches);

    // Get the index of the last touch
    const index = touches.length - 1;

    // Get the position of last touch
    const position = touches[index].pageY;

    // Remove event listeners
    document.removeEventListener('touchmove', this.handleTouchMove.bind(this));
    document.removeEventListener('touchend', this.handleTouchEnd.bind(this));
    document.removeEventListener('touchcancel', this.handleTouchEnd.bind(this));

    // Call function which cancels moving
    this.handlePanelRelease(position);
  }

  /* Panel Movement Functions */
  handlePanelPress(position) {
    const button = document.getElementById('places-list-slider');
    const buttonTop = button.getBoundingClientRect().top;
    const offset = position - buttonTop;
    const absolutePos = position - offset;

    // Update state
    this.setState({
      pressing: true,
      absolutePos,
      initialPositionY: position,
      previousPositionY: position,
      wrapperStyle: {
        top: `${absolutePos}px`,
      },
    });
  }

  handlePanelDrag(position) {
    // Get the values from state
    const { absolutePos, previousPositionY } = this.state;

    // Calculate new slide value
    // Take the intialPosition and subtract from it new position
    // Then multiply it by negative one to get direction
    const newSlideValue = (previousPositionY - position) * -1;

    // Add the absolutePos to the new newSlideValue
    // To get new absolute position
    const result = absolutePos + newSlideValue;

    this.setState({
      dragging: true,
      previousPositionY: position,
      absolutePos: result,
      wrapperStyle: {
        top: `${result}px`,
      },
    });
  }

  handlePanelRelease(position) {
    // Get the state properties
    const { positionClass, initialPositionY } = this.state;

    // Make a new variable for the new positionClass
    // Set it to the current one
    let newPositionClass = positionClass;

    // Set a SWIPE_FORCE
    const SWIPE_FORCE = 200;

    // Calculate force
    const force = position - initialPositionY;

    // If force changed
    if (force !== 0) {
      switch (positionClass) {
        case 'collapsed':
          // If user swiped up
          if (initialPositionY > position) {
            // If swipe is greater than SWIPE_FORCE
            if (Math.abs(force) > SWIPE_FORCE) {
              // Set class to fullpage
              newPositionClass = 'full';
            } else {
              // Else set to null (middle)
              newPositionClass = null;
            }
          }
          break;
        case 'full':
          // If user swiped down
          if (position > initialPositionY) {
            // If swipe is greater than SWIPE_FORCE
            if (Math.abs(force) > SWIPE_FORCE) {
              // Set class to collapsed
              newPositionClass = 'collapsed';
            } else {
              // Otherwise set to null (middle)
              newPositionClass = null;
            }
          }
          break;
        default:
          // If user swiped up
          if (initialPositionY > position) {
            // Set class to full
            newPositionClass = 'full';
          } else {
            // Set class to collapsed
            newPositionClass = 'collapsed';
          }
          break;
      }
    }

    // Set new state with newPositionClass and set wrapperStyle to empty
    this.setState({
      dragging: false,
      pressing: false,
      wrapperStyle: {},
      positionClass: newPositionClass,
    });
  }

  renderTitle() {
    const { detailedPlace, mapMode } = this.props;

    if (detailedPlace) return null;

    let titleString = '';

    switch (mapMode) {
      case 'Discover':
        titleString = 'Recommended For You';
        break;
      case 'Itinerary':
        titleString = 'In Your Itinerary';
        break;
      case 'Facilities':
        titleString = 'Facilities In Your Area';
        break;
      default:
        titleString = null;
        break;
    }

    return (
      <Title>{titleString}</Title>
    );
  }

  renderPlacesListView() {
    const { exhibits, facilities, mapMode, locationEnabled, clickOnPlaceCard } = this.props;

    return (
      <ListView
        exhibits={exhibits}
        facilities={facilities}
        mapMode={mapMode}
        locationEnabled={locationEnabled}
        clickOnPlaceCard={clickOnPlaceCard}
      />
    );
  }

  renderPlaceDetailView() {
    const { detailedPlace, locationEnabled, clearPlaceInfo,
      navigateToPlace, likeExhibit, unLikeExhibit,
      setExhibitToDefault, setExhibitToRecommended,
      setExhibitToBookmarked, setExhibitToVisited } = this.props;

    return (
      <DetailView
        place={detailedPlace}
        locationEnabled={locationEnabled}
        clearPlaceInfo={clearPlaceInfo}
        navigateToPlace={navigateToPlace}
        likeExhibit={likeExhibit}
        unLikeExhibit={unLikeExhibit}
        setExhibitToDefault={setExhibitToDefault}
        setExhibitToRecommended={setExhibitToRecommended}
        setExhibitToBookmarked={setExhibitToBookmarked}
        setExhibitToVisited={setExhibitToVisited}
      />
    );
  }

  render() {
    // Get Details Place prop
    const { detailedPlace } = this.props;

    // Get the wrapperStyle and positionClass
    const { wrapperStyle, positionClass } = this.state;

    // If we have a detailedPlace prop
    // Set viewMode to render that place detail view
    // Otherwise set viewMode to render the ListView
    const viewMode = (detailedPlace) ? this.renderPlaceDetailView() : this.renderPlacesListView();

    return (
      <Wrapper style={wrapperStyle} className={positionClass}>
        <HandleWrapper
          id="places-list-slider"
          onMouseDown={this.handleMouseDown}
          onTouchStart={this.handleTouchStart}
        >
          <Handle />
        </HandleWrapper>
        { this.renderTitle() }
        { viewMode }
      </Wrapper>
    );
  }
}
