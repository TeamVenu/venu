import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

// Get our styles
import { Topbar, AppTitle, ModeWrapper, ModeList, ModeListItem, PlaceHolder } from './styles';

export default class Header extends React.Component { //eslint-disable-line
  render() {
    return (
      <Topbar>
        <AppTitle href="/">
          <FormattedMessage {...messages.appName} />
        </AppTitle>
          <ModeWrapper>
          <ModeList>
            <ModeListItem>
              Discover
            </ModeListItem>
            <ModeListItem>
              Facilities
            </ModeListItem>
            <ModeListItem>
              Events
            </ModeListItem>
          </ModeList>
        </ModeWrapper>
        <PlaceHolder href="404">
          Team 7
        </PlaceHolder>
      </Topbar>
    );
  }
}
