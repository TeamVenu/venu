import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

// Global Selectors
import {
  makeSelectMapMode,
} from 'containers/App/selectors';

// Global Helpers
import {
  dispatchChangeMapMode,
} from 'containers/App/dispatches';

// Messages
import messages from './messages';

// Get our styles
import {
  Topbar,
  AppTitle,
  ModeWrapper,
  ModeList,
  ModeListItem,
} from './styles';

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
        <ModeListItem
          key={mode.id}
          className={currentModeClass}
          onClick={(e) => {
            const newMode = e.target.textContent;
            onChangeMapMode(newMode);
          }}
        >
          {mode.defaultMessage}
        </ModeListItem>
      );
    });
  }

  render() {
    return (
      <Topbar>
        <AppTitle href={'/onboarding'}>
          <FormattedMessage {...messages.appName} />
        </AppTitle>
        <ModeWrapper>
          <ModeList>
            {this.renderModeItems()}
          </ModeList>
        </ModeWrapper>
      </Topbar>
    );
  }
}

// Define propTypes
Header.propTypes = {
  mapMode: T.string.isRequired,
  onChangeMapMode: T.func.isRequired,
};

// Map state to props
const mapStateToProps = createStructuredSelector({
  mapMode: makeSelectMapMode(),
});

// Map dispatches to props
export function mapDispatchToProps(dispatch) {
  return {
    onChangeMapMode: (mode) => dispatchChangeMapMode(dispatch, mode),
  };
}

// Connect our Header
export default connect(mapStateToProps, mapDispatchToProps)(Header);
