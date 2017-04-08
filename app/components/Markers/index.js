import React, { PropTypes as T, Component } from 'react';
import { POIContainer, PinPulse, PinWrapper, Pin, PinIcon } from './styles';

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

    const link = (place.subType !== 'parking') ? `/place/${place.type}/${place.id}` : '/onboarding';

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
              <PinIcon icon={'ion-man'} />
            );
          case 'W':
            return (
              <PinIcon icon={'ion-woman'} />
            );
          case 'U':
            return (
              <PinIcon icon={'ion-man ion-woman'} />
            );
          default:
            return null;
        }
      case 'food':
        return (
          <PinIcon icon={'ion-pizza'} />
        );
      case 'information':
        // TODO: Correct Icon
        return (
          <PinIcon icon={'ion-help'} />
        );
      case 'medical':
        // TODO: Correct Icon
        return (
          <PinIcon icon={'ion-medkit'} />
        );
      case 'parking':
        return (
          <PinIcon icon={'ion-model-s'} />
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
