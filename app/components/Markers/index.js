import React, { PropTypes as T, Component } from 'react';
import { POIContainer, PinPulse, PinWrapper, Pin, PinIcons, PinIcon } from './styles';

export default class Marker extends Component {
  static propTypes = {
    currentPlace: T.object,
    place: T.object.isRequired,
    onClickEvent: T.func,
  }

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.handlePinClick = this.handlePinClick.bind(this);
  }

  handlePinClick() {
    const { place, onClickEvent } = this.props;
    onClickEvent(place);
  }

  renderPin() {
    const { place } = this.props;
    if (!place) { return null; }
    const { currentPlace } = this.props;
    let placePinClasses = place.type + ' ' + place.subType; // eslint-disable-line

    if (currentPlace && (currentPlace.lat === place.lat && currentPlace.lng === place.lng)) {
      placePinClasses += ' selected';
    }

    const link = (place.subType !== 'user' && place.subType !== 'parking') ? `/place/${place.type}/${place.id}` : null;

    return (
      <POIContainer className={placePinClasses} onClick={this.handlePinClick}>
        <PinPulse>
          <PinWrapper to={link}>
            <Pin>
              { this.renderPinIcon(place) }
            </Pin>
          </PinWrapper>
        </PinPulse>
      </POIContainer>
    );
  }

  renderPinIcon(place) {
    if (place.type !== 'facility') {
      return null;
    }

    switch (place.subType) {
      case 'restroom':
        switch (place.gender) {
          case 'M':
            return (
              <PinIcon icon={'ion-man'} fontSize={'18px'} />
            );
          case 'W':
            return (
              <PinIcon icon={'ion-woman'} fontSize={'18px'} />
            );
          case 'U':
            return (
              <PinIcons>
                <PinIcon icon={'ion-woman'} fontSize={'15px'} />
                <PinIcon icon={'ion-man'} fontSize={'15px'} />
              </PinIcons>
            );
          default:
            return null;
        }
      case 'food':
        return (
          <PinIcons>
            <PinIcon icon={'ion-fork'} fontSize={'15px'} />
            <PinIcon icon={'ion-knife'} fontSize={'15px'} />
          </PinIcons>
        );
      case 'information':
        // TODO: Correct Icon
        return (
          <PinIcon icon={'ion-help'} fontSize={'18px'} />
        );
      case 'medical':
        // TODO: Correct Icon
        return (
          <PinIcon icon={'ion-medkit'} fontSize={'18px'} />
        );
      case 'parking':
        return (
          <PinIcon icon={'ion-model-s'} fontSize={'18px'} />
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
