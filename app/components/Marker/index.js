// TODO:
// Add other icons
// Make this open of the detail view when clicked as attaching link won't work
// Add user and parking as places with type of same name
// Find the best animation
// Try to make the map async in VenuMap

import React, { PropTypes as T } from 'react';
import { Marker as Pin } from 'react-google-maps';
import DefaultPin from 'media/icons/orangepin.png';
import SavedPin from 'media/icons/bluepin.png';
import WomanRestroomPin from 'media/icons/womenrestroompin.png';
import DiningPin from 'media/icons/diningpin.png';
import { browserHistory } from 'react-router';

export default class Marker extends React.Component {
  static propTypes = {
    place: T.object.isRequired,
    size: T.any,
    // mode: T.string,
    // currentPlace: T.object,
  }

  constructor(props) {
    super(props);

    this.renderPin = this.renderPin.bind(this);
    this.onHandleClick = this.onHandleClick.bind(this);
  }

  onHandleClick(url) {
    if (url) {
      browserHistory.push({
        pathname: url,
      });
    }
  }

  renderPin() {
    const { place, size } = this.props;

    // Set position of pin
    const position = {
      lat: place.lat,
      lng: place.lng,
    };

    // Set default animation
    // const defaultAnimation = 2;
    let image = '';
    let link = null;

    // Case by case
    switch (place.type) {
      case 'user':
        break;
      case 'parking':
        break;
      case 'exhibit':
        link = `/${place.type}/${place.colorZone}/${place.exhibitCode}/${place.key}`;
        switch (place.subType) {
          case 'saved':
            image = SavedPin;
            break;
          default:
            image = DefaultPin;
            break;
        }
        break;
      case 'facility':
        link = `/${place.type}/${place.colorZone}/${place.subType}/${place.key}`;
        switch (place.subType) {
          case 'food':
            image = DiningPin;
            break;
          default:
            image = WomanRestroomPin;
            break;
        }
        break;
      default:
        link = null;
        break;
    }
    // Set Icon
    const icon = {
      url: image,
      scaledSize: size,
    };

    return (
      <Pin
        icon={icon}
        position={position}
        onClick={() => { this.onHandleClick(link); }}
      />
    );
  }

  render() {
    return (
      this.renderPin()
    );
  }
}
