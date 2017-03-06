import React, { PropTypes as T, Component } from 'react';
import FoodIcon from 'media/icons/food.png';
import RestroomIcon from 'media/icons/restroom.png';
import ManIcon from 'media/icons/man.png';
import WomanIcon from 'media/icons/woman.png';
import { POIContainer, PinWrapper, Pin, PinImage } from './styles';

export default class Marker extends Component {
  static propTypes = {
    currentMarker: T.object,
    place: T.object.isRequired,
    clickOnPlaceCard: T.func,
  }

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.handlePinClick = this.handlePinClick.bind(this);
  }

  handlePinClick() {
    const { place } = this.props;
    this.props.clickOnPlaceCard(place);
  }

  renderPin() {
    const { place } = this.props;
    if (!place) { return null; }
    const { currentMarker } = this.props;
    let placePinClasses = place.type + ' ' + place.subType; // eslint-disable-line

    if (currentMarker && (currentMarker.lat === place.lat && currentMarker.lng === place.lng)) {
      placePinClasses += ' selected';
    }

    return (
      <POIContainer className={placePinClasses} onClick={this.handlePinClick}>
        <PinWrapper>
          <Pin>
            { this.renderPinImage(place) }
          </Pin>
        </PinWrapper>
      </POIContainer>
    );
  }

  renderPinImage(place) {
    if (place.type !== 'facility') {
      return null;
    }

    switch (place.subType) {
      case 'restroom':
        switch (place.gender) {
          case 'M':
            return (
              <PinImage src={ManIcon} />
            );
          case 'W':
            return (
              <PinImage src={WomanIcon} />
            );
          case 'U':
            return (
              <PinImage src={RestroomIcon} />
            );
          default:
            return null;
        }
      case 'food':
        return (
          <PinImage src={FoodIcon} />
        );
      case 'information':
        // TODO: Correct Icon
        return (
          <PinImage src={FoodIcon} />
        );
      case 'medical':
        // TODO: Correct Icon
        return (
          <PinImage src={FoodIcon} />
        );
      default:
        return null;
    }
  }

  render() {
    return (
      this.renderPin()
    );
  }
}
