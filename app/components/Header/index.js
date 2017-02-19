import React, { PropTypes as T } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

// Get our styles
import { Topbar, AppTitle, ModeWrapper, ModeList, ModeListItem /* , PlaceHolder */ } from './styles';

export default class Header extends React.Component { //eslint-disable-line
  static propTypes = {
    updateViewMode: T.func,
    viewMode: T.string,
  }

  renderModeItems() {
    const { viewMode } = this.props;

    const modes = [{ key: 0, name: 'Discover' }, { key: 1, name: 'Exhibits' }, { key: 2, name: 'Facilities' }];
    return modes.map((mode) => { //eslint-disable-line
      const currentModeClass = (viewMode === mode.name) ? 'selected' : '';

      return (
        <ModeListItem key={mode.key} className={currentModeClass} onClick={this.props.updateViewMode}>
          {mode.name}
        </ModeListItem>
      );
    });
  }
  render() {
    return (
      <Topbar>
        <AppTitle href="/">
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
