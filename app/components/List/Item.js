import React, { PropTypes as T } from 'react';

import { ItemContainer, ItemInfoContainer, ItemActionContainer, ItemTitle, ItemSubtitle } from './styles';

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
        <ItemInfoContainer>
          <ItemTitle>{ place.name }</ItemTitle>
          <ItemSubtitle>Building</ItemSubtitle>
        </ItemInfoContainer>
        <ItemActionContainer>
          <p>Distance: 0.4m</p>
        </ItemActionContainer>
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
