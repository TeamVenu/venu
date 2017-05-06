import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// Components
import H3 from 'components/H3';
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
            onClick={onChangeMapMode}
          >
            {mode.defaultMessage}
          </TabBarActions>
        </li>
      );
    });
  }

  render() {
    const { error, onClearErrorMessages } = this.props;
    return (
      <Container>
        <Notifications
          type={'error'}
          message={error}
          onClickEvent={onClearErrorMessages}
        />
        <TabBar borderless>
          <H3 className={'title'}>{ messages.title.defaultMessage }</H3>
        </TabBar>
        <TabBar>
          <TabBarList two>
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
  mapMode: T.string.isRequired,
  onChangeMapMode: T.func.isRequired,
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
    onChangeMapMode: (e) => dispatchChangeMapMode(dispatch, e),
    onClearErrorMessages: () => dispatchSetErrorMessages(dispatch, null),
  };
}

// Connect our Header
export default connect(mapStateToProps, mapDispatchToProps)(Header);
