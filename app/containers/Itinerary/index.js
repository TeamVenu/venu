/*
 * Itinerary
 */

import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// Components
import A from 'components/A';
import H2 from 'components/H2';
import Button from 'components/Button';
import TabBar from 'components/TabBar';
import Container from 'components/Header';
import TabBarList from 'components/TabBarList';

// Containers

// Selectors
import { makeSelectUser, makeSelectExhibits } from 'containers/App/selectors';

// Dispacthes

// Helpers
import { filterExhibitsBy } from 'utils/helpers';

// Local

export class Itinerary extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  renderExhibitList(exhibits) {
    return exhibits.map((exhibit) => { // eslint-disable-line
      return (
        <li key={exhibit.id}>
          <A to={`/place/${exhibit.type}/${exhibit.id}`}>{exhibit.name}</A>
        </li>
      );
    });
  }

  render() {
    const { exhibitProps } = this.props;
    const allExhibits = (exhibitProps.artisticAlley) ? exhibitProps : exhibitProps.toJS();
    const property = 'subType';
    const bookmarked = 'bookmarked';
    const exhibits = filterExhibitsBy(allExhibits, property, bookmarked);

    if (exhibits.length > 0) {
      return (
        <div>
          <Container>
            <TabBar borderless>
              <TabBarList className={'header'}>
                <li>
                  <Button
                    btnClasses={'large'}
                    icon={'ion-navicon'}
                    onClickEvent={null}
                  />
                </li>
                <li>
                  <H2 className={'title'}>Itinerary</H2>
                </li>
                <li />
              </TabBarList>
            </TabBar>
          </Container>
          { this.renderExhibitList(exhibits) }
        </div>
      );
    }
    return (
      <div>
        <Container>
          <TabBar borderless>
            <TabBarList className={'header'}>
              <li>
                <Button
                  btnClasses={'large'}
                  icon={'ion-navicon'}
                  onClickEvent={null}
                />
              </li>
              <li>
                <H2 className={'title'}>Itinerary</H2>
              </li>
              <li />
            </TabBarList>
          </TabBar>
        </Container>
        <A
          to={'/'}
          className={'btn rounded bordered full'}
        >
          Add Activities To Your Itinerary
        </A>
      </div>
    );
  }
}

Itinerary.propTypes = {
  exhibitProps: T.object,
  // userProps: T.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userProps: makeSelectUser(),
  exhibitProps: makeSelectExhibits(),
});

export default connect(mapStateToProps)(Itinerary);
