import React, { PropTypes as T } from 'react';
import { DetailWrapper, DetailHeader, DetailExitButton, DetailTitle, DetailSectionTitle, DetailInfo, TagListView, TagListItem, DetailCTAButton } from './styles';

export default class DetailView extends React.Component { // eslint-disable-line
  static propTypes = {
    clearPlaceInfo: T.func.isRequired,
    place: T.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.renderExhibitDetail = this.renderExhibitDetail.bind(this);
    this.renderFacilityDetail = this.renderFacilityDetail.bind(this);
  }

  handleClick() {
    const { clearPlaceInfo } = this.props;
    if (!clearPlaceInfo) return;

    clearPlaceInfo();
  }

  renderExhibitDetail() {
    const { place } = this.props;

    if (!place) return null;

    // Check if first letter or place.location is number '1'
    // If it is, use exhibit code
    // Otherwise use location
    const locationBlurb = (parseInt(place.location.charAt(0), 10) === 1) ? place.exhibitCode : place.location;

    // Subtype Blurb
    // Tells us whether place is in Itinerary or Recommended
    let subTypeBlurb;
    switch (place.subType) {
      case 'recommended':
        subTypeBlurb = 'Recommended For You';
        break;
      case 'bookmarked':
        subTypeBlurb = 'In Your Itinerary';
        break;
      default:
        subTypeBlurb = null;
        break;
    }

    const wrapperClasses = (place.colorZone) ? place.colorZone : null;
    const distanceBlurb = `Distance: ${place.distance}`;
    const hoursRunningBlurb = (place.hoursRunning) ? `Hours Running: ${place.hoursRunning}` : null;
    const agesBlurb = (place.ageRange) ? `Ages: ${place.ageRange}` : null;
    const descBlurb = (place.description.length > 0) ? place.description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, repellendus, suscipit! Rem velit dolorem molestias exercitationem numquam iure aperiam praesentium non repudiandae labore minima beatae quam ipsum vero, quia, et!';

    return (
      <DetailWrapper className={wrapperClasses}>
        <DetailHeader>
          <DetailInfo>
            <span><strong>{locationBlurb}, </strong></span>
            <span>{place.building}, </span>
            <span>{place.imagineRitArea}, </span>
          </DetailInfo>
          <DetailExitButton onClick={this.handleClick}>X</DetailExitButton>
        </DetailHeader>
        <DetailInfo>{distanceBlurb}</DetailInfo>
        <DetailInfo>{hoursRunningBlurb}</DetailInfo>
        <DetailInfo>{agesBlurb}</DetailInfo>
        <DetailInfo>{subTypeBlurb}</DetailInfo>
        <DetailTitle>{place.name}</DetailTitle>
        <DetailSectionTitle>Description</DetailSectionTitle>
        <p>{descBlurb}</p>
        <DetailSectionTitle>Tags</DetailSectionTitle>
        <TagListView>{this.renderTags()}</TagListView>
        <DetailCTAButton>Add to Intinerary</DetailCTAButton>
      </DetailWrapper>
    );
  }

  renderFacilityDetail() { }

  renderTags() {
    const { tags } = this.props.place;

    if (!tags) return null;

    let index = -1;

    return tags.map((tag) => { // eslint-disable-line
      if (tag.length <= 0) return null;

      index += 1;
      return (
        <TagListItem key={index}>{tag}</TagListItem>
      );
    });
  }

  render() {
    // Get our place from the props
    const { place } = this.props;

    if (!place) return null;

    // Set render function based on place type
    const renderDetail = (place.type === 'exhibit') ? this.renderExhibitDetail() : this.renderFacilityDetail();

    return (
      <div>
        { renderDetail }
      </div>
    );
  }
}
