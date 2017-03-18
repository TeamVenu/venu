import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// Global Selectors
import {
  makeSelectUser,
  makeSelectMapMode,
  makeSelectExhibits,
  makeSelectFacilities,
  makeSelectCurrentPlace,
} from 'containers/App/selectors';

// Global Helpers
import {

} from 'containers/App/dispatches';

import { makePanelSelect } from './selectors';

import {
  dispatchHandleDrag,
  dispatchHandlePress,
  dispatchHandleRelease,
} from './dispatches';

// Messages
import messages from './messages';

// Local components
// import DetailView from './DetailView';
// import ListView from './ListView';

import {
  Wrapper,
  HandleWrapper,
  Handle,
  Title,
} from './styles';

export class Panel extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    // Bind Render events
    this.renderTitle = this.renderTitle.bind(this);
    this.renderPlacesListView = this.renderPlacesListView.bind(this);
    this.renderPlaceDetailView = this.renderPlaceDetailView.bind(this);

    // Bind Mouse events
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);

    // Bind Touch Events
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);

    // Bind Move events
    this.onHandlePanelPress = this.onHandlePanelPress.bind(this);
    this.onHandlePanelDrag = this.onHandlePanelDrag.bind(this);
    this.onHandlePanelRelease = this.onHandlePanelRelease.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize);
  }

  /* Panel Movement Functions */
  onHandlePanelPress(position) {
    const button = document.getElementById('places-list-slider');
    const buttonTop = button.getBoundingClientRect().top;
    const offset = position - buttonTop;
    const absolutePositionY = position - offset;
    const { panelProps, onDispatchHandlePress } = this.props;
    // We don't know if panelProps is an object or an immutable yet
    // So let's test that it has the inlineStyles object
    // If it doesn't it is an immutable
    const panelClass = (panelProps.inlineStyles) ? panelProps.panelClass : panelProps.get('panelClass');
    const newPanelProps = {
      pressing: true,
      dragging: false,
      panelClass,
      absolutePositionY,
      initialPositionY: absolutePositionY,
      previousPositionY: absolutePositionY,
      inlineStyles: {
        top: `${absolutePositionY}px`,
      },
    };

    onDispatchHandlePress(newPanelProps);
  }

  onHandlePanelDrag(position) {
    // Get the values from state
    const { panelProps, onDispatchHandleDrag } = this.props;

    // Calculate new slide value
    // Take the intialPositionY and subtract from it new position
    // Then multiply it by negative one to get direction
    const newSlideValue = (panelProps.previousPositionY - position) * -1;

    // Add the absolutePositionY to the new newSlideValue
    // To get new absolute position
    const result = panelProps.absolutePositionY + newSlideValue;

    const newPanelProps = {
      pressing: true,
      dragging: true,
      panelClass: panelProps.panelClass,
      absolutePositionY: result,
      initialPositionY: panelProps.initialPositionY,
      previousPositionY: position,
      inlineStyles: {
        top: `${result}px`,
      },
    };

    onDispatchHandleDrag(newPanelProps);
  }

  onHandlePanelRelease(position) {
    // Get the height of the device
    const { innerHeight } = window;

    // Get the state properties
    const { panelProps, onDispatchHandleRelease } = this.props;

    // Make a new variable for the new positionClass
    // Set it to the current one
    let newPositionClass = panelProps.panelClass;

    // Set a SWIPE_FORCE
    // const SWIPE_FORCE = 200;

    // Calculate force
    const force = position - panelProps.initialPositionY;

    // Calculate the snapPoints
    const snapPoints = {
      top: 80,
      mid: (innerHeight * 0.55),
      bottom: (innerHeight * 0.75),
    };

    const distanceToSnapPoints = {
      top: Math.abs((position - snapPoints.top)),
      mid: Math.abs((position - snapPoints.mid)),
      bottom: Math.abs((position - snapPoints.bottom)),
    };

    // const distance
    // If force changed
    if (force !== 0) {
      if ((distanceToSnapPoints.top < distanceToSnapPoints.mid) && (distanceToSnapPoints.top < distanceToSnapPoints.bottom)) {
        newPositionClass = 'full';
      } else if ((distanceToSnapPoints.mid < distanceToSnapPoints.top) && (distanceToSnapPoints.mid < distanceToSnapPoints.bottom)) {
        newPositionClass = null;
      } else if ((distanceToSnapPoints.bottom < distanceToSnapPoints.mid) && (distanceToSnapPoints.bottom < distanceToSnapPoints.top)) {
        newPositionClass = 'collapsed';
      }
    }

    const newPanelProps = {
      pressing: false,
      dragging: false,
      panelClass: newPositionClass,
      absolutePositionY: null,
      initialPositionY: null,
      previousPositionY: null,
      inlineStyles: { },
    };

    onDispatchHandleRelease(newPanelProps);
  }

  /**
   * handleWindowResize
   */
  handleWindowResize() {
    const { onDispatchHandleRelease } = this.props;
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

      const newPanelProps = {
        pressing: false,
        dragging: false,
        panelClass: null,
        absolutePositionY: null,
        initialPositionY: null,
        previousPositionY: null,
        inlineStyles: { },
      };

      onDispatchHandleRelease(newPanelProps);
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
      this.onHandlePanelPress(position);
    }
  }

  handleMouseMove(e) {
    const { pressing } = this.props.panelProps;

    if (!pressing) return;

    // Get the position
    const position = e.pageY;

    // Call function which handles drag event
    this.onHandlePanelDrag(position);
  }

  handleMouseUp(e) {
    // Get the panel props we need
    const { pressing, dragging } = this.props.panelProps;

    // If not pressing or dragging return
    if (!pressing || !dragging) return;

    // Get the position where user let go of mouse
    const position = e.pageY;

    // Remove event listeners
    document.removeEventListener('mousemove', this.handleMouseMove.bind(this));
    document.removeEventListener('mouseup', this.handleMouseUp.bind(this));

    // Call function which cancels moving
    this.onHandlePanelRelease(position);
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
      this.onHandlePanelPress(position);
    }
  }

  handleTouchMove(e) {
    const { pressing } = this.props.panelProps;

    if (!pressing) return;

    const touches = Array.from(e.changedTouches);

    touches.forEach((touch) => {
      // Get the position
      const position = touch.pageY;

      // Call function which handles drag event
      this.onHandlePanelDrag(position);
    });
  }

  handleTouchEnd(e) {
    // Get the panel props we need
    const { pressing, dragging } = this.props.panelProps;

    // If not pressing or dragging return
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
    this.onHandlePanelRelease(position);
  }

  /* Render functions */
  renderTitle() {
    const { currentPlace, mapMode } = this.props;

    // If there is a current place no title
    if (currentPlace.size > 0) return null;

    const text = mapMode.toLowerCase();

    return (
      <Title>
        { messages.mode[text].defaultMessage }
      </Title>
    );
  }

  renderPlacesListView() {
    return null;
  }

  renderPlaceDetailView() {
    return null;
  }

  render() {
    const { currentPlace, panelProps } = this.props;

    // const props = panelProps.toJS();

    // console.log('current place');
    // console.log(currentPlace);

    const detailedPlace = currentPlace.toJS();

    // console.log('detailed place');
    // console.log(detailedPlace);

    const viewMode = (detailedPlace) ? this.renderPlaceDetailView() : this.renderPlacesListView();

    return (
      <Wrapper style={panelProps.inlineStyles} className={panelProps.panelClass}>
        <HandleWrapper
          id={'places-list-slider'}
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

Panel.propTypes = {
  mapMode: T.string,
  panelProps: T.object,
  currentPlace: T.object,
  onDispatchHandleDrag: T.func,
  onDispatchHandlePress: T.func,
  onDispatchHandleRelease: T.func,
};

// Map state to props
const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  mapMode: makeSelectMapMode(),
  panelProps: makePanelSelect(),
  exhibits: makeSelectExhibits(),
  facilities: makeSelectFacilities(),
  currentPlace: makeSelectCurrentPlace(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onDispatchHandleDrag: (props) => dispatchHandleDrag(dispatch, props),
    onDispatchHandlePress: (props) => dispatchHandlePress(dispatch, props),
    onDispatchHandleRelease: (props) => dispatchHandleRelease(dispatch, props),
  };
}

// Connect our Panel
export default connect(mapStateToProps, mapDispatchToProps)(Panel);
