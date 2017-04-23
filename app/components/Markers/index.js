import React, { PropTypes as T, Component } from 'react';
import { POIContainer, PinPulse, PinWrapper, Pin, PinIcons, PinIcon } from './styles';

export default class Marker extends Component {
  static propTypes = {
    mode: T.string,
    currentPlace: T.object,
    place: T.object.isRequired,
  }

  renderPin() {
    const { place, mode } = this.props;

    if (!place) { return null; }

    const { currentPlace } = this.props;

    let placePinClasses = place.type + ' ' + place.subType; // eslint-disable-line

    if (mode === 'Default') {
      placePinClasses += ' selected';
    } else if (mode === 'Itinerary' && place.subType === 'saved') {
      placePinClasses += ' selected';
    } else if (mode === 'Discover' && currentPlace && (currentPlace.lat === place.lat && currentPlace.lng === place.lng)) {
      placePinClasses += ' selected';
    }

    let link = null;

    if (place.subType === 'user' || place.subType === 'parking') {
      link = null;
    } else if (place.type === 'facility') {
      link = `/${place.type}/${place.colorZone}/${place.subType}/${place.key}`;
    } else if (place.type === 'exhibit') {
      link = `/${place.type}/${place.colorZone}/${place.exhibitCode}/${place.key}`;
    } else {
      link = null;
    }

    return (
      <POIContainer className={placePinClasses}>
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
      case 'entertainment':
        return (
          <PinIcon icon={'ion-ios-star'} fontSize={'18px'} />
        );
      case 'entrance':
        return (
          <PinIcon icon={'ion-ios-home'} fontSize={'18px'} />
        );
      case 'food':
        return (
          <PinIcons>
            <PinIcon icon={'ion-fork'} fontSize={'15px'} />
            <PinIcon icon={'ion-knife'} fontSize={'15px'} />
          </PinIcons>
        );
      case 'information':
        return (
          <PinIcon icon={'ion-help'} fontSize={'18px'} />
        );
      case 'medical':
        return (
          <PinIcon icon={'ion-ios-medkit'} fontSize={'18px'} />
        );
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


      case 'parking':
        return (
          <PinIcon icon={'ion-model-s'} fontSize={'18px'} />
        );
      case 'shuttle':
        return (
          <PinIcon icon={'ion-android-bus'} fontSize={'18px'} />
        );
      case 'transporter':
        return (
          <PinIcon icon={'ion-android-car'} fontSize={'18px'} />
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
