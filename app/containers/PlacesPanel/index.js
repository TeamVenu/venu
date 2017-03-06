import React, { PropTypes as T } from 'react';
import DetailView from './DetailView';
import ListView from './ListView';
import { Wrapper, HandleWrapper, Handle } from './styles';

export default class PlacesPanel extends React.Component {

  static propTypes = {
    places: T.array,
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
      newPositionY: null,
      absolutePos: null,
      wrapperStyle: {},
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
  }

  handleMouseDown(e) {
    // Get the position
    const position = e.pageY;

    // Activate event listeners
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    document.addEventListener('mouseup', this.handleMouseUp.bind(this));

    // Call function which handles press event
    this.handlePanelPress(position);
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

  handleMouseUp() {
    const { pressing, dragging } = this.state;

    // If user is not pressing or dragging exit
    if (!pressing || !dragging) return;

    // Remove event listeners
    document.removeEventListener('mousemove', this.handleMouseMove.bind(this));
    document.removeEventListener('mouseup', this.handleMouseUp.bind(this));

    // Call function which cancels moving
    this.handlePanelRelease();
  }

  handleTouchStart(e) {
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

  handleTouchEnd() {
    const { pressing, dragging } = this.state;

    // If user is not pressing or dragging exit
    if (!pressing || !dragging) return;

    // Remove event listeners
    document.removeEventListener('touchmove', this.handleTouchMove.bind(this));
    document.removeEventListener('touchend', this.handleTouchEnd.bind(this));
    document.removeEventListener('touchcancel', this.handleTouchEnd.bind(this));

    // Call function which cancels moving
    this.handlePanelRelease();
  }

  handlePanelPress(position) {
    const button = document.getElementById('places-list-slider');
    const buttonTop = button.getBoundingClientRect().top;
    const offset = position - buttonTop;
    const absolutePos = position - offset;
    const newAbsolute = absolutePos + 'px'; //eslint-disable-line

    // Update state
    this.setState({
      pressing: true,
      absolutePos,
      initialPositionY: position,
      wrapperStyle: {
        width: '100%',
        position: 'absolute',
        top: newAbsolute,
      },
    });
  }

  handlePanelDrag(position) {
    const HEADER_HEIGHT = 80; // Height of the header
    const HANDLE_HEIGHT = 70; // Height of the handle
    const appContainer = document.getElementById('app'); // Get app container as reference
    const appBottom = appContainer.getBoundingClientRect().bottom; // Get the bottom of the app
    const HANDLE_OFFSET = appBottom - HANDLE_HEIGHT; // calculcate the bottom of the app minus the handle height

    // Make sure we stay within bounds
    // Can't go over header
    // And always show the handle
    if (position < HEADER_HEIGHT || position > HANDLE_OFFSET) return;

    const { initialPositionY } = this.state;
    const { absolutePos } = this.state;
    const newSlideValue = (initialPositionY - position) * -1;
    const result = absolutePos + newSlideValue;
    const newAbsolute = result + 'px'; //eslint-disable-line

    this.setState({
      dragging: true,
      initialPositionY: position,
      absolutePos: result,
      wrapperStyle: {
        width: '100%',
        position: 'absolute',
        top: newAbsolute,
      },
    });
  }

  handlePanelRelease() {
    // Set to false
    this.setState({
      dragging: false,
      pressing: false,
    });
  }

  renderPlacesListView() {
    return (
      <ListView places={this.props.places} clickOnPlaceCard={this.props.clickOnPlaceCard} />
    );
  }

  renderPlaceDetailView() {
    const { detailedPlace, clearPlaceInfo,
      navigateToPlace, likeExhibit, unLikeExhibit,
      setExhibitToDefault, setExhibitToRecommended,
      setExhibitToBookmarked, setExhibitToVisited } = this.props;

    return (
      <DetailView
        place={detailedPlace}
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

    // If we have a detailedPlace prop
    // Set viewMode to render that place detail view
    // Otherwise set viewMode to render the ListView
    const viewMode = (detailedPlace) ? this.renderPlaceDetailView() : this.renderPlacesListView();

    return (
      <Wrapper style={this.state.wrapperStyle}>
        <HandleWrapper
          id="places-list-slider"
          onMouseDown={this.handleMouseDown}
          onTouchStart={this.handleTouchStart}
        >
          <Handle />
        </HandleWrapper>
        { viewMode }
      </Wrapper>
    );
  }
}
