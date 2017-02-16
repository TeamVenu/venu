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

  render() {
    return (
      <Topbar>
        <AppTitle href="/">
          <FormattedMessage {...messages.appName} />
        </AppTitle>
        <ModeWrapper>
          <ModeList>
            <ModeListItem className={this.props.viewMode === 'discover' ? 'selected' : ''} onClick={this.props.updateViewMode}>
              Discover
            </ModeListItem>
            <ModeListItem className={this.props.viewMode === 'events' ? 'selected' : ''} onClick={this.props.updateViewMode}>
              Events
            </ModeListItem>
            <ModeListItem className={this.props.viewMode === 'facilities' ? 'selected' : ''} onClick={this.props.updateViewMode}>
              Facilities
            </ModeListItem>
          </ModeList>
        </ModeWrapper>
        {/* <PlaceHolder href="/404">
          Team 7
        </PlaceHolder> */}
      </Topbar>
    );
  }
}
