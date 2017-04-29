import React, { PropTypes as T } from 'react';

// Local Styles
import {
  P,
  Link,
  Title,
  Wrapper,
} from './styles';

export default class Card extends React.Component {
  static propTypes = {
    place: T.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.renderActions = this.renderActions.bind(this);
  }

  renderActions() {
    return null;
  }

  render() {
    const { place } = this.props;
    const visited = (place.place.subType === 'visited');

    return (
      <Wrapper visited={visited}>
        <Link to={place.link}>
          <P zone>{place.zone}</P>
          <Title>{place.name}</Title>
          <P>{place.location}</P>
        </Link>
        {this.renderActions()}
      </Wrapper>
    );
  }
}
