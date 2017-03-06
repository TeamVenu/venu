import React, { PropTypes as T } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

// Get our styles
import { Topbar, AppTitle, ModeWrapper, ModeList, ModeListItem } from './styles';

export default class Header extends React.Component { //eslint-disable-line
  static propTypes = {
    onChangeMapMode: T.func,
    mapMode: T.string,
  }

  renderModeItems() {
    const { mapMode } = this.props;

    const modes = [{ key: 0, name: 'Discover' }, { key: 1, name: 'Itinerary' }, { key: 2, name: 'Facilities' }];
    return modes.map((mode) => { //eslint-disable-line
      const currentModeClass = (mapMode === mode.name) ? 'selected' : '';

      return (
        <ModeListItem key={mode.key} className={currentModeClass} onClick={this.props.onChangeMapMode}>
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
