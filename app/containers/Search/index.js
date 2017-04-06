/*
 * Search
 */

import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// Components
import H2 from 'components/H2';
import Button from 'components/Button';
import TabBar from 'components/TabBar';
import Container from 'components/Header';
import TabBarList from 'components/TabBarList';

// Containers

// Selectors
import { makeSelectUser } from 'containers/App/selectors';

// Dispacthes

// Local

export class Search extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
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
                <H2 className={'title'}>Search</H2>
              </li>
              <li>
                <Button
                  btnClasses={'large'}
                  icon={'ion-search'}
                  onClickEvent={null}
                />
              </li>
            </TabBarList>
          </TabBar>
        </Container>
      </div>
    );
  }
}

Search.propTypes = {
  userProps: T.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userProps: makeSelectUser(),
});

export default connect(mapStateToProps)(Search);
