import React, { PropTypes as T } from 'react';

import { Item as ItemContainer, ItemTitle, ItemSubtitle, ItemCategory } from './styles';

export default class Item extends React.Component {
  static propTypes = {
    type: T.string,
  }

  constructor(props) {
    super(props);

    this.state = {
      hovered: false,
    };
  }

  // onClick(e) {
  //   this.props.onClick(this.props.place);
  // }

  renderCards() {
    const { place } = this.props;
    const { type } = this.props;

    if (type === 'event') {
      return (
        <ItemContainer event>
          <ItemCategory>{ place.category }</ItemCategory>
          <ItemTitle>{ place.name }</ItemTitle>
          <ItemSubtitle>{ place.location.building }</ItemSubtitle>
        </ItemContainer>
      );
    } else if (type === 'facility') {
      return (
        <ItemContainer>
          <ItemCategory>{ place.gender }</ItemCategory>
          <ItemTitle>Restroom</ItemTitle>
          <ItemSubtitle></ItemSubtitle>
        </ItemContainer>
      );
    }
    return (<div />);
  }

  render() {
    return (
      this.renderCards()

    );
  }
}

Item.propTypes = {
  place: T.object.isRequired,
  // onHighlight: T.func,
};

Item.defaultProps = {
  onHighlight: () => {},
  offHighlight: () => {},
};
