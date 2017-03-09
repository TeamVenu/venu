import React from 'react';
import imagineRITData from 'fixtures/places.json';
export default class Home extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: React.PropTypes.node,
  };

  componentWillMount() {
    console.log('Home Container Mounted 😊');
    this.getPlacesData();
  }

  /**
   * getPlacesData
   * Gets our data from imported JSON
   */
  getPlacesData() {
    // We send in data to setPlacesData based on event
    this.setPlacesData(imagineRITData);
  }

    /**
   * setPlacesData
   * Initializes our data from json
   * @param  {Object} data
   */
  setPlacesData(data) {
    // Get exhibits object
    const exhibits = data.exhibits;

    // Get facilities object
    const facilities = data.facilities;

    // Set state to save our data
    this.setState({
      exhibits,
      facilities,
    });
  }

  renderChildren() {
    const { children } = this.props;
    const { exhibits, facilities } = this.state;

    if (React.Children.count(children) > 0) {
      return React.Children.map(children, (c) => { // eslint-disable-line
        return React.cloneElement(c, this.props, {
          userName: 'Erick',
          userEmail: 'ejs3863@rit.edu',
          exhibits,
          facilities,
        });
      });
    }
    return null;
  }

  render() {
    return (
      <section>
        {this.renderChildren()}
      </section>
    );
  }
}
