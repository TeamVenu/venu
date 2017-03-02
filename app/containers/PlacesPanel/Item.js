import React, { PropTypes as T } from 'react';

import { Item as ItemContainer, ItemTitle, ItemSubtitle, ItemCategory } from './styles';

export default class Item extends React.Component {
  static propTypes = {
    place: T.object.isRequired,
    clickOnPlaceCard: T.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      hovered: false,
    };

    this.handleCardClick = this.handleCardClick.bind(this);
  }

  handleCardClick() {
    const { place } = this.props;
    this.props.clickOnPlaceCard(place);
  }

  renderCard() {
    const { place } = this.props;

    if (!place) { return null; }

    // If restroom lets not show category
    const category = (place.subType === 'restroom') ? '' : place.category;
    const placeClass = place.type + ' ' + place.subType; //eslint-disable-line

    return (
      <ItemContainer className={placeClass} onClick={this.handleCardClick}>
        <ItemCategory>{category}</ItemCategory>
        <ItemTitle>{place.name}</ItemTitle>
        <ItemSubtitle>{place.building}</ItemSubtitle>
      </ItemContainer>
    );
  }

  render() {
    return (
      this.renderCard()
    );
  }
}
