/**
 * NotFound
 *
 * This is the view we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import styled from 'styled-components';

import messages from './messages';

const Wrapper = styled.section`
  background: var(--primary-color);
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1`
  margin-top: 0;
  font-size: 5em;
  text-align: center;
`;

const Message = styled.p`
  font-size: 3em;
  text-align: center;
`;

export default class NotFound extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Wrapper>
        <Title>¯\_(ツ)_/¯</Title>
        <Message>
          <FormattedMessage {...messages.message} />
        </Message>
      </Wrapper>
    );
  }
}
