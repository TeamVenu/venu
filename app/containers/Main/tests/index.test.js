import React from 'react';
import { FormattedMessage } from 'react-intl';
import { shallow } from 'enzyme';

import Main from '../index';
import messages from '../messages';

describe('<HomePage />', () => {
  it('should render the page message', () => {
    const renderedComponent = shallow(
      <Main />
    );
    expect(renderedComponent.contains(
      <FormattedMessage {...messages.header} />
    )).toEqual(true);
  });
});
