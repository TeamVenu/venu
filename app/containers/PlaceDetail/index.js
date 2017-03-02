import React from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
import Map from 'containers/Main/Map';
import { Wrapper, MapWrapper, Container, PrimaryButton, Button } from './styles';

export default class PlaceDetail extends React.PureComponent { // eslint-disable-line
  constructor(props, context) {
    super(props, context);
    this.state = {
      place: {},
    };
  }

  componentDidMount() {
    this.getPlacesData();
  }

  getPlacesData() {
    // Get Places through AJAX or fetch here from our API
    axios.get('/api/places')
      .then((response) => {
        this.setPlacesData(response.data);
      })
      .catch((error) => {
        console.error('Error getting API ', error);
      });
  }

  setPlacesData(data) {
    // Concatenate every place into one array
    let { placeId } = this.props.params; // eslint-disable-line

    placeId = parseInt(placeId); // eslint-disable-line

    let place;

    // Change this later
    if (placeId > 100) {
      place = data.exhibits.filter((exhibit) => { // eslint-disable-line
        return exhibit.id === placeId;
      });
    } else {
      place = data.facilities.restrooms.filter((restroom) => { // eslint-disable-line
        return restroom.id === placeId;
      });
    }

    if (place.length === 0) {
      // Place not found
      // Take us to error page
      const errorURL = '/error/place/' + placeId; // eslint-disable-line
      browserHistory.push(errorURL);
    }

    this.setState({
      place: place[0],
    });
  }

  render() {
    const { place } = this.state;
    const places = [place];
    const zoom = 18;
    const center = {
      lat: place.lat,
      lng: place.lng,
    };

    return (
      <Wrapper className={place.colorZone}>
        <MapWrapper>
          <Map places={places} zoom={zoom} center={center} />
        </MapWrapper>
        <Container>
          <p>{place.subType}</p>
          <h5>{place.imagineRitArea}</h5>
          <h1>{place.name}</h1>
          <h2>{place.category}</h2>
          <h3>{place.building} &middot; {place.location} &middot; {place.exhibitCode}</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, voluptate? Asperiores, deserunt. Reiciendis voluptatem iure molestiae in reprehenderit nobis error consequatur doloremque quidem. Reiciendis magni placeat, corrupti minus doloribus eius?</p>
          <p>{place.ageRange}</p>
          <Button href="/">Travel</Button>
          <PrimaryButton href="/">Add to Itinerary</PrimaryButton>
        </Container>
      </Wrapper>
    );
  }
}
