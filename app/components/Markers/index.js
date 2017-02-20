import React, { PropTypes as T, Component } from 'react';

import { POIContainer, PinWrapper, InfoPane, Pin } from './styles';

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
    const place = this.props;
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
            {place.name.charAt(0)}
          </Pin>
        </PinWrapper>
        <InfoPane>
          <p>{ place.name }</p>
        </InfoPane>
      </POIContainer>
    );
  }

  render() {
    return (
      this.renderPin()
    );
  }
}
