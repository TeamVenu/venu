import React, { PropTypes as T } from 'react';

import { Item as ItemContainer, ItemTitle, ItemSubtitle, ItemCategory } from './styles';

export default class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovered: false,
    };
  }

  // onClick(e) {
  //   this.props.onClick(this.props.place);
  // }

  render() {
    const { place } = this.props;

    return (
      <ItemContainer>
        <ItemCategory>Distance: 0.4m</ItemCategory>
        <ItemTitle>{ place.name }</ItemTitle>
        <ItemSubtitle>Building</ItemSubtitle>
      </ItemContainer>
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
