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
import styled from 'styled-components';
import FullWrapper from 'components/FullWrapper';
import SmallWrapper from 'components/SmallWrapper';
import Logo from 'components/Logo';
import H1 from 'components/H1';
import H3 from 'components/H3';
import A from 'components/A';

import messages from './messages';

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  flex: 2;
`;

const Body = styled.section`
  flex: 2;
`;

const Footer = styled.section`
  flex: 1;
`;

export default class NotFound extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <FullWrapper className={'map-bg full-page'}>
        <FullWrapper className={'gradient-bg opaque'}>
          <SmallWrapper className={'centered-text'}>
            <Wrapper>
              <Header>
                <Logo />
                <H1>{ messages.messages.title.defaultMessage }</H1>
              </Header>
              <Body>
                <H1>{ messages.messages.intro.defaultMessage }</H1>
                <H3>{ messages.messages.desc.defaultMessage }</H3>
              </Body>
              <Footer>
                <A className={'btn special reversed rounded full'} to={'/'}>{ messages.messages.action.defaultMessage }</A>
              </Footer>
            </Wrapper>
          </SmallWrapper>
        </FullWrapper>
      </FullWrapper>
    );
  }
}
