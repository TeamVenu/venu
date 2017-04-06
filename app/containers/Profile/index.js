/*
 * Profile
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

export class Profile extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { userProps } = this.props;
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
                <H2 className={'title'}>{userProps.name}</H2>
              </li>
              <li />
            </TabBarList>
          </TabBar>
        </Container>
      </div>
    );
  }
}

Profile.propTypes = {
  userProps: T.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userProps: makeSelectUser(),
});

export default connect(mapStateToProps)(Profile);
