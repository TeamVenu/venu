import React, { PropTypes as T, Component } from 'react';

import { PinWrapper, FacilityPinWrapper, FacilityPin, EventPinWrapper, EventPin, TextWrapper, Text } from './styles';

export default class Marker extends Component {
  static propTypes = {
    type: T.string,
    gender: T.string,
    category: T.string,
    $hover: T.bool,
    name: T.string,
    currentMarker: T.object,
    lat: T.number,
    lng: T.number,
    clickOnPlaceCard: T.func,
  }

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.clickEvent = this.clickEvent.bind(this);
  }

  clickEvent() {
    const place = this.props;
    this.props.clickOnPlaceCard(place);
  }


  renderFacilityPin() {
    const { gender } = this.props;
    const { name } = this.props;
    const { currentMarker } = this.props;
    let selected = false;

    if (currentMarker && currentMarker.lat === this.props.lat && currentMarker.lng === this.props.lng) {
      selected = true;
    }

    return (
      <PinWrapper onClick={this.clickEvent}>
        <FacilityPinWrapper>
          <FacilityPin>{gender}</FacilityPin>
        </FacilityPinWrapper>
        <TextWrapper className={(selected) ? 'show' : ''}>
          <Text>{name} Restroom</Text>
        </TextWrapper>
      </PinWrapper>
    );
  }

  renderEventPin() {
    const { category } = this.props;
    const { name } = this.props;
    const hovered = this.props.$hover;
    const { currentMarker } = this.props;
    let selected = false;

    if (currentMarker && currentMarker.lat === this.props.lat && currentMarker.lng === this.props.lng) {
      selected = true;
    }

    if (hovered) {
      // console.log('hovering!');
    }

    if (category === 'new media' || category === 'chemistry' || hovered) {
      return (
        <PinWrapper onClick={this.clickEvent}>
          <EventPinWrapper highlight>
            <EventPin highlight />
          </EventPinWrapper>
          <TextWrapper className={(selected) ? 'show' : ''}>
            <Text>{name}</Text>
          </TextWrapper>
        </PinWrapper>
      );
    }

    return (
      <PinWrapper onClick={this.clickEvent}>
        <EventPinWrapper>
          <EventPin />
        </EventPinWrapper>
        <TextWrapper className={(selected) ? 'show' : ''}>
          <Text>{name}</Text>
        </TextWrapper>
      </PinWrapper>
    );
  }

  renderPin() {
    const { type } = this.props;

    if (type === 'event') {
      return (
        this.renderEventPin()
      );
    }
    return (
      this.renderFacilityPin()
    );
  }

  render() {
    return (
      this.renderPin()
    );
  }
}
