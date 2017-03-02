import React, { PropTypes as T } from 'react';

import ListView from './ListView';
import { Wrapper, HandleWrapper, Handle } from './styles';

export default class PlacesContainer extends React.Component {

  static propTypes = {
    places: T.array,
    clickOnPlaceCard: T.func,
  };

  static defaultProps = {
    title: 'Places',
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
    this.handleContainerPress = this.handleContainerPress.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleResizeContainer = this.handleResizeContainer.bind(this);
  }

  handleContainerPress(e) {
    if (e.target.nodeName !== 'BUTTON'
      && e.target.nodeName !== 'SPAN') return;

    const button = document.getElementById('places-list-slider');
    const buttonTop = button.getBoundingClientRect().top;
    const offset = e.pageY - buttonTop;
    const absolutePos = e.pageY - offset;
    const newAbsolute = absolutePos + 'px'; //eslint-disable-line

    document.addEventListener('mousemove', this.handleDrag.bind(this));
    document.addEventListener('mouseup', this.handleResizeContainer.bind(this));
    // Update state
    this.setState({
      pressing: true,
      absolutePos,
      initialPositionY: e.pageY,
      wrapperStyle: {
        width: '100%',
        position: 'absolute',
        top: newAbsolute,
      },
    });
  }

  handleDrag(e) {
    const { pressing } = this.state;
    if (!pressing) return;

    const { initialPositionY } = this.state;
    const { absolutePos } = this.state;

    const newPositionY = e.pageY;

    const newSlideValue = (initialPositionY - newPositionY) * -1;
    const result = absolutePos + newSlideValue;
    const newAbsolute = result + 'px'; //eslint-disable-line

    this.setState({
      dragging: true,
      initialPositionY: e.pageY,
      absolutePos: result,
      wrapperStyle: {
        width: '100%',
        position: 'absolute',
        top: newAbsolute,
      },
    });
  }

  handleResizeContainer() {
    const { pressing, dragging } = this.state;
    if (!pressing || !dragging) return;

    // Remove event listeners
    document.removeEventListener('mousemove', this.handleDrag.bind(this));
    document.removeEventListener('mouseup', this.handleResizeContainer.bind(this));

    // Set to false
    this.setState({
      dragging: false,
      pressing: false,
    });
  }

  render() {
    return (
      <Wrapper style={this.state.wrapperStyle}>
        <HandleWrapper
          id="places-list-slider"
          onMouseDown={this.handleContainerPress}
        >
          <Handle />
        </HandleWrapper>
        <ListView places={this.props.places} clickOnPlaceCard={this.props.clickOnPlaceCard} />
      </Wrapper>
    );
  }
}
