/*
 * Main
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';

import { FormattedMessage } from 'react-intl';

import Map from 'components/Map';
import Places from 'components/Places';

import messages from './messages';

export default class Main extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <div style={{ width: '100%', height: 500, background: 'var(--primary-color)' }}>
          <Map />
        </div>
        <Places />
      </div>
    );
  }
}

