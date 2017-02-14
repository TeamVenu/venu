import React, { PropTypes as T } from 'react';

import { PlacesContainer as Places } from 'components/PlacesContainer';


export default class PlacesContainer extends React.Component {

  static propTypes = {
    places: T.array,
    onListItemClick: T.func,
  };

  constructor() {
    super();

    this.state = {
      places: [],
    };
  }

  componentDidMount() { }

  render() {
    return (
      <Places places={this.state.places} facilities={this.state.facilities} />
    );
  }
}

