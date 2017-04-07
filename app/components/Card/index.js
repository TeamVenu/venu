import React, { PropTypes as T } from 'react';

// Components
import H2 from 'components/H2';
import Tag from 'components/Tag';

// Local
import {
  P,
  Header,
  Wrapper,
  Section,
  ListView,
  TagSection,
} from './styles';

export default class Card extends React.Component {
  static propTypes = {
    place: T.object.isRequired,
    onClickEvent: T.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.renderTags = this.renderTags.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderTagContainer = this.renderTagContainer.bind(this);
  }

  handleClick() {
    const { onClickEvent } = this.props;
    onClickEvent();
  }

  renderTags() {
    const { tags } = this.props.place;

    return tags.map((tag, index) => { // eslint-disable-line
      return (
        <Tag key={index}>{tag}</Tag>
      );
    });
  }

  renderTagContainer() {
    const { place } = this.props;
    if (!place.tags) return null;

    return (
      <TagSection>
        <ListView>
          { this.renderTags() }
        </ListView>
      </TagSection>
    );
  }
  render() {
    const { place } = this.props;

    return (
      <Wrapper to={place.link} onClick={this.handleClick}>
        <Section>
          <Header>
            <P zone>{place.zone}</P>
            <P>{place.distance}</P>
          </Header>
          <H2>{place.name}</H2>
          <P>{place.location}</P>
        </Section>
        { this.renderTagContainer() }
      </Wrapper>
    );
  }
}
