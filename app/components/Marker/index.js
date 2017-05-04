import React, { PropTypes as T } from 'react';
import { Marker as Pin } from 'react-google-maps';
import { browserHistory } from 'react-router';
import DefaultPin from 'media/icons/pins/orangepin.png';
import SavedPin from 'media/icons/pins/bluepin.png';
import FadedPin from 'media/icons/pins/fadepin.png';
import Entertainment from 'media/icons/pins/entertainment.png';
import Entrance from 'media/icons/pins/entrance.png';
import Food from 'media/icons/pins/food.png';
import GenderNeutral from 'media/icons/pins/genderneutral.png';
import Information from 'media/icons/pins/information.png';
import Man from 'media/icons/pins/man.png';
import Medical from 'media/icons/pins/medical.png';
import Parking from 'media/icons/pins/parking.png';
import Shuttle from 'media/icons/pins/shuttle.png';
import Transport from 'media/icons/pins/transport.png';
import User from 'media/icons/pins/user.png';
import Woman from 'media/icons/pins/woman.png';

export default class Marker extends React.Component {
  static propTypes = {
    size: T.any,
    anchor: T.any,
    place: T.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.renderPin = this.renderPin.bind(this);
    this.onHandleClick = this.onHandleClick.bind(this);
  }

  onHandleClick(url) {
    const { place } = this.props;

    if (url) {
      browserHistory.push({
        pathname: url,
      });
    } else if (place.onClickEvent) {
      if (place.type === 'user') {
        // Create center coordinate object
        const center = {
          lat: place.lat,
          lng: place.lng,
        };

        // Call user click event
        place.onClickEvent(center);
      } else if (place.type === 'parking') {
        // Create parking object
        const parking = {
          type: place.type,
          name: 'My Parking Spot',
          location: null,
          lat: place.lat,
          lng: place.lng,
          colorZone: place.type,
          imagineRitArea: 'Parking',
        };

        // Call parking click event
        place.onClickEvent(parking);
      }
    }
  }

  renderPin() {
    const { place, anchor, size } = this.props;

    if (!place.lat && !place.lng) return null;

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
        image = (place.photoURL !== '') ? place.photoURL : User;
        break;
      case 'parking':
        image = Parking;
        break;
      case 'exhibit':
        link = `/${place.type}/${place.colorZone}/${place.exhibitCode}/${place.key}`;
        switch (place.subType) {
          case 'saved':
            image = SavedPin;
            break;
          case 'visited':
            image = FadedPin;
            break;
          default:
            image = DefaultPin;
            break;
        }
        break;
      case 'facility':
        link = `/${place.type}/${place.colorZone}/${place.subType}/${place.key}`;
        switch (place.subType) {
          case 'entertainment':
            image = Entertainment;
            break;
          case 'entrance':
            image = Entrance;
            break;
          case 'food':
            image = Food;
            break;
          case 'information':
            image = Information;
            break;
          case 'medical':
            image = Medical;
            break;
          case 'shuttle':
            image = Shuttle;
            break;
          case 'transporter':
            image = Transport;
            break;
          case 'restroom':
            switch (place.gender) {
              case 'M':
                image = Man;
                break;
              case 'U':
                image = GenderNeutral;
                break;
              case 'W':
                image = Woman;
                break;
              default:
                image = GenderNeutral;
                break;
            }
            break;
          default:
            image = DefaultPin;
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
      anchor,
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
