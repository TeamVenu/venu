import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// Components
import H2 from 'components/H2';
import Button from 'components/Button';
import TabBar from 'components/TabBar';
import Container from 'components/Header';
import TabBarList from 'components/TabBarList';
import TabBarActions from 'components/TabBarActions';
import Notifications from 'components/Notifications';

// Global Selectors
import {
  makeSelectUser,
  makeSelectError,
  makeSelectMapMode,
} from 'containers/App/selectors';

// Global Helpers
import {
  dispatchChangeMapMode,
  dispatchGetUserLocation,
  dispatchSetErrorMessages,
} from 'containers/App/dispatches';

// Messages
import messages from './messages';

export class Header extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    onChangeMapMode: T.func,
    mapMode: T.string,
  }

  renderModeItems() {
    const { mapMode, onChangeMapMode } = this.props;
    const { modes } = messages;
    return modes.map((mode) => { //eslint-disable-line
      const currentModeClass = (mapMode === mode.defaultMessage) ? 'selected' : null;

      return (
        <li key={mode.id} className={'tab'}>
          <TabBarActions
            className={currentModeClass}
            onClick={(e) => {
              const newMode = e.target.textContent;
              onChangeMapMode(newMode);
            }}
          >
            {mode.defaultMessage}
          </TabBarActions>
        </li>
      );
    });
  }

  render() {
    const { user, error, onClearErrorMessages, onGetUserLocation } = this.props;
    return (
      <Container>
        <Notifications
          type={'error'}
          message={error}
          onClickEvent={onClearErrorMessages}
        />
        <TabBar borderless>
          <TabBarList className={'header'}>
            <li />
            <li>
              <H2 className={'title'}>{ messages.title.defaultMessage }</H2>
            </li>
            <li>
              <Button
                icon={'ion-android-locate'}
                onClickEvent={() => { onGetUserLocation(user); }}
              />
            </li>
          </TabBarList>
        </TabBar>
        <TabBar>
          <TabBarList three>
            {this.renderModeItems()}
          </TabBarList>
        </TabBar>
      </Container>
    );
  }
}

// Define propTypes
Header.propTypes = {
  error: T.string,
  user: T.object.isRequired,
  mapMode: T.string.isRequired,
  onChangeMapMode: T.func.isRequired,
  onGetUserLocation: T.func.isRequired,
  onClearErrorMessages: T.func.isRequired,
};

// Map state to props
const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  error: makeSelectError(),
  mapMode: makeSelectMapMode(),
});

// Map dispatches to props
export function mapDispatchToProps(dispatch) {
  return {
    onChangeMapMode: (mode) => dispatchChangeMapMode(dispatch, mode),
    onGetUserLocation: (user) => dispatchGetUserLocation(dispatch, user),
    onClearErrorMessages: () => dispatchSetErrorMessages(dispatch, null),
  };
}

// Connect our Header
export default connect(mapStateToProps, mapDispatchToProps)(Header);
