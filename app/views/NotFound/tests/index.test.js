import React from 'react';
import { FormattedMessage } from 'react-intl';
import { shallow } from 'enzyme';

import NotFound from '../index';
import messages from '../messages';

describe('<NotFoundPage />', () => {
  it('should render the page message', () => {
    const renderedComponent = shallow(
      <NotFound />
    );

    // expect(renderedComponent.contains(
    //   <FormattedMessage {...messages.header} />
    // )).toEqual(true);

    expect(renderedComponent.contains(
      <FormattedMessage {...messages.message} />
    )).toEqual(true);
  });
});
