import React, { PropTypes as T } from 'react';

import { ItemContainer } from './styles';

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
        <h3>{ place.name }</h3>
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
