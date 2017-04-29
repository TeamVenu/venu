import React, { PropTypes as T } from 'react';

// Local Styles
import {
  P,
  Link,
  Title,
  Wrapper,
} from './styles';

export default class Card extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    cardClass: T.string,
    place: T.object.isRequired,
  }

  render() {
    const { place, cardClass } = this.props;
    const visited = (place.place.subType === 'visited');
    return (
      <Wrapper visited={visited} className={cardClass}>
        <Link to={place.link}>
          <P zone>{place.zone}</P>
          <Title>{place.name}</Title>
          <P>{place.location}</P>
        </Link>
      </Wrapper>
    );
  }
}
